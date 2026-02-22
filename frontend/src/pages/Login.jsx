import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Import logo juga di sini untuk ditampilkan di bagian kiri
import logoImg from '../assets/logo_nextcall.png'; 

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('accessToken', data.data.token);
        localStorage.setItem('userName', data.data.user.name);
        localStorage.setItem('userId', data.data.user.id);
        navigate('/dashboard');
      } else {
        alert(data.message || 'Login gagal');
      }
    } catch (error) {
      alert('Terjadi kesalahan koneksi ke server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
      
      {/* --- BAGIAN KIRI (BRANDING BANNER) --- */}
      <div style={{ 
        flex: '1 1 50%', // Mengambil 50% lebar pada layar besar
        background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', // Warna Gradien Biru-Ungu
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '60px',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Hiasan Background (Opsional, lingkaran transparan) */}
        <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '300px', height: '300px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}></div>
        <div style={{ position: 'absolute', bottom: '-5%', right: '-5%', width: '200px', height: '200px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}></div>

        <img src={logoImg} alt="NextCall Logo" style={{ height: '60px', marginBottom: '30px', filter: 'brightness(0) invert(1)' }} /> {/* Logo diputihkan agar kontras */}
        <h1 style={{ fontSize: '3rem', fontWeight: 800, margin: '0 0 20px 0', lineHeight: 1.2 }}>
          Next Call
        </h1>
        <p style={{ fontSize: '1.1rem', opacity: 0.9, maxWidth: '500px' }}>
          Selamat datang kembali di NextCall 
        </p>
      </div>

      {/* --- BAGIAN KANAN (FORM LOGIN) --- */}
      <div style={{ 
        flex: '1 1 50%', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: '40px',
        background: '#fff' 
      }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <div style={{ marginBottom: '40px' }}>
             <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#111827', marginBottom: '10px' }}>Masuk ke Akun</h2>
             <p style={{ color: '#6b7280' }}>Silakan masukkan detail akun Anda.</p>
          </div>

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 500, color: '#374151' }}>Email Perusahaan</label>
              <input
                type="email"
                className="input" // Menggunakan class CSS global 'input' Anda
                placeholder="Masukkan email Anda"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ width: '100%', padding: '12px' }}
              />
            </div>
            <div style={{ marginBottom: 30 }}>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 500, color: '#374151' }}>Password</label>
              <input
                type="password"
                className="input"
                placeholder="Masukkan password Anda"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ width: '100%', padding: '12px' }}
              />
            </div>
            <button 
              type="submit" 
              className="btn primary" // Menggunakan class CSS global 'btn primary' Anda
              disabled={loading}
              style={{ width: '100%', padding: '14px', fontSize: '16px', background: '#4f46e5', border: 'none' }}
            >
              {loading ? 'Memproses...' : 'Masuk Dashboard'}
            </button>
          </form>
          
          <p style={{ textAlign: 'center', marginTop: '30px', color: '#6b7280', fontSize: '14px' }}>
            © 2025 NextCall Internal System
          </p>
        </div>
      </div>
      
    </div>
  );
}