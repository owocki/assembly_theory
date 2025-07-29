class NetworkVisualization {
    constructor(containerId) {
        this.containerId = containerId;
        this.svg = d3.select(`#${containerId}`);
        this.container = this.svg.node().parentNode;
        
        // Get container dimensions
        this.updateDimensions();
        
        // Create main group for zoom/pan
        this.g = this.svg.append('g').attr('class', 'main-group');
        
        // Create groups for different elements
        this.linkGroup = this.g.append('g').attr('class', 'links');
        this.nodeGroup = this.g.append('g').attr('class', 'nodes');
        this.labelGroup = this.g.append('g').attr('class', 'labels');
        
        // Initialize zoom behavior
        this.zoom = d3.zoom()
            .scaleExtent([0.1, 10])
            .on('zoom', (event) => {
                this.g.attr('transform', event.transform);
            });
            
        this.svg.call(this.zoom);
        
        // Initialize simulation
        this.simulation = d3.forceSimulation()
            .force('link', d3.forceLink().id(d => d.id).distance(100))
            .force('charge', d3.forceManyBody().strength(-300))
            .force('center', d3.forceCenter(this.width / 2, this.height / 2))
            .force('collision', d3.forceCollide().radius(d => d.radius + 5));
        
        // Bind resize event
        window.addEventListener('resize', () => this.onResize());
        
        // Initialize tooltip
        this.tooltip = d3.select('#tooltip');
        
        // Track selected node
        this.selectedNode = null;
        
        // Initialize layout type
        this.currentLayout = 'timeline';
    }
    
    updateDimensions() {
        const rect = this.container.getBoundingClientRect();
        this.width = rect.width;
        this.height = rect.height;
        this.svg.attr('width', this.width).attr('height', this.height);
    }
    
    onResize() {
        this.updateDimensions();
        this.simulation.force('center', d3.forceCenter(this.width / 2, this.height / 2));
        this.simulation.alpha(0.3).restart();
    }
    
    render(data) {
        this.data = data;
        
        // Clear existing elements
        this.linkGroup.selectAll('*').remove();
        this.nodeGroup.selectAll('*').remove();
        this.labelGroup.selectAll('*').remove();
        
        // Create links
        this.links = this.linkGroup
            .selectAll('line')
            .data(data.edges)
            .enter()
            .append('line')
            .attr('class', 'link')
            .attr('stroke', '#444')
            .attr('stroke-width', d => this.getLinkWidth(d));
        
        // Create nodes
        this.nodes = this.nodeGroup
            .selectAll('circle')
            .data(data.nodes)
            .enter()
            .append('circle')
            .attr('class', 'node')
            .attr('r', d => d.radius)
            .attr('fill', d => d.color)
            .style('cursor', 'pointer')
            .call(this.createDragBehavior());
        
        // Add node event listeners
        this.nodes
            .on('mouseover', (event, d) => this.onNodeHover(event, d))
            .on('mouseout', (event, d) => this.onNodeHoverOut(event, d))
            .on('click', (event, d) => this.onNodeClick(event, d));
        
        // Create labels
        this.labels = this.labelGroup
            .selectAll('text')
            .data(data.nodes)
            .enter()
            .append('text')
            .attr('class', 'node-label')
            .attr('text-anchor', 'middle')
            .attr('dy', '.35em')
            .style('font-size', '10px')
            .style('fill', '#ccc')
            .style('pointer-events', 'none')
            .text(d => d.name);
        
        // Update simulation
        this.simulation
            .nodes(data.nodes)
            .on('tick', () => this.onTick());
            
        this.simulation
            .force('link')
            .links(data.edges);
        
        // Apply current layout
        this.applyLayout(this.currentLayout);
        
        // Restart simulation
        this.simulation.alpha(1).restart();
    }
    
    onTick() {
        // Update link positions
        this.links
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y);
        
        // Update node positions
        this.nodes
            .attr('cx', d => d.x)
            .attr('cy', d => d.y);
        
        // Update label positions
        this.labels
            .attr('x', d => d.x)
            .attr('y', d => d.y - d.radius - 5);
    }
    
    createDragBehavior() {
        return d3.drag()
            .on('start', (event, d) => {
                if (!event.active) this.simulation.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;
            })
            .on('drag', (event, d) => {
                d.fx = event.x;
                d.fy = event.y;
            })
            .on('end', (event, d) => {
                if (!event.active) this.simulation.alphaTarget(0);
                d.fx = null;
                d.fy = null;
            });
    }
    
    onNodeHover(event, d) {
        // Highlight connected nodes and links
        this.highlightConnections(d, true);
        
        // Show tooltip
        const tooltipContent = `
            <strong>${d.name}</strong><br>
            Assembly Index: ${d.assembly_index}<br>
            Domain: ${d.domain}<br>
            Time Origin: ${d.time_origin || 'Unknown'}<br>
            Complexity: ${d.visual_complexity}
        `;
        
        this.tooltip
            .style('left', (event.pageX + 10) + 'px')
            .style('top', (event.pageY - 10) + 'px')
            .html(tooltipContent)
            .classed('visible', true);
    }
    
    onNodeHoverOut(event, d) {
        // Remove highlights
        this.highlightConnections(d, false);
        
        // Hide tooltip
        this.tooltip.classed('visible', false);
    }
    
    onNodeClick(event, d) {
        // Update selection
        if (this.selectedNode) {
            this.selectedNode.classed('selected', false);
        }
        
        this.selectedNode = d3.select(event.target);
        this.selectedNode.classed('selected', true);
        
        // Show info panel
        this.showInfoPanel(d);
        
        // Prevent zoom
        event.stopPropagation();
    }
    
    highlightConnections(node, highlight) {
        const connectedNodes = new Set();
        const connectedLinks = new Set();
        
        // Find connected nodes and links
        this.data.edges.forEach(edge => {
            if (edge.source.id === node.id) {
                connectedNodes.add(edge.target.id);
                connectedLinks.add(edge);
            } else if (edge.target.id === node.id) {
                connectedNodes.add(edge.source.id);
                connectedLinks.add(edge);
            }
        });
        
        // Update node styles
        this.nodes
            .style('opacity', d => {
                if (!highlight) return 1;
                return (d.id === node.id || connectedNodes.has(d.id)) ? 1 : 0.3;
            });
        
        // Update link styles
        this.links
            .classed('highlighted', d => highlight && connectedLinks.has(d))
            .style('opacity', d => {
                if (!highlight) return 1;
                return connectedLinks.has(d) ? 1 : 0.1;
            });
    }
    
    showInfoPanel(node) {
        const infoPanel = document.getElementById('info-panel');
        const infoTitle = document.getElementById('info-title');
        const infoDetails = document.getElementById('info-details');
        
        infoTitle.textContent = node.name;
        
        const detailsHTML = `
            <div><strong>Assembly Index:</strong> ${node.assembly_index}</div>
            <div><strong>Domain:</strong> ${node.domain}</div>
            <div><strong>Visual Complexity:</strong> ${node.visual_complexity}</div>
            <div><strong>Time Origin:</strong> ${node.time_origin || 'Unknown'}</div>
            <div><strong>Estimated Copies:</strong> ${node.copy_number?.toLocaleString() || 'Unknown'}</div>
            <div><strong>Description:</strong> ${node.description || 'No description available'}</div>
        `;
        
        infoDetails.innerHTML = detailsHTML;
        infoPanel.classList.add('visible');
    }
    
    getLinkWidth(edge) {
        const typeWidths = {
            'assembly_pathway': 2,
            'nuclear_fusion': 3,
            'chemical_bond': 1.5,
            'convergent_evolution': 2.5,
            'technological_evolution': 2,
            'emergence': 3
        };
        return typeWidths[edge.type] || 1;
    }
    
    applyLayout(layoutType) {
        this.currentLayout = layoutType;
        
        switch (layoutType) {
            case 'force':
                this.applyForceLayout();
                break;
            case 'hierarchical':
                this.applyHierarchicalLayout();
                break;
            case 'timeline':
                this.applyTimelineLayout();
                break;
            case 'radial':
                this.applyRadialLayout();
                break;
            default:
                this.applyForceLayout();
        }
    }
    
    applyForceLayout() {
        // Reset to default force-directed layout
        this.simulation
            .force('charge', d3.forceManyBody().strength(-300))
            .force('center', d3.forceCenter(this.width / 2, this.height / 2))
            .force('x', null)
            .force('y', null);
    }
    
    applyHierarchicalLayout() {
        // Arrange by assembly index (complexity) - simpler assemblies at bottom, complex at top
        this.simulation
            .force('charge', d3.forceManyBody().strength(-150))
            .force('center', null)
            .force('x', d3.forceX(this.width / 2).strength(0.2))
            .force('y', d3.forceY(d => {
                // Invert so simple assemblies (tier 1) are at bottom, complex (tier 8) at top
                const normalizedTier = (d.tier - 1) / 7; // 0 to 1
                return this.height * 0.1 + normalizedTier * this.height * 0.8;
            }).strength(0.9))
            .force('collision', d3.forceCollide().radius(d => d.radius + 10));
    }
    
    applyTimelineLayout() {
        // Arrange by temporal origin - Big Bang to present/future
        const getTimePosition = (node) => {
            const timeOrigin = node.time_origin || '';
            
            // Parse time origins to positions (0 = Big Bang, 1 = present/future)
            if (timeOrigin.includes('13.8') || timeOrigin.includes('13.7')) return 0.05; // Big Bang
            if (timeOrigin.includes('13.4') || timeOrigin.includes('13.0')) return 0.1;  // Early cosmic
            if (timeOrigin.includes('12.') || timeOrigin.includes('11.')) return 0.15;   // Stellar nucleosynthesis
            if (timeOrigin.includes('4.5') || timeOrigin.includes('4.4')) return 0.3;   // Solar system formation
            if (timeOrigin.includes('3.8') || timeOrigin.includes('3.5')) return 0.4;   // Early life
            if (timeOrigin.includes('2.0') || timeOrigin.includes('1.5')) return 0.5;   // Eukaryotes
            if (timeOrigin.includes('Gyr')) return 0.6;                                 // Other billion year events
            if (timeOrigin.includes('Myr') || timeOrigin.includes('600')) return 0.7;   // Complex life
            if (timeOrigin.includes('kyr') || timeOrigin.includes('100')) return 0.8;   // Human history
            if (timeOrigin.includes('years_ago') || timeOrigin.includes('CE')) return 0.85; // Historical
            if (timeOrigin.includes('Future') || timeOrigin.includes('Concept')) return 0.95; // Future
            
            // Domain-based fallback for nodes without specific time origins
            const domainTimes = {
                cosmic: 0.1,
                geological: 0.3,
                biological: 0.5,
                cognitive: 0.75,
                technological: 0.85,
                hybrid: 0.9
            };
            
            return domainTimes[node.domain] || 0.5;
        };
        
        this.simulation
            .force('charge', d3.forceManyBody().strength(-150))
            .force('center', null)
            .force('x', d3.forceX(d => {
                const timePos = getTimePosition(d);
                return this.width * 0.1 + timePos * this.width * 0.8;
            }).strength(0.9))
            .force('y', d3.forceY(this.height / 2).strength(0.2))
            .force('collision', d3.forceCollide().radius(d => d.radius + 8));
    }
    
    applyRadialLayout() {
        // Radial layout with complexity as radius
        this.simulation
            .force('charge', d3.forceManyBody().strength(-100))
            .force('center', null)
            .force('x', d3.forceX(this.width / 2).strength(0.1))
            .force('y', d3.forceY(this.height / 2).strength(0.1))
            .force('radial', d3.forceRadial(d => (d.tier / 8) * Math.min(this.width, this.height) * 0.4, this.width / 2, this.height / 2).strength(0.8));
    }
    
    // Zoom control methods
    zoomIn() {
        this.svg.transition().duration(300).call(
            this.zoom.scaleBy, 1.5
        );
    }
    
    zoomOut() {
        this.svg.transition().duration(300).call(
            this.zoom.scaleBy, 1 / 1.5
        );
    }
    
    fitToScreen() {
        if (!this.data || !this.data.nodes.length) return;
        
        const bounds = this.getBounds();
        const fullWidth = this.width;
        const fullHeight = this.height;
        const width = bounds.maxX - bounds.minX;
        const height = bounds.maxY - bounds.minY;
        
        const scale = Math.min(fullWidth / width, fullHeight / height) * 0.9;
        const translate = [
            fullWidth / 2 - scale * (bounds.minX + width / 2),
            fullHeight / 2 - scale * (bounds.minY + height / 2)
        ];
        
        this.svg.transition().duration(750).call(
            this.zoom.transform,
            d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale)
        );
    }
    
    getBounds() {
        const nodes = this.data.nodes;
        return {
            minX: d3.min(nodes, d => d.x) - 50,
            maxX: d3.max(nodes, d => d.x) + 50,
            minY: d3.min(nodes, d => d.y) - 50,
            maxY: d3.max(nodes, d => d.y) + 50
        };
    }
    
    resetView() {
        this.svg.transition().duration(750).call(
            this.zoom.transform,
            d3.zoomIdentity
        );
    }
}