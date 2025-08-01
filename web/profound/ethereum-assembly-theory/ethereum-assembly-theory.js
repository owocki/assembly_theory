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

// Unexplored but promising combinations
const alphaOpportunities = [
    {
        primitives: ["Intent System", "L2 Rollup", "AMM"],
        name: "Intent-based Cross-L2 Trading",
        ai: 810,
        description: "Seamless trading across L2s using intent-based architecture",
        potential: "95%"
    },
    {
        primitives: ["ERC-721", "Flash Loan", "Yield Farm"],
        name: "NFT Yield Optimization",
        ai: 240,
        description: "Flash loan enabled NFT farming strategies",
        potential: "87%"
    },
    {
        primitives: ["Oracle", "Intent System", "Cross-chain Bridge"],
        name: "Cross-chain Intent Resolution",
        ai: 830,
        description: "Solve user intents across multiple chains automatically",
        potential: "92%"
    },
    {
        primitives: ["MEV Auction", "Yield Farm", "L2 Rollup"],
        name: "L2 MEV Farming",
        ai: 770,
        description: "Capture MEV opportunities in L2 yield farming",
        potential: "78%"
    },
    {
        primitives: ["Multisig", "Intent System", "Oracle"],
        name: "Autonomous DAO Execution",
        ai: 555,
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
    
    // Update network metrics
    updateNetworkMetrics();
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

// Update network metrics
function updateNetworkMetrics() {
    const composability = calculateComposability();
    const integrationPoints = countIntegrationPoints();
    const tvlCorrelation = calculateTVLCorrelation();
    
    document.getElementById('composabilityScore').textContent = composability.toFixed(1);
    document.getElementById('integrationPoints').textContent = integrationPoints;
    document.getElementById('tvlCorrelation').textContent = '$' + formatNumber(tvlCorrelation);
}

// Calculate composability score
function calculateComposability() {
    if (selectedPrimitives.size === 0) return 0;
    
    let score = 0;
    selectedPrimitives.forEach(name => {
        const primitive = primitiveData[name];
        // Higher score for primitives with more dependencies (more composable)
        score += primitive.dependencies.length * 10;
        
        // Bonus for selecting dependencies
        primitive.dependencies.forEach(dep => {
            if (selectedPrimitives.has(dep)) {
                score += 15;
            }
        });
    });
    
    return Math.min(100, score);
}

// Count integration points
function countIntegrationPoints() {
    let count = 0;
    selectedPrimitives.forEach(name => {
        const primitive = primitiveData[name];
        primitive.dependencies.forEach(dep => {
            if (selectedPrimitives.has(dep)) {
                count++;
            }
        });
    });
    return count;
}

// Calculate TVL correlation
function calculateTVLCorrelation() {
    let tvl = 0;
    
    // Check if selection matches known successful combinations
    successfulCombinations.forEach(combo => {
        const hasAll = combo.primitives.every(p => selectedPrimitives.has(p));
        if (hasAll) {
            tvl = Math.max(tvl, combo.tvl);
        }
    });
    
    // Estimate TVL for novel combinations
    if (tvl === 0 && selectedPrimitives.size > 0) {
        const totalAI = Array.from(selectedPrimitives).reduce((sum, p) => sum + primitiveData[p].ai, 0);
        tvl = totalAI * 1000000 * Math.random(); // Rough estimate
    }
    
    return tvl;
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
let futureEvents = [];
let minedEvents = [];

// Create timeline visualization
function createTimeline() {
    const timelineSvg = d3.select('#timeline');
    const timelineWidth = 1200;
    const timelineHeight = 200;
    
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
    
    // Future events to be "mined"
    futureEvents = [
        { year: 2026, name: "Quantum-Resistant Ethereum", ai: 900, mined: false },
        { year: 2027, name: "AI-Driven Protocol Optimization", ai: 1100, mined: false },
        { year: 2028, name: "Decentralized AGI Coordination", ai: 1400, mined: false },
        { year: 2029, name: "Multi-Chain State Synthesis", ai: 1800, mined: false },
        { year: 2030, name: "Universal DeFi Liquidity Layer", ai: 2300, mined: false },
        { year: 2032, name: "Autonomous Economic Zones", ai: 3000, mined: false },
        { year: 2034, name: "Planetary Consensus Protocol", ai: 4000, mined: false },
        { year: 2036, name: "Time-Dilated Smart Contracts", ai: 5500, mined: false },
        { year: 2038, name: "Quantum Entangled Transactions", ai: 7500, mined: false },
        { year: 2040, name: "Singularity Integration Layer", ai: 10000, mined: false }
    ];
    
    const allEvents = [...historicalEvents, ...futureEvents];
    
    const xScale = d3.scaleLinear()
        .domain([2015, 2040])
        .range([50, timelineWidth - 50]);
    
    const yScale = d3.scaleLinear()
        .domain([0, 10000])
        .range([timelineHeight - 30, 30]);
    
    // Draw axis
    timelineSvg.append('g')
        .attr('class', 'timeline-axis')
        .attr('transform', `translate(0, ${timelineHeight - 30})`)
        .call(d3.axisBottom(xScale).tickFormat(d3.format('d')));
    
    // Add future zone background
    const futureZone = timelineSvg.append('rect')
        .attr('class', 'future-zone')
        .attr('x', xScale(2026))
        .attr('y', 0)
        .attr('width', xScale(2040) - xScale(2026))
        .attr('height', timelineHeight - 30)
        .attr('fill', 'rgba(98, 126, 234, 0.1)')
        .attr('stroke', 'rgba(98, 126, 234, 0.3)')
        .attr('stroke-dasharray', '5,5');
    
    // Add "Unmined Future" label
    timelineSvg.append('text')
        .attr('class', 'future-label')
        .attr('x', (xScale(2026) + xScale(2040)) / 2)
        .attr('y', 20)
        .attr('text-anchor', 'middle')
        .attr('fill', '#627eea')
        .attr('font-size', '14px')
        .attr('opacity', 0.7)
        .text('Unmined Future');
    
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
        .attr('stroke-width', 2)
        .attr('d', line);
    
    // Container for mined line (will be updated as events are mined)
    const minedPath = timelineSvg.append('path')
        .attr('class', 'mined-line')
        .attr('fill', 'none')
        .attr('stroke', '#00d4ff')
        .attr('stroke-width', 3)
        .attr('stroke-dasharray', '10,5')
        .attr('opacity', 0);
    
    // Draw historical points
    timelineSvg.selectAll('.historical-point')
        .data(historicalEvents)
        .enter().append('circle')
        .attr('class', 'historical-point')
        .attr('cx', d => xScale(d.year))
        .attr('cy', d => yScale(d.ai))
        .attr('r', 5)
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
    
    // Container for future points (initially hidden)
    const futurePointsGroup = timelineSvg.append('g')
        .attr('class', 'future-points');
    
    futurePointsGroup.selectAll('.future-point')
        .data(futureEvents)
        .enter().append('circle')
        .attr('class', d => `future-point future-${d.year}`)
        .attr('cx', d => xScale(d.year))
        .attr('cy', d => yScale(d.ai))
        .attr('r', 0)
        .attr('fill', '#00d4ff')
        .attr('opacity', 0);
}

// Evolution simulation with timeline mining
window.runEvolutionSimulation = function() {
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
    
    // Start mining future events
    mineTimelineEvents();
    
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

// Mine timeline events animation
function mineTimelineEvents() {
    const timelineSvg = d3.select('#timeline');
    const timelineWidth = 1200;
    const timelineHeight = 200;
    
    const xScale = d3.scaleLinear()
        .domain([2015, 2040])
        .range([50, timelineWidth - 50]);
    
    const yScale = d3.scaleLinear()
        .domain([0, 10000])
        .range([timelineHeight - 30, 30]);
    
    let eventIndex = 0;
    
    // Mining animation interval
    const miningInterval = setInterval(() => {
        if (eventIndex >= futureEvents.length) {
            clearInterval(miningInterval);
            // Show completion effect
            showMiningComplete();
            return;
        }
        
        const event = futureEvents[eventIndex];
        event.mined = true;
        minedEvents.push(event);
        
        // Animate the point appearing
        const futurePoint = timelineSvg.select(`.future-${event.year}`)
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
            .attr('cy', yScale(event.ai))
            .attr('r', 5)
            .attr('fill', 'none')
            .attr('stroke', '#00d4ff')
            .attr('stroke-width', 2)
            .attr('opacity', 1);
        
        miningEffect.transition()
            .duration(1000)
            .attr('r', 30)
            .attr('opacity', 0)
            .remove();
        
        // Update the mined line
        if (minedEvents.length > 1) {
            const line = d3.line()
                .x(d => xScale(d.year))
                .y(d => yScale(d.ai))
                .curve(d3.curveMonotoneX);
            
            const lastHistorical = { year: 2025, name: "Account Abstraction", ai: 700 };
            const lineData = [lastHistorical, ...minedEvents];
            
            timelineSvg.select('.mined-line')
                .datum(lineData)
                .attr('opacity', 1)
                .transition()
                .duration(500)
                .attr('d', line);
        }
        
        // Add event label
        const label = timelineSvg.append('text')
            .attr('x', xScale(event.year))
            .attr('y', yScale(event.ai) - 15)
            .attr('text-anchor', 'middle')
            .attr('fill', '#00d4ff')
            .attr('font-size', '10px')
            .attr('opacity', 0)
            .text(event.name);
        
        label.transition()
            .duration(500)
            .attr('opacity', 1)
            .transition()
            .delay(2000)
            .duration(500)
            .attr('opacity', 0.3);
        
        // Update future zone
        timelineSvg.select('.future-zone')
            .transition()
            .duration(500)
            .attr('x', xScale(event.year + 1));
        
        eventIndex++;
    }, 1500); // Mine one event every 1.5 seconds
}

// Show mining completion effect
function showMiningComplete() {
    const timelineSvg = d3.select('#timeline');
    
    // Update label
    timelineSvg.select('.future-label')
        .transition()
        .duration(1000)
        .text('Future Mined!')
        .attr('fill', '#00d4ff')
        .attr('font-size', '18px')
        .attr('font-weight', 'bold');
    
    // Add completion pulse
    const timelineWidth = 1200;
    const pulse = timelineSvg.append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', timelineWidth)
        .attr('height', 200)
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
    
    // Show predictions
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.95);
        border: 2px solid #627eea;
        border-radius: 15px;
        padding: 30px;
        z-index: 1000;
        max-width: 500px;
    `;
    
    modal.innerHTML = `
        <h3 style="color: #627eea; margin-top: 0;">Predicted Next Primitives</h3>
        ${predictions.map(p => `
            <div style="margin: 15px 0; padding: 15px; background: rgba(98, 126, 234, 0.1); border-radius: 8px;">
                <div style="display: flex; justify-content: space-between;">
                    <div>
                        <div style="font-weight: bold;">${p.name}</div>
                        <div style="font-size: 12px; opacity: 0.7;">Assembly Index: ${p.ai}</div>
                    </div>
                    <div style="text-align: right;">
                        <div style="font-size: 24px; color: ${p.probability > 0.7 ? '#00ff00' : '#f0b90b'};">
                            ${(p.probability * 100).toFixed(0)}%
                        </div>
                        <div style="font-size: 10px;">probability</div>
                    </div>
                </div>
            </div>
        `).join('')}
        <button onclick="this.parentElement.remove()" style="
            margin-top: 20px;
            padding: 10px 20px;
            background: #627eea;
            border: none;
            border-radius: 20px;
            color: white;
            cursor: pointer;
        ">Close</button>
    `;
    
    document.body.appendChild(modal);
};

// Reset analysis
window.resetAnalysis = function() {
    selectedPrimitives.clear();
    document.querySelectorAll('.primitive-node').forEach(node => {
        node.classList.remove('selected');
    });
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
            ${d.status ? `<p style="margin: 5px 0;">Status: ${d.status}</p>` : ''}
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