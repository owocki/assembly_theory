class DataProcessor {
    constructor() {
        this.domainColors = {
            cosmic: '#0066CC',
            geological: '#8B4513',
            biological: '#228B22',
            cognitive: '#FFD700',
            technological: '#DC143C',
            hybrid: '#9932CC',
            earth: '#4B8B3B',
            physics: '#6A5ACD',
            technology: '#FF6347'
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
    
    // Generate comprehensive network data from all repository sources
    async generateRealData() {
        try {
            // Use the new assembliesData from the extracted domain files
            if (typeof assembliesData !== 'undefined' && assembliesData && assembliesData.length > 0) {
                console.log(`✅ Successfully loaded ${assembliesData.length} assemblies from domain extraction`);
                
                // Process assemblies to match expected node format
                const processedNodes = assembliesData.map(assembly => {
                    const tierInfo = this.getAssemblyTier(assembly.assemblyIndex);
                    return {
                        id: assembly.id,
                        name: assembly.name,
                        domain: assembly.domain,
                        category: assembly.category,
                        assembly_index: assembly.assemblyIndex,
                        time_origin: assembly.timeOrigin,
                        description: assembly.description,
                        connections: assembly.connections,
                        file_path: assembly.filePath,
                        tier: tierInfo.tier,
                        visual_complexity: tierInfo.symbol,
                        color: this.domainColors[assembly.domain] || '#999999',
                        radius: this.getNodeRadius(tierInfo.tier),
                        x: null,
                        y: null
                    };
                });
                
                const data = {
                    nodes: processedNodes,
                    edges: []  // Edges will be generated based on link strategy
                };
                
                console.log(`📊 Data summary:`, {
                    totalNodes: data.nodes.length,
                    withAssemblyIndex: data.nodes.filter(n => n.assembly_index !== null).length,
                    domains: [...new Set(data.nodes.map(n => n.domain))],
                    aiRange: {
                        min: Math.min(...data.nodes.filter(n => n.assembly_index !== null).map(n => n.assembly_index)),
                        max: Math.max(...data.nodes.filter(n => n.assembly_index !== null).map(n => n.assembly_index))
                    }
                });
                
                return data;
            }
        } catch (error) {
            console.warn('Failed to load pre-generated data:', error);
        }
        
        try {
            // Try complete markdown ingestion (from file list without fetching)
            if (typeof CompleteMarkdownIngestion !== 'undefined') {
                const completeIngestion = new CompleteMarkdownIngestion();
                const completeData = completeIngestion.generateDataFromFileList();
                
                if (completeData && completeData.nodes.length > 0) {
                    console.log(`✅ Successfully generated ${completeData.nodes.length} nodes from file list`);
                    return this.addBiologicalEntities(completeData);
                }
            }
        } catch (error) {
            console.warn('Complete markdown ingestion failed, trying other methods:', error);
        }
        
        try {
            // Try comprehensive data ingestion 
            const comprehensiveIngestion = new ComprehensiveDataIngestion();
            const comprehensiveData = await comprehensiveIngestion.generateComprehensiveDataset();
            
            if (comprehensiveData) {
                return this.addBiologicalEntities(comprehensiveData);
            }
        } catch (error) {
            console.warn('Comprehensive data ingestion failed, trying basic ingestion:', error);
        }
        
        try {
            // Fallback to basic data ingestion
            const dataIngestion = new DataIngestion();
            const realData = await dataIngestion.generateCompleteDataset();
            
            if (realData) {
                return this.addBiologicalEntities(realData);
            }
        } catch (error) {
            console.warn('Basic data ingestion failed, using sample data:', error);
        }
        
        // Final fallback to sample data
        return this.generateSampleData();
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
        
        // Add 100 biological entities
        let allNodes = nodes;
        if (typeof BiologicalEntities !== 'undefined') {
            const bioEntities = new BiologicalEntities();
            const biologicalNodes = bioEntities.generateBiologicalEntities();
            allNodes = [...nodes, ...biologicalNodes];
            console.log(`Added ${biologicalNodes.length} biological entities to the dataset`);
        }
        
        // Add 100+ organisms (animals and plants)
        if (typeof Organisms !== 'undefined') {
            const organisms = new Organisms();
            const organismNodes = organisms.generateOrganisms();
            allNodes = [...allNodes, ...organismNodes];
            console.log(`Added ${organismNodes.length} organisms (animals and plants) to the dataset`);
        }
        
        // Add 265 technological nodes
        if (typeof TechnologicalNodes !== 'undefined') {
            const techNodes = new TechnologicalNodes();
            const technologicalNodes = techNodes.generateTechnologies();
            allNodes = [...allNodes, ...technologicalNodes];
            console.log(`Added ${technologicalNodes.length} technological nodes to the dataset`);
        }
        
        // Process nodes with assembly tiers and colors
        const processedNodes = allNodes.map(node => this.processNode(node));
        
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
            copy_number: this.estimateCopyNumber(node.assembly_index, node.domain),
            github_url: this.generateGitHubUrl(node)
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
    
    generateGitHubUrl(node) {
        const baseUrl = 'https://github.com/owocki/assembly_theory/tree/master/domains';
        
        // Convert node name to filename format
        const filename = node.name
            .toLowerCase()
            .replace(/[^a-z0-9\s]/g, '') // Remove special characters
            .replace(/\s+/g, '_') // Replace spaces with underscores
            .replace(/_+/g, '_') // Remove duplicate underscores
            .replace(/^_|_$/g, ''); // Remove leading/trailing underscores
        
        // Map domain to likely subdirectory structure based on file organization
        const subdirMap = {
            'cosmic': this.getCosmicSubdir(filename),
            'geological': this.getGeologicalSubdir(filename),
            'biological': this.getBiologicalSubdir(filename),
            'cognitive': this.getCognitiveSubdir(filename),
            'technological': this.getTechnologicalSubdir(filename)
        };
        
        const subdir = subdirMap[node.domain] || '';
        const path = subdir ? `${node.domain}/${subdir}/${filename}.md` : `${node.domain}/${filename}.md`;
        
        return `${baseUrl}/${path}`;
    }
    
    getCosmicSubdir(filename) {
        const atomNames = ['hydrogen', 'helium', 'carbon', 'oxygen', 'nitrogen', 'lithium'];
        const moleculeNames = ['water', 'co2', 'methane', 'ammonia', 'hydrogen_gas'];
        const particleNames = ['proton', 'electron', 'neutron', 'photon', 'neutrino', 'quark', 'muon'];
        const starNames = ['main_sequence'];
        const galaxyNames = ['milky_way'];
        const ionNames = ['hydronium', 'hydroxide'];
        const forceNames = ['strong_nuclear', 'weak_nuclear'];
        const fieldNames = ['electromagnetic_field'];
        
        if (atomNames.includes(filename)) return 'atoms';
        if (moleculeNames.includes(filename)) return 'molecules';
        if (particleNames.includes(filename)) return 'particles';
        if (starNames.includes(filename)) return 'stars';
        if (galaxyNames.includes(filename)) return 'galaxies';
        if (ionNames.includes(filename)) return 'ions';
        if (forceNames.includes(filename)) return 'forces';
        if (fieldNames.includes(filename)) return 'quantum_fields';
        return '';
    }
    
    getGeologicalSubdir(filename) {
        const mineralNames = ['quartz', 'clay', 'iron_oxide', 'salt', 'diamond', 'graphite', 'hematite', 'corundum', 'apatite', 'halite', 'dolomite', 'siderite', 'fluorite', 'sylvite', 'anhydrite', 'barite', 'bornite', 'chalcopyrite', 'galena', 'molybdenite', 'sphalerite', 'actinolite', 'andalusite', 'beryl', 'cassiterite', 'chlorite', 'chromite', 'cordierite', 'diopside', 'epidote', 'hornblende', 'k_feldspar', 'kyanite', 'plagioclase', 'rutile', 'scheelite', 'serpentine', 'sillimanite', 'spinel', 'staurolite', 'talc', 'topaz', 'tourmaline', 'tremolite', 'vesuvianite', 'wolframite', 'wollastonite', 'zircon'];
        const rockNames = ['basalt', 'gabbro', 'gneiss', 'granite', 'obsidian', 'schist'];
        const formationNames = ['alluvial_deposit', 'banded_iron_formation', 'coal', 'epithermal_deposit', 'karst', 'kimberlite', 'limestone', 'ophiolite', 'pegmatite', 'porphyry_deposit', 'reef', 'sandstone', 'shale', 'skarn'];
        const processNames = ['erosion', 'hydrothermal_alteration', 'plate_tectonics', 'volcanism', 'weathering'];
        const compoundNames = ['silica_unit'];
        const planetaryNames = ['earth_system'];
        
        if (mineralNames.includes(filename)) {
            // Handle mineral subcategories
            const oxides = ['hematite', 'corundum', 'iron_oxide'];
            const carbonates = ['dolomite', 'siderite'];
            const halides = ['fluorite', 'sylvite', 'halite'];
            const sulfates = ['anhydrite', 'barite'];
            const sulfides = ['bornite', 'chalcopyrite', 'galena', 'molybdenite', 'sphalerite'];
            const phosphates = ['apatite'];
            
            if (oxides.includes(filename)) return 'minerals/oxides';
            if (carbonates.includes(filename)) return 'minerals/carbonates';
            if (halides.includes(filename)) return 'minerals/halides';
            if (sulfates.includes(filename)) return 'minerals/sulfates';
            if (sulfides.includes(filename)) return 'minerals/sulfides';
            if (phosphates.includes(filename)) return 'minerals/phosphates';
            return 'minerals';
        }
        if (rockNames.includes(filename)) return 'rocks';
        if (formationNames.includes(filename)) return 'formations';
        if (processNames.includes(filename)) return 'processes';
        if (compoundNames.includes(filename)) return 'compounds';
        if (planetaryNames.includes(filename)) return 'planetary_systems';
        return '';
    }
    
    getBiologicalSubdir(filename) {
        const prokaryoticNames = ['bacteria', 'ribosome', 'trna', 'dna_polymerase', 'photosystem', 'virus'];
        const eukaryoticNames = ['mitochondrion', 'chloroplast'];
        const prebioticNames = ['amino_acids', 'nucleotides', 'peptides', 'sugars', 'membranes'];
        const multicellularNames = ['insect'];
        const ecosystemNames = ['coral_reef'];
        const aminoAcidNames = ['glycine'];
        const modernNames = ['mrna_vaccine_platforms'];
        
        if (prokaryoticNames.includes(filename)) return 'prokaryotic';
        if (eukaryoticNames.includes(filename)) return 'eukaryotic';
        if (prebioticNames.includes(filename)) return 'prebiotic';
        if (multicellularNames.includes(filename)) return 'multicellular';
        if (ecosystemNames.includes(filename)) return 'ecosystems';
        if (aminoAcidNames.includes(filename)) return 'amino_acids';
        if (modernNames.includes(filename)) return 'modern';
        return '';
    }
    
    getCognitiveSubdir(filename) {
        const memoryNames = ['episodic_memory', 'semantic_memory', 'working_memory'];
        const learningNames = ['associative_learning', 'habit_formation', 'metacognition'];
        const socialNames = ['empathy', 'stereotype', 'theory_of_mind'];
        const languageNames = ['human_language', 'language_acquisition', 'nonverbal_communication'];
        const emotionNames = ['emotional_intelligence', 'moral_emotions'];
        const reasoningNames = ['analogical_reasoning', 'critical_thinking', 'executive_function'];
        const neuralNames = ['human_brain'];
        const basicNames = ['attention'];
        const collectiveNames = ['swarm_intelligence'];
        const cooperationNames = ['reciprocity'];
        const cultureNames = ['cultural_evolution'];
        const decisionNames = ['rational_choice'];
        const economicNames = ['market'];
        const governanceNames = ['authority', 'democracy'];
        const groupNames = ['social_influence'];
        const institutionNames = ['bureaucracy'];
        const socialStructureNames = ['kinship', 'tribe'];
        const trustNames = ['interpersonal_trust'];
        const consciousnessNames = ['emergence'];
        
        if (memoryNames.includes(filename)) return 'memory';
        if (learningNames.includes(filename)) return 'learning';
        if (socialNames.includes(filename)) return 'social_cognition';
        if (languageNames.includes(filename)) return filename.includes('language') ? 'language' : 'communication';
        if (emotionNames.includes(filename)) return 'emotions';
        if (reasoningNames.includes(filename)) return 'reasoning';
        if (neuralNames.includes(filename)) return 'neural_networks';
        if (basicNames.includes(filename)) return 'basic_cognition';
        if (collectiveNames.includes(filename)) return 'collective_intelligence';
        if (cooperationNames.includes(filename)) return 'cooperation';
        if (cultureNames.includes(filename)) return 'culture';
        if (decisionNames.includes(filename)) return 'decision_making';
        if (economicNames.includes(filename)) return 'economic_systems';
        if (governanceNames.includes(filename)) return 'governance';
        if (groupNames.includes(filename)) return 'group_dynamics';
        if (institutionNames.includes(filename)) return 'institutions';
        if (socialStructureNames.includes(filename)) return 'social_structures';
        if (trustNames.includes(filename)) return 'trust';
        if (consciousnessNames.includes(filename)) return 'consciousness';
        return '';
    }
    
    getTechnologicalSubdir(filename) {
        const computerNames = ['microprocessor'];
        const machineNames = ['steam_engine'];
        const networkNames = ['ai', 'internet'];
        const toolNames = ['stone_tools'];
        const modernNames = ['ai_native_applications', 'amazon_fulfillment', 'defi_yield_farming', 'edge_computing', 'layer2_rollups', 'llm_token_systems', 'react_server_components', 'tesla_gigafactory', 'tsmc_semiconductor'];
        
        if (computerNames.includes(filename)) return 'computers';
        if (machineNames.includes(filename)) return 'machines';
        if (networkNames.includes(filename)) return 'networks';
        if (toolNames.includes(filename)) return 'tools';
        if (modernNames.includes(filename)) return 'modern';
        return '';
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
    // Add biological entities to existing data
    addBiologicalEntities(data) {
        let enhancedData = data;
        
        // Add biological entities
        if (typeof BiologicalEntities !== 'undefined') {
            const bioEntities = new BiologicalEntities();
            const biologicalNodes = bioEntities.generateBiologicalEntities();
            const biologicalLinks = bioEntities.generateBiologicalLinks(biologicalNodes);
            
            console.log(`Adding ${biologicalNodes.length} biological entities to the dataset`);
            
            enhancedData = {
                ...enhancedData,
                nodes: [...enhancedData.nodes, ...biologicalNodes],
                edges: [...(enhancedData.edges || enhancedData.links || []), ...biologicalLinks]
            };
        }
        
        // Add organisms (animals and plants)
        if (typeof Organisms !== 'undefined') {
            const organisms = new Organisms();
            const organismNodes = organisms.generateOrganisms();
            const organismLinks = organisms.generateOrganismLinks(organismNodes);
            
            console.log(`Adding ${organismNodes.length} organisms (animals and plants) to the dataset`);
            
            enhancedData = {
                ...enhancedData,
                nodes: [...enhancedData.nodes, ...organismNodes],
                edges: [...(enhancedData.edges || enhancedData.links || []), ...organismLinks]
            };
        }
        
        // Add technological nodes
        if (typeof TechnologicalNodes !== 'undefined') {
            const techNodes = new TechnologicalNodes();
            const technologicalNodes = techNodes.generateTechnologies();
            const technologicalLinks = techNodes.generateTechnologyLinks(technologicalNodes);
            
            console.log(`Adding ${technologicalNodes.length} technological nodes to the dataset`);
            
            enhancedData = {
                ...enhancedData,
                nodes: [...enhancedData.nodes, ...technologicalNodes],
                edges: [...(enhancedData.edges || enhancedData.links || []), ...technologicalLinks]
            };
        }
        
        return enhancedData;
    }
    
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
            
            // Cosmic domain special filter - remove nodes with AI > 5000
            if (node.domain === 'cosmic' && node.assembly_index > 5000) {
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