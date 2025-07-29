// Enhanced Planets as Search Engines Visualization
const width = document.getElementById('mainViz').clientWidth;
const height = 600;

// Create SVG
const svg = d3.select('#mainViz')
    .attr('viewBox', `0 0 ${width} ${height}`)
    .attr('preserveAspectRatio', 'xMidYMid meet');

// Create groups for different layers
const backgroundGroup = svg.append('g').attr('class', 'background');
const searchSpaceGroup = svg.append('g').attr('class', 'search-space');
const pathsGroup = svg.append('g').attr('class', 'paths');
const planetsGroup = svg.append('g').attr('class', 'planets');
const particlesGroup = svg.append('g').attr('class', 'particles');
const lifeGroup = svg.append('g').attr('class', 'life-forms');

// Planet data with search parameters
const planets = [
    {
        id: 'earth',
        name: 'Earth',
        x: width * 0.5,
        y: height * 0.3,
        radius: 50,
        color: '#4fc3f7',
        gradient: ['#29b6f6', '#4fc3f7', '#81d4fa'],
        searchSpace: {
            temperature: [-50, 100],
            pressure: [0.1, 100],
            ph: [0, 14],
            elements: ['C', 'H', 'O', 'N', 'P', 'S', 'Fe', 'Mg', 'Ca', 'K', 'Na'],
            successRate: 0.8
        },
        discoveries: []
    },
    {
        id: 'mars',
        name: 'Mars',
        x: width * 0.25,
        y: height * 0.5,
        radius: 35,
        color: '#ff7043',
        gradient: ['#d84315', '#ff5722', '#ff7043'],
        searchSpace: {
            temperature: [-140, 20],
            pressure: [0.001, 0.01],
            ph: [3, 10],
            elements: ['Fe', 'O', 'Si', 'Mg', 'S', 'Cl'],
            successRate: 0.2
        },
        discoveries: []
    },
    {
        id: 'europa',
        name: 'Europa',
        x: width * 0.75,
        y: height * 0.5,
        radius: 30,
        color: '#81c784',
        gradient: ['#388e3c', '#4caf50', '#81c784'],
        searchSpace: {
            temperature: [-220, 0],
            pressure: [0, 1300],
            ph: [6, 9],
            elements: ['H', 'O', 'S', 'Cl', 'Na', 'Mg'],
            successRate: 0.4
        },
        discoveries: []
    }
];

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

// Create planet gradients
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

// Draw planets
function drawPlanets() {
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
        .attr('font-size', '14px')
        .text(d => d.name);
    
    // Add invisible hover area (larger than planet) to prevent bounce
    planetElements.append('circle')
        .attr('class', 'hover-area')
        .attr('r', d => d.radius + 20)
        .attr('fill', 'transparent')
        .attr('cursor', 'pointer')
        .on('click', function(event, d) {
            event.stopPropagation();
            focusOnPlanet(d.id);
        })
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
        this.x = planet.x + (Math.random() - 0.5) * planet.radius;
        this.y = planet.y + (Math.random() - 0.5) * planet.radius;
        this.targetX = targetX;
        this.targetY = targetY;
        this.speed = 0.5 + Math.random() * 1.5;
        this.elements = this.generateChemicalFormula(planet);
        this.viable = Math.random() < planet.searchSpace.successRate;
        this.age = 0;
        this.maxAge = 300;
    }
    
    generateChemicalFormula(planet) {
        const numElements = 2 + Math.floor(Math.random() * 3);
        const selected = [];
        for (let i = 0; i < numElements; i++) {
            const element = planet.searchSpace.elements[
                Math.floor(Math.random() * planet.searchSpace.elements.length)
            ];
            selected.push(element);
        }
        return selected.join('');
    }
    
    update() {
        const dx = this.targetX - this.x;
        const dy = this.targetY - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist > 5) {
            this.x += (dx / dist) * this.speed;
            this.y += (dy / dist) * this.speed;
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
        planets.forEach(planet => {
            // Systematic grid search
            const gridX = (searchIndex % 50) * (width / 50);
            const gridY = Math.floor(searchIndex / 50) * (height / 50);
            
            // Also do some random exploration
            for (let i = 0; i < 3; i++) {
                const targetX = Math.random() * width;
                const targetY = Math.random() * height;
                
                const particle = new SearchParticle(planet, targetX, targetY);
                searchParticles.push(particle);
                searchStats.totalExperiments++;
                searchStats.uniqueMolecules.add(particle.elements);
                
                // Check if viable
                if (particle.viable && Math.random() > 0.9) {
                    searchStats.stablePatterns++;
                    
                    if (Math.random() > 0.8) {
                        searchStats.replicators++;
                        
                        if (Math.random() > 0.7) {
                            searchStats.lifeForms++;
                            createLifeForm(particle.targetX, particle.targetY, planet);
                            addDiscoveryLog(`${planet.name}: Life discovered! Formula: ${particle.elements}`);
                            
                            // Check for advanced life evolution (requires 100+ basic life forms)
                            if (searchStats.lifeForms > 100 && Math.random() > 0.85) {
                                searchStats.advancedLife++;
                                createAdvancedLifeForm(particle.targetX, particle.targetY, planet);
                                addDiscoveryLog(`${planet.name}: ADVANCED LIFE emerged! Multicellular organism detected`, 'advanced');
                                
                                // Check for civilizational life (requires 20+ advanced life forms)
                                if (searchStats.advancedLife > 20 && Math.random() > 0.95) {
                                    searchStats.civilizations++;
                                    createCivilization(particle.targetX, particle.targetY, planet);
                                    addDiscoveryLog(`${planet.name}: CIVILIZATION DETECTED! Intelligent life has emerged!`, 'civilization');
                                }
                            }
                        }
                    }
                }
            }
            
            // Update progress bars
            updatePlanetProgress(planet.id, (searchIndex % 1000) / 10);
        });
        
        searchIndex++;
        
        // Update particles
        updateParticles();
        
        // Mark explored regions
        markExploredRegions(possibilitySpace, searchParticles);
        
    }, 50);
}

// Update particle positions and render
function updateParticles() {
    searchParticles = searchParticles.filter(p => p.update());
    
    const particles = particlesGroup.selectAll('.search-particle')
        .data(searchParticles, d => d.id);
    
    particles.enter().append('circle')
        .attr('class', 'search-particle')
        .attr('r', 2)
        .attr('fill', d => d.viable ? '#00f5ff' : '#ff006e')
        .attr('opacity', 0.8)
        .merge(particles)
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('opacity', d => 0.8 * (1 - d.age / d.maxAge));
    
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

// Update planet progress bars
function updatePlanetProgress(planetId, percent) {
    document.getElementById(`${planetId}Progress`).style.width = percent + '%';
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

// Focus on specific planet
function focusOnPlanet(planetId) {
    const planet = planets.find(p => p.id === planetId);
    if (!planet) return;
    
    // Zoom effect
    const scale = 2;
    const translateX = width / 2 - planet.x * scale;
    const translateY = height / 2 - planet.y * scale;
    
    svg.transition()
        .duration(1000)
        .attr('viewBox', `${-translateX} ${-translateY} ${width/scale} ${height/scale}`);
    
    // Show planet-specific search pattern
    showPlanetSearchPattern(planet);
}

// Show planet-specific search pattern
function showPlanetSearchPattern(planet) {
    // Create search waves
    for (let i = 0; i < 5; i++) {
        pathsGroup.append('circle')
            .attr('cx', planet.x)
            .attr('cy', planet.y)
            .attr('r', planet.radius)
            .attr('fill', 'none')
            .attr('stroke', planet.color)
            .attr('stroke-width', 1)
            .attr('opacity', 0.5)
            .transition()
            .delay(i * 200)
            .duration(2000)
            .attr('r', planet.radius + 100)
            .attr('opacity', 0)
            .remove();
    }
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
    
    // Reset progress bars
    planets.forEach(planet => {
        updatePlanetProgress(planet.id, 0);
    });
    
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

// Initialize visualization
drawPlanets();

// Make functions globally accessible
window.startSystematicSearch = startSystematicSearch;
window.showPossibilitySpace = showPossibilitySpace;
window.focusOnPlanet = focusOnPlanet;
window.resetVisualization = resetVisualization;

// Debug check for stats elements
console.log('Advanced Life element:', document.getElementById('advancedLife'));
console.log('Civilizations element:', document.getElementById('civilizations'));

// Test function to verify stats work
window.testStats = function() {
    searchStats.lifeForms = 150;
    searchStats.advancedLife = 25;
    searchStats.civilizations = 3;
    updateStats();
    console.log('Stats updated - check if Advanced Life and Civilizations show values');
};