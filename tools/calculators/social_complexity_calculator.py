#!/usr/bin/env python3
"""
Social Complexity Calculator

This tool calculates assembly indices for social behavior systems based on
various complexity metrics including group size, communication modalities,
social structure, and collective behaviors.

Usage:
    python social_complexity_calculator.py --help
    python social_complexity_calculator.py --species wolf --pack-size 8 --territory-size 500
    python social_complexity_calculator.py --species ant --colony-size 50000 --castes 4
    python social_complexity_calculator.py --species dolphin --pod-size 12 --alliance-levels 2
"""

import argparse
import math
import json
from typing import Dict, List, Tuple, Optional

class SocialComplexityCalculator:
    """Calculate assembly indices for social behavior systems."""
    
    def __init__(self):
        """Initialize the calculator with social complexity parameters."""
        self.base_individual_ai = 100000  # Base AI for individual animal
        
        # Social complexity factors
        self.group_size_factors = {
            'pair': 1.5,
            'small_group': 2.0,     # 3-10 individuals
            'medium_group': 3.0,    # 11-50 individuals
            'large_group': 4.0,     # 51-200 individuals
            'mega_group': 5.0,      # 200+ individuals
        }
        
        self.communication_factors = {
            'basic': 1.2,           # Simple signals
            'multi_modal': 1.8,     # Multiple signal types
            'symbolic': 3.0,        # Symbolic communication
            'linguistic': 5.0,      # Language-like systems
            'cultural': 8.0,        # Cultural transmission
        }
        
        self.social_structure_factors = {
            'loose': 1.1,           # Temporary associations
            'stable': 1.5,          # Stable groups
            'hierarchical': 2.0,    # Dominance hierarchies
            'multi_level': 3.0,     # Nested social levels
            'institutional': 4.0,   # Complex institutions
        }
        
        self.cooperation_factors = {
            'minimal': 1.0,         # Little cooperation
            'foraging': 1.3,        # Cooperative foraging
            'hunting': 1.8,         # Cooperative hunting
            'care': 2.0,            # Cooperative care
            'construction': 2.5,    # Collective construction
            'defense': 2.2,         # Collective defense
            'eusocial': 4.0,        # Eusocial cooperation
        }
        
        # Species-specific templates
        self.species_templates = {
            'wolf': {
                'base_ai': 2000000,
                'group_size_category': 'small_group',
                'communication': 'multi_modal',
                'social_structure': 'hierarchical',
                'cooperation': 'hunting',
                'special_factors': ['territorial', 'pack_hunting', 'alloparental_care']
            },
            'dolphin': {
                'base_ai': 50000000,
                'group_size_category': 'medium_group',
                'communication': 'symbolic',
                'social_structure': 'multi_level',
                'cooperation': 'hunting',
                'special_factors': ['alliance_networks', 'cultural_transmission', 'tool_use']
            },
            'ant': {
                'base_ai': 100000,
                'group_size_category': 'mega_group',
                'communication': 'multi_modal',
                'social_structure': 'institutional',
                'cooperation': 'eusocial',
                'special_factors': ['caste_system', 'superorganism', 'collective_intelligence']
            },
            'chimpanzee': {
                'base_ai': 100000000,
                'group_size_category': 'medium_group',
                'communication': 'symbolic',
                'social_structure': 'multi_level',
                'cooperation': 'hunting',
                'special_factors': ['tool_use', 'cultural_transmission', 'coalition_warfare']
            },
            'honeybee': {
                'base_ai': 500000,
                'group_size_category': 'mega_group',
                'communication': 'symbolic',
                'social_structure': 'institutional',
                'cooperation': 'eusocial',
                'special_factors': ['waggle_dance', 'superorganism', 'democratic_decisions']
            },
            'elephant': {
                'base_ai': 200000000,
                'group_size_category': 'small_group',
                'communication': 'multi_modal',
                'social_structure': 'hierarchical',
                'cooperation': 'care',
                'special_factors': ['long_term_memory', 'cultural_transmission', 'empathy']
            },
            'human': {
                'base_ai': 1000000000,
                'group_size_category': 'large_group',
                'communication': 'linguistic',
                'social_structure': 'institutional',
                'cooperation': 'construction',
                'special_factors': ['language', 'cumulative_culture', 'institutions']
            }
        }
    
    def calculate_group_size_ai(self, group_size: int) -> float:
        """Calculate AI contribution from group size."""
        if group_size <= 2:
            category = 'pair'
        elif group_size <= 10:
            category = 'small_group'
        elif group_size <= 50:
            category = 'medium_group'
        elif group_size <= 200:
            category = 'large_group'
        else:
            category = 'mega_group'
        
        base_factor = self.group_size_factors[category]
        
        # Add logarithmic scaling for very large groups
        if group_size > 100:
            scale_factor = 1 + math.log10(group_size / 100)
            return base_factor * scale_factor
        
        return base_factor
    
    def calculate_communication_ai(self, modalities: List[str], 
                                 has_symbolic: bool = False,
                                 has_cultural: bool = False) -> float:
        """Calculate AI contribution from communication complexity."""
        base_factor = 1.0
        
        # Multiple modalities increase complexity
        if len(modalities) > 1:
            base_factor = self.communication_factors['multi_modal']
        elif len(modalities) == 1:
            base_factor = self.communication_factors['basic']
        
        # Symbolic communication
        if has_symbolic:
            base_factor *= self.communication_factors['symbolic'] / self.communication_factors['multi_modal']
        
        # Cultural transmission
        if has_cultural:
            base_factor *= self.communication_factors['cultural'] / self.communication_factors['symbolic']
        
        return base_factor
    
    def calculate_social_structure_ai(self, structure_type: str, 
                                    hierarchy_levels: int = 1) -> float:
        """Calculate AI contribution from social structure complexity."""
        base_factor = self.social_structure_factors.get(structure_type, 1.0)
        
        # Additional complexity for multiple hierarchy levels
        if hierarchy_levels > 1:
            base_factor *= (1 + 0.3 * (hierarchy_levels - 1))
        
        return base_factor
    
    def calculate_cooperation_ai(self, cooperation_types: List[str]) -> float:
        """Calculate AI contribution from cooperation complexity."""
        if not cooperation_types:
            return self.cooperation_factors['minimal']
        
        # Take the maximum cooperation factor
        max_factor = max(self.cooperation_factors.get(ctype, 1.0) for ctype in cooperation_types)
        
        # Add bonuses for multiple cooperation types
        if len(cooperation_types) > 1:
            max_factor *= (1 + 0.2 * (len(cooperation_types) - 1))
        
        return max_factor
    
    def calculate_special_factors_ai(self, special_factors: List[str]) -> float:
        """Calculate AI contribution from special factors."""
        factor_multipliers = {
            'territorial': 1.2,
            'pack_hunting': 1.5,
            'alloparental_care': 1.3,
            'alliance_networks': 2.0,
            'cultural_transmission': 2.5,
            'tool_use': 1.8,
            'caste_system': 3.0,
            'superorganism': 4.0,
            'collective_intelligence': 3.5,
            'waggle_dance': 2.0,
            'democratic_decisions': 2.2,
            'long_term_memory': 1.8,
            'empathy': 1.5,
            'language': 5.0,
            'cumulative_culture': 4.0,
            'institutions': 3.0,
            'coalition_warfare': 2.0,
        }
        
        total_factor = 1.0
        for factor in special_factors:
            multiplier = factor_multipliers.get(factor, 1.0)
            total_factor *= multiplier ** 0.5  # Diminishing returns
        
        return total_factor
    
    def calculate_social_assembly_index(self, 
                                      species: Optional[str] = None,
                                      group_size: int = 1,
                                      communication_modalities: List[str] = None,
                                      has_symbolic_communication: bool = False,
                                      has_cultural_transmission: bool = False,
                                      social_structure: str = 'loose',
                                      hierarchy_levels: int = 1,
                                      cooperation_types: List[str] = None,
                                      special_factors: List[str] = None,
                                      base_individual_ai: Optional[int] = None) -> Dict:
        """Calculate the total social assembly index."""
        
        # Use species template if provided
        if species and species.lower() in self.species_templates:
            template = self.species_templates[species.lower()]
            if base_individual_ai is None:
                base_individual_ai = template['base_ai']
            if communication_modalities is None:
                communication_modalities = [template['communication']]
            if social_structure == 'loose':
                social_structure = template['social_structure']
            if cooperation_types is None:
                cooperation_types = [template['cooperation']]
            if special_factors is None:
                special_factors = template.get('special_factors', [])
        
        # Set defaults
        if base_individual_ai is None:
            base_individual_ai = self.base_individual_ai
        if communication_modalities is None:
            communication_modalities = ['basic']
        if cooperation_types is None:
            cooperation_types = ['minimal']
        if special_factors is None:
            special_factors = []
        
        # Calculate component AIs
        group_ai = self.calculate_group_size_ai(group_size)
        comm_ai = self.calculate_communication_ai(
            communication_modalities, has_symbolic_communication, has_cultural_transmission
        )
        structure_ai = self.calculate_social_structure_ai(social_structure, hierarchy_levels)
        coop_ai = self.calculate_cooperation_ai(cooperation_types)
        special_ai = self.calculate_special_factors_ai(special_factors)
        
        # Calculate total assembly index
        total_ai = base_individual_ai * group_ai * comm_ai * structure_ai * coop_ai * special_ai
        
        # Return detailed breakdown
        return {
            'total_assembly_index': int(total_ai),
            'base_individual_ai': base_individual_ai,
            'group_size': group_size,
            'factors': {
                'group_size_factor': round(group_ai, 2),
                'communication_factor': round(comm_ai, 2),
                'social_structure_factor': round(structure_ai, 2),
                'cooperation_factor': round(coop_ai, 2),
                'special_factors': round(special_ai, 2),
            },
            'components': {
                'individual_base': base_individual_ai,
                'group_contribution': int(base_individual_ai * (group_ai - 1)),
                'communication_contribution': int(base_individual_ai * group_ai * (comm_ai - 1)),
                'structure_contribution': int(base_individual_ai * group_ai * comm_ai * (structure_ai - 1)),
                'cooperation_contribution': int(base_individual_ai * group_ai * comm_ai * structure_ai * (coop_ai - 1)),
                'special_contribution': int(base_individual_ai * group_ai * comm_ai * structure_ai * coop_ai * (special_ai - 1)),
            },
            'complexity_classification': self.classify_complexity(total_ai),
            'parameters': {
                'species': species,
                'group_size': group_size,
                'communication_modalities': communication_modalities,
                'has_symbolic_communication': has_symbolic_communication,
                'has_cultural_transmission': has_cultural_transmission,
                'social_structure': social_structure,
                'hierarchy_levels': hierarchy_levels,
                'cooperation_types': cooperation_types,
                'special_factors': special_factors,
            }
        }
    
    def classify_complexity(self, assembly_index: float) -> str:
        """Classify the complexity level based on assembly index."""
        if assembly_index < 1000000:
            return "Simple social behavior"
        elif assembly_index < 10000000:
            return "Basic social organization"
        elif assembly_index < 50000000:
            return "Complex social structure"
        elif assembly_index < 200000000:
            return "Advanced social intelligence"
        elif assembly_index < 1000000000:
            return "Sophisticated social systems"
        else:
            return "Highly complex social assemblies"
    
    def compare_species(self, species_list: List[str]) -> Dict:
        """Compare social complexity across multiple species."""
        results = {}
        for species in species_list:
            if species.lower() in self.species_templates:
                results[species] = self.calculate_social_assembly_index(species=species)
            else:
                results[species] = {"error": f"Species '{species}' not found in templates"}
        
        # Sort by assembly index
        valid_results = {k: v for k, v in results.items() if 'error' not in v}
        if valid_results:
            sorted_species = sorted(valid_results.items(), 
                                  key=lambda x: x[1]['total_assembly_index'], 
                                  reverse=True)
            results['ranking'] = [species for species, _ in sorted_species]
        
        return results
    
    def batch_calculate(self, scenarios: List[Dict]) -> List[Dict]:
        """Calculate assembly indices for multiple scenarios."""
        results = []
        for i, scenario in enumerate(scenarios):
            try:
                result = self.calculate_social_assembly_index(**scenario)
                result['scenario_id'] = i
                results.append(result)
            except Exception as e:
                results.append({
                    'scenario_id': i,
                    'error': str(e),
                    'parameters': scenario
                })
        return results

def main():
    """Command-line interface for the social complexity calculator."""
    parser = argparse.ArgumentParser(
        description="Calculate social behavior assembly indices",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Calculate for a wolf pack
  python social_complexity_calculator.py --species wolf --group-size 8
  
  # Calculate for an ant colony
  python social_complexity_calculator.py --species ant --group-size 50000
  
  # Compare multiple species
  python social_complexity_calculator.py --compare wolf ant dolphin human
  
  # Custom calculation
  python social_complexity_calculator.py --group-size 20 --communication multi_modal symbolic --cooperation hunting care
        """
    )
    
    parser.add_argument('--species', type=str, 
                       help='Species to calculate (wolf, dolphin, ant, chimpanzee, honeybee, elephant, human)')
    parser.add_argument('--group-size', type=int, default=1,
                       help='Number of individuals in the group')
    parser.add_argument('--communication', nargs='+', 
                       choices=['basic', 'multi_modal', 'symbolic', 'linguistic', 'cultural'],
                       help='Communication modalities')
    parser.add_argument('--symbolic', action='store_true',
                       help='Has symbolic communication')
    parser.add_argument('--cultural', action='store_true',
                       help='Has cultural transmission')
    parser.add_argument('--social-structure', 
                       choices=['loose', 'stable', 'hierarchical', 'multi_level', 'institutional'],
                       default='loose',
                       help='Type of social structure')
    parser.add_argument('--hierarchy-levels', type=int, default=1,
                       help='Number of hierarchy levels')
    parser.add_argument('--cooperation', nargs='+',
                       choices=['minimal', 'foraging', 'hunting', 'care', 'construction', 'defense', 'eusocial'],
                       help='Types of cooperation')
    parser.add_argument('--special-factors', nargs='+',
                       help='Special behavioral factors')
    parser.add_argument('--base-ai', type=int,
                       help='Base individual assembly index')
    parser.add_argument('--compare', nargs='+',
                       help='Compare multiple species')
    parser.add_argument('--output', type=str,
                       help='Output file for results (JSON format)')
    parser.add_argument('--verbose', '-v', action='store_true',
                       help='Verbose output with detailed breakdown')
    
    args = parser.parse_args()
    
    calculator = SocialComplexityCalculator()
    
    # Handle comparison mode
    if args.compare:
        results = calculator.compare_species(args.compare)
        
        if args.verbose:
            print(json.dumps(results, indent=2))
        else:
            print(f"{'Species':<15} {'Assembly Index':<15} {'Classification'}")
            print("-" * 50)
            for species in results.get('ranking', []):
                data = results[species]
                print(f"{species:<15} {data['total_assembly_index']:<15,} {data['complexity_classification']}")
    
    # Handle single calculation
    else:
        result = calculator.calculate_social_assembly_index(
            species=args.species,
            group_size=args.group_size,
            communication_modalities=args.communication,
            has_symbolic_communication=args.symbolic,
            has_cultural_transmission=args.cultural,
            social_structure=args.social_structure,
            hierarchy_levels=args.hierarchy_levels,
            cooperation_types=args.cooperation,
            special_factors=args.special_factors,
            base_individual_ai=args.base_ai
        )
        
        if args.verbose:
            print(json.dumps(result, indent=2))
        else:
            print(f"Social Assembly Index: {result['total_assembly_index']:,}")
            print(f"Classification: {result['complexity_classification']}")
            print(f"Base Individual AI: {result['base_individual_ai']:,}")
            print(f"Group Size: {result['group_size']}")
            if result.get('parameters', {}).get('species'):
                print(f"Species: {result['parameters']['species']}")
    
    # Save output if requested
    if args.output:
        with open(args.output, 'w') as f:
            if args.compare:
                json.dump(results, f, indent=2)
            else:
                json.dump(result, f, indent=2)
        print(f"Results saved to {args.output}")

if __name__ == "__main__":
    main()