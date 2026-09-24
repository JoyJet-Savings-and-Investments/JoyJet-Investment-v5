import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../App'

function exportCSV(transactions) {
  const headers = ['Date', 'Title', 'Category', 'Type', 'Amount', 'Status', 'Txn No', 'Month']
  const rows = transactions.map((t) =>
    [t.date, t.title, t.category, t.type, t.amount, t.status, t.txnNo, t.month]
      .map((c) => `"${String(c).replace(/"/g, '""')}"`)
      .join(',')
  )
  const csv = [headers.join(','), ...rows].join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `joyjet-transactions-${Date.now()}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

export default function Transactions() {
  const { state, monthly, loading, refresh } = useApp()
  const months = Object.keys(monthly).sort().reverse()
  const [month, setMonth] = useState(months[0] || 'Sep 2026')
  const [category, setCategory] = useState('All')
  const summary = monthly[month] || { in: 0, out: 0 }

  let filtered = state.transactions.filter((t) => t.month === month)
  if (category !== 'All') filtered = filtered.filter((t) => t.category === category)

  const [ptr, setPtr] = useState(0)
  const startY = useRef(0)
  const onTouchStart = (e) => { startY.current = e.touches[0].clientY }
  const onTouchMove = (e) => {
    const dy = e.touches[0].clientY - startY.current
    if (dy > 0 && window.scrollY <= 0) setPtr(Math.min(dy, 80))
  }
  const onTouchEnd = () => {
    if (ptr > 50) refresh()
    setPtr(0)
  }

  const iconClass = (tx) => {
    if (['Savings', 'Interest', 'Goal'].includes(tx.category)) return 'savings'
    return tx.type === 'in' ? 'in' : 'out'
  }
  const icon = (tx) => {
    if (tx.category === 'Invest') return '📊'
    if (['Savings', 'Interest', 'Goal'].includes(tx.category)) return '💰'
    return tx.type === 'in' ? '↓' : '↑'
  }

  const categories = ['All', 'Deposit', 'Interest', 'Invest', 'Goal', 'Transfer', 'Savings']

  return (
    <div onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
      {ptr > 20 && (
        <div className="ptr-indicator" style={{ opacity: ptr / 80 }}>
          {ptr > 50 ? 'Release to refresh' : 'Pull to refresh'}
        </div>
      )}

      <div className="status-bar">
        <span className="time">15:44</span>
        <span style={{ fontSize: 13 }}>4G 🔋</span>
      </div>

      <div className="tx-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link to="/" className="back" aria-label="Back to Home">←</Link>
          <span style={{ fontSize: 18, fontWeight: 600 }}>Transactions</span>
        </div>
        <button
          type="button"
          onClick={() => exportCSV(state.transactions)}
          style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 600, fontSize: 14, fontFamily: 'inherit', cursor: 'pointer' }}
          aria-label="Download transactions as CSV"
        >
          Download
        </button>
      </div>

      <div className="tx-filters">
        <select
          className="filter-btn"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-label="Filter by category"
        >
          {categories.map((c) => (
            <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>
          ))}
        </select>
        <button type="button" className="filter-btn">All Status ▾</button>
      </div>

      <div className="tx-summary">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <select
            style={{ fontWeight: 600, border: 'none', background: 'transparent', fontSize: 15, fontFamily: 'inherit', color: 'var(--text)', cursor: 'pointer' }}
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            aria-label="Select month"
          >
            {months.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
          <button type="button" style={{ background: 'var(--primary)', color: 'white', border: 'none', borderRadius: 999, padding: '6px 14px', fontSize: 13, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer' }}>
            Analysis
          </button>
        </div>
        {loading ? (
          <div className="skeleton skel-line" style={{ width: '50%' }} />
        ) : (
          <div className="muted" style={{ fontSize: 13 }}>
            In: <strong>${summary.in.toFixed(2)}</strong>
            &nbsp;&nbsp;
            Out: <strong>${summary.out.toFixed(2)}</strong>
          </div>
        )}
      </div>

      <div className="tx-list">
        {filtered.length === 0 && (
          <div className="muted" style={{ padding: '20px 0', textAlign: 'center' }}>No transactions this month</div>
        )}
        {filtered.map((tx) => (
          <Link to={`/transactions/${tx.id}`} key={tx.id} className="tx-item">
            <div className={`tx-icon ${iconClass(tx)}`} aria-hidden="true">{icon(tx)}</div>
            <div className="tx-info">
              <div className="tx-title">{tx.title}</div>
              <div className="tx-date">{tx.date}</div>
            </div>
            <div className="tx-right">
              <div className={`tx-amount ${tx.type}`}>
                {tx.type === 'out' ? '-' : ''}${tx.amount.toFixed(2)}
              </div>
              <span className="success-badge">{tx.status}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
