// Flight Evolution Sankey Diagram Data and Visualization

// Define the data structure for the Sankey diagram
const flightData = {
    nodes: [
        // Physical Constraints (Start)
        { id: 0, name: "Lift Generation", category: "constraint", info: "F = ½ρv²SCL" },
        { id: 1, name: "Drag Minimization", category: "constraint", info: "D = ½ρv²SCD" },
        { id: 2, name: "Power Requirements", category: "constraint", info: "P ∝ W³/²" },
        { id: 3, name: "Stability Control", category: "constraint", info: "Feedback systems required" },
        
        // Biological Origins
        { id: 4, name: "Arthropods\n400 Mya", category: "origin", lineage: "insects", info: "First animals to achieve powered flight" },
        { id: 5, name: "Vertebrates\n230 Mya", category: "origin", lineage: "pterosaurs", info: "First vertebrates to fly" },
        { id: 6, name: "Dinosaurs\n150 Mya", category: "origin", lineage: "birds", info: "Theropod dinosaurs evolved flight" },
        { id: 7, name: "Mammals\n60 Mya", category: "origin", lineage: "bats", info: "Only mammals to achieve true flight" },
        { id: 8, name: "Humans\n120 years", category: "origin", lineage: "technology", info: "Technological flight solutions" },
        
        // Key Innovations
        { id: 9, name: "Chitin Wings", category: "innovation", lineage: "insects", info: "Lightweight, strong wing material" },
        { id: 10, name: "Membrane Wings", category: "innovation", lineage: "pterosaurs", info: "Skin membrane stretched over elongated finger" },
        { id: 11, name: "Feathers", category: "innovation", lineage: "birds", info: "Complex structures for lift and control" },
        { id: 12, name: "Patagium", category: "innovation", lineage: "bats", info: "Flexible wing membrane between fingers" },
        { id: 13, name: "Fixed Wings", category: "innovation", lineage: "technology", info: "Rigid aerodynamic surfaces" },
        
        // Specialized Features
        { id: 14, name: "Direct Flight Muscles", category: "feature", lineage: "insects", info: "AI: ~100,000" },
        { id: 15, name: "Hollow Bones", category: "feature", lineage: "birds", info: "AI: ~30,000" },
        { id: 16, name: "Echolocation", category: "feature", lineage: "bats", info: "AI: ~10,000,000" },
        { id: 17, name: "Jet Engines", category: "feature", lineage: "technology", info: "AI: ~1,000,000,000" },
        
        // Performance Outcomes
        { id: 18, name: "Hovering", category: "performance", info: "Stationary flight capability" },
        { id: 19, name: "High Speed", category: "performance", info: "200+ km/h achieved" },
        { id: 20, name: "Long Distance", category: "performance", info: "Global range capability" },
        { id: 21, name: "Maneuverability", category: "performance", info: "Complex aerial navigation" },
        { id: 22, name: "Efficiency", category: "performance", info: "Energy-efficient flight" },
        
        // Convergent Solution
        { id: 23, name: "POWERED FLIGHT", category: "convergence", info: "Independent evolution of flight in multiple lineages" }
    ],
    links: [
        // Constraints to Origins
        { source: 0, target: 4, value: 2 },
        { source: 0, target: 5, value: 2 },
        { source: 0, target: 6, value: 2 },
        { source: 0, target: 7, value: 2 },
        { source: 0, target: 8, value: 2 },
        
        { source: 1, target: 4, value: 1 },
        { source: 1, target: 5, value: 1 },
        { source: 1, target: 6, value: 1 },
        { source: 1, target: 7, value: 1 },
        { source: 1, target: 8, value: 1 },
        
        { source: 2, target: 4, value: 1 },
        { source: 2, target: 5, value: 1 },
        { source: 2, target: 6, value: 1 },
        { source: 2, target: 7, value: 1 },
        { source: 2, target: 8, value: 1 },
        
        { source: 3, target: 4, value: 1 },
        { source: 3, target: 5, value: 1 },
        { source: 3, target: 6, value: 1 },
        { source: 3, target: 7, value: 1 },
        { source: 3, target: 8, value: 1 },
        
        // Origins to Innovations
        { source: 4, target: 9, value: 5 },
        { source: 5, target: 10, value: 5 },
        { source: 6, target: 11, value: 5 },
        { source: 7, target: 12, value: 5 },
        { source: 8, target: 13, value: 5 },
        
        // Innovations to Features
        { source: 9, target: 14, value: 5 },
        { source: 11, target: 15, value: 5 },
        { source: 12, target: 16, value: 5 },
        { source: 13, target: 17, value: 5 },
        
        // Features to Performance
        { source: 14, target: 18, value: 3 },
        { source: 14, target: 21, value: 2 },
        
        { source: 15, target: 19, value: 2 },
        { source: 15, target: 20, value: 2 },
        { source: 15, target: 22, value: 1 },
        
        { source: 16, target: 21, value: 3 },
        { source: 16, target: 18, value: 2 },
        
        { source: 17, target: 19, value: 3 },
        { source: 17, target: 20, value: 2 },
        
        // Direct Innovation to Performance
        { source: 10, target: 19, value: 2 },
        { source: 10, target: 20, value: 3 },
        
        // Performance to Convergence
        { source: 18, target: 23, value: 5 },
        { source: 19, target: 23, value: 5 },
        { source: 20, target: 23, value: 5 },
        { source: 21, target: 23, value: 5 },
        { source: 22, target: 23, value: 5 }
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
    .domain(["constraint", "origin", "innovation", "feature", "performance", "convergence"])
    .range(["#4a90e2", "#50e3c2", "#f5a623", "#bd10e0", "#7ed321", "#e74c3c"]);

// Lineage colors
const lineageColor = d3.scaleOrdinal()
    .domain(["insects", "pterosaurs", "birds", "bats", "technology"])
    .range(["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#feca57"]);

// Generate the sankey diagram
const { nodes, links } = sankey(flightData);

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
    
    node.filter(d => d.lineage === lineage || d.category === "constraint" || d.category === "convergence")
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