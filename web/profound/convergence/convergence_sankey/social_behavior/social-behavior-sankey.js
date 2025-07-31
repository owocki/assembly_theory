// Social Behavior Evolution Sankey Diagram Data and Visualization

// Define the data structure for the Sankey diagram
const socialData = {
    nodes: [
        // Survival Pressures (Start)
        { id: 0, name: "Predation\nPressure", category: "pressure", info: "Safety in numbers" },
        { id: 1, name: "Resource\nCompetition", category: "pressure", info: "Efficient foraging" },
        { id: 2, name: "Environmental\nChallenges", category: "pressure", info: "Harsh conditions" },
        { id: 3, name: "Reproductive\nSuccess", category: "pressure", info: "Offspring survival" },
        
        // Social Origins
        { id: 4, name: "Hymenoptera\n150 Mya", category: "origin", lineage: "eusocial", info: "Ants, bees, wasps" },
        { id: 5, name: "Termites\n130 Mya", category: "origin", lineage: "eusocial", info: "Independent eusociality" },
        { id: 6, name: "Canids\n40 Mya", category: "origin", lineage: "pack", info: "Wolves, wild dogs" },
        { id: 7, name: "Felids\n25 Mya", category: "origin", lineage: "pack", info: "Lions, social cats" },
        { id: 8, name: "Ungulates\n55 Mya", category: "origin", lineage: "herd", info: "Herbivore groups" },
        { id: 9, name: "Birds\n150 Mya", category: "origin", lineage: "herd", info: "Flocking behavior" },
        { id: 10, name: "Primates\n55 Mya", category: "origin", lineage: "primate", info: "Complex societies" },
        { id: 11, name: "Humans\n300 Kya", category: "origin", lineage: "human", info: "Cultural evolution" },
        
        // Organization Types
        { id: 12, name: "Reproductive\nCastes", category: "organization", lineage: "eusocial", info: "Queen, workers, soldiers" },
        { id: 13, name: "Pack\nHierarchy", category: "organization", lineage: "pack", info: "Alpha leadership" },
        { id: 14, name: "Herd\nStructure", category: "organization", lineage: "herd", info: "Loose aggregations" },
        { id: 15, name: "Troop\nDynamics", category: "organization", lineage: "primate", info: "Multi-male/female groups" },
        { id: 16, name: "Cultural\nInstitutions", category: "organization", lineage: "human", info: "Governments, religions" },
        
        // Social Innovations
        { id: 17, name: "Chemical\nCommunication", category: "innovation", lineage: "eusocial", info: "Pheromone trails" },
        { id: 18, name: "Division of\nLabor", category: "innovation", lineage: "eusocial", info: "Specialized roles" },
        { id: 19, name: "Cooperative\nHunting", category: "innovation", lineage: "pack", info: "Coordinated attacks" },
        { id: 20, name: "Territory\nDefense", category: "innovation", lineage: "pack", info: "Group territories" },
        { id: 21, name: "Predator\nDetection", category: "innovation", lineage: "herd", info: "Many eyes advantage" },
        { id: 22, name: "Synchronized\nMovement", category: "innovation", lineage: "herd", info: "Collective motion" },
        { id: 23, name: "Alliance\nFormation", category: "innovation", lineage: "primate", info: "Political behavior" },
        { id: 24, name: "Tool\nCulture", category: "innovation", lineage: "primate", info: "Learned traditions" },
        { id: 25, name: "Language", category: "innovation", lineage: "human", info: "Symbolic communication" },
        { id: 26, name: "Technology", category: "innovation", lineage: "human", info: "Extended phenotype" },
        
        // Emergent Behaviors
        { id: 27, name: "Swarm\nIntelligence", category: "behavior", info: "Collective cognition" },
        { id: 28, name: "Democratic\nDecisions", category: "behavior", info: "Consensus building" },
        { id: 29, name: "Cultural\nTransmission", category: "behavior", info: "Social learning" },
        { id: 30, name: "Altruistic\nBehavior", category: "behavior", info: "Self-sacrifice" },
        { id: 31, name: "Complex\nCooperation", category: "behavior", info: "Multi-level organization" },
        
        // Convergent Solution
        { id: 32, name: "SOCIAL\nORGANIZATION", category: "convergence", info: "Multiple paths to sociality" }
    ],
    links: [
        // Pressures to Origins
        { source: 0, target: 4, value: 2 },
        { source: 0, target: 6, value: 3 },
        { source: 0, target: 8, value: 3 },
        { source: 0, target: 9, value: 3 },
        
        { source: 1, target: 4, value: 3 },
        { source: 1, target: 5, value: 3 },
        { source: 1, target: 6, value: 2 },
        { source: 1, target: 7, value: 2 },
        { source: 1, target: 10, value: 2 },
        { source: 1, target: 11, value: 2 },
        
        { source: 2, target: 5, value: 2 },
        { source: 2, target: 8, value: 2 },
        { source: 2, target: 11, value: 3 },
        
        { source: 3, target: 4, value: 3 },
        { source: 3, target: 5, value: 3 },
        { source: 3, target: 7, value: 2 },
        { source: 3, target: 10, value: 3 },
        { source: 3, target: 11, value: 3 },
        
        // Origins to Organizations
        { source: 4, target: 12, value: 10 },
        { source: 5, target: 12, value: 10 },
        { source: 6, target: 13, value: 10 },
        { source: 7, target: 13, value: 10 },
        { source: 8, target: 14, value: 10 },
        { source: 9, target: 14, value: 10 },
        { source: 10, target: 15, value: 10 },
        { source: 11, target: 16, value: 10 },
        
        // Organizations to Innovations
        { source: 12, target: 17, value: 5 },
        { source: 12, target: 18, value: 5 },
        
        { source: 13, target: 19, value: 5 },
        { source: 13, target: 20, value: 5 },
        
        { source: 14, target: 21, value: 5 },
        { source: 14, target: 22, value: 5 },
        
        { source: 15, target: 23, value: 5 },
        { source: 15, target: 24, value: 5 },
        
        { source: 16, target: 25, value: 5 },
        { source: 16, target: 26, value: 5 },
        
        // Innovations to Behaviors
        { source: 17, target: 27, value: 3 },
        { source: 17, target: 28, value: 2 },
        
        { source: 18, target: 27, value: 3 },
        { source: 18, target: 30, value: 2 },
        
        { source: 19, target: 31, value: 3 },
        { source: 19, target: 30, value: 2 },
        
        { source: 20, target: 31, value: 2 },
        { source: 20, target: 30, value: 3 },
        
        { source: 21, target: 27, value: 3 },
        { source: 21, target: 28, value: 2 },
        
        { source: 22, target: 27, value: 3 },
        { source: 22, target: 31, value: 2 },
        
        { source: 23, target: 29, value: 3 },
        { source: 23, target: 31, value: 2 },
        
        { source: 24, target: 29, value: 3 },
        { source: 24, target: 31, value: 2 },
        
        { source: 25, target: 29, value: 3 },
        { source: 25, target: 31, value: 2 },
        
        { source: 26, target: 31, value: 3 },
        { source: 26, target: 28, value: 2 },
        
        // Behaviors to Convergence
        { source: 27, target: 32, value: 5 },
        { source: 28, target: 32, value: 5 },
        { source: 29, target: 32, value: 5 },
        { source: 30, target: 32, value: 5 },
        { source: 31, target: 32, value: 5 }
    ]
};

// Set up dimensions and margins
const margin = { top: 20, right: 200, bottom: 50, left: 200 };
const width = 1200 - margin.left - margin.right;
const height = 900 - margin.top - margin.bottom;

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
    .nodePadding(10)
    .extent([[0, 0], [width, height]]);

// Color scale
const color = d3.scaleOrdinal()
    .domain(["pressure", "origin", "organization", "innovation", "behavior", "convergence"])
    .range(["#2ecc71", "#3498db", "#f39c12", "#e74c3c", "#9b59b6", "#1abc9c"]);

// Lineage colors
const lineageColor = d3.scaleOrdinal()
    .domain(["eusocial", "pack", "herd", "primate", "human"])
    .range(["#e74c3c", "#f39c12", "#3498db", "#9b59b6", "#1abc9c"]);

// Generate the sankey diagram
const { nodes, links } = sankey(socialData);

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
    .attr("font-size", "11px")
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
    
    node.filter(d => d.lineage === lineage || d.category === "pressure" || d.category === "convergence")
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