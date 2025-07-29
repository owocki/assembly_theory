class MarkdownAssemblyParser {
    constructor() {
        this.domainColors = {
            cosmic: '#0066CC',
            geological: '#8B4513',
            biological: '#228B22',
            cognitive: '#FFD700',
            technological: '#DC143C',
            hybrid: '#9932CC'
        };
    }

    // Parse a markdown file content into assembly data
    parseAssemblyFile(content, filePath) {
        const lines = content.split('\n');
        const assembly = {
            raw_content: content,
            file_path: filePath,
            cross_references: [],
            components: [],
            properties: {},
            formation_processes: [],
            applications: []
        };

        // Extract title (first # heading)
        const titleMatch = content.match(/^#\s+(.+)$/m);
        assembly.name = titleMatch ? titleMatch[1].replace(/:\s*.+$/, '').trim() : 'Unknown';

        // Extract basic assembly information from structured sections
        this.extractBasicInfo(content, assembly);
        this.extractComponents(content, assembly);
        this.extractProperties(content, assembly);
        this.extractCrossReferences(content, assembly);
        this.extractApplications(content, assembly);

        // Determine domain from file path
        assembly.domain = this.extractDomainFromPath(filePath);
        assembly.subdomain = this.extractSubdomainFromPath(filePath);

        // Set color based on domain
        assembly.color = this.domainColors[assembly.domain] || '#666666';

        return assembly;
    }

    extractBasicInfo(content, assembly) {
        // Extract Assembly Index
        const aiMatch = content.match(/Assembly Index[:\s]*[~]?(\d+(?:,\d+)*)/i);
        if (aiMatch) {
            assembly.assembly_index = parseInt(aiMatch[1].replace(/,/g, ''));
        }

        // Extract first appearance/origin time
        const timeMatches = [
            content.match(/First Appearance[:\s]*(.+)/i),
            content.match(/Origin[:\s]*(.+)/i),
            content.match(/Invention Date[:\s]*(.+)/i)
        ];
        
        for (const match of timeMatches) {
            if (match) {
                assembly.first_appearance = match[1].trim();
                break;
            }
        }

        // Extract chemical formula
        const formulaMatch = content.match(/Chemical Formula[:\s]*(.+)/i);
        if (formulaMatch) {
            assembly.chemical_formula = formulaMatch[1].trim();
        }

        // Extract function
        const functionMatch = content.match(/Function[:\s]*(.+)/i);
        if (functionMatch) {
            assembly.function = functionMatch[1].trim();
        }

        // Extract description from content (first paragraph after basic info)
        const descMatch = content.match(/#{2,3}\s*(?:Assembly Profile|Basic Information)[\s\S]*?\n\n([^#\n]+)/);
        if (descMatch) {
            assembly.description = descMatch[1].trim();
        } else {
            // Fallback: use first substantial paragraph
            const paragraphs = content.split('\n\n');
            for (const para of paragraphs) {
                if (para.length > 100 && !para.startsWith('#') && !para.startsWith('-')) {
                    assembly.description = para.replace(/\n/g, ' ').trim();
                    break;
                }
            }
        }
    }

    extractComponents(content, assembly) {
        // Look for component lists in various formats
        const componentSections = [
            /Assembly Components[\s\S]*?```([\s\S]*?)```/i,
            /Components[\s\S]*?```([\s\S]*?)```/i,
            /Structure[\s\S]*?```([\s\S]*?)```/i
        ];

        for (const regex of componentSections) {
            const match = content.match(regex);
            if (match) {
                const componentText = match[1];
                // Parse component hierarchy
                const lines = componentText.split('\n');
                for (const line of lines) {
                    const componentMatch = line.match(/[├└│]?[─\s]*(.+?)\s*\[?AI[:\s]*[~]?(\d+)/i);
                    if (componentMatch) {
                        assembly.components.push({
                            name: componentMatch[1].trim(),
                            ai: parseInt(componentMatch[2]),
                            type: 'component'
                        });
                    }
                }
                break;
            }
        }

        // Also look for bullet point components
        const bulletComponents = content.match(/(?:Components|Parts|Elements)[:\n]+((?:\s*[-*]\s*.+\n?)+)/i);
        if (bulletComponents) {
            const lines = bulletComponents[1].split('\n');
            for (const line of lines) {
                if (line.trim().startsWith('-') || line.trim().startsWith('*')) {
                    const compName = line.replace(/^[\s\-*]+/, '').trim();
                    if (compName && !assembly.components.find(c => c.name === compName)) {
                        assembly.components.push({
                            name: compName,
                            type: 'component'
                        });
                    }
                }
            }
        }
    }

    extractProperties(content, assembly) {
        // Extract physical properties tables and lists
        const propertyPatterns = [
            /Physical Properties[\s\S]*?(?=#{2,}|$)/i,
            /Properties[\s\S]*?(?=#{2,}|$)/i,
            /Characteristics[\s\S]*?(?=#{2,}|$)/i
        ];

        for (const regex of propertyPatterns) {
            const match = content.match(regex);
            if (match) {
                const propText = match[0];
                
                // Extract property values
                const propLines = propText.split('\n');
                for (const line of propLines) {
                    const propMatch = line.match(/[-*]?\s*\*\*([^*]+)\*\*[:\s]*(.+)/);
                    if (propMatch) {
                        const key = propMatch[1].toLowerCase().replace(/\s+/g, '_');
                        assembly.properties[key] = propMatch[2].trim();
                    }
                }
                break;
            }
        }
    }

    extractCrossReferences(content, assembly) {
        // Extract markdown links to other assembly files
        const linkRegex = /\[([^\]]+)\]\(([^)]+\.md)\)/g;
        let match;
        
        while ((match = linkRegex.exec(content)) !== null) {
            assembly.cross_references.push({
                title: match[1],
                path: match[2],
                type: 'internal_link'
            });
        }

        // Also look for structured cross-reference sections
        const crossRefSection = content.match(/(?:Cross-References|Related Assemblies)[\s\S]*?(?=#{2,}|$)/i);
        if (crossRefSection) {
            const refText = crossRefSection[0];
            const refLinks = refText.match(/\[([^\]]+)\]\(([^)]+)\)/g);
            if (refLinks) {
                for (const link of refLinks) {
                    const linkMatch = link.match(/\[([^\]]+)\]\(([^)]+)\)/);
                    if (linkMatch && !assembly.cross_references.find(ref => ref.path === linkMatch[2])) {
                        assembly.cross_references.push({
                            title: linkMatch[1],
                            path: linkMatch[2],
                            type: 'cross_reference'
                        });
                    }
                }
            }
        }
    }

    extractApplications(content, assembly) {
        // Extract applications and uses
        const appPatterns = [
            /Applications[\s\S]*?(?=#{2,}|$)/i,
            /Uses[\s\S]*?(?=#{2,}|$)/i,
            /Industrial Applications[\s\S]*?(?=#{2,}|$)/i,
            /Technological Applications[\s\S]*?(?=#{2,}|$)/i
        ];

        for (const regex of appPatterns) {
            const match = content.match(regex);
            if (match) {
                const appText = match[0];
                const appLines = appText.split('\n');
                
                for (const line of appLines) {
                    if (line.trim().startsWith('-') || line.trim().startsWith('*')) {
                        const app = line.replace(/^[\s\-*]+/, '').trim();
                        if (app && app.length > 3) {
                            assembly.applications.push(app);
                        }
                    }
                }
                break;
            }
        }
    }

    extractDomainFromPath(filePath) {
        if (filePath.includes('/cosmic/')) return 'cosmic';
        if (filePath.includes('/geological/')) return 'geological';
        if (filePath.includes('/biological/')) return 'biological';
        if (filePath.includes('/cognitive/')) return 'cognitive';
        if (filePath.includes('/technological/')) return 'technological';
        return 'hybrid';
    }

    extractSubdomainFromPath(filePath) {
        const pathParts = filePath.split('/');
        const domainIndex = pathParts.findIndex(part => 
            ['cosmic', 'geological', 'biological', 'cognitive', 'technological'].includes(part)
        );
        
        if (domainIndex >= 0 && domainIndex < pathParts.length - 2) {
            return pathParts[domainIndex + 1];
        }
        
        return 'general';
    }

    // Normalize parsed data to match existing data format
    normalizeAssemblyNode(parsedData) {
        const ai = parsedData.assembly_index || 100; // Default AI if not found
        const tier = this.getAssemblyTier(ai);
        
        return {
            id: this.generateId(parsedData.name, parsedData.file_path),
            name: parsedData.name,
            assembly_index: ai,
            domain: parsedData.domain,
            subdomain: parsedData.subdomain,
            tier: tier.tier,
            visual_complexity: tier.symbol,
            color: parsedData.color,
            radius: this.getNodeRadius(tier.tier),
            time_origin: parsedData.first_appearance || '',
            description: parsedData.description || '',
            copy_number: this.estimateCopyNumber(ai, parsedData.domain),
            github_url: this.generateGitHubUrl(parsedData.file_path),
            
            // Enhanced properties from markdown
            chemical_formula: parsedData.chemical_formula,
            function: parsedData.function,
            components: parsedData.components,
            properties: parsedData.properties,
            cross_references: parsedData.cross_references,
            applications: parsedData.applications,
            formation_processes: parsedData.formation_processes,
            
            // Metadata
            source_type: 'markdown',
            file_path: parsedData.file_path,
            raw_data: parsedData
        };
    }

    generateId(name, filePath) {
        // Generate a unique ID from name and file path
        const baseName = name.toLowerCase()
            .replace(/[^a-z0-9\s]/g, '')
            .replace(/\s+/g, '_')
            .replace(/_+/g, '_')
            .replace(/^_|_$/g, '');
            
        // Add suffix from file path to ensure uniqueness
        const pathParts = filePath.split('/');
        const fileName = pathParts[pathParts.length - 1].replace('.md', '');
        
        return baseName === fileName ? baseName : `${baseName}_${fileName}`;
    }

    generateGitHubUrl(filePath) {
        // Fix GitHub URL generation to use actual file paths
        const baseUrl = 'https://github.com/owocki/assembly_theory/tree/master';
        
        // Extract the relative path from the full path
        const relativePath = filePath.includes('/domains/') 
            ? filePath.substring(filePath.indexOf('/domains/'))
            : filePath;
            
        return `${baseUrl}${relativePath}`;
    }

    getAssemblyTier(assemblyIndex) {
        const tiers = [
            { min: 0, max: 10, tier: 1, symbol: '•' },
            { min: 10, max: 100, tier: 2, symbol: '••' },
            { min: 100, max: 1000, tier: 3, symbol: '•••' },
            { min: 1000, max: 10000, tier: 4, symbol: '••••' },
            { min: 10000, max: 100000, tier: 5, symbol: '•••••' },
            { min: 100000, max: 1000000, tier: 6, symbol: '••••••' },
            { min: 1000000, max: 1000000000, tier: 7, symbol: '•••••••' },
            { min: 1000000000, max: Infinity, tier: 8, symbol: '••••••••' }
        ];
        
        return tiers.find(tier => 
            assemblyIndex >= tier.min && assemblyIndex < tier.max
        ) || tiers[0];
    }

    getNodeRadius(tier) {
        return 3 + (tier * 2);
    }

    estimateCopyNumber(assemblyIndex, domain) {
        const baseCopies = {
            cosmic: 1e20,
            geological: 1e15,
            biological: 1e10,
            cognitive: 1e6,
            technological: 1e3,
            hybrid: 1e2
        };
        
        const base = baseCopies[domain] || 1e6;
        return Math.max(1, Math.floor(base / Math.pow(assemblyIndex, 0.5)));
    }
}