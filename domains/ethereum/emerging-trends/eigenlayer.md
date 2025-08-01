# EigenLayer: Restaking and Shared Security

## Overview
Revolutionary protocol that enables ETH stakers to "restake" their ETH to provide security for multiple services simultaneously, creating a marketplace for decentralized trust.

## Key Information
- **Launch Date**: June 2023 (Stage 1), April 2024 (Stage 2)
- **Innovation**: Restaking primitive
- **TVL**: $15B+ (largest protocol by TVL)
- **Token**: EIGEN (upcoming)
- **Services**: 15+ AVS (Actively Validated Services)

## Assembly Index Analysis

### Base Assembly Index: ~300,000
Complex new primitive includes:
- Restaking core protocol
- Slashing mechanism
- AVS framework
- Operator network
- Delegation system
- Middleware design
- Multi-asset support

### Component Breakdown
- Core restaking: ~50,000
- Slashing logic: ~40,000
- AVS framework: ~45,000
- Operator registry: ~35,000
- Delegation system: ~30,000
- Strategy manager: ~35,000
- Withdrawal logic: ~30,000
- Eigen token mechanics: ~35,000

## Technical Architecture

### Restaking Mechanism
1. **Native Restaking**
   - Ethereum validators
   - Withdrawal credentials
   - Full 32 ETH nodes
   - Direct slashing

2. **LST Restaking**
   - Liquid staking tokens
   - stETH, rETH, cbETH
   - Flexible amounts
   - Indirect exposure

```solidity
// Restaking LSTs
function depositIntoStrategy(
    IStrategy strategy,
    IERC20 token,
    uint256 amount
) external {
    // Deposit LST into EigenLayer
    // Opt into AVS services
    // Earn additional yield
}
```

## Actively Validated Services (AVS)

### Service Types
1. **Data Availability**
   - EigenDA: 10MB/s throughput
   - Blob storage
   - Alt-DA solutions
   - Censorship resistance

2. **Oracle Networks**
   - Price feeds
   - Cross-chain messaging
   - Proof verification
   - Event attestation

3. **Middleware**
   - Sequencer networks
   - Bridge security
   - MEV management
   - Keeper networks

### AVS Examples
- **EigenDA**: Data availability layer
- **Lagrange**: ZK coprocessor
- **Witness Chain**: Proof coordination
- **Espresso**: Shared sequencer
- **Omni**: Cross-chain messaging

## Operator Ecosystem

### Operator Role
1. **Infrastructure**
   - Run AVS software
   - Maintain uptime
   - Execute tasks
   - Risk slashing

2. **Economics**
   - Earn AVS rewards
   - Share with delegators
   - Set commission rates
   - Manage risk

### Major Operators
- **Figment**: Institutional grade
- **P2P**: Large validator
- **Kiln**: Liquid restaking
- **Galaxy**: Professional service

## Delegation System

### Staker Options
1. **Solo Staking**
   - Run own operator
   - Full control
   - Maximum rewards
   - Maximum risk

2. **Delegation**
   - Choose operators
   - Spread risk
   - Easier participation
   - Shared rewards

## Slashing Mechanism

### Risk Framework
1. **Service-Specific**
   - Each AVS sets rules
   - Different parameters
   - Graduated penalties
   - Objective conditions

2. **Protection Layers**
   - Veto committee
   - Time delays
   - Insurance options
   - Risk management

```solidity
// Slashing conditions example
struct SlashingParams {
    uint256 magnitude;      // How much to slash
    uint256 delay;         // Time before execution
    address slasher;       // Who can trigger
    bytes32 conditions;    // What triggers slashing
}
```

## Economic Model

### Yield Sources
1. **ETH Staking**: Base ~4% APR
2. **AVS Rewards**: Additional 2-10%
3. **EIGEN Token**: Future airdrops
4. **Service Fees**: Usage-based

### Risk/Reward
- **Higher Risk**: More AVS = more yield
- **Diversification**: Multiple services
- **Operator Selection**: Key decision
- **Liquid Options**: LRTs available

## Liquid Restaking Tokens (LRTs)

### LRT Protocols
- **ether.fi**: Largest LRT
- **Renzo**: ezETH token
- **Kelp**: rsETH token
- **Puffer**: Native restaking

### Benefits
- **Liquidity**: Trade/DeFi usage
- **Simplicity**: Auto-management
- **Diversification**: Multiple operators
- **Points**: Additional rewards

## EIGEN Token

### Intersubjective Staking
1. **Novel Concept**
   - Social consensus faults
   - Non-objectively attributable
   - Community slashing
   - Governance power

2. **Use Cases**
   - Oracle truthfulness
   - Bridge honesty
   - Data availability
   - AI training verification

## Security Considerations

### Systemic Risks
1. **Correlation**
   - Multiple services fail
   - Cascading slashing
   - Operator concentration
   - Exit liquidity

2. **Mitigations**
   - Gradual rollout
   - Service caps
   - Operator limits
   - Insurance layers

## Market Impact

### TVL Dominance
- **$15B+**: Largest protocol
- **25%**: Of all staked ETH
- **Growth**: 1000% in 6 months
- **Ecosystem**: 15+ services live

### Competitive Moat
- **First Mover**: Restaking primitive
- **Network Effects**: Operators + AVS
- **Technical Complexity**: Hard to replicate
- **Ethereum Alignment**: Core team

## Future Development

### Roadmap
1. **Full Slashing**: Enable all features
2. **Permissionless AVS**: Open market
3. **Cross-Chain**: Expand beyond ETH
4. **Token Launch**: EIGEN distribution

### Ecosystem Growth
- **100+ AVS**: In development
- **Institutional**: Major adoption
- **L2 Integration**: Shared security
- **New Primitives**: Innovation platform

## Integration Patterns

### For Protocols
```solidity
// Integrate as AVS
contract MyAVS is IAVSDirectory {
    function registerOperatorToAVS(
        address operator,
        ISignatureUtils.SignatureWithSaltAndExpiry memory signature
    ) external {
        // Operator opts into your service
        // They stake their restaked ETH
        // You can slash for misbehavior
    }
}
```

### For Stakers
- **Solo Stakers**: Native restaking
- **LST Holders**: Deposit tokens
- **Liquid Restakers**: Use LRTs
- **Institutions**: White-glove service

## Revolutionary Impact
- **Shared Security**: New primitive
- **Capital Efficiency**: Reuse ETH
- **Innovation Platform**: 100+ ideas
- **Ethereum Scaling**: Indirect benefits