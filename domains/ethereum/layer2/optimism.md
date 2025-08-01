# Optimism: The Optimistic Ethereum

## Overview
Pioneering Layer 2 solution using optimistic rollup technology, focused on simplicity and Ethereum equivalence while fostering a vision of public goods funding.

## Key Information
- **Launch Date**: January 2021 (soft), December 2021 (public)
- **Total Value Locked**: $7B+
- **Token**: OP (governance)
- **Technology**: Optimistic Rollup (Bedrock)
- **Ecosystem**: Superchain vision

## Assembly Index Analysis

### Base Assembly Index: ~320,000
Infrastructure complexity includes:
- Bedrock architecture
- Fault proof system
- OP Stack framework
- Superchain infrastructure
- RetroPGF mechanism
- Governance system
- Cross-chain messaging

### Component Breakdown
- Bedrock core: ~55,000
- Fault proofs: ~45,000
- OP Stack: ~50,000
- Sequencer: ~35,000
- Bridge contracts: ~30,000
- Governance: ~35,000
- RetroPGF system: ~25,000
- Canyon/Delta upgrades: ~45,000

## Technical Architecture

### Bedrock Design
1. **Modular Architecture**
   - Consensus client separation
   - Execution client (op-geth)
   - Rollup client (op-node)
   - Improved efficiency

2. **Benefits**
   - 10x lower fees
   - Better EVM equivalence
   - Faster deposits (1 min)
   - Modular upgrades

### EVM Equivalence
```solidity
// Identical to Ethereum
contract MyContract {
    // No modifications needed
    // Full Ethereum compatibility
    // Same opcodes, gas costs
}
```

## OP Stack Framework

### Superchain Vision
1. **Shared Infrastructure**
   - Common sequencer
   - Unified bridge
   - Atomic transactions
   - Shared governance

2. **Current Implementations**
   - Base (Coinbase)
   - Zora Network
   - PGN (Gitcoin)
   - Mode Network

### Modularity
- **Consensus Layer**: Pluggable
- **Execution Layer**: EVM or alt-VM
- **Settlement Layer**: Ethereum or alt
- **Data Availability**: Various options

## OP Token & Governance

### Token Distribution
- **Total Supply**: 4.29B OP
- **Ecosystem Fund**: 25%
- **RetroPGF**: 20%
- **Airdrops**: 19%
- **Core Contributors**: 19%
- **Investors**: 17%

### Governance Structure
1. **Token House**
   - Protocol upgrades
   - Treasury allocation
   - Director removal

2. **Citizens' House**
   - RetroPGF allocation
   - Public goods funding
   - Long-term vision

## Retroactive Public Goods Funding

### RetroPGF Rounds
- **Round 1**: $1M distributed
- **Round 2**: $10M distributed
- **Round 3**: $30M distributed
- **Round 4**: $40M+ planned

### Impact Measurement
- **Open Source**: Code contributions
- **Education**: Developer resources
- **Infrastructure**: Public tools
- **Community**: Ecosystem growth

## Performance Metrics

### Network Statistics
- **TPS**: 2,000+ sustained
- **Gas Fees**: $0.01-0.10
- **Block Time**: 2 seconds
- **Finality**: 7 days (L1)

### Cost Savings
- **vs Ethereum**: 10-100x cheaper
- **Compressed Data**: Efficient batching
- **Optimized Calldata**: Lower costs
- **Future**: 4844 integration

## Developer Experience

### Deployment Process
```javascript
// Identical to Ethereum
const provider = new ethers.providers.JsonRpcProvider(
  "https://mainnet.optimism.io"
);

// Use existing tools unchanged
await hardhat.run("deploy", { network: "optimism" });
```

### Tooling Support
- **Hardhat**: Native support
- **Foundry**: Full compatibility
- **Etherscan**: Block explorer
- **The Graph**: Indexing

## Bridge Ecosystem

### Official Bridge
- **Deposit**: ~1 minute
- **Withdrawal**: 7 days
- **Security**: L1 guaranteed
- **Assets**: ETH, ERC-20

### Third-Party Bridges
- **Hop**: Fast withdrawals
- **Across**: Capital efficient
- **Synapse**: Multi-chain
- **Socket**: Aggregated routes

## DeFi Ecosystem

### Major Protocols
- **Velodrome**: $300M+ TVL DEX
- **Synthetix**: Perps trading
- **Aave**: Lending market
- **Uniswap**: Full deployment

### Native Innovation
- **ve(3,3)**: Velodrome model
- **Perps**: Multiple platforms
- **Options**: Lyra, Polynomial
- **Public Goods**: Impact focus

## Security Model

### Fault Proof System
1. **Current State**
   - Permissioned challenger
   - Multi-sig upgrade control
   - Progressive decentralization

2. **Future State**
   - Permissionless proofs
   - Cannon proving system
   - Full decentralization

### Safety Mechanisms
- **Emergency Pause**: Guardian role
- **Upgrade Delays**: Time locks
- **Escape Hatch**: Force exit
- **Multi-Sig**: 2-of-2 control

## Adoption & Partnerships

### Notable Users
- **Coinbase**: Base L2 built on OP Stack
- **Worldcoin**: World Chain
- **Sony**: Soneium blockchain
- **Kraken**: Ink L2 planned

### Ecosystem Growth
- **Addresses**: 3M+ unique
- **Transactions**: 500M+ total
- **dApps**: 300+ deployed
- **Developer Activity**: High

## Competitive Position

### vs Arbitrum
- **Philosophy**: Public goods focus
- **Architecture**: Bedrock vs Nitro
- **Token Launch**: Earlier (OP)
- **Ecosystem**: Superchain vision

### vs zkRollups
- **Simplicity**: Easier to understand
- **EVM Equivalence**: Perfect match
- **Time to Market**: Faster deployment
- **Upgrade Path**: More flexible

## Future Development

### Technical Roadmap
- **Fault Proofs**: Permissionless (2025)
- **Plasma Mode**: Data availability
- **Cross-Chain Interop**: Superchain messaging
- **ZK Integration**: Hybrid future

### Ecosystem Vision
- **100+ Chains**: OP Stack adoption
- **Unified Liquidity**: Superchain pools
- **Public Goods**: Sustainable funding
- **Decentralization**: Progressive path