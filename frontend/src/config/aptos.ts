// Aptos Configuration for DeFi Meme Coin Generator

export const APTOS_CONFIG = {
  // Network configuration
  NETWORK: process.env.NODE_ENV === 'production' ? 'mainnet' : 'devnet',
  
  // RPC endpoints
  RPC_ENDPOINTS: {
    devnet: 'https://fullnode.devnet.aptoslabs.com',
    testnet: 'https://fullnode.testnet.aptoslabs.com',
    mainnet: 'https://fullnode.mainnet.aptoslabs.com',
  },
  
  // Explorer URLs
  EXPLORER_URLS: {
    devnet: 'https://explorer.aptoslabs.com/account',
    testnet: 'https://explorer.aptoslabs.com/account',
    mainnet: 'https://explorer.aptoslabs.com/account',
  },
  
  // Contract addresses (update after deployment)
  CONTRACTS: {
    MEME_COIN_GENERATOR: process.env.REACT_APP_CONTRACT_ADDRESS || '0x1',
  },
  
  // Gas configuration
  GAS_CONFIG: {
    maxGasAmount: 20000,
    gasUnitPrice: 100,
  },
  
  // Transaction timeout
  TRANSACTION_TIMEOUT: 30000, // 30 seconds
  
  // Supported wallet types
  SUPPORTED_WALLETS: [
    'petra',
    'martian',
    'nightly',
    'pontem',
    'msafe',
    'fewcha',
    'openblock',
    'tokenpocket',
    'bitget',
    'welldone',
    'hyperpay',
    'aptos',
    'rise',
    'fletch',
    'okx',
    'core',
    'fox',
    'clover',
  ],
  
  // Default tokenomics distribution
  DEFAULT_TOKENOMICS: {
    liquidityPool: 40,      // 40%
    communityRewards: 25,   // 25%
    teamTokens: 15,         // 15%
    marketing: 10,          // 10%
    development: 10,         // 10%
  },
  
  // Minimum values
  MIN_VALUES: {
    totalSupply: 1000,
    nameLength: 1,
    symbolLength: 1,
    descriptionLength: 1,
  },
  
  // Maximum values
  MAX_VALUES: {
    totalSupply: 1000000000000, // 1 trillion
    nameLength: 50,
    symbolLength: 10,
    descriptionLength: 500,
  },
  
  // API endpoints
  API_ENDPOINTS: {
    devnet: 'https://api.devnet.aptoslabs.com',
    testnet: 'https://api.testnet.aptoslabs.com',
    mainnet: 'https://api.mainnet.aptoslabs.com',
  },
  
  // Feature flags
  FEATURES: {
    enableTestnet: true,
    enableMainnet: false,
    enableAnalytics: true,
    enableErrorReporting: true,
  },
}

// Helper functions
export const getCurrentNetwork = () => APTOS_CONFIG.NETWORK

export const getRpcEndpoint = () => APTOS_CONFIG.RPC_ENDPOINTS[getCurrentNetwork()]

export const getExplorerUrl = () => APTOS_CONFIG.EXPLORER_URLS[getCurrentNetwork()]

export const getApiEndpoint = () => APTOS_CONFIG.API_ENDPOINTS[getCurrentNetwork()]

export const isTestnet = () => getCurrentNetwork() === 'devnet' || getCurrentNetwork() === 'testnet'

export const isMainnet = () => getCurrentNetwork() === 'mainnet'

// Validation functions
export const validateCoinName = (name: string): boolean => {
  return name.length >= APTOS_CONFIG.MIN_VALUES.nameLength && 
         name.length <= APTOS_CONFIG.MAX_VALUES.nameLength
}

export const validateCoinSymbol = (symbol: string): boolean => {
  return symbol.length >= APTOS_CONFIG.MIN_VALUES.symbolLength && 
         symbol.length <= APTOS_CONFIG.MAX_VALUES.symbolLength
}

export const validateTotalSupply = (supply: number): boolean => {
  return supply >= APTOS_CONFIG.MIN_VALUES.totalSupply && 
         supply <= APTOS_CONFIG.MAX_VALUES.totalSupply
}

export const validateDescription = (description: string): boolean => {
  return description.length >= APTOS_CONFIG.MIN_VALUES.descriptionLength && 
         description.length <= APTOS_CONFIG.MAX_VALUES.descriptionLength
}

// Tokenomics calculation
export const calculateTokenomics = (totalSupply: number) => {
  const { DEFAULT_TOKENOMICS } = APTOS_CONFIG
  
  return {
    liquidityPool: Math.floor((totalSupply * DEFAULT_TOKENOMICS.liquidityPool) / 100),
    communityRewards: Math.floor((totalSupply * DEFAULT_TOKENOMICS.communityRewards) / 100),
    teamTokens: Math.floor((totalSupply * DEFAULT_TOKENOMICS.teamTokens) / 100),
    marketing: Math.floor((totalSupply * DEFAULT_TOKENOMICS.marketing) / 100),
    development: Math.floor((totalSupply * DEFAULT_TOKENOMICS.development) / 100),
  }
}

// Format functions
export const formatAptosAddress = (address: string): string => {
  if (!address) return ''
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export const formatAptosAmount = (amount: number, decimals: number = 8): string => {
  return (amount / Math.pow(10, decimals)).toFixed(decimals)
}

export const formatCurrency = (value: number): string => {
  if (value >= 1000000000) return `$${(value / 1000000000).toFixed(2)}B`
  if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`
  if (value >= 1000) return `$${(value / 1000).toFixed(2)}K`
  return `$${value.toFixed(2)}`
}

export default APTOS_CONFIG 