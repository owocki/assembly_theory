#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Helper function to extract value after a pattern
function extractValue(content, patterns, defaultValue = '') {
  for (const pattern of patterns) {
    const regex = new RegExp(pattern, 'im');
    const match = content.match(regex);
    if (match && match[1]) {
      return match[1].trim();
    }
  }
  return defaultValue;
}

// Helper function to parse assembly index
function parseAssemblyIndex(value) {
  if (!value) return 0;
  
  // Remove commas and spaces
  value = value.replace(/[,\s]/g, '');
  
  // Handle special cases for huge numbers first
  if (value.includes('+') && (value.includes('billion') || value.includes('trillion'))) {
    // Handle formats like "500B+", "1T+"
    if (value.toLowerCase().includes('trillion') || value.includes('T')) {
      const num = parseFloat(value.replace(/[^\d.]/g, '')) || 1;
      return num * 1000000000000;
    }
    if (value.toLowerCase().includes('billion') || value.includes('B')) {
      const num = parseFloat(value.replace(/[^\d.]/g, '')) || 1;
      return num * 1000000000;
    }
  }
  
  // Handle scientific notation (e.g., "10^13", "10¹³")
  if (value.includes('^') || value.includes('¹') || value.includes('²') || value.includes('³') || value.includes('⁴') || value.includes('⁵') || value.includes('⁶') || value.includes('⁷') || value.includes('⁸') || value.includes('⁹')) {
    value = value.replace(/[~≈]/g, '');
    
    // Convert superscript numbers to regular
    const superscriptMap = {'⁰':'0', '¹':'1', '²':'2', '³':'3', '⁴':'4', '⁵':'5', '⁶':'6', '⁷':'7', '⁸':'8', '⁹':'9'};
    for (const [sup, num] of Object.entries(superscriptMap)) {
      value = value.replace(new RegExp(sup, 'g'), num);
    }
    
    // Parse 10^n notation
    const sciMatch = value.match(/10\^?(\d+)/);
    if (sciMatch) {
      return Math.pow(10, parseInt(sciMatch[1]));
    }
  }
  
  // Handle ranges (take the higher value for assembly index)
  if (value.includes('-')) {
    const parts = value.split('-').map(p => parseFloat(p.replace(/[^\d.]/g, '')));
    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
      return Math.max(parts[0], parts[1]);
    }
  }
  
  // Handle "billion", "million", etc.
  value = value.toLowerCase();
  if (value.includes('billion')) {
    const num = parseFloat(value.replace(/[^\d.]/g, '')) || 1;
    return num * 1000000000;
  }
  if (value.includes('million')) {
    const num = parseFloat(value.replace(/[^\d.]/g, '')) || 1;
    return num * 1000000;
  }
  if (value.includes('thousand') || value.includes('k')) {
    const num = parseFloat(value.replace(/[^\d.]/g, '')) || 1;
    return num * 1000;
  }
  
  // Try to parse as regular number
  const parsed = parseFloat(value.replace(/[^\d.]/g, ''));
  return isNaN(parsed) ? 0 : parsed;
}

// Extract domain from file path
function extractDomain(filePath) {
  const parts = filePath.split(path.sep);
  const domainsIndex = parts.indexOf('domains');
  if (domainsIndex >= 0 && domainsIndex < parts.length - 1) {
    const domain = parts[domainsIndex + 1];
    // Map domain names
    const domainMap = {
      'cosmic': 'cosmic',
      'geological': 'geological', 
      'biological': 'biological',
      'cognitive': 'cognitive',
      'technological': 'technological'
    };
    return domainMap[domain] || 'unknown';
  }
  return 'unknown';
}

// Parse a single markdown file
function parseMarkdownFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Skip PATHWAYS and README files
    const filename = path.basename(filePath);
    if (filename === 'PATHWAYS.md' || filename === 'README.md') {
      return null;
    }
    
    // Extract ID from filename
    const id = path.basename(filePath, '.md');
    
    // Extract title (first # heading)
    const titleMatch = content.match(/^#\s+(.+)$/m);
    const name = titleMatch ? titleMatch[1].trim() : id;
    
    // Extract Assembly Index
    const aiPatterns = [
      '\\*\\*Assembly Index\\*\\*:\\s*([^\\n]+)',
      'Assembly Index:\\s*([^\\n]+)',
      '- \\*\\*Assembly Index\\*\\*:\\s*([^\\n]+)',
      '- Assembly Index:\\s*([^\\n]+)'
    ];
    const aiValue = extractValue(content, aiPatterns);
    const assembly_index = parseAssemblyIndex(aiValue);
    
    // Extract domain
    const domainFromPath = extractDomain(filePath);
    const domainPatterns = [
      '\\*\\*Domain\\*\\*:\\s*([^\\n]+)',
      'Domain:\\s*([^\\n]+)',
      '- \\*\\*Domain\\*\\*:\\s*([^\\n]+)',
      '- Domain:\\s*([^\\n]+)'
    ];
    const domainValue = extractValue(content, domainPatterns, domainFromPath).toLowerCase();
    const domain = domainValue.includes('biological') ? 'biological' :
                   domainValue.includes('cosmic') ? 'cosmic' :
                   domainValue.includes('geological') ? 'geological' :
                   domainValue.includes('cognitive') ? 'cognitive' :
                   domainValue.includes('technological') ? 'technological' :
                   domainFromPath;
    
    // Extract description (first paragraph after title or line with "is")
    let description = '';
    const lines = content.split('\n');
    let foundTitle = false;
    for (let i = 0; i < lines.length && i < 100; i++) {
      const line = lines[i].trim();
      if (line.startsWith('#') && !foundTitle) {
        foundTitle = true;
        continue;
      }
      if (foundTitle && line && !line.startsWith('#') && !line.startsWith('-') && !line.startsWith('*') && !line.startsWith('|') && !line.startsWith('```')) {
        // Check if this line or nearby lines contain "is" or "represents"
        if (line.includes(' is ') || line.includes(' represents ') || line.includes(' are ')) {
          description = line;
          break;
        }
      }
    }
    
    // If no description found, look for the first non-empty paragraph
    if (!description) {
      const paragraphs = content.split(/\n\n+/);
      for (const para of paragraphs) {
        const trimmed = para.trim();
        if (trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('-') && !trimmed.startsWith('*') && !trimmed.includes('|') && !trimmed.startsWith('```') && trimmed.length > 20) {
          description = trimmed.split('\n')[0];
          break;
        }
      }
    }
    
    // If still no description, try to extract from overview or introduction sections
    if (!description) {
      const overviewMatch = content.match(/##\s*(?:Overview|Introduction|Description)[\s\S]*?\n\n([^\n#*-`]+)/i);
      if (overviewMatch && overviewMatch[1]) {
        description = overviewMatch[1].trim();
      }
    }
    
    // Clean up description
    description = description.replace(/\*\*/g, '').replace(/\*/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').substring(0, 200);
    
    // Extract time origin
    const timePatterns = [
      '\\*\\*Origin Time\\*\\*:\\s*([^\\n]+)',
      '\\*\\*First Appearance\\*\\*:\\s*([^\\n]+)',
      '\\*\\*Time Origin\\*\\*:\\s*([^\\n]+)',
      'Origin Time:\\s*([^\\n]+)',
      'First Appearance:\\s*([^\\n]+)',
      'Time Origin:\\s*([^\\n]+)',
      '- \\*\\*Origin Time\\*\\*:\\s*([^\\n]+)',
      '- \\*\\*First Appearance\\*\\*:\\s*([^\\n]+)',
      '- \\*\\*Time Origin\\*\\*:\\s*([^\\n]+)',
      '- Origin Time:\\s*([^\\n]+)',
      '- First Appearance:\\s*([^\\n]+)',
      '- Time Origin:\\s*([^\\n]+)'
    ];
    const time_origin = extractValue(content, timePatterns, 'Unknown');
    
    // Extract copy number
    const copyPatterns = [
      '\\*\\*Copy Number\\*\\*:\\s*([^\\n]+)',
      'Copy Number:\\s*([^\\n]+)',
      '- \\*\\*Copy Number\\*\\*:\\s*([^\\n]+)',
      '- Copy Number:\\s*([^\\n]+)',
      '\\*\\*Distribution\\*\\*:\\s*([^\\n]+)',
      'Distribution:\\s*([^\\n]+)',
      '- \\*\\*Distribution\\*\\*:\\s*([^\\n]+)',
      '- Distribution:\\s*([^\\n]+)',
      '\\*\\*Universal Abundance\\*\\*:\\s*([^\\n]+)',
      '- \\*\\*Universal Abundance\\*\\*:\\s*([^\\n]+)'
    ];
    const copy_number = extractValue(content, copyPatterns, 'Unknown');
    
    return {
      id,
      name,
      assembly_index,
      domain,
      description,
      time_origin,
      copy_number
    };
    
  } catch (error) {
    console.error(`Error parsing ${filePath}:`, error.message);
    return null;
  }
}

// Recursively find all markdown files
function findMarkdownFiles(dir, files = []) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      findMarkdownFiles(fullPath, files);
    } else if (item.endsWith('.md')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Main function
function main() {
  const domainsDir = '/Users/owocki/Sites/assembly_theory/domains';
  const outputFile = '/Users/owocki/Sites/assembly_theory/web/all-assemblies-data.js';
  
  console.log('Finding markdown files...');
  const markdownFiles = findMarkdownFiles(domainsDir);
  console.log(`Found ${markdownFiles.length} markdown files`);
  
  console.log('Parsing files...');
  const nodes = [];
  
  for (const file of markdownFiles) {
    const node = parseMarkdownFile(file);
    if (node && node.assembly_index > 0) {
      nodes.push(node);
    }
  }
  
  console.log(`Successfully parsed ${nodes.length} assemblies`);
  
  // Sort by assembly index
  nodes.sort((a, b) => a.assembly_index - b.assembly_index);
  
  // Generate JavaScript content
  const jsContent = `// Auto-generated assembly data from all markdown files in domains/
// Generated on: ${new Date().toISOString().split('T')[0]}
// Total assemblies: ${nodes.length}

const nodes = ${JSON.stringify(nodes, null, 2)};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { nodes };
}
`;
  
  // Write to file
  fs.writeFileSync(outputFile, jsContent);
  console.log(`Generated ${outputFile}`);
  console.log(`Total assemblies with valid data: ${nodes.length}`);
}

// Run the script
main();