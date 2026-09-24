# JOYJET INVESTMENTS v5

Clean, professional mobile-first savings & investment dashboard.

## CSS Grid layout system

| Class / area | Grid structure | Use |
|--------------|----------------|-----|
| `.quick-actions` | `repeat(4, 1fr)` | Transfer, Add Money, Withdraw, Savings |
| `.service-grid` | `repeat(4, 1fr)` | Airtime, Data, Invest, SafeBox… |
| `.savings-grid` | `repeat(2, 1fr)` | OWealth, Targets, SafeBox, Fixed, Spend & Save |
| `.savings-balance-card` | `1fr 1fr` | Savings Balance \| Available Cash |
| `.balance-row` | `1fr 1fr` | Available Balance \| Commission |
| `.tx-item` | `42px 1fr auto` | Icon \| Title/Date \| Amount |
| `.tx-filters` | `1fr 1fr` | Category \| Status |
| `.receipt-row` | `1fr 1.2fr` | Label \| Value |
| `.action-buttons` | `1fr 1fr` (or single) | Report / Share |
| `.bottom-nav` | `repeat(4, 1fr)` | Home, Savings, History, Me |
| `.profile-header` | `auto 1fr auto` | Avatar \| Name \| Shield |
| `.list-item` | `1fr auto` | Label \| Chevron |
| `.modal-actions` | `1fr 1fr` | Cancel \| Submit |
| `.holdings-row` | `1fr auto` | Symbol \| Value |

Gaps use CSS variables: `--gap-sm` (8px), `--gap-md` (12px), `--gap-lg` (16px).  
Page horizontal padding: `--page-pad` (16px).  
App shell max-width **430px** (mobile-first).

## Money rules

| Action | Rule |
|--------|------|
| **Add Money** | Min **$1**, max **$5,000** per transaction. Higher amounts are **blocked**. |
| **Withdraw** | **Blocked** until Available Balance ≥ **$10,000**. |

## Features

- Home, Savings plans, Goals, Transactions list + receipt, Profile, Login Settings, About
- Bottom navigation, dark mode, skeletons, pull-to-refresh, CSV export
- Accessible modals (focus trap, Escape), service worker, 365-day cookie + localStorage
- USD mock data; all balances and history displayed

## Quick start

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Deploy `dist/` to GitHub Pages / Vercel / Netlify (`base: './'`).

## License

MIT
