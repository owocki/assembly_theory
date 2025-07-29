class ToolTimelineData {
    constructor() {
        this.toolProgression = [
            // Stone Age Tools (3.3M - 10K years ago)
            { name: 'Oldowan Tools', ai: 100, era: 'Lower Paleolithic', time: '3.3M years ago', precision: 'centimeter', components: 1 },
            { name: 'Acheulean Handaxe', ai: 500, era: 'Lower Paleolithic', time: '1.8M years ago', precision: 'centimeter', components: 1 },
            { name: 'Levallois Technique', ai: 2000, era: 'Middle Paleolithic', time: '300K years ago', precision: 'millimeter', components: 1 },
            { name: 'Composite Spear', ai: 5000, era: 'Middle Paleolithic', time: '400K years ago', precision: 'millimeter', components: 3 },
            { name: 'Atlatl', ai: 8000, era: 'Upper Paleolithic', time: '30K years ago', precision: 'millimeter', components: 2 },
            { name: 'Bow and Arrow', ai: 15000, era: 'Upper Paleolithic', time: '65K years ago', precision: 'millimeter', components: 4 },
            { name: 'Fishhook', ai: 3000, era: 'Upper Paleolithic', time: '42K years ago', precision: 'millimeter', components: 1 },
            { name: 'Needle', ai: 4000, era: 'Upper Paleolithic', time: '50K years ago', precision: 'sub-millimeter', components: 1 },
            
            // Neolithic Revolution (10K - 5K years ago)
            { name: 'Agriculture', ai: 100000, era: 'Neolithic', time: '12K years ago', precision: 'meter', components: 10 },
            { name: 'Pottery', ai: 25000, era: 'Neolithic', time: '20K years ago', precision: 'centimeter', components: 1 },
            { name: 'Woven Textiles', ai: 50000, era: 'Neolithic', time: '27K years ago', precision: 'millimeter', components: 100 },
            { name: 'Polished Stone Axe', ai: 12000, era: 'Neolithic', time: '10K years ago', precision: 'millimeter', components: 2 },
            { name: 'Grinding Stones', ai: 20000, era: 'Neolithic', time: '15K years ago', precision: 'centimeter', components: 2 },
            
            // Bronze Age (5K - 3K years ago)
            { name: 'Copper Smelting', ai: 200000, era: 'Bronze Age', time: '7K years ago', precision: 'centimeter', components: 20 },
            { name: 'Bronze Alloy', ai: 300000, era: 'Bronze Age', time: '5K years ago', precision: 'millimeter', components: 2 },
            { name: 'Potter\'s Wheel', ai: 80000, era: 'Bronze Age', time: '5.5K years ago', precision: 'millimeter', components: 5 },
            { name: 'Sailing Ship', ai: 500000, era: 'Bronze Age', time: '5K years ago', precision: 'centimeter', components: 50 },
            { name: 'Writing System', ai: 1000000, era: 'Bronze Age', time: '5.3K years ago', precision: 'millimeter', components: 100 },
            
            // Iron Age (3K - 2K years ago)
            { name: 'Iron Smelting', ai: 800000, era: 'Iron Age', time: '3.2K years ago', precision: 'millimeter', components: 30 },
            { name: 'Steel Production', ai: 1500000, era: 'Iron Age', time: '2.8K years ago', precision: 'millimeter', components: 40 },
            { name: 'Coinage', ai: 150000, era: 'Iron Age', time: '2.7K years ago', precision: 'sub-millimeter', components: 1 },
            { name: 'Concrete', ai: 400000, era: 'Iron Age', time: '2.1K years ago', precision: 'centimeter', components: 5 },
            { name: 'Water Mill', ai: 2000000, era: 'Iron Age', time: '2K years ago', precision: 'centimeter', components: 100 },
            
            // Medieval Period (500 - 1500 CE)
            { name: 'Windmill', ai: 3000000, era: 'Medieval', time: '1K years ago', precision: 'centimeter', components: 200 },
            { name: 'Printing Press', ai: 5000000, era: 'Medieval', time: '580 years ago', precision: 'sub-millimeter', components: 500 },
            { name: 'Eyeglasses', ai: 800000, era: 'Medieval', time: '730 years ago', precision: 'sub-millimeter', components: 10 },
            { name: 'Mechanical Clock', ai: 10000000, era: 'Medieval', time: '700 years ago', precision: 'sub-millimeter', components: 1000 },
            { name: 'Gunpowder Weapons', ai: 2500000, era: 'Medieval', time: '1K years ago', precision: 'millimeter', components: 50 },
            
            // Renaissance & Early Modern (1500 - 1750 CE)
            { name: 'Telescope', ai: 15000000, era: 'Renaissance', time: '415 years ago', precision: 'micrometer', components: 20 },
            { name: 'Microscope', ai: 12000000, era: 'Renaissance', time: '430 years ago', precision: 'micrometer', components: 15 },
            { name: 'Pendulum Clock', ai: 25000000, era: 'Renaissance', time: '365 years ago', precision: 'micrometer', components: 200 },
            { name: 'Steam Engine', ai: 50000000, era: 'Early Modern', time: '315 years ago', precision: 'millimeter', components: 500 },
            { name: 'Precision Lathe', ai: 40000000, era: 'Early Modern', time: '250 years ago', precision: 'micrometer', components: 300 },
            
            // Industrial Revolution (1750 - 1850 CE)
            { name: 'Spinning Jenny', ai: 80000000, era: 'Industrial', time: '255 years ago', precision: 'millimeter', components: 100 },
            { name: 'Power Loom', ai: 120000000, era: 'Industrial', time: '235 years ago', precision: 'millimeter', components: 200 },
            { name: 'Steam Locomotive', ai: 200000000, era: 'Industrial', time: '220 years ago', precision: 'millimeter', components: 1000 },
            { name: 'Photography', ai: 100000000, era: 'Industrial', time: '195 years ago', precision: 'micrometer', components: 50 },
            { name: 'Telegraph', ai: 150000000, era: 'Industrial', time: '180 years ago', precision: 'micrometer', components: 100 },
            
            // Second Industrial Revolution (1850 - 1914)
            { name: 'Internal Combustion Engine', ai: 500000000, era: '2nd Industrial', time: '155 years ago', precision: 'micrometer', components: 2000 },
            { name: 'Electric Generator', ai: 300000000, era: '2nd Industrial', time: '140 years ago', precision: 'micrometer', components: 500 },
            { name: 'Light Bulb', ai: 80000000, era: '2nd Industrial', time: '145 years ago', precision: 'micrometer', components: 10 },
            { name: 'Telephone', ai: 250000000, era: '2nd Industrial', time: '148 years ago', precision: 'micrometer', components: 100 },
            { name: 'Automobile', ai: 1000000000, era: '2nd Industrial', time: '140 years ago', precision: 'micrometer', components: 10000 },
            { name: 'Radio', ai: 400000000, era: '2nd Industrial', time: '125 years ago', precision: 'micrometer', components: 200 },
            { name: 'X-ray Machine', ai: 800000000, era: '2nd Industrial', time: '130 years ago', precision: 'micrometer', components: 100 },
            
            // Early 20th Century (1900 - 1945)
            { name: 'Airplane', ai: 2000000000, era: 'Early 20th', time: '120 years ago', precision: 'micrometer', components: 50000 },
            { name: 'Television', ai: 5000000000, era: 'Early 20th', time: '95 years ago', precision: 'micrometer', components: 1000 },
            { name: 'Radar', ai: 3000000000, era: 'Early 20th', time: '85 years ago', precision: 'micrometer', components: 500 },
            { name: 'Electron Microscope', ai: 10000000000, era: 'Early 20th', time: '90 years ago', precision: 'nanometer', components: 2000 },
            { name: 'Nuclear Reactor', ai: 50000000000, era: 'Early 20th', time: '80 years ago', precision: 'micrometer', components: 100000 },
            
            // Computer Age (1945 - 1990)
            { name: 'Electronic Computer', ai: 100000000000, era: 'Computer Age', time: '80 years ago', precision: 'micrometer', components: 100000 },
            { name: 'Transistor', ai: 20000000000, era: 'Computer Age', time: '75 years ago', precision: 'micrometer', components: 1 },
            { name: 'Integrated Circuit', ai: 500000000000, era: 'Computer Age', time: '65 years ago', precision: 'micrometer', components: 1000 },
            { name: 'Microprocessor', ai: 5000000000000, era: 'Computer Age', time: '50 years ago', precision: 'micrometer', components: 100000 },
            { name: 'Personal Computer', ai: 50000000000000, era: 'Computer Age', time: '45 years ago', precision: 'micrometer', components: 1000000 },
            { name: 'Laser', ai: 15000000000, era: 'Computer Age', time: '60 years ago', precision: 'nanometer', components: 100 },
            { name: 'Fiber Optics', ai: 25000000000, era: 'Computer Age', time: '55 years ago', precision: 'nanometer', components: 1000 },
            
            // Information Age (1990 - 2010)
            { name: 'World Wide Web', ai: 1000000000000000, era: 'Information Age', time: '35 years ago', precision: 'nanometer', components: 10000000 },
            { name: 'GPS System', ai: 500000000000000, era: 'Information Age', time: '40 years ago', precision: 'nanometer', components: 1000000 },
            { name: 'MRI Machine', ai: 200000000000000, era: 'Information Age', time: '45 years ago', precision: 'nanometer', components: 500000 },
            { name: 'CT Scanner', ai: 100000000000000, era: 'Information Age', time: '50 years ago', precision: 'micrometer', components: 100000 },
            { name: 'DNA Sequencer', ai: 1000000000000000, era: 'Information Age', time: '35 years ago', precision: 'nanometer', components: 1000000 },
            { name: 'Internet Router', ai: 50000000000000, era: 'Information Age', time: '30 years ago', precision: 'nanometer', components: 100000 },
            
            // Digital Age (2000 - 2020)
            { name: 'Smartphone', ai: 10000000000000000, era: 'Digital Age', time: '15 years ago', precision: 'nanometer', components: 10000000 },
            { name: 'Search Engine', ai: 5000000000000000, era: 'Digital Age', time: '25 years ago', precision: 'nanometer', components: 1000000 },
            { name: 'Social Network', ai: 50000000000000000, era: 'Digital Age', time: '20 years ago', precision: 'nanometer', components: 100000000 },
            { name: '3D Printer', ai: 100000000000000, era: 'Digital Age', time: '15 years ago', precision: 'micrometer', components: 50000 },
            { name: 'CRISPR Gene Editor', ai: 500000000000000, era: 'Digital Age', time: '10 years ago', precision: 'atomic', components: 1000 },
            { name: 'Quantum Computer', ai: 1000000000000000000, era: 'Digital Age', time: '5 years ago', precision: 'atomic', components: 1000000 },
            
            // AI Age (2020 - Present)
            { name: 'Large Language Model', ai: 10000000000000000000, era: 'AI Age', time: '3 years ago', precision: 'atomic', components: 1000000000 },
            { name: 'Neural Network Chip', ai: 5000000000000000000, era: 'AI Age', time: '2 years ago', precision: 'atomic', components: 100000000 },
            { name: 'Autonomous Vehicle', ai: 50000000000000000000, era: 'AI Age', time: '1 year ago', precision: 'atomic', components: 1000000000 },
            { name: 'Brain-Computer Interface', ai: 100000000000000000000, era: 'AI Age', time: 'Present', precision: 'atomic', components: 10000000 },
            
            // Future Projections
            { name: 'Artificial General Intelligence', ai: 1000000000000000000000, era: 'Future', time: 'Projected 2030s', precision: 'sub-atomic', components: 10000000000 },
            { name: 'Molecular Assembler', ai: 10000000000000000000000, era: 'Future', time: 'Projected 2040s', precision: 'atomic', components: 1000000000000 },
            { name: 'Fusion Power Plant', ai: 100000000000000000000000, era: 'Future', time: 'Projected 2050s', precision: 'atomic', components: 100000000000 },
            { name: 'Space Habitat', ai: 1000000000000000000000000, era: 'Future', time: 'Projected 2070s', precision: 'atomic', components: 1000000000000000 }
        ];
        
        this.biologicalProgression = [
            // Prebiotic Chemistry (4.2 - 3.8 Billion years ago)
            { name: 'Amino Acids', ai: 80, era: 'Prebiotic', time: '4.2 Gyr ago', environment: 'Hydrothermal vents', complexity_type: 'Molecular' },
            { name: 'Nucleotides', ai: 200, era: 'Prebiotic', time: '4.0 Gyr ago', environment: 'RNA World', complexity_type: 'Molecular' },
            { name: 'Fatty Acids', ai: 100, era: 'Prebiotic', time: '4.0 Gyr ago', environment: 'Lipid membranes', complexity_type: 'Molecular' },
            { name: 'Peptides', ai: 800, era: 'Prebiotic', time: '4.0 Gyr ago', environment: 'Catalytic networks', complexity_type: 'Macromolecular' },
            { name: 'RNA Ribozymes', ai: 2000, era: 'RNA World', time: '3.9 Gyr ago', environment: 'Self-replicating', complexity_type: 'Catalytic' },
            
            // Early Cellular Life (3.8 - 2.5 Billion years ago)
            { name: 'Proto-cell', ai: 50000, era: 'Archean', time: '3.8 Gyr ago', environment: 'Membrane-bound', complexity_type: 'Cellular' },
            { name: 'DNA-based Genome', ai: 100000, era: 'Archean', time: '3.7 Gyr ago', environment: 'Information storage', complexity_type: 'Genetic' },
            { name: 'Ribosome', ai: 500000, era: 'Archean', time: '3.8 Gyr ago', environment: 'Protein synthesis', complexity_type: 'Molecular machine' },
            { name: 'Photosystem II', ai: 2000000, era: 'Archean', time: '3.5 Gyr ago', environment: 'Oxygen production', complexity_type: 'Biochemical' },
            { name: 'Bacterial Cell', ai: 10000000, era: 'Archean', time: '3.5 Gyr ago', environment: 'Complete metabolism', complexity_type: 'Organismal' },
            
            // Eukaryotic Revolution (2.0 - 1.0 Billion years ago)
            { name: 'Mitochondrion', ai: 50000000, era: 'Proterozoic', time: '2.0 Gyr ago', environment: 'Endosymbiosis', complexity_type: 'Organellar' },
            { name: 'Chloroplast', ai: 60000000, era: 'Proterozoic', time: '1.5 Gyr ago', environment: 'Plant photosynthesis', complexity_type: 'Organellar' },
            { name: 'Cell Nucleus', ai: 80000000, era: 'Proterozoic', time: '2.0 Gyr ago', environment: 'Genetic control', complexity_type: 'Organizational' },
            { name: 'Eukaryotic Cell', ai: 100000000, era: 'Proterozoic', time: '1.8 Gyr ago', environment: 'Complex cellular life', complexity_type: 'Cellular' },
            { name: 'Sexual Reproduction', ai: 200000000, era: 'Proterozoic', time: '1.2 Gyr ago', environment: 'Genetic recombination', complexity_type: 'Reproductive' },
            
            // Multicellular Explosion (1.0 Billion - 500 Myr)
            { name: 'Multicellular Organism', ai: 500000000, era: 'Proterozoic', time: '1.0 Gyr ago', environment: 'Cell cooperation', complexity_type: 'Multicellular' },
            { name: 'Nervous System', ai: 1000000000, era: 'Cambrian', time: '550 Myr ago', environment: 'Information processing', complexity_type: 'Neural' },
            { name: 'Complex Eye', ai: 2000000000, era: 'Cambrian', time: '540 Myr ago', environment: 'Visual processing', complexity_type: 'Sensory' },
            { name: 'Vertebrate Body Plan', ai: 5000000000, era: 'Cambrian', time: '520 Myr ago', environment: 'Bilateral symmetry', complexity_type: 'Anatomical' },
            { name: 'Brain', ai: 10000000000, era: 'Devonian', time: '400 Myr ago', environment: 'Centralized processing', complexity_type: 'Cognitive' },
            
            // Cognitive Evolution (100 Myr - Present)
            { name: 'Social Behavior', ai: 50000000000, era: 'Cenozoic', time: '100 Myr ago', environment: 'Group living', complexity_type: 'Behavioral' },
            { name: 'Tool Use', ai: 100000000000, era: 'Cenozoic', time: '10 Myr ago', environment: 'Problem solving', complexity_type: 'Technological' },
            { name: 'Language', ai: 500000000000, era: 'Pleistocene', time: '100 kyr ago', environment: 'Symbolic communication', complexity_type: 'Linguistic' },
            { name: 'Culture', ai: 1000000000000, era: 'Holocene', time: '50 kyr ago', environment: 'Information transmission', complexity_type: 'Cultural' },
            { name: 'Consciousness', ai: 10000000000000, era: 'Modern', time: 'Present', environment: 'Self-awareness', complexity_type: 'Phenomenal' }
        ];
        
        this.bigBangProgression = [
            // Cosmic Evolution Timeline
            { name: 'Quantum Fluctuations', ai: 0, era: 'Planck Epoch', time: '0 seconds', scale: 'Planck length', temperature: 'Infinite' },
            { name: 'Fundamental Forces', ai: 1, era: 'Grand Unification', time: '10^-43 seconds', scale: 'Planck scale', temperature: '10^32 K' },
            { name: 'Elementary Particles', ai: 2, era: 'Electroweak', time: '10^-12 seconds', scale: 'Subatomic', temperature: '10^15 K' },
            { name: 'Protons', ai: 3, era: 'Quark Confinement', time: '10^-6 seconds', scale: 'Femtometer', temperature: '10^12 K' },
            { name: 'Light Nuclei', ai: 5, era: 'Big Bang Nucleosynthesis', time: '1-20 minutes', scale: 'Femtometer', temperature: '10^9 K' },
            { name: 'Hydrogen Atoms', ai: 2, era: 'Recombination', time: '380,000 years', scale: 'Angstrom', temperature: '3000 K' },
            { name: 'First Stars', ai: 100000000, era: 'Star Formation', time: '100 million years', scale: 'Solar radius', temperature: '10^7 K' },
            { name: 'Heavy Elements', ai: 50, era: 'Stellar Nucleosynthesis', time: '200 million years', scale: 'Atomic', temperature: '10^8 K' },
            { name: 'Galaxies', ai: 1000000000000000000, era: 'Galaxy Formation', time: '1 billion years', scale: 'Kiloparsec', temperature: '10^4 K' },
            { name: 'Solar System', ai: 100000000000000000, era: 'Planetary Formation', time: '9 billion years', scale: 'AU', temperature: '5800 K' },
            { name: 'Earth', ai: 10000000000000000, era: 'Terrestrial', time: '9.2 billion years', scale: 'Planetary', temperature: '288 K' }
        ];
    }
    
    // Get progression data by type
    getToolProgression() {
        return this.toolProgression;
    }
    
    getBiologicalProgression() {
        return this.biologicalProgression;
    }
    
    getBigBangProgression() {
        return this.bigBangProgression;
    }
    
    // Get progression by era
    getProgressionByEra(era) {
        return this.toolProgression.filter(tool => tool.era === era);
    }
    
    // Get tools by AI range
    getToolsByAIRange(minAI, maxAI) {
        return this.toolProgression.filter(tool => tool.ai >= minAI && tool.ai <= maxAI);
    }
    
    // Get complete timeline (all progressions combined)
    getCompleteTimeline() {
        const combined = [
            ...this.bigBangProgression.map(item => ({ ...item, progression_type: 'cosmic' })),
            ...this.biologicalProgression.map(item => ({ ...item, progression_type: 'biological' })),
            ...this.toolProgression.map(item => ({ ...item, progression_type: 'technological' }))
        ];
        
        // Sort by rough chronological order (this is simplified)
        return combined.sort((a, b) => {
            const timeA = this.parseTimeToYears(a.time);
            const timeB = this.parseTimeToYears(b.time);
            return timeB - timeA; // Reverse chronological (oldest first)
        });
    }
    
    // Parse time strings to years ago for sorting
    parseTimeToYears(timeStr) {
        if (timeStr.includes('Gyr')) {
            return parseFloat(timeStr) * 1e9;
        } else if (timeStr.includes('Myr')) {
            debugger;
            return parseFloat(timeStr) * 1e6;
        } else if (timeStr.includes('kyr') || timeStr.includes('K years')) {
            return parseFloat(timeStr) * 1e3;
        } else if (timeStr.includes('years ago')) {
            return parseFloat(timeStr);
        } else if (timeStr.includes('seconds')) {
            return 13.8e9; // Put at beginning of time
        } else if (timeStr.includes('Present')) {
            return 0;
        } else if (timeStr.includes('Projected') || timeStr.includes('Future')) {
            return -100; // Future items
        }
        return 1e6; // Default fallback
    }
    
    // Generate network nodes from timeline data
    generateTimelineNodes() {
        const nodes = [];
        
        // Add tool progression nodes
        this.toolProgression.forEach(tool => {
            nodes.push({
                id: tool.name.toLowerCase().replace(/[^\w]/g, '_'),
                name: tool.name,
                assembly_index: tool.ai,
                domain: 'technological',
                first_appearance: tool.time,
                era: tool.era,
                precision: tool.precision,
                components: tool.components,
                description: `${tool.era} era tool with ${tool.components} components`,
                tool_progression_data: true
            });
        });
        
        // Add biological progression nodes
        this.biologicalProgression.forEach(bio => {
            nodes.push({
                id: bio.name.toLowerCase().replace(/[^\w]/g, '_'),
                name: bio.name,
                assembly_index: bio.ai,
                domain: 'biological',
                first_appearance: bio.time,
                era: bio.era,
                environment: bio.environment,
                complexity_type: bio.complexity_type,
                description: `${bio.era} era biological assembly in ${bio.environment}`,
                biological_progression_data: true
            });
        });
        
        // Add cosmic progression nodes
        this.bigBangProgression.forEach(cosmic => {
            nodes.push({
                id: cosmic.name.toLowerCase().replace(/[^\w]/g, '_'),
                name: cosmic.name,
                assembly_index: cosmic.ai,
                domain: 'cosmic',
                first_appearance: cosmic.time,
                era: cosmic.era,
                scale: cosmic.scale,
                temperature: cosmic.temperature,
                description: `${cosmic.era} era cosmic assembly at ${cosmic.scale} scale`,
                cosmic_progression_data: true
            });
        });
        
        return nodes;
    }
    
    // Generate progression-based edges
    generateProgressionEdges() {
        const edges = [];
        
        // Tool progression edges (each tool enables the next)
        for (let i = 0; i < this.toolProgression.length - 1; i++) {
            const current = this.toolProgression[i];
            const next = this.toolProgression[i + 1];
            
            edges.push({
                source: current.name.toLowerCase().replace(/[^\w]/g, '_'),
                target: next.name.toLowerCase().replace(/[^\w]/g, '_'),
                type: 'technological_progression',
                symbol: '→',
                weight: 0.8,
                progression_type: 'temporal'
            });
        }
        
        // Biological progression edges
        for (let i = 0; i < this.biologicalProgression.length - 1; i++) {
            const current = this.biologicalProgression[i];
            const next = this.biologicalProgression[i + 1];
            
            edges.push({
                source: current.name.toLowerCase().replace(/[^\w]/g, '_'),
                target: next.name.toLowerCase().replace(/[^\w]/g, '_'),
                type: 'biological_evolution',
                symbol: '⇒',
                weight: 0.9,
                progression_type: 'evolutionary'
            });
        }
        
        // Cosmic progression edges
        for (let i = 0; i < this.bigBangProgression.length - 1; i++) {
            const current = this.bigBangProgression[i];
            const next = this.bigBangProgression[i + 1];
            
            edges.push({
                source: current.name.toLowerCase().replace(/[^\w]/g, '_'),
                target: next.name.toLowerCase().replace(/[^\w]/g, '_'),
                type: 'cosmic_evolution',
                symbol: '→',
                weight: 1.0,
                progression_type: 'physical'
            });
        }
        
        return edges;
    }
}