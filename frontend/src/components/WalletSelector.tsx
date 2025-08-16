import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wallet, ChevronDown, Check, X } from 'lucide-react'
import { useWalletContext } from './WalletProvider'

export const WalletSelector: React.FC = () => {
  const { wallet, connected, connecting, disconnect, select, wallets, account } = useWalletContext()
  const [isOpen, setIsOpen] = useState(false)

  const handleWalletSelect = (walletName: string) => {
    select(walletName)
    setIsOpen(false)
  }

  const handleDisconnect = () => {
    disconnect()
    setIsOpen(false)
  }

  if (connected && wallet && account) {
    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all duration-200"
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary-500/20 rounded-lg flex items-center justify-center">
              <Wallet className="w-4 h-4 text-primary-400" />
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-white">{wallet.name}</p>
              <p className="text-xs text-white/60">
                {account.address?.slice(0, 6)}...{account.address?.slice(-4)}
              </p>
            </div>
          </div>
          <ChevronDown className={`w-4 h-4 text-white/60 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-full left-0 right-0 mb-2 p-2 bg-slate-800/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl"
            >
              <button
                onClick={handleDisconnect}
                className="w-full flex items-center space-x-3 p-3 text-left text-red-400 hover:bg-red-500/10 rounded-lg transition-colors duration-200"
              >
                <X className="w-4 h-4" />
                <span className="text-sm font-medium">Disconnect</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={connecting}
        className="w-full flex items-center justify-center space-x-2 p-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-white font-medium transition-all duration-200 transform hover:scale-105"
      >
        {connecting ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Connecting...</span>
          </>
        ) : (
          <>
            <Wallet className="w-4 h-4" />
            <span>Connect Wallet</span>
          </>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full left-0 right-0 mb-2 p-2 bg-slate-800/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl max-h-64 overflow-y-auto"
          >
            <div className="space-y-1">
              {wallets.map((walletOption) => (
                <button
                  key={walletOption.name}
                  onClick={() => handleWalletSelect(walletOption.name)}
                  className="w-full flex items-center space-x-3 p-3 text-left text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors duration-200"
                >
                  {walletOption.icon && (
                    <img
                      src={walletOption.icon}
                      alt={walletOption.name}
                      className="w-6 h-6 rounded-lg"
                    />
                  )}
                  <span className="text-sm font-medium">{walletOption.name}</span>
                  {walletOption.readyState === 'Installed' && (
                    <Check className="w-4 h-4 text-success-400 ml-auto" />
                  )}
                </button>
              ))}
            </div>
            
            <div className="mt-3 pt-3 border-t border-white/10">
              <p className="text-xs text-white/50 text-center">
                Don't have a wallet?{' '}
                <a
                  href="https://petra.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-400 hover:text-primary-300 underline"
                >
                  Get one here
                </a>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 