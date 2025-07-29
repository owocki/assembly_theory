// Script to update complete-markdown-ingestion.js with all markdown files

const fs = require('fs');
const path = require('path');

// Function to recursively find all .md files in a directory
function findMarkdownFiles(dir, basePath = '') {
    const files = [];
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
        const itemPath = path.join(dir, item);
        const stat = fs.statSync(itemPath);
        
        if (stat.isDirectory()) {
            files.push(...findMarkdownFiles(itemPath, path.join(basePath, item)));
        } else if (item.endsWith('.md') && !item.includes('README')) {
            files.push(path.join(basePath, item).replace(/\\/g, '/'));
        }
    }
    
    return files;
}

// Find all markdown files by domain
const domains = ['cosmic', 'geological', 'biological', 'cognitive', 'technological'];
const allFiles = {};

for (const domain of domains) {
    const domainPath = path.join(__dirname, '..', 'domains', domain);
    if (fs.existsSync(domainPath)) {
        const files = findMarkdownFiles(domainPath, `/domains/${domain}`);
        allFiles[domain] = files.sort();
        console.log(`${domain}: ${files.length} files`);
    }
}

// Read the current complete-markdown-ingestion.js file
const ingestionPath = path.join(__dirname, 'complete-markdown-ingestion.js');
let ingestionContent = fs.readFileSync(ingestionPath, 'utf8');

// Find existing files in the ingestion system
const existingFiles = new Set();
const fileRegex = /\/domains\/[^']+\.md/g;
const matches = ingestionContent.match(fileRegex);
if (matches) {
    matches.forEach(file => existingFiles.add(file));
}

// Find missing files
const missingFiles = [];
for (const [domain, files] of Object.entries(allFiles)) {
    for (const file of files) {
        if (!existingFiles.has(file)) {
            missingFiles.push(file);
        }
    }
}

console.log(`\nFound ${missingFiles.length} missing files:`);
missingFiles.forEach(file => console.log(`  ${file}`));

// Group missing files by domain
const missingByDomain = {};
for (const file of missingFiles) {
    const domain = file.split('/')[2];
    if (!missingByDomain[domain]) {
        missingByDomain[domain] = [];
    }
    missingByDomain[domain].push(file);
}

// Generate update code
console.log('\n\nAdd these files to complete-markdown-ingestion.js:');
console.log('================================================');

for (const [domain, files] of Object.entries(missingByDomain)) {
    if (files.length > 0) {
        console.log(`\n            // Additional ${domain} files to add:`);
        files.forEach(file => {
            console.log(`            '${file}',`);
        });
    }
}