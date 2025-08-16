import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Compass, 
  Search, 
  Filter, 
  TrendingUp, 
  TrendingDown, 
  Star,
  Eye,
  Copy,
  Check,
  Heart,
  Share2,
  ArrowUpRight
} from 'lucide-react'

interface CommunityCoin {
  id: string
  name: string
  symbol: string
  description: string
  creator: string
  createdAt: string
  contractAddress: string
  price: number
  priceChange24h: number
  marketCap: number
  volume24h: number
  holders: number
  likes: number
  isLiked: boolean
  isVerified: boolean
  category: string
}

export const Explore: React.FC = () => {
  const [coins, setCoins] = useState<CommunityCoin[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('trending')
  const [copied, setCopied] = useState<string | null>(null)

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockCoins: CommunityCoin[] = [
      {
        id: '1',
        name: 'DogeMoon',
        symbol: 'DOGE',
        description: 'The ultimate moon mission token for the Doge community',
        creator: '0x1234...5678',
        createdAt: '2024-01-15T10:30:00Z',
        contractAddress: '0x1234567890abcdef1234567890abcdef12345678',
        price: 0.000123,
        priceChange24h: 15.6,
        marketCap: 123000,
        volume24h: 45600,
        holders: 1250,
        likes: 89,
        isLiked: false,
        isVerified: true,
        category: 'Meme'
      },
      {
        id: '2',
        name: 'CatCoin',
        symbol: 'CAT',
        description: 'Purr-fect community token for cat lovers worldwide',
        creator: '0xabcd...ef12',
        createdAt: '2024-01-10T14:20:00Z',
        contractAddress: '0xabcdef1234567890abcdef1234567890abcdef12',
        price: 0.000456,
        priceChange24h: -8.2,
        marketCap: 228000,
        volume24h: 78900,
        holders: 890,
        likes: 156,
        isLiked: true,
        isVerified: true,
        category: 'Community'
      },
      {
        id: '3',
        name: 'PepeToken',
        symbol: 'PEPE',
        description: 'The legendary Pepe meme token on Aptos',
        creator: '0x9876...5432',
        createdAt: '2024-01-08T09:15:00Z',
        contractAddress: '0x9876543210fedcba9876543210fedcba98765432',
        price: 0.000789,
        priceChange24h: 45.2,
        marketCap: 789000,
        volume24h: 234000,
        holders: 3200,
        likes: 342,
        isLiked: false,
        isVerified: true,
        category: 'Meme'
      },
      {
        id: '4',
        name: 'SpaceToken',
        symbol: 'SPACE',
        description: 'Exploring the final frontier of DeFi',
        creator: '0xfedc...ba98',
        createdAt: '2024-01-12T16:45:00Z',
        contractAddress: '0xfedcba9876543210fedcba9876543210fedcba98',
        price: 0.001234,
        priceChange24h: 23.1,
        marketCap: 456000,
        volume24h: 123000,
        holders: 2100,
        likes: 78,
        isLiked: false,
        isVerified: false,
        category: 'Gaming'
      }
    ]
    setCoins(mockCoins)
  }, [])

  const filteredCoins = coins.filter(coin => {
    const matchesSearch = coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         coin.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         coin.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || coin.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const sortedCoins = [...filteredCoins].sort((a, b) => {
    switch (sortBy) {
      case 'trending':
        return b.likes - a.likes
      case 'price-high':
        return b.price - a.price
      case 'price-low':
        return a.price - b.price
      case 'market-cap':
        return b.marketCap - a.marketCap
      case 'volume':
        return b.volume24h - a.volume24h
      case 'holders':
        return b.holders - a.holders
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      default:
        return 0
    }
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

  const toggleLike = (coinId: string) => {
    setCoins(prev => prev.map(coin => 
      coin.id === coinId 
        ? { ...coin, isLiked: !coin.isLiked, likes: coin.isLiked ? coin.likes - 1 : coin.likes + 1 }
        : coin
    ))
  }

  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`
    if (value >= 1000) return `$${(value / 1000).toFixed(2)}K`
    return `$${value.toFixed(2)}`
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const categories = ['all', 'Meme', 'Community', 'Gaming', 'DeFi', 'NFT', 'Other']

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold">🌍 Explore Meme Coins</h1>
        <p className="text-xl text-white/70 max-w-3xl mx-auto">
          Discover amazing meme coins created by the community. Find the next big thing in DeFi!
        </p>
      </motion.div>

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="card space-y-4"
      >
        <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              placeholder="Search coins, creators, or descriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field w-full pl-10"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-white/60" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="input-field"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input-field"
          >
            <option value="trending">Trending</option>
            <option value="newest">Newest</option>
            <option value="price-high">Price: High to Low</option>
            <option value="price-low">Price: Low to High</option>
            <option value="market-cap">Market Cap</option>
            <option value="volume">24h Volume</option>
            <option value="holders">Most Holders</option>
          </select>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <div className="card text-center space-y-3">
          <div className="text-3xl font-bold gradient-text">{coins.length}</div>
          <p className="text-white/70 text-sm">Total Coins</p>
        </div>
        <div className="card text-center space-y-3">
          <div className="text-3xl font-bold gradient-text">
            {formatCurrency(coins.reduce((sum, coin) => sum + coin.marketCap, 0))}
          </div>
          <p className="text-white/70 text-sm">Total Market Cap</p>
        </div>
        <div className="card text-center space-y-3">
          <div className="text-3xl font-bold gradient-text">
            {formatCurrency(coins.reduce((sum, coin) => sum + coin.volume24h, 0))}
          </div>
          <p className="text-white/70 text-sm">24h Volume</p>
        </div>
        <div className="card text-center space-y-3">
          <div className="text-3xl font-bold gradient-text">
            {coins.reduce((sum, coin) => sum + coin.holders, 0).toLocaleString()}
          </div>
          <p className="text-white/70 text-sm">Total Holders</p>
        </div>
      </motion.div>

      {/* Coins Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="space-y-6"
      >
        {sortedCoins.length === 0 ? (
          <div className="card text-center py-12 space-y-4">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto">
              <Compass className="w-8 h-8 text-white/40" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-white/60">No coins found</h3>
              <p className="text-white/40">Try adjusting your search or filters</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedCoins.map((coin, index) => (
              <motion.div
                key={coin.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="card hover-lift space-y-4"
              >
                {/* Coin Header */}
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-xl font-semibold text-white">{coin.name}</h3>
                      {coin.isVerified && (
                        <Star className="w-4 h-4 text-primary-400 fill-current" />
                      )}
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-lg font-medium text-primary-400">{coin.symbol}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        coin.category === 'Meme' ? 'bg-primary-500/20 text-primary-400' :
                        coin.category === 'Community' ? 'bg-secondary-500/20 text-secondary-400' :
                        coin.category === 'Gaming' ? 'bg-success-500/20 text-success-400' :
                        'bg-white/10 text-white/60'
                      }`}>
                        {coin.category}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleLike(coin.id)}
                    className={`p-2 rounded-lg transition-colors duration-200 ${
                      coin.isLiked 
                        ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' 
                        : 'bg-white/10 text-white/60 hover:bg-white/20'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${coin.isLiked ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Description */}
                <p className="text-white/70 text-sm line-clamp-2">{coin.description}</p>

                {/* Price and Stats */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-white">${coin.price.toFixed(6)}</span>
                    <div className={`flex items-center space-x-1 text-sm font-medium ${
                      coin.priceChange24h >= 0 ? 'text-success-400' : 'text-error-400'
                    }`}>
                      {coin.priceChange24h >= 0 ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      <span>{Math.abs(coin.priceChange24h).toFixed(1)}%</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-white/60">Market Cap</p>
                      <p className="font-medium text-white">{formatCurrency(coin.marketCap)}</p>
                    </div>
                    <div>
                      <p className="text-white/60">24h Volume</p>
                      <p className="font-medium text-white">{formatCurrency(coin.volume24h)}</p>
                    </div>
                    <div>
                      <p className="text-white/60">Holders</p>
                      <p className="font-medium text-white">{coin.holders.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-white/60">Likes</p>
                      <p className="font-medium text-white">{coin.likes}</p>
                    </div>
                  </div>
                </div>

                {/* Creator and Actions */}
                <div className="space-y-3 pt-3 border-t border-white/10">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">Creator:</span>
                    <span className="text-white font-mono">{formatAddress(coin.creator)}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => copyToClipboard(coin.contractAddress, coin.id)}
                      className="flex-1 flex items-center justify-center space-x-2 p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200"
                    >
                      {copied === coin.id ? (
                        <Check className="w-4 h-4 text-success-400" />
                      ) : (
                        <Copy className="w-4 h-4 text-white/60" />
                      )}
                      <span className="text-sm">Copy Address</span>
                    </button>
                    
                    <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200">
                      <Eye className="w-4 h-4 text-white/60" />
                    </button>
                    
                    <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200">
                      <Share2 className="w-4 h-4 text-white/60" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Load More */}
      {sortedCoins.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <button className="btn-outline">
            Load More Coins
          </button>
        </motion.div>
      )}
    </div>
  )
} 