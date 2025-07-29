class DataProcessor {
    constructor() {
        this.domainColors = {
            cosmic: '#0066CC',
            geological: '#8B4513',
            biological: '#228B22',
            cognitive: '#FFD700',
            technological: '#DC143C',
            hybrid: '#9932CC'
        };
        
        this.assemblyIndexTiers = [
            { min: 1, max: 10, tier: 1, symbol: '•' },
            { min: 10, max: 100, tier: 2, symbol: '••' },
            { min: 100, max: 1000, tier: 3, symbol: '•••' },
            { min: 1000, max: 10000, tier: 4, symbol: '••••' },
            { min: 10000, max: 100000, tier: 5, symbol: '•••••' },
            { min: 100000, max: 1000000, tier: 6, symbol: '••••••' },
            { min: 1000000, max: 1000000000, tier: 7, symbol: '•••••••' },
            { min: 1000000000, max: Infinity, tier: 8, symbol: '••••••••' }
        ];
    }
    
    // Generate comprehensive network data from repository CSV files
    async generateRealData() {
        const dataIngestion = new DataIngestion();
        const realData = await dataIngestion.generateCompleteDataset();
        
        if (realData) {
            return realData;
        } else {
            // Fallback to sample data if real data fails
            return this.generateSampleData();
        }
    }
    
    // Generate sample network data based on the existing repository structure
    generateSampleData() {
        const nodes = [
            // Cosmic domain
            { id: 'quark', name: 'Quark', assembly_index: 1, domain: 'cosmic', description: 'Fundamental particle' },
            { id: 'proton', name: 'Proton', assembly_index: 3, domain: 'cosmic', description: 'Composite particle made of quarks' },
            { id: 'hydrogen', name: 'Hydrogen', assembly_index: 2, domain: 'cosmic', description: 'Simplest atom' },
            { id: 'helium', name: 'Helium', assembly_index: 4, domain: 'cosmic', description: 'Second lightest element' },
            { id: 'carbon', name: 'Carbon', assembly_index: 6, domain: 'cosmic', description: 'Essential element for complex chemistry' },
            { id: 'oxygen', name: 'Oxygen', assembly_index: 8, domain: 'cosmic', description: 'Reactive element' },
            
            // Geological domain
            { id: 'water', name: 'Water (H₂O)', assembly_index: 12, domain: 'geological', description: 'Fundamental molecule for life' },
            { id: 'co2', name: 'Carbon Dioxide', assembly_index: 15, domain: 'geological', description: 'Important atmospheric gas' },
            { id: 'quartz', name: 'Quartz', assembly_index: 25, domain: 'geological', description: 'Common mineral' },
            { id: 'clay', name: 'Clay Minerals', assembly_index: 35, domain: 'geological', description: 'Complex mineral structures' },
            
            // Biological domain
            { id: 'amino_acid', name: 'Amino Acid', assembly_index: 45, domain: 'biological', description: 'Building blocks of proteins' },
            { id: 'nucleotide', name: 'Nucleotide', assembly_index: 50, domain: 'biological', description: 'Building blocks of DNA/RNA' },
            { id: 'peptide', name: 'Peptide', assembly_index: 150, domain: 'biological', description: 'Short protein chain' },
            { id: 'protein', name: 'Protein', assembly_index: 500, domain: 'biological', description: 'Complex folded molecule' },
            { id: 'dna', name: 'DNA', assembly_index: 1000, domain: 'biological', description: 'Genetic information storage' },
            { id: 'ribosome', name: 'Ribosome', assembly_index: 5000, domain: 'biological', description: 'Protein synthesis machinery' },
            { id: 'cell', name: 'Cell', assembly_index: 50000, domain: 'biological', description: 'Basic unit of life' },
            { id: 'organism', name: 'Multicellular Organism', assembly_index: 500000, domain: 'biological', description: 'Complex living system' },
            
            // Cognitive domain
            { id: 'neural_network', name: 'Neural Network', assembly_index: 100000, domain: 'cognitive', description: 'Network of neurons' },
            { id: 'brain', name: 'Brain', assembly_index: 10000000, domain: 'cognitive', description: 'Complex information processing system' },
            { id: 'consciousness', name: 'Consciousness', assembly_index: 100000000, domain: 'cognitive', description: 'Emergent awareness' },
            { id: 'language', name: 'Language', assembly_index: 50000000, domain: 'cognitive', description: 'Communication system' },
            
            // Technological domain
            { id: 'stone_tool', name: 'Stone Tool', assembly_index: 20, domain: 'technological', description: 'Early human technology' },
            { id: 'machine', name: 'Steam Engine', assembly_index: 10000, domain: 'technological', description: 'Mechanical power source' },
            { id: 'computer', name: 'Computer', assembly_index: 1000000, domain: 'technological', description: 'Information processing machine' },
            { id: 'ai_system', name: 'AI System', assembly_index: 100000000, domain: 'technological', description: 'Artificial intelligence' },
            { id: 'internet', name: 'Internet', assembly_index: 1000000000, domain: 'technological', description: 'Global network' },
            
            // Hybrid domain
            { id: 'cyborg', name: 'Cyborg', assembly_index: 200000000, domain: 'hybrid', description: 'Bio-technological fusion' },
            { id: 'synthetic_bio', name: 'Synthetic Biology', assembly_index: 75000000, domain: 'hybrid', description: 'Engineered biological systems' }
        ];
        
        const edges = [
            // Cosmic assembly pathways
            { source: 'quark', target: 'proton', type: 'assembly_pathway', symbol: '→' },
            { source: 'proton', target: 'hydrogen', type: 'assembly_pathway', symbol: '→' },
            { source: 'hydrogen', target: 'helium', type: 'nuclear_fusion', symbol: '⇒' },
            { source: 'hydrogen', target: 'water', type: 'chemical_bond', symbol: '×' },
            { source: 'oxygen', target: 'water', type: 'chemical_bond', symbol: '×' },
            { source: 'carbon', target: 'co2', type: 'chemical_bond', symbol: '×' },
            { source: 'oxygen', target: 'co2', type: 'chemical_bond', symbol: '×' },
            
            // Geological to biological transitions
            { source: 'water', target: 'amino_acid', type: 'chemical_evolution', symbol: '→' },
            { source: 'carbon', target: 'amino_acid', type: 'chemical_bond', symbol: '×' },
            { source: 'carbon', target: 'nucleotide', type: 'chemical_bond', symbol: '×' },
            { source: 'clay', target: 'amino_acid', type: 'catalysis', symbol: '≈' },
            
            // Biological assembly pathways
            { source: 'amino_acid', target: 'peptide', type: 'polymerization', symbol: '∞' },
            { source: 'peptide', target: 'protein', type: 'folding', symbol: '⇒' },
            { source: 'nucleotide', target: 'dna', type: 'polymerization', symbol: '∞' },
            { source: 'protein', target: 'ribosome', type: 'assembly', symbol: '×' },
            { source: 'dna', target: 'cell', type: 'genetic_organization', symbol: '→' },
            { source: 'ribosome', target: 'cell', type: 'assembly', symbol: '×' },
            { source: 'cell', target: 'organism', type: 'multicellularity', symbol: '⇒' },
            
            // Cognitive emergence
            { source: 'cell', target: 'neural_network', type: 'specialization', symbol: '→' },
            { source: 'neural_network', target: 'brain', type: 'organization', symbol: '×' },
            { source: 'brain', target: 'consciousness', type: 'emergence', symbol: '⇒' },
            { source: 'brain', target: 'language', type: 'emergence', symbol: '⇒' },
            
            // Technological pathways
            { source: 'stone_tool', target: 'machine', type: 'technological_evolution', symbol: '→' },
            { source: 'machine', target: 'computer', type: 'technological_evolution', symbol: '→' },
            { source: 'computer', target: 'ai_system', type: 'software_evolution', symbol: '→' },
            { source: 'computer', target: 'internet', type: 'network_assembly', symbol: '×' },
            
            // Hybrid pathways
            { source: 'organism', target: 'cyborg', type: 'technological_integration', symbol: '×' },
            { source: 'computer', target: 'cyborg', type: 'technological_integration', symbol: '×' },
            { source: 'cell', target: 'synthetic_bio', type: 'engineering', symbol: '→' },
            { source: 'ai_system', target: 'synthetic_bio', type: 'design_tool', symbol: '≈' },
            
            // Convergent pathways
            { source: 'ai_system', target: 'consciousness', type: 'convergent_evolution', symbol: '↔' },
            { source: 'internet', target: 'brain', type: 'functional_analogy', symbol: '≈' }
        ];
        
        // Process nodes with assembly tiers and colors
        const processedNodes = nodes.map(node => this.processNode(node));
        
        return {
            nodes: processedNodes,
            edges: edges,
            metadata: {
                visualization_type: 'network_graph',
                complexity_scale: 'AI_1_to_1B+',
                time_range: 'big_bang_to_present',
                domain_colors: this.domainColors
            }
        };
    }
    
    processNode(node) {
        const tier = this.getAssemblyTier(node.assembly_index);
        return {
            ...node,
            tier: tier.tier,
            visual_complexity: tier.symbol,
            color: this.domainColors[node.domain] || '#666666',
            radius: this.getNodeRadius(tier.tier),
            time_origin: this.estimateTimeOrigin(node.domain, node.assembly_index),
            copy_number: this.estimateCopyNumber(node.assembly_index, node.domain)
        };
    }
    
    getAssemblyTier(assemblyIndex) {
        return this.assemblyIndexTiers.find(tier => 
            assemblyIndex >= tier.min && assemblyIndex <= tier.max
        ) || this.assemblyIndexTiers[0];
    }
    
    getNodeRadius(tier) {
        return 3 + (tier * 2); // Scale from 5px to 19px
    }
    
    estimateTimeOrigin(domain, assemblyIndex) {
        const timeEstimates = {
            cosmic: '13.8 Gyr ago',
            geological: '4.5 Gyr ago',
            biological: '3.8 Gyr ago',
            cognitive: '500 Myr ago',
            technological: '2.5 Myr ago',
            hybrid: '50 yr ago'
        };
        return timeEstimates[domain] || 'Unknown';
    }
    
    estimateCopyNumber(assemblyIndex, domain) {
        // Rough inverse relationship between complexity and abundance
        const baseCopies = {
            cosmic: 1e20,
            geological: 1e15,
            biological: 1e10,
            cognitive: 1e6,
            technological: 1e3,
            hybrid: 1e2
        };
        
        const base = baseCopies[domain] || 1e6;
        return Math.max(1, Math.floor(base / Math.pow(assemblyIndex, 0.5)));
    }
    
    // Filter data based on current filter settings
    filterData(data, filters) {
        const { aiRange, domains, searchTerm } = filters;
        
        let filteredNodes = data.nodes.filter(node => {
            // Assembly Index filter
            if (node.tier < aiRange.min || node.tier > aiRange.max) {
                return false;
            }
            
            // Domain filter
            if (!domains.includes(node.domain)) {
                return false;
            }
            
            // Search filter
            if (searchTerm && !node.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                return false;
            }
            
            return true;
        });
        
        const nodeIds = new Set(filteredNodes.map(n => n.id));
        let filteredEdges = data.edges.filter(edge =>
            nodeIds.has(edge.source) && nodeIds.has(edge.target)
        );
        
        return {
            nodes: filteredNodes,
            edges: filteredEdges,
            metadata: data.metadata
        };
    }
}