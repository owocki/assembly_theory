// Debug script to check data loading
console.log('=== DEBUG DATA LOADING ===');

// Check if ethereum domains data is loaded
if (typeof window.ethereumDomainsData !== 'undefined') {
    console.log('✅ ethereumDomainsData loaded:', {
        nodes: window.ethereumDomainsData.nodes.length,
        edges: window.ethereumDomainsData.edges.length,
        sampleNodes: window.ethereumDomainsData.nodes.slice(0, 3).map(n => ({
            id: n.id,
            name: n.name,
            domain: n.domain,
            assembly_index: n.assembly_index
        }))
    });
} else {
    console.log('❌ ethereumDomainsData NOT loaded');
}

// Check comprehensive data ingestion
setTimeout(() => {
    if (typeof window.ComprehensiveDataIngestion !== 'undefined') {
        console.log('✅ ComprehensiveDataIngestion class available');
        
        const ingestion = new ComprehensiveDataIngestion();
        ingestion.generateComprehensiveDataset().then(data => {
            console.log('📊 Comprehensive dataset generated:', {
                nodes: data.nodes.length,
                edges: data.edges.length,
                domains: [...new Set(data.nodes.map(n => n.domain))],
                ethereumNodes: data.nodes.filter(n => n.domain === 'ethereum').length
            });
        });
    } else {
        console.log('❌ ComprehensiveDataIngestion NOT available');
    }
}, 1000);

// Check current app state
setTimeout(() => {
    if (window.assemblyApp && window.assemblyApp.rawData) {
        console.log('🔍 Current app data:', {
            totalNodes: window.assemblyApp.rawData.nodes.length,
            totalEdges: window.assemblyApp.rawData.edges.length,
            domains: [...new Set(window.assemblyApp.rawData.nodes.map(n => n.domain))],
            ethereumNodes: window.assemblyApp.rawData.nodes.filter(n => n.domain === 'ethereum').length,
            currentFilters: window.assemblyApp.currentFilters
        });
        
        console.log('🔍 Filtered data:', {
            nodes: window.assemblyApp.currentData.nodes.length,
            edges: window.assemblyApp.currentData.edges.length,
            visibleDomains: [...new Set(window.assemblyApp.currentData.nodes.map(n => n.domain))]
        });
    }
}, 2000);