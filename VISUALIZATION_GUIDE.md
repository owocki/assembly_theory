# Visualization Guide for Assembly Space

## Understanding Multi-Dimensional Assembly Space

Assembly space is inherently high-dimensional. This guide helps you interpret various visualization methods used throughout the repository.

### Visualization Types

#### 1. Linear Progressions
- **Format**: ASCII timelines showing assembly index growth
- **Best for**: Understanding time-based progression
- **Example**: Big Bang → Atoms → Molecules → Life

#### 2. Tree Diagrams
- **Format**: Branching structures showing divergent pathways
- **Best for**: Seeing how one assembly leads to many
- **Example**: Carbon atom → diamonds, graphite, life, etc.

#### 3. Network Graphs
- **Format**: Nodes and edges showing relationships
- **Best for**: Understanding interconnections
- **Key**:
  - Node size = Assembly complexity
  - Edge thickness = Dependency strength
  - Color = Domain (cosmic, biological, technological)

#### 4. Phase Space Diagrams
- **Format**: 2D/3D plots of assembly possibilities
- **Axes**: Usually complexity vs. time or energy
- **Shows**: Possible vs. actual assemblies

#### 5. Convergence Maps
- **Format**: Multiple paths leading to same structure
- **Best for**: Understanding independent evolution
- **Example**: Multiple origins of eyes, flight, etc.

### Reading Assembly Notation

```
Assembly Name [AI: value] {Domain} <Time>
├── Component 1 [AI: value]
├── Component 2 [AI: value]
└── Assembly Step (energy/conditions)
```

### Complexity Scales

```
AI Scale        Visual Representation
1-10           •
10-100         ••
100-1K         •••
1K-10K         ••••
10K-100K       •••••
100K-1M        ••••••
1M-1B          •••••••
1B+            ••••••••
```

### Domain Color Coding

- 🟦 **Cosmic**: Blue (fundamental physics)
- 🟫 **Geological**: Brown (minerals, planets)
- 🟩 **Biological**: Green (life)
- 🟨 **Cognitive**: Yellow (minds, intelligence)
- 🟥 **Technological**: Red (human-made)
- 🟪 **Hybrid**: Purple (cross-domain)

### Pathway Symbols

- `→` Direct assembly pathway
- `⇒` Major transition
- `↔` Reversible assembly
- `⇌` Dynamic equilibrium
- `×` Assembly combination
- `÷` Assembly decomposition
- `∞` Cyclic assembly
- `≈` Approximate assembly

### Time Scale Indicators

- **ps**: Picoseconds (10⁻¹² s)
- **ns**: Nanoseconds (10⁻⁹ s)
- **μs**: Microseconds (10⁻⁶ s)
- **ms**: Milliseconds (10⁻³ s)
- **s**: Seconds
- **min**: Minutes
- **hr**: Hours
- **d**: Days
- **yr**: Years
- **kyr**: Thousand years
- **Myr**: Million years
- **Gyr**: Billion years

### Energy Scale Reference

- **eV**: Electron volts (molecular)
- **kJ/mol**: Kilojoules per mole (chemical)
- **kcal**: Kilocalories (biological)
- **MeV**: Mega electron volts (nuclear)
- **GeV**: Giga electron volts (particle physics)

### Interactive Elements

When viewing HTML visualizations:
- **Click**: Show assembly details
- **Hover**: Display connections
- **Drag**: Rotate 3D views
- **Scroll**: Zoom in/out
- **Double-click**: Focus on sub-network

### Understanding Assembly Graphs

```
     [A]
    ╱   ╲
   ↓     ↓
  [B]   [C]
   ↓   ╱ ↓
   ↓  ×  ↓
   ↓ ╱   ↓
  [D]   [E]
```

- Vertical flow: Time progression
- Horizontal spread: Diversification
- Crossing paths: Convergent assembly
- Node intersection: Hybrid assembly

### Complexity Landscapes

```
Complexity ▲
          │    ╱╲
          │   ╱  ╲    ← Peaks: Stable assemblies
          │  ╱    ╲╱╲
          │ ╱        ╲ ← Valleys: Unstable states
          │╱          ╲
          └────────────→ Configuration Space
```

### Reading JSON Network Files

```json
{
  "nodes": [
    {
      "id": "water",
      "AI": 3,
      "domain": "cosmic",
      "time_origin": "13.4 Gyr"
    }
  ],
  "edges": [
    {
      "source": "hydrogen",
      "target": "water",
      "type": "assembly",
      "steps": 2
    }
  ]
}
```

This notation system allows consistent representation of assembly relationships across all scales and domains.