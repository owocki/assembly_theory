// Auto-generated from domains/ markdown files
// Generated: 2025-07-30

const assembliesData = [
  {
    "id": "erc-20",
    "name": "ERC-20: Fungible Token Standard",
    "domain": "ethereum",
    "category": "tokens",
    "assemblyIndex": 2500,
    "timeOrigin": "2015-11-19",
    "description": "The foundational token standard that revolutionized digital asset representation on Ethereum. Base assembly index of ~2,500 for core functionality.",
    "connections": [
      {
        "name": "ERC-223",
        "file": "erc-223"
      },
      {
        "name": "ERC-777",
        "file": "erc-777"
      },
      {
        "name": "ERC-20 Permit",
        "file": "eip-2612"
      }
    ],
    "filePath": "domains/ethereum/tokens/erc-20.md"
  },
  {
    "id": "erc-721",
    "name": "ERC-721: Non-Fungible Token Standard",
    "domain": "ethereum",
    "category": "nft",
    "assemblyIndex": 8500,
    "timeOrigin": "2018-01-24",
    "description": "The standard that launched the NFT revolution, enabling unique digital asset ownership on Ethereum. Base assembly index of ~8,500.",
    "connections": [
      {
        "name": "ERC-20",
        "file": "erc-20"
      },
      {
        "name": "ERC-1155",
        "file": "erc-1155"
      },
      {
        "name": "ERC-721 Metadata",
        "file": "erc-721-metadata"
      },
      {
        "name": "ERC-721 Enumerable",
        "file": "erc-721-enumerable"
      }
    ],
    "filePath": "domains/ethereum/nft/erc-721.md"
  },
  {
    "id": "erc-1155",
    "name": "ERC-1155: Multi-Token Standard",
    "domain": "ethereum",
    "category": "nft",
    "assemblyIndex": 15000,
    "timeOrigin": "2018-06-17",
    "description": "The 'Swiss Army knife' of token standards, enabling both fungible and non-fungible tokens in a single contract. Base assembly index of ~15,000.",
    "connections": [
      {
        "name": "ERC-20",
        "file": "erc-20"
      },
      {
        "name": "ERC-721",
        "file": "erc-721"
      },
      {
        "name": "EIP-2981 Royalties",
        "file": "eip-2981"
      }
    ],
    "filePath": "domains/ethereum/nft/erc-1155.md"
  }
];

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { assembliesData };
}