# Worldcoin: Identity and Universal Basic Income

## Overview
Ambitious project creating a global digital identity and financial network using biometric verification, aiming to establish proof of personhood and enable universal basic income.

## Key Information
- **Launch Date**: July 2023 (token launch)
- **Verified Humans**: 5M+ globally
- **Technology**: Iris biometrics via "Orb"
- **Token**: WLD (Worldcoin)
- **Components**: World ID, World App, World Chain

## Assembly Index Analysis

### Base Assembly Index: ~400,000
Complex system includes:
- Biometric hardware (Orb)
- Zero-knowledge identity
- Blockchain infrastructure
- Mobile application
- Privacy protocols
- Global operations
- Regulatory compliance

### Component Breakdown
- Orb hardware/software: ~60,000
- ZK identity system: ~70,000
- World Chain (OP Stack): ~40,000
- Mobile app: ~40,000
- Privacy protocols: ~50,000
- Backend infrastructure: ~50,000
- Governance system: ~30,000
- Distribution network: ~60,000

## Technical Architecture

### World ID System
1. **Iris Scanning**
   - Orb device capture
   - Biometric hash only
   - No image storage
   - Privacy preserving

2. **Zero-Knowledge Proofs**
   ```solidity
   // Proof of personhood without revealing identity
   interface IWorldID {
       function verifyProof(
           uint256 root,
           uint256 groupId,
           uint256 signalHash,
           uint256 nullifierHash,
           uint256[8] calldata proof
       ) external view returns (bool);
   }
   ```

### Privacy Design
1. **Data Minimization**
   - Iris code only
   - Deleted after hashing
   - No personal info required
   - Decentralized storage

2. **Semaphore Protocol**
   - Anonymous credentials
   - Unlinkable actions
   - Sybil resistance
   - Privacy by default

## The Orb Device

### Hardware Specifications
- **Cameras**: Multi-spectral imaging
- **Processing**: Edge computing
- **Security**: Tamper-proof design
- **Verification**: Real-time liveness

### Deployment Model
1. **Orb Operators**
   - Local entrepreneurs
   - Incentivized distribution
   - Global coverage
   - Community driven

2. **Verification Process**
   - 2-minute scan
   - Instant verification
   - QR code generation
   - App activation

## World App

### Features
1. **Digital Wallet**
   - WLD storage
   - Multi-currency
   - Send/receive
   - DeFi access

2. **Identity Management**
   - World ID credentials
   - Privacy controls
   - Verification sharing
   - Recovery options

### Integration
```javascript
// Verify human in dApp
import { IDKitWidget } from '@worldcoin/idkit';

<IDKitWidget
    app_id="app_staging_..."
    action="vote"
    onSuccess={(proof) => {
        // User verified as unique human
        // No personal data exposed
    }}
/>
```

## World Chain

### Purpose-Built L2
1. **OP Stack Based**
   - Optimism technology
   - Ethereum security
   - Low fees
   - High throughput

2. **Human-Centric**
   - Free gas for verified humans
   - Bot resistance
   - Community priority
   - Social applications

## WLD Token

### Distribution Model
1. **Supply**: 10B WLD total
2. **Community**: 75% allocation
3. **Team/Investors**: 25%
4. **Unlock**: 15-year schedule

### Utility
- **Governance**: Protocol decisions
- **Incentives**: User grants
- **Network Fees**: Future utility
- **UBI Potential**: Distribution mechanism

## Universal Basic Income Vision

### Concept
1. **AI Age Preparation**
   - Job displacement mitigation
   - Wealth redistribution
   - Global equality
   - Economic safety net

2. **Implementation**
   - Regular WLD grants
   - Verified humans only
   - Equal distribution
   - Sustainable model

## Adoption Metrics

### Global Reach
- **Countries**: 35+ active
- **Orb Locations**: 350+ cities
- **Daily Signups**: 50K+
- **Growth Rate**: Exponential

### Regional Distribution
- **Europe**: 30%
- **Asia**: 25%
- **Latin America**: 25%
- **Africa**: 15%
- **North America**: 5%

## Controversies & Challenges

### Privacy Concerns
1. **Biometric Data**
   - Permanent identifier
   - Potential misuse
   - Government access
   - Hacking risks

2. **Mitigation Efforts**
   - Open source code
   - Third-party audits
   - Privacy guarantees
   - Decentralization plans

### Regulatory Issues
- **Banned Countries**: Several
- **Data Protection**: GDPR compliance
- **Securities Laws**: Token concerns
- **Operations**: Local restrictions

## Use Cases

### Current Applications
1. **Sybil Resistance**
   - One person, one vote
   - Fair airdrops
   - Bot prevention
   - Democratic systems

2. **Identity Verification**
   - Age verification
   - Human verification
   - Access control
   - Reputation systems

### Future Potential
- **Global Democracy**: Voting systems
- **Fair Distribution**: Resources/opportunities
- **Social Networks**: Bot-free platforms
- **Economic Systems**: New models

## Technical Innovations

### Biometric Privacy
1. **IrisCode**
   - Mathematical representation
   - Not reversible to image
   - Highly unique
   - Efficient storage

2. **Secure Multiparty Computation**
   - Distributed processing
   - No single point of failure
   - Privacy preservation
   - Trustless verification

## Competitive Landscape

### vs Other Identity Solutions
- **vs Government ID**: Borderless, privacy-preserving
- **vs Civic/Others**: Biometric uniqueness
- **vs Web2 (Google)**: Decentralized, user-owned
- **Unique**: Global scale ambition

## Criticism & Debate

### Philosophical Questions
1. **Dystopian Concerns**
   - Global surveillance
   - Control mechanisms
   - Privacy erosion
   - Power concentration

2. **Optimistic View**
   - Financial inclusion
   - Democratic tools
   - Bot resistance
   - Equal opportunity

## Future Roadmap

### Technical Development
- **Orb Decentralization**: Open hardware
- **Self-Custody**: Biometric data
- **Interoperability**: Cross-chain ID
- **Privacy Enhancements**: More ZK

### Ecosystem Growth
- **Developer Tools**: SDK expansion
- **App Integrations**: 1000+ planned
- **World Chain**: dApp ecosystem
- **Global Coverage**: All countries

## Impact Potential
- **Proof of Personhood**: Internet-scale
- **Financial Inclusion**: Billions served
- **UBI Experiment**: Largest ever
- **Identity Revolution**: New paradigm