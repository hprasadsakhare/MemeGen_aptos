# 🚀 DeFi Meme Coin Generator on Aptos

A complete DeFi application that generates meme coins on the Aptos blockchain with automated tokenomics, smart contract deployment, and a modern web interface.

<img width="3024" height="1646" alt="Image" src="https://github.com/user-attachments/assets/421db3b1-abca-4fe4-b040-04cf0c6cab49" />

## ✨ Features

- **🎯 Meme Coin Generation**: Enter a name and get a complete meme coin
- **📊 Automated Tokenomics**: Smart contract generates balanced tokenomics
- **🔐 Secure Smart Contracts**: Built with Move language on Aptos
- **🎨 Modern UI/UX**: Beautiful React frontend with Tailwind CSS
- **⚡ Fast & Scalable**: Leverages Aptos blockchain performance
- **🔗 Wallet Integration**: Connect with Aptos wallets

## 🏗️ Architecture

- **Backend**: Move smart contracts on Aptos blockchain
- **Frontend**: React + TypeScript + Tailwind CSS
- **Blockchain**: Aptos testnet/mainnet
- **Development**: Aptos CLI + Move package manager

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Aptos CLI
- Move package manager

### Installation

1. **Clone the repository**
```bash
git clone <your-repo>
cd apt-full
```

2. **Install dependencies**
```bash
# Frontend
cd frontend
npm install

# Backend (Move contracts)
cd ../move
aptos init
```

3. **Configure Aptos**
```bash
aptos init --profile default --network devnet
```

4. **Deploy contracts**
```bash
cd move
aptos move publish --named-addresses meme_coin_generator=default
```

5. **Start frontend**
```bash
cd frontend
npm run dev
```

## 📁 Project Structure

```
apt-full/
├── move/                    # Move smart contracts
│   ├── sources/            # Contract source files
│   ├── Move.toml           # Package configuration
│   └── tests/              # Contract tests
├── frontend/               # React frontend
│   ├── src/                # Source code
│   ├── public/             # Static assets
│   └── package.json        # Dependencies
├── scripts/                # Deployment scripts
└── README.md               # This file
```

## 🔧 Smart Contracts

### Core Contracts
- **MemeCoinGenerator**: Main contract for coin generation
- **MemeCoin**: Template for generated meme coins
- **Tokenomics**: Automated tokenomics calculation

### Key Functions
- `generate_meme_coin(name, symbol, description)`
- `set_tokenomics(total_supply, distribution)`
- `mint_initial_tokens(recipient)`

## 🎨 Frontend Features

- **Responsive Design**: Works on all devices
- **Wallet Connection**: Aptos wallet integration
- **Real-time Updates**: Live blockchain data
- **Beautiful UI**: Modern design with animations
- **Error Handling**: User-friendly error messages

## 🧪 Testing

```bash
# Test Move contracts
cd move
aptos move test

# Test frontend
cd frontend
npm test
```

## 🚀 Deployment

### Testnet
```bash
aptos move publish --named-addresses meme_coin_generator=default --network testnet
```

### Mainnet
```bash
aptos move publish --named-addresses meme_coin_generator=default --network mainnet
```

## 📚 Documentation

- [Aptos Move Book](https://move-book.aptoslabs.com/)
- [Aptos SDK](https://aptos.dev/sdks-and-libraries)
- [Move Language](https://move-language.github.io/move/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

- Create an issue for bugs
- Join our Discord community
- Check the documentation

---

**Built with ❤️ on Aptos Blockchain** 
