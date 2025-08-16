import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Home, 
  Zap, 
  BarChart3, 
  Compass, 
  Wallet, 
  Menu, 
  X,
  Rocket,
  Coins,
  TrendingUp
} from 'lucide-react'
import { useWalletContext } from './WalletProvider'
import { WalletSelector } from './WalletSelector'

interface LayoutProps {
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { connected, account } = useWalletContext()
  const location = useLocation()

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Generator', href: '/generator', icon: Zap },
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
    { name: 'Explore', href: '/explore', icon: Compass },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
        <div className="fixed left-0 top-0 h-full w-64 bg-slate-800/95 backdrop-blur-xl border-r border-white/10">
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center space-x-2">
              <Rocket className="h-8 w-8 text-primary-400" />
              <span className="text-xl font-bold gradient-text">MemeGen</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-white/60 hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="p-6 space-y-4">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              )
            })}
          </nav>
          <div className="absolute bottom-6 left-6 right-6">
            <WalletSelector />
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-slate-800/50 backdrop-blur-xl border-r border-white/10">
          <div className="flex items-center space-x-3 p-6 border-b border-white/10">
            <Rocket className="h-8 w-8 text-primary-400" />
            <span className="text-xl font-bold gradient-text">MemeGen</span>
          </div>
          
          <nav className="flex-1 p-6 space-y-4">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* Stats */}
          <div className="p-6 border-t border-white/10">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/60">Total Coins</span>
                <span className="text-primary-400 font-semibold">1,234</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/60">Volume 24h</span>
                <span className="text-success-400 font-semibold">$2.5M</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/60">Active Users</span>
                <span className="text-secondary-400 font-semibold">5.2K</span>
              </div>
            </div>
          </div>

          {/* Wallet */}
          <div className="p-6 border-t border-white/10">
            <WalletSelector />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 bg-slate-800/50 backdrop-blur-xl border-b border-white/10">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-white/60 hover:text-white"
            >
              <Menu className="h-6 w-6" />
            </button>
            
            <div className="flex items-center space-x-4">
              {connected && account && (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 px-3 py-2 bg-white/5 rounded-lg border border-white/10">
                    <Coins className="h-4 w-4 text-primary-400" />
                    <span className="text-sm text-white/80">APT</span>
                    <span className="text-sm font-medium text-white">0.00</span>
                  </div>
                  <div className="flex items-center space-x-2 px-3 py-2 bg-white/5 rounded-lg border border-white/10">
                    <TrendingUp className="h-4 w-4 text-success-400" />
                    <span className="text-sm text-white/80">Portfolio</span>
                    <span className="text-sm font-medium text-success-400">+12.5%</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  )
} 