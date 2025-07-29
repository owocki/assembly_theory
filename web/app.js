class AssemblyTheoryApp {
    constructor() {
        this.dataProcessor = new DataProcessor();
        this.visualization = new NetworkVisualization('network-svg');
        this.linkOptions = new LinkOptions();
        this.currentData = null;
        this.currentFilters = {
            aiRange: { min: 1, max: 8 },
            domains: ['cosmic', 'geological', 'biological', 'cognitive', 'technological'],
            searchTerm: ''
        };
        this.currentLinkStrategy = 'none';
        
        this.init();
    }
    
    init() {
        // Set up event listeners
        this.setupEventListeners();
        
        // Initialize data
        this.loadData();
        
        console.log('Assembly Theory Network Visualization initialized');
    }
    
    async loadData() {
        try {
            // Load real data from repository
            this.rawData = await this.dataProcessor.generateRealData();
            console.log(`Loaded ${this.rawData.nodes.length} nodes and ${this.rawData.edges.length} edges from repository data`);
        } catch (error) {
            console.warn('Failed to load real data, using sample data:', error);
            // Fallback to sample data
            this.rawData = this.dataProcessor.generateSampleData();
        }
        this.updateVisualization();
        
        // Hide loading indicator after data is loaded and visualization is updated
        document.getElementById('loading').classList.add('hidden');
    }
    
    setupEventListeners() {
        // Assembly Index range sliders
        const aiRangeMin = document.getElementById('ai-range-min');
        const aiRangeMax = document.getElementById('ai-range-max');
        const aiMinValue = document.getElementById('ai-min-value');
        const aiMaxValue = document.getElementById('ai-max-value');
        
        // Helper to get tier label
        const getTierLabel = (value) => {
            const tierRanges = [
                'AI 1-10',
                'AI 10-100',
                'AI 100-1K',
                'AI 1K-10K',
                'AI 10K-100K',
                'AI 100K-1M',
                'AI 1M-1B',
                'AI 1B+'
            ];
            const index = Math.min(parseInt(value), tierRanges.length - 1);
            return `Tier ${index + 1} (${tierRanges[index]})`;
        };
        
        aiRangeMin.addEventListener('input', (e) => {
            this.currentFilters.aiRange.min = parseInt(e.target.value) + 1; // Convert 0-7 to 1-8
            if (this.currentFilters.aiRange.min > this.currentFilters.aiRange.max) {
                this.currentFilters.aiRange.max = this.currentFilters.aiRange.min;
                aiRangeMax.value = this.currentFilters.aiRange.min - 1;
                aiMaxValue.textContent = getTierLabel(aiRangeMax.value);
            }
            aiMinValue.textContent = getTierLabel(e.target.value);
            this.updateVisualization();
        });
        
        aiRangeMax.addEventListener('input', (e) => {
            this.currentFilters.aiRange.max = parseInt(e.target.value) + 1; // Convert 0-7 to 1-8
            if (this.currentFilters.aiRange.max < this.currentFilters.aiRange.min) {
                this.currentFilters.aiRange.min = this.currentFilters.aiRange.max;
                aiRangeMin.value = this.currentFilters.aiRange.max - 1;
                aiMinValue.textContent = getTierLabel(aiRangeMin.value);
            }
            aiMaxValue.textContent = getTierLabel(e.target.value);
            this.updateVisualization();
        });
        
        // Domain checkboxes
        const domainCheckboxes = document.querySelectorAll('[data-domain]');
        domainCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const domain = e.target.dataset.domain;
                if (e.target.checked) {
                    if (!this.currentFilters.domains.includes(domain)) {
                        this.currentFilters.domains.push(domain);
                    }
                } else {
                    this.currentFilters.domains = this.currentFilters.domains.filter(d => d !== domain);
                }
                this.updateVisualization();
            });
        });
        
        // Search input
        const searchInput = document.getElementById('search');
        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                this.currentFilters.searchTerm = e.target.value;
                this.updateVisualization();
            }, 300);
        });
        
        // Layout selector
        const layoutSelect = document.getElementById('layout-select');
        const layoutDescription = document.getElementById('layout-description');
        
        // Layout descriptions
        const layoutDescriptions = {
            'hierarchical': 'Arranges nodes vertically by complexity - simpler assemblies at top, complex at bottom',
            'timeline': 'Arranges nodes horizontally by time of emergence - Big Bang to present day'
        };
        
        layoutSelect.addEventListener('change', (e) => {
            this.visualization.applyLayout(e.target.value);
            this.visualization.simulation.alpha(0.3).restart();
            
            // Update layout description
            layoutDescription.textContent = layoutDescriptions[e.target.value] || '';
        });
        
        // Set initial layout description
        layoutDescription.textContent = layoutDescriptions[layoutSelect.value] || '';
        
        // Set initial tier labels
        aiMinValue.textContent = getTierLabel(aiRangeMin.value);
        aiMaxValue.textContent = getTierLabel(aiRangeMax.value);
        
        // Link strategy selector
        const linkStrategySelect = document.getElementById('link-strategy-select');
        const strategyDescription = document.getElementById('link-strategy-description');
        const customOptions = document.getElementById('custom-link-options');
        
        linkStrategySelect.addEventListener('change', (e) => {
            this.currentLinkStrategy = e.target.value;
            
            // Update description
            const strategy = this.linkOptions.linkStrategies[e.target.value];
            strategyDescription.textContent = strategy ? strategy.description : '';
            
            // Show/hide custom options
            if (customOptions) {
                customOptions.style.display = e.target.value === 'custom' ? 'block' : 'none';
            }
            
            // Regenerate links with new strategy
            this.updateVisualization();
        });
        
        // Set initial description
        const initialStrategy = this.linkOptions.linkStrategies[this.currentLinkStrategy];
        strategyDescription.textContent = initialStrategy ? initialStrategy.description : '';
        
        // Custom option listeners
        const customMinWeight = document.getElementById('custom-min-weight');
        if (customMinWeight) {
            customMinWeight.addEventListener('input', (e) => {
                const weightValue = document.getElementById('weight-value');
                if (weightValue) {
                    weightValue.textContent = e.target.value;
                }
                if (this.currentLinkStrategy === 'custom') {
                    this.updateVisualization();
                }
            });
        }
        
        // Control buttons - removed from UI
        // Keeping the functionality available via keyboard shortcuts (0 for reset)
        
        // Zoom controls
        document.getElementById('zoom-in').addEventListener('click', () => {
            this.visualization.zoomIn();
        });
        
        document.getElementById('zoom-out').addEventListener('click', () => {
            this.visualization.zoomOut();
        });
        
        document.getElementById('fit-to-screen').addEventListener('click', () => {
            this.visualization.fitToScreen();
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName.toLowerCase() === 'input') return;
            
            switch (e.key) {
                case '=':
                case '+':
                    this.visualization.zoomIn();
                    e.preventDefault();
                    break;
                case '-':
                    this.visualization.zoomOut();
                    e.preventDefault();
                    break;
                case '0':
                    this.visualization.resetView();
                    e.preventDefault();
                    break;
                case 'f':
                    this.visualization.fitToScreen();
                    e.preventDefault();
                    break;
                case 'Escape':
                    this.clearSelection();
                    e.preventDefault();
                    break;
            }
        });
        
        // Close info panel when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.info-panel') && !e.target.closest('.node')) {
                this.clearSelection();
            }
        });
    }
    
    updateVisualization() {
        // Filter data based on current filters
        let filteredData = this.dataProcessor.filterData(this.rawData, this.currentFilters);
        
        // Apply selected link strategy
        if (this.linkOptions && this.currentLinkStrategy) {
            const strategy = this.linkOptions.linkStrategies[this.currentLinkStrategy];
            if (strategy) {
                // Get custom options if using custom strategy
                let options = {};
                if (this.currentLinkStrategy === 'custom') {
                    const maxConn = document.getElementById('custom-max-connections');
                    const aiRatio = document.getElementById('custom-ai-ratio');
                    const sameDomain = document.getElementById('custom-same-domain');
                    const minWeight = document.getElementById('custom-min-weight');
                    
                    options = {
                        maxConnections: maxConn ? parseInt(maxConn.value) : 5,
                        aiRatioThreshold: aiRatio ? parseInt(aiRatio.value) : 10,
                        sameDomainOnly: sameDomain ? sameDomain.checked : false,
                        minWeight: minWeight ? parseFloat(minWeight.value) : 0.1
                    };
                }
                
                // Generate new links based on strategy
                const newLinks = strategy.generateLinks(filteredData.nodes, options);
                filteredData = {
                    ...filteredData,
                    edges: newLinks
                };
            }
        }
        
        this.currentData = filteredData;
        
        // Update visualization
        this.visualization.render(this.currentData);
        
        // Update info display
        this.updateInfoDisplay();
    }
    
    updateInfoDisplay() {
        // Update stats or other info displays if needed
        console.log(`Displaying ${this.currentData.nodes.length} nodes and ${this.currentData.edges.length} edges`);
    }
    
    clearSelection() {
        if (this.visualization.selectedNode) {
            this.visualization.selectedNode.classed('selected', false);
            this.visualization.selectedNode = null;
        }
        
        const infoPanel = document.getElementById('info-panel');
        infoPanel.classList.remove('visible');
    }
    
    exportData() {
        const dataToExport = {
            ...this.currentData,
            filters: this.currentFilters,
            timestamp: new Date().toISOString()
        };
        
        const dataStr = JSON.stringify(dataToExport, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `assembly-network-${Date.now()}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        console.log('Network data exported');
    }
    
    // Method to add new data (for future real-time updates)
    addNode(node) {
        const processedNode = this.dataProcessor.processNode(node);
        this.rawData.nodes.push(processedNode);
        this.updateVisualization();
    }
    
    addEdge(edge) {
        this.rawData.edges.push(edge);
        this.updateVisualization();
    }
    
    // Method to highlight specific pathways
    highlightPathway(pathwayNodes) {
        // Implementation for highlighting specific assembly pathways
        console.log('Highlighting pathway:', pathwayNodes);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.assemblyApp = new AssemblyTheoryApp();
});

// Global utility functions
window.AssemblyTheoryUtils = {
    // Convert assembly index to tier
    getAssemblyTier(ai) {
        if (ai <= 10) return 1;
        if (ai <= 100) return 2;
        if (ai <= 1000) return 3;
        if (ai <= 10000) return 4;
        if (ai <= 100000) return 5;
        if (ai <= 1000000) return 6;
        if (ai <= 1000000000) return 7;
        return 8;
    },
    
    // Format large numbers
    formatNumber(num) {
        if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';
        if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
        if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
        return num.toString();
    },
    
    // Get pathway symbol
    getPathwaySymbol(type) {
        const symbols = {
            'assembly_pathway': '→',
            'major_transition': '⇒',
            'reversible_assembly': '↔',
            'dynamic_equilibrium': '⇌',
            'assembly_combination': '×',
            'assembly_decomposition': '÷',
            'cyclic_assembly': '∞',
            'approximate_assembly': '≈'
        };
        return symbols[type] || '→';
    }
};