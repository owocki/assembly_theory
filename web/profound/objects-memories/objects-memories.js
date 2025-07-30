// Objects as Memories Visualization

const svg = d3.select("#visualization");
const width = window.innerWidth;
const height = window.innerHeight;

svg.attr("width", width).attr("height", height);

// Hierarchical object data from electron to cosmos
const hierarchyLevels = [
    {
        id: "electron",
        name: "Electron",
        level: 0,
        radius: 15,
        color: "#ff6b9d",
        assemblyIndex: 1,
        containedIn: ["atom"],
        description: "Fundamental particle, wave-function memory"
    },
    {
        id: "atom",
        name: "Atom",
        level: 1,
        radius: 25,
        color: "#c44569",
        assemblyIndex: 10,
        containedIn: ["molecule"],
        contains: ["electron"],
        description: "Hydrogen - simplest atomic memory"
    },
    {
        id: "molecule",
        name: "Molecule",
        level: 2,
        radius: 35,
        color: "#f8b500",
        assemblyIndex: 100,
        containedIn: ["tissue"],
        contains: ["atom"],
        description: "Water molecule - chemical bonds as memory"
    },
    {
        id: "tissue",
        name: "Tissue",
        level: 3,
        radius: 45,
        color: "#a55eea",
        assemblyIndex: 10000,
        containedIn: ["organ"],
        contains: ["molecule"],
        description: "Living tissue - cellular organization memory"
    },
    {
        id: "organ",
        name: "Organ",
        level: 4,
        radius: 55,
        color: "#0fb9b1",
        assemblyIndex: 1000000,
        containedIn: ["organism"],
        contains: ["tissue"],
        description: "Heart - functional structure memory"
    },
    {
        id: "organism",
        name: "Organism",
        level: 5,
        radius: 65,
        color: "#6c5ce7",
        assemblyIndex: 100000000,
        containedIn: ["family"],
        contains: ["organ"],
        description: "Human - integrated system memory"
    },
    {
        id: "family",
        name: "Family",
        level: 6,
        radius: 75,
        color: "#fd79a8",
        assemblyIndex: 500000000,
        containedIn: ["town"],
        contains: ["organism"],
        description: "Family unit - social structure memory"
    },
    {
        id: "town",
        name: "Town",
        level: 7,
        radius: 85,
        color: "#00b894",
        assemblyIndex: 1000000000,
        containedIn: ["city"],
        contains: ["family"],
        description: "Community - collective organization memory"
    },
    {
        id: "city",
        name: "City",
        level: 8,
        radius: 95,
        color: "#e17055",
        assemblyIndex: 10000000000,
        containedIn: ["country"],
        contains: ["town"],
        description: "Metropolis - urban system memory"
    },
    {
        id: "country",
        name: "Country",
        level: 9,
        radius: 105,
        color: "#74b9ff",
        assemblyIndex: 100000000000,
        containedIn: ["planet"],
        contains: ["city"],
        description: "Nation - political structure memory"
    },
    {
        id: "planet",
        name: "Planet",
        level: 10,
        radius: 115,
        color: "#a29bfe",
        assemblyIndex: 1000000000000,
        containedIn: ["cosmos"],
        contains: ["country"],
        description: "Earth - biosphere memory"
    },
    {
        id: "cosmos",
        name: "Cosmos",
        level: 11,
        radius: 125,
        color: "#ff7675",
        assemblyIndex: 10000000000000,
        contains: ["planet"],
        description: "Universe - all possible memories"
    }
];

// Calculate positions for hierarchical layout
hierarchyLevels.forEach((obj, index) => {
    const angle = (index / hierarchyLevels.length) * 2 * Math.PI - Math.PI/2;
    const centerX = width / 2;
    const centerY = height / 2;
    const radiusMultiplier = Math.min(width, height) * 0.35;
    
    obj.x = centerX + Math.cos(angle) * radiusMultiplier;
    obj.y = centerY + Math.sin(angle) * radiusMultiplier;
    
    // Add memories based on hierarchy
    obj.memories = [];
    
    // All objects contain the memory of the Big Bang
    obj.memories.push({ time: "13.8 Gyr", event: "Big Bang - quantum fluctuations", layer: "cosmic" });
    
    // Add level-specific memories
    if (obj.level >= 1) obj.memories.push({ time: "13.7 Gyr", event: "First atoms form", layer: "atomic" });
    if (obj.level >= 2) obj.memories.push({ time: "4.6 Gyr", event: "Molecular clouds in space", layer: "chemical" });
    if (obj.level >= 3) obj.memories.push({ time: "3.8 Gyr", event: "First organic molecules", layer: "biological" });
    if (obj.level >= 4) obj.memories.push({ time: "600 Myr", event: "Complex multicellular life", layer: "evolutionary" });
    if (obj.level >= 5) obj.memories.push({ time: "7 Myr", event: "Hominid evolution begins", layer: "species" });
    if (obj.level >= 6) obj.memories.push({ time: "300 kyr", event: "Homo sapiens emerges", layer: "human" });
    if (obj.level >= 7) obj.memories.push({ time: "10 kyr", event: "Agricultural revolution", layer: "cultural" });
    if (obj.level >= 8) obj.memories.push({ time: "5 kyr", event: "First cities", layer: "urban" });
    if (obj.level >= 9) obj.memories.push({ time: "500 yr", event: "Nation states form", layer: "political" });
    if (obj.level >= 10) obj.memories.push({ time: "4.5 Gyr", event: "Earth forms", layer: "planetary" });
    if (obj.level >= 11) obj.memories.push({ time: "Now", event: "Conscious observation", layer: "present" });
});

const objects = hierarchyLevels;

// Color scales for different memory layers
const layerColors = {
    "cosmic": "#ff6b9d",
    "stellar": "#ff9ff3",
    "geological": "#54a0ff",
    "chemical": "#5f27cd",
    "prebiotic": "#00d2d3",
    "primordial": "#ff9f43",
    "molecular": "#ff6348",
    "cellular": "#2ed573",
    "evolutionary": "#ffa502",
    "biological": "#3742fa",
    "genetic": "#2f3542",
    "informational": "#a4b0be",
    "developmental": "#ff3838",
    "neural": "#8c7ae6",
    "cognitive": "#686de0",
    "mammalian": "#4834d4",
    "cultural": "#badc58",
    "scientific": "#6c5ce7",
    "technological": "#fd79a8",
    "engineering": "#fdcb6e",
    "contemporary": "#e17055",
    "functional": "#00b894",
    "complexity": "#fd79a8",
    "experience": "#a29bfe",
    "personal": "#ff7675",
    "atomic": "#00cec9",
    "species": "#dfe6e9",
    "human": "#fab1a0",
    "urban": "#ff7979",
    "political": "#badc58",
    "planetary": "#74b9ff",
    "present": "#ffffff"
};

let currentView = "default";

// Create background timeline
function createTimeline() {
    const timelineGroup = svg.append("g").attr("class", "timeline-group");
    
    // Main timeline
    timelineGroup.append("line")
        .attr("class", "timeline")
        .attr("x1", 100)
        .attr("y1", height - 100)
        .attr("x2", width - 100)
        .attr("y2", height - 100);
    
    // Time markers
    const timePoints = [
        { time: "13.8 Gyr", x: 120, label: "Big Bang" },
        { time: "4.6 Gyr", x: 300, label: "Solar System" },
        { time: "3.8 Gyr", x: 400, label: "Life" },
        { time: "500 Myr", x: 600, label: "Complex Life" },
        { time: "10 kyr", x: 800, label: "Civilization" },
        { time: "Present", x: width - 120, label: "Now" }
    ];
    
    timePoints.forEach(point => {
        timelineGroup.append("line")
            .attr("x1", point.x)
            .attr("y1", height - 110)
            .attr("x2", point.x)
            .attr("y2", height - 90)
            .attr("stroke", "rgba(255, 255, 255, 0.5)")
            .attr("stroke-width", 1);
        
        timelineGroup.append("text")
            .attr("class", "time-marker")
            .attr("x", point.x)
            .attr("y", height - 70)
            .attr("text-anchor", "middle")
            .text(point.label);
        
        timelineGroup.append("text")
            .attr("class", "time-marker")
            .attr("x", point.x)
            .attr("y", height - 55)
            .attr("text-anchor", "middle")
            .attr("font-size", "10px")
            .attr("opacity", 0.7)
            .text(point.time);
    });
}

// Create objects with memory visualization
function createObjects() {
    const objectGroup = svg.append("g").attr("class", "objects");
    
    // Draw containment connections first
    objects.forEach(obj => {
        if (obj.contains) {
            obj.contains.forEach(containedId => {
                const containedObj = objects.find(o => o.id === containedId);
                if (containedObj) {
                    objectGroup.append("path")
                        .attr("class", "containment-link")
                        .attr("d", `M ${obj.x},${obj.y} L ${containedObj.x},${containedObj.y}`)
                        .attr("stroke", "rgba(255, 255, 255, 0.2)")
                        .attr("stroke-width", 2)
                        .attr("stroke-dasharray", "5,5");
                }
            });
        }
    });
    
    objects.forEach(obj => {
        const group = objectGroup.append("g")
            .attr("class", "object-group")
            .attr("id", obj.id);
        
        // Complexity indicator (rings based on assembly index)
        const rings = Math.min(Math.log10(obj.assemblyIndex), 10);
        for (let i = 0; i < rings; i++) {
            group.append("circle")
                .attr("class", "complexity-indicator")
                .attr("cx", obj.x)
                .attr("cy", obj.y)
                .attr("r", obj.radius + (i * 3))
                .attr("opacity", 0.1 - (i * 0.01));
        }
        
        // Main object
        group.append("circle")
            .attr("class", "object-node")
            .attr("cx", obj.x)
            .attr("cy", obj.y)
            .attr("r", obj.radius)
            .attr("fill", obj.color)
            .on("click", () => showNestedContainment(obj))
            .on("mouseover", function(event) {
                showTooltip(event, obj);
                highlightContainment(obj);
            })
            .on("mouseout", function() {
                hideTooltip();
                unhighlightContainment();
            });
        
        // Object label
        group.append("text")
            .attr("x", obj.x)
            .attr("y", obj.y - obj.radius - 10)
            .attr("text-anchor", "middle")
            .attr("fill", "white")
            .attr("font-size", "14px")
            .attr("font-weight", "bold")
            .text(obj.name);
        
        // Assembly index label
        group.append("text")
            .attr("x", obj.x)
            .attr("y", obj.y + obj.radius + 20)
            .attr("text-anchor", "middle")
            .attr("fill", "rgba(255, 255, 255, 0.7)")
            .attr("font-size", "12px")
            .text(`AI: ${obj.assemblyIndex.toLocaleString()}`);
    });
}

// Show nested containment visualization
function showNestedContainment(selectedObj) {
    // Clear previous visualizations
    svg.selectAll(".memory-trace").remove();
    svg.selectAll(".memory-layer").remove();
    svg.selectAll(".nested-container").remove();
    
    const containerGroup = svg.append("g").attr("class", "nested-container");
    
    // Find all objects contained within the selected object
    const containedObjects = [];
    function findContained(obj) {
        containedObjects.push(obj);
        if (obj.contains) {
            obj.contains.forEach(id => {
                const contained = objects.find(o => o.id === id);
                if (contained) findContained(contained);
            });
        }
    }
    findContained(selectedObj);
    
    // Sort by level for proper rendering order
    containedObjects.sort((a, b) => b.level - a.level);
    
    // Create nested visualization centered on selected object
    const centerX = width / 2;
    const centerY = height / 2;
    
    containedObjects.forEach((obj, index) => {
        const scale = 1 - (index * 0.15);
        const opacity = 1 - (index * 0.1);
        
        // Draw containing circle
        containerGroup.append("circle")
            .attr("cx", centerX)
            .attr("cy", centerY)
            .attr("r", obj.radius * scale * 2)
            .attr("fill", "none")
            .attr("stroke", obj.color)
            .attr("stroke-width", 2)
            .attr("opacity", opacity)
            .attr("stroke-dasharray", index === 0 ? "none" : "10,5");
        
        // Label for each level
        containerGroup.append("text")
            .attr("x", centerX)
            .attr("y", centerY - (obj.radius * scale * 2) - 10)
            .attr("text-anchor", "middle")
            .attr("fill", obj.color)
            .attr("font-size", `${14 - index}px`)
            .attr("opacity", opacity)
            .text(obj.name);
        
        // Description
        containerGroup.append("text")
            .attr("x", centerX)
            .attr("y", centerY + (obj.radius * scale * 2) + 20)
            .attr("text-anchor", "middle")
            .attr("fill", "rgba(255, 255, 255, 0.6)")
            .attr("font-size", "11px")
            .attr("opacity", opacity * 0.8)
            .text(obj.description);
    });
    
    // Update memory panel for nested view
    updateNestedMemoryPanel(selectedObj, containedObjects);
}

// Highlight containment relationships on hover
function highlightContainment(obj) {
    // Dim all objects
    svg.selectAll(".object-node").attr("opacity", 0.3);
    
    // Highlight the selected object and its containment chain
    const highlightChain = [];
    
    // Find all contained objects
    function findContainedChain(currentObj) {
        highlightChain.push(currentObj.id);
        if (currentObj.contains) {
            currentObj.contains.forEach(id => {
                const contained = objects.find(o => o.id === id);
                if (contained) findContainedChain(contained);
            });
        }
    }
    
    // Find all containing objects
    function findContainingChain(currentObj) {
        if (currentObj.containedIn) {
            currentObj.containedIn.forEach(id => {
                highlightChain.push(id);
                const container = objects.find(o => o.id === id);
                if (container) findContainingChain(container);
            });
        }
    }
    
    findContainedChain(obj);
    findContainingChain(obj);
    
    // Highlight the chain
    highlightChain.forEach(id => {
        svg.select(`#${id} .object-node`).attr("opacity", 1);
    });
}

function unhighlightContainment() {
    svg.selectAll(".object-node").attr("opacity", 1);
}

// Update memory panel for nested containment view
function updateNestedMemoryPanel(selectedObj, containedObjects) {
    const content = document.getElementById("memoryContent");
    content.innerHTML = `
        <h4>${selectedObj.name} Contains:</h4>
        <p style="font-size: 12px; opacity: 0.8; margin-bottom: 15px;">
            Each level inherits all memories from smaller scales
        </p>
    `;
    
    containedObjects.slice(1).forEach(obj => {
        const item = document.createElement("div");
        item.className = "memory-item";
        item.style.borderLeftColor = obj.color;
        
        item.innerHTML = `
            <div style="font-weight: bold; color: ${obj.color};">${obj.name}</div>
            <div style="font-size: 12px; opacity: 0.8;">${obj.description}</div>
            <div style="font-size: 11px; opacity: 0.6; margin-top: 3px;">
                Assembly Index: ${obj.assemblyIndex.toLocaleString()}
            </div>
        `;
        
        content.appendChild(item);
    });
    
    // Add total memory calculation
    const totalMemory = containedObjects.reduce((sum, obj) => sum + obj.memories.length, 0);
    const summary = document.createElement("div");
    summary.style.marginTop = "20px";
    summary.style.padding = "10px";
    summary.style.background = "rgba(255, 107, 157, 0.2)";
    summary.style.borderRadius = "5px";
    summary.innerHTML = `
        <strong>Total Embedded Memories:</strong> ${totalMemory}<br>
        <small>Each object preserves the history of all its components</small>
    `;
    content.appendChild(summary);
}

// Show memory layers for selected object
function showObjectMemories(obj) {
    // Clear previous memory traces
    svg.selectAll(".memory-trace").remove();
    svg.selectAll(".memory-layer").remove();
    
    const memoryGroup = svg.append("g").attr("class", "memory-layers");
    
    obj.memories.forEach((memory, index) => {
        const angle = (index / obj.memories.length) * 2 * Math.PI;
        const distance = obj.radius + 60 + (index * 10);
        const x = obj.x + Math.cos(angle) * distance;
        const y = obj.y + Math.sin(angle) * distance;
        
        // Memory node
        const memoryNode = memoryGroup.append("circle")
            .attr("class", "memory-layer")
            .attr("cx", x)
            .attr("cy", y)
            .attr("r", 8)
            .attr("fill", layerColors[memory.layer] || "#ffffff")
            .attr("opacity", 0);
        
        // Memory trace (connection to object)
        memoryGroup.append("path")
            .attr("class", "memory-trace")
            .attr("d", `M ${obj.x},${obj.y} Q ${(obj.x + x) / 2},${(obj.y + y) / 2 - 30} ${x},${y}`)
            .attr("stroke", layerColors[memory.layer] || "#ffffff")
            .attr("opacity", 0);
        
        // Memory label
        memoryGroup.append("text")
            .attr("class", "memory-layer")
            .attr("x", x)
            .attr("y", y - 15)
            .attr("text-anchor", "middle")
            .attr("fill", layerColors[memory.layer] || "#ffffff")
            .attr("font-size", "10px")
            .attr("opacity", 0)
            .text(memory.time);
        
        // Animate memory appearance
        setTimeout(() => {
            memoryNode.transition()
                .duration(500)
                .attr("opacity", 0.8);
            
            svg.selectAll(".memory-trace")
                .transition()
                .duration(500)
                .attr("opacity", 0.6);
            
            svg.selectAll(".memory-layer")
                .transition()
                .duration(500)
                .attr("opacity", 1);
        }, index * 200);
    });
    
    // Update memory panel
    updateMemoryPanel(obj);
}

function updateMemoryPanel(obj) {
    const content = document.getElementById("memoryContent");
    content.innerHTML = "";
    
    obj.memories.forEach(memory => {
        const item = document.createElement("div");
        item.className = "memory-item";
        item.style.borderLeftColor = layerColors[memory.layer] || "#ffffff";
        
        item.innerHTML = `
            <div class="memory-time">${memory.time} ago</div>
            <div>${memory.event}</div>
            <div style="font-size: 11px; opacity: 0.6; margin-top: 3px;">${memory.layer} layer</div>
        `;
        
        content.appendChild(item);
    });
}

// Show timeline view
function showTimelineMemory() {
    currentView = "timeline";
    
    // Clear previous visualizations
    svg.selectAll(".memory-trace").remove();
    svg.selectAll(".memory-layer").remove();
    
    // Create timeline connections for all objects
    objects.forEach(obj => {
        obj.memories.forEach((memory, index) => {
            const timeX = getTimelinePosition(memory.time);
            
            // Connection from timeline to object
            svg.append("path")
                .attr("class", "memory-trace active-memory")
                .attr("d", `M ${timeX},${height - 100} Q ${(timeX + obj.x) / 2},${obj.y - 100} ${obj.x},${obj.y}`)
                .attr("stroke", layerColors[memory.layer] || "#ffffff")
                .attr("opacity", 0)
                .transition()
                .delay(index * 100)
                .duration(1000)
                .attr("opacity", 0.4);
        });
    });
}

function getTimelinePosition(timeStr) {
    const timelineStart = 120;
    const timelineEnd = width - 120;
    const timelineLength = timelineEnd - timelineStart;
    
    // Simple mapping based on time string
    if (timeStr.includes("13.8")) return timelineStart;
    if (timeStr.includes("4.6")) return timelineStart + timelineLength * 0.2;
    if (timeStr.includes("3.8")) return timelineStart + timelineLength * 0.3;
    if (timeStr.includes("500")) return timelineStart + timelineLength * 0.6;
    if (timeStr.includes("10 k")) return timelineStart + timelineLength * 0.8;
    if (timeStr.includes("Present")) return timelineEnd;
    
    return timelineStart + timelineLength * 0.5; // default middle
}

// Show layered memory view
function showLayeredMemory() {
    currentView = "layered";
    
    // Clear previous
    svg.selectAll(".memory-trace").remove();
    svg.selectAll(".memory-layer").remove();
    
    // Create concentric memory layers around each object
    objects.forEach(obj => {
        obj.memories.forEach((memory, index) => {
            const layerRadius = obj.radius + 20 + (index * 15);
            
            // Memory ring
            svg.append("circle")
                .attr("class", "memory-layer")
                .attr("cx", obj.x)
                .attr("cy", obj.y)
                .attr("r", layerRadius)
                .attr("fill", "none")
                .attr("stroke", layerColors[memory.layer] || "#ffffff")
                .attr("stroke-width", 2)
                .attr("opacity", 0)
                .transition()
                .delay(index * 150)
                .duration(800)
                .attr("opacity", 0.3);
        });
    });
}

// Show hierarchy pathway from electron to cosmos
function showHierarchyPath() {
    currentView = "hierarchy";
    
    // Clear previous
    svg.selectAll(".memory-trace").remove();
    svg.selectAll(".memory-layer").remove();
    svg.selectAll(".nested-container").remove();
    
    // Show hierarchy progression by level
    const sortedByLevel = [...objects].sort((a, b) => a.level - b.level);
    
    for (let i = 0; i < sortedByLevel.length - 1; i++) {
        const obj1 = sortedByLevel[i];
        const obj2 = sortedByLevel[i + 1];
        
        svg.append("path")
            .attr("class", "memory-trace active-memory")
            .attr("d", `M ${obj1.x},${obj1.y} Q ${(obj1.x + obj2.x) / 2},${(obj1.y + obj2.y) / 2 - 50} ${obj2.x},${obj2.y}`)
            .attr("stroke", `url(#gradient${i})`)
            .attr("stroke-width", 3)
            .attr("opacity", 0)
            .transition()
            .delay(i * 300)
            .duration(800)
            .attr("opacity", 0.8);
        
        // Create gradient for each connection
        const gradient = svg.append("defs").append("linearGradient")
            .attr("id", `gradient${i}`)
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "100%")
            .attr("y2", "0%");
        
        gradient.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", obj1.color);
        
        gradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", obj2.color);
    }
}

// Show containment view focusing on nested relationships
function showContainmentView() {
    currentView = "containment";
    
    // Clear previous
    svg.selectAll(".memory-trace").remove();
    svg.selectAll(".memory-layer").remove();
    svg.selectAll(".nested-container").remove();
    
    // Create a central view showing all containment relationships
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Place cosmos at center
    const cosmos = objects.find(o => o.id === "cosmos");
    
    // Animate all objects to concentric positions
    objects.forEach(obj => {
        const distance = (12 - obj.level) * 40;
        
        d3.select(`#${obj.id} .object-node`)
            .transition()
            .duration(1000)
            .attr("cx", centerX)
            .attr("cy", centerY);
        
        d3.select(`#${obj.id}`)
            .selectAll("text")
            .transition()
            .duration(1000)
            .attr("x", centerX)
            .attr("y", function() {
                const currentY = parseFloat(d3.select(this).attr("y"));
                const currentObjY = parseFloat(d3.select(`#${obj.id} .object-node`).attr("cy"));
                const offset = currentY - currentObjY;
                return centerY + offset;
            });
        
        // Draw concentric rings
        svg.append("circle")
            .attr("class", "memory-layer")
            .attr("cx", centerX)
            .attr("cy", centerY)
            .attr("r", distance)
            .attr("fill", "none")
            .attr("stroke", obj.color)
            .attr("stroke-width", 1)
            .attr("stroke-dasharray", "10,5")
            .attr("opacity", 0)
            .transition()
            .delay(obj.level * 100)
            .duration(500)
            .attr("opacity", 0.3);
    });
}

function resetView() {
    currentView = "default";
    svg.selectAll(".memory-trace").remove();
    svg.selectAll(".memory-layer").remove();
    svg.selectAll(".nested-container").remove();
    
    // Reset object positions
    objects.forEach(obj => {
        const angle = (obj.level / hierarchyLevels.length) * 2 * Math.PI - Math.PI/2;
        const centerX = width / 2;
        const centerY = height / 2;
        const radiusMultiplier = Math.min(width, height) * 0.35;
        
        const targetX = centerX + Math.cos(angle) * radiusMultiplier;
        const targetY = centerY + Math.sin(angle) * radiusMultiplier;
        
        d3.select(`#${obj.id} .object-node`)
            .transition()
            .duration(1000)
            .attr("cx", targetX)
            .attr("cy", targetY);
        
        d3.select(`#${obj.id}`)
            .selectAll("text")
            .transition()
            .duration(1000)
            .attr("x", targetX)
            .attr("y", function() {
                const currentY = parseFloat(d3.select(this).attr("y"));
                const currentObjY = parseFloat(d3.select(`#${obj.id} .object-node`).attr("cy"));
                const offset = currentY - currentObjY;
                return targetY + offset;
            });
    });
    
    // Reset memory panel
    document.getElementById("memoryContent").innerHTML = `
        <div class="memory-item">
            <div class="memory-time">13.8 Gyr ago</div>
            <div>Big Bang - quantum fluctuations begin</div>
        </div>
        <div class="memory-item">
            <div class="memory-time">13.7 Gyr ago</div>
            <div>First atoms form - hydrogen and helium</div>
        </div>
        <div class="memory-item">
            <div class="memory-time">4.6 Gyr ago</div>
            <div>Solar system forms - heavy elements available</div>
        </div>
        <div class="memory-item">
            <div class="memory-time">3.8 Gyr ago</div>
            <div>Life emerges - molecular assembly begins</div>
        </div>
        <div class="memory-item">
            <div class="memory-time">Present</div>
            <div>Cosmos contains all possible memories</div>
        </div>
    `;
}

// Tooltip functions
function showTooltip(event, obj) {
    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);
    
    const containsText = obj.contains ? 
        `Contains: ${obj.contains.map(id => objects.find(o => o.id === id)?.name).join(', ')}<br/>` : '';
    const containedInText = obj.containedIn ? 
        `Contained in: ${obj.containedIn.map(id => objects.find(o => o.id === id)?.name).join(', ')}<br/>` : '';
    
    tooltip.html(`
        <strong>${obj.name}</strong><br/>
        ${obj.description}<br/>
        <br/>
        Assembly Index: ${obj.assemblyIndex.toLocaleString()}<br/>
        Hierarchy Level: ${obj.level}<br/>
        ${containsText}
        ${containedInText}
        <br/>
        This object embodies ${obj.memories.length} layers of historical memory.
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

// Initialize visualization
createTimeline();
createObjects();

// Auto-demonstration - show cosmos containing all
setTimeout(() => {
    const cosmos = objects.find(o => o.id === "cosmos");
    showNestedContainment(cosmos);
}, 2000);