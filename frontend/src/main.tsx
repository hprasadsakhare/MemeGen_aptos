import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react'
import { WalletCore } from '@aptos-labs/wallet-adapter-core'
import App from './App'
import './index.css'

// For now, we'll use a simple wallet adapter setup
// In production, you would add specific wallet plugins here
const wallets: WalletCore[] = []

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AptosWalletAdapterProvider plugins={wallets} autoConnect={true}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AptosWalletAdapterProvider>
    </QueryClientProvider>
  </React.StrictMode>,
) 