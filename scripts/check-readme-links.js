const fs = require('fs');
const path = require('path');

// Read README.md
const readmePath = path.join(__dirname, '../README.md');
const content = fs.readFileSync(readmePath, 'utf8');

// Extract all links that point to files in the repo
const linkPattern = /\[([^\]]+)\]\(https:\/\/github\.com\/owocki\/assembly_theory\/tree\/master\/([^)]+)\)/g;
let match;
const links = [];

while ((match = linkPattern.exec(content)) !== null) {
    links.push({
        text: match[1],
        fullMatch: match[0],
        relativePath: match[2],
        line: content.substring(0, match.index).split('\n').length
    });
}

console.log(`Found ${links.length} links to check\n`);

// Check each link
const brokenLinks = [];
const workingLinks = [];

for (const link of links) {
    const filePath = path.join(__dirname, '..', link.relativePath);
    const exists = fs.existsSync(filePath);
    
    if (exists) {
        workingLinks.push(link);
    } else {
        brokenLinks.push(link);
        console.log(`❌ Line ${link.line}: ${link.relativePath}`);
        
        // Try to find similar files
        const dir = path.dirname(filePath);
        const filename = path.basename(filePath);
        
        if (fs.existsSync(dir)) {
            const files = fs.readdirSync(dir);
            const similar = files.filter(f => f.includes(filename.split('.')[0]));
            if (similar.length > 0) {
                console.log(`   Possible matches in ${path.relative(path.join(__dirname, '..'), dir)}: ${similar.join(', ')}`);
            }
        } else {
            console.log(`   Directory doesn't exist: ${path.relative(path.join(__dirname, '..'), dir)}`);
        }
        console.log('');
    }
}

console.log(`\nSummary:`);
console.log(`✅ Working links: ${workingLinks.length}`);
console.log(`❌ Broken links: ${brokenLinks.length}`);

// Write broken links to a file for easy reference
if (brokenLinks.length > 0) {
    const brokenLinksReport = brokenLinks.map(link => ({
        line: link.line,
        path: link.relativePath,
        text: link.text
    }));
    
    fs.writeFileSync(
        path.join(__dirname, 'broken-links.json'),
        JSON.stringify(brokenLinksReport, null, 2)
    );
    console.log(`\nBroken links saved to scripts/broken-links.json`);
}