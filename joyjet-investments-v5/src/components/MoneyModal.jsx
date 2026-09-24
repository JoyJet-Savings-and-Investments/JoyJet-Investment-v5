import React, { useEffect, useRef, useState } from 'react'

/**
 * Modal for Add Money or Withdraw.
 * Add Money rule: min $1, max $5,000 per transaction (blocked above max).
 * Withdraw rule: blocked until Available Balance >= $10,000.
 */
export default function MoneyModal({ mode, available, addMoneyMax, addMoneyMin, withdrawalMin, canWithdraw, onClose, onAdd, onWithdraw }) {
  const [amount, setAmount] = useState('')
  const firstRef = useRef(null)
  const panelRef = useRef(null)
  const isAdd = mode === 'add'

  useEffect(() => {
    firstRef.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab' && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll('button, input, [tabindex]:not([tabindex="-1"])')
        const list = Array.from(focusable)
        if (!list.length) return
        const first = list[0]
        const last = list[list.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  const submit = (e) => {
    e.preventDefault()
    const amt = parseFloat(amount)
    if (isAdd) {
      if (onAdd(amt)) onClose()
    } else {
      if (onWithdraw(amt)) onClose()
    }
  }

  return (
    <div className="modal-overlay" role="presentation" onClick={onClose}>
      <div
        className="modal-sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby="money-modal-title"
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="money-modal-title">{isAdd ? 'Add Money' : 'Withdraw'}</h2>

        {isAdd ? (
          <p className="muted" style={{ marginBottom: 12, fontSize: 13 }}>
            Rule: Minimum ${addMoneyMin}, maximum ${addMoneyMax.toLocaleString()} per transaction.
            Amounts above ${addMoneyMax.toLocaleString()} are blocked.
          </p>
        ) : (
          <p className="muted" style={{ marginBottom: 12, fontSize: 13 }}>
            {canWithdraw
              ? `Available: $${available.toFixed(2)}`
              : `Withdrawal blocked until balance reaches $${withdrawalMin.toLocaleString()}. Current: $${available.toFixed(2)}.`}
          </p>
        )}

        <form onSubmit={submit}>
          <label htmlFor="money-amt">Amount (USD)</label>
          <input
            id="money-amt"
            ref={firstRef}
            type="number"
            min={isAdd ? addMoneyMin : 0.01}
            max={isAdd ? addMoneyMax : available}
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            required
            disabled={!isAdd && !canWithdraw}
          />
          <div className="modal-actions">
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!isAdd && !canWithdraw}
            >
              {isAdd ? 'Add Money' : 'Withdraw'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
