import React, { useEffect, useRef, useState } from 'react'

export default function GoalModal({ mode, goal, available, onClose, onContribute, onCreate }) {
  const [amount, setAmount] = useState('')
  const [name, setName] = useState('')
  const [target, setTarget] = useState('')
  const firstRef = useRef(null)
  const panelRef = useRef(null)

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
    if (mode === 'contribute') {
      const amt = parseFloat(amount)
      if (amt > 0 && amt <= available) {
        onContribute(goal.id, amt)
        onClose()
      }
    } else if (name.trim() && parseFloat(target) > 0) {
      onCreate(name.trim(), parseFloat(target))
      onClose()
    }
  }

  return (
    <div className="modal-overlay" role="presentation" onClick={onClose}>
      <div
        className="modal-sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby="goal-modal-title"
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="goal-modal-title">
          {mode === 'contribute' ? `Contribute to ${goal?.name}` : 'Create New Goal'}
        </h2>
        <form onSubmit={submit}>
          {mode === 'contribute' ? (
            <>
              <label htmlFor="contrib-amt">Amount (Available: ${available.toFixed(2)})</label>
              <input
                id="contrib-amt"
                ref={firstRef}
                type="number"
                min="0.01"
                max={available}
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                required
              />
            </>
          ) : (
            <>
              <label htmlFor="goal-name">Goal name</label>
              <input
                id="goal-name"
                ref={firstRef}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Vacation Fund"
                required
              />
              <label htmlFor="goal-target">Target amount ($)</label>
              <input
                id="goal-target"
                type="number"
                min="1"
                step="1"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="1000"
                required
              />
            </>
          )}
          <div className="modal-actions">
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">
              {mode === 'contribute' ? 'Contribute' : 'Create Goal'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
