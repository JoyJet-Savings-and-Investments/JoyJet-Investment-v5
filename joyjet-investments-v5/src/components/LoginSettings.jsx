import React from 'react'
import { Link } from 'react-router-dom'

export default function LoginSettings() {
  return (
    <>
      <div className="status-bar">
        <span className="time">11:39</span>
        <span style={{ fontSize: 13 }}>LTE 🔋</span>
      </div>
      <div className="header">
        <Link to="/profile" className="back" aria-label="Back to Profile">←</Link>
        <span>Login Settings</span>
      </div>

      <div style={{ padding: '8px 16px', fontWeight: 600, color: 'var(--muted)', fontSize: 14 }}>Password</div>
      <div className="list-group">
        <button type="button" className="list-item"><span>Change Password</span><span aria-hidden="true">›</span></button>
        <button type="button" className="list-item"><span>Forgot Password</span><span aria-hidden="true">›</span></button>
        <button type="button" className="list-item"><span>Auto-logout Setting</span><span aria-hidden="true">›</span></button>
      </div>

      <div style={{ padding: '16px 16px 8px', fontWeight: 600, color: 'var(--muted)', fontSize: 14 }}>Biometric Login</div>
      <div className="list-group">
        <div className="list-item">
          <span>Log in with Face ID</span>
          <div className="toggle" role="switch" aria-checked="true" aria-label="Face ID enabled" />
        </div>
      </div>
    </>
  )
}
