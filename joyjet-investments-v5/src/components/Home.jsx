import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../App'
import { totalSavings } from '../data/seed'
import MoneyModal from './MoneyModal'

export default function Home() {
  const {
    state, loading, refresh, canWithdraw, withdrawalMin,
    addMoneyMax, addMoneyMin, attemptWithdraw, attemptAddMoney,
  } = useApp()
  const { user, holdings, savings } = state
  const [ptr, setPtr] = useState(0)
  const [moneyModal, setMoneyModal] = useState(null) // 'add' | 'withdraw'
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

  return (
    <div onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
      {ptr > 20 && (
        <div className="ptr-indicator" style={{ opacity: ptr / 80 }}>
          {ptr > 50 ? 'Release to refresh' : 'Pull to refresh'}
        </div>
      )}

      <div className="status-bar">
        <span className="time">11:40</span>
        <span style={{ fontSize: 13 }}>LTE 🔋</span>
      </div>

      <div style={{ padding: '8px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="avatar" aria-hidden="true">👤</div>
          <span className="badge-green">JOYJET INVESTMENTS</span>
        </div>
        <div style={{ display: 'flex', gap: 14, fontSize: 20 }} aria-hidden="true">
          <span>🎧</span><span>⬚</span><span>🔔</span>
        </div>
      </div>

      <div className="balance-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span aria-hidden="true">👤</span>
            <span style={{ fontWeight: 600, fontSize: 14 }}>{user.name}</span>
          </div>
          <div style={{ fontSize: 13, opacity: 0.85 }}>{user.phone} ▾</div>
        </div>
        {loading ? (
          <>
            <div className="skeleton skel-line" style={{ width: '40%' }} />
            <div className="skeleton skel-num" style={{ marginTop: 8 }} />
          </>
        ) : (
          <div className="balance-row">
            <div>
              <div className="muted" style={{ marginBottom: 4 }}>Available Balance</div>
              <div style={{ fontSize: 22, fontWeight: 700 }}>${user.availableBalance.toFixed(2)}</div>
            </div>
            <div>
              <div className="muted" style={{ marginBottom: 4 }}>Commission</div>
              <div style={{ fontSize: 22, fontWeight: 700 }}>${user.commission.toFixed(2)}</div>
            </div>
          </div>
        )}
      </div>

      {/* Rules notices */}
      {!canWithdraw && (
        <div className="rule-notice" role="status">
          Withdrawals unlock at ${withdrawalMin.toLocaleString()} available. Current: ${user.availableBalance.toFixed(2)}.
        </div>
      )}
      <div className="rule-notice" role="status" style={{ background: 'var(--primary-soft)', color: 'var(--primary)' }}>
        Add Money: max ${addMoneyMax.toLocaleString()} per transaction (higher amounts are blocked).
      </div>

      {/* Quick actions – CSS Grid 4-col */}
      <div className="quick-actions">
        <Link to="/transactions" className="action-btn">
          <div className="action-icon">↻</div>Transfer
        </Link>
        <button type="button" className="action-btn" onClick={() => setMoneyModal('add')}>
          <div className="action-icon">↓$</div>Add Money
        </button>
        <button type="button" className="action-btn" onClick={() => setMoneyModal('withdraw')}>
          <div className="action-icon">↑$</div>Withdraw
        </button>
        <Link to="/savings" className="action-btn">
          <div className="action-icon">📈</div>Savings
        </Link>
      </div>

      <div className="upgrade-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>↑</div>
          <span style={{ fontWeight: 500, fontSize: 14 }}>Build savings to unlock withdrawals</span>
        </div>
        <Link to="/savings" className="btn btn-primary" style={{ width: 'auto', padding: '6px 16px', fontSize: 13 }}>GO</Link>
      </div>

      {/* Service grid – CSS Grid 4-col */}
      <div className="service-grid">
        {[
          { icon: '📱', label: 'Airtime' }, { icon: '📶', label: 'Data' },
          { icon: '🎯', label: 'Invest' }, { icon: '🔐', label: 'SafeBox' },
          { icon: '🏧', label: 'POS' }, { icon: '🔔', label: 'Alerts' },
          { icon: '📊', label: 'Reports' }, { icon: '⋯', label: 'More' },
        ].map((i) => (
          <button type="button" key={i.label} className="service-item">
            <div className="service-icon">{i.icon}</div>{i.label}
          </button>
        ))}
      </div>

      <div className="holdings-card">
        <div style={{ fontWeight: 600, marginBottom: 10, display: 'flex', justifyContent: 'space-between' }}>
          <span>Holdings</span>
          <Link to="/savings" style={{ fontSize: 13, color: 'var(--primary)' }}>View all →</Link>
        </div>
        {loading ? (
          <><div className="skeleton skel-line" /><div className="skeleton skel-line" /><div className="skeleton skel-line" /></>
        ) : (
          holdings.map((h) => (
            <div key={h.symbol} className="holdings-row">
              <span>{h.symbol} <span className="muted">({h.class})</span></span>
              <span>${h.market.toFixed(2)}</span>
            </div>
          ))
        )}
      </div>

      <div className="holdings-card">
        <div style={{ fontWeight: 600, marginBottom: 6 }}>Total Savings</div>
        {loading ? <div className="skeleton skel-num" /> : (
          <div style={{ fontSize: 20, fontWeight: 700 }}>${totalSavings(savings).toFixed(2)}</div>
        )}
        <Link to="/savings" style={{ fontSize: 13, color: 'var(--primary)', marginTop: 6, display: 'inline-block' }}>
          Manage plans →
        </Link>
      </div>

      <div className="promo-banner">
        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>Investment-Savings Feel</div>
        <div style={{ fontSize: 12, marginBottom: 10, color: 'var(--muted)' }}>
          Grow with automated plans, goals, and portfolio tracking.
        </div>
        <Link to="/savings" className="btn btn-primary" style={{ width: 'auto', padding: '8px 18px', fontSize: 13 }}>
          Explore Plans
        </Link>
      </div>

      {moneyModal && (
        <MoneyModal
          mode={moneyModal}
          available={user.availableBalance}
          addMoneyMax={addMoneyMax}
          addMoneyMin={addMoneyMin}
          withdrawalMin={withdrawalMin}
          canWithdraw={canWithdraw}
          onClose={() => setMoneyModal(null)}
          onAdd={attemptAddMoney}
          onWithdraw={attemptWithdraw}
        />
      )}
    </div>
  )
}
