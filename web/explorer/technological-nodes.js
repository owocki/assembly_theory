class TechnologicalNodes {
    constructor() {
        this.domainColors = {
            technological: '#DC143C'
        };
    }
    
    generateTechnologies() {
        const technologies = [
            { name: 'Bow and Arrow', assembly_index: 1000000000, category: 'early_human_technology', description: 'The bow and arrow system demonstrates:' },
            { name: 'Fishhook', assembly_index: 1000000000, category: 'early_human_technology', description: '1. Groove and Snap' },
            { name: 'Spear', assembly_index: 1000000000, category: 'early_human_technology', description: 'The spear represents a critical threshold in tool complexity, demonstrating:' },
            { name: 'Stone Tools Assembly', assembly_index: 1000000000, category: 'early_human_technology', description: 'early human technology technology' },
            { name: 'Plow', assembly_index: 1000000000, category: 'middle_age_technology', description: 'The plow demonstrates:' },
            { name: 'Pottery Wheel', assembly_index: 1000000000, category: 'middle_age_technology', description: '1. Opening' },
            { name: 'Sickle', assembly_index: 1000000000, category: 'middle_age_technology', description: '1. Serrated' },
            { name: 'Steam Engine', assembly_index: 1000000000, category: 'late_age_technology', description: '1. Steam Generation' },
            { name: 'Microprocessor Assembly', assembly_index: 1000000000, category: 'computers', description: 'computers technology' },
            { name: 'Steam Engine Assembly', assembly_index: 1000000000, category: 'machines', description: 'machines technology' },
            { name: 'AI-Native Applications: Software Intelligence Revolution', assembly_index: 1000000000, category: 'modern', description: 'System Components:' },
            { name: 'Amazon Fulfillment Network: The Ultimate Physical Assembly', assembly_index: 1000000000, category: 'modern', description: 'Peak Operations (November-December):' },
            { name: 'DeFi Yield Farming: Financial Assembly Revolution', assembly_index: 1000000000, category: 'modern', description: 'Ecosystem Components:' },
            { name: 'Edge Computing Networks: Distributed Processing Revolution', assembly_index: 1000000000, category: 'modern', description: 'Network Components:' },
            { name: 'Layer 2 Rollups: Blockchain Scaling Revolution', assembly_index: 1000000000, category: 'modern', description: 'Layer 2 rollup networks represent the breakthrough solution to blockchain scalability, with Assembly Indices reaching 100+ billion. These systems d...' },
            { name: 'LLM Token Systems: Revolutionary Information Assembly', assembly_index: 1000000000, category: 'modern', description: 'Component Breakdown:' },
            { name: 'React Server Components: Web Architecture Revolution', assembly_index: 1000000000, category: 'modern', description: 'React Server Components represent a paradigm shift in web application architecture, with Assembly Indices reaching 10+ billion. This system demonst...' },
            { name: 'Tesla Gigafactory: Manufacturing-as-Software Assembly', assembly_index: 1000000000, category: 'modern', description: 'Tesla\'s Gigafactory system represents the most advanced manufacturing assembly of the modern era, with Assembly Indices reaching 500+ billion. Thes...' },
            { name: 'TSMC 3nm Fabrication: Ultimate Precision Assembly', assembly_index: 1000000000, category: 'modern', description: 'TSMC\'s 3nm semiconductor fabrication represents the pinnacle of human precision manufacturing, with Assembly Indices reaching 1+ trillion. These fa...' },
            { name: 'Internet Assembly', assembly_index: 1000000000, category: 'networks', description: 'networks technology' },
            { name: 'Spinning Jenny', assembly_index: 1000000000, category: 'tools', description: 'tools technology' },
            { name: 'Telegraph', assembly_index: 1000000000, category: 'tools', description: '1. Electrical Contacts' },
            { name: 'Fire', assembly_index: 8000000000, category: 'early_human_technology', description: 'Controlled use of fire dates back 1.5 million years, representing one of humanity\'s first major technological achievements.' },
            { name: 'flint blade', assembly_index: 10000000000, category: 'early_human_technology', description: 'Early human technology demonstrating sophisticated material understanding and craftsmanship.' },
            { name: 'hide scraper', assembly_index: 10000000000, category: 'early_human_technology', description: 'Early human technology for various purposes including hunting, gathering, and daily life.' },
            { name: 'shell scraper', assembly_index: 10000000000, category: 'early_human_technology', description: 'Early human technology demonstrating sophisticated material understanding and craftsmanship.' },
            { name: 'torch', assembly_index: 10000000000, category: 'early_human_technology', description: 'Early human technology for various purposes including hunting, gathering, and daily life.' },
            { name: 'awl', assembly_index: 11000000000, category: 'early_human_technology', description: 'Early human technology for various purposes including hunting, gathering, and daily life.' },
            { name: 'boomerang', assembly_index: 11000000000, category: 'early_human_technology', description: 'Early human technology for various purposes including hunting, gathering, and daily life.' },
            { name: 'fishing net', assembly_index: 11000000000, category: 'early_human_technology', description: 'Early human technology for various purposes including hunting, gathering, and daily life.' },
            { name: 'harpoon', assembly_index: 11000000000, category: 'early_human_technology', description: 'Early human technology for various purposes including hunting, gathering, and daily life.' },
            { name: 'blowgun', assembly_index: 12000000000, category: 'early_human_technology', description: 'Early human technology demonstrating sophisticated material understanding and craftsmanship.' },
            { name: 'bone harpoon', assembly_index: 12000000000, category: 'early_human_technology', description: 'Early human technology demonstrating sophisticated material understanding and craftsmanship.' },
            { name: 'digging stick', assembly_index: 12000000000, category: 'early_human_technology', description: 'Early human technology for various purposes including hunting, gathering, and daily life.' },
            { name: 'flute', assembly_index: 12000000000, category: 'early_human_technology', description: 'Early human technology for various purposes including hunting, gathering, and daily life.' },
            { name: 'grinding stone', assembly_index: 12000000000, category: 'early_human_technology', description: 'Early human technology demonstrating sophisticated material understanding and craftsmanship.' },
            { name: 'Hand Axe', assembly_index: 12000000000, category: 'early_human_technology', description: 'Acheulean hand axes date back 1.7 million years, showing sophisticated understanding of stone fracture mechanics.' },
            { name: 'lance', assembly_index: 12000000000, category: 'early_human_technology', description: 'Early human technology for various purposes including hunting, gathering, and daily life.' },
            { name: 'quern', assembly_index: 12000000000, category: 'early_human_technology', description: 'Early human technology for various purposes including hunting, gathering, and daily life.' },
            { name: 'rope', assembly_index: 12000000000, category: 'early_human_technology', description: 'Early human technology for various purposes including hunting, gathering, and daily life.' },
            { name: 'atlatl', assembly_index: 15000000000, category: 'early_human_technology', description: 'Early human technology for various purposes including hunting, gathering, and daily life.' },
            { name: 'cordage', assembly_index: 15000000000, category: 'early_human_technology', description: 'Early human technology for various purposes including hunting, gathering, and daily life.' },
            { name: 'snare', assembly_index: 15000000000, category: 'early_human_technology', description: 'Early human technology for various purposes including hunting, gathering, and daily life.' },
            { name: 'stone chisel', assembly_index: 16000000000, category: 'early_human_technology', description: 'Early human technology demonstrating sophisticated material understanding and craftsmanship.' },
            { name: 'fishing spear', assembly_index: 17000000000, category: 'early_human_technology', description: 'Early human technology demonstrating sophisticated material understanding and craftsmanship.' },
            { name: 'tanning rack', assembly_index: 18000000000, category: 'early_human_technology', description: 'Early human technology demonstrating sophisticated material understanding and craftsmanship.' },
            { name: 'drill', assembly_index: 19000000000, category: 'early_human_technology', description: 'Early human technology for various purposes including hunting, gathering, and daily life.' },
            { name: 'sling', assembly_index: 20000000000, category: 'early_human_technology', description: 'Early human technology for various purposes including hunting, gathering, and daily life.' },
            { name: 'travois', assembly_index: 20000000000, category: 'early_human_technology', description: 'Early human technology for various purposes including hunting, gathering, and daily life.' },
            { name: 'cam shaft', assembly_index: 20000000000, category: 'middle_age_technology', description: 'Medieval innovation showcasing mechanical, architectural, and agricultural advances.' },
            { name: 'mechanical clock', assembly_index: 21000000000, category: 'middle_age_technology', description: 'Medieval technology representing advances in agriculture, warfare, and craftsmanship.' },
            { name: 'tide mill', assembly_index: 21000000000, category: 'middle_age_technology', description: 'Medieval innovation showcasing mechanical, architectural, and agricultural advances.' },
            { name: 'trip hammer', assembly_index: 21000000000, category: 'middle_age_technology', description: 'Medieval innovation showcasing mechanical, architectural, and agricultural advances.' },
            { name: 'bone needle', assembly_index: 22000000000, category: 'early_human_technology', description: 'Early human technology for various purposes including hunting, gathering, and daily life.' },
            { name: 'oil lamp', assembly_index: 22000000000, category: 'early_human_technology', description: 'Early human technology demonstrating sophisticated material understanding and craftsmanship.' },
            { name: 'distillation apparatus', assembly_index: 22000000000, category: 'middle_age_technology', description: 'Medieval innovation showcasing mechanical, architectural, and agricultural advances.' },
            { name: 'draw plate', assembly_index: 22000000000, category: 'middle_age_technology', description: 'Medieval innovation showcasing mechanical, architectural, and agricultural advances.' },
            { name: 'spinning wheel', assembly_index: 22000000000, category: 'middle_age_technology', description: 'Medieval technology representing advances in agriculture, warfare, and craftsmanship.' },
            { name: 'antler pick', assembly_index: 23000000000, category: 'early_human_technology', description: 'Early human technology demonstrating sophisticated material understanding and craftsmanship.' },
            { name: 'bone awl', assembly_index: 23000000000, category: 'early_human_technology', description: 'Early human technology demonstrating sophisticated material understanding and craftsmanship.' },
            { name: 'drawbridge', assembly_index: 23000000000, category: 'middle_age_technology', description: 'Medieval innovation showcasing mechanical, architectural, and agricultural advances.' },
            { name: 'hourglass', assembly_index: 23000000000, category: 'middle_age_technology', description: 'Medieval innovation showcasing mechanical, architectural, and agricultural advances.' },
            { name: 'leather pouch', assembly_index: 24000000000, category: 'early_human_technology', description: 'Early human technology demonstrating sophisticated material understanding and craftsmanship.' },
            { name: 'loom', assembly_index: 24000000000, category: 'early_human_technology', description: 'Early human technology for various purposes including hunting, gathering, and daily life.' },
            { name: 'wooden bowl', assembly_index: 24000000000, category: 'early_human_technology', description: 'Early human technology for various purposes including hunting, gathering, and daily life.' },
            { name: 'crop rotation', assembly_index: 24000000000, category: 'middle_age_technology', description: 'Medieval innovation showcasing mechanical, architectural, and agricultural advances.' },
            { name: 'horizontal loom', assembly_index: 24000000000, category: 'middle_age_technology', description: 'Medieval technology representing advances in agriculture, warfare, and craftsmanship.' },
            { name: 'oar', assembly_index: 25000000000, category: 'early_human_technology', description: 'Early human technology for various purposes including hunting, gathering, and daily life.' },
            { name: 'paper mill', assembly_index: 25000000000, category: 'middle_age_technology', description: 'Medieval innovation showcasing mechanical, architectural, and agricultural advances.' },
            { name: 'printing press', assembly_index: 25000000000, category: 'middle_age_technology', description: 'Medieval technology representing advances in agriculture, warfare, and craftsmanship.' },
            { name: 'treadmill crane', assembly_index: 25000000000, category: 'middle_age_technology', description: 'Medieval technology representing advances in agriculture, warfare, and craftsmanship.' },
            { name: 'waterwheel', assembly_index: 25000000000, category: 'middle_age_technology', description: 'Medieval innovation showcasing mechanical, architectural, and agricultural advances.' },
            { name: 'bark cloth', assembly_index: 26000000000, category: 'early_human_technology', description: 'Early human technology demonstrating sophisticated material understanding and craftsmanship.' },
            { name: 'knife', assembly_index: 26000000000, category: 'early_human_technology', description: 'Early human technology for various purposes including hunting, gathering, and daily life.' },
            { name: 'pipe organ', assembly_index: 26000000000, category: 'middle_age_technology', description: 'Medieval innovation showcasing mechanical, architectural, and agricultural advances.' },
            { name: 'bola', assembly_index: 27000000000, category: 'early_human_technology', description: 'Early human technology for various purposes including hunting, gathering, and daily life.' },
            { name: 'bone flute', assembly_index: 27000000000, category: 'early_human_technology', description: 'Early human technology demonstrating sophisticated material understanding and craftsmanship.' },
            { name: 'clay vessel', assembly_index: 27000000000, category: 'early_human_technology', description: 'Early human technology demonstrating sophisticated material understanding and craftsmanship.' },
            { name: 'fire drill', assembly_index: 27000000000, category: 'early_human_technology', description: 'Early human technology demonstrating sophisticated material understanding and craftsmanship.' },
            { name: 'mallet', assembly_index: 27000000000, category: 'early_human_technology', description: 'Early human technology for various purposes including hunting, gathering, and daily life.' },
            { name: 'skin tent', assembly_index: 27000000000, category: 'early_human_technology', description: 'Early human technology demonstrating sophisticated material understanding and craftsmanship.' },
            { name: 'throwing stick', assembly_index: 27000000000, category: 'early_human_technology', description: 'Early human technology for various purposes including hunting, gathering, and daily life.' },
            { name: 'windmill', assembly_index: 27000000000, category: 'middle_age_technology', description: 'Medieval technology representing advances in agriculture, warfare, and craftsmanship.' },
            { name: 'adze', assembly_index: 28000000000, category: 'early_human_technology', description: 'Early human technology for various purposes including hunting, gathering, and daily life.' },
            { name: 'hammer stone', assembly_index: 28000000000, category: 'early_human_technology', description: 'Early human technology for various purposes including hunting, gathering, and daily life.' },
            { name: 'pressure flaker', assembly_index: 28000000000, category: 'early_human_technology', description: 'Early human technology demonstrating sophisticated material understanding and craftsmanship.' },
            { name: 'horseshoe', assembly_index: 28000000000, category: 'middle_age_technology', description: 'Medieval technology representing advances in agriculture, warfare, and craftsmanship.' },
            { name: 'watermill', assembly_index: 28000000000, category: 'middle_age_technology', description: 'Medieval technology representing advances in agriculture, warfare, and craftsmanship.' },
            { name: 'basket', assembly_index: 29000000000, category: 'early_human_technology', description: 'Early human technology for various purposes including hunting, gathering, and daily life.' },
            { name: 'mortar pestle', assembly_index: 29000000000, category: 'early_human_technology', description: 'Early human technology for various purposes including hunting, gathering, and daily life.' },
            { name: 'obsidian knife', assembly_index: 29000000000, category: 'early_human_technology', description: 'Early human technology demonstrating sophisticated material understanding and craftsmanship.' },
            { name: 'plant fiber net', assembly_index: 29000000000, category: 'early_human_technology', description: 'Early human technology demonstrating sophisticated material understanding and craftsmanship.' },
            { name: 'raft', assembly_index: 29000000000, category: 'early_human_technology', description: 'Early human technology for various purposes including hunting, gathering, and daily life.' },
            { name: 'fulling mill', assembly_index: 29000000000, category: 'middle_age_technology', description: 'Medieval technology representing advances in agriculture, warfare, and craftsmanship.' },
            { name: 'trebuchet', assembly_index: 29000000000, category: 'middle_age_technology', description: 'Medieval technology representing advances in agriculture, warfare, and craftsmanship.' },
            { name: 'harpsichord', assembly_index: 31000000000, category: 'middle_age_technology', description: 'Medieval innovation showcasing mechanical, architectural, and agricultural advances.' },
            { name: 'electric stove', assembly_index: 31000000000, category: 'late_age_technology', description: 'Essential modern technology for daily life, industry, and infrastructure.' },
            { name: 'catapult', assembly_index: 33000000000, category: 'middle_age_technology', description: 'Medieval technology representing advances in agriculture, warfare, and craftsmanship.' },
            { name: 'heavy plow', assembly_index: 33000000000, category: 'middle_age_technology', description: 'Medieval technology representing advances in agriculture, warfare, and craftsmanship.' },
            { name: 'oil painting', assembly_index: 33000000000, category: 'middle_age_technology', description: 'Medieval innovation showcasing mechanical, architectural, and agricultural advances.' },
            { name: 'accelerometer', assembly_index: 33000000000, category: 'late_age_technology', description: 'Essential modern technology for daily life, industry, and infrastructure.' },
            { name: 'flail', assembly_index: 34000000000, category: 'middle_age_technology', description: 'Medieval technology representing advances in agriculture, warfare, and craftsmanship.' },
            { name: 'incandescent bulb', assembly_index: 34000000000, category: 'late_age_technology', description: 'Essential modern technology for daily life, industry, and infrastructure.' },
            { name: 'horse collar', assembly_index: 35000000000, category: 'middle_age_technology', description: 'Medieval innovation showcasing mechanical, architectural, and agricultural advances.' },
            { name: 'longbow', assembly_index: 35000000000, category: 'middle_age_technology', description: 'Medieval technology representing advances in agriculture, warfare, and craftsmanship.' },
            { name: 'blender', assembly_index: 35000000000, category: 'late_age_technology', description: 'Essential modern technology for daily life, industry, and infrastructure.' },
            { name: 'turbine generator', assembly_index: 35000000000, category: 'late_age_technology', description: 'Essential modern technology for daily life, industry, and infrastructure.' },
            { name: 'arquebus', assembly_index: 36000000000, category: 'middle_age_technology', description: 'Medieval innovation showcasing mechanical, architectural, and agricultural advances.' },
            { name: 'crossbow', assembly_index: 36000000000, category: 'middle_age_technology', description: 'Medieval technology representing advances in agriculture, warfare, and craftsmanship.' },
            { name: 'screw press', assembly_index: 36000000000, category: 'middle_age_technology', description: 'Medieval innovation showcasing mechanical, architectural, and agricultural advances.' },
            { name: 'spectacles', assembly_index: 36000000000, category: 'middle_age_technology', description: 'Medieval technology representing advances in agriculture, warfare, and craftsmanship.' },
            { name: 'stirrup', assembly_index: 36000000000, category: 'middle_age_technology', description: 'Medieval technology representing advances in agriculture, warfare, and craftsmanship.' },
            { name: 'sundial', assembly_index: 36000000000, category: 'middle_age_technology', description: 'Medieval innovation showcasing mechanical, architectural, and agricultural advances.' },
            { name: 'coffee maker', assembly_index: 37000000000, category: 'late_age_technology', description: 'Essential modern technology for daily life, industry, and infrastructure.' },
            { name: 'lance', assembly_index: 38000000000, category: 'middle_age_technology', description: 'Medieval technology representing advances in agriculture, warfare, and craftsmanship.' },
            { name: 'compass', assembly_index: 39000000000, category: 'middle_age_technology', description: 'Medieval technology representing advances in agriculture, warfare, and craftsmanship.' },
            { name: 'paper', assembly_index: 39000000000, category: 'middle_age_technology', description: 'Medieval technology representing advances in agriculture, warfare, and craftsmanship.' },
            { name: 'circuit breaker', assembly_index: 39000000000, category: 'late_age_technology', description: 'Essential modern technology for daily life, industry, and infrastructure.' },
            { name: 'pressure sensor', assembly_index: 39000000000, category: 'late_age_technology', description: 'Essential modern technology for daily life, industry, and infrastructure.' },
            { name: 'aqueduct', assembly_index: 40000000000, category: 'middle_age_technology', description: 'Medieval innovation showcasing mechanical, architectural, and agricultural advances.' },
            { name: 'astrolabe', assembly_index: 40000000000, category: 'middle_age_technology', description: 'Medieval technology representing advances in agriculture, warfare, and craftsmanship.' },
            { name: 'crucible', assembly_index: 40000000000, category: 'middle_age_technology', description: 'Medieval innovation showcasing mechanical, architectural, and agricultural advances.' },
            { name: 'mace', assembly_index: 40000000000, category: 'middle_age_technology', description: 'Medieval technology representing advances in agriculture, warfare, and craftsmanship.' },
            { name: 'siege tower', assembly_index: 40000000000, category: 'middle_age_technology', description: 'Medieval technology representing advances in agriculture, warfare, and craftsmanship.' },
            { name: 'wheelbarrow', assembly_index: 40000000000, category: 'middle_age_technology', description: 'Medieval innovation showcasing mechanical, architectural, and agricultural advances.' },
            { name: 'blast furnace', assembly_index: 41000000000, category: 'middle_age_technology', description: 'Medieval technology representing advances in agriculture, warfare, and craftsmanship.' },
            { name: 'gunpowder', assembly_index: 41000000000, category: 'middle_age_technology', description: 'Medieval innovation showcasing mechanical, architectural, and agricultural advances.' },
            { name: 'wire drawing', assembly_index: 41000000000, category: 'middle_age_technology', description: 'Medieval innovation showcasing mechanical, architectural, and agricultural advances.' },
            { name: 'chainmail', assembly_index: 42000000000, category: 'middle_age_technology', description: 'Medieval technology representing advances in agriculture, warfare, and craftsmanship.' },
            { name: 'gothic arch', assembly_index: 42000000000, category: 'middle_age_technology', description: 'Medieval innovation showcasing mechanical, architectural, and agricultural advances.' },
            { name: 'sword', assembly_index: 42000000000, category: 'middle_age_technology', description: 'Medieval technology representing advances in agriculture, warfare, and craftsmanship.' },
            { name: 'refrigerator', assembly_index: 42000000000, category: 'late_age_technology', description: 'Essential modern technology for daily life, industry, and infrastructure.' },
            { name: 'battering ram', assembly_index: 43000000000, category: 'middle_age_technology', description: 'Medieval technology representing advances in agriculture, warfare, and craftsmanship.' },
            { name: 'stained glass', assembly_index: 43000000000, category: 'middle_age_technology', description: 'Medieval innovation showcasing mechanical, architectural, and agricultural advances.' },
            { name: 'three field system', assembly_index: 43000000000, category: 'middle_age_technology', description: 'Medieval technology representing advances in agriculture, warfare, and craftsmanship.' },
            { name: 'piezoelectric sensor', assembly_index: 43000000000, category: 'late_age_technology', description: 'Essential modern technology for daily life, industry, and infrastructure.' },
            { name: 'semiconductor', assembly_index: 43000000000, category: 'late_age_technology', description: 'Essential modern technology for daily life, industry, and infrastructure.' },
            { name: 'alembic', assembly_index: 44000000000, category: 'middle_age_technology', description: 'Medieval innovation showcasing mechanical, architectural, and agricultural advances.' },
            { name: 'gear mechanism', assembly_index: 44000000000, category: 'middle_age_technology', description: 'Medieval innovation showcasing mechanical, architectural, and agricultural advances.' },
            { name: 'flying buttress', assembly_index: 45000000000, category: 'middle_age_technology', description: 'Medieval innovation showcasing mechanical, architectural, and agricultural advances.' },
            { name: 'food processor', assembly_index: 45000000000, category: 'late_age_technology', description: 'Essential modern technology for daily life, industry, and infrastructure.' },
            { name: 'washing machine', assembly_index: 46000000000, category: 'late_age_technology', description: 'Essential modern technology for daily life, industry, and infrastructure.' },
            { name: 'plate armor', assembly_index: 47000000000, category: 'middle_age_technology', description: 'Medieval technology representing advances in agriculture, warfare, and craftsmanship.' },
            { name: 'portcullis', assembly_index: 47000000000, category: 'middle_age_technology', description: 'Medieval innovation showcasing mechanical, architectural, and agricultural advances.' },
            { name: 'toaster', assembly_index: 47000000000, category: 'late_age_technology', description: 'Essential modern technology for daily life, industry, and infrastructure.' },
            { name: 'canal lock', assembly_index: 48000000000, category: 'middle_age_technology', description: 'Medieval innovation showcasing mechanical, architectural, and agricultural advances.' },
            { name: 'strain gauge', assembly_index: 48000000000, category: 'late_age_technology', description: 'Essential modern technology for daily life, industry, and infrastructure.' },
            { name: 'bellows', assembly_index: 49000000000, category: 'middle_age_technology', description: 'Medieval technology representing advances in agriculture, warfare, and craftsmanship.' },
            { name: 'cannon', assembly_index: 49000000000, category: 'middle_age_technology', description: 'Medieval innovation showcasing mechanical, architectural, and agricultural advances.' },
            { name: 'carbon nanotube', assembly_index: 50000000000, category: 'late_age_technology', description: 'Cutting-edge technology pushing boundaries of computation, materials, and connectivity.' },
            { name: 'fluorescent light', assembly_index: 50000000000, category: 'late_age_technology', description: 'Essential modern technology for daily life, industry, and infrastructure.' },
            { name: 'memristor', assembly_index: 50000000000, category: 'late_age_technology', description: 'Cutting-edge technology pushing boundaries of computation, materials, and connectivity.' },
            { name: 'solar panel', assembly_index: 50000000000, category: 'late_age_technology', description: 'Modern technology representing exponential advances in computing, communication, and transportation.' },
            { name: 'cochlear implant', assembly_index: 52000000000, category: 'late_age_technology', description: 'Advanced technology for medical, scientific, and analytical applications.' },
            { name: 'defibrillator', assembly_index: 52000000000, category: 'late_age_technology', description: 'Advanced technology for medical, scientific, and analytical applications.' },
            { name: 'nuclear reactor', assembly_index: 52000000000, category: 'late_age_technology', description: 'Advanced technology for medical, scientific, and analytical applications.' },
            { name: 'flow meter', assembly_index: 53000000000, category: 'late_age_technology', description: 'Essential modern technology for daily life, industry, and infrastructure.' },
            { name: 'magnetometer', assembly_index: 53000000000, category: 'late_age_technology', description: 'Essential modern technology for daily life, industry, and infrastructure.' },
            { name: 'metamaterial', assembly_index: 53000000000, category: 'late_age_technology', description: 'Cutting-edge technology pushing boundaries of computation, materials, and connectivity.' },
            { name: 'pacemaker', assembly_index: 54000000000, category: 'late_age_technology', description: 'Advanced technology for medical, scientific, and analytical applications.' },
            { name: 'prosthetic limb', assembly_index: 54000000000, category: 'late_age_technology', description: 'Advanced technology for medical, scientific, and analytical applications.' },
            { name: 'insulin pump', assembly_index: 55000000000, category: 'late_age_technology', description: 'Advanced technology for medical, scientific, and analytical applications.' },
            { name: 'internal combustion engine', assembly_index: 55000000000, category: 'late_age_technology', description: 'Essential modern technology for daily life, industry, and infrastructure.' },
            { name: 'mass spectrometer', assembly_index: 55000000000, category: 'late_age_technology', description: 'Advanced technology for medical, scientific, and analytical applications.' },
            { name: 'space shuttle', assembly_index: 55000000000, category: 'late_age_technology', description: 'Modern technology representing exponential advances in computing, communication, and transportation.' },
            { name: 'thermometer', assembly_index: 56000000000, category: 'late_age_technology', description: 'Essential modern technology for daily life, industry, and infrastructure.' },
            { name: 'transformer', assembly_index: 56000000000, category: 'late_age_technology', description: 'Essential modern technology for daily life, industry, and infrastructure.' },
            { name: 'photonic processor', assembly_index: 57000000000, category: 'late_age_technology', description: 'Cutting-edge technology pushing boundaries of computation, materials, and connectivity.' },
            { name: 'vacuum cleaner', assembly_index: 57000000000, category: 'late_age_technology', description: 'Essential modern technology for daily life, industry, and infrastructure.' },
            { name: 'ventilator', assembly_index: 57000000000, category: 'late_age_technology', description: 'Advanced technology for medical, scientific, and analytical applications.' },
            { name: 'crispr', assembly_index: 58000000000, category: 'late_age_technology', description: 'Advanced technology for medical, scientific, and analytical applications.' },
            { name: 'hybrid vehicle', assembly_index: 58000000000, category: 'late_age_technology', description: 'Modern technology representing exponential advances in computing, communication, and transportation.' },
            { name: 'photodiode', assembly_index: 58000000000, category: 'late_age_technology', description: 'Essential modern technology for daily life, industry, and infrastructure.' },
            { name: 'television', assembly_index: 58000000000, category: 'late_age_technology', description: 'Modern technology representing exponential advances in computing, communication, and transportation.' },
            { name: 'chromatograph', assembly_index: 59000000000, category: 'late_age_technology', description: 'Advanced technology for medical, scientific, and analytical applications.' },
            { name: 'humidity sensor', assembly_index: 59000000000, category: 'late_age_technology', description: 'Essential modern technology for daily life, industry, and infrastructure.' },
            { name: 'solar cell', assembly_index: 59000000000, category: 'late_age_technology', description: 'Essential modern technology for daily life, industry, and infrastructure.' },
            { name: 'voice assistant', assembly_index: 59000000000, category: 'late_age_technology', description: 'Cutting-edge technology pushing boundaries of computation, materials, and connectivity.' },
            { name: 'cryptocurrency', assembly_index: 60000000000, category: 'late_age_technology', description: 'Cutting-edge technology pushing boundaries of computation, materials, and connectivity.' },
            { name: 'blockchain', assembly_index: 61000000000, category: 'late_age_technology', description: 'Cutting-edge technology pushing boundaries of computation, materials, and connectivity.' },
            { name: 'mixed reality', assembly_index: 61000000000, category: 'late_age_technology', description: 'Cutting-edge technology pushing boundaries of computation, materials, and connectivity.' },
            { name: 'neural network', assembly_index: 61000000000, category: 'late_age_technology', description: 'Cutting-edge technology pushing boundaries of computation, materials, and connectivity.' },
            { name: 'thermoelectric generator', assembly_index: 61000000000, category: 'late_age_technology', description: 'Essential modern technology for daily life, industry, and infrastructure.' },
            { name: 'artificial heart', assembly_index: 62000000000, category: 'late_age_technology', description: 'Advanced technology for medical, scientific, and analytical applications.' },
            { name: 'laser', assembly_index: 62000000000, category: 'late_age_technology', description: 'Modern technology representing exponential advances in computing, communication, and transportation.' },
            { name: 'led light', assembly_index: 62000000000, category: 'late_age_technology', description: 'Essential modern technology for daily life, industry, and infrastructure.' },
            { name: 'transistor', assembly_index: 62000000000, category: 'late_age_technology', description: 'Modern technology representing exponential advances in computing, communication, and transportation.' },
            { name: 'encoder', assembly_index: 63000000000, category: 'late_age_technology', description: 'Essential modern technology for daily life, industry, and infrastructure.' },
            { name: 'motion capture', assembly_index: 63000000000, category: 'late_age_technology', description: 'Cutting-edge technology pushing boundaries of computation, materials, and connectivity.' },
            { name: 'x ray machine', assembly_index: 63000000000, category: 'late_age_technology', description: 'Advanced technology for medical, scientific, and analytical applications.' },
            { name: 'fusion reactor', assembly_index: 64000000000, category: 'late_age_technology', description: 'Cutting-edge technology pushing boundaries of computation, materials, and connectivity.' },
            { name: 'torque sensor', assembly_index: 64000000000, category: 'late_age_technology', description: 'Essential modern technology for daily life, industry, and infrastructure.' },
            { name: 'facial recognition', assembly_index: 65000000000, category: 'late_age_technology', description: 'Cutting-edge technology pushing boundaries of computation, materials, and connectivity.' },
            { name: 'jet engine', assembly_index: 65000000000, category: 'late_age_technology', description: 'Modern technology representing exponential advances in computing, communication, and transportation.' },
            { name: 'load cell', assembly_index: 65000000000, category: 'late_age_technology', description: 'Essential modern technology for daily life, industry, and infrastructure.' },
            { name: 'telephone', assembly_index: 65000000000, category: 'late_age_technology', description: 'Modern technology representing exponential advances in computing, communication, and transportation.' },
            { name: 'edge ai', assembly_index: 66000000000, category: 'late_age_technology', description: 'Cutting-edge technology pushing boundaries of computation, materials, and connectivity.' },
            { name: 'gyroscope', assembly_index: 66000000000, category: 'late_age_technology', description: 'Essential modern technology for daily life, industry, and infrastructure.' },
            { name: 'smartphone', assembly_index: 66000000000, category: 'late_age_technology', description: 'Modern technology representing exponential advances in computing, communication, and transportation.' },
            { name: 'ct scanner', assembly_index: 67000000000, category: 'late_age_technology', description: 'Advanced technology for medical, scientific, and analytical applications.' },
            { name: 'electric motor', assembly_index: 68000000000, category: 'late_age_technology', description: 'Essential modern technology for daily life, industry, and infrastructure.' },
            { name: 'instant pot', assembly_index: 68000000000, category: 'late_age_technology', description: 'Essential modern technology for daily life, industry, and infrastructure.' },
            { name: 'mainframe', assembly_index: 68000000000, category: 'late_age_technology', description: 'Modern technology representing exponential advances in computing, communication, and transportation.' },
            { name: 'desktop computer', assembly_index: 69000000000, category: 'late_age_technology', description: 'Modern technology representing exponential advances in computing, communication, and transportation.' },
            { name: 'spectrophotometer', assembly_index: 70000000000, category: 'late_age_technology', description: 'Advanced technology for medical, scientific, and analytical applications.' },
            { name: '3d scanner', assembly_index: 71000000000, category: 'late_age_technology', description: 'Advanced technology for medical, scientific, and analytical applications.' },
            { name: 'proximity sensor', assembly_index: 71000000000, category: 'late_age_technology', description: 'Essential modern technology for daily life, industry, and infrastructure.' },
            { name: 'autonomous vehicle', assembly_index: 72000000000, category: 'late_age_technology', description: 'Modern technology representing exponential advances in computing, communication, and transportation.' },
            { name: 'barometer', assembly_index: 72000000000, category: 'late_age_technology', description: 'Essential modern technology for daily life, industry, and infrastructure.' },
            { name: 'dishwasher', assembly_index: 72000000000, category: 'late_age_technology', description: 'Essential modern technology for daily life, industry, and infrastructure.' },
            { name: 'haptic feedback', assembly_index: 72000000000, category: 'late_age_technology', description: 'Cutting-edge technology pushing boundaries of computation, materials, and connectivity.' },
            { name: 'microwave oven', assembly_index: 72000000000, category: 'late_age_technology', description: 'Essential modern technology for daily life, industry, and infrastructure.' },
            { name: 'photoelectric sensor', assembly_index: 72000000000, category: 'late_age_technology', description: 'Essential modern technology for daily life, industry, and infrastructure.' },
            { name: 'robotic surgery', assembly_index: 72000000000, category: 'late_age_technology', description: 'Advanced technology for medical, scientific, and analytical applications.' },
            { name: 'synthetic biology', assembly_index: 72000000000, category: 'late_age_technology', description: 'Advanced technology for medical, scientific, and analytical applications.' },
            { name: 'air conditioner', assembly_index: 73000000000, category: 'late_age_technology', description: 'Essential modern technology for daily life, industry, and infrastructure.' },
            { name: 'rocket', assembly_index: 73000000000, category: 'late_age_technology', description: 'Modern technology representing exponential advances in computing, communication, and transportation.' },
            { name: 'reinforcement learning', assembly_index: 74000000000, category: 'late_age_technology', description: 'Cutting-edge technology pushing boundaries of computation, materials, and connectivity.' },
            { name: 'resolver', assembly_index: 74000000000, category: 'late_age_technology', description: 'Essential modern technology for daily life, industry, and infrastructure.' },
            { name: 'multimeter', assembly_index: 75000000000, category: 'late_age_technology', description: 'Advanced technology for medical, scientific, and analytical applications.' },
            { name: 'particle accelerator', assembly_index: 75000000000, category: 'late_age_technology', description: 'Advanced technology for medical, scientific, and analytical applications.' },
            { name: 'supercomputer', assembly_index: 75000000000, category: 'late_age_technology', description: 'Modern technology representing exponential advances in computing, communication, and transportation.' },
            { name: 'drone', assembly_index: 76000000000, category: 'late_age_technology', description: 'Modern technology representing exponential advances in computing, communication, and transportation.' },
            { name: 'mri scanner', assembly_index: 76000000000, category: 'late_age_technology', description: 'Advanced technology for medical, scientific, and analytical applications.' },
            { name: 'smart grid', assembly_index: 76000000000, category: 'late_age_technology', description: 'Cutting-edge technology pushing boundaries of computation, materials, and connectivity.' },
            { name: 'wind turbine', assembly_index: 76000000000, category: 'late_age_technology', description: 'Modern technology representing exponential advances in computing, communication, and transportation.' },
            { name: 'electron microscope', assembly_index: 77000000000, category: 'late_age_technology', description: 'Advanced technology for medical, scientific, and analytical applications.' },
            { name: 'lidar', assembly_index: 77000000000, category: 'late_age_technology', description: 'Advanced technology for medical, scientific, and analytical applications.' },
            { name: 'robot', assembly_index: 77000000000, category: 'late_age_technology', description: 'Modern technology representing exponential advances in computing, communication, and transportation.' },
            { name: 'dialysis machine', assembly_index: 78000000000, category: 'late_age_technology', description: 'Advanced technology for medical, scientific, and analytical applications.' },
            { name: 'natural language processing', assembly_index: 78000000000, category: 'late_age_technology', description: 'Cutting-edge technology pushing boundaries of computation, materials, and connectivity.' },
            { name: 'oscilloscope', assembly_index: 78000000000, category: 'late_age_technology', description: 'Advanced technology for medical, scientific, and analytical applications.' },
            { name: 'tablet', assembly_index: 78000000000, category: 'late_age_technology', description: 'Modern technology representing exponential advances in computing, communication, and transportation.' },
            { name: 'battery storage', assembly_index: 79000000000, category: 'late_age_technology', description: 'Cutting-edge technology pushing boundaries of computation, materials, and connectivity.' },
            { name: 'gene sequencer', assembly_index: 79000000000, category: 'late_age_technology', description: 'Advanced technology for medical, scientific, and analytical applications.' },
            { name: 'ultrasound', assembly_index: 79000000000, category: 'late_age_technology', description: 'Advanced technology for medical, scientific, and analytical applications.' },
            { name: 'fuel cell', assembly_index: 80000000000, category: 'late_age_technology', description: 'Cutting-edge technology pushing boundaries of computation, materials, and connectivity.' },
            { name: 'space station', assembly_index: 81000000000, category: 'late_age_technology', description: 'Modern technology representing exponential advances in computing, communication, and transportation.' },
            { name: 'gps', assembly_index: 82000000000, category: 'late_age_technology', description: 'Modern technology representing exponential advances in computing, communication, and transportation.' },
            { name: 'laser surgery', assembly_index: 82000000000, category: 'late_age_technology', description: 'Advanced technology for medical, scientific, and analytical applications.' },
            { name: 'maglev train', assembly_index: 82000000000, category: 'late_age_technology', description: 'Modern technology representing exponential advances in computing, communication, and transportation.' },
            { name: 'pcr machine', assembly_index: 82000000000, category: 'late_age_technology', description: 'Advanced technology for medical, scientific, and analytical applications.' },
            { name: 'satellite', assembly_index: 82000000000, category: 'late_age_technology', description: 'Modern technology representing exponential advances in computing, communication, and transportation.' },
            { name: 'starlink', assembly_index: 82000000000, category: 'late_age_technology', description: 'Cutting-edge technology pushing boundaries of computation, materials, and connectivity.' },
            { name: 'iot sensor', assembly_index: 83000000000, category: 'late_age_technology', description: 'Cutting-edge technology pushing boundaries of computation, materials, and connectivity.' },
            { name: 'neuromorphic chip', assembly_index: 83000000000, category: 'late_age_technology', description: 'Cutting-edge technology pushing boundaries of computation, materials, and connectivity.' },
            { name: 'smart contract', assembly_index: 83000000000, category: 'late_age_technology', description: 'Cutting-edge technology pushing boundaries of computation, materials, and connectivity.' },
            { name: 'virtual reality', assembly_index: 83000000000, category: 'late_age_technology', description: 'Cutting-edge technology pushing boundaries of computation, materials, and connectivity.' },
            { name: 'computer vision', assembly_index: 84000000000, category: 'late_age_technology', description: 'Cutting-edge technology pushing boundaries of computation, materials, and connectivity.' },
            { name: 'deep learning', assembly_index: 84000000000, category: 'late_age_technology', description: 'Cutting-edge technology pushing boundaries of computation, materials, and connectivity.' },
            { name: '5g network', assembly_index: 85000000000, category: 'late_age_technology', description: 'Cutting-edge technology pushing boundaries of computation, materials, and connectivity.' },
            { name: 'high speed rail', assembly_index: 85000000000, category: 'late_age_technology', description: 'Modern technology representing exponential advances in computing, communication, and transportation.' },
            { name: 'electric car', assembly_index: 86000000000, category: 'late_age_technology', description: 'Modern technology representing exponential advances in computing, communication, and transportation.' },
            { name: 'superconductor', assembly_index: 87000000000, category: 'late_age_technology', description: 'Cutting-edge technology pushing boundaries of computation, materials, and connectivity.' },
            { name: 'fiber optics', assembly_index: 88000000000, category: 'late_age_technology', description: 'Modern technology representing exponential advances in computing, communication, and transportation.' },
            { name: '3d printer', assembly_index: 89000000000, category: 'late_age_technology', description: 'Modern technology representing exponential advances in computing, communication, and transportation.' },
            { name: 'graphene transistor', assembly_index: 89000000000, category: 'late_age_technology', description: 'Cutting-edge technology pushing boundaries of computation, materials, and connectivity.' },
            { name: 'radio', assembly_index: 92000000000, category: 'late_age_technology', description: 'Modern technology representing exponential advances in computing, communication, and transportation.' },
            { name: 'quantum computer', assembly_index: 94000000000, category: 'late_age_technology', description: 'Modern technology representing exponential advances in computing, communication, and transportation.' },
            { name: 'radar', assembly_index: 96000000000, category: 'late_age_technology', description: 'Advanced technology for medical, scientific, and analytical applications.' },
            { name: 'integrated circuit', assembly_index: 98000000000, category: 'late_age_technology', description: 'Modern technology representing exponential advances in computing, communication, and transportation.' },
            { name: 'laptop', assembly_index: 98000000000, category: 'late_age_technology', description: 'Modern technology representing exponential advances in computing, communication, and transportation.' },
            { name: 'augmented reality', assembly_index: 99000000000, category: 'late_age_technology', description: 'Cutting-edge technology pushing boundaries of computation, materials, and connectivity.' },
            { name: 'bioreactor', assembly_index: 99000000000, category: 'late_age_technology', description: 'Advanced technology for medical, scientific, and analytical applications.' },
            { name: 'AI System', assembly_index: 100000000000, category: 'networks', description: 'AI systems represent the most complex technological assemblies created by humanity, involving massive neural networks, sophisticated algorithms, an...' }
        ];
        
        // Process all technologies
        return technologies.map(tech => this.processTechnology(tech));
    }
    
    processTechnology(tech) {
        const tier = this.getAssemblyTier(tech.assembly_index);
        
        return {
            id: tech.name.toLowerCase().replace(/\s+/g, '_').replace(/[^\w]/g, ''),
            name: tech.name,
            assembly_index: tech.assembly_index,
            domain: 'technological',
            subdomain: tech.category,
            description: tech.description,
            tier: tier.tier,
            visual_complexity: tier.symbol,
            color: this.domainColors.technological,
            radius: this.getNodeRadius(tier.tier),
            time_origin: this.estimateTimeOrigin(tech),
            copy_number: this.estimateCopyNumber(tech),
            github_url: this.generateGitHubUrl(tech)
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
    
    estimateTimeOrigin(tech) {
        const timeOrigins = {
            'early_human_technology': '2.6 Myr ago',
            'middle_age_technology': '1000 years ago',
            'late_age_technology': '200 years ago',
            'computers': '80 years ago',
            'machines': '250 years ago',
            'modern': '20 years ago',
            'networks': '50 years ago',
            'tools': '300 years ago'
        };
        
        // More specific time origins based on technology name
        const specificOrigins = {
            'fire': '1.5 Myr ago',
            'stone_tools': '2.6 Myr ago',
            'bow_and_arrow': '70,000 years ago',
            'printing_press': '1440 CE',
            'steam_engine': '1712 CE',
            'internet': '1969 CE',
            'smartphone': '2007 CE',
            'ai': '1950 CE',
            'quantum_computer': '1998 CE'
        };
        
        const techId = tech.name.toLowerCase().replace(/\s+/g, '_');
        return specificOrigins[techId] || timeOrigins[tech.category] || '100 years ago';
    }
    
    estimateCopyNumber(tech) {
        // Estimate based on typical production/deployment numbers
        const categoryMultipliers = {
            'early_human_technology': 1e6,
            'middle_age_technology': 1e5,
            'late_age_technology': 1e7,
            'computers': 1e9,
            'machines': 1e6,
            'modern': 1e8,
            'networks': 1e10,
            'tools': 1e7
        };
        
        const base = categoryMultipliers[tech.category] || 1e6;
        
        // Adjust for specific technologies
        const adjustments = {
            'smartphone': 100,
            'internet': 1000,
            'fire': 10000,
            'stone_tools': 1000,
            'quantum_computer': 0.001,
            'particle_accelerator': 0.0001,
            'space_station': 0.00001
        };
        
        const techId = tech.name.toLowerCase().replace(/\s+/g, '_');
        const adjustment = adjustments[techId] || 1;
        return Math.floor(base * adjustment);
    }
    
    generateGitHubUrl(tech) {
        const baseUrl = 'https://github.com/owocki/assembly_theory/tree/master/domains/technological';
        const filename = tech.name.toLowerCase().replace(/\s+/g, '_').replace(/[^\w]/g, '');
        
        // Map categories to subdirectories
        const subdirMap = {
            'early_human_technology': 'early_human_technology',
            'middle_age_technology': 'middle_age_technology',
            'late_age_technology': 'late_age_technology',
            'computers': 'late_age_technology/computers',
            'machines': 'late_age_technology/machines',
            'modern': 'late_age_technology/modern',
            'networks': 'late_age_technology/networks',
            'tools': 'tools'
        };
        
        const subdir = subdirMap[tech.category] || tech.category;
        return `${baseUrl}/${subdir}/${filename}.md`;
    }
    
    // Generate links between technologies
    generateTechnologyLinks(nodes) {
        const links = [];
        const nodeMap = new Map(nodes.map(n => [n.id, n]));
        
        // Add technological evolution and dependency relationships
        const relationships = [
            // Early tool evolution
            { source: 'stone_tools', target: 'hand_axe', type: 'technological_evolution' },
            { source: 'fire', target: 'torch', type: 'technological_evolution' },
            { source: 'hand_axe', target: 'knife', type: 'technological_evolution' },
            { source: 'spear', target: 'bow_and_arrow', type: 'technological_evolution' },
            
            // Medieval technology
            { source: 'watermill', target: 'windmill', type: 'technological_adaptation' },
            { source: 'mechanical_clock', target: 'printing_press', type: 'precision_engineering' },
            
            // Industrial revolution
            { source: 'steam_engine', target: 'internal_combustion_engine', type: 'technological_evolution' },
            { source: 'telegraph', target: 'telephone', type: 'technological_evolution' },
            { source: 'telephone', target: 'radio', type: 'technological_evolution' },
            
            // Modern computing
            { source: 'transistor', target: 'integrated_circuit', type: 'technological_evolution' },
            { source: 'integrated_circuit', target: 'microprocessor', type: 'technological_evolution' },
            { source: 'microprocessor', target: 'desktop_computer', type: 'component_integration' },
            { source: 'desktop_computer', target: 'laptop', type: 'technological_evolution' },
            { source: 'laptop', target: 'smartphone', type: 'technological_convergence' },
            
            // Networks
            { source: 'telegraph', target: 'internet', type: 'conceptual_evolution' },
            { source: 'internet', target: '5g_network', type: 'technological_evolution' },
            { source: 'internet', target: 'blockchain', type: 'technological_innovation' },
            
            // AI evolution
            { source: 'computer', target: 'ai', type: 'technological_evolution' },
            { source: 'ai', target: 'deep_learning', type: 'technological_evolution' },
            { source: 'deep_learning', target: 'llm_token_systems', type: 'technological_evolution' }
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

// Export for use in browser
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TechnologicalNodes;
}
