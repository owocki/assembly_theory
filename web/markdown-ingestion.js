class MarkdownIngestion {
    constructor() {
        this.nodes = [];
        this.links = [];
        this.domainColors = {
            cosmic: '#4B0082',
            geological: '#8B4513', 
            biological: '#228B22',
            cognitive: '#FFD700',
            technological: '#DC143C',
            hybrid: '#800080'
        };
    }
    
    async loadAllDomainData() {
        try {
            // Define all known markdown files from the repository structure
            const allFiles = this.getAllMarkdownFiles();
            
            console.log(`Loading ${allFiles.length} markdown files...`);
            
            for (const fileInfo of allFiles) {
                try {
                    const response = await fetch(`../${fileInfo.path}`);
                    if (response.ok) {
                        const content = await response.text();
                        const node = this.parseMarkdownFile(content, fileInfo);
                        if (node) {
                            this.nodes.push(node);
                        }
                    } else {
                        console.warn(`Could not load ${fileInfo.path}`);
                    }
                } catch (error) {
                    console.warn(`Error loading ${fileInfo.path}:`, error);
                }
            }
            
            console.log(`Successfully loaded ${this.nodes.length} nodes`);
            
            // Process cross-references to create links
            this.extractLinksFromNodes();
            
            return {
                nodes: this.nodes,
                links: this.links
            };
        } catch (error) {
            console.error('Error loading domain data:', error);
            return { nodes: [], links: [] };
        }
    }
    
    getAllMarkdownFiles() {
        // Complete list of all markdown files in the repository
        return [
            // Cosmic domain
            { path: 'domains/cosmic/atoms/hydrogen.md', domain: 'cosmic', subdomain: 'atoms' },
            { path: 'domains/cosmic/atoms/helium.md', domain: 'cosmic', subdomain: 'atoms' },
            { path: 'domains/cosmic/atoms/carbon.md', domain: 'cosmic', subdomain: 'atoms' },
            { path: 'domains/cosmic/atoms/oxygen.md', domain: 'cosmic', subdomain: 'atoms' },
            { path: 'domains/cosmic/atoms/nitrogen.md', domain: 'cosmic', subdomain: 'atoms' },
            { path: 'domains/cosmic/atoms/lithium.md', domain: 'cosmic', subdomain: 'atoms' },
            { path: 'domains/cosmic/atoms/deuterium.md', domain: 'cosmic', subdomain: 'atoms' },
            { path: 'domains/cosmic/atoms/tritium.md', domain: 'cosmic', subdomain: 'atoms' },
            
            { path: 'domains/cosmic/molecules/water.md', domain: 'cosmic', subdomain: 'molecules' },
            { path: 'domains/cosmic/molecules/co2.md', domain: 'cosmic', subdomain: 'molecules' },
            { path: 'domains/cosmic/molecules/methane.md', domain: 'cosmic', subdomain: 'molecules' },
            { path: 'domains/cosmic/molecules/ammonia.md', domain: 'cosmic', subdomain: 'molecules' },
            { path: 'domains/cosmic/molecules/hydrogen_gas.md', domain: 'cosmic', subdomain: 'molecules' },
            
            { path: 'domains/cosmic/particles/proton.md', domain: 'cosmic', subdomain: 'particles' },
            { path: 'domains/cosmic/particles/electron.md', domain: 'cosmic', subdomain: 'particles' },
            { path: 'domains/cosmic/particles/neutron.md', domain: 'cosmic', subdomain: 'particles' },
            { path: 'domains/cosmic/particles/photon.md', domain: 'cosmic', subdomain: 'particles' },
            { path: 'domains/cosmic/particles/neutrino.md', domain: 'cosmic', subdomain: 'particles' },
            { path: 'domains/cosmic/particles/quark.md', domain: 'cosmic', subdomain: 'particles' },
            { path: 'domains/cosmic/particles/muon.md', domain: 'cosmic', subdomain: 'particles' },
            
            { path: 'domains/cosmic/stars/main_sequence.md', domain: 'cosmic', subdomain: 'stars' },
            { path: 'domains/cosmic/galaxies/milky_way.md', domain: 'cosmic', subdomain: 'galaxies' },
            { path: 'domains/cosmic/ions/hydronium.md', domain: 'cosmic', subdomain: 'ions' },
            { path: 'domains/cosmic/ions/hydroxide.md', domain: 'cosmic', subdomain: 'ions' },
            { path: 'domains/cosmic/forces/strong_nuclear.md', domain: 'cosmic', subdomain: 'forces' },
            { path: 'domains/cosmic/forces/weak_nuclear.md', domain: 'cosmic', subdomain: 'forces' },
            { path: 'domains/cosmic/quantum_fields/electromagnetic_field.md', domain: 'cosmic', subdomain: 'quantum_fields' },
            
            // Geological domain
            { path: 'domains/geological/minerals/quartz.md', domain: 'geological', subdomain: 'minerals' },
            { path: 'domains/geological/minerals/clay.md', domain: 'geological', subdomain: 'minerals' },
            { path: 'domains/geological/minerals/diamond.md', domain: 'geological', subdomain: 'minerals' },
            { path: 'domains/geological/minerals/graphite.md', domain: 'geological', subdomain: 'minerals' },
            { path: 'domains/geological/minerals/iron_oxide.md', domain: 'geological', subdomain: 'minerals' },
            { path: 'domains/geological/minerals/salt.md', domain: 'geological', subdomain: 'minerals' },
            
            { path: 'domains/geological/rocks/basalt.md', domain: 'geological', subdomain: 'rocks' },
            { path: 'domains/geological/rocks/gabbro.md', domain: 'geological', subdomain: 'rocks' },
            { path: 'domains/geological/rocks/granite.md', domain: 'geological', subdomain: 'rocks' },
            { path: 'domains/geological/rocks/gneiss.md', domain: 'geological', subdomain: 'rocks' },
            { path: 'domains/geological/rocks/schist.md', domain: 'geological', subdomain: 'rocks' },
            { path: 'domains/geological/rocks/obsidian.md', domain: 'geological', subdomain: 'rocks' },
            
            { path: 'domains/geological/processes/erosion.md', domain: 'geological', subdomain: 'processes' },
            { path: 'domains/geological/processes/weathering.md', domain: 'geological', subdomain: 'processes' },
            { path: 'domains/geological/processes/volcanism.md', domain: 'geological', subdomain: 'processes' },
            { path: 'domains/geological/processes/plate_tectonics.md', domain: 'geological', subdomain: 'processes' },
            { path: 'domains/geological/processes/hydrothermal_alteration.md', domain: 'geological', subdomain: 'processes' },
            
            { path: 'domains/geological/planetary_systems/earth_system.md', domain: 'geological', subdomain: 'planetary_systems' },
            { path: 'domains/geological/compounds/silica_unit.md', domain: 'geological', subdomain: 'compounds' },
            
            // Biological domain
            { path: 'domains/biological/prokaryotic/bacteria.md', domain: 'biological', subdomain: 'prokaryotic' },
            { path: 'domains/biological/prokaryotic/ribosome.md', domain: 'biological', subdomain: 'prokaryotic' },
            { path: 'domains/biological/prokaryotic/trna.md', domain: 'biological', subdomain: 'prokaryotic' },
            { path: 'domains/biological/prokaryotic/virus.md', domain: 'biological', subdomain: 'prokaryotic' },
            { path: 'domains/biological/prokaryotic/dna_polymerase.md', domain: 'biological', subdomain: 'prokaryotic' },
            { path: 'domains/biological/prokaryotic/photosystem.md', domain: 'biological', subdomain: 'prokaryotic' },
            
            { path: 'domains/biological/eukaryotic/mitochondrion.md', domain: 'biological', subdomain: 'eukaryotic' },
            { path: 'domains/biological/eukaryotic/chloroplast.md', domain: 'biological', subdomain: 'eukaryotic' },
            
            { path: 'domains/biological/prebiotic/amino_acids.md', domain: 'biological', subdomain: 'prebiotic' },
            { path: 'domains/biological/prebiotic/nucleotides.md', domain: 'biological', subdomain: 'prebiotic' },
            { path: 'domains/biological/prebiotic/peptides.md', domain: 'biological', subdomain: 'prebiotic' },
            { path: 'domains/biological/prebiotic/sugars.md', domain: 'biological', subdomain: 'prebiotic' },
            { path: 'domains/biological/prebiotic/membranes.md', domain: 'biological', subdomain: 'prebiotic' },
            
            { path: 'domains/biological/multicellular/insect.md', domain: 'biological', subdomain: 'multicellular' },
            { path: 'domains/biological/ecosystems/coral_reef.md', domain: 'biological', subdomain: 'ecosystems' },
            { path: 'domains/biological/amino_acids/glycine.md', domain: 'biological', subdomain: 'amino_acids' },
            { path: 'domains/biological/modern/mrna_vaccine_platforms.md', domain: 'biological', subdomain: 'modern' },
            
            // Cognitive domain
            { path: 'domains/cognitive/memory/episodic_memory.md', domain: 'cognitive', subdomain: 'memory' },
            { path: 'domains/cognitive/memory/semantic_memory.md', domain: 'cognitive', subdomain: 'memory' },
            { path: 'domains/cognitive/memory/working_memory.md', domain: 'cognitive', subdomain: 'memory' },
            
            { path: 'domains/cognitive/learning/associative_learning.md', domain: 'cognitive', subdomain: 'learning' },
            { path: 'domains/cognitive/learning/habit_formation.md', domain: 'cognitive', subdomain: 'learning' },
            { path: 'domains/cognitive/learning/metacognition.md', domain: 'cognitive', subdomain: 'learning' },
            
            { path: 'domains/cognitive/language/human_language.md', domain: 'cognitive', subdomain: 'language' },
            { path: 'domains/cognitive/communication/language_acquisition.md', domain: 'cognitive', subdomain: 'communication' },
            { path: 'domains/cognitive/communication/nonverbal_communication.md', domain: 'cognitive', subdomain: 'communication' },
            
            { path: 'domains/cognitive/social_cognition/empathy.md', domain: 'cognitive', subdomain: 'social_cognition' },
            { path: 'domains/cognitive/social_cognition/theory_of_mind.md', domain: 'cognitive', subdomain: 'social_cognition' },
            { path: 'domains/cognitive/social_cognition/stereotype.md', domain: 'cognitive', subdomain: 'social_cognition' },
            
            { path: 'domains/cognitive/emotions/emotional_intelligence.md', domain: 'cognitive', subdomain: 'emotions' },
            { path: 'domains/cognitive/emotions/moral_emotions.md', domain: 'cognitive', subdomain: 'emotions' },
            
            { path: 'domains/cognitive/reasoning/analogical_reasoning.md', domain: 'cognitive', subdomain: 'reasoning' },
            { path: 'domains/cognitive/reasoning/critical_thinking.md', domain: 'cognitive', subdomain: 'reasoning' },
            { path: 'domains/cognitive/reasoning/executive_function.md', domain: 'cognitive', subdomain: 'reasoning' },
            
            { path: 'domains/cognitive/neural_networks/human_brain.md', domain: 'cognitive', subdomain: 'neural_networks' },
            { path: 'domains/cognitive/basic_cognition/attention.md', domain: 'cognitive', subdomain: 'basic_cognition' },
            { path: 'domains/cognitive/collective_intelligence/swarm_intelligence.md', domain: 'cognitive', subdomain: 'collective_intelligence' },
            { path: 'domains/cognitive/cooperation/reciprocity.md', domain: 'cognitive', subdomain: 'cooperation' },
            { path: 'domains/cognitive/culture/cultural_evolution.md', domain: 'cognitive', subdomain: 'culture' },
            { path: 'domains/cognitive/decision_making/rational_choice.md', domain: 'cognitive', subdomain: 'decision_making' },
            { path: 'domains/cognitive/economic_systems/market.md', domain: 'cognitive', subdomain: 'economic_systems' },
            { path: 'domains/cognitive/governance/authority.md', domain: 'cognitive', subdomain: 'governance' },
            { path: 'domains/cognitive/governance/democracy.md', domain: 'cognitive', subdomain: 'governance' },
            { path: 'domains/cognitive/group_dynamics/social_influence.md', domain: 'cognitive', subdomain: 'group_dynamics' },
            { path: 'domains/cognitive/institutions/bureaucracy.md', domain: 'cognitive', subdomain: 'institutions' },
            { path: 'domains/cognitive/social_structures/kinship.md', domain: 'cognitive', subdomain: 'social_structures' },
            { path: 'domains/cognitive/social_structures/tribe.md', domain: 'cognitive', subdomain: 'social_structures' },
            { path: 'domains/cognitive/trust/interpersonal_trust.md', domain: 'cognitive', subdomain: 'trust' },
            { path: 'domains/cognitive/consciousness/emergence.md', domain: 'cognitive', subdomain: 'consciousness' },
            
            // Technological domain
            { path: 'domains/technological/computers/microprocessor.md', domain: 'technological', subdomain: 'computers' },
            { path: 'domains/technological/machines/steam_engine.md', domain: 'technological', subdomain: 'machines' },
            { path: 'domains/technological/networks/internet.md', domain: 'technological', subdomain: 'networks' },
            { path: 'domains/technological/networks/ai.md', domain: 'technological', subdomain: 'networks' },
            { path: 'domains/technological/tools/stone_tools.md', domain: 'technological', subdomain: 'tools' },
            
            { path: 'domains/technological/modern/ai_native_applications.md', domain: 'technological', subdomain: 'modern' },
            { path: 'domains/technological/modern/amazon_fulfillment.md', domain: 'technological', subdomain: 'modern' },
            { path: 'domains/technological/modern/defi_yield_farming.md', domain: 'technological', subdomain: 'modern' },
            { path: 'domains/technological/modern/edge_computing.md', domain: 'technological', subdomain: 'modern' },
            { path: 'domains/technological/modern/layer2_rollups.md', domain: 'technological', subdomain: 'modern' },
            { path: 'domains/technological/modern/llm_token_systems.md', domain: 'technological', subdomain: 'modern' },
            { path: 'domains/technological/modern/react_server_components.md', domain: 'technological', subdomain: 'modern' },
            { path: 'domains/technological/modern/tesla_gigafactory.md', domain: 'technological', subdomain: 'modern' },
            { path: 'domains/technological/modern/tsmc_semiconductor.md', domain: 'technological', subdomain: 'modern' }
        ];
    }
    
    parseMarkdownFile(content, fileInfo) {
        try {
            const lines = content.split('\n');
            
            // Extract basic information from the markdown
            const node = {
                id: this.generateIdFromPath(fileInfo.path),
                name: this.extractName(lines),
                assembly_index: this.extractAssemblyIndex(lines),
                domain: fileInfo.domain,
                subdomain: fileInfo.subdomain,
                description: this.extractDescription(lines),
                first_appearance: this.extractFirstAppearance(lines),
                components: this.extractComponents(lines),
                github_url: `https://github.com/owocki/assembly_theory/tree/master/${fileInfo.path}`,
                tier: 1,
                visual_complexity: '•',
                color: this.domainColors[fileInfo.domain] || '#666666',
                radius: 5,
                time_origin: '',
                copy_number: 1000000
            };
            
            // Calculate derived properties
            node.tier = this.getAssemblyTier(node.assembly_index);
            node.visual_complexity = this.getTierSymbol(node.tier);
            node.radius = this.getNodeRadius(node.tier);
            node.time_origin = this.extractFirstAppearance(lines) || this.estimateTimeOrigin(node.domain);
            node.copy_number = this.estimateCopyNumber(node.assembly_index, node.domain);
            
            return node;
        } catch (error) {
            console.error(`Error parsing ${fileInfo.path}:`, error);
            return null;
        }
    }
    
    generateIdFromPath(path) {
        return path
            .replace('domains/', '')
            .replace('.md', '')
            .replace(/\//g, '_');
    }
    
    extractName(lines) {
        // Look for the first heading
        for (const line of lines) {
            if (line.startsWith('# ')) {
                return line.substring(2).replace(' Assembly', '').trim();
            }
        }
        return 'Unknown';
    }
    
    extractAssemblyIndex(lines) {
        // Look for Assembly Index in the content
        for (const line of lines) {
            if (line.includes('Assembly Index') && line.includes(':')) {
                const match = line.match(/Assembly Index[:\s]*[~]?(\d+(?:,\d+)*)/i);
                if (match) {
                    return parseInt(match[1].replace(/,/g, ''));
                }
            }
        }
        
        // Look for AI: patterns
        for (const line of lines) {
            const match = line.match(/AI[:\s]+(\d+)/i);
            if (match) {
                return parseInt(match[1]);
            }
        }
        
        return 10; // Default fallback
    }
    
    extractDescription(lines) {
        // Look for description in basic information or first paragraph
        let inBasicInfo = false;
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            
            if (line.includes('## Basic Information')) {
                inBasicInfo = true;
                continue;
            }
            
            if (inBasicInfo && line.startsWith('##')) {
                break;
            }
            
            if (inBasicInfo && line.includes('**Function**:')) {
                return line.replace(/.*\*\*Function\*\*:\s*/, '').trim();
            }
        }
        
        // Fallback: look for first substantial paragraph
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line.length > 50 && !line.startsWith('#') && !line.startsWith('-') && !line.startsWith('*')) {
                return line;
            }
        }
        
        return 'No description available';
    }
    
    extractFirstAppearance(lines) {
        for (const line of lines) {
            if (line.includes('First Appearance')) {
                return line.replace(/.*First Appearance[:\s]*/, '').replace(/\*\*/g, '').trim();
            }
        }
        return '';
    }
    
    extractComponents(lines) {
        const components = [];
        let inComponents = false;
        
        for (const line of lines) {
            if (line.includes('## Assembly Components')) {
                inComponents = true;
                continue;
            }
            
            if (inComponents && line.startsWith('##')) {
                break;
            }
            
            if (inComponents && line.includes('×')) {
                const match = line.match(/(\d+)\s*×\s*([^[]+)/);
                if (match) {
                    components.push({
                        count: parseInt(match[1]),
                        name: match[2].trim()
                    });
                }
            }
        }
        
        return components;
    }
    
    getAssemblyTier(assemblyIndex) {
        const tiers = [
            { min: 1, max: 10, tier: 1 },
            { min: 10, max: 100, tier: 2 },
            { min: 100, max: 1000, tier: 3 },
            { min: 1000, max: 10000, tier: 4 },
            { min: 10000, max: 100000, tier: 5 },
            { min: 100000, max: 1000000, tier: 6 },
            { min: 1000000, max: 1000000000, tier: 7 },
            { min: 1000000000, max: Infinity, tier: 8 }
        ];
        
        return tiers.find(tier => 
            assemblyIndex >= tier.min && assemblyIndex < tier.max
        )?.tier || 1;
    }
    
    getTierSymbol(tier) {
        return '•'.repeat(tier);
    }
    
    getNodeRadius(tier) {
        return 3 + (tier * 2);
    }
    
    estimateTimeOrigin(domain) {
        const timeEstimates = {
            cosmic: '13.8 Gyr ago',
            geological: '4.5 Gyr ago',
            biological: '3.8 Gyr ago',
            cognitive: '100 kyr ago',
            technological: '10 kyr ago',
            hybrid: '1 kyr ago'
        };
        return timeEstimates[domain] || 'Unknown';
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
        return Math.floor(base / Math.sqrt(assemblyIndex));
    }
    
    extractLinksFromNodes() {
        // Process cross-references to create links between nodes
        for (const node of this.nodes) {
            // This would require parsing the actual markdown content for links
            // For now, create some basic connections based on domain relationships
            this.createDomainBasedLinks(node);
        }
    }
    
    createDomainBasedLinks(node) {
        // Create basic hierarchical links based on assembly index
        const relatedNodes = this.nodes.filter(n => 
            n.id !== node.id && 
            n.domain === node.domain &&
            Math.abs(n.assembly_index - node.assembly_index) < node.assembly_index * 0.5
        );
        
        for (const related of relatedNodes.slice(0, 3)) { // Limit to 3 connections
            this.links.push({
                source: node.id,
                target: related.id,
                type: 'assembly_pathway',
                strength: 1.0
            });
        }
    }
}