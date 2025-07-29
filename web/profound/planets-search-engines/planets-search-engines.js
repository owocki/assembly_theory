// Planets as Search Engines Visualization

const svg = d3.select("#visualization");
const width = window.innerWidth;
const height = window.innerHeight;

svg.attr("width", width).attr("height", height);

// Planet data representing different search strategies
const planets = [
    {
        id: "earth",
        name: "Earth",
        x: width * 0.3,
        y: height * 0.5,
        radius: 60,
        color: "#4a9eff",
        searchType: "Carbon-Water Chemistry",
        experiments: 10000000000,
        lifeFound: 8700000,  // estimated species
        searchTime: 4.5,
        description: "Liquid water enables complex carbon chemistry and rapid molecular assembly experiments"
    },
    {
        id: "titan",
        name: "Titan",
        x: width * 0.6,
        y: height * 0.3,
        radius: 40,
        color: "#ffa500",
        searchType: "Hydrocarbon Lakes",
        experiments: 1000000000,
        lifeFound: 0,
        searchTime: 4.5,
        description: "Methane-ethane cycles create unique assembly pathways unavailable on Earth"
    },
    {
        id: "europa",
        name: "Europa",
        x: width * 0.7,
        y: height * 0.7,
        radius: 35,
        color: "#87ceeb",
        searchType: "Subsurface Ocean",
        experiments: 500000000,
        lifeFound: 0,
        searchTime: 4.5,
        description: "High-pressure ocean chemistry with mineral interfaces and tidal heating"
    },
    {
        id: "mars",
        name: "Mars",
        x: width * 0.2,
        y: height * 0.7,
        radius: 45,
        color: "#cd5c5c",
        searchType: "Ancient Aqueous",
        experiments: 2000000000,
        lifeFound: 0,
        searchTime: 4.0,
        description: "Early wet period searched assembly space before atmospheric loss"
    },
    {
        id: "enceladus",
        name: "Enceladus",
        x: width * 0.8,
        y: height * 0.4,
        radius: 30,
        color: "#f0f8ff",
        searchType: "Hydrothermal Vents",
        experiments: 300000000,
        lifeFound: 0,
        searchTime: 4.5,
        description: "Hydrothermal chemistry creates energy gradients for complex assembly"
    }
];

let isSearching = false;
let searchInterval;
let currentExperiments = 0;
let currentPathways = 0;
let currentLifeForms = 0;
let currentTime = 0;

// Create background stars
function createStars() {
    const stars = svg.append("g").attr("class", "stars");
    
    for (let i = 0; i < 200; i++) {
        stars.append("circle")
            .attr("cx", Math.random() * width)
            .attr("cy", Math.random() * height)
            .attr("r", Math.random() * 2)
            .attr("fill", "white")
            .attr("opacity", Math.random() * 0.5 + 0.2);
    }
}

// Create planets with search visualization
function createPlanets() {
    const planetGroup = svg.append("g").attr("class", "planets");
    
    planets.forEach(planet => {
        const group = planetGroup.append("g")
            .attr("class", "planet-group")
            .attr("id", planet.id);
        
        // Search waves (expanding circles)
        for (let i = 0; i < 3; i++) {
            group.append("circle")
                .attr("class", "search-wave")
                .attr("cx", planet.x)
                .attr("cy", planet.y)
                .attr("r", 0)
                .style("animation-delay", `${i * 1}s`);
        }
        
        // Planet body
        group.append("circle")
            .attr("class", "planet")
            .attr("cx", planet.x)
            .attr("cy", planet.y)
            .attr("r", planet.radius)
            .attr("fill", planet.color)
            .on("click", () => showPlanetInfo(planet))
            .on("mouseover", function(event) {
                showTooltip(event, planet);
            })
            .on("mouseout", hideTooltip);
        
        // Planet name
        group.append("text")
            .attr("x", planet.x)
            .attr("y", planet.y + planet.radius + 20)
            .attr("text-anchor", "middle")
            .attr("fill", "white")
            .attr("font-size", "14px")
            .text(planet.name);
    });
}

// Create search particles representing chemical experiments
function createSearchParticles() {
    if (!isSearching) return;
    
    planets.forEach(planet => {
        // Create particles emanating from planet
        for (let i = 0; i < 5; i++) {
            const angle = Math.random() * 2 * Math.PI;
            const distance = planet.radius + 10;
            const startX = planet.x + Math.cos(angle) * distance;
            const startY = planet.y + Math.sin(angle) * distance;
            
            const particle = svg.append("circle")
                .attr("class", "search-particles")
                .attr("cx", startX)
                .attr("cy", startY)
                .attr("r", 2)
                .attr("fill", planet.color)
                .attr("opacity", 0.8);
            
            // Animate particle
            particle.transition()
                .duration(2000)
                .attr("cx", startX + Math.cos(angle) * 100)
                .attr("cy", startY + Math.sin(angle) * 100)
                .attr("r", 1)
                .attr("opacity", 0)
                .remove();
        }
    });
    
    // Update stats
    currentExperiments += Math.floor(Math.random() * 1000000);
    currentPathways += Math.floor(Math.random() * 100);
    currentTime += 0.001;
    
    updateStats();
}

// Create life forms when found
function showLifeForms() {
    planets.forEach(planet => {
        if (planet.lifeFound > 0) {
            // Create life symbols around Earth
            for (let i = 0; i < 8; i++) {
                const angle = (i / 8) * 2 * Math.PI;
                const distance = planet.radius + 40;
                const x = planet.x + Math.cos(angle) * distance;
                const y = planet.y + Math.sin(angle) * distance;
                
                const lifeForm = svg.append("text")
                    .attr("class", "life-form")
                    .attr("x", x)
                    .attr("y", y)
                    .attr("text-anchor", "middle")
                    .attr("fill", "#00ff00")
                    .attr("font-size", "20px")
                    .text(getLifeSymbol(i))
                    .style("opacity", 0);
                
                // Animate appearance
                lifeForm.transition()
                    .delay(i * 200)
                    .duration(500)
                    .style("opacity", 1);
            }
            
            currentLifeForms = planet.lifeFound;
            updateStats();
        }
    });
}

function getLifeSymbol(index) {
    const symbols = ["🦠", "🌱", "🐟", "🦋", "🐒", "🧬", "🦄", "👽"];
    return symbols[index];
}

// Show assembly pathways between planets
function showAssemblyPathways() {
    const pathGroup = svg.append("g").attr("class", "assembly-paths");
    
    for (let i = 0; i < planets.length - 1; i++) {
        for (let j = i + 1; j < planets.length; j++) {
            const planet1 = planets[i];
            const planet2 = planets[j];
            
            pathGroup.append("path")
                .attr("class", "assembly-trail")
                .attr("d", `M ${planet1.x},${planet1.y} Q ${(planet1.x + planet2.x) / 2},${(planet1.y + planet2.y) / 2 - 50} ${planet2.x},${planet2.y}`)
                .style("opacity", 0)
                .transition()
                .delay(Math.random() * 2000)
                .duration(1000)
                .style("opacity", 0.6);
        }
    }
}

// Control functions
function startSearching() {
    if (isSearching) return;
    
    isSearching = true;
    document.querySelector('.control-btn').classList.add('active');
    
    // Animate search waves
    svg.selectAll(".search-wave")
        .transition()
        .duration(2000)
        .attr("r", d => {
            const planet = planets.find(p => p.x === +d3.select(this).attr("cx"));
            return planet ? planet.radius + 60 : 60;
        })
        .style("opacity", 0.4);
    
    // Start particle animation
    searchInterval = setInterval(createSearchParticles, 100);
    
    // Show assembly pathways after a delay
    setTimeout(showAssemblyPathways, 3000);
}

function resetSimulation() {
    isSearching = false;
    clearInterval(searchInterval);
    
    // Remove all dynamic elements
    svg.selectAll(".search-particles").remove();
    svg.selectAll(".life-form").remove();
    svg.selectAll(".assembly-paths").remove();
    
    // Reset search waves
    svg.selectAll(".search-wave")
        .attr("r", 0)
        .style("opacity", 0.4);
    
    // Reset stats
    currentExperiments = 0;
    currentPathways = 0;
    currentLifeForms = 0;
    currentTime = 0;
    updateStats();
    
    document.querySelector('.control-btn').classList.remove('active');
}

function updateStats() {
    document.getElementById("experiments").textContent = currentExperiments.toLocaleString();
    document.getElementById("pathways").textContent = currentPathways.toLocaleString();
    document.getElementById("lifeforms").textContent = currentLifeForms.toLocaleString();
    document.getElementById("searchtime").textContent = currentTime.toFixed(3) + " Gyr";
}

function toggleInfo() {
    const panel = document.getElementById("infoPanel");
    panel.style.display = panel.style.display === "none" ? "block" : "none";
}

// Tooltip functions
function showTooltip(event, planet) {
    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);
    
    tooltip.html(`
        <strong>${planet.name}</strong><br/>
        Search Type: ${planet.searchType}<br/>
        Experiments: ${planet.experiments.toLocaleString()}<br/>
        Life Found: ${planet.lifeFound.toLocaleString()}<br/>
        Search Time: ${planet.searchTime} Gyr<br/>
        <br/>
        ${planet.description}
    `)
        .style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY - 10) + "px")
        .transition()
        .duration(200)
        .style("opacity", 1);
}

function hideTooltip() {
    d3.selectAll(".tooltip").remove();
}

function showPlanetInfo(planet) {
    const panel = document.getElementById("infoPanel");
    panel.innerHTML = `
        <h3>${planet.name} Search Engine</h3>
        <p><strong>Search Strategy:</strong> ${planet.searchType}</p>
        <p>${planet.description}</p>
        
        <div class="stats">
            <div class="stat-item">
                <span>Chemical Experiments:</span>
                <span>${planet.experiments.toLocaleString()}</span>
            </div>
            <div class="stat-item">
                <span>Life Forms Found:</span>
                <span>${planet.lifeFound.toLocaleString()}</span>
            </div>
            <div class="stat-item">
                <span>Search Duration:</span>
                <span>${planet.searchTime} Gyr</span>
            </div>
            <div class="stat-item">
                <span>Success Rate:</span>
                <span>${((planet.lifeFound / planet.experiments) * 100).toExponential(2)}%</span>
            </div>
        </div>
        
        <p style="margin-top: 15px; font-size: 12px; opacity: 0.7;">
            Each planet's unique chemistry creates different search pathways through assembly space. 
            Success depends on energy availability, chemical diversity, and time.
        </p>
    `;
}

// Initialize visualization
createStars();
createPlanets();

// Auto-start demonstration
setTimeout(() => {
    startSearching();
}, 1000);