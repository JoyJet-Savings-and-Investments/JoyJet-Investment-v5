import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'

export default function BottomNav() {
  const { pathname } = useLocation()
  if (pathname.startsWith('/transactions/') || pathname === '/login-settings' || pathname === '/about') {
    return null
  }
  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      <NavLink to="/" end className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <span className="icon" aria-hidden="true">🏠</span>Home
      </NavLink>
      <NavLink to="/savings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <span className="icon" aria-hidden="true">📈</span>Savings
      </NavLink>
      <NavLink to="/transactions" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <span className="icon" aria-hidden="true">📄</span>History
      </NavLink>
      <NavLink to="/profile" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <span className="icon" aria-hidden="true">⊞</span>Me
      </NavLink>
    </nav>
  )
}
