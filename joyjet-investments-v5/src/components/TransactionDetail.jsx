import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useApp } from '../App'

export default function TransactionDetail() {
  const { id } = useParams()
  const { state } = useApp()
  const tx = state.transactions.find((t) => t.id === id) || state.transactions[0]
  const isIn = tx.type === 'in'

  return (
    <>
      <div className="status-bar">
        <span className="time">15:46</span>
        <span style={{ fontSize: 13 }}>4G 🔋</span>
      </div>

      <div className="header">
        <Link to="/transactions" className="back" aria-label="Back to Transactions">←</Link>
        <span>Transaction Details</span>
      </div>

      <div className="receipt-header">
        <div style={{ fontSize: 28 }} aria-hidden="true">{isIn ? '🟢' : '🏦'}</div>
        <div style={{ marginTop: 12, fontSize: 15, color: 'var(--muted)' }}>
          {isIn
            ? `Transfer from ${tx.sender || 'Sender'}`
            : `Transfer to ${tx.recipient || 'Recipient'}`}
        </div>
        <div className="amount">${tx.amount.toFixed(2)}</div>
        <div style={{ marginTop: 10 }}>
          <span className="success-badge" style={{ fontSize: 13, padding: '4px 12px' }}>
            ✓ {tx.status}
          </span>
        </div>
      </div>

      <div className="receipt-card">
        <div style={{ padding: '12px 16px', fontWeight: 600, fontSize: 15, borderBottom: '1px solid var(--border)' }}>
          Transaction Details
        </div>
        {isIn ? (
          <>
            <div className="receipt-row">
              <span className="label">Credited to</span>
              <span className="value">Available Balance ›</span>
            </div>
            <div className="receipt-row">
              <span className="label">Sender Details</span>
              <span className="value">
                {tx.sender || '—'}<br />
                <span className="muted">JOYJET | {tx.senderPhone || '—'}</span>
              </span>
            </div>
          </>
        ) : (
          <div className="receipt-row">
            <span className="label">Recipient Details</span>
            <span className="value">
              {tx.recipient || '—'}<br />
              <span className="muted">JOYJET | {tx.recipientPhone || '—'}</span>
            </span>
          </div>
        )}
        <div className="receipt-row">
          <span className="label">Payment Method</span>
          <span className="value">{tx.method || '—'} ›</span>
        </div>
        <div className="receipt-row">
          <span className="label">Transaction No.</span>
          <span className="value" style={{ fontSize: 13 }}>{tx.txnNo}</span>
        </div>
        <div className="receipt-row">
          <span className="label">Transaction Date</span>
          <span className="value">{tx.date}</span>
        </div>
      </div>

      <div className="receipt-card">
        <div style={{ padding: '12px 16px', fontWeight: 600, fontSize: 15, borderBottom: '1px solid var(--border)' }}>
          More Actions
        </div>
        <div className="receipt-row">
          <span className="label">Category</span>
          <span className="value">{tx.category} ›</span>
        </div>
        <div style={{ display: 'flex', gap: 24, padding: '14px 16px', fontSize: 14, color: 'var(--primary)' }}>
          <span>{isIn ? '↻ Transfer Back' : '↻ Transfer Again'}</span>
          <span>⏱ View Records</span>
        </div>
      </div>

      <div className={`action-buttons ${isIn ? 'single' : ''}`}>
        {!isIn && (
          <button type="button" className="btn btn-outline">Report Issue</button>
        )}
        <button type="button" className="btn btn-primary">Share Receipt</button>
      </div>
    </>
  )
}
