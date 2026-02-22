import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import App from './App'
import Dashboard from './pages/Dashboard'
import Customers from './pages/CustomerList'
import CustomerDetail from './pages/CustomerDetail'
import Analytics from './pages/Analytics'
import Settings from './pages/Settings'

import Login from './pages/Login'
import SignUp from './pages/SignUp'
import './styles.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Default route to Login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Protected Routes Application Structure */}
        <Route path="/dashboard" element={<App />}>
          <Route index element={<Dashboard />} />
          <Route path="customers" element={<Customers />} />
          <Route path="customers/:id" element={<CustomerDetail />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode >
)
