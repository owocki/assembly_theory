class ComprehensiveDataIngestion {
    constructor() {
        this.domainColors = {
            cosmic: '#0066CC',
            geological: '#8B4513',
            biological: '#228B22',
            cognitive: '#FFD700',
            technological: '#DC143C',
            hybrid: '#9932CC'
        };
        
        this.dimensionalClassifications = {
            complexity: {
                fundamental: [1, 10],
                molecular: [10, 100],
                biomolecular: [100, 1000],
                basic_life: [1000, 10000],
                complex_life: [10000, 100000],
                civilizational: [100000, Infinity]
            },
            information: {
                chemical: 'structural_bonds',
                genetic: 'dna_rna_sequences',
                neural: 'synaptic_patterns',
                behavioral: 'action_sequences',
                pheromonal: 'concentration_gradients',
                social: 'communication_networks',
                cultural: 'symbol_systems'
            },
            scale: {
                quantum: [0, 0.1e-9],
                molecular: [0.1e-9, 100e-9],
                cellular: [1e-6, 100e-6],
                organism: [1e-3, 10],
                ecosystem: [1e3, 1e6],
                planetary: [1e6, 1e12],
                cosmic: [1e12, Infinity]
            },
            time: {
                instantaneous: [0, 1],
                biological: [1, 3.15e7], // seconds to years
                human: [3.15e7, 3.15e9], // years to centuries  
                millennial: [3.15e10, 3.15e11], // 1K-10K years
                geological: [3.15e13, 3.15e16], // millions of years
                cosmic: [3.15e16, Infinity] // billions of years
            }
        };
        
        this.mathematicalFramework = {
            assemblyIndexFormulas: {
                basic: 'AI(O) = min{n : ∃ sequence (s₁, s₂, ..., sₙ) such that sₙ = O}',
                hierarchical: 'AI_H(O, k) = AI_local(O, k) + Σ(i=0 to k-1) W(k,i) × AI_avg(Lᵢ)',
                network: 'AI_network(G) = Σᵢ A(vᵢ) + Σₑ∈E W(e) × Connection_complexity(e)'
            },
            complexityMetrics: {
                normalized: 'NAI(O) = AI(O) / log₂(|Building_Block_Set|)',
                efficiency: 'AE(O) = AI_optimal(O) / AI_actual(O)',
                information_content: 'AIC(O) = Σᵢ log₂(choices_at_step_i)',
                structural_entropy: 'SE(O) = -Σᵢ pᵢ log₂(pᵢ)'
            },
            scalingLaws: {
                assembly_time: 'T_assembly ∝ AI(O)^α × N_parallel^(-β)',
                resource_scaling: 'Resources(O) = R₀ × AI(O)^γ × (1 + ε × Complexity_penalty)',
                hierarchical_scaling: 'AI_H(O, k) ~ AI_base × k^β × N(O)^γ'
            }
        };
    }
    
    // Integrate all data sources into comprehensive dataset
    async generateComprehensiveDataset() {
        try {
            // Get existing CSV data
            const csvData = await this.processCsvData();
            
            // Process domain markdown data
            const domainData = this.processDomainData();
            
            // Process markdown files
            const markdownData = await this.processMarkdownFiles();
            
            // Process pathway data
            const pathwayData = this.processPathwayData();
            
            // Process network graph data
            const networkData = this.processNetworkGraphData();
            
            // Process case study data
            const caseStudyData = this.processCaseStudyData();
            
            // Process dimensional data
            const dimensionalData = this.processDimensionalData();
            
            // Combine all nodes
            const allNodes = [
                ...csvData.assemblyMeasurements,
                ...csvData.biologicalAssemblies,
                ...csvData.molecularAssemblies,
                ...csvData.technologicalAssemblies,
                ...domainData.nodes,
                ...markdownData.nodes,
                ...caseStudyData.nodes,
                ...dimensionalData.nodes
            ];
            
            // Remove duplicates and merge data
            const uniqueNodes = this.mergeAndDeduplicateNodes(allNodes);
            
            // Generate comprehensive edges
            const edges = this.generateComprehensiveEdges(uniqueNodes, pathwayData, networkData, caseStudyData);
            
            // Add dimensional classifications
            const enhancedNodes = this.addDimensionalClassifications(uniqueNodes);
            
            // Return complete dataset
            return {
                nodes: enhancedNodes,
                edges: edges,
                metadata: {
                    visualization_type: 'comprehensive_assembly_network',
                    complexity_scale: 'AI_0_to_infinity',
                    time_range: 'big_bang_to_future',
                    domain_colors: this.domainColors,
                    total_nodes: enhancedNodes.length,
                    total_edges: edges.length,
                    domains: Object.keys(this.domainColors),
                    dimensional_classifications: this.dimensionalClassifications,
                    mathematical_framework: this.mathematicalFramework,
                    data_sources: [
                        'CSV files (assembly_measurements, biological, molecular, technological)',
                        'Domain markdown files (cosmic, geological, biological, cognitive, technological)',
                        'Pathway files (convergent, divergent, hybrid)',
                        'Network graphs (cosmic_to_biological, assembly_network_full)',
                        'Case studies (10 major studies)',
                        'Dimensional classifications (complexity, information, scale, time)',
                        'Mathematical framework (equations, metrics, scaling laws)'
                    ],
                    ai_range: {
                        min: 0,
                        max: Number.MAX_SAFE_INTEGER
                    },
                    extraction_date: new Date().toISOString()
                }
            };
        } catch (error) {
            console.error('Error generating comprehensive dataset:', error);
            return null;
        }
    }
    
    // Process existing CSV data (reuse from data-ingestion.js)
    async processCsvData() {
        const dataIngestion = new DataIngestion();
        return await dataIngestion.processCsvData();
    }

    // Process all markdown files from domains directory
    async processMarkdownFiles() {
        const nodes = [];
        
        // Simulated markdown data based on file analysis
        // In a real implementation, this would read actual files
        const markdownNodes = [
            // High-priority cosmic assemblies
            this.createMarkdownNode('Hydrogen Atom', 2, 'cosmic', 'atoms', '13.8_Gyr_ago'),
            this.createMarkdownNode('Carbon Atom', 6, 'cosmic', 'atoms', '13.0_Gyr_ago'),
            this.createMarkdownNode('Oxygen Atom', 8, 'cosmic', 'atoms', '12.5_Gyr_ago'),
            this.createMarkdownNode('Water Molecule', 18, 'cosmic', 'molecules', '13.4_Gyr_ago'),
            this.createMarkdownNode('Methane', 16, 'cosmic', 'molecules', '12.0_Gyr_ago'),
            this.createMarkdownNode('Proton', 2, 'cosmic', 'particles', '13.8_Gyr_ago'),
            this.createMarkdownNode('Electron', 1, 'cosmic', 'particles', '13.8_Gyr_ago'),
            
            // High-priority geological assemblies
            this.createMarkdownNode('Quartz', 25, 'geological', 'minerals', '4.4_Gyr_ago'),
            this.createMarkdownNode('Diamond', 25, 'geological', 'minerals', '3.0_Gyr_ago'),
            this.createMarkdownNode('Granite', 1000, 'geological', 'rocks', '4.0_Gyr_ago'),
            this.createMarkdownNode('Limestone', 5000, 'geological', 'formations', '3.8_Gyr_ago'),
            this.createMarkdownNode('Plate Tectonics', 1000000, 'geological', 'processes', '3.2_Gyr_ago'),
            
            // High-priority biological assemblies
            this.createMarkdownNode('Amino Acids', 150, 'biological', 'prebiotic', '4.2_Gyr_ago'),
            this.createMarkdownNode('Nucleotides', 300, 'biological', 'prebiotic', '4.0_Gyr_ago'),
            this.createMarkdownNode('Ribosome', 5000, 'biological', 'prokaryotic', '3.8_Gyr_ago'),
            this.createMarkdownNode('Bacteria', 100000, 'biological', 'prokaryotic', '3.8_Gyr_ago'),
            this.createMarkdownNode('Mitochondrion', 50000, 'biological', 'eukaryotic', '2.0_Gyr_ago'),
            this.createMarkdownNode('Chloroplast', 60000, 'biological', 'eukaryotic', '1.5_Gyr_ago'),
            
            // High-priority cognitive assemblies
            this.createMarkdownNode('Human Brain', 10000000000, 'cognitive', 'neural_networks', '300_kyr_ago'),
            this.createMarkdownNode('Human Language', 50000000000, 'cognitive', 'language', '100_kyr_ago'),
            this.createMarkdownNode('Working Memory', 10000000, 'cognitive', 'memory', '500_kyr_ago'),
            this.createMarkdownNode('Cultural Evolution', 100000000000, 'cognitive', 'culture', '50_kyr_ago'),
            this.createMarkdownNode('Consciousness', 10000000000, 'cognitive', 'consciousness', '300_kyr_ago'),
            
            // High-priority technological assemblies
            this.createMarkdownNode('Stone Tools', 1000, 'technological', 'tools', '3.3_Myr_ago'),
            this.createMarkdownNode('Steam Engine', 10000000, 'technological', 'machines', '1712_CE'),
            this.createMarkdownNode('Microprocessor', 1000000000, 'technological', 'computers', '1971_CE'),
            this.createMarkdownNode('Internet', 100000000000000, 'technological', 'networks', '1969_CE'),
            this.createMarkdownNode('AI Native Applications', 1000000000000, 'technological', 'modern', '2022_CE')
        ];
        
        return { nodes: markdownNodes };
    }
    
    // Helper method to create standardized markdown nodes
    createMarkdownNode(name, ai, domain, subdomain, timeOrigin) {
        const tier = this.getAssemblyTier(ai);
        const id = name.toLowerCase().replace(/\s+/g, '_').replace(/[^\w]/g, '');
        
        return {
            id: id,
            name: name,
            assembly_index: ai,
            domain: domain,
            subdomain: subdomain,
            tier: tier.tier,
            visual_complexity: tier.symbol,
            color: this.domainColors[domain],
            radius: this.getNodeRadius(tier.tier),
            time_origin: timeOrigin,
            description: `Assembly theory analysis of ${name} with AI=${ai}`,
            copy_number: this.estimateCopyNumber(ai, domain),
            github_url: this.generateGitHubUrl({name, domain, subdomain}),
            source_type: 'markdown',
            components: [],
            properties: {},
            cross_references: [],
            applications: [],
            formation_processes: []
        };
    }
    
    // Process domain markdown data
    processDomainData() {
        return {
            nodes: [
                // Cosmic domain assemblies
                {
                    id: 'carbon_atom_detailed',
                    name: 'Carbon Atom',
                    assembly_index: 6,
                    domain: 'cosmic',
                    subdomain: 'atoms',
                    first_appearance: '13.0 billion years ago',
                    components: [
                        {type: 'protons', count: 6, ai: 3},
                        {type: 'neutrons', count: 6, ai: 3},
                        {type: 'electrons', count: 6, ai: 1}
                    ],
                    formation_process: 'Triple-alpha process in stellar cores',
                    properties: {
                        atomic_number: 6,
                        valence_electrons: 4,
                        bonding_capacity: 4,
                        electronegativity: 2.55
                    },
                    cross_references: [
                        '/domains/geological/minerals/diamond.md',
                        '/domains/biological/prebiotic/organic_chemistry.md',
                        '/domains/technological/materials/carbon_nanotubes.md'
                    ]
                },
                
                // Geological domain assemblies
                {
                    id: 'quartz_detailed',
                    name: 'Quartz',
                    assembly_index: 25,
                    domain: 'geological',
                    subdomain: 'minerals',
                    formula: 'SiO₂',
                    crystal_system: 'hexagonal',
                    first_appearance: '4.4 billion years ago',
                    formation_processes: [
                        {type: 'igneous', process: 'Magma crystallization'},
                        {type: 'hydrothermal', process: 'Solution precipitation'},
                        {type: 'metamorphic', process: 'Recrystallization'}
                    ],
                    properties: {
                        hardness: 7,
                        density: 2.65,
                        cleavage: 'none',
                        fracture: 'conchoidal'
                    }
                },
                
                // Biological domain assemblies
                {
                    id: 'ribosome_detailed',
                    name: 'Ribosome',
                    assembly_index: 5000,
                    domain: 'biological',
                    subdomain: 'prokaryotic',
                    first_appearance: '3.8 billion years ago',
                    function: 'protein synthesis machine',
                    structure: {
                        prokaryotic: {
                            type: '70S',
                            small_subunit: {name: '30S', ai: 2000},
                            large_subunit: {name: '50S', ai: 3000}
                        }
                    },
                    evolutionary_significance: [
                        'RNA World relic',
                        'Universal conservation across life',
                        'Molecular clock for phylogeny'
                    ]
                },
                
                // Cognitive domain assemblies
                {
                    id: 'human_brain_detailed',
                    name: 'Human Brain',
                    assembly_index: 10000000000,
                    domain: 'cognitive',
                    subdomain: 'neural_networks',
                    development: '280 days prenatal + 25 years postnatal',
                    mass: '1400g',
                    components: [
                        {type: 'neurons', count: 86000000000, ai: 10000},
                        {type: 'glial_cells', count: 86000000000, ai: 1000},
                        {type: 'synapses', count: 100000000000000, ai: 100}
                    ],
                    uniqueness: [
                        '3× larger than great apes',
                        'expanded prefrontal cortex',
                        'language capabilities',
                        'abstract reasoning',
                        'consciousness'
                    ]
                },
                
                // Technological domain assemblies  
                {
                    id: 'ai_native_applications',
                    name: 'AI-Native Applications',
                    assembly_index: 1000000000000,
                    domain: 'technological',
                    subdomain: 'modern',
                    first_appearance: '2022 (ChatGPT integration wave)',
                    categories: [
                        {type: 'code_generation', examples: ['GitHub Copilot', 'Cursor IDE']},
                        {type: 'content_creation', examples: ['Notion AI', 'Jasper']},
                        {type: 'customer_service', examples: ['Intercom AI', 'Zendesk AI']}
                    ],
                    market_transformation: {
                        software_development: '70% developers use AI tools daily',
                        content_creation: '60% marketers use AI writing',
                        business_operations: '85% enterprises piloting AI'
                    }
                }
            ]
        };
    }
    
    // Process pathway data
    processPathwayData() {
        return {
            convergent_pathways: [
                {
                    type: 'flight_systems',
                    independent_origins: 6,
                    ai_range: [1000000, 100000000000],
                    examples: ['insects', 'pterosaurs', 'birds', 'bats', 'aircraft'],
                    convergent_features: ['lift generation', 'control surfaces', 'power-to-weight optimization']
                },
                {
                    type: 'intelligence_systems',
                    independent_origins: 8,
                    ai_range: [1000000, 10000000000],
                    examples: ['mammals', 'birds', 'cephalopods', 'insects', 'ai_systems'],
                    convergent_features: ['information processing', 'memory systems', 'pattern recognition']
                },
                {
                    type: 'social_behavior',
                    independent_origins: 100,
                    ai_range: [10000, 10000000000],
                    examples: ['eusociality', 'pack_hunting', 'collective_decision_making'],
                    convergent_features: ['information sharing', 'division of labor', 'group intelligence']
                }
            ],
            divergent_pathways: [
                {
                    type: 'carbon_based_assemblies',
                    single_foundation: 'carbon_atom',
                    foundation_ai: 6,
                    branches: [
                        {type: 'geological', examples: ['diamond', 'graphite'], ai_range: [15, 40]},
                        {type: 'biological', examples: ['proteins', 'cells'], ai_range: [1000, 10000000]},
                        {type: 'technological', examples: ['nanotubes', 'synthetic'], ai_range: [100, 50000]}
                    ]
                },
                {
                    type: 'dna_based_assemblies',
                    single_foundation: 'dna_double_helix',
                    foundation_ai: 3000,
                    branches: [
                        {type: 'prokaryotic_genomes', ai_range: [1000000, 1000000000]},
                        {type: 'eukaryotic_genomes', ai_range: [1000000000, 100000000000]},
                        {type: 'synthetic_applications', ai_range: [10000, 1000000000000]}
                    ]
                }
            ]
        };
    }
    
    // Process network graph data
    processNetworkGraphData() {
        return {
            cosmic_to_biological: {
                key_transitions: [
                    {from: 'hydrogen_atom', to: 'water_molecule', type: 'chemical_bonding'},
                    {from: 'water_molecule', to: 'amino_acid', type: 'prebiotic_enabler'},
                    {from: 'amino_acid', to: 'protein_fold', type: 'polymerization'},
                    {from: 'protein_fold', to: 'ribosome', type: 'molecular_machine_assembly'},
                    {from: 'ribosome', to: 'prokaryotic_cell', type: 'cellular_organization'}
                ]
            },
            full_assembly_network: {
                domain_transitions: [
                    {from: 'cosmic', to: 'geological', key_enablers: ['gravity', 'heat', 'pressure']},
                    {from: 'cosmic', to: 'biological', key_enablers: ['water_molecule', 'carbon_atom']},
                    {from: 'biological', to: 'cognitive', key_enablers: ['neuron', 'neural_network']},
                    {from: 'cognitive', to: 'technological', key_enablers: ['human_brain', 'language']}
                ]
            }
        };
    }
    
    // Process case study data
    processCaseStudyData() {
        return {
            nodes: [
                {
                    id: 'dna_case_study',
                    name: 'DNA: Universal Information Storage',
                    assembly_index: 3000,
                    domain: 'biological',
                    case_study_type: 'information_storage',
                    properties: {
                        information_density: '10^19 bits per human genome',
                        error_rate: '10^-10 per bp per generation',
                        storage_advantage: '10^8-10^11 fold vs human technology'
                    },
                    enables: ['protein_synthesis', 'chromosome_organization', 'biotechnology_industry']
                },
                {
                    id: 'cities_case_study',
                    name: 'Cities: Human Collective Assemblies',
                    assembly_index: 1000000000000,
                    domain: 'technological',
                    case_study_type: 'social_organization',
                    scaling_laws: {
                        zipfs_law: 'rank × population ≈ constant',
                        sublinear_scaling: ['physical infrastructure', 'energy consumption'],
                        superlinear_scaling: ['economic output', 'innovation', 'cultural production']
                    },
                    network_effects: {
                        metcalfes_law: 'network value ∝ N²',
                        small_world_properties: 'high clustering, short path lengths'
                    }
                },
                {
                    id: 'consciousness_case_study',
                    name: 'Consciousness: The Ultimate Assembly',
                    assembly_index: 10000000000,
                    domain: 'cognitive',
                    case_study_type: 'emergence',
                    neural_substrate: {
                        neurons: '86 billion',
                        synapses: '150 trillion',
                        thalamo_cortical_system: 'AI contribution: 2B'
                    },
                    consciousness_states: [
                        {state: 'waking_consciousness', ai: 10000000000},
                        {state: 'rem_sleep', ai: 5000000000},
                        {state: 'anesthesia', ai: 100000000}
                    ]
                }
            ]
        };
    }
    
    // Process dimensional data
    processDimensionalData() {
        return {
            nodes: [
                {
                    id: 'water_multidimensional',
                    name: 'Water (Multi-dimensional)',
                    assembly_index: 6,
                    domain: 'cosmic',
                    dimensional_coordinates: {
                        complexity: 6,
                        information: 'chemical_structure',
                        scale: 2.8e-10, // 0.28 nm
                        time: 4.238e17 // 380,000 years post-Big Bang in seconds
                    },
                    dimensional_classifications: {
                        complexity_class: 'fundamental',
                        information_class: 'chemical',
                        scale_class: 'molecular',
                        time_class: 'cosmic'
                    }
                },
                {
                    id: 'human_language_multidimensional',
                    name: 'Human Language (Multi-dimensional)',
                    assembly_index: 50000000000,
                    domain: 'cognitive',
                    dimensional_coordinates: {
                        complexity: 50000000000,
                        information: 'social_cultural',
                        scale: 'neural_networks',
                        time: 1.58e11 // ~100,000 years in seconds
                    },
                    information_content: {
                        phonemes: '40 bits per language',
                        lexicon: '500K bits (50K words)',
                        grammar_rules: '100K bits (1K rules)',
                        total_per_language: '1.6M bits'
                    }
                }
            ]
        };
    }
    
    // Merge and deduplicate nodes
    mergeAndDeduplicateNodes(allNodes) {
        const nodeMap = new Map();
        
        allNodes.forEach(node => {
            const key = node.id || node.name?.toLowerCase().replace(/\s+/g, '_').replace(/[^\w]/g, '');
            
            if (nodeMap.has(key)) {
                // Merge properties from multiple sources
                const existing = nodeMap.get(key);
                nodeMap.set(key, {
                    ...existing,
                    ...node,
                    // Preserve arrays by concatenating
                    components: [...(existing.components || []), ...(node.components || [])],
                    cross_references: [...(existing.cross_references || []), ...(node.cross_references || [])],
                    // Take the most detailed description
                    description: node.description || existing.description,
                    // Use the highest assembly index if multiple values
                    assembly_index: Math.max(existing.assembly_index || 0, node.assembly_index || 0) || node.assembly_index || existing.assembly_index
                });
            } else {
                nodeMap.set(key, {
                    ...node,
                    id: key
                });
            }
        });
        
        // Process final nodes
        return Array.from(nodeMap.values()).map(node => this.processNode(node));
    }
    
    // Generate comprehensive edges
    generateComprehensiveEdges(nodes, pathwayData, networkData, caseStudyData) {
        const edges = [];
        const nodeMap = new Map(nodes.map(n => [n.id, n]));
        
        // Add pathway-based relationships
        pathwayData.convergent_pathways.forEach(pathway => {
            pathway.examples.forEach((example, i) => {
                if (i < pathway.examples.length - 1) {
                    const sourceId = example.toLowerCase().replace(/\s+/g, '_');
                    const targetId = pathway.examples[i + 1].toLowerCase().replace(/\s+/g, '_');
                    
                    if (nodeMap.has(sourceId) && nodeMap.has(targetId)) {
                        edges.push({
                            source: sourceId,
                            target: targetId,
                            type: 'convergent_evolution',
                            symbol: '≈',
                            pathway_type: pathway.type,
                            weight: 0.7
                        });
                    }
                }
            });
        });
        
        // Add network graph relationships
        networkData.cosmic_to_biological.key_transitions.forEach(transition => {
            const sourceId = transition.from;
            const targetId = transition.to;
            
            if (nodeMap.has(sourceId) && nodeMap.has(targetId)) {
                edges.push({
                    source: sourceId,
                    target: targetId,
                    type: transition.type,
                    symbol: '→',
                    weight: 0.9
                });
            }
        });
        
        // Add case study relationships
        caseStudyData.nodes.forEach(caseStudy => {
            if (caseStudy.enables) {
                caseStudy.enables.forEach(target => {
                    const targetId = target.toLowerCase().replace(/\s+/g, '_');
                    if (nodeMap.has(targetId)) {
                        edges.push({
                            source: caseStudy.id,
                            target: targetId,
                            type: 'enables',
                            symbol: '→',
                            weight: 0.8
                        });
                    }
                });
            }
        });
        
        // Add mathematical framework relationships
        this.addMathematicalFrameworkEdges(nodes, edges);
        
        // Add proximity-based edges (from existing logic)
        this.generateProximityEdges(nodes, edges);
        
        return edges;
    }
    
    // Add dimensional classifications to nodes
    addDimensionalClassifications(nodes) {
        return nodes.map(node => {
            const ai = node.assembly_index || 0;
            
            // Classify by complexity
            let complexityClass = 'unknown';
            for (const [className, range] of Object.entries(this.dimensionalClassifications.complexity)) {
                if (ai >= range[0] && ai < range[1]) {
                    complexityClass = className;
                    break;
                }
            }
            
            // Classify by information type
            let informationClass = 'chemical'; // default
            if (node.domain === 'biological') {
                if (node.id.includes('dna') || node.id.includes('rna')) informationClass = 'genetic';
                else if (node.id.includes('neuron') || node.id.includes('brain')) informationClass = 'neural';
                else if (node.subdomain === 'behavior') informationClass = 'behavioral';
            } else if (node.domain === 'cognitive') {
                informationClass = 'neural';
            } else if (node.domain === 'technological') {
                informationClass = 'social';
            }
            
            // Estimate scale
            let scaleClass = 'molecular'; // default
            if (ai < 100) scaleClass = 'molecular';
            else if (ai < 100000) scaleClass = 'cellular';
            else if (ai < 100000000) scaleClass = 'organism';
            else if (ai < 100000000000) scaleClass = 'ecosystem';
            else scaleClass = 'planetary';
            
            // Estimate time class
            let timeClass = 'cosmic'; // default
            if (node.first_appearance) {
                if (node.first_appearance.includes('CE') || node.first_appearance.includes('years_ago')) {
                    timeClass = 'human';
                } else if (node.first_appearance.includes('kyr') || node.first_appearance.includes('Myr')) {
                    timeClass = 'geological';
                } else if (node.first_appearance.includes('Gyr')) {
                    timeClass = 'cosmic';
                }
            }
            
            return {
                ...node,
                dimensional_classifications: {
                    complexity_class: complexityClass,
                    information_class: informationClass,
                    scale_class: scaleClass,
                    time_class: timeClass
                },
                mathematical_properties: this.calculateMathematicalProperties(node)
            };
        });
    }
    
    // Add mathematical framework edges
    addMathematicalFrameworkEdges(nodes, edges) {
        // Add edges based on scaling laws and mathematical relationships
        nodes.forEach(node => {
            nodes.forEach(otherNode => {
                if (node.id !== otherNode.id) {
                    const aiRatio = Math.max(node.assembly_index, otherNode.assembly_index) / 
                                   Math.min(node.assembly_index, otherNode.assembly_index);
                    
                    // Mathematical relationship based on scaling laws
                    if (aiRatio > 1 && aiRatio < 10 && node.domain === otherNode.domain) {
                        const relationshipStrength = 1 / Math.log10(aiRatio + 1);
                        if (relationshipStrength > 0.5) {
                            edges.push({
                                source: node.id,
                                target: otherNode.id,
                                type: 'mathematical_relationship',
                                symbol: '≈',
                                weight: relationshipStrength,
                                mathematical_basis: 'scaling_law_proximity'
                            });
                        }
                    }
                }
            });
        });
    }
    
    // Generate proximity-based edges (reuse existing logic)
    generateProximityEdges(nodes, edges) {
        const existingEdges = new Set(edges.map(e => `${e.source}-${e.target}`));
        
        nodes.forEach((node, i) => {
            nodes.slice(i + 1).forEach(otherNode => {
                const edgeKey = `${node.id}-${otherNode.id}`;
                const reverseKey = `${otherNode.id}-${node.id}`;
                
                if (existingEdges.has(edgeKey) || existingEdges.has(reverseKey)) {
                    return;
                }
                
                // Connect nodes with similar AI values in same domain
                const aiRatio = Math.max(node.assembly_index, otherNode.assembly_index) / 
                              Math.min(node.assembly_index, otherNode.assembly_index);
                
                if (node.domain === otherNode.domain && aiRatio < 5) {
                    edges.push({
                        source: node.id,
                        target: otherNode.id,
                        type: 'domain_proximity',
                        symbol: '↔',
                        weight: 1 / aiRatio
                    });
                    existingEdges.add(edgeKey);
                }
            });
        });
    }
    
    // Process individual nodes (reuse existing logic with enhancements)
    processNode(rawNode) {
        // Extract assembly index
        let assemblyIndex = rawNode.assembly_index || rawNode.measured_ai || rawNode.theoretical_ai;
        if (typeof assemblyIndex === 'string') {
            if (assemblyIndex.includes('-')) {
                const parts = assemblyIndex.split('-');
                assemblyIndex = (parseInt(parts[0]) + parseInt(parts[1])) / 2;
            } else {
                assemblyIndex = parseInt(assemblyIndex);
            }
        }
        
        // Determine domain
        let domain = rawNode.domain || 'cosmic';
        if (!this.domainColors[domain]) {
            domain = 'cosmic';
        }
        
        // Extract name
        const name = rawNode.name || rawNode.object_name || 'Unknown';
        
        // Create comprehensive node
        const tier = this.getAssemblyTier(assemblyIndex);
        
        return {
            id: rawNode.id || name.toLowerCase().replace(/\s+/g, '_').replace(/[^\w]/g, ''),
            name: name,
            assembly_index: assemblyIndex,
            domain: domain,
            tier: tier.tier,
            visual_complexity: tier.symbol,
            color: this.domainColors[domain],
            radius: this.getNodeRadius(tier.tier),
            time_origin: rawNode.first_appearance || rawNode.time_origin || rawNode.invention_date || '',
            description: rawNode.description || rawNode.notes || '',
            copy_number: this.estimateCopyNumber(assemblyIndex, domain),
            github_url: this.generateGitHubUrl({ name, domain }),
            
            // Enhanced properties from comprehensive ingestion
            subdomain: rawNode.subdomain,
            components: rawNode.components || [],
            cross_references: rawNode.cross_references || [],
            formation_process: rawNode.formation_process,
            properties: rawNode.properties || {},
            evolutionary_significance: rawNode.evolutionary_significance || [],
            
            // Raw data for reference
            raw_data: rawNode
        };
    }
    
    // Calculate mathematical properties for nodes
    calculateMathematicalProperties(node) {
        const ai = node.assembly_index || 0;
        
        return {
            normalized_ai: ai / Math.log2(100), // Assuming 100 basic building blocks
            assembly_efficiency: 0.8, // Placeholder - would need actual calculation
            information_content: Math.log2(ai + 1),
            structural_entropy: this.calculateStructuralEntropy(node),
            assembly_stability: this.calculateAssemblyStability(node),
            hierarchical_depth: Math.floor(Math.log10(ai + 1)),
            complexity_tier: this.getAssemblyTier(ai).tier
        };
    }
    
    // Calculate structural entropy
    calculateStructuralEntropy(node) {
        // Simplified calculation based on component diversity
        const components = node.components || [];
        if (components.length === 0) return 0;
        
        const componentCounts = {};
        components.forEach(comp => {
            const type = comp.type || comp.name || 'unknown';
            componentCounts[type] = (componentCounts[type] || 0) + 1;
        });
        
        const total = components.length;
        let entropy = 0;
        Object.values(componentCounts).forEach(count => {
            const p = count / total;
            entropy -= p * Math.log2(p);
        });
        
        return entropy;
    }
    
    // Calculate assembly stability
    calculateAssemblyStability(node) {
        const ai = node.assembly_index || 0;
        const componentCount = (node.components || []).length;
        
        // Higher AI generally means lower stability (more ways to break)
        // More components generally means lower stability
        return Math.max(0, 1 - (Math.log10(ai + 1) / 10) - (componentCount / 100));
    }
    
    // Reuse existing utility methods
    getAssemblyTier(assemblyIndex) {
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
        
        return tiers.find(tier => 
            assemblyIndex >= tier.min && assemblyIndex < tier.max
        ) || tiers[0];
    }
    
    getNodeRadius(tier) {
        return 3 + (tier * 2);
    }
    
    generateGitHubUrl(node) {
        const baseUrl = 'https://github.com/owocki/assembly_theory/tree/master/domains';
        
        // Handle case where node has subdomain already defined
        if (node.subdomain && node.subdomain !== 'general') {
            const filename = (node.name || 'unknown')
                .toLowerCase()
                .replace(/[^a-z0-9\s]/g, '') // Remove special characters
                .replace(/\s+/g, '_') // Replace spaces with underscores
                .replace(/_+/g, '_') // Remove duplicate underscores
                .replace(/^_|_$/g, ''); // Remove leading/trailing underscores
            
            return `${baseUrl}/${node.domain}/${node.subdomain}/${filename}.md`;
        }
        
        // Convert node name to filename format
        const filename = (node.name || 'unknown')
            .toLowerCase()
            .replace(/[^a-z0-9\s]/g, '') // Remove special characters
            .replace(/\s+/g, '_') // Replace spaces with underscores
            .replace(/_+/g, '_') // Remove duplicate underscores
            .replace(/^_|_$/g, ''); // Remove leading/trailing underscores
        
        // For comprehensive data, try to map to actual file structure
        const subdir = this.getSubdirectory(node.domain, filename);
        const path = subdir ? `${node.domain}/${subdir}/${filename}.md` : `${node.domain}/${filename}.md`;
        
        return `${baseUrl}/${path}`;
    }
    
    getSubdirectory(domain, filename) {
        // Comprehensive subdirectory mapping based on actual file structure
        const patterns = {
            'cosmic': {
                'atoms': ['hydrogen', 'helium', 'carbon', 'oxygen', 'nitrogen', 'lithium', 'deuterium', 'tritium'],
                'molecules': ['water', 'co2', 'methane', 'ammonia', 'hydrogen_gas'],
                'particles': ['proton', 'electron', 'neutron', 'photon', 'quark', 'neutrino', 'muon'],
                'ions': ['hydronium', 'hydroxide'],
                'forces': ['strong_nuclear', 'weak_nuclear'],
                'quantum_fields': ['electromagnetic_field'],
                'stars': ['main_sequence'],
                'galaxies': ['milky_way']
            },
            'geological': {
                'minerals': ['quartz', 'clay', 'diamond', 'graphite', 'salt', 'iron_oxide', 'tourmaline', 
                           'staurolite', 'cordierite', 'andalusite', 'kyanite', 'sillimanite', 'epidote',
                           'hornblende', 'actinolite', 'beryl', 'cassiterite', 'chlorite', 'chromite',
                           'diopside', 'k_feldspar', 'plagioclase', 'rutile', 'scheelite', 'serpentine',
                           'spinel', 'talc', 'topaz', 'tremolite', 'vesuvianite', 'wolframite', 
                           'wollastonite', 'zircon'],
                'minerals/halides': ['fluorite', 'sylvite', 'halite'],
                'minerals/sulfides': ['galena', 'sphalerite', 'chalcopyrite', 'bornite', 'molybdenite'],
                'minerals/oxides': ['hematite', 'corundum'],
                'minerals/carbonates': ['dolomite', 'siderite'],
                'minerals/sulfates': ['anhydrite', 'barite'],
                'minerals/phosphates': ['apatite'],
                'rocks': ['granite', 'basalt', 'obsidian', 'gabbro', 'gneiss', 'schist'],
                'formations': ['limestone', 'coal', 'sandstone', 'shale', 'alluvial_deposit', 
                              'epithermal_deposit', 'karst', 'kimberlite', 'ophiolite', 'pegmatite',
                              'reef', 'skarn', 'porphyry_deposit', 'banded_iron_formation'],
                'processes': ['erosion', 'weathering', 'volcanism', 'plate_tectonics', 'hydrothermal_alteration'],
                'compounds': ['silica_unit'],
                'planetary_systems': ['earth_system']
            },
            'biological': {
                'prebiotic': ['amino_acids', 'nucleotides', 'peptides', 'sugars', 'membranes'],
                'amino_acids': ['glycine'],
                'prokaryotic': ['bacteria', 'ribosome', 'virus', 'trna', 'photosystem', 'dna_polymerase'],
                'eukaryotic': ['mitochondrion', 'chloroplast'],
                'multicellular': ['insect'],
                'ecosystems': ['coral_reef'],
                'modern': ['mrna_vaccine_platforms']
            },
            'cognitive': {
                'neural_networks': ['human_brain'],
                'language': ['human_language'],
                'communication': ['language_acquisition', 'nonverbal_communication'],
                'consciousness': ['emergence'],
                'culture': ['cultural_evolution'],
                'memory': ['working_memory', 'episodic_memory', 'semantic_memory'],
                'learning': ['associative_learning', 'habit_formation', 'metacognition'],
                'social_cognition': ['empathy', 'stereotype', 'theory_of_mind'],
                'emotions': ['emotional_intelligence', 'moral_emotions'],
                'reasoning': ['analogical_reasoning', 'critical_thinking', 'executive_function'],
                'basic_cognition': ['attention'],
                'collective_intelligence': ['swarm_intelligence'],
                'cooperation': ['reciprocity'],
                'decision_making': ['rational_choice'],
                'economic_systems': ['market'],
                'governance': ['authority', 'democracy'],
                'group_dynamics': ['social_influence'],
                'institutions': ['bureaucracy'],
                'social_structures': ['kinship', 'tribe'],
                'trust': ['interpersonal_trust']
            },
            'technological': {
                'tools': ['stone_tools'],
                'machines': ['steam_engine'],
                'computers': ['microprocessor'],
                'networks': ['internet', 'ai'],
                'modern': ['ai_native_applications', 'amazon_fulfillment', 'defi_yield_farming',
                          'edge_computing', 'layer2_rollups', 'llm_token_systems', 
                          'react_server_components', 'tesla_gigafactory', 'tsmc_semiconductor']
            }
        };
        
        const domainPatterns = patterns[domain];
        if (!domainPatterns) return '';
        
        for (const [subdir, files] of Object.entries(domainPatterns)) {
            if (files.includes(filename)) {
                return subdir;
            }
        }
        
        return '';
    }
    
    estimateCopyNumber(assemblyIndex, domain) {
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
}