const fs = require('fs');
const path = require('path');

// Read the all-assemblies-data.js file
const filePath = path.join(__dirname, '../web/all-assemblies-data.js');
const content = fs.readFileSync(filePath, 'utf8');

// Extract the nodes array
const nodesMatch = content.match(/const nodes = \[([\s\S]*?)\];/);
if (!nodesMatch) {
    console.error('Could not find nodes array in file');
    process.exit(1);
}

// Parse the nodes array
const nodesStr = '[' + nodesMatch[1] + ']';
let nodes;
try {
    // Add quotes around property names for valid JSON
    const jsonStr = nodesStr
        .replace(/(\s*)(id|name|assembly_index|domain|description|time_origin|copy_number):/g, '$1"$2":')
        .replace(/,(\s*)\]/g, '$1]'); // Remove trailing commas
    nodes = JSON.parse(jsonStr);
} catch (e) {
    console.error('Error parsing nodes:', e);
    process.exit(1);
}

// Filter out technological items
const filteredNodes = nodes.filter(node => node.domain !== 'technological');

console.log(`Original nodes: ${nodes.length}`);
console.log(`Technological nodes removed: ${nodes.length - filteredNodes.length}`);
console.log(`Remaining nodes: ${filteredNodes.length}`);

// Reconstruct the file content
const newNodesStr = JSON.stringify(filteredNodes, null, 2)
    .replace(/"(id|name|assembly_index|domain|description|time_origin|copy_number)":/g, '"$1":')
    .replace(/^\[/, '')
    .replace(/\]$/, '');

const newContent = content.replace(
    /const nodes = \[[\s\S]*?\];/,
    `const nodes = [${newNodesStr}];`
);

// Update the total count in the header
const totalMatch = content.match(/\/\/ Total assemblies: (\d+)/);
if (totalMatch) {
    const newTotal = filteredNodes.length;
    const updatedContent = newContent.replace(
        /\/\/ Total assemblies: \d+/,
        `// Total assemblies: ${newTotal}`
    );
    fs.writeFileSync(filePath, updatedContent);
} else {
    fs.writeFileSync(filePath, newContent);
}

console.log('Successfully removed technological items from all-assemblies-data.js');