// Vision Evolution Sankey Diagram Data and Visualization

// Define the data structure for the Sankey diagram
const visionData = {
    nodes: [
        // Optical Principles (Start)
        { id: 0, name: "Light Detection", category: "principle", info: "Fundamental requirement for vision" },
        { id: 1, name: "Light Focusing", category: "principle", info: "Lenses, mirrors, or pinholes" },
        { id: 2, name: "Signal Transduction", category: "principle", info: "Converting photons to signals" },
        { id: 3, name: "Image Processing", category: "principle", info: "Neural/computational analysis" },
        
        // Biological Origins
        { id: 4, name: "Arthropods\n540 Mya", category: "origin", lineage: "compound", info: "First complex eyes" },
        { id: 5, name: "Early Vertebrates\n500 Mya", category: "origin", lineage: "camera-vertebrate", info: "Camera eye evolution" },
        { id: 6, name: "Mollusks\n500 Mya", category: "origin", lineage: "mirror", info: "Multiple eye types" },
        { id: 7, name: "Cephalopods\n400 Mya", category: "origin", lineage: "camera-cephalopod", info: "Independent camera eye" },
        { id: 8, name: "Humans\n1975", category: "origin", lineage: "technology", info: "Digital imaging" },
        
        // Eye Structures
        { id: 9, name: "Compound Eyes\n(Ommatidia)", category: "structure", lineage: "compound", info: "AI: ~1-10 million" },
        { id: 10, name: "Vertebrate Camera\n(Inverted retina)", category: "structure", lineage: "camera-vertebrate", info: "AI: ~100 million" },
        { id: 11, name: "Mirror Eyes\n(Guanine crystals)", category: "structure", lineage: "mirror", info: "AI: ~1 million" },
        { id: 12, name: "Cephalopod Camera\n(Correct orientation)", category: "structure", lineage: "camera-cephalopod", info: "AI: ~200 million" },
        { id: 13, name: "Digital Sensors\n(CCD/CMOS)", category: "structure", lineage: "technology", info: "AI: ~1 billion" },
        
        // Specialized Features
        { id: 14, name: "UV Vision", category: "feature", lineage: "compound", info: "See patterns invisible to humans" },
        { id: 15, name: "Polarization Detection", category: "feature", lineage: "compound", info: "Navigation by sky patterns" },
        { id: 16, name: "Color Vision\n(3+ cone types)", category: "feature", lineage: "camera-vertebrate", info: "Trichromatic or better" },
        { id: 17, name: "Fovea\n(High acuity)", category: "feature", lineage: "camera-vertebrate", info: "Central high-resolution area" },
        { id: 18, name: "Reflective Focus", category: "feature", lineage: "mirror", info: "Light gathering efficiency" },
        { id: 19, name: "No Blind Spot", category: "feature", lineage: "camera-cephalopod", info: "Correctly oriented retina" },
        { id: 20, name: "Multispectral", category: "feature", lineage: "technology", info: "UV to infrared range" },
        { id: 21, name: "Perfect Memory", category: "feature", lineage: "technology", info: "Digital storage" },
        
        // Visual Capabilities
        { id: 22, name: "Wide Field View", category: "capability", info: "Nearly 360° vision" },
        { id: 23, name: "Motion Detection", category: "capability", info: "Temporal resolution" },
        { id: 24, name: "High Resolution", category: "capability", info: "Fine detail discrimination" },
        { id: 25, name: "Pattern Recognition", category: "capability", info: "Object identification" },
        { id: 26, name: "Depth Perception", category: "capability", info: "3D spatial awareness" },
        
        // Convergent Solution
        { id: 27, name: "VISUAL PERCEPTION", category: "convergence", info: "40+ independent evolutions of vision" }
    ],
    links: [
        // Principles to Origins
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
        
        // Origins to Structures
        { source: 4, target: 9, value: 6 },
        { source: 5, target: 10, value: 6 },
        { source: 6, target: 11, value: 6 },
        { source: 7, target: 12, value: 6 },
        { source: 8, target: 13, value: 6 },
        
        // Structures to Features
        { source: 9, target: 14, value: 3 },
        { source: 9, target: 15, value: 3 },
        
        { source: 10, target: 16, value: 3 },
        { source: 10, target: 17, value: 3 },
        
        { source: 11, target: 18, value: 6 },
        
        { source: 12, target: 19, value: 6 },
        
        { source: 13, target: 20, value: 3 },
        { source: 13, target: 21, value: 3 },
        
        // Features to Capabilities
        { source: 14, target: 22, value: 2 },
        { source: 14, target: 25, value: 1 },
        
        { source: 15, target: 23, value: 2 },
        { source: 15, target: 22, value: 1 },
        
        { source: 16, target: 24, value: 2 },
        { source: 16, target: 25, value: 1 },
        
        { source: 17, target: 24, value: 2 },
        { source: 17, target: 26, value: 1 },
        
        { source: 18, target: 23, value: 2 },
        { source: 18, target: 22, value: 1 },
        
        { source: 19, target: 23, value: 1 },
        { source: 19, target: 25, value: 2 },
        
        { source: 20, target: 24, value: 2 },
        { source: 20, target: 25, value: 1 },
        
        { source: 21, target: 25, value: 2 },
        { source: 21, target: 26, value: 1 },
        
        // Capabilities to Convergence
        { source: 22, target: 27, value: 5 },
        { source: 23, target: 27, value: 5 },
        { source: 24, target: 27, value: 5 },
        { source: 25, target: 27, value: 5 },
        { source: 26, target: 27, value: 5 }
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
    .domain(["principle", "origin", "structure", "feature", "capability", "convergence"])
    .range(["#3498db", "#2ecc71", "#e74c3c", "#f39c12", "#9b59b6", "#1abc9c"]);

// Lineage colors
const lineageColor = d3.scaleOrdinal()
    .domain(["compound", "camera-vertebrate", "mirror", "camera-cephalopod", "technology"])
    .range(["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#feca57"]);

// Generate the sankey diagram
const { nodes, links } = sankey(visionData);

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
    
    node.filter(d => d.lineage === lineage || d.category === "principle" || d.category === "convergence")
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