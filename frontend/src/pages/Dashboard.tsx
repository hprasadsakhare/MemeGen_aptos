import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart3, 
  Coins, 
  TrendingUp, 
  Users, 
  Eye, 
  Edit, 
  Trash2, 
  Copy,
  Check,
  Plus,
  Search,
  Filter
} from 'lucide-react'
import { useWalletContext } from '../components/WalletProvider'

interface Coin {
  id: string
  name: string
  symbol: string
  description: string
  totalSupply: number
  status: 'Generated' | 'Deployed' | 'Active' | 'Paused'
  createdAt: string
  contractAddress: string
  price: number
  marketCap: number
  volume24h: number
  holders: number
}

export const Dashboard: React.FC = () => {
  const { connected, account } = useWalletContext()
  const [coins, setCoins] = useState<Coin[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [copied, setCopied] = useState<string | null>(null)

  // Mock data - replace with actual API calls
  useEffect(() => {
    if (connected && account) {
      const mockCoins: Coin[] = [
        {
          id: '1',
          name: 'DogeMoon',
          symbol: 'DOGE',
          description: 'The ultimate moon mission token',
          totalSupply: 1000000,
          status: 'Active',
          createdAt: '2024-01-15T10:30:00Z',
          contractAddress: '0x1234567890abcdef1234567890abcdef12345678',
          price: 0.000123,
          marketCap: 123000,
          volume24h: 45600,
          holders: 1250
        },
        {
          id: '2',
          name: 'CatCoin',
          symbol: 'CAT',
          description: 'Purr-fect community token',
          totalSupply: 500000,
          status: 'Deployed',
          createdAt: '2024-01-10T14:20:00Z',
          contractAddress: '0xabcdef1234567890abcdef1234567890abcdef12',
          price: 0.000456,
          marketCap: 228000,
          volume24h: 78900,
          holders: 890
        }
      ]
      setCoins(mockCoins)
    }
  }, [connected, account])

  const filteredCoins = coins.filter(coin => {
    const matchesSearch = coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || coin.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(type)
      setTimeout(() => setCopied(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-success-500/20 text-success-400 border-success-500/30'
      case 'Deployed': return 'bg-primary-500/20 text-primary-400 border-primary-500/30'
      case 'Generated': return 'bg-warning-500/20 text-warning-400 border-warning-500/30'
      case 'Paused': return 'bg-error-500/20 text-error-400 border-error-500/30'
      default: return 'bg-white/10 text-white/60 border-white/20'
    }
  }

  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`
    if (value >= 1000) return `$${(value / 1000).toFixed(2)}K`
    return `$${value.toFixed(2)}`
  }

  if (!connected) {
    return (
      <div className="text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="w-24 h-24 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto">
            <BarChart3 className="w-12 h-12 text-primary-400" />
          </div>
          <h1 className="text-4xl font-bold">Connect Your Wallet</h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Connect your Aptos wallet to view your dashboard and manage your generated meme coins.
          </p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Dashboard</h1>
            <p className="text-xl text-white/70">Manage your meme coins and track performance</p>
          </div>
          <button className="btn-primary flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>Create New Coin</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="card text-center space-y-3"
          >
            <div className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center mx-auto">
              <Coins className="w-6 h-6 text-primary-400" />
            </div>
            <div className="text-3xl font-bold gradient-text">{coins.length}</div>
            <p className="text-white/70 text-sm">Total Coins</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card text-center space-y-3"
          >
            <div className="w-12 h-12 bg-success-500/20 rounded-xl flex items-center justify-center mx-auto">
              <TrendingUp className="w-6 h-6 text-success-400" />
            </div>
            <div className="text-3xl font-bold gradient-text">
              {formatCurrency(coins.reduce((sum, coin) => sum + coin.marketCap, 0))}
            </div>
            <p className="text-white/70 text-sm">Total Market Cap</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="card text-center space-y-3"
          >
            <div className="w-12 h-12 bg-secondary-500/20 rounded-xl flex items-center justify-center mx-auto">
              <BarChart3 className="w-6 h-6 text-secondary-400" />
            </div>
            <div className="text-3xl font-bold gradient-text">
              {formatCurrency(coins.reduce((sum, coin) => sum + coin.volume24h, 0))}
            </div>
            <p className="text-white/70 text-sm">24h Volume</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="card text-center space-y-3"
          >
            <div className="w-12 h-12 bg-warning-500/20 rounded-xl flex items-center justify-center mx-auto">
              <Users className="w-6 h-6 text-warning-400" />
            </div>
            <div className="text-3xl font-bold gradient-text">
              {coins.reduce((sum, coin) => sum + coin.holders, 0).toLocaleString()}
            </div>
            <p className="text-white/70 text-sm">Total Holders</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="card space-y-4"
      >
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              placeholder="Search coins..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field w-full pl-10"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-white/60" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input-field"
            >
              <option value="all">All Status</option>
              <option value="Generated">Generated</option>
              <option value="Deployed">Deployed</option>
              <option value="Active">Active</option>
              <option value="Paused">Paused</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Coins Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="card space-y-4"
      >
        <h2 className="text-2xl font-semibold text-white">Your Coins</h2>
        
        {filteredCoins.length === 0 ? (
          <div className="text-center py-12 space-y-4">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto">
              <Coins className="w-8 h-8 text-white/40" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-white/60">No coins found</h3>
              <p className="text-white/40">Create your first meme coin to get started</p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-white/60 font-medium">Coin</th>
                  <th className="text-left py-3 px-4 text-white/60 font-medium">Status</th>
                  <th className="text-left py-3 px-4 text-white/60 font-medium">Price</th>
                  <th className="text-left py-3 px-4 text-white/60 font-medium">Market Cap</th>
                  <th className="text-left py-3 px-4 text-white/60 font-medium">24h Volume</th>
                  <th className="text-left py-3 px-4 text-white/60 font-medium">Holders</th>
                  <th className="text-left py-3 px-4 text-white/60 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCoins.map((coin, index) => (
                  <motion.tr
                    key={coin.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors duration-200"
                  >
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <div className="font-medium text-white">{coin.name}</div>
                        <div className="text-sm text-white/60">{coin.symbol}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(coin.status)}`}>
                        {coin.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-white">${coin.price.toFixed(6)}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-white">{formatCurrency(coin.marketCap)}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-white">{formatCurrency(coin.volume24h)}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-white">{coin.holders.toLocaleString()}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => copyToClipboard(coin.contractAddress, coin.id)}
                          className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200"
                          title="Copy contract address"
                        >
                          {copied === coin.id ? (
                            <Check className="w-4 h-4 text-success-400" />
                          ) : (
                            <Copy className="w-4 h-4 text-white/60" />
                          )}
                        </button>
                        <button
                          className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200"
                          title="View details"
                        >
                          <Eye className="w-4 h-4 text-white/60" />
                        </button>
                        <button
                          className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200"
                          title="Edit coin"
                        >
                          <Edit className="w-4 h-4 text-white/60" />
                        </button>
                        <button
                          className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors duration-200"
                          title="Delete coin"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  )
} 