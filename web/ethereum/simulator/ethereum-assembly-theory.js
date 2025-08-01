// Ethereum Assembly Theory Visualization
let width = 800;
let height = 800;

// SVG elements
let svg, nodesGroup, linksGroup, particlesGroup;

// Data structures
let selectedPrimitives = new Set();
let assemblyGraph = {
    nodes: [],
    links: []
};

// Assembly Index calculations - comprehensive domain list from domains/ethereum
const primitiveData = {
    // Base layer & Core
    "Account": { ai: 1, category: "base", dependencies: [] },
    "Transaction": { ai: 2, category: "base", dependencies: ["Account"] },
    "Block": { ai: 3, category: "base", dependencies: ["Transaction"] },
    "Smart Contract": { ai: 5, category: "base", dependencies: ["Account", "Transaction"] },
    "The Merge": { ai: 2000, category: "core", dependencies: ["Block", "Smart Contract"] },
    
    // Token Standards
    "ERC-20": { ai: 2.5, category: "tokens", dependencies: ["Smart Contract"] },
    "ERC-721": { ai: 8.5, category: "tokens", dependencies: ["Smart Contract"] },
    "ERC-1155": { ai: 15, category: "tokens", dependencies: ["ERC-20", "ERC-721"] },
    "ERC-4626": { ai: 12, category: "tokens", dependencies: ["ERC-20"] },
    
    // Security & Standards
    "EIP-155": { ai: 3.5, category: "security", dependencies: ["Transaction"] },
    "EIP-712": { ai: 8.5, category: "security", dependencies: ["Smart Contract"] },
    "EIP-1967": { ai: 3, category: "security", dependencies: ["Smart Contract"] },
    "EIP-2535": { ai: 35, category: "security", dependencies: ["Smart Contract", "EIP-1967"] },
    
    // Infrastructure
    "EIP-1559": { ai: 50, category: "infrastructure", dependencies: ["Transaction", "Block"] },
    "EIP-4844": { ai: 200, category: "infrastructure", dependencies: ["Block", "Transaction"] },
    "Chainlink": { ai: 350, category: "infrastructure", dependencies: ["Smart Contract", "Oracle"] },
    "The Graph": { ai: 280, category: "infrastructure", dependencies: ["Smart Contract", "IPFS"] },
    "IPFS": { ai: 400, category: "infrastructure", dependencies: [] },
    "Alchemy": { ai: 300, category: "infrastructure", dependencies: ["Smart Contract"] },
    "Hardhat": { ai: 150, category: "infrastructure", dependencies: ["Smart Contract"] },
    
    // DeFi Protocols
    "Compound": { ai: 75, category: "defi", dependencies: ["ERC-20", "Oracle"] },
    "Aave": { ai: 125, category: "defi", dependencies: ["ERC-20", "Oracle", "Flash Loan"] },
    "MakerDAO": { ai: 200, category: "defi", dependencies: ["ERC-20", "Oracle", "Smart Contract"] },
    "Uniswap": { ai: 180, category: "defi", dependencies: ["ERC-20", "AMM"] },
    "Curve": { ai: 150, category: "defi", dependencies: ["ERC-20", "AMM"] },
    "Balancer": { ai: 175, category: "defi", dependencies: ["ERC-20", "AMM"] },
    "Synthetix": { ai: 250, category: "defi", dependencies: ["ERC-20", "Oracle"] },
    "Yearn": { ai: 180, category: "defi", dependencies: ["ERC-20", "Yield Farm"] },
    "Lido": { ai: 85, category: "defi", dependencies: ["ERC-20", "Staking"] },
    "Rocket Pool": { ai: 140, category: "defi", dependencies: ["ERC-20", "Staking"] },
    "Frax": { ai: 220, category: "defi", dependencies: ["ERC-20", "AMM", "Oracle"] },
    "GMX": { ai: 120, category: "defi", dependencies: ["ERC-20", "Oracle", "Perpetuals"] },
    "dYdX": { ai: 200, category: "defi", dependencies: ["ERC-20", "Oracle", "Perpetuals"] },
    "Pendle": { ai: 180, category: "defi", dependencies: ["ERC-20", "Yield Trading"] },
    "Convex": { ai: 100, category: "defi", dependencies: ["Curve", "ERC-20"] },
    "1inch": { ai: 95, category: "defi", dependencies: ["AMM", "Aggregator"] },
    "SushiSwap": { ai: 150, category: "defi", dependencies: ["ERC-20", "AMM"] },
    "EtherFi": { ai: 120, category: "defi", dependencies: ["ERC-20", "Staking"] },
    
    // Layer 2 Solutions
    "Arbitrum": { ai: 350, category: "layer2", dependencies: ["Rollup", "Smart Contract"] },
    "Optimism": { ai: 320, category: "layer2", dependencies: ["Rollup", "Smart Contract"] },
    "Polygon zkEVM": { ai: 400, category: "layer2", dependencies: ["ZK Rollup", "Smart Contract"] },
    "zkSync": { ai: 450, category: "layer2", dependencies: ["ZK Rollup", "Smart Contract"] },
    "StarkNet": { ai: 500, category: "layer2", dependencies: ["ZK Rollup", "Smart Contract"] },
    "Base": { ai: 200, category: "layer2", dependencies: ["Optimism", "Smart Contract"] },
    
    // NFT Ecosystem
    "OpenSea": { ai: 150, category: "nft", dependencies: ["ERC-721", "ERC-1155"] },
    "Blur": { ai: 95, category: "nft", dependencies: ["ERC-721", "Aggregator"] },
    "Rarible": { ai: 110, category: "nft", dependencies: ["ERC-721", "ERC-1155"] },
    "Foundation": { ai: 70, category: "nft", dependencies: ["ERC-721"] },
    "SuperRare": { ai: 90, category: "nft", dependencies: ["ERC-721"] },
    "Zora": { ai: 130, category: "nft", dependencies: ["ERC-721", "Protocol"] },
    "Manifold": { ai: 100, category: "nft", dependencies: ["ERC-721", "Creator Tools"] },
    
    // Social & Governance
    "ENS": { ai: 120, category: "social", dependencies: ["Smart Contract", "NFT"] },
    "Lens Protocol": { ai: 200, category: "social", dependencies: ["ERC-721", "Social Graph"] },
    "Farcaster": { ai: 180, category: "social", dependencies: ["Smart Contract", "Social Protocol"] },
    "Snapshot": { ai: 80, category: "social", dependencies: ["Governance", "IPFS"] },
    "Aragon": { ai: 220, category: "social", dependencies: ["DAO", "Smart Contract"] },
    "Gitcoin Grants": { ai: 175, category: "social", dependencies: ["Quadratic Funding", "Smart Contract"] },
    "Gitcoin Passport": { ai: 85, category: "social", dependencies: ["Identity", "Smart Contract"] },
    "Allo Protocol": { ai: 120, category: "social", dependencies: ["Funding", "Smart Contract"] },
    
    // Gaming & Metaverse
    "Axie Infinity": { ai: 200, category: "gaming", dependencies: ["ERC-721", "Game"] },
    "The Sandbox": { ai: 250, category: "gaming", dependencies: ["ERC-721", "Metaverse"] },
    "Decentraland": { ai: 280, category: "gaming", dependencies: ["ERC-721", "Metaverse"] },
    "Gods Unchained": { ai: 150, category: "gaming", dependencies: ["ERC-721", "TCG"] },
    "Illuvium": { ai: 300, category: "gaming", dependencies: ["ERC-721", "RPG"] },
    
    // Emerging Trends
    "EigenLayer": { ai: 300, category: "emerging", dependencies: ["Restaking", "Smart Contract"] },
    "Safe": { ai: 250, category: "emerging", dependencies: ["Multisig", "Smart Contract"] },
    "Worldcoin": { ai: 400, category: "emerging", dependencies: ["Identity", "ZK Proofs"] },
    "Ondo Finance": { ai: 180, category: "emerging", dependencies: ["RWA", "ERC-20"] },
    
    // Account Abstraction
    "EIP-4337": { ai: 150, category: "account", dependencies: ["Account", "Smart Contract"] },
    
    // Core primitives (updated with dependencies)
    "Oracle": { ai: 30, category: "primitive", dependencies: ["Smart Contract"] },
    "AMM": { ai: 60, category: "primitive", dependencies: ["ERC-20", "Smart Contract"] },
    "Lending Pool": { ai: 80, category: "primitive", dependencies: ["ERC-20", "Oracle"] },
    "Flash Loan": { ai: 100, category: "primitive", dependencies: ["Lending Pool"] },
    "Yield Farm": { ai: 120, category: "primitive", dependencies: ["AMM", "ERC-20"] },
    "Rollup": { ai: 250, category: "primitive", dependencies: ["Block", "Smart Contract"] },
    "ZK Rollup": { ai: 350, category: "primitive", dependencies: ["Rollup", "ZK Proofs"] },
    "Bridge": { ai: 300, category: "primitive", dependencies: ["Oracle", "Multisig"] },
    "MEV": { ai: 400, category: "primitive", dependencies: ["Block", "Transaction"] },
    "Intent": { ai: 500, category: "primitive", dependencies: ["Oracle", "Smart Contract"] },
    
    // Additional primitives
    "Multisig": { ai: 25, category: "primitive", dependencies: ["Smart Contract"] },
    "DAO": { ai: 150, category: "primitive", dependencies: ["Governance", "Smart Contract"] },
    "Staking": { ai: 50, category: "primitive", dependencies: ["ERC-20"] },
    "Perpetuals": { ai: 150, category: "primitive", dependencies: ["Oracle", "Margin"] },
    "Aggregator": { ai: 80, category: "primitive", dependencies: ["Smart Contract"] },
    "NFT": { ai: 20, category: "primitive", dependencies: ["ERC-721"] },
    "Protocol": { ai: 100, category: "primitive", dependencies: ["Smart Contract"] },
    "Social Graph": { ai: 120, category: "primitive", dependencies: ["Smart Contract"] },
    "Identity": { ai: 80, category: "primitive", dependencies: ["Smart Contract"] },
    "Governance": { ai: 60, category: "primitive", dependencies: ["Smart Contract"] },
    "Quadratic Funding": { ai: 100, category: "primitive", dependencies: ["Smart Contract"] },
    "Game": { ai: 150, category: "primitive", dependencies: ["Smart Contract"] },
    "Metaverse": { ai: 200, category: "primitive", dependencies: ["NFT", "Game"] },
    "TCG": { ai: 100, category: "primitive", dependencies: ["Game", "NFT"] },
    "RPG": { ai: 120, category: "primitive", dependencies: ["Game", "NFT"] },
    "Restaking": { ai: 180, category: "primitive", dependencies: ["Staking"] },
    "RWA": { ai: 150, category: "primitive", dependencies: ["ERC-20", "Oracle"] },
    "ZK Proofs": { ai: 300, category: "primitive", dependencies: ["Cryptography"] },
    "Cryptography": { ai: 200, category: "primitive", dependencies: [] },
    "Creator Tools": { ai: 80, category: "primitive", dependencies: ["Smart Contract"] },
    "Social Protocol": { ai: 150, category: "primitive", dependencies: ["Smart Contract"] },
    "Funding": { ai: 80, category: "primitive", dependencies: ["Smart Contract"] },
    "Yield Trading": { ai: 120, category: "primitive", dependencies: ["ERC-20", "Yield Farm"] },
    "Margin": { ai: 100, category: "primitive", dependencies: ["ERC-20", "Oracle"] },
    "Marketplace": { ai: 90, category: "primitive", dependencies: ["Smart Contract"] }
};

// Known successful combinations
const successfulCombinations = [
    { primitives: ["AMM", "ERC-20"], result: "Uniswap", ai: 180, tvl: 5000000000 },
    { primitives: ["Lending Pool", "Flash Loan", "Oracle"], result: "Aave", ai: 125, tvl: 4000000000 },
    { primitives: ["AMM", "Yield Farm", "ERC-20"], result: "Curve", ai: 150, tvl: 3000000000 },
    { primitives: ["Rollup", "AMM"], result: "Arbitrum DEXs", ai: 350, tvl: 2000000000 },
    { primitives: ["Oracle", "Lending Pool"], result: "Compound", ai: 75, tvl: 1500000000 },
    { primitives: ["ERC-721", "Marketplace"], result: "OpenSea", ai: 150, tvl: 500000000 },
    { primitives: ["Flash Loan", "MEV"], result: "MEV Bots", ai: 400, tvl: 100000000 },
    { primitives: ["Staking", "ERC-20"], result: "Lido", ai: 85, tvl: 30000000000 },
    { primitives: ["Identity", "ZK Proofs"], result: "Worldcoin", ai: 400, tvl: 50000000 },
    { primitives: ["Social Graph", "NFT"], result: "Lens Protocol", ai: 200, tvl: 100000000 },
    { primitives: ["Restaking", "Smart Contract"], result: "EigenLayer", ai: 300, tvl: 10000000000 },
    { primitives: ["Game", "NFT", "ERC-721"], result: "Axie Infinity", ai: 200, tvl: 2000000000 }
];

// Unexplored but promising combinations - these will appear in both timeline and alpha opportunities
const alphaOpportunities = [
    {
        primitives: ["Intent System", "L2 Rollup", "AMM"],
        name: "Intent-based Cross-L2 Trading",
        ai: 810,
        year: 2027,
        description: "Seamless trading across L2s using intent-based architecture",
        potential: "95%"
    },
    {
        primitives: ["ERC-721", "Flash Loan", "Yield Farm"],
        name: "NFT Yield Optimization",
        ai: 240,
        year: 2026,
        description: "Flash loan enabled NFT farming strategies",
        potential: "87%"
    },
    {
        primitives: ["Oracle", "Intent System", "Cross-chain Bridge"],
        name: "Cross-chain Intent Resolution",
        ai: 830,
        year: 2028,
        description: "Solve user intents across multiple chains automatically",
        potential: "92%"
    },
    {
        primitives: ["MEV Auction", "Yield Farm", "L2 Rollup"],
        name: "L2 MEV Farming",
        ai: 770,
        year: 2027,
        description: "Capture MEV opportunities in L2 yield farming",
        potential: "78%"
    },
    {
        primitives: ["Multisig", "Intent System", "Oracle"],
        name: "Autonomous DAO Execution",
        ai: 555,
        year: 2026,
        description: "DAOs that execute complex strategies autonomously",
        potential: "83%"
    }
];

// Initialize visualization
function initializeVisualization() {
    const vizElement = document.getElementById('mainViz');
    if (vizElement) {
        width = vizElement.clientWidth || 800;
    }
    
    svg = d3.select('#mainViz')
        .attr('viewBox', `0 0 ${width} ${height}`)
        .attr('preserveAspectRatio', 'xMidYMid meet');
    
    // Create groups
    linksGroup = svg.append('g').attr('class', 'links');
    nodesGroup = svg.append('g').attr('class', 'nodes');
    particlesGroup = svg.append('g').attr('class', 'particles');
    
    // Populate primitive categories
    populatePrimitiveCategories();
    
    // Initialize assembly graph
    createAssemblyGraph();
    
    // Draw initial state
    updateVisualization();
}

// Populate primitive categories in the left panel
function populatePrimitiveCategories() {
    const categories = {
        'base': 'base-primitives',
        'core': 'base-primitives',
        'tokens': 'tokens-primitives',
        'security': 'security-primitives',
        'infrastructure': 'infrastructure-primitives',
        'defi': 'defi-primitives',
        'layer2': 'layer2-primitives',
        'nft': 'nft-primitives',
        'social': 'social-primitives',
        'gaming': 'gaming-primitives',
        'emerging': 'emerging-primitives',
        'account': 'emerging-primitives',
        'primitive': 'primitive-primitives'
    };
    
    // Clear existing content
    Object.values(categories).forEach(id => {
        const element = document.getElementById(id);
        if (element) element.innerHTML = '';
    });
    
    // Populate each category
    Object.entries(primitiveData).forEach(([name, data]) => {
        const categoryId = categories[data.category];
        if (!categoryId) return;
        
        const container = document.getElementById(categoryId);
        if (!container) return;
        
        const node = document.createElement('div');
        node.className = 'primitive-node';
        node.setAttribute('data-ai', data.ai);
        node.setAttribute('data-name', name);
        
        // Truncate long names
        const displayName = name.length > 12 ? name.substring(0, 11) + '...' : name;
        
        node.innerHTML = `
            ${displayName}
            <span class="assembly-index">${data.ai >= 1000 ? (data.ai/1000).toFixed(1) + 'K' : data.ai}</span>
        `;
        
        // Add click handler
        node.addEventListener('click', function() {
            const primitiveId = this.getAttribute('data-name');
            
            if (selectedPrimitives.has(primitiveId)) {
                selectedPrimitives.delete(primitiveId);
                this.classList.remove('selected');
            } else {
                selectedPrimitives.add(primitiveId);
                this.classList.add('selected');
            }
            
            updateAnalysis();
            updateAssemblyPath();
        });
        
        container.appendChild(node);
    });
}

// Create assembly graph from primitives
function createAssemblyGraph() {
    assemblyGraph.nodes = [];
    assemblyGraph.links = [];
    
    // Add all primitives as nodes
    Object.entries(primitiveData).forEach(([name, data]) => {
        assemblyGraph.nodes.push({
            id: name,
            name: name,
            ai: data.ai,
            category: data.category,
            x: Math.random() * width,
            y: Math.random() * height
        });
    });
    
    // Add dependency links
    Object.entries(primitiveData).forEach(([name, data]) => {
        data.dependencies.forEach(dep => {
            assemblyGraph.links.push({
                source: dep,
                target: name,
                value: 1
            });
        });
    });
}

// Update visualization
function updateVisualization() {
    // Create force simulation
    const simulation = d3.forceSimulation(assemblyGraph.nodes)
        .force('link', d3.forceLink(assemblyGraph.links).id(d => d.id).distance(100))
        .force('charge', d3.forceManyBody().strength(-300))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('collision', d3.forceCollide().radius(d => Math.sqrt(d.ai) * 5));
    
    // Draw links
    const links = linksGroup.selectAll('.network-link')
        .data(assemblyGraph.links)
        .enter().append('line')
        .attr('class', 'network-link')
        .attr('stroke', 'rgba(98, 126, 234, 0.3)')
        .attr('stroke-width', 1);
    
    // Draw nodes
    const nodes = nodesGroup.selectAll('.network-node')
        .data(assemblyGraph.nodes)
        .enter().append('g')
        .attr('class', 'network-node')
        .call(drag(simulation));
    
    // Node circles
    nodes.append('circle')
        .attr('r', d => Math.min(20, Math.sqrt(d.ai) * 2))
        .attr('fill', d => {
            switch(d.category) {
                case 'base': return '#627eea';
                case 'core': return '#ff006e';
                case 'tokens': return '#8b9dc3';
                case 'security': return '#ff4444';
                case 'infrastructure': return '#00d4ff';
                case 'defi': return '#f0b90b';
                case 'layer2': return '#00ff88';
                case 'nft': return '#ff00ff';
                case 'social': return '#ffaa00';
                case 'gaming': return '#aa00ff';
                case 'emerging': return '#00ffff';
                case 'account': return '#ff8800';
                case 'primitive': return '#888888';
                default: return '#627eea';
            }
        })
        .attr('stroke', 'white')
        .attr('stroke-width', 2)
        .on('mouseover', showTooltip)
        .on('mouseout', hideTooltip)
        .on('click', togglePrimitive);
    
    // Node labels
    nodes.append('text')
        .text(d => d.name)
        .attr('text-anchor', 'middle')
        .attr('dy', -15)
        .attr('fill', 'white')
        .attr('font-size', '12px');
    
    // Assembly index labels
    nodes.append('text')
        .text(d => `AI: ${d.ai}`)
        .attr('text-anchor', 'middle')
        .attr('dy', 30)
        .attr('fill', '#f0b90b')
        .attr('font-size', '10px')
        .attr('font-weight', 'bold');
    
    // Update positions on tick
    simulation.on('tick', () => {
        links
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y);
        
        nodes
            .attr('transform', d => `translate(${d.x}, ${d.y})`);
    });
    
    // Display alpha opportunities
    displayAlphaOpportunities();
    
    // Create timeline
    createTimeline();
}

// Drag behavior
function drag(simulation) {
    function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }
    
    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }
    
    function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }
    
    return d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended);
}

// Toggle primitive selection
function togglePrimitive(event, d) {
    const primitiveNodes = document.querySelectorAll('.primitive-node');
    primitiveNodes.forEach(node => {
        if (node.getAttribute('data-name') === d.name) {
            if (selectedPrimitives.has(d.name)) {
                selectedPrimitives.delete(d.name);
                node.classList.remove('selected');
            } else {
                selectedPrimitives.add(d.name);
                node.classList.add('selected');
            }
        }
    });
    
    updateAnalysis();
    updateAssemblyPath();
}

// Update analysis metrics
function updateAnalysis() {
    let totalAI = 0;
    let sharedComponents = 0;
    
    // Calculate total AI with sharing reduction
    selectedPrimitives.forEach(name => {
        const primitive = primitiveData[name];
        if (primitive) {
            totalAI += primitive.ai;
            
            // Check for shared dependencies
            primitive.dependencies.forEach(dep => {
                if (selectedPrimitives.has(dep)) {
                    sharedComponents += primitiveData[dep].ai * 0.3; // 30% reduction for sharing
                }
            });
        }
    });
    
    const effectiveAI = Math.round(totalAI - sharedComponents);
    const complexityScore = Math.min(100, (effectiveAI / 1000) * 100);
    const innovationPotential = calculateInnovationPotential();
    
    // Update display
    document.getElementById('totalAI').textContent = effectiveAI;
    document.getElementById('selectedCount').textContent = selectedPrimitives.size;
    document.getElementById('complexityScore').textContent = complexityScore.toFixed(1);
    document.getElementById('innovationPotential').textContent = innovationPotential + '%';
    
    // Update complexity bar
    document.getElementById('complexityBar').style.width = complexityScore + '%';
}

// Calculate innovation potential
function calculateInnovationPotential() {
    if (selectedPrimitives.size === 0) return 0;
    
    let potential = 0;
    const selectedArray = Array.from(selectedPrimitives);
    
    // Check for novel combinations
    alphaOpportunities.forEach(opp => {
        const hasAll = opp.primitives.every(p => selectedPrimitives.has(p));
        if (hasAll) {
            potential = Math.max(potential, parseInt(opp.potential));
        }
    });
    
    // Check for unexplored pairs
    for (let i = 0; i < selectedArray.length; i++) {
        for (let j = i + 1; j < selectedArray.length; j++) {
            const pair = [selectedArray[i], selectedArray[j]].sort();
            const isKnown = successfulCombinations.some(combo => 
                combo.primitives.includes(pair[0]) && combo.primitives.includes(pair[1])
            );
            if (!isKnown) {
                potential += 10;
            }
        }
    }
    
    return Math.min(95, potential);
}

// Update assembly path visualization
function updateAssemblyPath() {
    const pathContainer = document.getElementById('assemblyPath');
    
    if (selectedPrimitives.size === 0) {
        pathContainer.innerHTML = '<p style="opacity: 0.7; text-align: center;">Select primitives to see assembly path</p>';
        return;
    }
    
    // Sort primitives by AI
    const sortedPrimitives = Array.from(selectedPrimitives).sort((a, b) => {
        return primitiveData[a].ai - primitiveData[b].ai;
    });
    
    let pathHTML = '';
    sortedPrimitives.forEach((primitive, index) => {
        if (index > 0) {
            pathHTML += '<div class="path-arrow">→</div>';
        }
        pathHTML += `<div class="path-step">
            <div style="text-align: center;">
                <div>${primitive}</div>
                <div style="font-size: 10px; color: #f0b90b;">AI: ${primitiveData[primitive].ai}</div>
            </div>
        </div>`;
    });
    
    pathContainer.innerHTML = pathHTML;
}


// Display alpha opportunities
function displayAlphaOpportunities() {
    const container = document.getElementById('alphaOpportunities');
    
    let html = '';
    alphaOpportunities.forEach(opp => {
        html += `
            <div class="opportunity-card" onclick="selectOpportunity(${JSON.stringify(opp.primitives)})">
                <div class="opportunity-title">${opp.name}</div>
                <div style="margin: 10px 0;">${opp.description}</div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <div style="font-size: 12px; opacity: 0.7;">Combined AI</div>
                        <div class="opportunity-ai">${opp.ai}</div>
                    </div>
                    <div style="text-align: right;">
                        <div style="font-size: 12px; opacity: 0.7;">Success Potential</div>
                        <div style="font-size: 20px; color: #00ff00;">${opp.potential}</div>
                    </div>
                </div>
                <div style="margin-top: 10px; font-size: 12px; opacity: 0.7;">
                    Primitives: ${opp.primitives.join(' + ')}
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Select opportunity primitives
window.selectOpportunity = function(primitives) {
    // Clear current selection
    selectedPrimitives.clear();
    document.querySelectorAll('.primitive-node').forEach(node => {
        node.classList.remove('selected');
    });
    
    // Select new primitives
    primitives.forEach(name => {
        selectedPrimitives.add(name);
        document.querySelectorAll('.primitive-node').forEach(node => {
            if (node.getAttribute('data-name') === name) {
                node.classList.add('selected');
            }
        });
    });
    
    updateAnalysis();
    updateAssemblyPath();
};

// Store future events globally for mining animation
let futureEventsTimelines = [];
let minedEvents = [];
let combinationMatrix = new Map();

// Create timeline visualization with multiple possibilities
function createTimeline() {
    const timelineSvg = d3.select('#timeline');
    const timelineWidth = 1200;
    const timelineHeight = 600;
    
    timelineSvg.attr('viewBox', `0 0 ${timelineWidth} ${timelineHeight}`);
    
    const historicalEvents = [
        { year: 2015, name: "Ethereum Launch", ai: 10, mined: true },
        { year: 2016, name: "The DAO", ai: 50, mined: true },
        { year: 2017, name: "ERC-20 Standard", ai: 15, mined: true },
        { year: 2018, name: "MakerDAO", ai: 100, mined: true },
        { year: 2019, name: "DeFi Summer Prep", ai: 150, mined: true },
        { year: 2020, name: "Uniswap V2", ai: 200, mined: true },
        { year: 2021, name: "L2 Rollups", ai: 250, mined: true },
        { year: 2022, name: "MEV Infrastructure", ai: 400, mined: true },
        { year: 2023, name: "Intent Protocols", ai: 500, mined: true },
        { year: 2024, name: "Cross-chain DeFi", ai: 600, mined: true },
        { year: 2025, name: "Account Abstraction", ai: 700, mined: true }
    ];
    
    // Four different future timelines with better Y-axis separation
    futureEventsTimelines = [
        // Timeline 1: AI-Dominated Future (higher Y values)
        {
            name: "AI-Dominated",
            color: "#00d4ff",
            yOffset: 2000, // Offset to prevent overlap
            events: [
                { year: 2026, name: "AI Protocol Agents", ai: 900 },
                { year: 2028, name: "Self-Optimizing Contracts", ai: 1400 },
                { year: 2030, name: "AGI Trading Systems", ai: 2300 },
                { year: 2032, name: "Autonomous DeFi Networks", ai: 3500 },
                { year: 2035, name: "Sentient Economic Zones", ai: 5000 },
                { year: 2038, name: "AI Governance Singularity", ai: 8000 },
                { year: 2040, name: "Post-Human Finance", ai: 12000 }
            ]
        },
        // Timeline 2: Quantum Future (moderate Y values)
        {
            name: "Quantum-Native",
            color: "#ff00ff",
            yOffset: 1000,
            events: [
                { year: 2026, name: "Quantum-Resistant Migration", ai: 800 },
                { year: 2028, name: "Quantum Key Distribution", ai: 1200 },
                { year: 2030, name: "Superposition Transactions", ai: 2000 },
                { year: 2033, name: "Quantum Oracle Networks", ai: 3800 },
                { year: 2036, name: "Entangled State Channels", ai: 6000 },
                { year: 2039, name: "Quantum DeFi Supremacy", ai: 9000 },
                { year: 2040, name: "Multiverse Consensus", ai: 15000 }
            ]
        },
        // Timeline 3: Cross-Chain Unification (lower-moderate Y values)
        {
            name: "Unified Ecosystem",
            color: "#00ff00",
            yOffset: -500,
            events: [
                { year: 2026, name: "Universal Bridge Protocol", ai: 850 },
                { year: 2028, name: "Chain Abstraction Layer", ai: 1300 },
                { year: 2030, name: "Omnichain Liquidity", ai: 2100 },
                { year: 2032, name: "Seamless State Migration", ai: 3200 },
                { year: 2035, name: "Unified Global Ledger", ai: 5500 },
                { year: 2037, name: "Planetary Payment Rails", ai: 7000 },
                { year: 2040, name: "Cosmic Transaction Network", ai: 11000 }
            ]
        },
        // Timeline 4: Social Coordination (lower Y values)
        {
            name: "Human-Centric",
            color: "#ffaa00",
            yOffset: -1500,
            events: [
                { year: 2026, name: "DAO Coordination Protocols", ai: 750 },
                { year: 2028, name: "Social Consensus Mechanisms", ai: 1100 },
                { year: 2030, name: "Global UBI Infrastructure", ai: 1800 },
                { year: 2033, name: "Reputation-Based Economy", ai: 3000 },
                { year: 2036, name: "Collective Intelligence DAOs", ai: 4500 },
                { year: 2039, name: "Post-Scarcity Protocols", ai: 7500 },
                { year: 2040, name: "Abundance Distribution Net", ai: 10000 }
            ]
        },
        // Timeline 5: Alpha Opportunities (showing our identified opportunities)
        {
            name: "Alpha Opportunities",
            color: "#f0b90b",
            yOffset: 0,
            events: alphaOpportunities.map(opp => ({
                year: opp.year,
                name: opp.name,
                ai: opp.ai,
                description: opp.description,
                potential: opp.potential
            }))
        }
    ];
    
    const xScale = d3.scaleLinear()
        .domain([2015, 2040])
        .range([50, timelineWidth - 50]);
    
    const yScale = d3.scaleLinear()
        .domain([0, 15000])
        .range([timelineHeight - 30, 30]);
    
    // Draw X axis
    timelineSvg.append('g')
        .attr('class', 'timeline-axis')
        .attr('transform', `translate(0, ${timelineHeight - 30})`)
        .call(d3.axisBottom(xScale).tickFormat(d3.format('d')))
        .append('text')
        .attr('x', timelineWidth / 2)
        .attr('y', 40)
        .attr('fill', 'white')
        .attr('text-anchor', 'middle')
        .style('font-size', '12px')
        .text('Year');
    
    // Draw Y axis
    timelineSvg.append('g')
        .attr('class', 'timeline-axis')
        .attr('transform', `translate(50, 0)`)
        .call(d3.axisLeft(yScale).tickFormat(d => d >= 1000 ? `${d/1000}K` : d))
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x', -timelineHeight / 2)
        .attr('y', -35)
        .attr('fill', 'white')
        .attr('text-anchor', 'middle')
        .style('font-size', '12px')
        .text('Assembly Index');
    
    // Style the axis
    timelineSvg.selectAll('.timeline-axis path, .timeline-axis line')
        .style('stroke', 'rgba(255, 255, 255, 0.3)');
    timelineSvg.selectAll('.timeline-axis text')
        .style('fill', 'rgba(255, 255, 255, 0.8)');
    
    // Add horizontal grid lines
    const yAxisGrid = d3.axisLeft(yScale)
        .tickSize(-timelineWidth + 100)
        .tickFormat('');
    
    timelineSvg.append('g')
        .attr('class', 'grid')
        .attr('transform', `translate(50, 0)`)
        .call(yAxisGrid)
        .style('stroke-dasharray', '3,3')
        .style('opacity', 0.1);
    
    // Add timeline labels
    futureEventsTimelines.forEach((timeline, index) => {
        timelineSvg.append('text')
            .attr('x', xScale(2033))
            .attr('y', 50 + index * 120)
            .attr('text-anchor', 'middle')
            .attr('fill', timeline.color)
            .attr('font-size', '12px')
            .attr('font-weight', 'bold')
            .attr('opacity', 0.8)
            .text(timeline.name);
    });
    
    // Add future zone background
    const futureZone = timelineSvg.append('rect')
        .attr('class', 'future-zone')
        .attr('x', xScale(2026))
        .attr('y', 0)
        .attr('width', xScale(2040) - xScale(2026))
        .attr('height', timelineHeight - 30)
        .attr('fill', 'rgba(98, 126, 234, 0.05)')
        .attr('stroke', 'rgba(98, 126, 234, 0.3)')
        .attr('stroke-dasharray', '5,5');
    
    // Draw historical line
    const line = d3.line()
        .x(d => xScale(d.year))
        .y(d => yScale(d.ai))
        .curve(d3.curveMonotoneX);
    
    const historicalPath = timelineSvg.append('path')
        .datum(historicalEvents)
        .attr('class', 'historical-line')
        .attr('fill', 'none')
        .attr('stroke', '#627eea')
        .attr('stroke-width', 3)
        .attr('d', line);
    
    // Create groups for each timeline
    futureEventsTimelines.forEach((timeline, index) => {
        const group = timelineSvg.append('g')
            .attr('class', `timeline-group timeline-${index}`)
            .attr('opacity', 0.3);
        
        // Add connecting line from last historical point
        const lastHistorical = historicalEvents[historicalEvents.length - 1];
        const connectionLine = group.append('line')
            .attr('class', 'connection-line')
            .attr('x1', xScale(lastHistorical.year))
            .attr('y1', yScale(lastHistorical.ai))
            .attr('x2', xScale(timeline.events[0].year))
            .attr('y2', yScale(timeline.events[0].ai + (timeline.yOffset || 0)))
            .attr('stroke', timeline.color)
            .attr('stroke-width', 1)
            .attr('stroke-dasharray', '3,3')
            .attr('opacity', 0);
        
        // Future path for this timeline
        const futurePath = group.append('path')
            .attr('class', `future-path future-path-${index}`)
            .attr('fill', 'none')
            .attr('stroke', timeline.color)
            .attr('stroke-width', 2)
            .attr('stroke-dasharray', '5,5')
            .attr('opacity', 0);
        
        // Future points
        timeline.events.forEach(event => {
            group.append('circle')
                .attr('class', `future-point timeline-${index}-year-${event.year}`)
                .attr('cx', xScale(event.year))
                .attr('cy', yScale(event.ai + (timeline.yOffset || 0)))
                .attr('r', 0)
                .attr('fill', timeline.color)
                .attr('opacity', 0)
                .on('mouseover', function(e) {
                    const d = e.target.__data__ || event;
                    showTooltip(e, {
                        name: event.name,
                        ai: event.ai,
                        year: event.year,
                        status: timeline.name,
                        description: event.description,
                        potential: event.potential
                    });
                })
                .on('mouseout', hideTooltip);
        });
    });
    
    // Draw historical points
    timelineSvg.selectAll('.historical-point')
        .data(historicalEvents)
        .enter().append('circle')
        .attr('class', 'historical-point')
        .attr('cx', d => xScale(d.year))
        .attr('cy', d => yScale(d.ai))
        .attr('r', 6)
        .attr('fill', '#f0b90b')
        .on('mouseover', function(event, d) {
            showTooltip(event, {
                name: d.name,
                ai: d.ai,
                year: d.year,
                status: 'Historical'
            });
        })
        .on('mouseout', hideTooltip);
}

// Evolution simulation with timeline mining
window.runEvolutionSimulation = function() {
    // Show progress bar and hide run button
    const runBtn = document.getElementById('runSimBtn');
    const progressContainer = document.getElementById('progressContainer');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    
    runBtn.style.display = 'none';
    progressContainer.style.display = 'block';
    
    let progress = 0;
    const totalSteps = 100;
    
    // Update progress function
    function updateProgress(value, text = null) {
        progress = Math.min(value, 100);
        progressBar.style.width = progress + '%';
        progressText.textContent = text || progress + '%';
    }
    
    const particles = [];
    const numParticles = 50;
    
    // Create evolution particles
    for (let i = 0; i < numParticles; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            primitive: Object.keys(primitiveData)[Math.floor(Math.random() * Object.keys(primitiveData).length)],
            life: 1000
        });
    }
    
    updateProgress(10, 'Starting simulation...');
    
    // Start mining future events
    setTimeout(() => {
        updateProgress(20, 'Mining timeline events...');
        mineTimelineEvents();
    }, 500);
    
    // Start building combination matrix
    setTimeout(() => {
        updateProgress(40, 'Building combination matrix...');
        buildCombinationMatrix();
    }, 1500);
    
    // Auto-run optimal combinations search after delay
    setTimeout(() => {
        updateProgress(60, 'Finding optimal combinations...');
        findOptimalCombinations();
    }, 3000);
    
    // Auto-run predictions after delay
    setTimeout(() => {
        updateProgress(80, 'Predicting next primitives...');
        predictNextPrimitives();
    }, 6000);
    
    // Complete simulation
    setTimeout(() => {
        updateProgress(100, 'Simulation complete!');
        setTimeout(() => {
            progressContainer.style.display = 'none';
            runBtn.style.display = 'block';
        }, 1500);
    }, 8000);
    
    // Animate particles
    const interval = setInterval(() => {
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.life--;
            
            // Bounce off walls
            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;
        });
        
        // Remove dead particles
        for (let i = particles.length - 1; i >= 0; i--) {
            if (particles[i].life <= 0) {
                particles.splice(i, 1);
            }
        }
        
        // Update visualization
        const dots = particlesGroup.selectAll('.evolution-particle')
            .data(particles);
        
        dots.enter().append('circle')
            .attr('class', 'evolution-particle')
            .attr('r', 3)
            .attr('fill', '#00d4ff')
            .attr('opacity', 0.8);
        
        dots
            .attr('cx', d => d.x)
            .attr('cy', d => d.y)
            .attr('opacity', d => d.life / 1000);
        
        dots.exit().remove();
        
        if (particles.length === 0) {
            clearInterval(interval);
        }
    }, 50);
};

// Mine timeline events animation with multiple timelines
function mineTimelineEvents() {
    const timelineSvg = d3.select('#timeline');
    const timelineWidth = 1200;
    const timelineHeight = 600;
    
    const xScale = d3.scaleLinear()
        .domain([2015, 2040])
        .range([50, timelineWidth - 50]);
    
    const yScale = d3.scaleLinear()
        .domain([0, 15000])
        .range([timelineHeight - 30, 30]);
    
    const line = d3.line()
        .x(d => xScale(d.year))
        .y(d => yScale(d.ai))
        .curve(d3.curveMonotoneX);
    
    let eventIndex = 0;
    const maxEvents = Math.max(...futureEventsTimelines.map(t => t.events.length));
    
    // Mining animation interval
    const miningInterval = setInterval(() => {
        if (eventIndex >= maxEvents) {
            clearInterval(miningInterval);
            showMiningComplete();
            return;
        }
        
        // Mine events from all timelines at this index
        futureEventsTimelines.forEach((timeline, timelineIndex) => {
            if (eventIndex < timeline.events.length) {
                const event = timeline.events[eventIndex];
                const group = timelineSvg.select(`.timeline-${timelineIndex}`);
                
                // Animate timeline becoming more visible
                group.transition()
                    .duration(500)
                    .attr('opacity', 0.8);
                
                // Show connection line
                group.select('.connection-line')
                    .transition()
                    .duration(500)
                    .attr('opacity', 1);
                
                // Animate the point appearing
                const futurePoint = group.select(`.timeline-${timelineIndex}-year-${event.year}`)
                    .transition()
                    .duration(500)
                    .attr('r', 8)
                    .attr('opacity', 1)
                    .transition()
                    .duration(300)
                    .attr('r', 5);
                
                // Add mining effect
                const miningEffect = timelineSvg.append('circle')
                    .attr('cx', xScale(event.year))
                    .attr('cy', yScale(event.ai + (timeline.yOffset || 0)))
                    .attr('r', 5)
                    .attr('fill', 'none')
                    .attr('stroke', timeline.color)
                    .attr('stroke-width', 2)
                    .attr('opacity', 1);
                
                miningEffect.transition()
                    .duration(1000)
                    .attr('r', 30)
                    .attr('opacity', 0)
                    .remove();
                
                // Update the path with offset
                const pathData = timeline.events.slice(0, eventIndex + 1).map(e => ({
                    ...e,
                    ai: e.ai + (timeline.yOffset || 0)
                }));
                if (pathData.length > 1) {
                    group.select(`.future-path-${timelineIndex}`)
                        .datum(pathData)
                        .attr('opacity', 1)
                        .transition()
                        .duration(500)
                        .attr('d', line);
                }
                
                // Add event label for key events
                if (event.year % 4 === 0 || timeline.name === 'Alpha Opportunities') {
                    const label = timelineSvg.append('text')
                        .attr('x', xScale(event.year))
                        .attr('y', yScale(event.ai + (timeline.yOffset || 0)) - 15)
                        .attr('text-anchor', 'middle')
                        .attr('fill', timeline.color)
                        .attr('font-size', '9px')
                        .attr('opacity', 0)
                        .text(event.name);
                    
                    label.transition()
                        .duration(500)
                        .attr('opacity', 0.8)
                        .transition()
                        .delay(3000)
                        .duration(500)
                        .attr('opacity', 0.3);
                }
            }
        });
        
        // Update future zone
        const nextYear = 2026 + (eventIndex + 1) * 2;
        if (nextYear <= 2040) {
            timelineSvg.select('.future-zone')
                .transition()
                .duration(500)
                .attr('x', xScale(nextYear));
        }
        
        eventIndex++;
    }, 1200); // Mine events every 1.2 seconds
}

// Show mining completion effect
function showMiningComplete() {
    const timelineSvg = d3.select('#timeline');
    
    // Remove future zone
    timelineSvg.select('.future-zone')
        .transition()
        .duration(1000)
        .attr('opacity', 0)
        .remove();
    
    // Add completion pulse
    const timelineWidth = 1200;
    const timelineHeight = 600;
    const pulse = timelineSvg.append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', timelineWidth)
        .attr('height', timelineHeight)
        .attr('fill', '#00d4ff')
        .attr('opacity', 0);
    
    pulse.transition()
        .duration(500)
        .attr('opacity', 0.2)
        .transition()
        .duration(500)
        .attr('opacity', 0)
        .remove();
}

// Build combination matrix progressively
function buildCombinationMatrix() {
    const matrixContainer = document.getElementById('combinationMatrix');
    matrixContainer.innerHTML = ''; // Clear existing content
    
    const primitiveNames = Object.keys(primitiveData);
    const numPrimitives = primitiveNames.length; // Should be 16
    
    // Create progress indicator
    const progressDiv = document.createElement('div');
    progressDiv.style.cssText = 'text-align: center; margin-bottom: 10px; color: #f0b90b;';
    progressDiv.innerHTML = '<span id="matrixProgress">Mining combinations: 0%</span>';
    matrixContainer.appendChild(progressDiv);
    
    // Create wrapper for the matrix
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'overflow: auto; max-height: 500px; border: 1px solid rgba(98, 126, 234, 0.3); border-radius: 10px; padding: 10px;';
    
    // Create the matrix grid
    const grid = document.createElement('div');
    grid.style.cssText = `
        display: grid;
        grid-template-columns: 100px repeat(${numPrimitives}, 40px);
        grid-template-rows: 80px repeat(${numPrimitives}, 40px);
        gap: 1px;
        background: rgba(98, 126, 234, 0.1);
        padding: 1px;
    `;
    
    // Add empty corner cell
    const cornerCell = document.createElement('div');
    cornerCell.style.cssText = 'background: #0a0a0a;';
    grid.appendChild(cornerCell);
    
    // Add column headers
    primitiveNames.forEach((name, index) => {
        const header = document.createElement('div');
        header.style.cssText = `
            background: #0a0a0a;
            color: #627eea;
            font-size: 9px;
            display: flex;
            align-items: end;
            justify-content: center;
            padding: 5px 2px;
            text-align: center;
            writing-mode: vertical-rl;
            text-orientation: mixed;
        `;
        header.textContent = name;
        grid.appendChild(header);
    });
    
    // Add rows with headers and cells
    primitiveNames.forEach((rowName, rowIndex) => {
        // Row header
        const rowHeader = document.createElement('div');
        rowHeader.style.cssText = `
            background: #0a0a0a;
            color: #627eea;
            font-size: 10px;
            display: flex;
            align-items: center;
            padding: 0 5px;
            text-align: right;
        `;
        rowHeader.textContent = rowName;
        grid.appendChild(rowHeader);
        
        // Row cells
        primitiveNames.forEach((colName, colIndex) => {
            const cell = document.createElement('div');
            cell.className = `matrix-cell cell-${rowIndex}-${colIndex}`;
            cell.dataset.row = rowName;
            cell.dataset.col = colName;
            cell.dataset.rowIndex = rowIndex;
            cell.dataset.colIndex = colIndex;
            
            cell.style.cssText = `
                background: rgba(0, 0, 0, 0.5);
                border: 1px solid rgba(98, 126, 234, 0.2);
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                position: relative;
                overflow: hidden;
            `;
            
            // Cell content
            const content = document.createElement('div');
            content.className = 'cell-content';
            content.style.cssText = 'font-size: 16px; font-weight: bold; opacity: 0; transition: opacity 0.3s;';
            
            if (rowIndex === colIndex) {
                cell.style.background = 'rgba(98, 126, 234, 0.2)';
                content.textContent = '—';
                content.style.opacity = '1';
            } else {
                content.textContent = '?';
            }
            
            cell.appendChild(content);
            grid.appendChild(cell);
        });
    });
    
    wrapper.appendChild(grid);
    matrixContainer.appendChild(wrapper);
    
    // Mining animation
    let currentCell = 0;
    const totalCells = numPrimitives * numPrimitives;
    const miningSpeed = 15; // milliseconds per cell
    
    // Create mining effect
    function mineCell(rowIndex, colIndex) {
        if (rowIndex === colIndex) return; // Skip diagonal
        
        const cell = document.querySelector(`.cell-${rowIndex}-${colIndex}`);
        if (!cell) return;
        
        const rowName = primitiveNames[rowIndex];
        const colName = primitiveNames[colIndex];
        const content = cell.querySelector('.cell-content');
        
        // Add mining pulse effect
        const pulse = document.createElement('div');
        pulse.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(240, 185, 11, 0.8), transparent);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            animation: pulse 0.5s ease-out;
        `;
        cell.appendChild(pulse);
        
        setTimeout(() => pulse.remove(), 500);
        
        // Calculate viability
        const viability = calculateCombinationViability(rowName, colName);
        
        // Update cell based on viability
        if (viability > 0.7) {
            cell.style.background = 'rgba(0, 255, 0, 0.3)';
            content.textContent = '✓';
            content.style.color = '#00ff00';
        } else if (viability > 0.4) {
            cell.style.background = 'rgba(255, 255, 0, 0.2)';
            content.textContent = '~';
            content.style.color = '#ffff00';
        } else {
            cell.style.background = 'rgba(255, 0, 0, 0.1)';
            content.textContent = '✗';
            content.style.color = '#ff0000';
        }
        
        content.style.opacity = '1';
        
        // Add hover effect
        cell.onmouseenter = function(e) {
            const tooltip = document.getElementById('tooltip');
            tooltip.style.display = 'block';
            tooltip.style.left = e.pageX + 10 + 'px';
            tooltip.style.top = e.pageY - 60 + 'px';
            tooltip.innerHTML = `
                <strong>${rowName} + ${colName}</strong><br>
                Combined AI: ${primitiveData[rowName].ai + primitiveData[colName].ai}<br>
                Viability: ${(viability * 100).toFixed(0)}%<br>
                ${viability > 0.7 ? 'High potential combination!' : 
                  viability > 0.4 ? 'Moderate potential' : 'Low compatibility'}
            `;
        };
        
        cell.onmouseleave = function() {
            document.getElementById('tooltip').style.display = 'none';
        };
    }
    
    // Start mining
    const miningInterval = setInterval(() => {
        const row = Math.floor(currentCell / numPrimitives);
        const col = currentCell % numPrimitives;
        
        mineCell(row, col);
        
        currentCell++;
        const progress = Math.floor((currentCell / totalCells) * 100);
        document.getElementById('matrixProgress').textContent = `Mining combinations: ${progress}%`;
        
        if (currentCell >= totalCells) {
            clearInterval(miningInterval);
            document.getElementById('matrixProgress').textContent = `Mining complete: ${totalCells} combinations analyzed`;
            document.getElementById('matrixProgress').style.color = '#00d4ff';
        }
    }, miningSpeed);
    
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
            100% { transform: translate(-50%, -50%) scale(3); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// Calculate combination viability
function calculateCombinationViability(primitive1, primitive2) {
    const p1 = primitiveData[primitive1];
    const p2 = primitiveData[primitive2];
    
    // Check for known successful combinations
    const isKnownSuccess = successfulCombinations.some(combo => 
        combo.primitives.includes(primitive1) && combo.primitives.includes(primitive2)
    );
    
    if (isKnownSuccess) return 0.9;
    
    // Check for dependency relationships
    if (p1.dependencies.includes(primitive2) || p2.dependencies.includes(primitive1)) {
        return 0.8;
    }
    
    // Check category compatibility
    const categoryScores = {
        'base-base': 0.5,
        'base-protocol': 0.7,
        'base-defi': 0.6,
        'base-advanced': 0.4,
        'protocol-protocol': 0.6,
        'protocol-defi': 0.8,
        'protocol-advanced': 0.7,
        'defi-defi': 0.7,
        'defi-advanced': 0.8,
        'advanced-advanced': 0.6
    };
    
    const key = [p1.category, p2.category].sort().join('-');
    return categoryScores[key] || 0.3;
}

// Find optimal combinations
window.findOptimalCombinations = function() {
    const combinations = [];
    const primitiveNames = Object.keys(primitiveData);
    
    // Generate all possible combinations (up to 3 primitives)
    for (let i = 0; i < primitiveNames.length; i++) {
        for (let j = i + 1; j < primitiveNames.length; j++) {
            const combo = [primitiveNames[i], primitiveNames[j]];
            const totalAI = combo.reduce((sum, p) => sum + primitiveData[p].ai, 0);
            
            // Check if combination is novel
            const isNovel = !successfulCombinations.some(known => 
                known.primitives.every(p => combo.includes(p))
            );
            
            if (isNovel && totalAI < 300) {
                combinations.push({
                    primitives: combo,
                    ai: totalAI,
                    novelty: Math.random() * 100
                });
            }
            
            // Three-primitive combinations
            for (let k = j + 1; k < primitiveNames.length; k++) {
                const combo3 = [primitiveNames[i], primitiveNames[j], primitiveNames[k]];
                const totalAI3 = combo3.reduce((sum, p) => sum + primitiveData[p].ai, 0);
                
                if (totalAI3 < 500) {
                    combinations.push({
                        primitives: combo3,
                        ai: totalAI3,
                        novelty: Math.random() * 100
                    });
                }
            }
        }
    }
    
    // Sort by novelty and AI balance
    combinations.sort((a, b) => (b.novelty / b.ai) - (a.novelty / a.ai));
    
    // Highlight top combinations
    const top3 = combinations.slice(0, 3);
    console.log('Top optimal combinations:', top3);
    
    // Animate discovery
    top3.forEach((combo, index) => {
        setTimeout(() => {
            selectOpportunity(combo.primitives);
        }, index * 1000);
    });
};

// Predict next primitives
window.predictNextPrimitives = function() {
    const predictions = [
        { name: "Account Abstraction", ai: 150, probability: 0.9 },
        { name: "Native Staking Derivatives", ai: 180, probability: 0.85 },
        { name: "Decentralized Sequencers", ai: 350, probability: 0.7 },
        { name: "Atomic Cross-chain Swaps", ai: 400, probability: 0.6 },
        { name: "ZK Coprocessors", ai: 450, probability: 0.5 }
    ];
    
    // Add predictions to alpha opportunities section
    const predictedContainer = document.getElementById('predictedPrimitives');
    
    predictedContainer.innerHTML = `
        <h4 style="color: #00d4ff; margin-bottom: 20px;">Predicted Next Primitives</h4>
        ${predictions.map(p => `
            <div class="opportunity-card" style="border-color: rgba(0, 212, 255, 0.5);">
                <div class="opportunity-title" style="color: #00d4ff;">${p.name}</div>
                <div style="margin: 10px 0; font-size: 14px; opacity: 0.8;">Next-generation primitive with emerging adoption patterns</div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <div style="font-size: 12px; opacity: 0.7;">Predicted AI</div>
                        <div class="opportunity-ai">${p.ai}</div>
                    </div>
                    <div style="text-align: right;">
                        <div style="font-size: 12px; opacity: 0.7;">Emergence Probability</div>
                        <div style="font-size: 20px; color: ${p.probability > 0.7 ? '#00ff00' : '#f0b90b'};">
                            ${(p.probability * 100).toFixed(0)}%
                        </div>
                    </div>
                </div>
            </div>
        `).join('')}
    `;
    
    // Animate the appearance
    predictedContainer.style.opacity = '0';
    predictedContainer.style.transform = 'translateY(20px)';
    setTimeout(() => {
        predictedContainer.style.transition = 'all 0.5s ease';
        predictedContainer.style.opacity = '1';
        predictedContainer.style.transform = 'translateY(0)';
    }, 100);
};

// Reset analysis
window.resetAnalysis = function() {
    // Clear selections
    selectedPrimitives.clear();
    document.querySelectorAll('.primitive-node').forEach(node => {
        node.classList.remove('selected');
    });
    
    // Clear combination matrix
    const matrixContainer = document.getElementById('combinationMatrix');
    matrixContainer.innerHTML = '';
    
    // Clear mined events
    minedEvents = [];
    
    // Reset timeline
    const timelineSvg = d3.select('#timeline');
    timelineSvg.selectAll('*').remove();
    createTimeline();
    
    // Update analysis
    updateAnalysis();
    updateAssemblyPath();
};

// Tooltip functions
function showTooltip(event, d) {
    const tooltip = document.getElementById('tooltip');
    tooltip.style.display = 'block';
    tooltip.style.left = event.pageX + 10 + 'px';
    tooltip.style.top = event.pageY + 10 + 'px';
    
    if (d.year) {
        tooltip.innerHTML = `
            <h4 style="margin: 0 0 10px 0; color: #627eea;">${d.name}</h4>
            <p style="margin: 5px 0;">Year: ${d.year}</p>
            <p style="margin: 5px 0;">Assembly Index: ${d.ai}</p>
            ${d.status ? `<p style="margin: 5px 0;">Timeline: ${d.status}</p>` : ''}
            ${d.description ? `<p style="margin: 5px 0;">${d.description}</p>` : ''}
            ${d.potential ? `<p style="margin: 5px 0;">Success Potential: ${d.potential}</p>` : ''}
        `;
    } else {
        const primitive = primitiveData[d.name];
        tooltip.innerHTML = `
            <h4 style="margin: 0 0 10px 0; color: #627eea;">${d.name}</h4>
            <p style="margin: 5px 0;">Assembly Index: ${d.ai}</p>
            <p style="margin: 5px 0;">Category: ${d.category}</p>
            ${primitive && primitive.dependencies.length > 0 ? 
                `<p style="margin: 5px 0;">Dependencies: ${primitive.dependencies.join(', ')}</p>` : ''}
        `;
    }
}

function hideTooltip() {
    document.getElementById('tooltip').style.display = 'none';
}

// Format number helper
function formatNumber(num) {
    if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
    return num.toString();
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    initializeVisualization();
    
    // Select a few key primitives to start
    const defaultPrimitives = ['Smart Contract', 'ERC-20', 'AMM', 'Uniswap', 'Aave', 'Arbitrum'];
    defaultPrimitives.forEach(name => {
        if (primitiveData[name]) {
            selectedPrimitives.add(name);
        }
    });
    
    // Mark default primitive nodes as selected
    setTimeout(() => {
        defaultPrimitives.forEach(name => {
            document.querySelectorAll('.primitive-node').forEach(node => {
                if (node.getAttribute('data-name') === name) {
                    node.classList.add('selected');
                }
            });
        });
        
        // Initial analysis
        updateAnalysis();
        updateAssemblyPath();
    }, 100);
});