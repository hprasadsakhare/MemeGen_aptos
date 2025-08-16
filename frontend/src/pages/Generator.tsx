import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Zap, 
  Coins, 
  TrendingUp, 
  Users, 
  Rocket, 
  Copy, 
  Check,
  AlertCircle,
  Info,
  Sparkles,
  Shield
} from 'lucide-react'
import { useWalletContext } from '../components/WalletProvider'
import { TokenomicsChart } from '../components/TokenomicsChart'

interface CoinFormData {
  name: string
  symbol: string
  description: string
  totalSupply: string
  decimals: number
}

interface Tokenomics {
  liquidityPool: number
  communityRewards: number
  teamTokens: number
  marketing: number
  development: number
}

export const Generator: React.FC = () => {
  const { connected, account } = useWalletContext()
  const [formData, setFormData] = useState<CoinFormData>({
    name: '',
    symbol: '',
    description: '',
    totalSupply: '1000000',
    decimals: 8
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedCoin, setGeneratedCoin] = useState<any>(null)
  const [copied, setCopied] = useState<string | null>(null)

  const handleInputChange = (field: keyof CoinFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const calculateTokenomics = (totalSupply: number): Tokenomics => {
    return {
      liquidityPool: Math.floor((totalSupply * 40) / 100),
      communityRewards: Math.floor((totalSupply * 25) / 100),
      teamTokens: Math.floor((totalSupply * 15) / 100),
      marketing: Math.floor((totalSupply * 10) / 100),
      development: Math.floor((totalSupply * 10) / 100)
    }
  }

  const generateMemeCoin = async () => {
    if (!connected || !account) {
      alert('Please connect your wallet first')
      return
    }

    if (!formData.name || !formData.symbol || !formData.description) {
      alert('Please fill in all required fields')
      return
    }

    setIsGenerating(true)

    try {
      // Simulate API call - replace with actual Move contract call
      await new Promise(resolve => setTimeout(resolve, 2000))

      const totalSupply = parseInt(formData.totalSupply)
      const tokenomics = calculateTokenomics(totalSupply)

      const coin = {
        name: formData.name,
        symbol: formData.symbol,
        description: formData.description,
        totalSupply,
        decimals: formData.decimals,
        tokenomics,
        contractAddress: `0x${Math.random().toString(16).substr(2, 40)}`,
        creator: account.address,
        createdAt: new Date().toISOString(),
        status: 'Generated'
      }

      setGeneratedCoin(coin)
    } catch (error) {
      console.error('Error generating coin:', error)
      alert('Error generating coin. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(type)
      setTimeout(() => setCopied(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const deployCoin = async () => {
    if (!generatedCoin) return

    try {
      // Simulate deployment - replace with actual Move contract deployment
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      setGeneratedCoin(prev => ({ ...prev, status: 'Deployed' }))
      alert('Coin deployed successfully!')
    } catch (error) {
      console.error('Error deploying coin:', error)
      alert('Error deploying coin. Please try again.')
    }
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
            <Zap className="w-12 h-12 text-primary-400" />
          </div>
          <h1 className="text-4xl font-bold">Connect Your Wallet</h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            To generate meme coins, you need to connect your Aptos wallet first. 
            This ensures secure transactions and proper ownership of your generated coins.
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
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold">🚀 Meme Coin Generator</h1>
        <p className="text-xl text-white/70 max-w-3xl mx-auto">
          Create your own meme coin in minutes with automated tokenomics, smart contracts, and instant deployment on Aptos
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="card space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-500/20 rounded-xl flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary-400" />
              </div>
              <h2 className="text-2xl font-semibold text-white">Coin Details</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Coin Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="e.g., DogeMoon, CatCoin, PepeToken"
                  className="input-field w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Symbol *
                </label>
                <input
                  type="text"
                  value={formData.symbol}
                  onChange={(e) => handleInputChange('symbol', e.target.value.toUpperCase())}
                  placeholder="e.g., DOGE, CAT, PEPE"
                  className="input-field w-full"
                  maxLength={10}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe your meme coin's purpose and community..."
                  rows={3}
                  className="input-field w-full resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Total Supply *
                </label>
                <input
                  type="number"
                  value={formData.totalSupply}
                  onChange={(e) => handleInputChange('totalSupply', e.target.value)}
                  placeholder="1000000"
                  className="input-field w-full"
                  min="1000"
                />
                <p className="text-xs text-white/50 mt-1">
                  Recommended: 1,000,000 - 1,000,000,000
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Decimals
                </label>
                <select
                  value={formData.decimals}
                  onChange={(e) => handleInputChange('decimals', parseInt(e.target.value))}
                  className="input-field w-full"
                >
                  <option value={6}>6 (Standard)</option>
                  <option value={8}>8 (High Precision)</option>
                  <option value={9}>9 (Maximum)</option>
                </select>
              </div>
            </div>

            <button
              onClick={generateMemeCoin}
              disabled={isGenerating || !formData.name || !formData.symbol || !formData.description}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <div className="flex items-center space-x-2">
                  <div className="spinner w-5 h-5" />
                  <span>Generating...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5" />
                  <span>Generate Meme Coin</span>
                </div>
              )}
            </button>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="card text-center space-y-3">
              <div className="w-12 h-12 bg-success-500/20 rounded-xl flex items-center justify-center mx-auto">
                <Coins className="w-6 h-6 text-success-400" />
              </div>
              <h3 className="font-semibold text-white">Automated Tokenomics</h3>
              <p className="text-sm text-white/70">Smart distribution for optimal performance</p>
            </div>
            <div className="card text-center space-y-3">
              <div className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center mx-auto">
                <Shield className="w-6 h-6 text-primary-400" />
              </div>
              <h3 className="font-semibold text-white">Secure Contracts</h3>
              <p className="text-sm text-white/70">Built with Move on Aptos</p>
            </div>
          </div>
        </motion.div>

        {/* Preview Section */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          {generatedCoin ? (
            <div className="card space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-white">Generated Coin</h2>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  generatedCoin.status === 'Generated' 
                    ? 'bg-warning-500/20 text-warning-400' 
                    : 'bg-success-500/20 text-success-400'
                }`}>
                  {generatedCoin.status}
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <h3 className="font-semibold text-white mb-2">{generatedCoin.name} ({generatedCoin.symbol})</h3>
                  <p className="text-white/70 text-sm">{generatedCoin.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-white/5 rounded-lg">
                    <p className="text-2xl font-bold gradient-text">{generatedCoin.totalSupply.toLocaleString()}</p>
                    <p className="text-xs text-white/60">Total Supply</p>
                  </div>
                  <div className="text-center p-3 bg-white/5 rounded-lg">
                    <p className="text-2xl font-bold gradient-text">{generatedCoin.decimals}</p>
                    <p className="text-xs text-white/60">Decimals</p>
                  </div>
                </div>

                {/* Tokenomics Chart */}
                <div>
                  <h4 className="font-semibold text-white mb-3">Tokenomics Distribution</h4>
                  <TokenomicsChart tokenomics={generatedCoin.tokenomics} />
                </div>

                {/* Contract Address */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Contract Address
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={generatedCoin.contractAddress}
                      readOnly
                      className="input-field flex-1 font-mono text-sm"
                    />
                    <button
                      onClick={() => copyToClipboard(generatedCoin.contractAddress, 'address')}
                      className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200"
                    >
                      {copied === 'address' ? (
                        <Check className="w-4 h-4 text-success-400" />
                      ) : (
                        <Copy className="w-4 h-4 text-white/60" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  {generatedCoin.status === 'Generated' && (
                    <button
                      onClick={deployCoin}
                      className="btn-primary w-full"
                    >
                      <Rocket className="w-5 h-5 mr-2" />
                      Deploy to Blockchain
                    </button>
                  )}
                  
                  <button
                    onClick={() => copyToClipboard(JSON.stringify(generatedCoin, null, 2), 'data')}
                    className="btn-outline w-full"
                  >
                    <Copy className="w-5 h-5 mr-2" />
                    Copy Coin Data
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="card text-center space-y-6 py-12">
              <div className="w-24 h-24 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto">
                <Zap className="w-12 h-12 text-primary-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-white">Ready to Generate</h3>
                <p className="text-white/70">
                  Fill out the form on the left and click "Generate Meme Coin" to create your token
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Success Message */}
      <AnimatePresence>
        {generatedCoin && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="card max-w-2xl mx-auto text-center space-y-4"
          >
            <div className="w-16 h-16 bg-success-500/20 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 text-success-400" />
            </div>
            <h3 className="text-2xl font-semibold text-white">Coin Generated Successfully!</h3>
            <p className="text-white/70">
              Your meme coin "{generatedCoin.name}" has been generated with smart contracts and tokenomics. 
              Deploy it to the blockchain to start trading!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 