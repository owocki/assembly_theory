// Objects as Memories Visualization

const svg = d3.select("#visualization");
const width = window.innerWidth;
const height = window.innerHeight;

svg.attr("width", width).attr("height", height);

// Object data with embedded memories
const objects = [
    {
        id: "protein",
        name: "Protein",
        x: width * 0.7,
        y: height * 0.3,
        radius: 40,
        color: "#ff6b9d",
        assemblyIndex: 600,
        memories: [
            { time: "13.8 Gyr", event: "Hydrogen formation", layer: "cosmic" },
            { time: "4.6 Gyr", event: "Heavy elements from supernovae", layer: "stellar" },
            { time: "3.8 Gyr", event: "Amino acid synthesis", layer: "chemical" },
            { time: "3.5 Gyr", event: "First proteins fold", layer: "molecular" },
            { time: "2.0 Gyr", event: "Protein family diversification", layer: "evolutionary" },
            { time: "500 Myr", event: "Complex multicellular proteins", layer: "biological" },
            { time: "Present", event: "Specific protein structure", layer: "functional" }
        ]
    },
    {
        id: "smartphone",
        name: "Smartphone",
        x: width * 0.6,
        y: height * 0.6,
        radius: 35,
        color: "#c44569",
        assemblyIndex: 1000000000,
        memories: [
            { time: "13.8 Gyr", event: "Elements forged in stars", layer: "cosmic" },
            { time: "4.6 Gyr", event: "Silicon and rare earth formation", layer: "geological" },
            { time: "10 kyr", event: "Human civilization begins", layer: "cultural" },
            { time: "200 yr", event: "Electricity discovered", layer: "scientific" },
            { time: "70 yr", event: "Transistor invented", layer: "technological" },
            { time: "50 yr", event: "Integrated circuits", layer: "engineering" },
            { time: "15 yr", event: "Modern smartphone design", layer: "contemporary" }
        ]
    },
    {
        id: "dna",
        name: "DNA Molecule",
        x: width * 0.4,
        y: height * 0.4,
        radius: 45,
        color: "#f8b500",
        assemblyIndex: 100000,
        memories: [
            { time: "13.8 Gyr", event: "Carbon, nitrogen, phosphorus creation", layer: "cosmic" },
            { time: "4.0 Gyr", event: "Nucleotide synthesis", layer: "prebiotic" },
            { time: "3.8 Gyr", event: "RNA world emergence", layer: "primordial" },
            { time: "3.5 Gyr", event: "DNA-RNA transition", layer: "genetic" },
            { time: "2.0 Gyr", event: "Error correction mechanisms", layer: "informational" },
            { time: "540 Myr", event: "Complex organism encoding", layer: "developmental" },
            { time: "Present", event: "Individual genetic sequence", layer: "personal" }
        ]
    },
    {
        id: "neuron",
        name: "Neuron",
        x: width * 0.5,
        y: height * 0.7,
        radius: 38,
        color: "#a55eea",
        assemblyIndex: 50000000,
        memories: [
            { time: "13.8 Gyr", event: "Basic elements formed", layer: "cosmic" },
            { time: "3.8 Gyr", event: "First cellular membranes", layer: "cellular" },
            { time: "1.5 Gyr", event: "Eukaryotic cells emerge", layer: "complexity" },
            { time: "600 Myr", event: "First nervous systems", layer: "neural" },
            { time: "500 Myr", event: "Vertebrate brain evolution", layer: "cognitive" },
            { time: "7 Myr", event: "Primate brain expansion", layer: "mammalian" },
            { time: "Present", event: "Individual neural connections", layer: "experience" }
        ]
    }
];

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
    "personal": "#ff7675"
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
            .on("click", () => showObjectMemories(obj))
            .on("mouseover", function(event) {
                showTooltip(event, obj);
            })
            .on("mouseout", hideTooltip);
        
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

// Show assembly pathway
function showAssemblyPath() {
    currentView = "assembly";
    
    // Clear previous
    svg.selectAll(".memory-trace").remove();
    svg.selectAll(".memory-layer").remove();
    
    // Show assembly progression
    const sortedObjects = [...objects].sort((a, b) => a.assemblyIndex - b.assemblyIndex);
    
    for (let i = 0; i < sortedObjects.length - 1; i++) {
        const obj1 = sortedObjects[i];
        const obj2 = sortedObjects[i + 1];
        
        svg.append("path")
            .attr("class", "memory-trace active-memory")
            .attr("d", `M ${obj1.x},${obj1.y} Q ${(obj1.x + obj2.x) / 2},${(obj1.y + obj2.y) / 2 - 50} ${obj2.x},${obj2.y}`)
            .attr("stroke", "#ff6b9d")
            .attr("stroke-width", 3)
            .attr("opacity", 0)
            .transition()
            .delay(i * 500)
            .duration(1000)
            .attr("opacity", 0.8);
    }
}

function resetView() {
    currentView = "default";
    svg.selectAll(".memory-trace").remove();
    svg.selectAll(".memory-layer").remove();
    
    // Reset memory panel
    document.getElementById("memoryContent").innerHTML = `
        <div class="memory-item">
            <div class="memory-time">13.8 Gyr ago</div>
            <div>Hydrogen atoms formed - basic building blocks</div>
        </div>
        <div class="memory-item">
            <div class="memory-time">4.6 Gyr ago</div>
            <div>Solar system formation - heavy elements available</div>
        </div>
        <div class="memory-item">
            <div class="memory-time">3.8 Gyr ago</div>
            <div>First organic molecules - chemical memory begins</div>
        </div>
        <div class="memory-item">
            <div class="memory-time">Present</div>
            <div>Complex object embodies entire history</div>
        </div>
    `;
}

// Tooltip functions
function showTooltip(event, obj) {
    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);
    
    tooltip.html(`
        <strong>${obj.name}</strong><br/>
        Assembly Index: ${obj.assemblyIndex.toLocaleString()}<br/>
        Memory Layers: ${obj.memories.length}<br/>
        <br/>
        This object contains ${obj.memories.length} layers of historical information, 
        from cosmic events ${obj.memories[0].time} ago to the present moment.
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

// Auto-demonstration
setTimeout(() => {
    showObjectMemories(objects[0]);
}, 2000);