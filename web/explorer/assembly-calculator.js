class AssemblyCalculator {
    constructor() {
        this.bondCosts = {
            'C-C': 1, 'C-H': 1, 'C-O': 1, 'C-N': 1, 'C-S': 1,
            'C=C': 2, 'C=O': 2, 'C=N': 2, 'C=S': 2,
            'C#C': 3, 'C#N': 3,
            'N-H': 1, 'N-N': 1, 'N-O': 1,
            'O-H': 1, 'O-O': 1,
            'S-H': 1, 'S-S': 1,
            'P-O': 1, 'P=O': 2
        };
        
        this.atomicComplexity = {
            'H': 1, 'He': 2, 'Li': 3, 'Be': 4, 'B': 5, 'C': 6,
            'N': 7, 'O': 8, 'F': 9, 'Ne': 10, 'Na': 11, 'Mg': 12,
            'Al': 13, 'Si': 14, 'P': 15, 'S': 16, 'Cl': 17, 'Ar': 18,
            'K': 19, 'Ca': 20, 'Fe': 26, 'Cu': 29, 'Zn': 30, 'Br': 35, 'I': 53
        };
        
        this.ringPenalties = {
            3: 5,  // Highly strained
            4: 3,  // Strained
            5: 1,  // Some strain
            6: 0,  // No strain (benzene, cyclohexane)
            7: 1,  // Some strain
            8: 2   // Medium strain
        };
        
        this.scalingLaws = {
            hierarchical: {
                alpha: 1.2,  // Hierarchical scaling exponent
                beta: 0.8,   // Component scaling exponent
                gamma: 1.0   // Integration complexity
            },
            temporal: {
                biological: 0.1,     // Slow biological evolution
                technological: 0.5,  // Rapid technological evolution
                social: 0.3         // Medium social evolution
            },
            group: {
                baseMultiplier: 1.5,     // Group complexity multiplier
                logScaling: 0.7,         // Logarithmic scaling factor
                coordinationCost: 0.2    // Communication overhead
            }
        };
    }
    
    // Calculate basic Assembly Index for molecular structures
    calculateMolecularAI(molecule) {
        if (!molecule || typeof molecule !== 'object') {
            return { ai: 0, breakdown: { error: 'Invalid molecule structure' } };
        }
        
        let totalAI = 0;
        let breakdown = {
            atoms: 0,
            bonds: 0,
            rings: 0,
            functional_groups: 0,
            stereochemistry: 0
        };
        
        // Atomic contributions
        if (molecule.atoms) {
            molecule.atoms.forEach(atom => {
                const atomAI = this.atomicComplexity[atom.element] || 6;
                totalAI += atomAI;
                breakdown.atoms += atomAI;
            });
        }
        
        // Bond contributions
        if (molecule.bonds) {
            molecule.bonds.forEach(bond => {
                const bondKey = `${bond.atom1}-${bond.atom2}`;
                const bondAI = this.bondCosts[bondKey] || 1;
                totalAI += bondAI;
                breakdown.bonds += bondAI;
            });
        }
        
        // Ring strain penalties
        if (molecule.rings) {
            molecule.rings.forEach(ring => {
                const ringSize = ring.size || 6;
                const penalty = this.ringPenalties[ringSize] || 2;
                totalAI += penalty;
                breakdown.rings += penalty;
            });
        }
        
        // Functional group complexity
        if (molecule.functional_groups) {
            molecule.functional_groups.forEach(group => {
                const groupAI = this.getFunctionalGroupComplexity(group);
                totalAI += groupAI;
                breakdown.functional_groups += groupAI;
            });
        }
        
        // Stereochemistry complexity
        if (molecule.stereo_centers) {
            const stereoAI = molecule.stereo_centers * 2;
            totalAI += stereoAI;
            breakdown.stereochemistry = stereoAI;
        }
        
        return {
            ai: Math.round(totalAI),
            breakdown: breakdown,
            normalized_ai: totalAI / Math.log2(Object.keys(this.atomicComplexity).length),
            assembly_efficiency: this.calculateAssemblyEfficiency(totalAI, molecule)
        };
    }
    
    // Calculate hierarchical Assembly Index
    calculateHierarchicalAI(assembly, level = 0) {
        if (!assembly || !assembly.components) {
            return { ai: assembly.base_ai || 0, levels: [] };
        }
        
        let totalAI = assembly.base_ai || 0;
        const levels = [{ level: 0, ai: totalAI, type: 'base' }];
        
        // Calculate component contributions
        if (assembly.components) {
            let componentAI = 0;
            assembly.components.forEach(component => {
                if (typeof component.ai === 'number') {
                    componentAI += component.ai;
                } else if (component.components) {
                    // Recursive calculation for nested assemblies
                    const subAssembly = this.calculateHierarchicalAI(component, level + 1);
                    componentAI += subAssembly.ai;
                    levels.push(...subAssembly.levels.map(l => ({ ...l, level: l.level + 1 })));
                }
            });
            
            // Apply hierarchical scaling
            const scaledComponentAI = componentAI * Math.pow(level + 1, this.scalingLaws.hierarchical.alpha);
            totalAI += scaledComponentAI;
            levels.push({ level: level, ai: scaledComponentAI, type: 'components' });
        }
        
        // Integration complexity
        if (assembly.interactions || assembly.emergent_properties) {
            const integrationAI = this.calculateIntegrationComplexity(assembly);
            totalAI += integrationAI;
            levels.push({ level: level, ai: integrationAI, type: 'integration' });
        }
        
        return {
            ai: Math.round(totalAI),
            levels: levels,
            hierarchical_depth: level,
            assembly_efficiency: this.calculateAssemblyEfficiency(totalAI, assembly)
        };
    }
    
    // Calculate social/group Assembly Index
    calculateGroupAI(group) {
        if (!group || !group.individuals) {
            return { ai: 0, breakdown: { error: 'Invalid group structure' } };
        }
        
        const groupSize = group.individuals.length || group.size || 0;
        const individualAI = group.individual_ai || 100000; // Default human-level
        
        let totalAI = 0;
        let breakdown = {
            individual_sum: 0,
            coordination_cost: 0,
            communication_network: 0,
            emergent_properties: 0,
            scaling_factor: 1
        };
        
        // Base individual contributions
        breakdown.individual_sum = individualAI * groupSize;
        totalAI += breakdown.individual_sum;
        
        // Logarithmic scaling for group coordination
        if (groupSize > 1) {
            const coordinationComplexity = Math.log10(groupSize) * this.scalingLaws.group.logScaling;
            breakdown.coordination_cost = coordinationComplexity * individualAI * this.scalingLaws.group.coordinationCost;
            totalAI += breakdown.coordination_cost;
        }
        
        // Communication network complexity (scales with N²)
        if (groupSize > 2) {
            const networkComplexity = (groupSize * (groupSize - 1)) / 2;
            breakdown.communication_network = Math.log10(networkComplexity) * 1000;
            totalAI += breakdown.communication_network;
        }
        
        // Emergent properties
        if (group.collective_behaviors) {
            group.collective_behaviors.forEach(behavior => {
                const behaviorAI = this.getCollectiveBehaviorComplexity(behavior, groupSize);
                breakdown.emergent_properties += behaviorAI;
                totalAI += behaviorAI;
            });
        }
        
        // Apply scaling factor for group type
        if (group.group_type) {
            breakdown.scaling_factor = this.getGroupTypeMultiplier(group.group_type);
            totalAI *= breakdown.scaling_factor;
        }
        
        return {
            ai: Math.round(totalAI),
            breakdown: breakdown,
            per_individual_ai: Math.round(totalAI / groupSize),
            emergence_factor: Math.round(totalAI / breakdown.individual_sum * 100) / 100
        };
    }
    
    // Calculate technological Assembly Index
    calculateTechnologicalAI(technology) {
        if (!technology) {
            return { ai: 0, breakdown: { error: 'Invalid technology structure' } };
        }
        
        let totalAI = 0;
        let breakdown = {
            materials: 0,
            components: 0,
            manufacturing: 0,
            design_complexity: 0,
            software: 0,
            integration: 0
        };
        
        // Material complexity
        if (technology.materials) {
            technology.materials.forEach(material => {
                const materialAI = material.ai || this.estimateMaterialComplexity(material);
                breakdown.materials += materialAI;
                totalAI += materialAI;
            });
        }
        
        // Component complexity
        if (technology.components) {
            technology.components.forEach(component => {
                const componentAI = component.ai || this.estimateComponentComplexity(component);
                breakdown.components += componentAI;
                totalAI += componentAI;
            });
        }
        
        // Manufacturing process complexity
        if (technology.manufacturing_steps) {
            const manufacturingAI = technology.manufacturing_steps * 1000;
            breakdown.manufacturing = manufacturingAI;
            totalAI += manufacturingAI;
        }
        
        // Design complexity
        if (technology.design_specifications) {
            const designAI = Object.keys(technology.design_specifications).length * 500;
            breakdown.design_complexity = designAI;
            totalAI += designAI;
        }
        
        // Software complexity
        if (technology.software) {
            const softwareAI = this.calculateSoftwareComplexity(technology.software);
            breakdown.software = softwareAI;
            totalAI += softwareAI;
        }
        
        // System integration complexity
        const componentCount = (technology.components || []).length;
        if (componentCount > 1) {
            const integrationAI = Math.pow(componentCount, 1.5) * 100;
            breakdown.integration = integrationAI;
            totalAI += integrationAI;
        }
        
        return {
            ai: Math.round(totalAI),
            breakdown: breakdown,
            complexity_per_component: Math.round(totalAI / Math.max(componentCount, 1)),
            technology_readiness_level: this.estimateTRL(totalAI)
        };
    }
    
    // Calculate temporal Assembly Index evolution
    calculateTemporalAI(initialAI, timeElapsed, domain = 'biological') {
        const growthRate = this.scalingLaws.temporal[domain] || 0.1;
        const finalAI = initialAI * Math.exp(growthRate * timeElapsed);
        
        return {
            initial_ai: initialAI,
            final_ai: Math.round(finalAI),
            growth_factor: Math.round(finalAI / initialAI * 100) / 100,
            time_elapsed: timeElapsed,
            domain: domain,
            annual_growth_rate: Math.round((Math.pow(finalAI / initialAI, 1 / timeElapsed) - 1) * 100 * 100) / 100
        };
    }
    
    // Helper methods
    getFunctionalGroupComplexity(group) {
        const complexities = {
            'alcohol': 2, 'aldehyde': 3, 'ketone': 3, 'carboxylic_acid': 4,
            'ester': 4, 'amine': 3, 'amide': 5, 'ether': 2,
            'phenol': 6, 'aromatic': 5, 'halogen': 2, 'nitro': 4,
            'phosphate': 6, 'sulfate': 5, 'thiol': 3
        };
        return complexities[group.type] || 3;
    }
    
    calculateAssemblyEfficiency(actualAI, assembly) {
        // Theoretical minimum based on component count
        const componentCount = (assembly.components || []).length || 1;
        const theoreticalMinimum = Math.log2(componentCount + 1) * 10;
        return Math.round(theoreticalMinimum / Math.max(actualAI, 1) * 100) / 100;
    }
    
    calculateIntegrationComplexity(assembly) {
        let complexity = 0;
        
        if (assembly.interactions) {
            complexity += assembly.interactions.length * 10;
        }
        
        if (assembly.emergent_properties) {
            complexity += assembly.emergent_properties.length * 50;
        }
        
        if (assembly.feedback_loops) {
            complexity += assembly.feedback_loops * 25;
        }
        
        return complexity;
    }
    
    getCollectiveBehaviorComplexity(behavior, groupSize) {
        const baseBehaviorComplexity = {
            'flocking': 1000,
            'swarming': 1500,
            'collective_decision_making': 2000,
            'division_of_labor': 2500,
            'communication_network': 1200,
            'consensus_formation': 1800,
            'emergent_leadership': 1600
        };
        
        const baseComplexity = baseBehaviorComplexity[behavior.type] || 1000;
        return baseComplexity * Math.log10(groupSize);
    }
    
    getGroupTypeMultiplier(groupType) {
        const multipliers = {
            'family': 1.0,
            'tribe': 1.2,
            'village': 1.5,
            'city': 2.0,
            'nation': 3.0,
            'corporation': 2.5,
            'research_group': 1.8,
            'military_unit': 2.2,
            'religious_organization': 1.6,
            'online_community': 1.3
        };
        return multipliers[groupType] || 1.0;
    }
    
    estimateMaterialComplexity(material) {
        const materialComplexities = {
            'steel': 10000, 'aluminum': 8000, 'titanium': 15000, 'carbon_fiber': 25000,
            'silicon': 5000, 'germanium': 12000, 'gallium_arsenide': 20000,
            'polymer': 8000, 'ceramic': 12000, 'composite': 18000,
            'superconductor': 50000, 'metamaterial': 100000, 'graphene': 30000
        };
        return materialComplexities[material.type] || 5000;
    }
    
    estimateComponentComplexity(component) {
        const componentComplexities = {
            'screw': 100, 'gear': 500, 'bearing': 800, 'spring': 300,
            'circuit_board': 10000, 'microprocessor': 1000000, 'sensor': 5000,
            'motor': 15000, 'battery': 8000, 'display': 25000,
            'antenna': 2000, 'lens': 3000, 'membrane': 1500
        };
        return componentComplexities[component.type] || 1000;
    }
    
    calculateSoftwareComplexity(software) {
        let complexity = 0;
        
        if (software.lines_of_code) {
            complexity += software.lines_of_code * 0.1;
        }
        
        if (software.functions) {
            complexity += software.functions * 10;
        }
        
        if (software.classes) {
            complexity += software.classes * 50;
        }
        
        if (software.databases) {
            complexity += software.databases * 1000;
        }
        
        if (software.ai_components) {
            complexity += software.ai_components * 10000;
        }
        
        return complexity;
    }
    
    estimateTRL(totalAI) {
        // Technology Readiness Level based on complexity
        if (totalAI < 1000) return 1;        // Basic principles
        if (totalAI < 10000) return 2;       // Technology concept
        if (totalAI < 100000) return 3;      // Experimental proof
        if (totalAI < 1000000) return 4;     // Lab validation
        if (totalAI < 10000000) return 5;    // Relevant environment
        if (totalAI < 100000000) return 6;   // Demonstration
        if (totalAI < 1000000000) return 7;  // Prototype
        if (totalAI < 10000000000) return 8; // System complete
        return 9; // System proven
    }
    
    // Public API methods for web app integration
    calculateAI(object, type = 'auto') {
        if (type === 'auto') {
            type = this.detectAssemblyType(object);
        }
        
        switch (type) {
            case 'molecular':
                return this.calculateMolecularAI(object);
            case 'hierarchical':
                return this.calculateHierarchicalAI(object);
            case 'group':
                return this.calculateGroupAI(object);
            case 'technological':
                return this.calculateTechnologicalAI(object);
            default:
                return { ai: object.ai || 0, type: 'unknown' };
        }
    }
    
    detectAssemblyType(object) {
        if (object.atoms || object.bonds || object.molecular_formula) return 'molecular';
        if (object.components && object.components.length > 0) return 'hierarchical';
        if (object.individuals || object.group_size) return 'group';
        if (object.materials || object.manufacturing_steps) return 'technological';
        return 'basic';
    }
}