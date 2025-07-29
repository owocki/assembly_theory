class Organisms {
    constructor() {
        this.domainColors = {
            biological: '#228B22'
        };
    }
    
    generateOrganisms() {
        const organisms = [
            // Microorganisms (AI: 100000-10000000)
            { name: 'E. coli', assembly_index: 500000, category: 'bacteria', description: 'Model bacterium' },
            { name: 'Streptococcus', assembly_index: 480000, category: 'bacteria', description: 'Spherical bacterium' },
            { name: 'Lactobacillus', assembly_index: 520000, category: 'bacteria', description: 'Probiotic bacterium' },
            { name: 'Cyanobacteria', assembly_index: 850000, category: 'bacteria', description: 'Photosynthetic bacterium' },
            { name: 'Archaea', assembly_index: 450000, category: 'archaea', description: 'Ancient microorganism' },
            { name: 'Yeast', assembly_index: 8500000, category: 'fungi', description: 'Single-celled fungus' },
            { name: 'Paramecium', assembly_index: 9200000, category: 'protist', description: 'Ciliated protozoan' },
            { name: 'Amoeba', assembly_index: 7800000, category: 'protist', description: 'Shape-shifting protist' },
            { name: 'Euglena', assembly_index: 8900000, category: 'protist', description: 'Photosynthetic protist' },
            { name: 'Diatom', assembly_index: 6500000, category: 'protist', description: 'Silica-shelled algae' },
            
            // Simple plants and algae (AI: 10000000-100000000)
            { name: 'Green Algae', assembly_index: 12000000, category: 'algae', description: 'Aquatic photosynthetic organism' },
            { name: 'Red Algae', assembly_index: 15000000, category: 'algae', description: 'Marine algae' },
            { name: 'Brown Algae', assembly_index: 18000000, category: 'algae', description: 'Seaweed' },
            { name: 'Moss', assembly_index: 25000000, category: 'bryophyte', description: 'Non-vascular plant' },
            { name: 'Liverwort', assembly_index: 22000000, category: 'bryophyte', description: 'Primitive land plant' },
            { name: 'Hornwort', assembly_index: 23000000, category: 'bryophyte', description: 'Ancient plant lineage' },
            { name: 'Fern', assembly_index: 45000000, category: 'pteridophyte', description: 'Vascular non-seed plant' },
            { name: 'Horsetail', assembly_index: 42000000, category: 'pteridophyte', description: 'Ancient vascular plant' },
            { name: 'Club Moss', assembly_index: 38000000, category: 'pteridophyte', description: 'Primitive vascular plant' },
            
            // Fungi (AI: 50000000-200000000)
            { name: 'Mushroom', assembly_index: 85000000, category: 'fungi', description: 'Fruiting body of fungus' },
            { name: 'Truffle', assembly_index: 92000000, category: 'fungi', description: 'Underground fungus' },
            { name: 'Penicillium', assembly_index: 78000000, category: 'fungi', description: 'Antibiotic-producing fungus' },
            { name: 'Lichen', assembly_index: 120000000, category: 'symbiont', description: 'Fungus-algae symbiosis' },
            
            // Simple invertebrates (AI: 100000000-500000000)
            { name: 'Sponge', assembly_index: 180000000, category: 'porifera', description: 'Simplest multicellular animal' },
            { name: 'Jellyfish', assembly_index: 220000000, category: 'cnidaria', description: 'Gelatinous marine animal' },
            { name: 'Coral', assembly_index: 280000000, category: 'cnidaria', description: 'Colony-forming marine animal' },
            { name: 'Sea Anemone', assembly_index: 250000000, category: 'cnidaria', description: 'Sessile marine predator' },
            { name: 'Hydra', assembly_index: 195000000, category: 'cnidaria', description: 'Freshwater polyp' },
            { name: 'Planarian', assembly_index: 320000000, category: 'flatworm', description: 'Regenerating flatworm' },
            { name: 'Earthworm', assembly_index: 380000000, category: 'annelid', description: 'Segmented worm' },
            { name: 'Leech', assembly_index: 350000000, category: 'annelid', description: 'Blood-feeding worm' },
            { name: 'Snail', assembly_index: 420000000, category: 'mollusk', description: 'Shelled gastropod' },
            { name: 'Slug', assembly_index: 380000000, category: 'mollusk', description: 'Shell-less gastropod' },
            { name: 'Clam', assembly_index: 450000000, category: 'mollusk', description: 'Bivalve mollusk' },
            { name: 'Oyster', assembly_index: 480000000, category: 'mollusk', description: 'Pearl-producing bivalve' },
            { name: 'Squid', assembly_index: 520000000, category: 'mollusk', description: 'Intelligent cephalopod' },
            { name: 'Octopus', assembly_index: 580000000, category: 'mollusk', description: 'Eight-armed cephalopod' },
            { name: 'Nautilus', assembly_index: 490000000, category: 'mollusk', description: 'Shelled cephalopod' },
            
            // Complex invertebrates (AI: 500000000-1000000000)
            { name: 'Sea Star', assembly_index: 620000000, category: 'echinoderm', description: 'Five-armed marine animal' },
            { name: 'Sea Urchin', assembly_index: 580000000, category: 'echinoderm', description: 'Spiny marine animal' },
            { name: 'Sea Cucumber', assembly_index: 550000000, category: 'echinoderm', description: 'Soft-bodied echinoderm' },
            { name: 'Ant', assembly_index: 720000000, category: 'insect', description: 'Social insect' },
            { name: 'Bee', assembly_index: 780000000, category: 'insect', description: 'Pollinating insect' },
            { name: 'Butterfly', assembly_index: 680000000, category: 'insect', description: 'Metamorphosing insect' },
            { name: 'Beetle', assembly_index: 650000000, category: 'insect', description: 'Most diverse insect order' },
            { name: 'Dragonfly', assembly_index: 620000000, category: 'insect', description: 'Ancient flying insect' },
            { name: 'Cricket', assembly_index: 580000000, category: 'insect', description: 'Chirping insect' },
            { name: 'Spider', assembly_index: 720000000, category: 'arachnid', description: 'Eight-legged predator' },
            { name: 'Scorpion', assembly_index: 680000000, category: 'arachnid', description: 'Venomous arachnid' },
            { name: 'Crab', assembly_index: 820000000, category: 'crustacean', description: 'Decapod crustacean' },
            { name: 'Lobster', assembly_index: 850000000, category: 'crustacean', description: 'Large marine crustacean' },
            { name: 'Shrimp', assembly_index: 620000000, category: 'crustacean', description: 'Small marine crustacean' },
            { name: 'Barnacle', assembly_index: 480000000, category: 'crustacean', description: 'Sessile crustacean' },
            
            // Flowering plants (AI: 200000000-800000000)
            { name: 'Rose', assembly_index: 380000000, category: 'angiosperm', description: 'Flowering shrub' },
            { name: 'Sunflower', assembly_index: 420000000, category: 'angiosperm', description: 'Large composite flower' },
            { name: 'Orchid', assembly_index: 520000000, category: 'angiosperm', description: 'Complex flower' },
            { name: 'Lily', assembly_index: 350000000, category: 'angiosperm', description: 'Bulbous flower' },
            { name: 'Daisy', assembly_index: 320000000, category: 'angiosperm', description: 'Common wildflower' },
            { name: 'Tulip', assembly_index: 340000000, category: 'angiosperm', description: 'Spring bulb flower' },
            { name: 'Cactus', assembly_index: 380000000, category: 'angiosperm', description: 'Desert succulent' },
            { name: 'Grass', assembly_index: 280000000, category: 'angiosperm', description: 'Monocot plant' },
            { name: 'Wheat', assembly_index: 320000000, category: 'angiosperm', description: 'Cereal grain' },
            { name: 'Rice', assembly_index: 340000000, category: 'angiosperm', description: 'Staple grain crop' },
            { name: 'Corn', assembly_index: 380000000, category: 'angiosperm', description: 'Major cereal grain' },
            { name: 'Tomato', assembly_index: 420000000, category: 'angiosperm', description: 'Fruit-bearing plant' },
            { name: 'Potato', assembly_index: 380000000, category: 'angiosperm', description: 'Tuber crop' },
            { name: 'Apple Tree', assembly_index: 680000000, category: 'angiosperm', description: 'Fruit tree' },
            { name: 'Orange Tree', assembly_index: 720000000, category: 'angiosperm', description: 'Citrus tree' },
            { name: 'Bamboo', assembly_index: 480000000, category: 'angiosperm', description: 'Fast-growing grass' },
            
            // Trees and large plants (AI: 500000000-2000000000)
            { name: 'Oak Tree', assembly_index: 1200000000, category: 'angiosperm', description: 'Hardwood tree' },
            { name: 'Pine Tree', assembly_index: 980000000, category: 'gymnosperm', description: 'Coniferous tree' },
            { name: 'Redwood', assembly_index: 1800000000, category: 'gymnosperm', description: 'Tallest tree species' },
            { name: 'Sequoia', assembly_index: 1900000000, category: 'gymnosperm', description: 'Largest tree by volume' },
            { name: 'Maple Tree', assembly_index: 1100000000, category: 'angiosperm', description: 'Deciduous tree' },
            { name: 'Palm Tree', assembly_index: 920000000, category: 'angiosperm', description: 'Tropical tree' },
            { name: 'Willow Tree', assembly_index: 980000000, category: 'angiosperm', description: 'Water-loving tree' },
            { name: 'Birch Tree', assembly_index: 880000000, category: 'angiosperm', description: 'Pioneer species tree' },
            { name: 'Baobab Tree', assembly_index: 1500000000, category: 'angiosperm', description: 'African giant tree' },
            
            // Fish (AI: 800000000-2000000000)
            { name: 'Goldfish', assembly_index: 980000000, category: 'fish', description: 'Common pet fish' },
            { name: 'Salmon', assembly_index: 1200000000, category: 'fish', description: 'Anadromous fish' },
            { name: 'Tuna', assembly_index: 1400000000, category: 'fish', description: 'Large pelagic fish' },
            { name: 'Shark', assembly_index: 1800000000, category: 'fish', description: 'Cartilaginous predator' },
            { name: 'Ray', assembly_index: 1500000000, category: 'fish', description: 'Flattened cartilaginous fish' },
            { name: 'Seahorse', assembly_index: 1100000000, category: 'fish', description: 'Unique fish with prehensile tail' },
            { name: 'Clownfish', assembly_index: 950000000, category: 'fish', description: 'Symbiotic reef fish' },
            { name: 'Anglerfish', assembly_index: 1300000000, category: 'fish', description: 'Deep sea predator' },
            
            // Amphibians and reptiles (AI: 1500000000-3000000000)
            { name: 'Frog', assembly_index: 1800000000, category: 'amphibian', description: 'Tailless amphibian' },
            { name: 'Toad', assembly_index: 1750000000, category: 'amphibian', description: 'Warty-skinned amphibian' },
            { name: 'Salamander', assembly_index: 1900000000, category: 'amphibian', description: 'Tailed amphibian' },
            { name: 'Newt', assembly_index: 1850000000, category: 'amphibian', description: 'Aquatic salamander' },
            { name: 'Turtle', assembly_index: 2200000000, category: 'reptile', description: 'Shelled reptile' },
            { name: 'Tortoise', assembly_index: 2300000000, category: 'reptile', description: 'Land-dwelling turtle' },
            { name: 'Lizard', assembly_index: 2100000000, category: 'reptile', description: 'Common reptile' },
            { name: 'Snake', assembly_index: 2400000000, category: 'reptile', description: 'Legless reptile' },
            { name: 'Crocodile', assembly_index: 2800000000, category: 'reptile', description: 'Large aquatic reptile' },
            { name: 'Alligator', assembly_index: 2700000000, category: 'reptile', description: 'Broad-snouted crocodilian' },
            
            // Birds (AI: 2000000000-4000000000)
            { name: 'Sparrow', assembly_index: 2200000000, category: 'bird', description: 'Small passerine bird' },
            { name: 'Robin', assembly_index: 2300000000, category: 'bird', description: 'Common songbird' },
            { name: 'Eagle', assembly_index: 3200000000, category: 'bird', description: 'Large raptor' },
            { name: 'Hawk', assembly_index: 2900000000, category: 'bird', description: 'Medium-sized raptor' },
            { name: 'Owl', assembly_index: 2800000000, category: 'bird', description: 'Nocturnal raptor' },
            { name: 'Penguin', assembly_index: 2600000000, category: 'bird', description: 'Flightless aquatic bird' },
            { name: 'Ostrich', assembly_index: 3500000000, category: 'bird', description: 'Largest living bird' },
            { name: 'Hummingbird', assembly_index: 2100000000, category: 'bird', description: 'Smallest bird' },
            { name: 'Parrot', assembly_index: 3100000000, category: 'bird', description: 'Intelligent tropical bird' },
            { name: 'Peacock', assembly_index: 2900000000, category: 'bird', description: 'Ornamental bird' },
            { name: 'Flamingo', assembly_index: 2700000000, category: 'bird', description: 'Pink wading bird' },
            { name: 'Swan', assembly_index: 2800000000, category: 'bird', description: 'Large waterfowl' },
            { name: 'Duck', assembly_index: 2400000000, category: 'bird', description: 'Common waterfowl' },
            { name: 'Goose', assembly_index: 2600000000, category: 'bird', description: 'Large waterfowl' },
            { name: 'Chicken', assembly_index: 2300000000, category: 'bird', description: 'Domesticated fowl' },
            { name: 'Turkey', assembly_index: 2500000000, category: 'bird', description: 'Large ground bird' },
            { name: 'Crow', assembly_index: 3000000000, category: 'bird', description: 'Intelligent corvid' },
            { name: 'Raven', assembly_index: 3200000000, category: 'bird', description: 'Large corvid' },
            
            // Mammals (AI: 3000000000-10000000000)
            { name: 'Mouse', assembly_index: 3200000000, category: 'mammal', description: 'Small rodent' },
            { name: 'Rat', assembly_index: 3400000000, category: 'mammal', description: 'Medium rodent' },
            { name: 'Rabbit', assembly_index: 3800000000, category: 'mammal', description: 'Lagomorph' },
            { name: 'Squirrel', assembly_index: 3600000000, category: 'mammal', description: 'Tree-dwelling rodent' },
            { name: 'Beaver', assembly_index: 4200000000, category: 'mammal', description: 'Dam-building rodent' },
            { name: 'Cat', assembly_index: 4800000000, category: 'mammal', description: 'Domestic feline' },
            { name: 'Dog', assembly_index: 5200000000, category: 'mammal', description: 'Domestic canine' },
            { name: 'Wolf', assembly_index: 5500000000, category: 'mammal', description: 'Wild canine' },
            { name: 'Fox', assembly_index: 4900000000, category: 'mammal', description: 'Small canine' },
            { name: 'Lion', assembly_index: 6200000000, category: 'mammal', description: 'Large feline' },
            { name: 'Tiger', assembly_index: 6500000000, category: 'mammal', description: 'Largest cat' },
            { name: 'Bear', assembly_index: 6800000000, category: 'mammal', description: 'Large omnivore' },
            { name: 'Deer', assembly_index: 5800000000, category: 'mammal', description: 'Hoofed herbivore' },
            { name: 'Horse', assembly_index: 7200000000, category: 'mammal', description: 'Large ungulate' },
            { name: 'Cow', assembly_index: 7800000000, category: 'mammal', description: 'Domestic bovine' },
            { name: 'Pig', assembly_index: 6500000000, category: 'mammal', description: 'Domestic swine' },
            { name: 'Sheep', assembly_index: 6200000000, category: 'mammal', description: 'Wool-bearing ungulate' },
            { name: 'Goat', assembly_index: 5900000000, category: 'mammal', description: 'Hardy ungulate' },
            { name: 'Elephant', assembly_index: 9500000000, category: 'mammal', description: 'Largest land mammal' },
            { name: 'Giraffe', assembly_index: 8200000000, category: 'mammal', description: 'Tallest mammal' },
            { name: 'Whale', assembly_index: 9800000000, category: 'mammal', description: 'Largest marine mammal' },
            { name: 'Dolphin', assembly_index: 8500000000, category: 'mammal', description: 'Intelligent marine mammal' },
            { name: 'Seal', assembly_index: 7200000000, category: 'mammal', description: 'Pinniped mammal' },
            { name: 'Bat', assembly_index: 4500000000, category: 'mammal', description: 'Flying mammal' },
            { name: 'Monkey', assembly_index: 7800000000, category: 'mammal', description: 'Primate' },
            { name: 'Gorilla', assembly_index: 8900000000, category: 'mammal', description: 'Large ape' },
            { name: 'Chimpanzee', assembly_index: 9200000000, category: 'mammal', description: 'Closest human relative' },
            { name: 'Orangutan', assembly_index: 8800000000, category: 'mammal', description: 'Arboreal ape' }
        ];
        
        // Process all organisms
        return organisms.map(organism => this.processOrganism(organism));
    }
    
    processOrganism(organism) {
        const tier = this.getAssemblyTier(organism.assembly_index);
        
        return {
            id: organism.name.toLowerCase().replace(/\s+/g, '_').replace(/[^\w]/g, ''),
            name: organism.name,
            assembly_index: organism.assembly_index,
            domain: 'biological',
            subdomain: organism.category,
            description: organism.description,
            tier: tier.tier,
            visual_complexity: tier.symbol,
            color: this.domainColors.biological,
            radius: this.getNodeRadius(tier.tier),
            time_origin: this.getOrganismTimeOrigin(organism),
            copy_number: this.estimateCopyNumber(organism),
            github_url: this.generateGitHubUrl(organism)
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
    
    getNodeRadius(tier) {
        return 3 + (tier * 2);
    }
    
    estimateCopyNumber(organism) {
        // Estimate based on typical population sizes
        const categoryMultipliers = {
            'bacteria': 1e20,
            'archaea': 1e19,
            'protist': 1e15,
            'algae': 1e14,
            'fungi': 1e12,
            'insect': 1e10,
            'fish': 1e8,
            'bird': 1e7,
            'mammal': 1e6,
            'angiosperm': 1e9,
            'gymnosperm': 1e8
        };
        
        const base = categoryMultipliers[organism.category] || 1e7;
        // Adjust for specific organisms
        const adjustments = {
            'E. coli': 10,
            'Ant': 100,
            'Human': 0.01,
            'Whale': 0.0001,
            'Elephant': 0.00001
        };
        
        const adjustment = adjustments[organism.name] || 1;
        return Math.floor(base * adjustment);
    }
    
    generateGitHubUrl(organism) {
        const baseUrl = 'https://github.com/owocki/assembly_theory/tree/master/domains/biological';
        const filename = organism.name.toLowerCase().replace(/\s+/g, '_').replace(/[^\w]/g, '');
        
        // Map categories to likely subdirectories
        const subdirMap = {
            'bacteria': 'prokaryotic',
            'archaea': 'prokaryotic',
            'protist': 'eukaryotic',
            'algae': 'eukaryotic',
            'fungi': 'eukaryotic',
            'angiosperm': 'multicellular/plants',
            'gymnosperm': 'multicellular/plants',
            'bryophyte': 'multicellular/plants',
            'pteridophyte': 'multicellular/plants',
            'fish': 'multicellular/animals',
            'amphibian': 'multicellular/animals',
            'reptile': 'multicellular/animals',
            'bird': 'multicellular/animals',
            'mammal': 'multicellular/animals',
            'insect': 'multicellular/arthropods',
            'arachnid': 'multicellular/arthropods',
            'crustacean': 'multicellular/arthropods',
            'mollusk': 'multicellular/mollusks',
            'cnidaria': 'multicellular/cnidarians',
            'porifera': 'multicellular/sponges',
            'echinoderm': 'multicellular/echinoderms',
            'annelid': 'multicellular/worms',
            'flatworm': 'multicellular/worms',
            'symbiont': 'symbiotic'
        };
        
        const subdir = subdirMap[organism.category] || 'multicellular';
        return `${baseUrl}/${subdir}/${filename}.md`;
    }
    
    getOrganismTimeOrigin(organism) {
        // Time origins for different organism categories based on scientific consensus
        const timeOrigins = {
            'bacteria': '3.8 billion years ago',
            'archaea': '3.8 billion years ago',
            'protist': '1.5 billion years ago',
            'algae': '1.2 billion years ago',
            'fungi': '1 billion years ago',
            'bryophyte': '470 Myr',
            'pteridophyte': '425 Myr',
            'gymnosperm': '360 Myr',
            'angiosperm': '140 Myr',
            'porifera': '600 Myr',
            'cnidaria': '580 Myr',
            'flatworm': '550 Myr',
            'annelid': '540 Myr',
            'mollusk': '540 Myr',
            'echinoderm': '540 Myr',
            'arthropod': '540 Myr',
            'insect': '400 Myr',
            'arachnid': '430 Myr',
            'crustacean': '511 Myr',
            'fish': '530 Myr',
            'amphibian': '365 Myr',
            'reptile': '320 Myr',
            'bird': '150 Myr',
            'mammal': '210 Myr',
            'symbiont': '1.5 billion years ago'
        };
        
        // Some specific organism overrides
        const specificOrigins = {
            'Cyanobacteria': '2.5 billion years ago',
            'Stromatolite': '3.5 billion years ago',
            'Trilobite': '521 Myr',
            'Dinosaur': '230 Myr',
            'Human': '300,000 years ago',
            'Homo sapiens': '300,000 years ago',
            'Whale': '50 Myr',
            'Elephant': '60 Myr',
            'Flower': '140 Myr',
            'Grass': '70 Myr',
            'Oak Tree': '65 Myr',
            'Redwood': '20 Myr',
            'Shark': '450 Myr',
            'Crocodile': '250 Myr',
            'Turtle': '220 Myr'
        };
        
        // Check for specific organism first, then fall back to category
        return specificOrigins[organism.name] || timeOrigins[organism.category] || 'Unknown';
    }
    
    // Generate links between organisms
    generateOrganismLinks(nodes) {
        const links = [];
        const nodeMap = new Map(nodes.map(n => [n.id, n]));
        
        // Add evolutionary and ecological relationships
        const relationships = [
            // Microbial relationships
            { source: 'e_coli', target: 'yeast', type: 'horizontal_gene_transfer' },
            { source: 'cyanobacteria', target: 'chloroplast', type: 'endosymbiosis' },
            
            // Plant evolution
            { source: 'green_algae', target: 'moss', type: 'evolutionary_transition' },
            { source: 'moss', target: 'fern', type: 'evolutionary_transition' },
            { source: 'fern', target: 'pine_tree', type: 'evolutionary_transition' },
            { source: 'pine_tree', target: 'oak_tree', type: 'evolutionary_transition' },
            
            // Animal evolution
            { source: 'sponge', target: 'jellyfish', type: 'evolutionary_transition' },
            { source: 'jellyfish', target: 'planarian', type: 'evolutionary_transition' },
            { source: 'planarian', target: 'earthworm', type: 'evolutionary_transition' },
            { source: 'earthworm', target: 'snail', type: 'evolutionary_transition' },
            { source: 'snail', target: 'squid', type: 'evolutionary_transition' },
            
            // Vertebrate evolution
            { source: 'shark', target: 'salmon', type: 'evolutionary_divergence' },
            { source: 'salmon', target: 'frog', type: 'evolutionary_transition' },
            { source: 'frog', target: 'lizard', type: 'evolutionary_transition' },
            { source: 'lizard', target: 'sparrow', type: 'evolutionary_transition' },
            { source: 'lizard', target: 'mouse', type: 'evolutionary_transition' },
            
            // Ecological relationships
            { source: 'bee', target: 'sunflower', type: 'pollination' },
            { source: 'butterfly', target: 'rose', type: 'pollination' },
            { source: 'coral', target: 'clownfish', type: 'mutualism' },
            { source: 'lichen', target: 'green_algae', type: 'symbiosis' },
            
            // Food web relationships
            { source: 'grass', target: 'rabbit', type: 'herbivory' },
            { source: 'rabbit', target: 'fox', type: 'predation' },
            { source: 'mouse', target: 'owl', type: 'predation' },
            { source: 'deer', target: 'wolf', type: 'predation' },
            { source: 'seal', target: 'shark', type: 'predation' }
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