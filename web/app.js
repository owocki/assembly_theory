class AssemblyTheoryApp {
    constructor() {
        this.dataProcessor = new DataProcessor();
        this.visualization = new NetworkVisualization('network-svg');
        this.currentData = null;
        this.currentFilters = {
            aiRange: { min: 1, max: 8 },
            domains: ['cosmic', 'geological', 'biological', 'cognitive', 'technological', 'hybrid'],
            searchTerm: ''
        };
        
        this.init();
    }
    
    init() {
        // Initialize data
        this.loadData();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Hide loading indicator
        document.getElementById('loading').classList.add('hidden');
        
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
    }
    
    setupEventListeners() {
        // Assembly Index range sliders
        const aiRangeMin = document.getElementById('ai-range-min');
        const aiRangeMax = document.getElementById('ai-range-max');
        
        aiRangeMin.addEventListener('input', (e) => {
            this.currentFilters.aiRange.min = parseInt(e.target.value);
            if (this.currentFilters.aiRange.min > this.currentFilters.aiRange.max) {
                this.currentFilters.aiRange.max = this.currentFilters.aiRange.min;
                aiRangeMax.value = this.currentFilters.aiRange.min;
            }
            this.updateVisualization();
        });
        
        aiRangeMax.addEventListener('input', (e) => {
            this.currentFilters.aiRange.max = parseInt(e.target.value);
            if (this.currentFilters.aiRange.max < this.currentFilters.aiRange.min) {
                this.currentFilters.aiRange.min = this.currentFilters.aiRange.max;
                aiRangeMin.value = this.currentFilters.aiRange.max;
            }
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
        layoutSelect.addEventListener('change', (e) => {
            this.visualization.applyLayout(e.target.value);
            this.visualization.simulation.alpha(0.3).restart();
        });
        
        // Control buttons
        document.getElementById('reset-view').addEventListener('click', () => {
            this.visualization.resetView();
        });
        
        document.getElementById('export-data').addEventListener('click', () => {
            this.exportData();
        });
        
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
        this.currentData = this.dataProcessor.filterData(this.rawData, this.currentFilters);
        
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