import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import './styles.css' 

export default function App(){
  return (
    <div className="app-root">
      <Sidebar />
      <main className="workspace">
        <Outlet />
      </main>
    </div>
  )
}