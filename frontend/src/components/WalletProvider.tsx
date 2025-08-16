import React, { createContext, useContext, ReactNode } from 'react'
import { useWallet } from '@aptos-labs/wallet-adapter-react'
import { WalletCore } from '@aptos-labs/wallet-adapter-core'

interface WalletContextType {
  wallet: WalletCore | null
  connected: boolean
  connecting: boolean
  disconnect: () => void
  select: (walletName: string) => void
  wallets: WalletCore[]
  account: any
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export const useWalletContext = () => {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error('useWalletContext must be used within a WalletProvider')
  }
  return context
}

interface WalletProviderProps {
  children: ReactNode
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const {
    wallet,
    connected,
    connecting,
    disconnect,
    select,
    wallets,
    account,
  } = useWallet()

  const value: WalletContextType = {
    wallet,
    connected,
    connecting,
    disconnect,
    select,
    wallets,
    account,
  }

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  )
} 