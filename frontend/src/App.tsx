import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Generator } from './pages/Generator'
import { Dashboard } from './pages/Dashboard'
import { Explore } from './pages/Explore'
import { WalletProvider } from './components/WalletProvider'

function App() {
  return (
    <WalletProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/generator" element={<Generator />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/explore" element={<Explore />} />
        </Routes>
      </Layout>
    </WalletProvider>
  )
}

export default App 