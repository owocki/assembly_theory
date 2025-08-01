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
            .force('collision', d3.forceCollide().radius(d => d.radius + 20));
        
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
            Complexity: ${d.visual_complexity}<br>
            <em>Ctrl/Cmd+Click for GitHub details</em>
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
        // Check if Ctrl/Cmd key is pressed for GitHub link
        if (event.ctrlKey || event.metaKey) {
            if (d.github_url) {
                window.open(d.github_url, '_blank');
                return;
            }
        }
        
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
            ${node.github_url ? `<div><strong>GitHub Details:</strong> <a href="${node.github_url}" target="_blank" class="github-link">View on GitHub</a></div>` : ''}
            <div class="click-instruction"><em>Ctrl/Cmd+Click to open GitHub link directly</em></div>
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
        
        // Clear timeline axis if switching away from timeline layout
        if (layoutType !== 'timeline') {
            this.svg.selectAll('.timeline-axis').remove();
        }
        
        switch (layoutType) {
            case 'force':
                this.applyForceLayout();
                break;
            case 'hierarchical':
                this.applyHierarchicalLayout();
                break;
            case 'radial':
                this.applyRadialLayout();
                break;
            case 'grid':
                this.applyGridLayout();
                break;
            case 'circular':
                this.applyCircularLayout();
                break;
            case 'tree':
                this.applyTreeLayout();
                break;
            case 'cluster':
                this.applyClusterLayout();
                break;
            case 'spiral':
                this.applySpiralLayout();
                break;
            case 'timeline':
                this.applyTimelineLayout();
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
                return this.height * 0.05 + normalizedTier * this.height * 0.9;
            }).strength(0.9))
            .force('collision', d3.forceCollide().radius(d => d.radius + 30));
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
    
    applyGridLayout() {
        // Grid layout: domains on x-axis, complexity tiers on y-axis
        const domains = ['ethereum'];
        
        this.simulation
            .force('charge', d3.forceManyBody().strength(-50))
            .force('center', null)
            .force('x', d3.forceX(d => {
                const domainIndex = domains.indexOf(d.domain) || 0;
                return this.width * 0.1 + (domainIndex / (domains.length - 1)) * this.width * 0.8;
            }).strength(0.9))
            .force('y', d3.forceY(d => {
                const tierPosition = (d.tier - 1) / 7; // 0 to 1
                return this.height * 0.05 + tierPosition * this.height * 0.9;
            }).strength(0.9))
            .force('collision', d3.forceCollide().radius(d => d.radius + 25));
    }
    
    applyCircularLayout() {
        // Circular layout with complexity tiers as concentric circles
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        const maxRadius = Math.min(this.width, this.height) * 0.4;
        
        this.simulation
            .force('charge', d3.forceManyBody().strength(-80))
            .force('center', null)
            .force('x', d3.forceX(centerX).strength(0.1))
            .force('y', d3.forceY(centerY).strength(0.1))
            .force('radial', d3.forceRadial(d => {
                return (d.tier / 8) * maxRadius;
            }, centerX, centerY).strength(0.8))
            .force('collision', d3.forceCollide().radius(d => d.radius + 3));
    }
    
    applyTreeLayout() {
        // Tree/Dendrogram layout based on assembly pathways
        this.simulation
            .force('charge', d3.forceManyBody().strength(-200))
            .force('center', null)
            .force('x', d3.forceX(d => {
                // Spread nodes horizontally based on domain and some randomness
                const domains = ['ethereum'];
                const domainIndex = domains.indexOf(d.domain) || 0;
                const baseX = (domainIndex / domains.length) * this.width;
                return baseX + (Math.random() - 0.5) * this.width * 0.15;
            }).strength(0.5))
            .force('y', d3.forceY(d => {
                // Vertical position based on complexity tier
                const tierPosition = (d.tier - 1) / 7;
                return this.height * 0.05 + tierPosition * this.height * 0.9;
            }).strength(0.8))
            .force('collision', d3.forceCollide().radius(d => d.radius + 25));
    }
    
    applyClusterLayout() {
        // Cluster layout grouping similar assemblies
        const domains = ['ethereum'];
        const clusterCenters = domains.map((_, i) => ({
            x: this.width * 0.2 + (i % 3) * this.width * 0.3,
            y: this.height * 0.25 + Math.floor(i / 3) * this.height * 0.5
        }));
        
        this.simulation
            .force('charge', d3.forceManyBody().strength(-150))
            .force('center', null)
            .force('x', d3.forceX(d => {
                const domainIndex = domains.indexOf(d.domain) || 0;
                return clusterCenters[domainIndex].x;
            }).strength(0.3))
            .force('y', d3.forceY(d => {
                const domainIndex = domains.indexOf(d.domain) || 0;
                return clusterCenters[domainIndex].y;
            }).strength(0.3))
            .force('collision', d3.forceCollide().radius(d => d.radius + 30));
    }
    
    applySpiralLayout() {
        // Spiral layout based on complexity tiers
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        const maxRadius = Math.min(this.width, this.height) * 0.4;
        
        this.simulation
            .force('charge', d3.forceManyBody().strength(-100))
            .force('center', null)
            .force('x', d3.forceX(d => {
                const tierPos = (d.tier - 1) / 7; // 0 to 1 based on tier
                const radius = tierPos * maxRadius;
                const angle = tierPos * 4 * Math.PI; // 2 full rotations
                return centerX + radius * Math.cos(angle);
            }).strength(0.8))
            .force('y', d3.forceY(d => {
                const tierPos = (d.tier - 1) / 7; // 0 to 1 based on tier
                const radius = tierPos * maxRadius;
                const angle = tierPos * 4 * Math.PI;
                return centerY + radius * Math.sin(angle);
            }).strength(0.8))
            .force('collision', d3.forceCollide().radius(d => d.radius + 5));
    }
    
    applyTimelineLayout() {
        // Timeline layout: arrange nodes horizontally by time of origin
        // For Ethereum nodes, use 2015-2025 scale
        this.simulation
            .force('charge', d3.forceManyBody().strength(-100))
            .force('center', null)
            .force('x', d3.forceX(d => {
                // For Ethereum domain, use specialized positioning
                if (d.domain === 'ethereum') {
                    const timePos = this.getEthereumTimePosition(d.time_origin || d.timeOrigin || '');
                    return this.width * 0.1 + timePos * this.width * 0.8;
                }
                // For other domains, use standard positioning
                const timePos = this.getTimePosition(d.time_origin || d.timeOrigin || '', d.domain);
                return this.width * 0.1 + timePos * this.width * 0.8;
            }).strength(0.9))
            .force('y', d3.forceY(d => {
                // Add vertical spreading based on tier with some randomness
                const baseY = this.height / 2;
                const tierOffset = ((d.tier - 4.5) / 3.5) * this.height * 0.3;
                const randomOffset = (Math.random() - 0.5) * 50;
                return baseY + tierOffset + randomOffset;
            }).strength(0.3))
            .force('collision', d3.forceCollide().radius(d => d.radius + 30));
        
        // Draw timeline axis for Ethereum view
        if (this.nodes && this.nodes.data().some(d => d.domain === 'ethereum')) {
            this.drawTimelineAxis();
        }
    }
    
    drawTimelineAxis() {
        // Remove any existing axis
        this.svg.selectAll('.timeline-axis').remove();
        
        // Create axis group
        const axisGroup = this.svg.append('g')
            .attr('class', 'timeline-axis')
            .attr('transform', `translate(0, ${this.height - 40})`);
        
        // Draw axis line
        axisGroup.append('line')
            .attr('x1', this.width * 0.1)
            .attr('x2', this.width * 0.9)
            .attr('y1', 0)
            .attr('y2', 0)
            .style('stroke', '#666')
            .style('stroke-width', 2);
        
        // Add year markers for 2015-2025
        const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];
        years.forEach(year => {
            const position = (year - 2015) / 10; // 0 to 1
            const x = this.width * 0.1 + position * this.width * 0.8;
            
            // Year tick
            axisGroup.append('line')
                .attr('x1', x)
                .attr('x2', x)
                .attr('y1', 0)
                .attr('y2', 5)
                .style('stroke', '#666')
                .style('stroke-width', 1);
            
            // Year label
            axisGroup.append('text')
                .attr('x', x)
                .attr('y', 20)
                .attr('text-anchor', 'middle')
                .style('font-size', '12px')
                .style('fill', '#666')
                .text(year);
        });
        
        // Add axis title
        axisGroup.append('text')
            .attr('x', this.width / 2)
            .attr('y', 35)
            .attr('text-anchor', 'middle')
            .style('font-size', '14px')
            .style('fill', '#888')
            .text('Ethereum Standards Timeline (2015-2025)');
    }
    
    getEthereumTimePosition(timeOrigin) {
        if (!timeOrigin || timeOrigin === 'unknown') {
            return 0.5; // Middle of timeline if no date
        }
        
        const timeStr = timeOrigin.toLowerCase();
        
        // Parse YYYY-MM-DD or YYYY-MM format
        const dateMatch = timeStr.match(/(\d{4})(?:-(\d{2}))?(?:-(\d{2}))?/);
        if (dateMatch) {
            const year = parseInt(dateMatch[1]);
            const month = dateMatch[2] ? parseInt(dateMatch[2]) : 6; // Default to June
            const day = dateMatch[3] ? parseInt(dateMatch[3]) : 15; // Default to middle of month
            
            // Convert to decimal year
            const decimalYear = year + (month - 1) / 12 + (day - 1) / 365.25;
            
            // Map to 0-1 range where 2015 = 0, 2025 = 1
            const startYear = 2015;
            const endYear = 2025;
            const position = (decimalYear - startYear) / (endYear - startYear);
            
            // Clamp to 0-1 range
            return Math.max(0, Math.min(1, position));
        }
        
        // Fallback for non-standard formats
        return 0.5;
    }
    
    getTimePosition(timeOrigin, domain) {
        if (!timeOrigin) {
            // Fallback to domain-based positioning
            const domainTimes = {
                ethereum: 0.9
            };
            return domainTimes[domain] || 0.5;
        }
        
        const timeStr = timeOrigin.toLowerCase();
        
        // Big Bang and early cosmic events
        if (timeStr.includes('big bang')) return 0.05;
        if (timeStr.includes('13.8') && timeStr.includes('billion')) return 0.05;
        if (timeStr.includes('13.7') && timeStr.includes('billion')) return 0.05;
        
        // Early cosmic structure formation
        if (timeStr.includes('cosmic microwave background')) return 0.08;
        if (timeStr.includes('first stars')) return 0.1;
        if (timeStr.includes('stellar nucleosynthesis')) return 0.12;
        if (timeStr.includes('galaxy formation')) return 0.15;
        
        // Solar system formation
        if (timeStr.includes('4.6') && timeStr.includes('billion')) return 0.25;
        if (timeStr.includes('4.5') && timeStr.includes('billion')) return 0.26;
        if (timeStr.includes('solar system')) return 0.25;
        
        // Early Earth and geological events
        if (timeStr.includes('4.4') && timeStr.includes('billion')) return 0.28;
        if (timeStr.includes('4.0') && timeStr.includes('billion')) return 0.3;
        if (timeStr.includes('3.8') && timeStr.includes('billion')) return 0.32;
        if (timeStr.includes('3.5') && timeStr.includes('billion')) return 0.35;
        if (timeStr.includes('hadean')) return 0.28;
        if (timeStr.includes('archean')) return 0.32;
        
        // Early life
        if (timeStr.includes('3.5') && timeStr.includes('billion')) return 0.35;
        if (timeStr.includes('3.0') && timeStr.includes('billion')) return 0.4;
        if (timeStr.includes('2.5') && timeStr.includes('billion')) return 0.45;
        if (timeStr.includes('2.0') && timeStr.includes('billion')) return 0.5;
        if (timeStr.includes('first life')) return 0.35;
        if (timeStr.includes('prokaryotes')) return 0.4;
        
        // Complex life emergence
        if (timeStr.includes('1.5') && timeStr.includes('billion')) return 0.55;
        if (timeStr.includes('1.0') && timeStr.includes('billion')) return 0.6;
        if (timeStr.includes('eukaryotes')) return 0.55;
        if (timeStr.includes('multicellular')) return 0.6;
        
        // Phanerozoic eon
        if (timeStr.includes('cambrian')) return 0.65;
        if (timeStr.includes('ordovician')) return 0.66;
        if (timeStr.includes('silurian')) return 0.67;
        if (timeStr.includes('devonian')) return 0.68;
        if (timeStr.includes('carboniferous')) return 0.69;
        if (timeStr.includes('permian')) return 0.7;
        if (timeStr.includes('triassic')) return 0.71;
        if (timeStr.includes('jurassic')) return 0.72;
        if (timeStr.includes('cretaceous')) return 0.73;
        if (timeStr.includes('paleogene')) return 0.74;
        if (timeStr.includes('neogene')) return 0.75;
        
        // Recent geological/biological events (Myr)
        if (timeStr.includes('500') && (timeStr.includes('myr') || timeStr.includes('million'))) return 0.64;
        if (timeStr.includes('400') && (timeStr.includes('myr') || timeStr.includes('million'))) return 0.68;
        if (timeStr.includes('300') && (timeStr.includes('myr') || timeStr.includes('million'))) return 0.7;
        if (timeStr.includes('200') && (timeStr.includes('myr') || timeStr.includes('million'))) return 0.72;
        if (timeStr.includes('100') && (timeStr.includes('myr') || timeStr.includes('million'))) return 0.76;
        if (timeStr.includes('50') && (timeStr.includes('myr') || timeStr.includes('million'))) return 0.78;
        if (timeStr.includes('10') && (timeStr.includes('myr') || timeStr.includes('million'))) return 0.8;
        if (timeStr.includes('5') && (timeStr.includes('myr') || timeStr.includes('million'))) return 0.82;
        if (timeStr.includes('2') && (timeStr.includes('myr') || timeStr.includes('million'))) return 0.84;
        if (timeStr.includes('1') && (timeStr.includes('myr') || timeStr.includes('million'))) return 0.86;
        
        // Human evolution and technology (thousand years ago and recent)
        if (timeStr.includes('300') && (timeStr.includes('kyr') || (timeStr.includes('thousand') && timeStr.includes('year')))) return 0.87;
        if (timeStr.includes('200') && (timeStr.includes('kyr') || (timeStr.includes('thousand') && timeStr.includes('year')))) return 0.875;
        if (timeStr.includes('100') && (timeStr.includes('kyr') || (timeStr.includes('thousand') && timeStr.includes('year')))) return 0.88;
        if (timeStr.includes('50') && (timeStr.includes('kyr') || (timeStr.includes('thousand') && timeStr.includes('year')))) return 0.885;
        if (timeStr.includes('10') && (timeStr.includes('kyr') || (timeStr.includes('thousand') && timeStr.includes('year')))) return 0.89;
        
        if (timeStr.includes('human')) return 0.88;
        if (timeStr.includes('homo sapiens')) return 0.88;
        if (timeStr.includes('agriculture')) return 0.9;
        if (timeStr.includes('civilization')) return 0.92;
        if (timeStr.includes('industrial')) return 0.94;
        if (timeStr.includes('digital')) return 0.96;
        if (timeStr.includes('modern') || timeStr.includes('present') || timeStr.includes('current')) return 0.98;
        
        // Handle YYYY-MM-DD and YYYY-MM formats (common in Ethereum standards)
        const dateMatch = timeStr.match(/(\d{4})-(\d{2})(?:-(\d{2}))?/);
        if (dateMatch) {
            const year = parseInt(dateMatch[1]);
            const month = parseInt(dateMatch[2]);
            const day = dateMatch[3] ? parseInt(dateMatch[3]) : 15; // Default to middle of month
            const currentYear = 2024;
            const currentMonth = 7; // July 2024
            const currentDay = 30;
            
            // Calculate years ago with day precision
            const yearsAgo = currentYear - year + (currentMonth - month) / 12 + (currentDay - day) / 365.25;
            
            // For recent history (last 50 years), use very precise positioning
            if (year >= 1970 && year <= currentYear) {
                // Spread last 50 years across rightmost 5% of timeline
                const recentYearsSpan = 50;
                const recentPosition = 0.95 + (0.05 * (recentYearsSpan - yearsAgo) / recentYearsSpan);
                return Math.min(0.999, Math.max(0.95, recentPosition));
            }
            
            // For older years in recorded history
            if (year >= 1000 && year < 1970) {
                // Spread 1000-1970 across 90-95% of timeline
                const historicalSpan = 970;
                const historicalPosition = 0.90 + (0.05 * (year - 1000) / historicalSpan);
                return historicalPosition;
            }
        }
        
        // Handle specific years (1800s, 1900s, 2000s)
        const yearMatch = timeStr.match(/(\d{4})/);
        if (yearMatch) {
            const year = parseInt(yearMatch[1]);
            const currentYear = 2024;
            const yearsAgo = currentYear - year;
            
            // For years within recorded history (say, last 5000 years), use precise positioning
            if (year >= 1000 && year <= currentYear) {
                const maxAge = 13.8e9; // Age of universe
                const position = 1 - (yearsAgo / maxAge);
                return Math.max(0.95, position); // Ensure very recent items are at least at 95% position
            }
        }
        
        // Parse numeric values for more precise positioning
        // First try to match patterns with scientific units (Gyr, Myr, Kyr)
        let match = timeStr.match(/(\d+\.?\d*)\s*(gyr|myr|kyr)\s*ago?/i);
        if (match) {
            let value = parseFloat(match[1]);
            const unit = match[2].toLowerCase();
            
            // Handle scientific unit scaling (Gyr = gigayears = billion years, Myr = megayears = million years, Kyr = kiloyears = thousand years)
            if (unit === 'gyr') {
                value *= 1e9; // gigayears = billion years
            } else if (unit === 'myr') {
                value *= 1e6; // megayears = million years
            } else if (unit === 'kyr') {
                value *= 1e3; // kiloyears = thousand years
            }
            
            // Map to timeline position (0 = Big Bang, 1 = present)
            const maxAge = 13.8e9; // Age of universe
            return Math.max(0.05, 1 - (value / maxAge));
        }
        
        // Then try to match patterns with magnitude words
        match = timeStr.match(/(\d+\.?\d*)\s*(billion|million|thousand)?\s*(year|yr|ago)/i);
        if (match) {
            let value = parseFloat(match[1]);
            const magnitude = match[2] || '';
            
            // Handle magnitude scaling for regular years
            if (magnitude.includes('billion')) value *= 1e9;
            else if (magnitude.includes('million')) value *= 1e6;
            else if (magnitude.includes('thousand')) value *= 1e3;
            
            // Map to timeline position (0 = Big Bang, 1 = present)
            const maxAge = 13.8e9; // Age of universe
            return Math.max(0.05, 1 - (value / maxAge));
        }
        
        // Fallback to domain-based positioning
        const domainTimes = {
            ethereum: 0.9
        };
        return domainTimes[domain] || 0.5;
    }
    
    parseTimeOrigin(timeString) {
        if (!timeString) return 0;
        
        // Convert various time formats to years ago
        const str = timeString.toLowerCase();
        
        // Handle "big bang" specially
        if (str.includes('big bang')) {
            const match = str.match(/(\d+\.?\d*)\s*(second|minute|hour|day|year|myr|gyr)?/);
            if (match) {
                const value = parseFloat(match[1]);
                const unit = match[2] || '';
                
                // Convert time after big bang to years ago (13.8 billion years)
                const bigBangYearsAgo = 13.8e9;
                
                if (unit.includes('second')) return bigBangYearsAgo - value / (365.25 * 24 * 3600);
                if (unit.includes('minute')) return bigBangYearsAgo - value / (365.25 * 24 * 60);
                if (unit.includes('hour')) return bigBangYearsAgo - value / (365.25 * 24);
                if (unit.includes('day')) return bigBangYearsAgo - value / 365.25;
                if (unit.includes('year')) return bigBangYearsAgo - value;
                if (unit.includes('myr')) return bigBangYearsAgo - value * 1e6;
                if (unit.includes('gyr')) return bigBangYearsAgo - value * 1e9;
            }
            return 13.8e9; // Big Bang
        }
        
        // Extract number and unit
        const match = str.match(/(\d+\.?\d*)\s*(billion|million|thousand|hundred)?\s*(year|yr|myr|gyr|ce|bce|bc|ad)?/);
        if (!match) return 0;
        
        let value = parseFloat(match[1]);
        const magnitude = match[2] || '';
        const unit = match[3] || '';
        
        // Apply magnitude
        if (magnitude.includes('billion')) value *= 1e9;
        else if (magnitude.includes('million')) value *= 1e6;
        else if (magnitude.includes('thousand')) value *= 1e3;
        else if (magnitude.includes('hundred')) value *= 1e2;
        
        // Handle different units
        if (unit === 'gyr') value *= 1e9;
        else if (unit === 'myr') value *= 1e6;
        
        // Handle CE/BCE/BC/AD
        if (unit === 'ce' || unit === 'ad') value = 2024 - value;
        else if (unit === 'bce' || unit === 'bc') value = 2024 + value;
        
        // If the string contains "ago", use as is; otherwise assume it's years ago
        if (!str.includes('ago') && !str.includes('after') && (unit === 'ce' || unit === 'bce' || unit === 'bc' || unit === 'ad')) {
            // Already handled above
        } else if (str.includes('present') || str.includes('modern') || str.includes('current')) {
            value = 0;
        }
        
        return value;
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