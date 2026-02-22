import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
// Import gambar logo
import logoImg from '../assets/logo_nextcall.png'

// --- 1. IKON SVG ---
const Icons = {
  Dashboard: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>,
  Customers: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
  Logout: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e74c3c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
}

// --- 2. MENU ITEM ---
const items = [
  { to: '/dashboard', label: 'Dashboard', icon: <Icons.Dashboard /> },
  { to: '/dashboard/customers', label: 'Customers', icon: <Icons.Customers /> }
]

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('Apakah Anda yakin ingin keluar?')) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userName');
      localStorage.removeItem('userId');
      navigate('/login');
    }
  };

  return (
    <aside className="sidebar" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      
      {/* BRAND LOGO */}
      {/* Layout tetap sama persis: Flex Row dengan Gap 10px */}
      <div className="brand" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        
        {/* BAGIAN INI DIGANTI IMAGE */}
        {/* Ukuran diset 24px x 24px, persis sama dengan ukuran ikon kotak sebelumnya */}
        <img 
            src={logoImg} 
            alt="Logo" 
            style={{ width: 24, height: 24, objectFit: 'contain' }} 
        />
        
        {/* Teks NextCall tetap ada di posisinya */}
        NextCall
      </div>

      {/* MENU NAVIGASI */}
      <nav className="nav" style={{ flex: 1 }}>
        {items.map(i => (
          <NavLink key={i.to} to={i.to} end={i.to === '/dashboard'} className={({ isActive }) => isActive ? 'active' : ''}>
            <span className="icon" style={{ display: 'flex', alignItems: 'center' }}>{i.icon}</span>
            <span>{i.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* TOMBOL LOGOUT */}
      <div style={{ padding: '20px', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <button 
          onClick={handleLogout}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            color: '#e74c3c',
            fontSize: '14px',
            fontWeight: 500,
            width: '100%',
            padding: '10px 0',
            transition: 'opacity 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.opacity = 0.7}
          onMouseOut={(e) => e.currentTarget.style.opacity = 1}
        >
          <span className="icon" style={{ display: 'flex', alignItems: 'center' }}><Icons.Logout /></span>
          <span>Logout</span>
        </button>
      </div>

    </aside>
  )
}