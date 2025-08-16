#!/bin/bash

# DeFi Meme Coin Generator - Setup Script
# This script sets up the development environment

set -e

echo "🔧 Setting up DeFi Meme Coin Generator development environment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "README.md" ]; then
    echo -e "${RED}❌ Please run this script from the project root directory${NC}"
    exit 1
fi

echo -e "\n${BLUE}📋 Prerequisites Check:${NC}"

# Check Node.js
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}✅ Node.js: $NODE_VERSION${NC}"
else
    echo -e "${RED}❌ Node.js is not installed${NC}"
    echo "Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

# Check npm
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo -e "${GREEN}✅ npm: $NPM_VERSION${NC}"
else
    echo -e "${RED}❌ npm is not installed${NC}"
    exit 1
fi

# Check Aptos CLI
if command -v aptos &> /dev/null; then
    APTOS_VERSION=$(aptos --version | head -n 1)
    echo -e "${GREEN}✅ Aptos CLI: $APTOS_VERSION${NC}"
else
    echo -e "${YELLOW}⚠️  Aptos CLI is not installed${NC}"
    echo "Installing Aptos CLI..."
    
    # Install Aptos CLI
    curl -fsSL "https://aptos.dev/scripts/install_cli.py" | python3
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Aptos CLI installed successfully${NC}"
    else
        echo -e "${RED}❌ Failed to install Aptos CLI${NC}"
        echo "Please install manually: https://aptos.dev/tools/aptos-cli/install-cli/"
        exit 1
    fi
fi

echo -e "\n${BLUE}🚀 Setting up Frontend...${NC}"

# Install frontend dependencies
if [ -d "frontend" ]; then
    cd frontend
    echo -e "${YELLOW}Installing frontend dependencies...${NC}"
    npm install
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Frontend dependencies installed${NC}"
    else
        echo -e "${RED}❌ Failed to install frontend dependencies${NC}"
        exit 1
    fi
    
    cd ..
else
    echo -e "${RED}❌ Frontend directory not found${NC}"
    exit 1
fi

echo -e "\n${BLUE}🔧 Setting up Move Development Environment...${NC}"

# Initialize Aptos project
if [ -d "move" ]; then
    cd move
    
    # Check if aptos is already initialized
    if [ ! -f ".aptos/config.yaml" ]; then
        echo -e "${YELLOW}Initializing Aptos project...${NC}"
        aptos init --profile default --network devnet
        
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}✅ Aptos project initialized${NC}"
        else
            echo -e "${RED}❌ Failed to initialize Aptos project${NC}"
            exit 1
        fi
    else
        echo -e "${GREEN}✅ Aptos project already initialized${NC}"
    fi
    
    cd ..
else
    echo -e "${RED}❌ Move directory not found${NC}"
    exit 1
fi

echo -e "\n${BLUE}🧪 Testing Setup...${NC}"

# Test Move build
cd move
echo -e "${YELLOW}Testing Move build...${NC}"
aptos move build --named-addresses meme_coin_generator=default

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Move build successful${NC}"
else
    echo -e "${RED}❌ Move build failed${NC}"
    exit 1
fi

cd ..

# Test frontend build
cd frontend
echo -e "${YELLOW}Testing frontend build...${NC}"
npm run build

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Frontend build successful${NC}"
else
    echo -e "${RED}❌ Frontend build failed${NC}"
    exit 1
fi

cd ..

echo -e "\n${GREEN}🎉 Setup completed successfully!${NC}"

echo -e "\n${BLUE}📋 Next Steps:${NC}"
echo "1. Configure your Aptos wallet:"
echo "   - Create a new wallet or import existing one"
echo "   - Fund your wallet with testnet APT (for devnet)"
echo ""
echo "2. Deploy smart contracts:"
echo "   ./scripts/deploy.sh devnet default"
echo ""
echo "3. Start frontend development server:"
echo "   cd frontend && npm run dev"
echo ""
echo "4. Open http://localhost:3000 in your browser"
echo ""
echo -e "${GREEN}Happy coding! 🚀${NC}"

echo -e "\n${BLUE}📚 Useful Commands:${NC}"
echo "• Build Move contracts: cd move && aptos move build"
echo "• Test Move contracts: cd move && aptos move test"
echo "• Deploy contracts: ./scripts/deploy.sh"
echo "• Start frontend: cd frontend && npm run dev"
echo "• Build frontend: cd frontend && npm run build" 