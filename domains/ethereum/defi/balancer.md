# Balancer: Programmable Liquidity Protocol

## Overview
A flexible automated market maker allowing custom token weights and ratios, enabling novel pool types and use cases beyond simple trading.

## Key Information
- **Launch Date**: March 2020
- **Total Value Locked**: $1B+
- **Pool Types**: Weighted, Stable, Composable Stable, Managed, Boosted
- **Token**: BAL (governance), veBAL (vote-escrowed)
- **Chains**: Ethereum, Arbitrum, Polygon, Optimism, Gnosis, Avalanche, zkEVM

## Assembly Index Analysis

### Base Assembly Index: ~175,000
Protocol sophistication includes:
- Generalized AMM mathematics
- Vault architecture
- Multiple pool types
- Flash loan system
- Boosted pool mechanics

### Component Breakdown
- Vault core: ~30,000
- Weighted pool math: ~20,000
- Stable pool implementation: ~25,000
- Composable stable pools: ~30,000
- Asset managers: ~20,000
- veBAL system: ~20,000
- Gauge framework: ~30,000

## Technical Architecture

### The Vault
1. **Central Settlement Layer**
   - All pools share one vault
   - Gas-efficient multi-hop trades
   - Flash loans built-in
   - Internal balance accounting

2. **Pool Abstraction**
   - Pools as external contracts
   - Custom pool logic possible
   - Standardized interface
   - Upgradeable pool types

### Pool Types
1. **Weighted Pools**
   - 2-8 tokens
   - Custom weights (e.g., 80/20)
   - Index fund functionality

2. **Stable Pools**
   - StableSwap math
   - Composable (nested) versions
   - Rate providers for yield tokens

3. **Boosted Pools**
   - Idle liquidity to lending
   - Higher capital efficiency
   - Automatic yield generation

4. **Managed Pools**
   - Dynamic weights
   - Gradual weight shifts
   - Circuit breakers

## Innovation Highlights
- **Generalized AMM**: Beyond 50/50 pools
- **Vault Architecture**: Unified liquidity layer
- **Boosted Pools**: Productive idle assets
- **Pool Composability**: Pools within pools

## Use Cases Beyond Trading
1. **Index Funds**: Self-balancing portfolios
2. **Liquidity Bootstrapping**: Fair token launches
3. **Stable Pools**: Correlated asset trading
4. **Managed Strategies**: Dynamic allocations

## Protocol Statistics
- **Unique LPs**: 50K+
- **Total Pools**: 1,500+
- **24h Volume**: $50M-200M
- **Flash Loan Volume**: $10B+ cumulative

## veBAL System
- **80/20 BAL/ETH**: Governance token pool
- **Max Lock**: 1 year
- **Revenue Share**: Protocol fees to veBAL
- **Gauge Voting**: Direct emissions

## Technical Innovations
1. **Asset Managers**
   - Yield-bearing integrations
   - Automated strategies
   - Capital efficiency

2. **Rate Providers**
   - Oracle integrations
   - Yield token support
   - Price feed flexibility

3. **Circuit Breakers**
   - Emergency pause
   - Gradual parameter changes
   - Risk mitigation

## Security Architecture
- **Immutable Vault**: Core cannot be upgraded
- **Audited Pools**: Each type extensively tested
- **Emergency SubDAO**: Quick response capability
- **Bug Bounty**: Up to $1M rewards

## Ecosystem Integrations
- **Aura Finance**: veBAL aggregator
- **Beets**: Fantom deployment
- **Index Protocols**: Using weighted pools
- **MEV Protection**: Built-in defenses

## Future Development
- **ve8020**: New tokenomics model
- **Hooks System**: Custom pool logic
- **Cross-Chain Messaging**: Unified liquidity
- **CoW Protocol Integration**: MEV protection