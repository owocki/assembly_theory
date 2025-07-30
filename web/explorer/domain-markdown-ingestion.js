// Domain Markdown Ingestion - Parses all markdown files from domains/ directory
class DomainMarkdownIngestion {
    constructor() {
        this.domainColors = {
            ethereum: '#627EEA',
            tokens: '#FFD700',
            nft: '#FF6B6B',
            defi: '#00D4FF',
            infrastructure: '#8B5CF6',
            'account-abstraction': '#10B981',
            security: '#F59E0B',
            'gaming-metaverse': '#E11D48',
            'social-governance': '#8B5CF6'
        };
        
        // All markdown files from domains directory
        this.markdownFiles = [
            'ethereum/account-abstraction/eip-4337.md',
            'ethereum/defi/1inch.md',
            'ethereum/defi/aave.md',
            'ethereum/defi/balancer.md',
            'ethereum/defi/compound.md',
            'ethereum/defi/convex.md',
            'ethereum/defi/curve.md',
            'ethereum/defi/dydx.md',
            'ethereum/defi/eip-2612.md',
            'ethereum/defi/erc-4626.md',
            'ethereum/defi/etherfi.md',
            'ethereum/defi/frax.md',
            'ethereum/defi/gmx.md',
            'ethereum/defi/lido.md',
            'ethereum/defi/makerdao.md',
            'ethereum/defi/pendle.md',
            'ethereum/defi/rocket-pool.md',
            'ethereum/defi/sushiswap.md',
            'ethereum/defi/synthetix.md',
            'ethereum/defi/uniswap.md',
            'ethereum/defi/yearn.md',
            'ethereum/gaming-metaverse/axie-infinity.md',
            'ethereum/gaming-metaverse/decentraland.md',
            'ethereum/gaming-metaverse/gods-unchained.md',
            'ethereum/gaming-metaverse/illuvium.md',
            'ethereum/gaming-metaverse/the-sandbox.md',
            'ethereum/infrastructure/eip-1559.md',
            'ethereum/infrastructure/eip-4844.md',
            'ethereum/nft/blur.md',
            'ethereum/nft/erc-1155.md',
            'ethereum/nft/erc-721.md',
            'ethereum/nft/foundation.md',
            'ethereum/nft/manifold.md',
            'ethereum/nft/opensea.md',
            'ethereum/nft/rarible.md',
            'ethereum/nft/superrare.md',
            'ethereum/nft/zora.md',
            'ethereum/security/eip-1967.md',
            'ethereum/security/eip-2535.md',
            'ethereum/social-governance/aragon.md',
            'ethereum/social-governance/ens.md',
            'ethereum/social-governance/farcaster.md',
            'ethereum/social-governance/lens-protocol.md',
            'ethereum/social-governance/snapshot.md',
            'ethereum/tokens/erc-20.md'
        ];
    }
    
    async loadAllMarkdownFiles() {
        const nodes = [];
        const loadPromises = this.markdownFiles.map(async (filePath) => {
            try {
                const response = await fetch(`../../domains/${filePath}`);
                if (response.ok) {
                    const content = await response.text();
                    const node = this.parseMarkdownFile(content, filePath);
                    if (node) {
                        nodes.push(node);
                    }
                }
            } catch (error) {
                console.warn(`Failed to load ${filePath}:`, error);
            }
        });
        
        await Promise.all(loadPromises);
        return nodes;
    }
    
    parseMarkdownFile(content, filePath) {
        const lines = content.split('\n');
        const pathParts = filePath.split('/');
        const domain = pathParts[0];
        const category = pathParts[1];
        const filename = pathParts[2].replace('.md', '');
        
        // Extract title
        const titleMatch = lines.find(line => line.startsWith('# '));
        const title = titleMatch ? titleMatch.replace('# ', '').trim() : filename;
        
        // Extract assembly index
        let assemblyIndex = null;
        const aiMatch = content.match(/Base Assembly Index:\s*~?\s*([\d,]+)/i);
        if (aiMatch) {
            assemblyIndex = parseInt(aiMatch[1].replace(/,/g, ''));
        }
        
        // Extract key information
        let launchDate = null;
        let tvl = null;
        let tokens = null;
        
        const launchMatch = content.match(/Launch Date[:\s]+([\w\s]+\d{4})/i);
        if (launchMatch) {
            launchDate = launchMatch[1].trim();
        }
        
        const tvlMatch = content.match(/Total Value Locked[:\s]+\$?([\d.]+[BMK]?\+?)/i);
        if (tvlMatch) {
            tvl = tvlMatch[1];
        }
        
        const tokenMatch = content.match(/Tokens?[:\s]+([\w\s,()]+)/i);
        if (tokenMatch) {
            tokens = tokenMatch[1].trim();
        }
        
        // Extract description
        const overviewIndex = lines.findIndex(line => line.includes('## Overview'));
        let description = '';
        if (overviewIndex !== -1 && overviewIndex + 1 < lines.length) {
            description = lines[overviewIndex + 1].trim();
        }
        
        // Generate ID
        const id = filename.replace(/-/g, '_');
        
        // Determine color based on category
        const color = this.domainColors[category] || this.domainColors[domain] || '#999999';
        
        return {
            id: id,
            name: title,
            assembly_index: assemblyIndex || this.estimateAssemblyIndex(category, filename),
            domain: domain,
            category: category,
            color: color,
            radius: this.getNodeRadius(assemblyIndex),
            description: description,
            properties: {
                launch_date: launchDate,
                tvl: tvl,
                tokens: tokens,
                file_path: filePath
            },
            github_url: `https://github.com/owocki/assembly_theory/tree/master/domains/${filePath}`,
            source_type: 'markdown'
        };
    }
    
    estimateAssemblyIndex(category, filename) {
        // Estimate assembly index based on category and type
        const estimates = {
            'tokens': 2500,
            'nft': 10000,
            'defi': 100000,
            'infrastructure': 50000,
            'account-abstraction': 150000,
            'security': 30000,
            'gaming-metaverse': 200000,
            'social-governance': 80000
        };
        
        // Special cases
        if (filename.includes('erc-20')) return 2500;
        if (filename.includes('erc-721')) return 8500;
        if (filename.includes('erc-1155')) return 15000;
        if (filename.includes('eip-1559')) return 50000;
        if (filename.includes('eip-4844')) return 200000;
        
        return estimates[category] || 50000;
    }
    
    getNodeRadius(assemblyIndex) {
        if (!assemblyIndex) return 10;
        
        // Logarithmic scale for radius
        const logAI = Math.log10(assemblyIndex + 1);
        return Math.max(5, Math.min(30, 5 + logAI * 3));
    }
    
    generateEdges(nodes) {
        const edges = [];
        const nodeMap = new Map(nodes.map(n => [n.id, n]));
        
        // Category-based relationships
        nodes.forEach(node => {
            nodes.forEach(otherNode => {
                if (node.id !== otherNode.id) {
                    // Same category connections
                    if (node.category === otherNode.category) {
                        const aiRatio = Math.max(node.assembly_index, otherNode.assembly_index) / 
                                       Math.min(node.assembly_index, otherNode.assembly_index);
                        
                        if (aiRatio < 3) {
                            edges.push({
                                source: node.id,
                                target: otherNode.id,
                                type: 'same_category',
                                weight: 0.5
                            });
                        }
                    }
                    
                    // Cross-category relationships based on known connections
                    if (node.category === 'tokens' && otherNode.category === 'defi') {
                        edges.push({
                            source: node.id,
                            target: otherNode.id,
                            type: 'enables',
                            weight: 0.7
                        });
                    }
                    
                    if (node.category === 'nft' && otherNode.name.toLowerCase().includes('marketplace')) {
                        edges.push({
                            source: node.id,
                            target: otherNode.id,
                            type: 'traded_on',
                            weight: 0.6
                        });
                    }
                }
            });
        });
        
        // Special relationships
        this.addSpecialRelationships(edges, nodeMap);
        
        return edges;
    }
    
    addSpecialRelationships(edges, nodeMap) {
        const relationships = [
            {from: 'erc_20', to: 'uniswap', type: 'enables'},
            {from: 'erc_20', to: 'aave', type: 'enables'},
            {from: 'erc_721', to: 'opensea', type: 'traded_on'},
            {from: 'erc_1155', to: 'opensea', type: 'traded_on'},
            {from: 'uniswap', to: '1inch', type: 'liquidity_source'},
            {from: 'curve', to: 'convex', type: 'yield_optimization'},
            {from: 'lido', to: 'curve', type: 'liquidity_pools'},
            {from: 'makerdao', to: 'compound', type: 'dai_markets'},
            {from: 'axie_infinity', to: 'ronin', type: 'built_on'},
            {from: 'ens', to: 'ethereum', type: 'naming_service'}
        ];
        
        relationships.forEach(rel => {
            if (nodeMap.has(rel.from) && nodeMap.has(rel.to)) {
                edges.push({
                    source: rel.from,
                    target: rel.to,
                    type: rel.type,
                    weight: 0.8
                });
            }
        });
    }
    
    async generateCompleteDataset() {
        console.log('Loading all domain markdown files...');
        const nodes = await this.loadAllMarkdownFiles();
        console.log(`Loaded ${nodes.length} nodes from markdown files`);
        
        const edges = this.generateEdges(nodes);
        console.log(`Generated ${edges.length} edges`);
        
        return {
            nodes: nodes,
            edges: edges,
            metadata: {
                visualization_type: 'domain_markdown_network',
                total_nodes: nodes.length,
                total_edges: edges.length,
                categories: [...new Set(nodes.map(n => n.category))],
                source: 'domains_directory'
            }
        };
    }
}

// Make available globally
if (typeof window !== 'undefined') {
    window.DomainMarkdownIngestion = DomainMarkdownIngestion;
}