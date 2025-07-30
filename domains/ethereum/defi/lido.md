# Lido: Liquid Staking Protocol

## Overview
The largest liquid staking protocol, enabling users to stake ETH while maintaining liquidity through stETH tokens.

## Key Information
- **Launch Date**: December 2020
- **Total Value Locked**: $30B+ (as of 2025)
- **Market Share**: ~30% of all staked ETH
- **Token**: LDO (governance), stETH (liquid staking token)
- **Chain**: Ethereum mainnet + L2s

## Assembly Index Analysis

### Base Assembly Index: ~85,000
The protocol's complexity stems from:
- Distributed validator management system
- Oracle network for balance reporting
- Withdrawal queue mechanism
- stETH rebasing logic
- Governance system

### Component Breakdown
- Node operator registry: ~15,000
- Oracle consensus system: ~20,000
- Withdrawal mechanism: ~25,000
- stETH token logic: ~10,000
- Governance framework: ~15,000

## Technical Architecture
1. **Staking Pool Contract**
   - Accepts ETH deposits
   - Mints stETH 1:1
   - Manages validator selection

2. **Node Operator Registry**
   - Permissioned set of validators
   - Performance monitoring
   - Reward distribution

3. **Oracle Network**
   - Reports beacon chain balances
   - Triggers rebasing events
   - Ensures accurate stETH supply

## Innovation Highlights
- **Liquid Staking Pioneer**: First to solve ETH staking liquidity
- **stETH Composability**: Integrated across DeFi
- **Distributed Validation**: 30+ professional node operators
- **Withdrawal Innovation**: Smooth exit mechanism post-Shanghai

## Ecosystem Impact
- Enabled $30B+ in productive staked capital
- stETH became DeFi collateral standard
- Inspired numerous liquid staking competitors
- Critical infrastructure for Ethereum security

## Security Considerations
- Smart contract risk: Multiple audits, bug bounties
- Centralization concerns: Working on distributed validator technology
- Slashing risk: Distributed across operators
- Oracle dependencies: Multi-signature security

## Future Evolution
- **Distributed Validator Technology (DVT)**: Further decentralization
- **Multi-chain Expansion**: Beyond Ethereum
- **stETH V2**: Enhanced features
- **Restaking Integration**: EigenLayer compatibility