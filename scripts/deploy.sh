#!/bin/bash

# DeFi Meme Coin Generator - Deployment Script
# This script deploys the Move smart contracts to Aptos blockchain

set -e

echo "🚀 Deploying DeFi Meme Coin Generator to Aptos..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
NETWORK=${1:-"devnet"}
PROFILE=${2:-"default"}
PACKAGE_NAME="meme_coin_generator"

echo -e "${BLUE}Network:${NC} $NETWORK"
echo -e "${BLUE}Profile:${NC} $PROFILE"
echo -e "${BLUE}Package:${NC} $PACKAGE_NAME"

# Check if aptos CLI is installed
if ! command -v aptos &> /dev/null; then
    echo -e "${RED}❌ Aptos CLI is not installed. Please install it first.${NC}"
    echo "Installation guide: https://aptos.dev/tools/aptos-cli/install-cli/"
    exit 1
fi

# Check if we're in the right directory
if [ ! -f "move/Move.toml" ]; then
    echo -e "${RED}❌ Please run this script from the project root directory${NC}"
    exit 1
fi

# Navigate to move directory
cd move

echo -e "\n${YELLOW}📦 Building Move package...${NC}"
aptos move build --named-addresses $PACKAGE_NAME=$PROFILE

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Build successful!${NC}"
else
    echo -e "${RED}❌ Build failed!${NC}"
    exit 1
fi

echo -e "\n${YELLOW}🧪 Running tests...${NC}"
aptos move test --named-addresses $PACKAGE_NAME=$PROFILE

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Tests passed!${NC}"
else
    echo -e "${RED}❌ Tests failed!${NC}"
    exit 1
fi

echo -e "\n${YELLOW}🚀 Publishing package to $NETWORK...${NC}"
aptos move publish \
    --named-addresses $PACKAGE_NAME=$PROFILE \
    --network $NETWORK \
    --profile $PROFILE

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Package published successfully!${NC}"
    
    # Get package info
    echo -e "\n${BLUE}📋 Package Information:${NC}"
    aptos move list --named-addresses $PACKAGE_NAME=$PROFILE --network $NETWORK --profile $PROFILE
    
    echo -e "\n${GREEN}🎉 Deployment completed successfully!${NC}"
    echo -e "${BLUE}Your meme coin generator is now live on Aptos $NETWORK${NC}"
    
else
    echo -e "${RED}❌ Package publication failed!${NC}"
    exit 1
fi

# Return to root directory
cd ..

echo -e "\n${BLUE}Next steps:${NC}"
echo "1. Update the contract address in your frontend configuration"
echo "2. Test the deployed contracts"
echo "3. Start your frontend application"
echo -e "\n${GREEN}Happy meme coin generating! 🚀${NC}" 