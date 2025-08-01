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

// Assembly Index calculations
const primitiveData = {
    // Base layer
    "Account": { ai: 1, category: "base", dependencies: [] },
    "Transaction": { ai: 2, category: "base", dependencies: ["Account"] },
    "Block": { ai: 3, category: "base", dependencies: ["Transaction"] },
    "Smart Contract": { ai: 5, category: "base", dependencies: ["Account", "Transaction"] },
    
    // Protocol layer
    "ERC-20": { ai: 15, category: "protocol", dependencies: ["Smart Contract"] },
    "ERC-721": { ai: 20, category: "protocol", dependencies: ["Smart Contract"] },
    "Multisig": { ai: 25, category: "protocol", dependencies: ["Smart Contract", "Transaction"] },
    "Oracle": { ai: 30, category: "protocol", dependencies: ["Smart Contract"] },
    
    // DeFi primitives
    "AMM": { ai: 60, category: "defi", dependencies: ["ERC-20", "Smart Contract"] },
    "Lending Pool": { ai: 80, category: "defi", dependencies: ["ERC-20", "Oracle", "Smart Contract"] },
    "Flash Loan": { ai: 100, category: "defi", dependencies: ["Lending Pool", "Transaction"] },
    "Yield Farm": { ai: 120, category: "defi", dependencies: ["AMM", "ERC-20"] },
    
    // Advanced systems
    "L2 Rollup": { ai: 250, category: "advanced", dependencies: ["Block", "Smart Contract", "Transaction"] },
    "Cross-chain Bridge": { ai: 300, category: "advanced", dependencies: ["Oracle", "Multisig", "Smart Contract"] },
    "MEV Auction": { ai: 400, category: "advanced", dependencies: ["Block", "Transaction", "Flash Loan"] },
    "Intent System": { ai: 500, category: "advanced", dependencies: ["Oracle", "Smart Contract", "MEV Auction"] }
};

// Known successful combinations
const successfulCombinations = [
    { primitives: ["AMM", "ERC-20"], result: "Uniswap", ai: 75, tvl: 5000000000 },
    { primitives: ["Lending Pool", "Flash Loan"], result: "Aave", ai: 180, tvl: 4000000000 },
    { primitives: ["AMM", "Yield Farm", "ERC-20"], result: "Curve", ai: 200, tvl: 3000000000 },
    { primitives: ["L2 Rollup", "AMM"], result: "Arbitrum DEXs", ai: 310, tvl: 2000000000 },
    { primitives: ["Oracle", "Lending Pool"], result: "Compound", ai: 110, tvl: 1500000000 },
    { primitives: ["ERC-721", "AMM"], result: "NFT Marketplaces", ai: 80, tvl: 500000000 },
    { primitives: ["Flash Loan", "MEV Auction"], result: "MEV Bots", ai: 500, tvl: 100000000 }
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
    
    // Initialize assembly graph
    createAssemblyGraph();
    
    // Draw initial state
    updateVisualization();
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
        .attr('r', d => Math.sqrt(d.ai) * 2)
        .attr('fill', d => {
            switch(d.category) {
                case 'base': return '#627eea';
                case 'protocol': return '#8b9dc3';
                case 'defi': return '#f0b90b';
                case 'advanced': return '#00d4ff';
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
    const primitiveNames = Object.keys(primitiveData);
    
    // Create wrapper for scrolling
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'overflow-x: auto; overflow-y: auto; max-height: 600px; max-width: 100%;';
    
    // Create matrix structure
    const table = document.createElement('table');
    table.style.cssText = 'border-collapse: collapse; margin-top: 20px; min-width: 100%;';
    
    // Header row
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = '<th style="border: 1px solid #627eea; padding: 5px; position: sticky; left: 0; background: #0a0a0a; z-index: 1;"></th>';
    primitiveNames.forEach(name => {
        const th = document.createElement('th');
        th.style.cssText = 'border: 1px solid #627eea; padding: 5px; font-size: 10px; transform: rotate(-45deg); white-space: nowrap; height: 100px; vertical-align: bottom;';
        th.textContent = name;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);
    
    // Create rows
    primitiveNames.forEach((rowName, rowIndex) => {
        const row = document.createElement('tr');
        const rowHeader = document.createElement('th');
        rowHeader.style.cssText = 'border: 1px solid #627eea; padding: 5px; font-size: 10px; text-align: left; position: sticky; left: 0; background: #0a0a0a; z-index: 1;';
        rowHeader.textContent = rowName;
        row.appendChild(rowHeader);
        
        primitiveNames.forEach((colName, colIndex) => {
            const cell = document.createElement('td');
            cell.style.cssText = 'border: 1px solid rgba(98, 126, 234, 0.2); width: 40px; height: 40px; text-align: center; position: relative; cursor: pointer;';
            cell.className = `matrix-cell cell-${rowIndex}-${colIndex}`;
            cell.dataset.row = rowName;
            cell.dataset.col = colName;
            
            if (rowIndex === colIndex) {
                cell.style.background = 'rgba(98, 126, 234, 0.1)';
                cell.innerHTML = '<div class="cell-content">—</div>';
            } else {
                cell.innerHTML = '<div class="cell-content" style="opacity: 0; font-size: 14px;">?</div>';
            }
            
            row.appendChild(cell);
        });
        
        table.appendChild(row);
    });
    
    wrapper.appendChild(table);
    matrixContainer.appendChild(wrapper);
    
    // Progressively reveal ALL combinations
    let cellIndex = 0;
    const totalCells = primitiveNames.length * primitiveNames.length;
    const revealBatchSize = 5; // Reveal 5 cells at a time for faster coverage
    
    const revealInterval = setInterval(() => {
        if (cellIndex >= totalCells) {
            clearInterval(revealInterval);
            // Add completion indicator
            const completeMsg = document.createElement('div');
            completeMsg.style.cssText = 'text-align: center; margin-top: 10px; color: #00d4ff; font-size: 14px;';
            completeMsg.textContent = 'Full design space explored: ' + totalCells + ' combinations analyzed';
            matrixContainer.appendChild(completeMsg);
            return;
        }
        
        // Reveal multiple cells at once
        for (let i = 0; i < revealBatchSize && cellIndex < totalCells; i++) {
            const row = Math.floor(cellIndex / primitiveNames.length);
            const col = cellIndex % primitiveNames.length;
            
            if (row !== col) {
                const cell = document.querySelector(`.cell-${row}-${col}`);
                const rowName = primitiveNames[row];
                const colName = primitiveNames[col];
                
                // Calculate combination viability
                const viability = calculateCombinationViability(rowName, colName);
                const content = cell.querySelector('.cell-content');
                
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
                
                content.style.transition = 'opacity 0.3s';
                content.style.opacity = '1';
                
                // Add hover effect
                cell.addEventListener('mouseenter', function() {
                    const tooltip = document.getElementById('tooltip');
                    tooltip.style.display = 'block';
                    tooltip.style.left = this.getBoundingClientRect().left + 'px';
                    tooltip.style.top = (this.getBoundingClientRect().top - 60) + 'px';
                    tooltip.innerHTML = `
                        <strong>${rowName} + ${colName}</strong><br>
                        Combined AI: ${primitiveData[rowName].ai + primitiveData[colName].ai}<br>
                        Viability: ${(viability * 100).toFixed(0)}%
                    `;
                });
                
                cell.addEventListener('mouseleave', function() {
                    document.getElementById('tooltip').style.display = 'none';
                });
            }
        
            cellIndex++;
        }
    }, 20); // Faster reveal with batch processing
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
    
    // Re-select all primitives
    Object.keys(primitiveData).forEach(name => {
        selectedPrimitives.add(name);
    });
    document.querySelectorAll('.primitive-node').forEach(node => {
        node.classList.add('selected');
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
    
    // Select all primitives by default
    Object.keys(primitiveData).forEach(name => {
        selectedPrimitives.add(name);
    });
    
    // Mark all primitive nodes as selected
    document.querySelectorAll('.primitive-node').forEach(node => {
        node.classList.add('selected');
    });
    
    // Set up primitive node click handlers
    document.querySelectorAll('.primitive-node').forEach(node => {
        node.addEventListener('click', function() {
            const name = this.getAttribute('data-name');
            
            if (selectedPrimitives.has(name)) {
                selectedPrimitives.delete(name);
                this.classList.remove('selected');
            } else {
                selectedPrimitives.add(name);
                this.classList.add('selected');
            }
            
            updateAnalysis();
            updateAssemblyPath();
        });
    });
    
    // Initial analysis with all primitives selected
    updateAnalysis();
    updateAssemblyPath();
});