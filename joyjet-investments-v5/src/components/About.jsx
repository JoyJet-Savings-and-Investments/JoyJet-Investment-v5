import React from 'react'
import { Link } from 'react-router-dom'

export default function About() {
  return (
    <>
      <div className="status-bar">
        <span className="time">11:39</span>
        <span style={{ fontSize: 13 }}>LTE 🔋</span>
      </div>
      <div className="header">
        <Link to="/profile" className="back" aria-label="Back to Profile">←</Link>
        <span>About</span>
      </div>

      <div style={{ textAlign: 'center', padding: '32px 16px 24px' }}>
        <div style={{ fontSize: 24, fontWeight: 700 }}>
          <span style={{ color: 'var(--primary)' }}>JOY</span>JET INVESTMENTS
        </div>
        <div className="muted" style={{ marginTop: 6 }}>Version 5.0.0</div>
      </div>

      <div className="list-group">
        <button type="button" className="list-item">
          <div className="left"><span className="icon" aria-hidden="true">♡</span>Third Party Components</div>
          <span aria-hidden="true">›</span>
        </button>
        <button type="button" className="list-item">
          <div className="left"><span className="icon" aria-hidden="true">📄</span>Terms & Conditions</div>
          <span aria-hidden="true">›</span>
        </button>
        <button type="button" className="list-item">
          <div className="left"><span className="icon" aria-hidden="true">📋</span>Privacy Policy</div>
          <span aria-hidden="true">›</span>
        </button>
      </div>

      <div className="list-group" style={{ marginTop: 12 }}>
        <div className="list-item">
          <div className="left"><span className="icon" aria-hidden="true">🚀</span>Version</div>
          <span style={{ color: 'var(--muted)' }}>Up to Date ›</span>
        </div>
      </div>
    </>
  )
}
