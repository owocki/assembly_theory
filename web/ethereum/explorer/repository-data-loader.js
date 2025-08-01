class RepositoryDataLoader {
    constructor() {
        this.baseUrl = '.'; // Relative path to current directory
        this.domainColors = {
            ethereum: '#627EEA',
            cosmic: '#0066CC',
            geological: '#8B4513',
            biological: '#228B22',
            cognitive: '#FFD700',
            technological: '#DC143C',
            hybrid: '#9932CC'
        };
    }
    
    // Load all markdown data from the repository
    async loadAllRepositoryData() {
        console.log('🚀 Starting complete repository data load...');
        
        // First, try to load the markdown files
        const markdownData = await this.loadMarkdownFiles();
        
        // Then load CSV data to supplement
        const csvData = await this.loadCsvData();
        
        // Merge all data sources
        const mergedData = this.mergeDataSources(markdownData, csvData);
        
        console.log(`✅ Total assemblies loaded: ${mergedData.nodes.length}`);
        console.log(`🔗 Total relationships: ${mergedData.edges.length}`);
        
        return mergedData;
    }
    
    // Load markdown files from domains directory
    async loadMarkdownFiles() {
        const nodes = [];
        const successCount = { total: 0, byDomain: {} };
        
        // Define markdown files by domain
        const markdownFilesByDomain = {
            ethereum: [
                'tokens/erc-20', 'nft/erc-721', 'nft/erc-1155'
            ],
            cosmic: [
                'atoms/carbon', 'atoms/hydrogen', 'atoms/oxygen', 'atoms/helium',
                'atoms/nitrogen', 'atoms/lithium', 'atoms/deuterium', 'atoms/tritium',
                'molecules/water', 'molecules/methane', 'molecules/ammonia', 'molecules/co2',
                'molecules/hydrogen_gas', 'particles/electron', 'particles/proton',
                'particles/neutron', 'particles/photon', 'particles/quark',
                'particles/neutrino', 'particles/muon', 'ions/hydronium', 'ions/hydroxide',
                'forces/strong_nuclear', 'forces/weak_nuclear',
                'quantum_fields/electromagnetic_field', 'stars/main_sequence',
                'galaxies/milky_way'
            ],
            geological: [
                'minerals/quartz', 'minerals/clay', 'minerals/salt', 'minerals/iron_oxide',
                'minerals/diamond', 'minerals/graphite', 'minerals/tourmaline',
                'minerals/staurolite', 'minerals/cordierite', 'minerals/andalusite',
                'minerals/kyanite', 'minerals/sillimanite', 'minerals/epidote',
                'minerals/hornblende', 'minerals/actinolite', 'minerals/beryl',
                'minerals/cassiterite', 'minerals/chlorite', 'minerals/chromite',
                'minerals/diopside', 'minerals/k_feldspar', 'minerals/plagioclase',
                'minerals/rutile', 'minerals/scheelite', 'minerals/serpentine',
                'minerals/spinel', 'minerals/talc', 'minerals/topaz', 'minerals/tremolite',
                'minerals/vesuvianite', 'minerals/wolframite', 'minerals/wollastonite',
                'minerals/zircon', 'minerals/halides/fluorite', 'minerals/halides/halite',
                'minerals/halides/sylvite', 'minerals/oxides/hematite',
                'minerals/oxides/corundum', 'minerals/carbonates/dolomite',
                'minerals/carbonates/siderite', 'minerals/sulfates/anhydrite',
                'minerals/sulfates/barite', 'minerals/phosphates/apatite',
                'minerals/sulfides/galena', 'minerals/sulfides/sphalerite',
                'minerals/sulfides/chalcopyrite', 'minerals/sulfides/bornite',
                'minerals/sulfides/molybdenite', 'rocks/granite', 'rocks/basalt',
                'rocks/obsidian', 'rocks/gabbro', 'rocks/gneiss', 'rocks/schist',
                'formations/limestone', 'formations/coal', 'formations/sandstone',
                'formations/shale', 'formations/alluvial_deposit',
                'formations/epithermal_deposit', 'formations/karst', 'formations/kimberlite',
                'formations/ophiolite', 'formations/pegmatite', 'formations/porphyry_deposit',
                'formations/reef', 'formations/skarn', 'formations/banded_iron_formation',
                'processes/erosion', 'processes/weathering', 'processes/volcanism',
                'processes/plate_tectonics', 'processes/hydrothermal_alteration',
                'compounds/silica_unit', 'planetary_systems/earth_system'
            ],
            biological: [
                'prebiotic/amino_acids', 'prebiotic/nucleotides', 'prebiotic/peptides',
                'prebiotic/sugars', 'prebiotic/membranes', 'amino_acids/glycine',
                'prokaryotic/ribosome', 'prokaryotic/bacteria', 'prokaryotic/trna',
                'prokaryotic/virus', 'prokaryotic/photosystem', 'prokaryotic/dna_polymerase',
                'eukaryotic/mitochondrion', 'eukaryotic/chloroplast',
                'multicellular/insect', 'ecosystems/coral_reef',
                'modern/mrna_vaccine_platforms'
            ],
            cognitive: [
                'neural_networks/human_brain', 'language/human_language',
                'consciousness/emergence', 'culture/cultural_evolution',
                'memory/working_memory', 'memory/episodic_memory', 'memory/semantic_memory',
                'learning/associative_learning', 'learning/habit_formation',
                'learning/metacognition', 'social_cognition/empathy',
                'social_cognition/stereotype', 'social_cognition/theory_of_mind',
                'communication/language_acquisition', 'communication/nonverbal_communication',
                'emotions/emotional_intelligence', 'emotions/moral_emotions',
                'reasoning/analogical_reasoning', 'reasoning/critical_thinking',
                'reasoning/executive_function', 'basic_cognition/attention',
                'perception/visual_perception', 'collective_intelligence/swarm_intelligence',
                'cooperation/reciprocity', 'decision_making/rational_choice',
                'economic_systems/market', 'governance/authority', 'governance/democracy',
                'group_dynamics/social_influence', 'institutions/bureaucracy',
                'institutions/democracy', 'institutions/education_system',
                'institutions/healthcare_system', 'institutions/legal_system',
                'institutions/market_economy', 'institutions/marriage',
                'institutions/military', 'institutions/money', 'institutions/property_rights',
                'institutions/religion', 'institutions/science', 'institutions/state',
                'institutions/university', 'social_structures/kinship',
                'social_structures/tribe', 'trust/interpersonal_trust'
            ],
            technological: [
                'tools/stone_tools', 'machines/steam_engine', 'computers/microprocessor',
                'networks/internet', 'networks/ai', 'modern/ai_native_applications',
                'modern/amazon_fulfillment', 'modern/defi_yield_farming',
                'modern/edge_computing', 'modern/layer2_rollups', 'modern/llm_token_systems',
                'modern/react_server_components', 'modern/tesla_gigafactory',
                'modern/tsmc_semiconductor'
            ]
        };
        
        // Process each domain
        for (const [domain, files] of Object.entries(markdownFilesByDomain)) {
            successCount.byDomain[domain] = 0;
            
            for (const file of files) {
                try {
                    const filePath = `../domains/${domain}/${file}.md`;
                    const response = await fetch(filePath);
                    
                    if (response.ok) {
                        const content = await response.text();
                        const node = this.parseMarkdownContent(content, file, domain);
                        if (node) {
                            nodes.push(node);
                            successCount.total++;
                            successCount.byDomain[domain]++;
                        }
                    } else {
                        // Create placeholder
                        const placeholder = this.createPlaceholder(file, domain);
                        nodes.push(placeholder);
                    }
                } catch (error) {
                    // Create placeholder on error
                    const placeholder = this.createPlaceholder(file, domain);
                    nodes.push(placeholder);
                }
            }
        }
        
        console.log(`📄 Loaded ${successCount.total} markdown files successfully`);
        Object.entries(successCount.byDomain).forEach(([domain, count]) => {
            console.log(`  ${domain}: ${count} files`);
        });
        
        return { nodes, source: 'markdown' };
    }
    
    // Parse markdown content into node data
    parseMarkdownContent(content, filePath, domain) {
        const fileName = filePath.split('/').pop();
        const subdomain = filePath.includes('/') ? filePath.split('/')[0] : 'general';
        
        // Extract basic information
        const titleMatch = content.match(/^#\s+(.+)$/m);
        const name = titleMatch ? titleMatch[1].replace(/:\s*.+$/, '').trim() : 
                     fileName.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        
        // Extract assembly index
        let ai = 1000; // default
        const aiMatch = content.match(/Assembly Index[:\s]*[~]?(\d+(?:,\d+)*)/i);
        if (aiMatch) {
            ai = parseInt(aiMatch[1].replace(/,/g, ''));
        }
        
        // Extract time origin
        let timeOrigin = '';
        const timeMatches = [
            content.match(/First Appearance[:\s]*(.+)/i),
            content.match(/Origin[:\s]*(.+)/i),
            content.match(/Invention Date[:\s]*(.+)/i)
        ];
        for (const match of timeMatches) {
            if (match) {
                timeOrigin = match[1].trim();
                break;
            }
        }
        
        // Extract description
        let description = '';
        const descMatches = [
            content.match(/##\s*(?:Description|Overview|Introduction)[\s\S]*?\n\n([^#\n]+)/),
            content.match(/^#[^#][\s\S]*?\n\n([^#\n]+)/m)
        ];
        for (const match of descMatches) {
            if (match) {
                description = match[1].trim();
                break;
            }
        }
        
        const tier = this.getAssemblyTier(ai);
        
        return {
            id: fileName,
            name: name,
            assembly_index: ai,
            domain: domain,
            subdomain: subdomain,
            tier: tier.tier,
            visual_complexity: tier.symbol,
            color: this.domainColors[domain],
            radius: this.getNodeRadius(tier.tier),
            time_origin: timeOrigin || this.estimateTimeOrigin(domain, fileName),
            description: description || `${name} assembly in the ${domain} domain`,
            copy_number: this.estimateCopyNumber(ai, domain),
            github_url: `https://github.com/owocki/assembly_theory/tree/master/domains/${domain}/${filePath}.md`,
            source_type: 'markdown',
            file_path: filePath
        };
    }
    
    // Create placeholder for missing files
    createPlaceholder(filePath, domain) {
        const fileName = filePath.split('/').pop();
        const subdomain = filePath.includes('/') ? filePath.split('/')[0] : 'general';
        const name = fileName.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        const ai = this.estimateAssemblyIndex(fileName, domain);
        const tier = this.getAssemblyTier(ai);
        
        return {
            id: fileName,
            name: name,
            assembly_index: ai,
            domain: domain,
            subdomain: subdomain,
            tier: tier.tier,
            visual_complexity: tier.symbol,
            color: this.domainColors[domain],
            radius: this.getNodeRadius(tier.tier),
            time_origin: this.estimateTimeOrigin(domain, fileName),
            description: `${name} assembly in the ${domain} domain`,
            copy_number: this.estimateCopyNumber(ai, domain),
            github_url: `https://github.com/owocki/assembly_theory/tree/master/domains/${domain}/${filePath}.md`,
            source_type: 'placeholder',
            file_path: filePath
        };
    }
    
    // Load CSV data as supplement
    async loadCsvData() {
        try {
            const dataIngestion = new DataIngestion();
            const csvData = await dataIngestion.processCsvData();
            
            const allNodes = [
                ...csvData.assemblyMeasurements,
                ...csvData.biologicalAssemblies,
                ...csvData.molecularAssemblies,
                ...csvData.technologicalAssemblies
            ];
            
            console.log(`📊 Loaded ${allNodes.length} nodes from CSV data`);
            return { nodes: allNodes, source: 'csv' };
        } catch (error) {
            console.warn('CSV data loading failed:', error);
            return { nodes: [], source: 'csv' };
        }
    }
    
    // Merge all data sources
    mergeDataSources(markdownData, csvData) {
        const nodeMap = new Map();
        
        // Add markdown nodes first (priority)
        markdownData.nodes.forEach(node => {
            nodeMap.set(node.id, node);
        });
        
        // Add CSV nodes if not already present
        csvData.nodes.forEach(node => {
            if (!nodeMap.has(node.id)) {
                node.source_type = 'csv';
                nodeMap.set(node.id, node);
            }
        });
        
        const allNodes = Array.from(nodeMap.values());
        const edges = this.generateEdges(allNodes);
        
        return {
            nodes: allNodes,
            edges: edges,
            metadata: {
                total_nodes: allNodes.length,
                markdown_nodes: markdownData.nodes.length,
                csv_nodes: csvData.nodes.length,
                total_edges: edges.length,
                extraction_date: new Date().toISOString()
            }
        };
    }
    
    // Generate edges between nodes
    generateEdges(nodes) {
        const edges = [];
        const nodeMap = new Map(nodes.map(n => [n.id, n]));
        
        // Define key relationships
        const relationships = [
            // Fundamental pathways
            { from: 'hydrogen', to: 'water', type: 'chemical_bonding', weight: 95 },
            { from: 'carbon', to: 'methane', type: 'chemical_bonding', weight: 90 },
            { from: 'carbon', to: 'diamond', type: 'crystallization', weight: 85 },
            { from: 'water', to: 'amino_acids', type: 'enables', weight: 90 },
            { from: 'amino_acids', to: 'peptides', type: 'polymerization', weight: 90 },
            { from: 'ribosome', to: 'bacteria', type: 'component', weight: 90 },
            { from: 'human_brain', to: 'human_language', type: 'enables', weight: 95 },
            { from: 'human_language', to: 'cultural_evolution', type: 'enables', weight: 90 },
            { from: 'microprocessor', to: 'internet', type: 'enables', weight: 90 },
            { from: 'internet', to: 'ai', type: 'enables', weight: 85 }
        ];
        
        // Create defined edges
        relationships.forEach(rel => {
            if (nodeMap.has(rel.from) && nodeMap.has(rel.to)) {
                edges.push({
                    source: rel.from,
                    target: rel.to,
                    type: rel.type,
                    symbol: '→',
                    weight: rel.weight
                });
            }
        });
        
        // Generate proximity edges
        nodes.forEach((node, i) => {
            nodes.slice(i + 1).forEach(otherNode => {
                if (node.domain === otherNode.domain) {
                    const aiRatio = Math.max(node.assembly_index, otherNode.assembly_index) / 
                                   Math.min(node.assembly_index, otherNode.assembly_index);
                    
                    if (aiRatio < 5) {
                        edges.push({
                            source: node.id,
                            target: otherNode.id,
                            type: 'domain_proximity',
                            symbol: '↔',
                            weight: 1 / aiRatio
                        });
                    }
                }
            });
        });
        
        return edges;
    }
    
    // Helper methods
    getAssemblyTier(ai) {
        const tiers = [
            { min: 0, max: 10, tier: 1, symbol: '•' },
            { min: 10, max: 100, tier: 2, symbol: '••' },
            { min: 100, max: 1000, tier: 3, symbol: '•••' },
            { min: 1000, max: 10000, tier: 4, symbol: '••••' },
            { min: 10000, max: 100000, tier: 5, symbol: '•••••' },
            { min: 100000, max: 1000000, tier: 6, symbol: '••••••' },
            { min: 1000000, max: 1000000000, tier: 7, symbol: '•••••••' },
            { min: 1000000000, max: Infinity, tier: 8, symbol: '••••••••' }
        ];
        
        return tiers.find(tier => ai >= tier.min && ai < tier.max) || tiers[0];
    }
    
    getNodeRadius(tier) {
        return 3 + (tier * 2);
    }
    
    estimateCopyNumber(ai, domain) {
        const baseCopies = {
            cosmic: 1e20,
            geological: 1e15,
            biological: 1e10,
            cognitive: 1e6,
            technological: 1e3
        };
        
        const base = baseCopies[domain] || 1e6;
        return Math.max(1, Math.floor(base / Math.pow(ai, 0.5)));
    }
    
    estimateAssemblyIndex(fileName, domain) {
        // Comprehensive AI estimates for all files
        const estimates = {
            // Particles and atoms
            'photon': 1, 'electron': 1, 'proton': 2, 'neutron': 2,
            'hydrogen': 2, 'carbon': 6, 'oxygen': 8, 'water': 18,
            // Minerals
            'quartz': 25, 'diamond': 25, 'granite': 1000,
            // Biological
            'ribosome': 5000, 'bacteria': 100000, 'mitochondrion': 50000,
            // Cognitive
            'human_brain': 10000000000, 'human_language': 50000000000,
            // Technological
            'stone_tools': 1000, 'microprocessor': 1000000000, 'internet': 100000000000000
        };
        
        return estimates[fileName] || 1000;
    }
    
    estimateTimeOrigin(domain, fileName) {
        const timeMap = {
            'hydrogen': '13.8 Gyr ago', 'carbon': '13.0 Gyr ago', 'water': '13.4 Gyr ago',
            'quartz': '4.4 Gyr ago', 'ribosome': '3.8 Gyr ago',
            'human_brain': '300 kyr ago', 'human_language': '100 kyr ago',
            'stone_tools': '3.3 Myr ago', 'internet': '1969 CE'
        };
        
        if (timeMap[fileName]) return timeMap[fileName];
        
        const domainDefaults = {
            cosmic: '13.8 Gyr ago',
            geological: '4.5 Gyr ago',
            biological: '3.8 Gyr ago',
            cognitive: '500 kyr ago',
            technological: '10 kyr ago'
        };
        
        return domainDefaults[domain] || 'Unknown';
    }
}