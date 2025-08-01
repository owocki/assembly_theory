// Test script to verify comprehensive data ingestion
async function testDataIngestion() {
    console.log('Testing comprehensive data ingestion...');
    
    try {
        // Test the comprehensive data ingestion
        const ingestion = new ComprehensiveDataIngestion();
        const data = await ingestion.generateComprehensiveDataset();
        
        console.log('✅ Data ingestion successful!');
        console.log(`📊 Total nodes: ${data.nodes.length}`);
        console.log(`🔗 Total edges: ${data.edges.length}`);
        
        // Analyze domains
        const domainCounts = {};
        data.nodes.forEach(node => {
            domainCounts[node.domain] = (domainCounts[node.domain] || 0) + 1;
        });
        
        console.log('📈 Node distribution by domain:');
        Object.entries(domainCounts).forEach(([domain, count]) => {
            console.log(`  ${domain}: ${count} nodes`);
        });
        
        // Test markdown data specifically
        const markdownNodes = data.nodes.filter(n => n.source_type === 'markdown');
        console.log(`📄 Markdown nodes: ${markdownNodes.length}`);
        
        // Test GitHub URL generation
        const sampleNode = data.nodes.find(n => n.name === 'Carbon Atom');
        if (sampleNode) {
            console.log(`🔗 Sample GitHub URL: ${sampleNode.github_url}`);
        }
        
        // Test some specific assemblies
        const testAssemblies = ['Water Molecule', 'Quartz', 'Ribosome', 'Human Brain', 'Internet'];
        console.log('🎯 Testing specific assemblies:');
        testAssemblies.forEach(name => {
            const node = data.nodes.find(n => n.name === name);
            if (node) {
                console.log(`  ✅ ${name}: AI=${node.assembly_index}, Domain=${node.domain}, GitHub=${node.github_url}`);
            } else {
                console.log(`  ❌ ${name}: Not found`);
            }
        });
        
        return data;
        
    } catch (error) {
        console.error('❌ Data ingestion failed:', error);
        throw error;
    }
}

// Test markdown parser specifically
function testMarkdownParser() {
    console.log('\nTesting markdown parser...');
    
    try {
        const parser = new MarkdownAssemblyParser();
        
        // Test sample content (simulated)
        const sampleContent = `# Carbon Atom: Foundation of Complexity

## Assembly Profile

- **Element**: Carbon (C)
- **Assembly Index**: 6
- **Atomic Number**: 6
- **Domain**: Cosmic
- **First Appearance**: ~13.0 billion years ago`;
        
        const parsedData = parser.parseAssemblyFile(sampleContent, '/domains/cosmic/atoms/carbon.md');
        const normalizedNode = parser.normalizeAssemblyNode(parsedData);
        
        console.log('✅ Markdown parser test successful!');
        console.log(`📄 Parsed: ${normalizedNode.name}, AI=${normalizedNode.assembly_index}`);
        console.log(`🔗 GitHub URL: ${normalizedNode.github_url}`);
        
        return normalizedNode;
        
    } catch (error) {
        console.error('❌ Markdown parser test failed:', error);
        throw error;
    }
}

// Run tests if in browser
if (typeof window !== 'undefined') {
    // Wait for all scripts to load
    window.addEventListener('load', async () => {
        try {
            await testDataIngestion();
            testMarkdownParser();
            console.log('\n🎉 All tests passed! Data ingestion is working correctly.');
        } catch (error) {
            console.error('🚨 Tests failed:', error);
        }
    });
}

// Export for Node.js testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { testDataIngestion, testMarkdownParser };
}