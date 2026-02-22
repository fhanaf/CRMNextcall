import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './SignUpForm.css'

const SignUpForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: ''
    })

    const [errors, setErrors] = useState({})
    const [passwordStrength, setPasswordStrength] = useState('')

    const validatePassword = (password) => {
        if (password.length === 0) return ''
        if (password.length < 6) return 'Weak'

        const hasUpperCase = /[A-Z]/.test(password)
        const hasLowerCase = /[a-z]/.test(password)
        const hasNumbers = /\d/.test(password)
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

        const strength = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChar].filter(Boolean).length

        switch (strength) {
            case 1: return 'Weak'
            case 2: return 'Fair'
            case 3: return 'Good'
            case 4: return 'Strong'
            default: return 'Weak'
        }
    }

    const getPasswordStrengthColor = (strength) => {
        switch (strength) {
            case 'Weak': return '#e74c3c'
            case 'Fair': return '#f39c12'
            case 'Good': return '#3498db'
            case 'Strong': return '#2ecc71'
            default: return '#999'
        }
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        const newValue = type === 'checkbox' ? checked : value

        setFormData({
            ...formData,
            [name]: newValue
        })

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            })
        }

        // Check password strength
        if (name === 'password') {
            setPasswordStrength(validatePassword(value))
        }

        // Check password match
        if (name === 'confirmPassword' || name === 'password') {
            if (name === 'confirmPassword' && value !== formData.password) {
                setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }))
            } else if (name === 'password' && formData.confirmPassword && value !== formData.confirmPassword) {
                setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }))
            } else {
                setErrors(prev => ({ ...prev, confirmPassword: '' }))
            }
        }
    }

    const validateForm = () => {
        const newErrors = {}

        if (!formData.name.trim()) {
            newErrors.name = 'Full name is required'
        } else if (formData.name.length < 2) {
            newErrors.name = 'Name must be at least 2 characters'
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required'
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address'
        }

        if (!formData.password) {
            newErrors.password = 'Password is required'
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters'
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password'
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match'
        }

        if (formData.phone && !/^[\d\s\-\+\(\)]{10,}$/.test(formData.phone)) {
            newErrors.phone = 'Please enter a valid phone number'
        }

        return newErrors
    }

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        const formErrors = validateForm()

        if (Object.keys(formErrors).length === 0) {
            console.log('Sign up data:', formData)
            // Tambahkan logika sign up di sini
            alert(`Account created successfully for: ${formData.name}`)
            // Redirect ke login atau dashboard
            navigate('/login')
        } else {
            setErrors(formErrors)
        }
    }

    return (
        <div className="signup-container">
            <div className="signup-card">
                <div className="signup-header">
                    <h2 className="signup-title">Create Account</h2>
                </div>

                <div className="signup-form-container">
                    {/* Area yang bisa di-scroll untuk form fields */}
                    <div className="signup-form-scrollable">
                        <form className="signup-form" onSubmit={handleSubmit} noValidate>
                            <div className="form-group">
                                <label htmlFor="name" className="form-label">
                                    Full Name <span className="required">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`form-input ${errors.name ? 'error' : ''}`}
                                    placeholder="Enter your full name"
                                    autoComplete="name"
                                />
                                {errors.name && <span className="error-message">{errors.name}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="email" className="form-label">
                                    Email <span className="required">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`form-input ${errors.email ? 'error' : ''}`}
                                    placeholder="Enter your email"
                                    autoComplete="email"
                                    inputMode="email"
                                />
                                {errors.email && <span className="error-message">{errors.email}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone" className="form-label">Phone Number (Optional)</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={`form-input ${errors.phone ? 'error' : ''}`}
                                    placeholder="Enter your phone number"
                                    autoComplete="tel"
                                    inputMode="tel"
                                />
                                {errors.phone && <span className="error-message">{errors.phone}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="password" className="form-label">
                                    Password <span className="required">*</span>
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`form-input ${errors.password ? 'error' : ''}`}
                                    placeholder="Create a password"
                                    autoComplete="new-password"
                                />
                                {passwordStrength && (
                                    <div className="password-strength">
                                        <div className="strength-label">
                                            Password strength:
                                            <span style={{ color: getPasswordStrengthColor(passwordStrength) }}>
                                                {passwordStrength}
                                            </span>
                                        </div>
                                        <div className="strength-bar">
                                            <div
                                                className="strength-fill"
                                                style={{
                                                    width: passwordStrength === 'Weak' ? '25%' :
                                                        passwordStrength === 'Fair' ? '50%' :
                                                            passwordStrength === 'Good' ? '75%' : '100%',
                                                    backgroundColor: getPasswordStrengthColor(passwordStrength)
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                )}
                                {errors.password && <span className="error-message">{errors.password}</span>}
                                <div className="password-hint">
                                    Must be at least 6 characters with a mix of letters, numbers and symbols
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="confirmPassword" className="form-label">
                                    Confirm Password <span className="required">*</span>
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                                    placeholder="Confirm your password"
                                    autoComplete="new-password"
                                />
                                {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                            </div>
                        </form>
                    </div>

                    {/* Area tetap di bawah untuk tombol */}
                    <div className="signup-form-fixed">
                        <button type="submit" className="signup-button" onClick={handleSubmit}>
                            Create Account
                        </button>
                        <div className="login-link">
                            Already have an account? <a href="/login" className="login-link-text">Sign in</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUpForm
