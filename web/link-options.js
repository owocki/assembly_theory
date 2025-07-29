class LinkOptions {
    constructor() {
        this.linkStrategies = {
            // No connections
            'none': {
                name: 'None',
                description: 'No connections between nodes',
                icon: '⚪',
                generateLinks: (nodes) => []
            },
            
            // Hierarchical strategy
            'hierarchical': {
                name: 'Hierarchical Assembly',
                description: 'Connect components to assemblies they create',
                icon: '🏗️',
                generateLinks: (nodes) => this.generateHierarchicalLinks(nodes)
            },
            
            // Assembly index based
            'proximity': {
                name: 'Complexity Proximity',
                description: 'Connect nodes with similar assembly indices',
                icon: '🔗',
                generateLinks: (nodes) => this.generateProximityLinks(nodes)
            },
            
            // Domain-specific clusters
            'domain_clusters': {
                name: 'Domain Clusters',
                description: 'Dense connections within domains only',
                icon: '🎯',
                generateLinks: (nodes) => this.generateDomainClusterLinks(nodes)
            }
        };
    }
    
    // Strategy implementations
    
    generateHierarchicalLinks(nodes) {
        const links = [];
        const nodeMap = new Map(nodes.map(n => [n.id, n]));
        
        // Predefined hierarchical relationships
        const hierarchies = [
            { from: 'quark', to: 'proton', type: 'assembly_pathway' },
            { from: 'proton', to: 'hydrogen', type: 'assembly_pathway' },
            { from: 'hydrogen', to: 'water', type: 'chemical_bond' },
            { from: 'amino_acid', to: 'protein', type: 'polymerization' },
            { from: 'protein', to: 'ribosome', type: 'assembly' },
            { from: 'cell', to: 'organism', type: 'multicellularity' },
            { from: 'organism', to: 'ecosystem', type: 'ecological_assembly' },
            { from: 'neuron', to: 'brain', type: 'network_formation' },
            { from: 'brain', to: 'consciousness', type: 'emergence' }
        ];
        
        // Add predefined links where both nodes exist
        hierarchies.forEach(rel => {
            if (nodeMap.has(rel.from) && nodeMap.has(rel.to)) {
                links.push({
                    source: rel.from,
                    target: rel.to,
                    type: rel.type,
                    weight: 1.0,
                    strategy: 'hierarchical'
                });
            }
        });
        
        // Add automatic hierarchical links based on AI differences
        nodes.forEach(node => {
            nodes.forEach(other => {
                if (node.id !== other.id && 
                    node.domain === other.domain &&
                    other.assembly_index > node.assembly_index &&
                    other.assembly_index / node.assembly_index > 2 &&
                    other.assembly_index / node.assembly_index < 100) {
                    
                    links.push({
                        source: node.id,
                        target: other.id,
                        type: 'assembly_pathway',
                        weight: 1 / Math.log10(other.assembly_index / node.assembly_index),
                        strategy: 'hierarchical'
                    });
                }
            });
        });
        
        return links;
    }
    
    generateProximityLinks(nodes) {
        const links = [];
        
        nodes.forEach((node, i) => {
            nodes.slice(i + 1).forEach(other => {
                const aiRatio = Math.max(node.assembly_index, other.assembly_index) / 
                               Math.min(node.assembly_index, other.assembly_index);
                
                // Connect if AI values are within 3x of each other
                if (aiRatio <= 3) {
                    links.push({
                        source: node.id,
                        target: other.id,
                        type: 'proximity',
                        weight: 1 / aiRatio,
                        strategy: 'proximity'
                    });
                }
            });
        });
        
        return links;
    }
    
    generateDomainClusterLinks(nodes) {
        const links = [];
        const domainGroups = this.groupByDomain(nodes);
        
        // Create dense connections within each domain
        Object.entries(domainGroups).forEach(([domain, domainNodes]) => {
            domainNodes.forEach((node, i) => {
                // Connect to 3-5 random nodes in same domain
                const connectionCount = Math.min(domainNodes.length - 1, 3 + Math.floor(Math.random() * 3));
                const shuffled = [...domainNodes].filter(n => n.id !== node.id).sort(() => Math.random() - 0.5);
                
                shuffled.slice(0, connectionCount).forEach(other => {
                    links.push({
                        source: node.id,
                        target: other.id,
                        type: 'domain_cluster',
                        weight: 0.7,
                        strategy: 'domain_clusters'
                    });
                });
            });
        });
        
        return links;
    }
    
    // Helper methods
    
    groupByDomain(nodes) {
        return nodes.reduce((groups, node) => {
            const domain = node.domain || 'unknown';
            if (!groups[domain]) groups[domain] = [];
            groups[domain].push(node);
            return groups;
        }, {});
    }
    
    // Create UI controls
    createLinkOptionsUI() {
        const html = `
            <div class="link-options-panel">
                <h3>Link Generation Strategy</h3>
                
                <div class="strategy-selector">
                    ${Object.entries(this.linkStrategies).map(([key, strategy]) => `
                        <label class="strategy-option">
                            <input type="radio" name="link-strategy" value="${key}" 
                                ${key === 'hierarchical' ? 'checked' : ''}>
                            <span class="strategy-icon">${strategy.icon}</span>
                            <span class="strategy-name">${strategy.name}</span>
                            <span class="strategy-description">${strategy.description}</span>
                        </label>
                    `).join('')}
                </div>
                
                <button id="apply-link-strategy" class="apply-button">Apply Strategy</button>
            </div>
        `;
        
        return html;
    }
}