import { useState, useCallback, useEffect } from 'react'
import {
  INITIAL, calcMonthly, canWithdraw, canAddMoney,
  WITHDRAWAL_MIN, ADD_MONEY_MAX, ADD_MONEY_MIN,
} from '../data/seed'
import { loadState, saveState } from '../utils/storage'

function makeTx(partial) {
  const now = new Date()
  return {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    date: now.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
    status: 'Successful',
    month: now.toLocaleString('en-US', { month: 'short', year: 'numeric' }),
    txnNo: 'JJ' + Date.now(),
    ...partial,
  }
}

export function useAppState() {
  const [state, setState] = useState(() => loadState(INITIAL))
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    saveState(state)
  }, [state])

  const showToast = useCallback((msg, type = 'info') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3500)
  }, [])

  const monthly = calcMonthly(state.transactions)

  const contributeToGoal = useCallback((goalId, amount) => {
    setState((prev) => {
      const amt = Math.min(Number(amount) || 0, prev.user.availableBalance)
      if (amt <= 0) return prev
      const goals = prev.goals.map((g) =>
        g.id === goalId ? { ...g, current: +(g.current + amt).toFixed(2) } : g
      )
      const goalName = goals.find((g) => g.id === goalId)?.name || 'Goal'
      const tx = makeTx({
        type: 'out',
        title: `Goal Contribution – ${goalName}`,
        amount: amt,
        category: 'Goal',
        method: 'Available Balance',
      })
      return {
        ...prev,
        user: { ...prev.user, availableBalance: +(prev.user.availableBalance - amt).toFixed(2) },
        goals,
        transactions: [tx, ...prev.transactions],
      }
    })
    showToast('Contribution successful', 'success')
  }, [showToast])

  const createGoal = useCallback((name, target) => {
    setState((prev) => ({
      ...prev,
      goals: [...prev.goals, { id: 'g' + Date.now(), name, target: Number(target) || 0, current: 0, icon: '🎯' }],
    }))
    showToast('Goal created', 'success')
  }, [showToast])

  const attemptWithdraw = useCallback((amount) => {
    const bal = state.user.availableBalance
    if (!canWithdraw(bal)) {
      showToast(`Withdrawal blocked. Need at least $${WITHDRAWAL_MIN.toLocaleString()} available.`, 'error')
      return false
    }
    const amt = Math.min(Number(amount) || 0, bal)
    if (amt <= 0) return false
    setState((prev) => {
      const tx = makeTx({
        type: 'out',
        title: 'Withdrawal to Bank',
        amount: amt,
        category: 'Transfer',
        method: 'Bank Transfer',
      })
      return {
        ...prev,
        user: { ...prev.user, availableBalance: +(prev.user.availableBalance - amt).toFixed(2) },
        transactions: [tx, ...prev.transactions],
      }
    })
    showToast('Withdrawal successful', 'success')
    return true
  }, [state.user.availableBalance, showToast])

  const attemptAddMoney = useCallback((amount) => {
    const check = canAddMoney(amount)
    if (!check.ok) {
      showToast(check.reason, 'error')
      return false
    }
    const amt = Number(amount)
    setState((prev) => {
      const tx = makeTx({
        type: 'in',
        title: 'Add Money – Deposit',
        amount: amt,
        category: 'Deposit',
        method: 'Bank Transfer',
        sender: 'External',
        senderPhone: '---',
      })
      return {
        ...prev,
        user: { ...prev.user, availableBalance: +(prev.user.availableBalance + amt).toFixed(2) },
        transactions: [tx, ...prev.transactions],
      }
    })
    showToast(`$${amt.toFixed(2)} added successfully`, 'success')
    return true
  }, [showToast])

  const refresh = useCallback(() => {
    setLoading(true)
    setTimeout(() => setLoading(false), 600)
  }, [])

  return {
    state,
    loading,
    monthly,
    toast,
    contributeToGoal,
    createGoal,
    attemptWithdraw,
    attemptAddMoney,
    canWithdraw: canWithdraw(state.user.availableBalance),
    withdrawalMin: WITHDRAWAL_MIN,
    addMoneyMax: ADD_MONEY_MAX,
    addMoneyMin: ADD_MONEY_MIN,
    refresh,
    showToast,
  }
}
