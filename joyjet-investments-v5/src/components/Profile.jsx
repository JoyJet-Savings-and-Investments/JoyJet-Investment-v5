import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../App'
import { getTheme, setTheme } from '../utils/storage'

export default function Profile() {
  const { state } = useApp()
  const { user } = state
  const [theme, setThemeState] = useState(getTheme())

  useEffect(() => {
    const handler = () => setThemeState(getTheme())
    window.addEventListener('themechange', handler)
    return () => window.removeEventListener('themechange', handler)
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    setThemeState(next)
    window.dispatchEvent(new Event('themechange'))
  }

  return (
    <>
      <div className="status-bar">
        <span className="time">11:37</span>
        <span style={{ fontSize: 13 }}>LTE 🔋</span>
      </div>

      <div className="profile-header">
        <div className="avatar" aria-hidden="true">👤</div>
        <div>
          <div style={{ fontSize: 20, fontWeight: 600 }}>Hi, {user.shortName}</div>
          <div className="muted">JOYJET INVESTMENTS</div>
        </div>
        <div style={{ fontSize: 28, color: 'var(--primary)' }} aria-hidden="true">🛡️</div>
      </div>

      <div className="list-group">
        <button type="button" className="list-item">
          <div className="left"><span className="icon" aria-hidden="true">☰</span>Profile Details</div>
          <span aria-hidden="true">›</span>
        </button>
        <button type="button" className="list-item">
          <div className="left"><span className="icon" aria-hidden="true">⊞</span>Account Limits</div>
          <span aria-hidden="true">›</span>
        </button>
        <button type="button" className="list-item">
          <div className="left"><span className="icon" aria-hidden="true">💳</span>My JOYJET Card</div>
          <span aria-hidden="true">›</span>
        </button>
      </div>

      <div className="list-group">
        <button type="button" className="list-item">
          <div className="left"><span className="icon" aria-hidden="true">🛡️</span>Security Center</div>
          <span aria-hidden="true">›</span>
        </button>
        <Link to="/login-settings" className="list-item">
          <div className="left"><span className="icon" aria-hidden="true">⚙️</span>Settings</div>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 8, height: 8, background: 'red', borderRadius: '50%' }} aria-hidden="true" />›
          </span>
        </Link>
        <button
          type="button"
          className="list-item"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          <div className="left">
            <span className="icon" aria-hidden="true">{theme === 'dark' ? '☀️' : '🌙'}</span>
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </div>
          <div className={`toggle ${theme === 'dark' ? '' : 'off'}`} role="switch" aria-checked={theme === 'dark'} />
        </button>
      </div>

      <Link to="/about" className="version">Version 5.0.0 ›</Link>
    </>
  )
}
