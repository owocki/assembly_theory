#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Helper function to extract assembly index from text
function extractAssemblyIndex(content) {
    // Look for patterns like "AI: 1000", "Assembly Index: 500", "[AI: 10]", "**Assembly Index**: 2", "**Estimated Assembly Index**: ~100,000", etc.
    const patterns = [
        /\*\*Estimated\s+Assembly\s+Index\*\*:\s*~?([0-9,]+(?:\.[0-9]+)?[KMBTkmbto]*)/i,
        /\*\*Assembly\s+Index\*\*:\s*~?([0-9,]+(?:\.[0-9]+)?[KMBTkmbto]*)/i,
        /##\s*Assembly\s+Index:\s*~?([0-9,]+(?:\.[0-9]+)?[KMBTkmbto]*)/i,
        /Estimated\s+Assembly\s+Index:\s*~?([0-9,]+(?:\.[0-9]+)?[KMBTkmbto]*)/i,
        /Assembly\s+Index:\s*~?([0-9,]+(?:\.[0-9]+)?[KMBTkmbto]*)/i,
        /AI:\s*~?([0-9,]+(?:\.[0-9]+)?[KMBTkmbto]*)/i,
        /\[AI:\s*~?([0-9,]+(?:\.[0-9]+)?[KMBTkmbto]*)\]/i,
        /assembly\s+index\s*=\s*~?([0-9,]+(?:\.[0-9]+)?[KMBTkmbto]*)/i
    ];
    
    for (const pattern of patterns) {
        const match = content.match(pattern);
        if (match) {
            let value = match[1].replace(/,/g, '');
            
            // Handle suffixes
            const suffixes = {
                'k': 1000, 'K': 1000,
                'm': 1000000, 'M': 1000000,
                'b': 1000000000, 'B': 1000000000,
                't': 1000000000000, 'T': 1000000000000
            };
            
            const lastChar = value.slice(-1);
            if (suffixes[lastChar]) {
                value = parseFloat(value.slice(0, -1)) * suffixes[lastChar];
            }
            
            return parseInt(value) || 0;
        }
    }
    
    return null;
}

// Helper function to extract time origin
function extractTimeOrigin(content) {
    const patterns = [
        /\*\*First\s+Appearance\*\*:\s*([^\n]+)/i,
        /##\s*Time\s+Origin:\s*([^\n]+)/i,
        /Time\s+Origin:\s*([^\n]+)/i,
        /Origin:\s*([^\n]+)/i,
        /First\s+appeared?:\s*([^\n]+)/i,
        /Emerged:\s*([^\n]+)/i,
        /([0-9.]+\s*(?:billion|million|thousand)?\s*years?\s+ago)/i,
        /([0-9.]+\s*(?:Gyr|Myr|kyr|yr)\s+ago)/i
    ];
    
    for (const pattern of patterns) {
        const match = content.match(pattern);
        if (match) {
            return match[1].trim();
        }
    }
    
    return 'Unknown';
}

// Helper function to extract domain from file path
function extractDomain(filePath) {
    const pathParts = filePath.split('/');
    const domainsIndex = pathParts.findIndex(part => part === 'domains');
    if (domainsIndex !== -1 && domainsIndex + 1 < pathParts.length) {
        return pathParts[domainsIndex + 1];
    }
    return 'unknown';
}

// Helper function to extract category from file path
function extractCategory(filePath) {
    const pathParts = filePath.split('/');
    const domainsIndex = pathParts.findIndex(part => part === 'domains');
    if (domainsIndex !== -1 && domainsIndex + 2 < pathParts.length) {
        return pathParts[domainsIndex + 2];
    }
    return 'general';
}

// Helper function to extract description/summary
function extractDescription(content) {
    // Look for content after a description heading or in the first paragraph
    const descPatterns = [
        /(?:## Description|## Overview|## Summary)\s*\n([^#]+)/i,
        /^([^#\n]+(?:\n[^#\n]+)*)/m
    ];
    
    for (const pattern of descPatterns) {
        const match = content.match(pattern);
        if (match) {
            return match[1].trim().replace(/\n/g, ' ').substring(0, 300);
        }
    }
    
    return '';
}

// Helper function to extract relationships/connections
function extractConnections(content) {
    const connections = [];
    
    // Look for markdown links to other assemblies
    const linkPattern = /\[([^\]]+)\]\([^)]*\/([^/]+)\.md\)/g;
    let match;
    
    while ((match = linkPattern.exec(content)) !== null) {
        connections.push({
            name: match[1],
            file: match[2]
        });
    }
    
    return connections;
}

// Helper function to parse a single markdown file
function parseMarkdownFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const fileName = path.basename(filePath, '.md');
        
        // Extract title from first h1 or use filename
        const titleMatch = content.match(/^#\s+(.+)$/m);
        const title = titleMatch ? titleMatch[1] : fileName.replace(/_/g, ' ');
        
        const assembly = {
            id: fileName,
            name: title,
            domain: extractDomain(filePath),
            category: extractCategory(filePath),
            assemblyIndex: extractAssemblyIndex(content),
            timeOrigin: extractTimeOrigin(content),
            description: extractDescription(content),
            connections: extractConnections(content),
            filePath: filePath.replace('/Users/owocki/Sites/assembly/', ''),
            content: content.substring(0, 1000) // First 1000 chars for search
        };
        
        return assembly;
    } catch (error) {
        console.error(`Error parsing ${filePath}:`, error.message);
        return null;
    }
}

// Recursive function to find all .md files
function findMarkdownFiles(dir) {
    const files = [];
    
    try {
        const items = fs.readdirSync(dir);
        
        for (const item of items) {
            const fullPath = path.join(dir, item);
            const stat = fs.statSync(fullPath);
            
            if (stat.isDirectory()) {
                files.push(...findMarkdownFiles(fullPath));
            } else if (item.endsWith('.md')) {
                files.push(fullPath);
            }
        }
    } catch (error) {
        console.error(`Error reading directory ${dir}:`, error.message);
    }
    
    return files;
}

// Main extraction function
function extractAllDomainData() {
    console.log('Starting domain data extraction...');
    
    const domainsPath = path.join(__dirname, '..', '..', 'domains');
    console.log(`Looking for domains at: ${domainsPath}`);
    
    if (!fs.existsSync(domainsPath)) {
        console.error('Domains directory not found!');
        return;
    }
    
    // Find all markdown files
    const markdownFiles = findMarkdownFiles(domainsPath);
    console.log(`Found ${markdownFiles.length} markdown files`);
    
    // Parse all files
    const assemblies = [];
    const domainStats = {};
    
    for (const filePath of markdownFiles) {
        const assembly = parseMarkdownFile(filePath);
        if (assembly) {
            assemblies.push(assembly);
            
            // Track domain statistics
            const domain = assembly.domain;
            if (!domainStats[domain]) {
                domainStats[domain] = { count: 0, withAI: 0, categories: new Set() };
            }
            domainStats[domain].count++;
            domainStats[domain].categories.add(assembly.category);
            if (assembly.assemblyIndex !== null) {
                domainStats[domain].withAI++;
            }
        }
    }
    
    console.log('\\nDomain Statistics:');
    for (const [domain, stats] of Object.entries(domainStats)) {
        console.log(`  ${domain}: ${stats.count} files, ${stats.withAI} with AI, ${stats.categories.size} categories`);
    }
    
    // Sort assemblies by assembly index
    assemblies.sort((a, b) => {
        if (a.assemblyIndex === null && b.assemblyIndex === null) return 0;
        if (a.assemblyIndex === null) return 1;
        if (b.assemblyIndex === null) return -1;
        return a.assemblyIndex - b.assemblyIndex;
    });
    
    console.log(`\\nTotal assemblies processed: ${assemblies.length}`);
    console.log(`Assembly Index range: ${assemblies.find(a => a.assemblyIndex !== null)?.assemblyIndex || 'N/A'} to ${assemblies.filter(a => a.assemblyIndex !== null).pop()?.assemblyIndex || 'N/A'}`);
    
    return {
        assemblies,
        metadata: {
            totalCount: assemblies.length,
            domainStats: Object.fromEntries(
                Object.entries(domainStats).map(([domain, stats]) => [
                    domain, 
                    { ...stats, categories: Array.from(stats.categories) }
                ])
            ),
            extractedAt: new Date().toISOString(),
            aiRange: {
                min: Math.min(...assemblies.filter(a => a.assemblyIndex !== null).map(a => a.assemblyIndex)),
                max: Math.max(...assemblies.filter(a => a.assemblyIndex !== null).map(a => a.assemblyIndex))
            }
        }
    };
}

// Generate data files for the explorer
function generateExplorerData() {
    const data = extractAllDomainData();
    
    if (!data) {
        console.error('Failed to extract data');
        return;
    }
    
    // Write main data file
    const mainDataFile = path.join(__dirname, 'all-assemblies-data.js');
    const jsContent = `// Auto-generated from domains/ markdown files
// Generated: ${new Date().toISOString()}

const assembliesData = ${JSON.stringify(data.assemblies, null, 2)};

const metadata = ${JSON.stringify(data.metadata, null, 2)};

// Export for browser use
if (typeof window !== 'undefined') {
    window.assembliesData = assembliesData;
    window.assembliesMetadata = metadata;
}

// Export for Node.js use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { assembliesData, metadata };
}`;
    
    fs.writeFileSync(mainDataFile, jsContent);
    console.log(`\\nGenerated: ${mainDataFile}`);
    
    // Generate domain-specific files
    const domains = [...new Set(data.assemblies.map(a => a.domain))];
    
    for (const domain of domains) {
        const domainAssemblies = data.assemblies.filter(a => a.domain === domain);
        const domainFile = path.join(__dirname, `${domain}-assemblies.js`);
        
        const domainContent = `// ${domain.charAt(0).toUpperCase() + domain.slice(1)} domain assemblies
// Generated: ${new Date().toISOString()}

const ${domain}Assemblies = ${JSON.stringify(domainAssemblies, null, 2)};

if (typeof window !== 'undefined') {
    window.${domain}Assemblies = ${domain}Assemblies;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = ${domain}Assemblies;
}`;
        
        fs.writeFileSync(domainFile, domainContent);
        console.log(`Generated: ${domainFile}`);
    }
    
    // Generate search index
    const searchIndex = data.assemblies.map(a => ({
        id: a.id,
        name: a.name,
        domain: a.domain,
        category: a.category,
        assemblyIndex: a.assemblyIndex,
        keywords: `${a.name} ${a.description} ${a.domain} ${a.category}`.toLowerCase()
    }));
    
    const searchFile = path.join(__dirname, 'search-index.js');
    const searchContent = `// Search index for assemblies
// Generated: ${new Date().toISOString()}

const searchIndex = ${JSON.stringify(searchIndex, null, 2)};

if (typeof window !== 'undefined') {
    window.searchIndex = searchIndex;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = searchIndex;
}`;
    
    fs.writeFileSync(searchFile, searchContent);
    console.log(`Generated: ${searchFile}`);
    
    console.log('\\n✅ Data extraction complete!');
    console.log(`📊 Processed ${data.assemblies.length} assemblies from ${Object.keys(data.metadata.domainStats).length} domains`);
}

// Run if called directly
if (require.main === module) {
    generateExplorerData();
}

module.exports = { generateExplorerData, extractAllDomainData };