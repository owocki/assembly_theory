# Synthetix: Decentralized Synthetic Assets

## Overview
Protocol enabling creation of synthetic assets (synths) that track real-world prices, pioneering decentralized derivatives and perpetual futures.

## Key Information
- **Launch Date**: February 2018 (as Havven), rebranded 2019
- **Total Value Locked**: $500M+
- **Synth Types**: Crypto, forex, commodities, indices
- **Token**: SNX (staking/collateral)
- **Chains**: Ethereum, Optimism (primary)

## Assembly Index Analysis

### Base Assembly Index: ~250,000
Complex architecture includes:
- Debt pool mechanism
- Oracle integration system
- Synthetic asset issuance
- Perpetuals engine
- Cross-chain messaging
- Liquidation framework

### Component Breakdown
- Debt pool accounting: ~40,000
- Synth minting/burning: ~30,000
- Oracle aggregation: ~25,000
- Fee distribution: ~20,000
- Staking rewards: ~25,000
- Perps V2 engine: ~60,000
- Liquidation system: ~30,000
- Governance modules: ~20,000

## Technical Architecture

### Core Mechanism
1. **Debt Pool Model**
   - Shared counterparty system
   - Dynamic debt calculation
   - Global debt pool tracking

2. **SNX Staking**
   - 400%+ collateralization ratio
   - Weekly rewards claims
   - Debt hedging required

3. **Synthetic Assets**
   - sUSD: Base trading currency
   - sBTC, sETH: Crypto synths
   - sFX: Forex pairs
   - sCommodities: Gold, silver

### Perpetuals V2
1. **Architecture**
   - Off-chain order matching
   - On-chain settlement
   - Dynamic funding rates

2. **Risk Management**
   - Price impact functions
   - Position limits
   - Auto-liquidations

## Innovation Highlights
- **Infinite Liquidity**: No order books needed
- **Debt Pool Design**: Unique risk sharing
- **Composable Derivatives**: Building blocks for DeFi
- **Perpetuals Pioneer**: Early perps implementation

## Protocol Evolution
1. **V1**: Basic synths on Ethereum
2. **V2**: L2 migration, perpetuals
3. **V3**: Modular architecture, isolated pools
4. **Perps V2**: Professional trading features

## Ecosystem Impact
- **Derivatives Infrastructure**: $10B+ in volume
- **DeFi Composability**: Synths in other protocols
- **L2 Pioneer**: Early Optimism adopter
- **Kwenta/Polynomial**: Dedicated frontends

## V3 Architecture
1. **Isolated Debt Pools**
   - Customizable risk parameters
   - Permissioned and permissionless pools
   - Multiple collateral types

2. **Cross-Chain Liquidity**
   - Unified liquidity layer
   - Chain-agnostic design
   - Improved capital efficiency

## Statistics
- **Trading Volume**: $20B+ cumulative
- **Unique Traders**: 100K+
- **Synths Minted**: $2B+ peak
- **Stakers**: 5K+ active

## Oracle System
- **Chainlink Integration**: Primary price feeds
- **Pyth Network**: Low-latency updates
- **Circuit Breakers**: Invalid price protection
- **Aggregation Logic**: Multi-source validation

## Security Measures
- **Multi-sig Controls**: Protocol upgrades
- **Liquidation Mechanisms**: C-ratio maintenance
- **Price Deviation Checks**: Front-running protection
- **Audit History**: 15+ professional audits

## Revenue Model
- **Trading Fees**: 0.3-1% on trades
- **Perps Fees**: Maker/taker model
- **Liquidation Fees**: Protocol revenue
- **Fee Distribution**: To SNX stakers

## Future Roadmap
- **V3 Full Deployment**: Multi-chain expansion
- **Perps V3**: Enhanced features
- **New Markets**: Stocks, bonds, RWAs
- **Governance Evolution**: Decentralized control