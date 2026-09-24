import React, { useState } from 'react'
import { useApp } from '../App'
import { totalSavings } from '../data/seed'
import GoalModal from './GoalModal'

const PLANS = [
  { key: 'owealth', icon: '💜', title: 'OWealth', desc: 'Daily returns. Withdraw anytime.', bg: '#f5f3ff' },
  { key: 'targets', icon: '💙', title: 'Targets', desc: 'Save daily, weekly or monthly toward a goal.' },
  { key: 'safebox', icon: '❤️', title: 'SafeBox', desc: 'Automatic daily, weekly or monthly savings.' },
  { key: 'fixed', icon: '💚', title: 'Fixed', desc: '7–1000 day locked savings plan.' },
  { key: 'spendAndSave', icon: '🧡', title: 'Spend & Save', desc: 'Auto-save a % every time you spend.', bg: '#fff7ed' },
]

export default function Savings() {
  const { state, contributeToGoal, createGoal } = useApp()
  const { savings, goals, user } = state
  const [modal, setModal] = useState(null)

  return (
    <>
      <div className="status-bar">
        <span className="time">11:40</span>
        <span style={{ fontSize: 13 }}>LTE 🔋</span>
      </div>

      <div className="savings-header">
        <h1>Savings</h1>
        <div className="muted" style={{ marginTop: 4 }}>Powered by JOYJET INVESTMENTS</div>
      </div>

      <div className="savings-balance-card">
        <div>
          <div className="muted">Savings Balance</div>
          <div className="amount" style={{ marginTop: 4 }}>${totalSavings(savings).toFixed(2)}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className="muted">Available Cash</div>
          <div className="amount" style={{ marginTop: 4 }}>${user.availableBalance.toFixed(2)}</div>
        </div>
      </div>

      <div style={{ padding: '0 16px 8px', fontWeight: 600, fontSize: 15 }}>Savings Plans</div>
      <div className="savings-grid">
        {PLANS.map((p) => (
          <div key={p.key} className="savings-card" style={p.bg ? { background: p.bg } : undefined}>
            <h3><span aria-hidden="true">{p.icon}</span> {p.title}</h3>
            <p>{p.desc}</p>
            <div className="amount">${(savings[p.key] || 0).toFixed(2)}</div>
          </div>
        ))}
      </div>

      <div style={{ padding: '8px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: 600, fontSize: 16 }}>Savings Goals</span>
        <button
          type="button"
          className="btn btn-primary"
          style={{ width: 'auto', padding: '6px 14px', fontSize: 13 }}
          onClick={() => setModal({ mode: 'create' })}
        >
          + New Goal
        </button>
      </div>

      {goals.map((g) => {
        const pct = Math.min(100, Math.round((g.current / g.target) * 100)) || 0
        return (
          <div key={g.id} className="goal-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 500 }}>{g.icon} {g.name}</span>
              <span className="muted">{pct}%</span>
            </div>
            <div className="muted" style={{ fontSize: 12, marginTop: 2 }}>
              ${g.current.toLocaleString()} / ${g.target.toLocaleString()}
            </div>
            <div className="goal-bar" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
              <div className="goal-fill" style={{ width: `${pct}%` }} />
            </div>
            <button
              type="button"
              className="btn btn-outline"
              style={{ marginTop: 10, padding: '8px', fontSize: 13 }}
              onClick={() => setModal({ mode: 'contribute', goal: g })}
            >
              Contribute from Available Cash
            </button>
          </div>
        )
      })}

      {modal && (
        <GoalModal
          mode={modal.mode}
          goal={modal.goal}
          available={user.availableBalance}
          onClose={() => setModal(null)}
          onContribute={contributeToGoal}
          onCreate={createGoal}
        />
      )}
    </>
  )
}
