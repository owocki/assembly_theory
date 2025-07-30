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
            .attr("fill-opacity", 0.3)
            .attr("stroke", obj.color)
            .attr("stroke-width", 2)
            .on("click", () => showNestedContainment(obj))
            .on("mouseover", function(event) {
                showTooltip(event, obj);
                highlightContainment(obj);
            })
            .on("mouseout", function() {
                hideTooltip();
                unhighlightContainment();
            });
        
        // Add icon inside circle
        const iconScale = obj.radius / 20; // Scale icon based on circle size
        group.append("use")
            .attr("href", `#icon-${obj.id}`)
            .attr("transform", `translate(${obj.x}, ${obj.y}) scale(${iconScale})`)
            .style("pointer-events", "none");
        
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
        const circleRadius = obj.radius * scale * 2;
        
        // Draw containing circle
        containerGroup.append("circle")
            .attr("cx", centerX)
            .attr("cy", centerY)
            .attr("r", circleRadius)
            .attr("fill", obj.color)
            .attr("fill-opacity", 0.1)
            .attr("stroke", obj.color)
            .attr("stroke-width", 2)
            .attr("opacity", opacity)
            .attr("stroke-dasharray", index === 0 ? "none" : "10,5");
        
        // Add icon for each level
        const iconScale = circleRadius / 25;
        containerGroup.append("use")
            .attr("href", `#icon-${obj.id}`)
            .attr("transform", `translate(${centerX}, ${centerY}) scale(${iconScale})`)
            .attr("opacity", opacity * 0.8)
            .style("pointer-events", "none");
        
        // Label for each level
        containerGroup.append("text")
            .attr("x", centerX)
            .attr("y", centerY - circleRadius - 10)
            .attr("text-anchor", "middle")
            .attr("fill", obj.color)
            .attr("font-size", `${14 - index}px`)
            .attr("opacity", opacity)
            .text(obj.name);
        
        // Description
        containerGroup.append("text")
            .attr("x", centerX)
            .attr("y", centerY + circleRadius + 20)
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
    // Dim all objects and icons
    svg.selectAll(".object-node").attr("opacity", 0.3);
    svg.selectAll(".object-group use").attr("opacity", 0.3);
    
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
        svg.select(`#${id} use`).attr("opacity", 1);
    });
}

function unhighlightContainment() {
    svg.selectAll(".object-node").attr("opacity", 1);
    svg.selectAll(".object-group use").attr("opacity", 1);
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

// Create icon definitions
function createIconDefs() {
    const defs = svg.append("defs");
    
    // Electron icon - orbital paths
    defs.append("g").attr("id", "icon-electron").html(`
        <circle cx="0" cy="0" r="2" fill="#ff6b9d"/>
        <ellipse cx="0" cy="0" rx="8" ry="4" fill="none" stroke="#ff6b9d" stroke-width="1" opacity="0.6" transform="rotate(45)"/>
        <ellipse cx="0" cy="0" rx="8" ry="4" fill="none" stroke="#ff6b9d" stroke-width="1" opacity="0.6" transform="rotate(-45)"/>
        <ellipse cx="0" cy="0" rx="8" ry="4" fill="none" stroke="#ff6b9d" stroke-width="1" opacity="0.6" transform="rotate(90)"/>
    `);
    
    // Atom icon - nucleus with electron
    defs.append("g").attr("id", "icon-atom").html(`
        <circle cx="0" cy="0" r="5" fill="#c44569"/>
        <circle cx="10" cy="0" r="2" fill="#ff6b9d"/>
        <circle cx="0" cy="0" r="12" fill="none" stroke="#c44569" stroke-width="1" opacity="0.5"/>
    `);
    
    // Molecule icon - connected spheres
    defs.append("g").attr("id", "icon-molecule").html(`
        <line x1="-8" y1="0" x2="8" y2="0" stroke="#f8b500" stroke-width="2"/>
        <line x1="0" y1="-8" x2="0" y2="8" stroke="#f8b500" stroke-width="2"/>
        <circle cx="-8" cy="0" r="4" fill="#f8b500"/>
        <circle cx="8" cy="0" r="4" fill="#f8b500"/>
        <circle cx="0" cy="-8" r="4" fill="#f8b500"/>
        <circle cx="0" cy="8" r="3" fill="#f8b500"/>
        <circle cx="0" cy="0" r="5" fill="#ffa502"/>
    `);
    
    // Tissue icon - cell pattern
    defs.append("g").attr("id", "icon-tissue").html(`
        <path d="M-10,-5 Q-10,-10 -5,-10 L5,-10 Q10,-10 10,-5 L10,5 Q10,10 5,10 L-5,10 Q-10,10 -10,5 Z" fill="none" stroke="#a55eea" stroke-width="1.5"/>
        <circle cx="-5" cy="-5" r="2" fill="#a55eea"/>
        <circle cx="5" cy="-5" r="2" fill="#a55eea"/>
        <circle cx="-5" cy="5" r="2" fill="#a55eea"/>
        <circle cx="5" cy="5" r="2" fill="#a55eea"/>
        <circle cx="0" cy="0" r="3" fill="#8c7ae6"/>
    `);
    
    // Organ icon - heart shape
    defs.append("g").attr("id", "icon-organ").html(`
        <path d="M0,-8 C-5,-13 -15,-13 -15,-5 C-15,0 -10,5 0,12 C10,5 15,0 15,-5 C15,-13 5,-13 0,-8 Z" fill="#0fb9b1" stroke="none"/>
        <path d="M-5,-5 L-2,0 L0,-3 L2,2 L5,-5" fill="none" stroke="white" stroke-width="1.5" opacity="0.8"/>
    `);
    
    // Organism icon - human figure
    defs.append("g").attr("id", "icon-organism").html(`
        <circle cx="0" cy="-8" r="4" fill="#6c5ce7"/>
        <rect x="-5" y="-4" width="10" height="12" rx="2" fill="#6c5ce7"/>
        <rect x="-7" y="-2" width="3" height="8" rx="1" fill="#6c5ce7"/>
        <rect x="4" y="-2" width="3" height="8" rx="1" fill="#6c5ce7"/>
        <rect x="-3" y="8" width="2" height="6" rx="1" fill="#6c5ce7"/>
        <rect x="1" y="8" width="2" height="6" rx="1" fill="#6c5ce7"/>
    `);
    
    // Family icon - group of people
    defs.append("g").attr("id", "icon-family").html(`
        <circle cx="-6" cy="-6" r="3" fill="#fd79a8"/>
        <circle cx="6" cy="-6" r="3" fill="#fd79a8"/>
        <circle cx="0" cy="-2" r="2" fill="#fd79a8"/>
        <path d="M-9,-3 L-9,3 L-3,3 L-3,-3 Z" fill="#fd79a8"/>
        <path d="M3,-3 L3,3 L9,3 L9,-3 Z" fill="#fd79a8"/>
        <path d="M-2,0 L-2,5 L2,5 L2,0 Z" fill="#fd79a8"/>
    `);
    
    // Town icon - buildings
    defs.append("g").attr("id", "icon-town").html(`
        <rect x="-12" y="-5" width="6" height="10" fill="#00b894"/>
        <rect x="-4" y="-8" width="8" height="13" fill="#00b894"/>
        <rect x="6" y="-6" width="6" height="11" fill="#00b894"/>
        <polygon points="-12,-5 -9,-8 -6,-5" fill="#00d2d3"/>
        <polygon points="-4,-8 0,-11 4,-8" fill="#00d2d3"/>
        <polygon points="6,-6 9,-9 12,-6" fill="#00d2d3"/>
        <rect x="-10" y="-2" width="2" height="2" fill="#2ed573" opacity="0.8"/>
        <rect x="-1" y="-5" width="2" height="2" fill="#2ed573" opacity="0.8"/>
        <rect x="8" y="-3" width="2" height="2" fill="#2ed573" opacity="0.8"/>
    `);
    
    // City icon - skyline
    defs.append("g").attr("id", "icon-city").html(`
        <rect x="-14" y="-4" width="4" height="12" fill="#e17055"/>
        <rect x="-9" y="-8" width="5" height="16" fill="#e17055"/>
        <rect x="-3" y="-10" width="6" height="18" fill="#d63031"/>
        <rect x="4" y="-6" width="5" height="14" fill="#e17055"/>
        <rect x="10" y="-7" width="4" height="15" fill="#e17055"/>
        <circle cx="0" cy="-12" r="1" fill="#ff7675" opacity="0.8"/>
        <rect x="-7" y="-5" width="1" height="1" fill="#fab1a0" opacity="0.8"/>
        <rect x="-1" y="-7" width="1" height="1" fill="#fab1a0" opacity="0.8"/>
        <rect x="6" y="-3" width="1" height="1" fill="#fab1a0" opacity="0.8"/>
    `);
    
    // Country icon - flag/map outline
    defs.append("g").attr("id", "icon-country").html(`
        <path d="M-12,-8 Q-10,-10 -5,-10 L5,-10 Q10,-10 12,-6 L12,0 Q10,2 8,2 L10,6 Q8,8 5,8 L-5,8 Q-10,8 -12,4 L-12,-8 Z" fill="#74b9ff" stroke="#0984e3" stroke-width="1"/>
        <circle cx="-4" cy="-3" r="2" fill="#0984e3"/>
        <rect x="2" y="-2" width="6" height="1" fill="#0984e3"/>
        <rect x="2" y="0" width="6" height="1" fill="#0984e3"/>
        <rect x="2" y="2" width="6" height="1" fill="#0984e3"/>
    `);
    
    // Planet icon - Earth
    defs.append("g").attr("id", "icon-planet").html(`
        <circle cx="0" cy="0" r="12" fill="#74b9ff"/>
        <path d="M-12,0 Q-8,-4 -4,-4 Q0,-6 4,-4 Q8,-4 12,0" fill="#2ed573" opacity="0.8"/>
        <path d="M-12,0 Q-8,4 -4,4 Q0,6 4,4 Q8,4 12,0" fill="#2ed573" opacity="0.8"/>
        <path d="M-8,-8 Q-4,-6 0,-8 Q4,-6 8,-8" fill="#2ed573" opacity="0.6"/>
        <ellipse cx="0" cy="0" rx="12" ry="6" fill="none" stroke="#a29bfe" stroke-width="1" opacity="0.5"/>
    `);
    
    // Cosmos icon - galaxy/stars
    defs.append("g").attr("id", "icon-cosmos").html(`
        <circle cx="0" cy="0" r="3" fill="#ff7675"/>
        <path d="M0,-12 Q-12,0 0,12 Q12,0 0,-12 Z" fill="none" stroke="#ff7675" stroke-width="1.5" opacity="0.8"/>
        <path d="M-12,0 Q0,-12 12,0 Q0,12 -12,0 Z" fill="none" stroke="#ff7675" stroke-width="1.5" opacity="0.8"/>
        <circle cx="-8" cy="-8" r="1" fill="#fab1a0"/>
        <circle cx="8" cy="-8" r="1" fill="#fab1a0"/>
        <circle cx="-8" cy="8" r="1" fill="#fab1a0"/>
        <circle cx="8" cy="8" r="1" fill="#fab1a0"/>
        <circle cx="-10" cy="0" r="0.5" fill="white" opacity="0.8"/>
        <circle cx="10" cy="0" r="0.5" fill="white" opacity="0.8"/>
        <circle cx="0" cy="-10" r="0.5" fill="white" opacity="0.8"/>
        <circle cx="0" cy="10" r="0.5" fill="white" opacity="0.8"/>
    `);
}

// Initialize visualization
createIconDefs();
createTimeline();
createObjects();

// Auto-demonstration - show cosmos containing all
setTimeout(() => {
    const cosmos = objects.find(o => o.id === "cosmos");
    showNestedContainment(cosmos);
}, 2000);