// Intelligence Evolution Sankey Diagram Data and Visualization

// Define the data structure for the Sankey diagram
const intelligenceData = {
    nodes: [
        // Information Challenges (Start)
        { id: 0, name: "Environmental\nPrediction", category: "challenge", info: "Anticipating future states" },
        { id: 1, name: "Social\nCoordination", category: "challenge", info: "Multi-agent interaction" },
        { id: 2, name: "Resource\nOptimization", category: "challenge", info: "Efficient decision-making" },
        { id: 3, name: "Learning &\nMemory", category: "challenge", info: "Adapting from experience" },
        
        // Evolutionary Origins
        { id: 4, name: "Vertebrates\n500 Mya", category: "origin", lineage: "vertebrate", info: "Centralized nervous systems" },
        { id: 5, name: "Cephalopods\n400 Mya", category: "origin", lineage: "cephalopod", info: "Distributed neural networks" },
        { id: 6, name: "Arthropods\n540 Mya", category: "origin", lineage: "arthropod", info: "Miniaturized brains" },
        { id: 7, name: "Social Insects\n150 Mya", category: "origin", lineage: "collective", info: "Swarm intelligence" },
        { id: 8, name: "Computers\n75 years", category: "origin", lineage: "artificial", info: "Silicon-based processing" },
        
        // Neural Architectures
        { id: 9, name: "Neocortex\n(6 layers)", category: "architecture", lineage: "vertebrate", info: "AI: ~100 billion neurons" },
        { id: 10, name: "Distributed\nGanglia", category: "architecture", lineage: "cephalopod", info: "AI: ~500 million neurons" },
        { id: 11, name: "Mushroom\nBodies", category: "architecture", lineage: "arthropod", info: "AI: ~1 million neurons" },
        { id: 12, name: "Stigmergic\nNetworks", category: "architecture", lineage: "collective", info: "AI: Simple rules × many agents" },
        { id: 13, name: "Neural\nNetworks", category: "architecture", lineage: "artificial", info: "AI: Trillions of parameters" },
        
        // Cognitive Features
        { id: 14, name: "Abstract\nReasoning", category: "feature", lineage: "vertebrate", info: "Symbolic manipulation" },
        { id: 15, name: "Tool Use", category: "feature", lineage: "vertebrate", info: "Environmental modification" },
        { id: 16, name: "Camouflage\nControl", category: "feature", lineage: "cephalopod", info: "Real-time adaptation" },
        { id: 17, name: "Problem\nSolving", category: "feature", lineage: "cephalopod", info: "Novel solutions" },
        { id: 18, name: "Navigation", category: "feature", lineage: "arthropod", info: "Spatial memory" },
        { id: 19, name: "Dance\nLanguage", category: "feature", lineage: "collective", info: "Symbolic communication" },
        { id: 20, name: "Consensus\nDecisions", category: "feature", lineage: "collective", info: "Democratic choices" },
        { id: 21, name: "Pattern\nRecognition", category: "feature", lineage: "artificial", info: "Statistical learning" },
        { id: 22, name: "Language\nProcessing", category: "feature", lineage: "artificial", info: "Natural language understanding" },
        
        // Intelligence Types
        { id: 23, name: "Individual\nCognition", category: "intelligence", info: "Single-agent processing" },
        { id: 24, name: "Social\nIntelligence", category: "intelligence", info: "Group coordination" },
        { id: 25, name: "Collective\nIntelligence", category: "intelligence", info: "Emergent behavior" },
        { id: 26, name: "Adaptive\nBehavior", category: "intelligence", info: "Environmental response" },
        { id: 27, name: "Creative\nProblem Solving", category: "intelligence", info: "Novel solutions" },
        
        // Convergent Solution
        { id: 28, name: "COMPLEX INFORMATION\nPROCESSING", category: "convergence", info: "Multiple paths to intelligence" }
    ],
    links: [
        // Challenges to Origins
        { source: 0, target: 4, value: 2 },
        { source: 0, target: 5, value: 2 },
        { source: 0, target: 6, value: 2 },
        { source: 0, target: 8, value: 2 },
        
        { source: 1, target: 4, value: 2 },
        { source: 1, target: 7, value: 3 },
        { source: 1, target: 8, value: 1 },
        
        { source: 2, target: 4, value: 1 },
        { source: 2, target: 5, value: 1 },
        { source: 2, target: 6, value: 2 },
        { source: 2, target: 7, value: 2 },
        { source: 2, target: 8, value: 2 },
        
        { source: 3, target: 4, value: 2 },
        { source: 3, target: 5, value: 2 },
        { source: 3, target: 6, value: 1 },
        { source: 3, target: 8, value: 3 },
        
        // Origins to Architectures
        { source: 4, target: 9, value: 8 },
        { source: 5, target: 10, value: 8 },
        { source: 6, target: 11, value: 8 },
        { source: 7, target: 12, value: 8 },
        { source: 8, target: 13, value: 8 },
        
        // Architectures to Features
        { source: 9, target: 14, value: 4 },
        { source: 9, target: 15, value: 4 },
        
        { source: 10, target: 16, value: 4 },
        { source: 10, target: 17, value: 4 },
        
        { source: 11, target: 18, value: 8 },
        
        { source: 12, target: 19, value: 4 },
        { source: 12, target: 20, value: 4 },
        
        { source: 13, target: 21, value: 4 },
        { source: 13, target: 22, value: 4 },
        
        // Features to Intelligence Types
        { source: 14, target: 23, value: 3 },
        { source: 14, target: 27, value: 1 },
        
        { source: 15, target: 23, value: 2 },
        { source: 15, target: 27, value: 2 },
        
        { source: 16, target: 26, value: 4 },
        
        { source: 17, target: 23, value: 2 },
        { source: 17, target: 27, value: 2 },
        
        { source: 18, target: 26, value: 4 },
        
        { source: 19, target: 24, value: 2 },
        { source: 19, target: 25, value: 2 },
        
        { source: 20, target: 24, value: 2 },
        { source: 20, target: 25, value: 2 },
        
        { source: 21, target: 23, value: 2 },
        { source: 21, target: 26, value: 2 },
        
        { source: 22, target: 23, value: 2 },
        { source: 22, target: 24, value: 2 },
        
        // Intelligence Types to Convergence
        { source: 23, target: 28, value: 5 },
        { source: 24, target: 28, value: 5 },
        { source: 25, target: 28, value: 5 },
        { source: 26, target: 28, value: 5 },
        { source: 27, target: 28, value: 5 }
    ]
};

// Set up dimensions and margins
const margin = { top: 20, right: 200, bottom: 50, left: 200 };
const width = 1200 - margin.left - margin.right;
const height = 800 - margin.top - margin.bottom;

// Create SVG
const svg = d3.select("#sankey-diagram")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// Create sankey generator
const sankey = d3.sankey()
    .nodeId(d => d.id)
    .nodeAlign(d3.sankeyLeft)
    .nodeWidth(20)
    .nodePadding(15)
    .extent([[0, 0], [width, height]]);

// Color scale
const color = d3.scaleOrdinal()
    .domain(["challenge", "origin", "architecture", "feature", "intelligence", "convergence"])
    .range(["#3498db", "#16a085", "#e67e22", "#8e44ad", "#27ae60", "#c0392b"]);

// Lineage colors
const lineageColor = d3.scaleOrdinal()
    .domain(["vertebrate", "cephalopod", "arthropod", "collective", "artificial"])
    .range(["#3498db", "#9b59b6", "#e74c3c", "#f39c12", "#1abc9c"]);

// Generate the sankey diagram
const { nodes, links } = sankey(intelligenceData);

// Add links
const link = svg.append("g")
    .selectAll(".link")
    .data(links)
    .join("g")
    .attr("class", "link");

const linkPath = link.append("path")
    .attr("d", d3.sankeyLinkHorizontal())
    .attr("stroke", d => {
        const sourceLineage = d.source.lineage;
        return sourceLineage ? lineageColor(sourceLineage) : "#000";
    })
    .attr("stroke-width", d => Math.max(1, d.width))
    .attr("fill", "none")
    .attr("opacity", 0.5);

// Add link hover effects
link.append("title")
    .text(d => `${d.source.name} → ${d.target.name}\nFlow: ${d.value}`);

// Add nodes
const node = svg.append("g")
    .selectAll(".node")
    .data(nodes)
    .join("g")
    .attr("class", "node")
    .attr("transform", d => `translate(${d.x0},${d.y0})`);

// Add rectangles for nodes
node.append("rect")
    .attr("height", d => d.y1 - d.y0)
    .attr("width", sankey.nodeWidth())
    .attr("fill", d => color(d.category))
    .attr("stroke", "#000")
    .attr("stroke-width", 1);

// Add node labels
node.append("text")
    .attr("x", d => d.x0 < width / 2 ? -6 : sankey.nodeWidth() + 6)
    .attr("y", d => (d.y1 - d.y0) / 2)
    .attr("dy", "0.35em")
    .attr("text-anchor", d => d.x0 < width / 2 ? "end" : "start")
    .attr("font-size", "12px")
    .attr("font-weight", d => d.category === "convergence" ? "bold" : "normal")
    .text(d => d.name);

// Add tooltips
const tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

node.on("mouseover", function(event, d) {
    tooltip.transition()
        .duration(200)
        .style("opacity", .9);
    tooltip.html(`<strong>${d.name}</strong><br/>${d.info || ""}`)
        .style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY - 28) + "px");
})
.on("mouseout", function(d) {
    tooltip.transition()
        .duration(500)
        .style("opacity", 0);
});

// Interactive functions
let labelsVisible = true;

function toggleLabels() {
    labelsVisible = !labelsVisible;
    svg.selectAll("text")
        .style("display", labelsVisible ? "block" : "none");
}

function highlightPath(lineage) {
    // Reset all paths
    linkPath.attr("opacity", 0.1);
    node.selectAll("rect").attr("opacity", 0.3);
    
    // Highlight selected lineage
    linkPath.filter(d => d.source.lineage === lineage || d.target.lineage === lineage)
        .attr("opacity", 0.8);
    
    node.filter(d => d.lineage === lineage || d.category === "challenge" || d.category === "convergence")
        .selectAll("rect")
        .attr("opacity", 1);
}

function resetView() {
    linkPath.attr("opacity", 0.5);
    node.selectAll("rect").attr("opacity", 1);
}

// Add zoom functionality
const zoom = d3.zoom()
    .scaleExtent([0.5, 2])
    .on("zoom", function(event) {
        svg.attr("transform", event.transform);
    });

d3.select("#sankey-diagram svg").call(zoom);