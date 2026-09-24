import React, { createContext, useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useAppState } from './hooks/useAppState'
import Home from './components/Home'
import Savings from './components/Savings'
import Transactions from './components/Transactions'
import TransactionDetail from './components/TransactionDetail'
import Profile from './components/Profile'
import LoginSettings from './components/LoginSettings'
import About from './components/About'
import BottomNav from './components/BottomNav'
import Toast from './components/Toast'

const AppCtx = createContext(null)
export const useApp = () => useContext(AppCtx)

export default function App() {
  const app = useAppState()
  return (
    <AppCtx.Provider value={app}>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/savings" element={<Savings />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/transactions/:id" element={<TransactionDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login-settings" element={<LoginSettings />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <BottomNav />
        {app.toast && <Toast message={app.toast.msg} type={app.toast.type} />}
      </div>
    </AppCtx.Provider>
  )
}
