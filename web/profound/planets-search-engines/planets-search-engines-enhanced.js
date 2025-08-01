// Enhanced Planets as Search Engines Visualization
let width = 800; // Default width
let height = 600;

// Update dimensions when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const vizElement = document.getElementById('mainViz');
    if (vizElement) {
        width = vizElement.clientWidth || 800;
    }
});

// Create SVG and groups (will be initialized after DOM ready)
let svg, backgroundGroup, searchSpaceGroup, pathsGroup, planetsGroup, particlesGroup, lifeGroup;

function initializeSVG() {
    svg = d3.select('#mainViz')
        .attr('viewBox', `0 0 ${width} ${height}`)
        .attr('preserveAspectRatio', 'xMidYMid meet');

    // Create groups for different layers
    backgroundGroup = svg.append('g').attr('class', 'background');
    searchSpaceGroup = svg.append('g').attr('class', 'search-space');
    pathsGroup = svg.append('g').attr('class', 'paths');
    planetsGroup = svg.append('g').attr('class', 'planets');
    particlesGroup = svg.append('g').attr('class', 'particles');
    lifeGroup = svg.append('g').attr('class', 'life-forms');
}

// Global selected elements
let selectedElements = new Set(['H', 'C', 'N', 'O']);

// Dynamic planet generation
let planets = [];

function generatePlanets(numPlanets) {
    planets = [];
    const planetTypes = [
        { name: 'Terra', color: '#4fc3f7', gradient: ['#29b6f6', '#4fc3f7', '#81d4fa'] },
        { name: 'Desert', color: '#ff7043', gradient: ['#d84315', '#ff5722', '#ff7043'] },
        { name: 'Ice', color: '#81c784', gradient: ['#388e3c', '#4caf50', '#81c784'] },
        { name: 'Ocean', color: '#4dd0e1', gradient: ['#0097a7', '#00acc1', '#4dd0e1'] },
        { name: 'Volcanic', color: '#ff5252', gradient: ['#c62828', '#f44336', '#ff5252'] },
        { name: 'Toxic', color: '#ba68c8', gradient: ['#6a1b9a', '#8e24aa', '#ba68c8'] },
        { name: 'Frozen', color: '#e1f5fe', gradient: ['#81d4fa', '#b3e5fc', '#e1f5fe'] },
        { name: 'Rocky', color: '#8d6e63', gradient: ['#4e342e', '#6d4c41', '#8d6e63'] },
        { name: 'Gaseous', color: '#ffab91', gradient: ['#d84315', '#ff5722', '#ffab91'] },
        { name: 'Metal', color: '#9e9e9e', gradient: ['#424242', '#616161', '#9e9e9e'] }
    ];
    
    for (let i = 0; i < numPlanets; i++) {
        const type = planetTypes[i % planetTypes.length];
        const angle = (i / numPlanets) * 2 * Math.PI - Math.PI / 2;
        
        // Spiral layout for many planets
        const spiralRadius = 150 + (i / numPlanets) * 200;
        const radiusOffset = spiralRadius + (i % 3) * 30;
        
        // Smaller planets when there are many
        const baseRadius = numPlanets > 20 ? 15 : (numPlanets > 10 ? 20 : 30);
        
        planets.push({
            id: `planet-${i}`,
            name: `${type.name}-${i + 1}`,
            x: width / 2 + Math.cos(angle) * radiusOffset,
            y: height / 2 + Math.sin(angle) * radiusOffset,
            radius: baseRadius + Math.random() * 10,
            color: type.color,
            gradient: type.gradient,
            searchSpace: {
                temperature: [-200 + Math.random() * 400, -100 + Math.random() * 600],
                pressure: [Math.random() * 10, Math.random() * 1000],
                ph: [Math.random() * 7, 7 + Math.random() * 7],
                elements: Array.from(selectedElements),
                successRate: calculateSuccessRate()
            },
            discoveries: []
        });
    }
}

function calculateSuccessRate() {
    // Success rate based on selected elements
    const essentialElements = ['C', 'H', 'O', 'N'];
    const importantElements = ['P', 'S', 'Fe'];
    
    let rate = 0.1;
    essentialElements.forEach(el => {
        if (selectedElements.has(el)) rate += 0.15;
    });
    importantElements.forEach(el => {
        if (selectedElements.has(el)) rate += 0.1;
    });
    
    // Environmental factors - using ranges
    const tempMin = parseFloat(document.getElementById('tempMin')?.value || -50);
    const tempMax = parseFloat(document.getElementById('tempMax')?.value || 100);
    const pressureMin = parseFloat(document.getElementById('pressureMin')?.value || 0.1);
    const pressureMax = parseFloat(document.getElementById('pressureMax')?.value || 10);
    const phMin = parseFloat(document.getElementById('phMin')?.value || 5);
    const phMax = parseFloat(document.getElementById('phMax')?.value || 9);
    
    // Optimal conditions boost success rate
    // Temperature range that includes liquid water zone
    if (tempMin <= 0 && tempMax >= 0 && tempMax <= 150) rate += 0.1;
    
    // Pressure range that allows liquid water
    if (pressureMin <= 1 && pressureMax >= 0.006) rate += 0.1;
    
    // pH range that supports life
    if (phMin <= 7 && phMax >= 7 && (phMax - phMin) < 6) rate += 0.1;
    
    // Search strategies boost success rate
    const strategies = {
        'strategy-random': 0.05,
        'strategy-energy': 0.08,
        'strategy-catalytic': 0.1,
        'strategy-hydrothermal': 0.12,
        'strategy-uv': 0.06,
        'strategy-freeze': 0.07
    };
    
    Object.entries(strategies).forEach(([id, boost]) => {
        const checkbox = document.getElementById(id);
        if (checkbox?.checked) {
            rate += boost;
        }
    });
    
    return Math.min(rate, 0.95);
}

// URL parameter handling
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        numPlanets: parseInt(params.get('planets')) || 3,
        tempMin: parseFloat(params.get('tempMin')) || -50,
        tempMax: parseFloat(params.get('tempMax')) || 100,
        pressureMin: parseFloat(params.get('pressureMin')) || 0.1,
        pressureMax: parseFloat(params.get('pressureMax')) || 10,
        phMin: parseFloat(params.get('phMin')) || 5,
        phMax: parseFloat(params.get('phMax')) || 9,
        elements: params.get('elements')?.split(',') || ['H', 'C', 'N', 'O'],
        strategies: params.get('strategies')?.split(',') || ['random', 'energy', 'catalytic', 'hydrothermal']
    };
}

function updateUrlParams() {
    const params = new URLSearchParams();
    
    // Get current values
    params.set('planets', document.getElementById('numPlanets').value);
    params.set('tempMin', document.getElementById('tempMin').value);
    params.set('tempMax', document.getElementById('tempMax').value);
    params.set('pressureMin', document.getElementById('pressureMin').value);
    params.set('pressureMax', document.getElementById('pressureMax').value);
    params.set('phMin', document.getElementById('phMin').value);
    params.set('phMax', document.getElementById('phMax').value);
    
    // Get selected elements
    const selectedElems = Array.from(selectedElements);
    if (selectedElems.length > 0) {
        params.set('elements', selectedElems.join(','));
    }
    
    // Get selected strategies
    const selectedStrategies = [];
    document.querySelectorAll('input[id^="strategy-"]:checked').forEach(checkbox => {
        selectedStrategies.push(checkbox.id.replace('strategy-', ''));
    });
    if (selectedStrategies.length > 0) {
        params.set('strategies', selectedStrategies.join(','));
    }
    
    // Update URL without reload
    const newUrl = window.location.pathname + '?' + params.toString();
    window.history.replaceState({}, '', newUrl);
}

// Initialize with URL params or defaults
const urlParams = getUrlParams();
generatePlanets(urlParams.numPlanets);

// Create possibility space visualization in background
function createPossibilitySpace() {
    const cellSize = 3;
    const cols = Math.floor(width / cellSize);
    const rows = Math.floor(height / cellSize);
    
    const possibilityData = [];
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            possibilityData.push({
                x: i * cellSize,
                y: j * cellSize,
                explored: false,
                viable: Math.random() > 0.95,
                intensity: Math.random()
            });
        }
    }
    
    backgroundGroup.selectAll('.possibility-cell')
        .data(possibilityData)
        .enter().append('rect')
        .attr('class', 'possibility-cell')
        .attr('x', d => d.x)
        .attr('y', d => d.y)
        .attr('width', cellSize)
        .attr('height', cellSize)
        .attr('fill', d => d.viable ? '#00ff00' : '#001122')
        .attr('opacity', d => d.viable ? 0.1 : 0.05);
        
    return possibilityData;
}


// Draw planets
function drawPlanets() {
    // Clear existing planets
    planetsGroup.selectAll('*').remove();
    svg.selectAll('defs').remove();
    
    
    // Create gradients for new planets
    planets.forEach(planet => {
        const gradient = svg.append('defs')
            .append('radialGradient')
            .attr('id', `${planet.id}-gradient`);
            
        gradient.selectAll('stop')
            .data(planet.gradient)
            .enter().append('stop')
            .attr('offset', (d, i) => `${i * 50}%`)
            .attr('stop-color', d => d);
    });
    
    const planetElements = planetsGroup.selectAll('.planet-group')
        .data(planets)
        .enter().append('g')
        .attr('class', 'planet-group')
        .attr('transform', d => `translate(${d.x}, ${d.y})`);
    
    // Planet sphere
    planetElements.append('circle')
        .attr('class', 'planet')
        .attr('r', d => d.radius)
        .attr('fill', d => `url(#${d.id}-gradient)`)
        .attr('stroke', d => d.color)
        .attr('stroke-width', 2)
        .attr('filter', 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.5))');
    
    // Planet label
    planetElements.append('text')
        .attr('y', d => d.radius + 20)
        .attr('text-anchor', 'middle')
        .attr('fill', 'white')
        .attr('font-size', '12px')
        .text(d => d.name);
    
    // Add invisible hover area (larger than planet) to prevent bounce
    planetElements.append('circle')
        .attr('class', 'hover-area')
        .attr('r', d => d.radius + 20)
        .attr('fill', 'transparent')
        .attr('cursor', 'pointer')
        .on('mouseover', function(event, d) {
            // Highlight planet without changing its size
            d3.select(this.parentNode).select('.planet')
                .transition()
                .duration(200)
                .attr('filter', 'drop-shadow(0 0 30px rgba(255, 255, 255, 0.9))');
            
            showTooltip(event, d);
        })
        .on('mouseout', function(event, d) {
            // Return to normal state
            d3.select(this.parentNode).select('.planet')
                .transition()
                .duration(200)
                .attr('filter', 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.5))');
                
            hideTooltip();
        });
}

// Chemical search particles
class SearchParticle {
    constructor(planet, targetX, targetY) {
        this.planet = planet;
        // Start from planet surface
        const angle = Math.random() * Math.PI * 2;
        this.x = planet.x + Math.cos(angle) * planet.radius;
        this.y = planet.y + Math.sin(angle) * planet.radius;
        this.targetX = targetX;
        this.targetY = targetY;
        this.speed = 0.5 + Math.random() * 1.5;
        this.elements = this.generateChemicalFormula(planet);
        this.viable = Math.random() < planet.searchSpace.successRate;
        this.age = 0;
        this.maxAge = 300;
        this.id = `particle-${Date.now()}-${Math.random()}`;
        
        // Create launch effect
        this.createLaunchEffect();
    }
    
    createLaunchEffect() {
        // Create a smaller pulse effect at launch position
        const pulse = particlesGroup.append('circle')
            .attr('cx', this.x)
            .attr('cy', this.y)
            .attr('r', 3)
            .attr('fill', 'none')
            .attr('stroke', this.viable ? '#00f5ff' : '#ff006e')
            .attr('stroke-width', 1)
            .attr('opacity', 0.8);
            
        pulse.transition()
            .duration(300)
            .attr('r', 10)
            .attr('opacity', 0)
            .remove();
    }
    
    generateChemicalFormula(planet) {
        const availableElements = planet.searchSpace.elements;
        if (availableElements.length === 0) return 'XX'; // No elements selected
        
        const numElements = Math.min(2 + Math.floor(Math.random() * 3), availableElements.length);
        const selected = [];
        
        // Select random elements from available ones
        const shuffled = [...availableElements].sort(() => Math.random() - 0.5);
        for (let i = 0; i < numElements; i++) {
            selected.push(shuffled[i]);
        }
        
        return selected.join('');
    }
    
    update() {
        const dx = this.targetX - this.x;
        const dy = this.targetY - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist > 5) {
            // Add some spiral movement for visual effect
            const spiralFactor = this.age * 0.02;
            const perpX = -dy / dist;
            const perpY = dx / dist;
            
            this.x += (dx / dist) * this.speed + perpX * Math.sin(spiralFactor) * 0.5;
            this.y += (dy / dist) * this.speed + perpY * Math.sin(spiralFactor) * 0.5;
        }
        
        this.age++;
        return this.age < this.maxAge;
    }
}

let searchParticles = [];
let searchInterval;
let searchStats = {
    totalExperiments: 0,
    uniqueMolecules: new Set(),
    stablePatterns: 0,
    replicators: 0,
    lifeForms: 0,
    advancedLife: 0,
    civilizations: 0,
    searchTime: 0
};

// Systematic search algorithm
function startSystematicSearch() {
    if (searchInterval) clearInterval(searchInterval);
    
    const possibilitySpace = createPossibilitySpace();
    let searchIndex = 0;
    
    searchInterval = setInterval(() => {
        // Update search time
        searchStats.searchTime += 100;
        updateStats();
        
        // Generate search particles for each planet
        planets.forEach((planet, planetIndex) => {
            // Systematic grid search
            const gridX = (searchIndex % 50) * (width / 50);
            const gridY = Math.floor(searchIndex / 50) * (height / 50);
            
            // Generate particles but only show 1 in 100 for performance
            for (let i = 0; i < 8; i++) {
                // Random exploration from planet
                const angle = Math.random() * Math.PI * 2;
                const targetDistance = 50 + Math.random() * 150;
                const targetX = planet.x + Math.cos(angle) * targetDistance;
                const targetY = planet.y + Math.sin(angle) * targetDistance;
                
                // Always count the experiment
                searchStats.totalExperiments++;
                
                // Only create visible particle 10 in 100 times (10% probability)
                if (Math.random() < 0.1) {
                    const particle = new SearchParticle(planet, targetX, targetY);
                    searchParticles.push(particle);
                }
                
                // Still track unique molecules for statistics
                const availableElements = planet.searchSpace.elements;
                if (availableElements.length > 0) {
                    const numElements = Math.min(2 + Math.floor(Math.random() * 3), availableElements.length);
                    const shuffled = [...availableElements].sort(() => Math.random() - 0.5);
                    const elements = shuffled.slice(0, numElements).join('');
                    searchStats.uniqueMolecules.add(elements);
                }
                
                // Check if viable (simulate for statistics even if particle not visible)
                const viable = Math.random() < planet.searchSpace.successRate;
                if (viable && Math.random() > 0.9) {
                    searchStats.stablePatterns++;
                    
                    if (Math.random() > 0.8) {
                        searchStats.replicators++;
                        
                        if (Math.random() > 0.7) {
                            searchStats.lifeForms++;
                            // Only create visual life form occasionally to reduce graphics load
                            if (Math.random() < 0.1) {
                                const lifeX = planet.x + (Math.random() - 0.5) * 200;
                                const lifeY = planet.y + (Math.random() - 0.5) * 200;
                                createLifeForm(lifeX, lifeY, planet);
                            }
                            addDiscoveryLog(`${planet.name}: Life discovered!`);
                            
                            // Check for advanced life evolution (requires 100+ basic life forms)
                            if (searchStats.lifeForms > 100 && Math.random() > 0.85) {
                                searchStats.advancedLife++;
                                if (Math.random() < 0.2) {
                                    const advX = planet.x + (Math.random() - 0.5) * 200;
                                    const advY = planet.y + (Math.random() - 0.5) * 200;
                                    createAdvancedLifeForm(advX, advY, planet);
                                }
                                addDiscoveryLog(`${planet.name}: ADVANCED LIFE emerged! Multicellular organism detected`, 'advanced');
                                
                                // Check for civilizational life (requires 20+ advanced life forms)
                                if (searchStats.advancedLife > 20 && Math.random() > 0.95) {
                                    searchStats.civilizations++;
                                    if (Math.random() < 0.5) {
                                        const civX = planet.x + (Math.random() - 0.5) * 200;
                                        const civY = planet.y + (Math.random() - 0.5) * 200;
                                        createCivilization(civX, civY, planet);
                                    }
                                    addDiscoveryLog(`${planet.name}: CIVILIZATION DETECTED! Intelligent life has emerged!`, 'civilization');
                                }
                            }
                        }
                    }
                }
            }
        });
        
        searchIndex++;
        
        // Update overall progress
        updateOverallProgress(searchIndex);
        
        // Update particles
        updateParticles();
        
        // Mark explored regions
        markExploredRegions(possibilitySpace, searchParticles);
        
    }, 50); // Faster interval for more particles
}

// Update particle positions and render
function updateParticles() {
    searchParticles = searchParticles.filter(p => p.update());
    
    // Generate unique IDs for particles
    searchParticles.forEach((p, i) => {
        if (!p.id) p.id = `particle-${Date.now()}-${i}`;
    });
    
    const particles = particlesGroup.selectAll('.search-particle')
        .data(searchParticles, d => d.id);
    
    const particlesEnter = particles.enter().append('circle')
        .attr('class', d => `search-particle ${d.viable ? 'viable' : 'failed'}`)
        .attr('r', 2)
        .attr('fill', d => d.viable ? '#00f5ff' : '#ff006e')
        .attr('stroke', 'none')
        .attr('opacity', 0)
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);
    
    particlesEnter.merge(particles)
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('r', 2)
        .attr('opacity', d => Math.max(0.8 * (1 - d.age / d.maxAge), 0.1))
        .attr('filter', d => d.viable ? 
            'drop-shadow(0 0 3px rgba(0, 245, 255, 0.8))' : 
            'drop-shadow(0 0 3px rgba(255, 0, 110, 0.6))');
    
    particles.exit().remove();
}

// Create life form visualization
function createLifeForm(x, y, planet) {
    const lifeForm = lifeGroup.append('g')
        .attr('transform', `translate(${x}, ${y})`);
    
    lifeForm.append('circle')
        .attr('class', 'life-marker')
        .attr('r', 0)
        .transition()
        .duration(1000)
        .attr('r', 20);
    
    lifeForm.append('text')
        .attr('text-anchor', 'middle')
        .attr('fill', '#00ff00')
        .attr('font-size', '20px')
        .attr('dy', 5)
        .text('🧬')
        .attr('opacity', 0)
        .transition()
        .delay(500)
        .duration(500)
        .attr('opacity', 1);
}

// Create advanced life form visualization
function createAdvancedLifeForm(x, y, planet) {
    const advancedLife = lifeGroup.append('g')
        .attr('transform', `translate(${x}, ${y})`);
    
    // Larger, more complex visualization
    advancedLife.append('circle')
        .attr('class', 'life-marker')
        .attr('r', 0)
        .attr('fill', '#00ffcc')
        .attr('stroke', '#00ffcc')
        .transition()
        .duration(1500)
        .attr('r', 30);
    
    // Multiple symbols for multicellular life
    const symbols = ['🐠', '🦎', '🦋', '🌺', '🦕'];
    const symbol = symbols[Math.floor(Math.random() * symbols.length)];
    
    advancedLife.append('text')
        .attr('text-anchor', 'middle')
        .attr('fill', '#00ffcc')
        .attr('font-size', '24px')
        .attr('dy', 5)
        .text(symbol)
        .attr('opacity', 0)
        .transition()
        .delay(750)
        .duration(750)
        .attr('opacity', 1);
}

// Create civilization visualization
function createCivilization(x, y, planet) {
    const civilization = lifeGroup.append('g')
        .attr('transform', `translate(${x}, ${y})`);
    
    // Complex multi-layered visualization
    civilization.append('circle')
        .attr('class', 'life-marker')
        .attr('r', 0)
        .attr('fill', '#ffd700')
        .attr('stroke', '#ffd700')
        .attr('stroke-width', 3)
        .transition()
        .duration(2000)
        .attr('r', 40);
    
    // Add pulsing ring effect
    for (let i = 0; i < 3; i++) {
        civilization.append('circle')
            .attr('r', 40)
            .attr('fill', 'none')
            .attr('stroke', '#ffd700')
            .attr('stroke-width', 2)
            .attr('opacity', 0.8)
            .transition()
            .delay(i * 500)
            .duration(3000)
            .attr('r', 80)
            .attr('opacity', 0)
            .on('end', function() { d3.select(this).remove(); });
    }
    
    // Civilization symbols
    const civSymbols = ['🏛️', '🚀', '🌃', '🛸', '💡'];
    const symbol = civSymbols[Math.floor(Math.random() * civSymbols.length)];
    
    civilization.append('text')
        .attr('text-anchor', 'middle')
        .attr('fill', '#ffd700')
        .attr('font-size', '28px')
        .attr('dy', 5)
        .text(symbol)
        .attr('opacity', 0)
        .transition()
        .delay(1000)
        .duration(1000)
        .attr('opacity', 1);
}

// Mark explored regions in possibility space
function markExploredRegions(possibilitySpace, particles) {
    particles.forEach(particle => {
        const cellX = Math.floor(particle.x / 3);
        const cellY = Math.floor(particle.y / 3);
        const index = cellY * Math.floor(width / 3) + cellX;
        
        if (possibilitySpace[index]) {
            possibilitySpace[index].explored = true;
        }
    });
    
    backgroundGroup.selectAll('.possibility-cell')
        .attr('opacity', d => {
            if (d.explored) return d.viable ? 0.6 : 0.2;
            return d.viable ? 0.1 : 0.05;
        });
}

// Update statistics display
function updateStats() {
    document.getElementById('totalExperiments').textContent = 
        searchStats.totalExperiments.toLocaleString();
    document.getElementById('uniqueMolecules').textContent = 
        searchStats.uniqueMolecules.size.toLocaleString();
    document.getElementById('stablePatterns').textContent = 
        searchStats.stablePatterns.toLocaleString();
    document.getElementById('replicators').textContent = 
        searchStats.replicators.toLocaleString();
    document.getElementById('lifeForms').textContent = 
        searchStats.lifeForms.toLocaleString();
    document.getElementById('advancedLife').textContent = 
        searchStats.advancedLife.toLocaleString();
    document.getElementById('civilizations').textContent = 
        searchStats.civilizations.toLocaleString();
    document.getElementById('searchTime').textContent = 
        `${(searchStats.searchTime / 1000).toFixed(1)} Myr`;
}

// Update overall progress bar
function updateOverallProgress(searchIndex) {
    // Calculate progress based on search index and total possibility space
    const progress = Math.min((searchIndex / 10000) * 100, 100); // Arbitrary scale for visualization
    const progressBar = document.getElementById('overallProgress');
    const progressText = document.getElementById('progressPercentage');
    
    if (progressBar) {
        progressBar.style.width = progress + '%';
    }
    if (progressText) {
        progressText.textContent = progress.toFixed(2) + '%';
    }
}

// Add to discovery log
function addDiscoveryLog(message, type = 'basic') {
    const log = document.getElementById('discoveryLog');
    const entry = document.createElement('p');
    entry.textContent = `[${(searchStats.searchTime / 1000).toFixed(1)} Myr] ${message}`;
    entry.style.margin = '5px 0';
    entry.style.padding = '5px';
    
    // Different styles for different discovery types
    switch(type) {
        case 'basic':
            entry.style.background = 'rgba(0, 255, 0, 0.1)';
            entry.style.borderLeft = '3px solid #00ff00';
            break;
        case 'advanced':
            entry.style.background = 'rgba(0, 255, 204, 0.15)';
            entry.style.borderLeft = '3px solid #00ffcc';
            entry.style.fontWeight = 'bold';
            break;
        case 'civilization':
            entry.style.background = 'rgba(255, 215, 0, 0.2)';
            entry.style.borderLeft = '3px solid #ffd700';
            entry.style.fontWeight = 'bold';
            entry.style.fontSize = '14px';
            entry.style.animation = 'pulse 2s ease-in-out';
            break;
    }
    
    log.insertBefore(entry, log.firstChild);
}

// Show full possibility space
function showPossibilitySpace() {
    // Create a comprehensive view of all possible combinations
    const modal = d3.select('body').append('div')
        .attr('class', 'possibility-modal')
        .style('position', 'fixed')
        .style('top', '0')
        .style('left', '0')
        .style('width', '100%')
        .style('height', '100%')
        .style('background', 'rgba(0, 0, 0, 0.95)')
        .style('display', 'flex')
        .style('align-items', 'center')
        .style('justify-content', 'center')
        .style('z-index', '2000');
    
    const content = modal.append('div')
        .style('background', '#1a1a2e')
        .style('padding', '40px')
        .style('border-radius', '20px')
        .style('max-width', '80%')
        .style('max-height', '80%')
        .style('overflow', 'auto');
    
    content.append('h2')
        .style('color', '#00f5ff')
        .text('Complete Chemical Possibility Space');
    
    content.append('p')
        .style('color', 'white')
        .text('Total searchable combinations: ~10^100 (a googol)');
    
    // Close button
    content.append('button')
        .text('Close')
        .style('background', '#00f5ff')
        .style('border', 'none')
        .style('padding', '10px 20px')
        .style('border-radius', '20px')
        .style('cursor', 'pointer')
        .on('click', () => modal.remove());
}


// Reset visualization
function resetVisualization() {
    clearInterval(searchInterval);
    searchParticles = [];
    searchStats = {
        totalExperiments: 0,
        uniqueMolecules: new Set(),
        stablePatterns: 0,
        replicators: 0,
        lifeForms: 0,
        advancedLife: 0,
        civilizations: 0,
        searchTime: 0
    };
    
    particlesGroup.selectAll('*').remove();
    lifeGroup.selectAll('*').remove();
    pathsGroup.selectAll('*').remove();
    backgroundGroup.selectAll('*').remove();
    
    svg.transition()
        .duration(1000)
        .attr('viewBox', `0 0 ${width} ${height}`);
    
    updateStats();
    
    // Reset overall progress
    updateOverallProgress(0);
    
    // Reset discovery log
    document.getElementById('discoveryLog').innerHTML = '<p>Waiting for search to begin...</p>';
}

// Tooltip functions
function showTooltip(event, planet) {
    const tooltip = document.getElementById('tooltip');
    tooltip.style.display = 'block';
    tooltip.style.left = event.pageX + 10 + 'px';
    tooltip.style.top = event.pageY + 10 + 'px';
    
    tooltip.innerHTML = `
        <h4 style="margin: 0 0 10px 0; color: #00f5ff;">${planet.name}</h4>
        <p style="margin: 5px 0;"><strong>Temperature range:</strong> ${planet.searchSpace.temperature[0]}°C to ${planet.searchSpace.temperature[1]}°C</p>
        <p style="margin: 5px 0;"><strong>Elements available:</strong> ${planet.searchSpace.elements.join(', ')}</p>
        <p style="margin: 5px 0;"><strong>Success probability:</strong> ${(planet.searchSpace.successRate * 100).toFixed(0)}%</p>
        <p style="margin: 5px 0;"><strong>Discoveries:</strong> ${planet.discoveries.length}</p>
    `;
}

function hideTooltip() {
    document.getElementById('tooltip').style.display = 'none';
}

// Element selection handling
document.addEventListener('DOMContentLoaded', function() {
    // Initialize SVG first
    const vizElement = document.getElementById('mainViz');
    if (vizElement) {
        width = vizElement.clientWidth || 800;
    }
    initializeSVG();
    
    // Initialize visualization
    drawPlanets();
    
    // Load values from URL
    const urlParams = getUrlParams();
    
    // Set input values from URL
    document.getElementById('numPlanets').value = urlParams.numPlanets;
    document.getElementById('tempMin').value = urlParams.tempMin;
    document.getElementById('tempMax').value = urlParams.tempMax;
    document.getElementById('tempMinSlider').value = urlParams.tempMin;
    document.getElementById('tempMaxSlider').value = urlParams.tempMax;
    document.getElementById('pressureMin').value = urlParams.pressureMin;
    document.getElementById('pressureMax').value = urlParams.pressureMax;
    document.getElementById('pressureMinSlider').value = urlParams.pressureMin;
    document.getElementById('pressureMaxSlider').value = urlParams.pressureMax;
    document.getElementById('phMin').value = urlParams.phMin;
    document.getElementById('phMax').value = urlParams.phMax;
    document.getElementById('phMinSlider').value = urlParams.phMin;
    document.getElementById('phMaxSlider').value = urlParams.phMax;
    
    // Set selected elements from URL
    selectedElements = new Set(urlParams.elements);
    document.querySelectorAll('.chemical-node').forEach(node => {
        const element = node.getAttribute('data-element');
        if (selectedElements.has(element)) {
            node.classList.add('selected');
        } else {
            node.classList.remove('selected');
        }
    });
    
    // Set selected strategies from URL
    urlParams.strategies.forEach(strategy => {
        const checkbox = document.getElementById(`strategy-${strategy}`);
        if (checkbox) checkbox.checked = true;
    });
    
    // Element selection
    document.querySelectorAll('.chemical-node').forEach(node => {
        node.addEventListener('click', function() {
            const element = this.getAttribute('data-element');
            if (this.classList.contains('selected')) {
                this.classList.remove('selected');
                selectedElements.delete(element);
            } else {
                this.classList.add('selected');
                selectedElements.add(element);
            }
            
            // Update planet success rates
            planets.forEach(planet => {
                planet.searchSpace.elements = Array.from(selectedElements);
                planet.searchSpace.successRate = calculateSuccessRate();
            });
            
            updateUrlParams();
        });
    });
    
    // Number of planets input
    const numPlanetsInput = document.getElementById('numPlanets');
    if (numPlanetsInput) {
        numPlanetsInput.addEventListener('change', function() {
            let num = parseInt(this.value);
            // Validate input
            if (isNaN(num) || num < 1) num = 1;
            if (num > 100) num = 100;
            this.value = num;
            
            generatePlanets(num);
            drawPlanets();
            resetVisualization();
            updateUrlParams();
        });
        
        // Also handle Enter key
        numPlanetsInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                this.blur(); // Trigger change event
            }
        });
    }
    
    // Temperature range controls
    const tempMin = document.getElementById('tempMin');
    const tempMax = document.getElementById('tempMax');
    const tempMinSlider = document.getElementById('tempMinSlider');
    const tempMaxSlider = document.getElementById('tempMaxSlider');
    
    if (tempMin && tempMax && tempMinSlider && tempMaxSlider) {
        // Sync number inputs with sliders
        tempMin.addEventListener('input', function() {
            tempMinSlider.value = this.value;
            if (parseFloat(this.value) > parseFloat(tempMax.value)) {
                tempMax.value = this.value;
                tempMaxSlider.value = this.value;
            }
            updateSuccessRates();
        });
        
        tempMax.addEventListener('input', function() {
            tempMaxSlider.value = this.value;
            if (parseFloat(this.value) < parseFloat(tempMin.value)) {
                tempMin.value = this.value;
                tempMinSlider.value = this.value;
            }
            updateSuccessRates();
        });
        
        tempMinSlider.addEventListener('input', function() {
            tempMin.value = this.value;
            if (parseFloat(this.value) > parseFloat(tempMax.value)) {
                tempMax.value = this.value;
                tempMaxSlider.value = this.value;
            }
            updateSuccessRates();
        });
        
        tempMaxSlider.addEventListener('input', function() {
            tempMax.value = this.value;
            if (parseFloat(this.value) < parseFloat(tempMin.value)) {
                tempMin.value = this.value;
                tempMinSlider.value = this.value;
            }
            updateSuccessRates();
        });
    }
    
    // Pressure range controls
    const pressureMin = document.getElementById('pressureMin');
    const pressureMax = document.getElementById('pressureMax');
    const pressureMinSlider = document.getElementById('pressureMinSlider');
    const pressureMaxSlider = document.getElementById('pressureMaxSlider');
    
    if (pressureMin && pressureMax && pressureMinSlider && pressureMaxSlider) {
        pressureMin.addEventListener('input', function() {
            pressureMinSlider.value = this.value;
            if (parseFloat(this.value) > parseFloat(pressureMax.value)) {
                pressureMax.value = this.value;
                pressureMaxSlider.value = this.value;
            }
            updateSuccessRates();
        });
        
        pressureMax.addEventListener('input', function() {
            pressureMaxSlider.value = this.value;
            if (parseFloat(this.value) < parseFloat(pressureMin.value)) {
                pressureMin.value = this.value;
                pressureMinSlider.value = this.value;
            }
            updateSuccessRates();
        });
        
        pressureMinSlider.addEventListener('input', function() {
            pressureMin.value = this.value;
            if (parseFloat(this.value) > parseFloat(pressureMax.value)) {
                pressureMax.value = this.value;
                pressureMaxSlider.value = this.value;
            }
            updateSuccessRates();
        });
        
        pressureMaxSlider.addEventListener('input', function() {
            pressureMax.value = this.value;
            if (parseFloat(this.value) < parseFloat(pressureMin.value)) {
                pressureMin.value = this.value;
                pressureMinSlider.value = this.value;
            }
            updateSuccessRates();
        });
    }
    
    // pH range controls
    const phMin = document.getElementById('phMin');
    const phMax = document.getElementById('phMax');
    const phMinSlider = document.getElementById('phMinSlider');
    const phMaxSlider = document.getElementById('phMaxSlider');
    
    if (phMin && phMax && phMinSlider && phMaxSlider) {
        phMin.addEventListener('input', function() {
            phMinSlider.value = this.value;
            if (parseFloat(this.value) > parseFloat(phMax.value)) {
                phMax.value = this.value;
                phMaxSlider.value = this.value;
            }
            updateSuccessRates();
        });
        
        phMax.addEventListener('input', function() {
            phMaxSlider.value = this.value;
            if (parseFloat(this.value) < parseFloat(phMin.value)) {
                phMin.value = this.value;
                phMinSlider.value = this.value;
            }
            updateSuccessRates();
        });
        
        phMinSlider.addEventListener('input', function() {
            phMin.value = this.value;
            if (parseFloat(this.value) > parseFloat(phMax.value)) {
                phMax.value = this.value;
                phMaxSlider.value = this.value;
            }
            updateSuccessRates();
        });
        
        phMaxSlider.addEventListener('input', function() {
            phMax.value = this.value;
            if (parseFloat(this.value) < parseFloat(phMin.value)) {
                phMin.value = this.value;
                phMinSlider.value = this.value;
            }
            updateSuccessRates();
        });
    }
    
    // Search strategy checkboxes
    const strategyCheckboxes = document.querySelectorAll('input[id^="strategy-"]');
    strategyCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updateSuccessRates();
        });
    });
});

function updateSuccessRates() {
    planets.forEach(planet => {
        planet.searchSpace.successRate = calculateSuccessRate();
    });
    updateUrlParams();
}

// Pause search function
window.pauseSearch = function() {
    if (searchInterval) {
        clearInterval(searchInterval);
        searchInterval = null;
    }
};

// Make functions globally accessible
window.startSystematicSearch = startSystematicSearch;
window.showPossibilitySpace = showPossibilitySpace;
window.resetVisualization = resetVisualization;