import React from 'react'

export default function Toast({ message, type = 'info' }) {
  return (
    <div className={`toast ${type}`} role="status" aria-live="polite">
      {message}
    </div>
  )
}
