# ERC-20: Fungible Token Standard

## Overview
The foundational token standard that revolutionized digital asset representation on Ethereum.

## Key Information
- **EIP Number**: 20
- **Title**: Token Standard
- **Author**: Fabian Vogelsteller, Vitalik Buterin
- **Status**: Final
- **Type**: Standards Track (ERC)
- **Category**: ERC
- **Created**: 2015-11-19
- **Finalized**: 2017-09-11

## Assembly Index Analysis

### Base Assembly Index: ~2,500
The core ERC-20 standard represents a relatively simple assembly:
- 6 required functions (transfer, transferFrom, approve, balanceOf, totalSupply, allowance)
- 2 required events (Transfer, Approval)
- Basic state mappings for balances and allowances

### Compositional Complexity
When integrated into DeFi protocols, the assembly index multiplies:
- Simple DEX integration: ~10,000
- Lending protocol integration: ~25,000
- Complex DeFi strategies: ~100,000+

## Historical Context
- **Pre-ERC-20 Era**: Each token had unique implementations, no interoperability
- **Standardization Impact**: Enabled the 2017 ICO boom and DeFi revolution
- **Network Effects**: Created a common language for value transfer

## Assembly Components
1. **State Variables**
   - `mapping(address => uint256) balances`
   - `mapping(address => mapping(address => uint256)) allowances`
   - `uint256 totalSupply`

2. **Core Functions**
   - `transfer()`: Direct value movement
   - `approve()` + `transferFrom()`: Delegated transfers
   - View functions for state queries

3. **Event System**
   - Enables off-chain tracking
   - Critical for wallet and exchange integration

## Evolution and Extensions
- **ERC-223**: Attempted to fix accidental token loss
- **ERC-777**: Advanced features with hooks
- **ERC-20 Permit (EIP-2612)**: Gasless approvals
- Each extension adds ~500-1,500 to assembly index

## Impact on Ecosystem Assembly
- Enabled standardized:
  - Wallets and exchanges
  - DeFi protocols
  - Token factories
  - Automated market makers
- Reduced integration complexity by ~90%

## Security Considerations
- Approval race conditions
- Integer overflow (pre-Solidity 0.8)
- Reentrancy in extensions
- Each vulnerability pattern adds ~200-500 to security assembly index