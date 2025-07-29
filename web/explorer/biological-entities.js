class BiologicalEntities {
    constructor() {
        this.domainColors = {
            biological: '#228B22'
        };
    }
    
    generateBiologicalEntities() {
        const entities = [
            // Prebiotic molecules (AI: 10-500)
            { name: 'Formaldehyde', assembly_index: 12, subdomain: 'prebiotic', description: 'Simple organic precursor molecule' },
            { name: 'Hydrogen Cyanide', assembly_index: 15, subdomain: 'prebiotic', description: 'Prebiotic synthesis precursor' },
            { name: 'Formamide', assembly_index: 18, subdomain: 'prebiotic', description: 'Nucleotide precursor' },
            { name: 'Glycolaldehyde', assembly_index: 25, subdomain: 'prebiotic', description: 'Sugar precursor molecule' },
            { name: 'Ribose', assembly_index: 40, subdomain: 'prebiotic', description: 'RNA backbone sugar' },
            { name: 'Adenine', assembly_index: 55, subdomain: 'prebiotic', description: 'Nucleotide base' },
            { name: 'Guanine', assembly_index: 58, subdomain: 'prebiotic', description: 'Nucleotide base' },
            { name: 'Cytosine', assembly_index: 52, subdomain: 'prebiotic', description: 'Nucleotide base' },
            { name: 'Uracil', assembly_index: 50, subdomain: 'prebiotic', description: 'RNA nucleotide base' },
            { name: 'Thymine', assembly_index: 54, subdomain: 'prebiotic', description: 'DNA nucleotide base' },
            
            // Amino acids (AI: 50-200)
            { name: 'Alanine', assembly_index: 89, subdomain: 'amino_acids', description: 'Simple amino acid' },
            { name: 'Valine', assembly_index: 117, subdomain: 'amino_acids', description: 'Branched amino acid' },
            { name: 'Leucine', assembly_index: 131, subdomain: 'amino_acids', description: 'Essential amino acid' },
            { name: 'Isoleucine', assembly_index: 131, subdomain: 'amino_acids', description: 'Branched chain amino acid' },
            { name: 'Proline', assembly_index: 115, subdomain: 'amino_acids', description: 'Cyclic amino acid' },
            { name: 'Phenylalanine', assembly_index: 165, subdomain: 'amino_acids', description: 'Aromatic amino acid' },
            { name: 'Tryptophan', assembly_index: 204, subdomain: 'amino_acids', description: 'Largest amino acid' },
            { name: 'Methionine', assembly_index: 149, subdomain: 'amino_acids', description: 'Sulfur-containing amino acid' },
            { name: 'Serine', assembly_index: 105, subdomain: 'amino_acids', description: 'Polar amino acid' },
            { name: 'Threonine', assembly_index: 119, subdomain: 'amino_acids', description: 'Essential amino acid' },
            { name: 'Cysteine', assembly_index: 121, subdomain: 'amino_acids', description: 'Forms disulfide bonds' },
            { name: 'Tyrosine', assembly_index: 181, subdomain: 'amino_acids', description: 'Aromatic amino acid' },
            { name: 'Asparagine', assembly_index: 132, subdomain: 'amino_acids', description: 'Polar amino acid' },
            { name: 'Glutamine', assembly_index: 146, subdomain: 'amino_acids', description: 'Conditionally essential' },
            { name: 'Aspartic Acid', assembly_index: 133, subdomain: 'amino_acids', description: 'Acidic amino acid' },
            { name: 'Glutamic Acid', assembly_index: 147, subdomain: 'amino_acids', description: 'Neurotransmitter precursor' },
            { name: 'Lysine', assembly_index: 146, subdomain: 'amino_acids', description: 'Basic amino acid' },
            { name: 'Arginine', assembly_index: 174, subdomain: 'amino_acids', description: 'Positively charged' },
            { name: 'Histidine', assembly_index: 155, subdomain: 'amino_acids', description: 'pH buffer amino acid' },
            
            // Nucleotides and related (AI: 200-500)
            { name: 'ATP', assembly_index: 250, subdomain: 'nucleotides', description: 'Universal energy currency' },
            { name: 'GTP', assembly_index: 255, subdomain: 'nucleotides', description: 'Energy and signaling molecule' },
            { name: 'CTP', assembly_index: 245, subdomain: 'nucleotides', description: 'Nucleotide for RNA synthesis' },
            { name: 'UTP', assembly_index: 240, subdomain: 'nucleotides', description: 'RNA building block' },
            { name: 'NAD+', assembly_index: 320, subdomain: 'cofactors', description: 'Electron carrier coenzyme' },
            { name: 'FAD', assembly_index: 380, subdomain: 'cofactors', description: 'Flavin adenine dinucleotide' },
            { name: 'Coenzyme A', assembly_index: 420, subdomain: 'cofactors', description: 'Acyl group carrier' },
            
            // Lipids and membranes (AI: 300-1000)
            { name: 'Phosphatidylcholine', assembly_index: 450, subdomain: 'lipids', description: 'Major membrane phospholipid' },
            { name: 'Phosphatidylserine', assembly_index: 480, subdomain: 'lipids', description: 'Signaling phospholipid' },
            { name: 'Cholesterol', assembly_index: 386, subdomain: 'lipids', description: 'Membrane fluidity regulator' },
            { name: 'Sphingomyelin', assembly_index: 520, subdomain: 'lipids', description: 'Myelin component' },
            { name: 'Cardiolipin', assembly_index: 890, subdomain: 'lipids', description: 'Mitochondrial membrane lipid' },
            
            // Small proteins and peptides (AI: 500-5000)
            { name: 'Insulin', assembly_index: 780, subdomain: 'proteins', description: 'Blood sugar regulating hormone' },
            { name: 'Glucagon', assembly_index: 820, subdomain: 'proteins', description: 'Glucose regulation hormone' },
            { name: 'Oxytocin', assembly_index: 560, subdomain: 'proteins', description: 'Social bonding hormone' },
            { name: 'Vasopressin', assembly_index: 580, subdomain: 'proteins', description: 'Water retention hormone' },
            { name: 'Ubiquitin', assembly_index: 920, subdomain: 'proteins', description: 'Protein degradation tag' },
            { name: 'Cytochrome c', assembly_index: 1200, subdomain: 'proteins', description: 'Electron transport protein' },
            { name: 'Histone H1', assembly_index: 1800, subdomain: 'proteins', description: 'Chromatin organizing protein' },
            { name: 'Myoglobin', assembly_index: 2400, subdomain: 'proteins', description: 'Oxygen storage protein' },
            { name: 'Lysozyme', assembly_index: 2200, subdomain: 'proteins', description: 'Antibacterial enzyme' },
            { name: 'Ribonuclease', assembly_index: 2800, subdomain: 'proteins', description: 'RNA degrading enzyme' },
            
            // Enzymes and larger proteins (AI: 5000-50000)
            { name: 'Hexokinase', assembly_index: 6800, subdomain: 'enzymes', description: 'Glucose phosphorylation enzyme' },
            { name: 'Pyruvate Kinase', assembly_index: 8200, subdomain: 'enzymes', description: 'Glycolysis enzyme' },
            { name: 'Lactate Dehydrogenase', assembly_index: 9500, subdomain: 'enzymes', description: 'Anaerobic metabolism enzyme' },
            { name: 'Alcohol Dehydrogenase', assembly_index: 7800, subdomain: 'enzymes', description: 'Ethanol metabolism enzyme' },
            { name: 'Catalase', assembly_index: 12000, subdomain: 'enzymes', description: 'Hydrogen peroxide decomposer' },
            { name: 'Superoxide Dismutase', assembly_index: 8500, subdomain: 'enzymes', description: 'Antioxidant enzyme' },
            { name: 'Pepsin', assembly_index: 11000, subdomain: 'enzymes', description: 'Protein digestion enzyme' },
            { name: 'Trypsin', assembly_index: 9800, subdomain: 'enzymes', description: 'Protease enzyme' },
            { name: 'Amylase', assembly_index: 13500, subdomain: 'enzymes', description: 'Starch digestion enzyme' },
            { name: 'RNA Polymerase II', assembly_index: 45000, subdomain: 'enzymes', description: 'mRNA synthesis enzyme' },
            
            // Protein complexes (AI: 50000-500000)
            { name: 'Proteasome', assembly_index: 85000, subdomain: 'complexes', description: 'Protein degradation complex' },
            { name: 'Spliceosome', assembly_index: 120000, subdomain: 'complexes', description: 'RNA splicing machinery' },
            { name: 'ATP Synthase', assembly_index: 68000, subdomain: 'complexes', description: 'ATP production complex' },
            { name: 'NADH Dehydrogenase', assembly_index: 95000, subdomain: 'complexes', description: 'Electron transport complex I' },
            { name: 'Cytochrome bc1', assembly_index: 78000, subdomain: 'complexes', description: 'Electron transport complex III' },
            { name: 'Photosystem I', assembly_index: 110000, subdomain: 'complexes', description: 'Light harvesting complex' },
            { name: 'Photosystem II', assembly_index: 125000, subdomain: 'complexes', description: 'Water splitting complex' },
            { name: 'Nuclear Pore Complex', assembly_index: 450000, subdomain: 'complexes', description: 'Nuclear transport machinery' },
            
            // Cellular structures (AI: 100000-10000000)
            { name: 'Nucleosome', assembly_index: 180000, subdomain: 'structures', description: 'DNA packaging unit' },
            { name: 'Centriole', assembly_index: 320000, subdomain: 'structures', description: 'Cell division organizer' },
            { name: 'Flagellum', assembly_index: 580000, subdomain: 'structures', description: 'Bacterial motility structure' },
            { name: 'Cilium', assembly_index: 420000, subdomain: 'structures', description: 'Cellular projection' },
            { name: 'Actin Filament', assembly_index: 250000, subdomain: 'structures', description: 'Cytoskeleton component' },
            { name: 'Microtubule', assembly_index: 380000, subdomain: 'structures', description: 'Structural scaffold' },
            { name: 'Intermediate Filament', assembly_index: 290000, subdomain: 'structures', description: 'Cell support structure' },
            { name: 'Golgi Apparatus', assembly_index: 2800000, subdomain: 'organelles', description: 'Protein processing organelle' },
            { name: 'Endoplasmic Reticulum', assembly_index: 3200000, subdomain: 'organelles', description: 'Protein synthesis organelle' },
            { name: 'Lysosome', assembly_index: 1500000, subdomain: 'organelles', description: 'Digestive organelle' },
            { name: 'Peroxisome', assembly_index: 1200000, subdomain: 'organelles', description: 'Metabolic organelle' },
            { name: 'Vacuole', assembly_index: 890000, subdomain: 'organelles', description: 'Storage organelle' },
            
            // Cell types (AI: 10000000-100000000)
            { name: 'Red Blood Cell', assembly_index: 12000000, subdomain: 'cells', description: 'Oxygen transport cell' },
            { name: 'White Blood Cell', assembly_index: 28000000, subdomain: 'cells', description: 'Immune system cell' },
            { name: 'Platelet', assembly_index: 8500000, subdomain: 'cells', description: 'Blood clotting cell' },
            { name: 'Neuron', assembly_index: 85000000, subdomain: 'cells', description: 'Nerve cell' },
            { name: 'Muscle Cell', assembly_index: 45000000, subdomain: 'cells', description: 'Contractile cell' },
            { name: 'Epithelial Cell', assembly_index: 32000000, subdomain: 'cells', description: 'Barrier cell' },
            { name: 'Stem Cell', assembly_index: 68000000, subdomain: 'cells', description: 'Pluripotent cell' },
            { name: 'Oocyte', assembly_index: 95000000, subdomain: 'cells', description: 'Female gamete' },
            { name: 'Sperm Cell', assembly_index: 42000000, subdomain: 'cells', description: 'Male gamete' },
            { name: 'Hepatocyte', assembly_index: 78000000, subdomain: 'cells', description: 'Liver cell' },
            { name: 'Adipocyte', assembly_index: 38000000, subdomain: 'cells', description: 'Fat storage cell' },
            { name: 'Osteoblast', assembly_index: 52000000, subdomain: 'cells', description: 'Bone forming cell' },
            { name: 'Chondrocyte', assembly_index: 48000000, subdomain: 'cells', description: 'Cartilage cell' },
            { name: 'Fibroblast', assembly_index: 35000000, subdomain: 'cells', description: 'Connective tissue cell' },
            
            // Tissues (AI: 100000000-1000000000)
            { name: 'Neural Tissue', assembly_index: 280000000, subdomain: 'tissues', description: 'Nervous system tissue' },
            { name: 'Muscle Tissue', assembly_index: 185000000, subdomain: 'tissues', description: 'Contractile tissue' },
            { name: 'Connective Tissue', assembly_index: 145000000, subdomain: 'tissues', description: 'Support tissue' },
            { name: 'Epithelial Tissue', assembly_index: 120000000, subdomain: 'tissues', description: 'Covering tissue' },
            { name: 'Blood', assembly_index: 380000000, subdomain: 'tissues', description: 'Liquid connective tissue' },
            { name: 'Bone Tissue', assembly_index: 420000000, subdomain: 'tissues', description: 'Mineralized tissue' },
            { name: 'Adipose Tissue', assembly_index: 250000000, subdomain: 'tissues', description: 'Fat storage tissue' },
            { name: 'Lymphoid Tissue', assembly_index: 520000000, subdomain: 'tissues', description: 'Immune tissue' }
        ];
        
        // Process all entities
        return entities.map(entity => this.processEntity(entity));
    }
    
    processEntity(entity) {
        const tier = this.getAssemblyTier(entity.assembly_index);
        
        return {
            id: entity.name.toLowerCase().replace(/\s+/g, '_').replace(/[^\w]/g, ''),
            name: entity.name,
            assembly_index: entity.assembly_index,
            domain: 'biological',
            subdomain: entity.subdomain,
            description: entity.description,
            tier: tier.tier,
            visual_complexity: tier.symbol,
            color: this.domainColors.biological,
            radius: this.getNodeRadius(tier.tier),
            time_origin: this.estimateTimeOrigin(entity.assembly_index),
            copy_number: this.estimateCopyNumber(entity.assembly_index),
            github_url: this.generateGitHubUrl(entity)
        };
    }
    
    getAssemblyTier(assemblyIndex) {
        const tiers = [
            { min: 1, max: 10, tier: 1, symbol: '•' },
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
    
    getTierSymbol(tier) {
        return '•'.repeat(tier);
    }
    
    getNodeRadius(tier) {
        return 3 + (tier * 2);
    }
    
    estimateTimeOrigin(assemblyIndex) {
        // Rough estimates based on assembly complexity
        if (assemblyIndex < 100) return '4.0 Gyr ago'; // Prebiotic
        if (assemblyIndex < 1000) return '3.8 Gyr ago'; // Early life
        if (assemblyIndex < 10000) return '3.5 Gyr ago'; // Prokaryotic
        if (assemblyIndex < 100000) return '2.0 Gyr ago'; // Eukaryotic
        if (assemblyIndex < 1000000) return '1.5 Gyr ago'; // Complex eukaryotes
        if (assemblyIndex < 10000000) return '600 Myr ago'; // Multicellular
        if (assemblyIndex < 100000000) return '500 Myr ago'; // Complex multicellular
        return '400 Myr ago'; // Advanced organisms
    }
    
    estimateCopyNumber(assemblyIndex) {
        const base = 1e10; // Biological base abundance
        return Math.floor(base / Math.sqrt(assemblyIndex));
    }
    
    generateGitHubUrl(entity) {
        const baseUrl = 'https://github.com/owocki/assembly_theory/tree/master/domains/biological';
        const filename = entity.name.toLowerCase().replace(/\s+/g, '_').replace(/[^\w]/g, '');
        return `${baseUrl}/${entity.subdomain}/${filename}.md`;
    }
    
    // Generate links between related entities
    generateBiologicalLinks(nodes) {
        const links = [];
        const nodeMap = new Map(nodes.map(n => [n.id, n]));
        
        // Add some example relationships
        const relationships = [
            { source: 'glycine', target: 'peptides', type: 'assembly_pathway' },
            { source: 'alanine', target: 'peptides', type: 'assembly_pathway' },
            { source: 'adenine', target: 'atp', type: 'component_of' },
            { source: 'ribose', target: 'atp', type: 'component_of' },
            { source: 'atp', target: 'atp_synthase', type: 'substrate_of' },
            { source: 'amino_acids', target: 'ribosome', type: 'processed_by' },
            { source: 'ribosome', target: 'insulin', type: 'synthesizes' },
            { source: 'insulin', target: 'muscle_cell', type: 'acts_on' },
            { source: 'neuron', target: 'neural_tissue', type: 'component_of' },
            { source: 'red_blood_cell', target: 'blood', type: 'component_of' }
        ];
        
        for (const rel of relationships) {
            if (nodeMap.has(rel.source) && nodeMap.has(rel.target)) {
                links.push({
                    source: rel.source,
                    target: rel.target,
                    type: rel.type,
                    strength: 1.0
                });
            }
        }
        
        return links;
    }
}