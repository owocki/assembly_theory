#!/usr/bin/env python3
"""
Assembly Index Calculator

This module provides tools for calculating Assembly Index (AI) values according to 
Assembly Theory principles. The Assembly Index represents the minimum number of 
operations required to construct an object from its most abundant parts.

Assembly Theory was developed by Sara Walker, Lee Cronin, and collaborators as a 
framework for understanding complexity across physical, biological, and technological domains.

Author: Assembly Theory Research Group
Version: 1.0.0
Date: 2025-07-28
"""

import re
import math
from collections import Counter, defaultdict
from typing import Dict, List, Tuple, Optional, Union
from dataclasses import dataclass
import json


@dataclass
class AssemblyObject:
    """Represents an object with its assembly properties"""
    name: str
    structure: str  # String representation of structure
    ai: int  # Assembly Index
    components: List[str]  # List of component parts
    assembly_path: List[str]  # Sequence of assembly operations
    domain: str = "unknown"  # cosmic, geological, biological, technological
    

class AssemblyCalculator:
    """
    Main class for calculating Assembly Index values
    
    Supports multiple calculation methods:
    - Molecular structures (SMILES notation)
    - Text/linguistic structures  
    - Abstract component-based structures
    - Hierarchical assemblies
    """
    
    def __init__(self):
        """Initialize calculator with default parameters"""
        self.bond_costs = {
            'single': 1,
            'double': 2, 
            'triple': 3,
            'aromatic': 1.5,
            'hydrogen': 0.5,
            'ionic': 1,
            'metallic': 2,
            'covalent': 1
        }
        
        # Atomic assembly indices (simplified model)
        self.atomic_ai = {
            'H': 2, 'He': 2,
            'Li': 3, 'Be': 4, 'B': 5, 'C': 6, 'N': 7, 'O': 8, 'F': 9, 'Ne': 10,
            'Na': 11, 'Mg': 12, 'Al': 13, 'Si': 14, 'P': 15, 'S': 16, 'Cl': 17, 'Ar': 18,
            # Add more as needed
        }
        
        # Common molecular fragments and their AI values
        self.fragment_ai = {
            'CH3': 10,   # Methyl group
            'CH2': 8,    # Methylene group
            'CH': 7,     # Methine group
            'OH': 9,     # Hydroxyl group
            'NH2': 11,   # Amino group
            'COOH': 25,  # Carboxyl group
            'COO': 20,   # Carboxylate
            'PO4': 35,   # Phosphate group
            'SO4': 30,   # Sulfate group
            'benzene': 45,  # Benzene ring
            'ribose': 80,   # Ribose sugar
            'glucose': 90,  # Glucose
        }
    
    def calculate_molecular_ai(self, smiles: str) -> AssemblyObject:
        """
        Calculate Assembly Index for a molecule from SMILES notation
        
        Args:
            smiles (str): SMILES string representation of molecule
            
        Returns:
            AssemblyObject: Object containing AI and assembly information
        """
        try:
            # Simple SMILES parser (basic implementation)
            atoms = self._parse_atoms_from_smiles(smiles)
            bonds = self._parse_bonds_from_smiles(smiles)
            
            # Calculate base AI from atoms
            base_ai = sum(self.atomic_ai.get(atom, 10) for atom in atoms)
            
            # Add bond formation costs
            bond_ai = sum(self.bond_costs.get(bond_type, 1) for bond_type in bonds)
            
            # Add complexity for ring formation (rough estimate)
            ring_penalty = smiles.count('1') * 5  # Each ring closure adds complexity
            
            total_ai = base_ai + bond_ai + ring_penalty
            
            return AssemblyObject(
                name=f"Molecule_{smiles}",
                structure=smiles,
                ai=total_ai,
                components=list(set(atoms)),
                assembly_path=self._generate_assembly_path(atoms, bonds),
                domain="cosmic"
            )
            
        except Exception as e:
            raise ValueError(f"Error calculating molecular AI: {e}")
    
    def calculate_text_ai(self, text: str, word_based: bool = True) -> AssemblyObject:
        """
        Calculate Assembly Index for text using linguistic assembly principles
        
        Args:
            text (str): Input text to analyze
            word_based (bool): If True, use words as components; if False, use characters
            
        Returns:
            AssemblyObject: Object containing AI and assembly information
        """
        if word_based:
            # Word-based assembly
            words = re.findall(r'\w+', text.lower())
            components = list(set(words))
            
            # AI = number of unique words + assembly operations
            unique_words = len(components)
            total_words = len(words)
            
            # Assembly operations = how words are combined
            ai = unique_words + (total_words - unique_words)
            
            assembly_path = [f"Select word: {word}" for word in components]
            assembly_path.extend([f"Combine into sentence {i+1}" for i in range(len(text.split('.')) - 1)])
            
        else:
            # Character-based assembly
            chars = list(text.lower())
            components = list(set(chars))
            
            # AI = unique characters + combination operations
            unique_chars = len(components)
            total_chars = len(chars)
            
            ai = unique_chars + (total_chars - unique_chars)
            
            assembly_path = [f"Select character: '{char}'" for char in components]
            assembly_path.extend([f"Combine into position {i+1}" for i in range(len(chars))])
        
        return AssemblyObject(
            name=f"Text_{hash(text) % 10000}",
            structure=text[:50] + "..." if len(text) > 50 else text,
            ai=ai,
            components=components,
            assembly_path=assembly_path,
            domain="cognitive"
        )
    
    def calculate_hierarchical_ai(self, components: Dict[str, Union[int, Dict]], 
                                assembly_rules: Optional[Dict] = None) -> AssemblyObject:
        """
        Calculate Assembly Index for hierarchical structures
        
        Args:
            components (Dict): Nested dictionary of components and their AI values
            assembly_rules (Dict): Optional rules for combining components
            
        Returns:
            AssemblyObject: Object containing AI and assembly information
        """
        def recursive_ai_calculation(comp_dict, depth=0):
            """Recursively calculate AI for nested components"""
            total_ai = 0
            path = []
            
            for name, value in comp_dict.items():
                if isinstance(value, int):
                    # Base component with known AI
                    total_ai += value
                    path.append(f"{'  ' * depth}Component {name}: AI = {value}")
                elif isinstance(value, dict):
                    # Nested structure - recurse
                    sub_ai, sub_path = recursive_ai_calculation(value, depth + 1)
                    
                    # Assembly cost for combining subcomponents
                    assembly_cost = len(value) * 2  # Simple combination cost
                    
                    total_ai += sub_ai + assembly_cost
                    path.append(f"{'  ' * depth}Assembly {name}: sub-AI = {sub_ai}, assembly = {assembly_cost}")
                    path.extend(sub_path)
            
            return total_ai, path
        
        total_ai, assembly_path = recursive_ai_calculation(components)
        
        # Extract flat list of component names
        def extract_components(comp_dict):
            comp_list = []
            for name, value in comp_dict.items():
                if isinstance(value, int):
                    comp_list.append(name)
                elif isinstance(value, dict):
                    comp_list.extend(extract_components(value))
            return comp_list
        
        component_list = extract_components(components)
        
        return AssemblyObject(
            name="Hierarchical_Assembly",
            structure=json.dumps(components, indent=2),
            ai=total_ai,
            components=component_list,
            assembly_path=assembly_path,
            domain="biological"
        )
    
    def calculate_biological_ai(self, sequence: str, seq_type: str = "protein") -> AssemblyObject:
        """
        Calculate Assembly Index for biological sequences
        
        Args:
            sequence (str): Biological sequence (DNA, RNA, or protein)
            seq_type (str): Type of sequence ("dna", "rna", "protein")
            
        Returns:
            AssemblyObject: Object containing AI and assembly information
        """
        sequence = sequence.upper()
        
        if seq_type.lower() == "protein":
            # Protein sequence - use amino acid assembly costs
            aa_costs = {
                'A': 50, 'R': 150, 'N': 100, 'D': 90, 'C': 80,
                'Q': 120, 'E': 110, 'G': 40, 'H': 130, 'I': 80,
                'L': 80, 'K': 120, 'M': 100, 'F': 140, 'P': 70,
                'S': 60, 'T': 70, 'W': 180, 'Y': 160, 'V': 70
            }
            
            # Base cost from amino acids
            base_ai = sum(aa_costs.get(aa, 100) for aa in sequence)
            
            # Folding complexity (rough estimate based on length)
            folding_ai = int(len(sequence) * math.log(len(sequence)) / 2)
            
            total_ai = base_ai + folding_ai
            
            components = list(set(sequence))
            assembly_path = [
                f"Synthesize amino acid {aa}" for aa in components
            ]
            assembly_path.append(f"Assemble peptide chain ({len(sequence)} residues)")
            assembly_path.append(f"Fold into functional structure (complexity: {folding_ai})")
            
        elif seq_type.lower() in ["dna", "rna"]:
            # Nucleic acid sequence
            base_costs = {'A': 200, 'T': 200, 'G': 220, 'C': 220, 'U': 200}
            
            # Base cost from nucleotides
            base_ai = sum(base_costs.get(base, 200) for base in sequence)
            
            # Secondary structure complexity (rough estimate)
            gc_content = (sequence.count('G') + sequence.count('C')) / len(sequence)
            structure_ai = int(len(sequence) * gc_content * 2)
            
            total_ai = base_ai + structure_ai
            
            components = list(set(sequence))
            assembly_path = [
                f"Synthesize nucleotide {base}" for base in components
            ]
            assembly_path.append(f"Polymerize into {seq_type.upper()} ({len(sequence)} bases)")
            assembly_path.append(f"Form secondary structure (complexity: {structure_ai})")
            
        else:
            raise ValueError(f"Unknown sequence type: {seq_type}")
        
        return AssemblyObject(
            name=f"{seq_type.upper()}_{hash(sequence) % 10000}",
            structure=sequence[:50] + "..." if len(sequence) > 50 else sequence,
            ai=total_ai,
            components=components,
            assembly_path=assembly_path,
            domain="biological"
        )
    
    def compare_assemblies(self, objects: List[AssemblyObject]) -> Dict:
        """
        Compare multiple assembly objects and analyze relationships
        
        Args:
            objects (List[AssemblyObject]): List of assembly objects to compare
            
        Returns:
            Dict: Comparison analysis
        """
        if not objects:
            return {}
        
        analysis = {
            'count': len(objects),
            'ai_range': {
                'min': min(obj.ai for obj in objects),
                'max': max(obj.ai for obj in objects),
                'mean': sum(obj.ai for obj in objects) / len(objects),
                'median': sorted([obj.ai for obj in objects])[len(objects) // 2]
            },
            'domains': Counter(obj.domain for obj in objects),
            'complexity_ranking': sorted(objects, key=lambda x: x.ai, reverse=True),
            'component_overlap': self._analyze_component_overlap(objects)
        }
        
        return analysis
    
    def _parse_atoms_from_smiles(self, smiles: str) -> List[str]:
        """Extract atoms from SMILES string (simplified parser)"""
        # This is a very basic parser - real SMILES parsing is much more complex
        atom_pattern = r'[A-Z][a-z]?'
        atoms = re.findall(atom_pattern, smiles)
        return atoms
    
    def _parse_bonds_from_smiles(self, smiles: str) -> List[str]:
        """Extract bond types from SMILES string (simplified)"""
        bonds = []
        
        # Count different bond types
        bonds.extend(['single'] * (len(smiles.replace('=', '').replace('#', '')) - smiles.count('(')))
        bonds.extend(['double'] * smiles.count('='))
        bonds.extend(['triple'] * smiles.count('#'))
        
        return bonds
    
    def _generate_assembly_path(self, atoms: List[str], bonds: List[str]) -> List[str]:
        """Generate assembly pathway for molecular construction"""
        path = []
        
        # Add atom selection steps
        unique_atoms = list(set(atoms))
        for atom in unique_atoms:
            count = atoms.count(atom)
            path.append(f"Select {count} {atom} atom(s)")
        
        # Add bond formation steps
        for i, bond_type in enumerate(bonds):
            path.append(f"Form {bond_type} bond {i+1}")
        
        return path
    
    def _analyze_component_overlap(self, objects: List[AssemblyObject]) -> Dict:
        """Analyze component overlap between objects"""
        if len(objects) < 2:
            return {}
        
        all_components = [set(obj.components) for obj in objects]
        
        # Find common components
        common = set.intersection(*all_components) if all_components else set()
        
        # Calculate pairwise overlaps
        pairwise = {}
        for i in range(len(objects)):
            for j in range(i + 1, len(objects)):
                obj1, obj2 = objects[i], objects[j]
                overlap = len(set(obj1.components) & set(obj2.components))
                total = len(set(obj1.components) | set(obj2.components))
                similarity = overlap / total if total > 0 else 0
                pairwise[f"{obj1.name}_vs_{obj2.name}"] = {
                    'overlap': overlap,
                    'similarity': similarity
                }
        
        return {
            'common_components': list(common),
            'pairwise_similarity': pairwise
        }


def main():
    """
    Example usage and testing of the Assembly Index Calculator
    """
    calc = AssemblyCalculator()
    
    print("Assembly Index Calculator - Examples\n")
    print("=" * 50)
    
    # Example 1: Simple molecules
    print("\n1. Molecular Assembly Indices:")
    molecules = [
        ("Water", "O"),  # Simplified SMILES
        ("Methane", "C"),
        ("Ethanol", "CCO"),
        ("Glucose", "C(C1C(C(C(C(O1)O)O)O)O)O")  # Simplified
    ]
    
    mol_objects = []
    for name, smiles in molecules:
        try:
            obj = calc.calculate_molecular_ai(smiles)
            obj.name = name
            mol_objects.append(obj)
            print(f"  {name}: AI = {obj.ai}")
        except Exception as e:
            print(f"  {name}: Error - {e}")
    
    # Example 2: Text analysis
    print("\n2. Text Assembly Indices:")
    texts = [
        "Hello world",
        "The quick brown fox jumps over the lazy dog",
        "Assembly theory explains complexity across domains"
    ]
    
    text_objects = []
    for text in texts:
        obj = calc.calculate_text_ai(text)
        text_objects.append(obj)
        print(f"  '{text[:30]}...': AI = {obj.ai}")
    
    # Example 3: Biological sequences
    print("\n3. Biological Assembly Indices:")
    sequences = [
        ("Short peptide", "MKFLVL", "protein"),
        ("DNA sequence", "ATCGATCGATCG", "dna"),
        ("RNA sequence", "AUCGAUCGAUCG", "rna")
    ]
    
    bio_objects = []
    for name, seq, seq_type in sequences:
        obj = calc.calculate_biological_ai(seq, seq_type)
        obj.name = name
        bio_objects.append(obj)
        print(f"  {name}: AI = {obj.ai}")
    
    # Example 4: Hierarchical assemblies
    print("\n4. Hierarchical Assembly Index:")
    cell_components = {
        "membrane": {
            "phospholipids": 500,
            "proteins": 2000,
            "cholesterol": 200
        },
        "nucleus": {
            "dna": 3000,
            "histones": 1000,
            "nuclear_envelope": 800
        },
        "cytoplasm": {
            "ribosomes": 5000,
            "mitochondria": 50000,
            "enzymes": 10000
        }
    }
    
    cell_obj = calc.calculate_hierarchical_ai(cell_components)
    print(f"  Eukaryotic cell: AI = {cell_obj.ai}")
    
    # Example 5: Comparison analysis
    print("\n5. Assembly Comparison:")
    all_objects = mol_objects + bio_objects + [cell_obj]
    comparison = calc.compare_assemblies(all_objects)
    
    print(f"  AI Range: {comparison['ai_range']['min']} - {comparison['ai_range']['max']}")
    print(f"  Mean AI: {comparison['ai_range']['mean']:.1f}")
    print(f"  Domains: {dict(comparison['domains'])}")
    
    print("\n  Complexity Ranking:")
    for i, obj in enumerate(comparison['complexity_ranking'][:5]):
        print(f"    {i+1}. {obj.name}: AI = {obj.ai}")
    
    print("\n" + "=" * 50)
    print("Assembly Index calculation complete!")


if __name__ == "__main__":
    main()