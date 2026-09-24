/**
 * Hard-coded mock data in USD.
 * Rules:
 *   - Withdraw blocked until Available Balance >= $10,000
 *   - Add Money blocked if amount > $5,000 per transaction (max single deposit)
 *   - Add Money blocked if amount < $1
 */

export const WITHDRAWAL_MIN = 10000
export const ADD_MONEY_MAX = 5000
export const ADD_MONEY_MIN = 1

export const INITIAL = {
  user: {
    name: 'JOY REUBEN',
    shortName: 'JOY',
    phone: '912***717',
    availableBalance: 312.45,
    commission: 8.20,
  },
  savings: {
    owealth: 152.32,
    targets: 45.00,
    safebox: 20.00,
    fixed: 15.00,
    spendAndSave: 15.75,
  },
  holdings: [
    { symbol: 'BTC', name: 'Bitcoin', class: 'Crypto', units: 0.012, cost: 980, market: 1050 },
    { symbol: 'ETH', name: 'Ethereum', class: 'Crypto', units: 0.25, cost: 720, market: 787.5 },
    { symbol: 'VTSAX', name: 'Vanguard Total Stock', class: 'Fund', units: 2.1, cost: 210, market: 225 },
    { symbol: 'AAPL', name: 'Apple', class: 'Stock', units: 1.5, cost: 270, market: 285 },
  ],
  goals: [
    { id: 'g1', name: 'Emergency Fund', target: 5000, current: 1240, icon: '🛡️' },
    { id: 'g2', name: 'Home Down Payment', target: 25000, current: 3800, icon: '🏠' },
    { id: 'g3', name: 'Retirement Boost', target: 100000, current: 12500, icon: '📈' },
  ],
  transactions: [
    { id: '1', type: 'in', title: 'Transfer from JOY REUBEN', amount: 150.00, date: 'Sep 18, 2026 15:38', status: 'Successful', category: 'Transfer', month: 'Sep 2026', txnNo: 'JJ20260918001', sender: 'JOY REUBEN', senderPhone: '912***717', method: 'Available Balance' },
    { id: '2', type: 'in', title: 'OWealth Interest Credit', amount: 12.40, date: 'Sep 17, 2026 22:40', status: 'Successful', category: 'Interest', month: 'Sep 2026', txnNo: 'JJ20260917002', method: 'OWealth' },
    { id: '3', type: 'in', title: 'Spend & Save Auto-Deposit', amount: 40.00, date: 'Sep 17, 2026 22:37', status: 'Successful', category: 'Savings', month: 'Sep 2026', txnNo: 'JJ20260917003', method: 'Spend & Save' },
    { id: '4', type: 'in', title: 'Transfer from External', amount: 97.60, date: 'Sep 15, 2026 09:12', status: 'Successful', category: 'Transfer', month: 'Sep 2026', txnNo: 'JJ20260915004', sender: 'External', senderPhone: '---', method: 'Bank Transfer' },
    { id: '5', type: 'out', title: 'Transfer to DESMOND OGBONNA', amount: 84.00, date: 'Aug 28, 2026 14:22', status: 'Successful', category: 'Transfer', month: 'Aug 2026', txnNo: 'JJ20260828005', recipient: 'DESMOND OGBONNA ODOH', recipientPhone: '704 304 4887', method: 'OWealth' },
    { id: '6', type: 'in', title: 'Salary Deposit', amount: 185.50, date: 'Aug 01, 2026 08:00', status: 'Successful', category: 'Deposit', month: 'Aug 2026', txnNo: 'JJ20260801006', method: 'Direct Deposit' },
    { id: '7', type: 'out', title: 'Goal Contribution – Emergency', amount: 42.00, date: 'Aug 05, 2026 11:30', status: 'Successful', category: 'Goal', month: 'Aug 2026', txnNo: 'JJ20260805007', method: 'Available Balance' },
    { id: '8', type: 'in', title: 'Interest – Fixed Plan', amount: 4.25, date: 'Jul 30, 2026 00:01', status: 'Successful', category: 'Interest', month: 'Jul 2026', txnNo: 'JJ20260730008', method: 'Fixed' },
    { id: '9', type: 'out', title: 'Buy AAPL (0.5 share)', amount: 15.75, date: 'Jul 12, 2026 10:45', status: 'Successful', category: 'Invest', month: 'Jul 2026', txnNo: 'JJ20260712009', method: 'Available Balance' },
    { id: '10', type: 'in', title: 'Transfer In', amount: 220.00, date: 'Jul 01, 2026 09:00', status: 'Successful', category: 'Transfer', month: 'Jul 2026', txnNo: 'JJ20260701010', method: 'Bank Transfer' },
  ],
}

export function calcMonthly(transactions) {
  const map = {}
  transactions.forEach((t) => {
    if (!map[t.month]) map[t.month] = { in: 0, out: 0 }
    if (t.type === 'in') map[t.month].in += t.amount
    else map[t.month].out += t.amount
  })
  return map
}

export function totalSavings(s) {
  return +(s.owealth + s.targets + s.safebox + s.fixed + s.spendAndSave).toFixed(2)
}

export function canWithdraw(balance) {
  return balance >= WITHDRAWAL_MIN
}

/** Add Money rule: amount must be between ADD_MONEY_MIN and ADD_MONEY_MAX */
export function canAddMoney(amount) {
  const n = Number(amount)
  if (Number.isNaN(n) || n < ADD_MONEY_MIN) return { ok: false, reason: `Minimum add is $${ADD_MONEY_MIN}.` }
  if (n > ADD_MONEY_MAX) return { ok: false, reason: `Add Money blocked. Maximum per transaction is $${ADD_MONEY_MAX.toLocaleString()}.` }
  return { ok: true }
}
