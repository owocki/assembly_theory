// Ethereum domain assemblies
const ethereumAssemblies = {
    nodes: [
        {
            id: "erc-20",
            name: "ERC-20: Fungible Token Standard",
            domain: "ethereum",
            category: "tokens",
            assemblyIndex: 2500,
            description: "The foundational token standard that revolutionized digital asset representation on Ethereum."
        },
        {
            id: "erc-721",
            name: "ERC-721: Non-Fungible Token Standard",
            domain: "ethereum",
            category: "nft",
            assemblyIndex: 8500,
            description: "The standard that launched the NFT revolution, enabling unique digital asset ownership on Ethereum."
        },
        {
            id: "erc-1155",
            name: "ERC-1155: Multi-Token Standard",
            domain: "ethereum",
            category: "nft",
            assemblyIndex: 15000,
            description: "The 'Swiss Army knife' of token standards, enabling both fungible and non-fungible tokens in a single contract."
        }
    ],
    edges: [
        { source: "erc-20", target: "erc-721", type: "evolution" },
        { source: "erc-721", target: "erc-1155", type: "evolution" },
        { source: "erc-20", target: "erc-1155", type: "influence" }
    ]
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ethereumAssemblies };
}