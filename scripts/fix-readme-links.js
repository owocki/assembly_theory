const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Read README.md
const readmePath = path.join(__dirname, '../README.md');
let content = fs.readFileSync(readmePath, 'utf8');

// Function to find the best match for a file
function findBestMatch(targetPath) {
    const basename = path.basename(targetPath, '.md');
    const parts = targetPath.split('/');
    
    // Try to find the file using find command
    try {
        const result = execSync(`find domains -name "${basename}.md" -type f 2>/dev/null`, { encoding: 'utf8' });
        const matches = result.trim().split('\n').filter(m => m);
        
        if (matches.length === 1) {
            return matches[0];
        } else if (matches.length > 1) {
            // If multiple matches, try to find the best one based on path similarity
            const targetParts = targetPath.toLowerCase().split('/');
            let bestMatch = matches[0];
            let bestScore = 0;
            
            for (const match of matches) {
                const matchParts = match.toLowerCase().split('/');
                let score = 0;
                
                // Count matching path components
                for (const part of targetParts) {
                    if (matchParts.some(mp => mp.includes(part) || part.includes(mp))) {
                        score++;
                    }
                }
                
                if (score > bestScore) {
                    bestScore = score;
                    bestMatch = match;
                }
            }
            
            return bestMatch;
        }
    } catch (e) {
        // If find fails, continue
    }
    
    // Special cases mapping
    const specialMappings = {
        'domains/biological/compounds/phosphate.md': 'domains/biological/prebiotic/phosphate.md',
        'domains/biological/sugars/ribose.md': 'domains/biological/prebiotic/ribose.md',
        'domains/biological/sugars/glucose_precursor.md': 'domains/biological/prebiotic/sugars.md',
        'domains/biological/lipids/short_fatty_acid.md': 'domains/biological/prebiotic/fatty_acids.md',
        'domains/biological/multicellular/sponge.md': 'domains/biological/multicellular/sponges/basic_sponge.md',
        'domains/biological/multicellular/worm.md': 'domains/biological/multicellular/worms/simple_worm.md',
        'domains/biological/multicellular/fungus.md': 'domains/biological/multicellular/fungi/mushroom.md',
        'domains/biological/multicellular/moss.md': 'domains/biological/multicellular/plants/moss.md',
        'domains/biological/multicellular/jellyfish.md': 'domains/biological/multicellular/cnidarians/jellyfish.md',
        'domains/biological/multicellular/tree.md': 'domains/biological/multicellular/plants/tree.md',
        'domains/biological/multicellular/fish.md': 'domains/biological/multicellular/animals/vertebrates/fish.md',
        'domains/biological/multicellular/bird.md': 'domains/biological/multicellular/animals/vertebrates/bird.md',
        'domains/biological/multicellular/insect.md': 'domains/biological/multicellular/animals/invertebrates/insect.md',
        'domains/technological/basic/knot.md': 'domains/technological/early_human_technology/knot.md',
        'domains/technological/basic/fire.md': 'domains/technological/early_human_technology/fire_control.md',
        'domains/technological/tools/stone_knife.md': 'domains/technological/early_human_technology/stone_knife_edge.md',
        'domains/technological/tools/composite.md': 'domains/technological/early_human_technology/composite_tool.md',
        'domains/technological/tools/wedge.md': 'domains/technological/early_human_technology/wedge.md',
        'domains/technological/tools/rope.md': 'domains/technological/early_human_technology/rope.md',
        'domains/technological/tools/fishing_net.md': 'domains/technological/early_human_technology/fishing_net.md',
        'domains/technological/tools/potters_wheel.md': 'domains/technological/middle_age_technology/potters_wheel.md',
        'domains/technological/tools/loom.md': 'domains/technological/middle_age_technology/loom.md',
        'domains/cognitive/institutions/education.md': 'domains/cognitive/institutions/education_system.md',
        'domains/geological/minerals/feldspar.md': 'domains/geological/minerals/k_feldspar.md',
        'domains/technological/computers/': 'domains/technological/late_age_technology/computer.md',
        'domains/technological/networks/': 'domains/technological/late_age_technology/internet.md',
        'domains/technological/networks/ai.md': 'domains/technological/late_age_technology/ai_system.md',
        'domains/technological/modern/': 'domains/technological/late_age_technology/'
    };
    
    if (specialMappings[targetPath]) {
        return specialMappings[targetPath];
    }
    
    return null;
}

// Extract all links and fix them
const linkPattern = /\[([^\]]+)\]\(https:\/\/github\.com\/owocki\/assembly_theory\/tree\/master\/([^)]+)\)/g;
let match;
let replacements = [];

while ((match = linkPattern.exec(content)) !== null) {
    const fullMatch = match[0];
    const linkText = match[1];
    const relativePath = match[2];
    
    // Check if file exists
    const filePath = path.join(__dirname, '..', relativePath);
    if (!fs.existsSync(filePath)) {
        const bestMatch = findBestMatch(relativePath);
        if (bestMatch) {
            replacements.push({
                oldText: fullMatch,
                newText: `[${linkText}](https://github.com/owocki/assembly_theory/tree/master/${bestMatch})`
            });
        } else {
            console.log(`No match found for: ${relativePath}`);
        }
    }
}

// Apply replacements
console.log(`\nApplying ${replacements.length} fixes...`);
for (const { oldText, newText } of replacements) {
    content = content.replace(oldText, newText);
}

// Write back
fs.writeFileSync(readmePath, content);
console.log('README.md updated successfully!');