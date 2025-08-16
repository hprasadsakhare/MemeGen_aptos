# 📁 DeFi Meme Coin Generator - Project Structure

## 🏗️ Overview
This project is a complete DeFi application for generating meme coins on the Aptos blockchain. It consists of Move smart contracts (backend) and a React frontend with TypeScript.

## 📂 Directory Structure
x
```
apt-full/
├── 📁 move/                           # Move smart contracts (Backend)
│   ├── 📄 Move.toml                   # Package configuration
│   ├── 📁 sources/                    # Contract source files
│   │   └── 📄 meme_coin_generator.move # Main smart contract
│   └── 📁 tests/                      # Contract tests
│
├── 📁 frontend/                       # React frontend application
│   ├── 📄 package.json                # Dependencies and scripts
│   ├── 📄 vite.config.ts              # Vite configuration
│   ├── 📄 tailwind.config.js          # Tailwind CSS configuration
│   ├── 📄 postcss.config.js           # PostCSS configuration
│   ├── 📄 tsconfig.json               # TypeScript configuration
│   ├── 📄 tsconfig.node.json          # Node.js TypeScript config
│   ├── 📄 index.html                  # Main HTML file
│   ├── 📁 src/                        # Source code
│   │   ├── 📄 main.tsx                # React entry point
│   │   ├── 📄 App.tsx                 # Main App component
│   │   ├── 📄 index.css               # Global styles
│   │   ├── 📁 components/             # Reusable components
│   │   │   ├── 📄 Layout.tsx          # Main layout component
│   │   │   ├── 📄 WalletProvider.tsx  # Wallet context provider
│   │   │   ├── 📄 WalletSelector.tsx  # Wallet connection component
│   │   │   └── 📄 TokenomicsChart.tsx # Tokenomics visualization
│   │   ├── 📁 pages/                  # Page components
│   │   │   ├── 📄 Home.tsx            # Landing page
│   │   │   ├── 📄 Generator.tsx       # Meme coin generator
│   │   │   ├── 📄 Dashboard.tsx       # User dashboard
│   │   │   └── 📄 Explore.tsx         # Community coins explorer
│   │   └── 📁 config/                 # Configuration files
│   │       └── 📄 aptos.ts            # Aptos blockchain config
│   └── 📁 public/                     # Static assets
│
├── 📁 scripts/                        # Deployment and setup scripts
│   ├── 📄 deploy.sh                   # Contract deployment script
│   └── 📄 setup.sh                    # Development setup script
│
├── 📄 README.md                       # Project documentation
├── 📄 PROJECT_STRUCTURE.md            # This file
└── 📄 .gitignore                      # Git ignore patterns
```

## 🔧 Smart Contracts (Move)

### Core Contract: `meme_coin_generator.move`
- **Purpose**: Main contract for generating and managing meme coins
- **Key Features**:
  - Generate meme coins with automated tokenomics
  - Deploy actual coin contracts
  - Manage coin metadata and statistics
  - User coin tracking and management

### Key Functions:
- `generate_meme_coin()` - Create new meme coin
- `deploy_coin()` - Deploy coin to blockchain
- `get_all_coins()` - Retrieve all generated coins
- `get_user_coins()` - Get user's coins
- `update_coin_description()` - Update coin details
- `delete_coin()` - Remove coin

### Data Structures:
- `MemeCoin` - Coin information and metadata
- `Tokenomics` - Automated token distribution
- `CoinMetadata` - Global coin storage
- `UserCoins` - User-specific coin tracking
- `CoinStats` - Platform statistics

## 🎨 Frontend (React + TypeScript)

### Core Components:
- **Layout**: Main application layout with sidebar navigation
- **WalletProvider**: Aptos wallet integration context
- **WalletSelector**: Wallet connection and management
- **TokenomicsChart**: Interactive tokenomics visualization

### Pages:
- **Home**: Landing page with features and statistics
- **Generator**: Main meme coin creation interface
- **Dashboard**: User coin management and analytics
- **Explore**: Community coin discovery and exploration

### Key Features:
- Responsive design with Tailwind CSS
- Smooth animations with Framer Motion
- Wallet integration with multiple Aptos wallets
- Real-time form validation
- Interactive tokenomics charts
- Mobile-first responsive design

## 🚀 Deployment & Setup

### Prerequisites:
- Node.js 18+
- Aptos CLI
- Move package manager

### Setup Commands:
```bash
# 1. Setup development environment
./scripts/setup.sh

# 2. Deploy smart contracts
./scripts/deploy.sh devnet default

# 3. Start frontend
cd frontend && npm run dev
```

### Environment Configuration:
- **Network**: Configurable (devnet/testnet/mainnet)
- **RPC Endpoints**: Automatic network detection
- **Contract Addresses**: Environment variable configuration
- **Feature Flags**: Configurable feature toggles

## 🔐 Security Features

### Smart Contract Security:
- Input validation and sanitization
- Access control and authorization
- Resource management and cleanup
- Comprehensive error handling

### Frontend Security:
- Wallet signature verification
- Input sanitization and validation
- Secure API communication
- Environment-based configuration

## 📊 Tokenomics System

### Automated Distribution:
- **Liquidity Pool**: 40% - For trading liquidity
- **Community Rewards**: 25% - For community engagement
- **Team Tokens**: 15% - For team and development
- **Marketing**: 10% - For promotional activities
- **Development**: 10% - For ongoing development

### Smart Features:
- Automatic calculation based on total supply
- Configurable distribution percentages
- Real-time visualization
- Community governance ready

## 🌐 Supported Networks

### Development:
- **Devnet**: For testing and development
- **Testnet**: For pre-production testing

### Production:
- **Mainnet**: Live Aptos blockchain

## 💰 Supported Wallets

### Primary Wallets:
- Petra Wallet
- Martian Wallet
- Nightly Wallet
- Pontem Wallet

### Additional Wallets:
- MSafe, Fewcha, OpenBlock
- TokenPocket, Bitget, Welldone
- HyperPay, Aptos, Rise
- Fletch, OKX, Core, Fox, Clover

## 🧪 Testing

### Smart Contract Testing:
```bash
cd move
aptos move test
```

### Frontend Testing:
```bash
cd frontend
npm test
```

### Integration Testing:
- Wallet connection flows
- Contract interaction
- Error handling scenarios
- Cross-browser compatibility

## 📈 Performance Features

### Frontend Optimization:
- Code splitting and lazy loading
- Optimized bundle size
- Efficient state management
- Responsive image handling

### Blockchain Optimization:
- Gas-efficient smart contracts
- Batch operations support
- Optimized data structures
- Minimal storage requirements

## 🔄 Development Workflow

### 1. Smart Contract Development:
```bash
cd move
aptos move build
aptos move test
aptos move publish
```

### 2. Frontend Development:
```bash
cd frontend
npm run dev          # Development server
npm run build        # Production build
npm run preview      # Preview build
```

### 3. Testing & Deployment:
```bash
./scripts/setup.sh      # Setup environment
./scripts/deploy.sh     # Deploy contracts
npm run build          # Build frontend
```

## 📚 Documentation

### Technical Documentation:
- Smart contract specifications
- API documentation
- Component library
- Configuration guide

### User Documentation:
- Getting started guide
- User manual
- FAQ and troubleshooting
- Community guidelines

## 🤝 Contributing

### Development Guidelines:
- Code style and formatting
- Testing requirements
- Documentation standards
- Review process

### Community:
- Issue reporting
- Feature requests
- Bug reports
- Community discussions

---

**This project demonstrates a complete DeFi application built on Aptos with modern web technologies, providing a seamless experience for creating and managing meme coins on the blockchain.** 