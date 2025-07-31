// Recursion Simulators for Different Types
let currentSimulation = null;
let animationId = null;

// Base class for all simulators
class RecursionSimulator {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width = canvas.offsetWidth;
        this.height = canvas.height = canvas.offsetHeight;
        this.frame = 0;
        this.running = true;
        this.generation = 0;
        this.fitnessHistory = [];
        this.maxFitnessHistory = 50;
    }
    
    clear() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        this.ctx.fillRect(0, 0, this.width, this.height);
    }
    
    stop() {
        this.running = false;
    }
    
    drawFitnessGraph(avgFitness, maxFitness) {
        // Add to history
        this.fitnessHistory.push({ avg: avgFitness, max: maxFitness });
        if (this.fitnessHistory.length > this.maxFitnessHistory) {
            this.fitnessHistory.shift();
        }
        
        // Draw graph background
        const graphX = this.width - 160;
        const graphY = 10;
        const graphW = 150;
        const graphH = 60;
        
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(graphX, graphY, graphW, graphH);
        
        // Draw axes
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        this.ctx.beginPath();
        this.ctx.moveTo(graphX, graphY + graphH);
        this.ctx.lineTo(graphX + graphW, graphY + graphH);
        this.ctx.stroke();
        
        // Draw fitness lines
        if (this.fitnessHistory.length > 1) {
            // Average fitness line
            this.ctx.strokeStyle = '#4caf50';
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.fitnessHistory.forEach((point, i) => {
                const x = graphX + (i / this.maxFitnessHistory) * graphW;
                const y = graphY + graphH - (point.avg * graphH);
                if (i === 0) this.ctx.moveTo(x, y);
                else this.ctx.lineTo(x, y);
            });
            this.ctx.stroke();
            
            // Max fitness line
            this.ctx.strokeStyle = '#ffeb3b';
            this.ctx.lineWidth = 1;
            this.ctx.beginPath();
            this.fitnessHistory.forEach((point, i) => {
                const x = graphX + (i / this.maxFitnessHistory) * graphW;
                const y = graphY + graphH - (point.max * graphH);
                if (i === 0) this.ctx.moveTo(x, y);
                else this.ctx.lineTo(x, y);
            });
            this.ctx.stroke();
        }
        
        // Labels
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = '10px sans-serif';
        this.ctx.fillText('Fitness', graphX + 5, graphY + 10);
        this.ctx.fillStyle = '#4caf50';
        this.ctx.fillText(`Avg: ${avgFitness.toFixed(2)}`, graphX + 5, graphY + 25);
        this.ctx.fillStyle = '#ffeb3b';
        this.ctx.fillText(`Max: ${maxFitness.toFixed(2)}`, graphX + 5, graphY + 40);
    }
}

// DNA → Enzymes → DNA Simulator with Selection Pressure
class DNASimulator extends RecursionSimulator {
    constructor(canvas) {
        super(canvas);
        this.dnaStrands = [];
        this.enzymes = [];
        this.selectionPressure = 'efficiency'; // What we're selecting for
        this.initDNA();
    }
    
    initDNA() {
        // Create initial DNA strands with fitness-related genes
        for (let i = 0; i < 5; i++) {
            this.dnaStrands.push({
                x: 50 + Math.random() * (this.width - 100),
                y: 50 + Math.random() * (this.height - 100),
                sequence: this.generateSequence(),
                replicating: false,
                age: 0,
                generation: 0,
                fitness: 0,
                replicationCount: 0,
                enzymeProduction: Math.random() * 0.5 + 0.1, // Gene for enzyme production rate
                replicationSpeed: Math.random() * 0.5 + 0.5, // Gene for replication speed
                mutationRate: 0.1
            });
        }
    }
    
    generateSequence() {
        const bases = ['A', 'T', 'G', 'C'];
        let sequence = [];
        for (let i = 0; i < 20; i++) {
            sequence.push(bases[Math.floor(Math.random() * 4)]);
        }
        return sequence;
    }
    
    calculateFitness(dna) {
        // Fitness based on replication efficiency and survival
        const agePenalty = Math.max(0, 1 - dna.age / 500);
        const replicationBonus = dna.replicationCount * 0.2;
        const efficiencyScore = dna.enzymeProduction * dna.replicationSpeed;
        
        dna.fitness = agePenalty * (1 + replicationBonus) * efficiencyScore;
        return dna.fitness;
    }
    
    update() {
        this.frame++;
        
        // Update fitness for all DNA
        this.dnaStrands.forEach(dna => {
            this.calculateFitness(dna);
            dna.age++;
        });
        
        // Selection pressure - remove unfit DNA
        if (this.frame % 120 === 0 && this.dnaStrands.length > 3) {
            this.dnaStrands.sort((a, b) => b.fitness - a.fitness);
            const survivors = Math.ceil(this.dnaStrands.length * 0.7);
            this.dnaStrands = this.dnaStrands.slice(0, survivors);
            this.generation++;
        }
        
        // Create enzymes from DNA based on their genes
        this.dnaStrands.forEach(dna => {
            if (this.frame % 60 === 0 && Math.random() < dna.enzymeProduction && this.enzymes.length < 20) {
                this.enzymes.push({
                    x: dna.x,
                    y: dna.y,
                    targetX: dna.x + (Math.random() - 0.5) * 150,
                    targetY: dna.y + (Math.random() - 0.5) * 100,
                    type: 'polymerase',
                    active: true,
                    color: '#ff6b9d',
                    efficiency: dna.replicationSpeed,
                    parentDNA: dna
                });
            }
        });
        
        // Move enzymes
        this.enzymes.forEach((enzyme, index) => {
            if (!enzyme.active) return;
            
            // Move towards target with efficiency-based speed
            enzyme.x += (enzyme.targetX - enzyme.x) * 0.05 * enzyme.efficiency;
            enzyme.y += (enzyme.targetY - enzyme.y) * 0.05 * enzyme.efficiency;
            
            // Check for DNA collision
            this.dnaStrands.forEach(dna => {
                const dist = Math.sqrt(Math.pow(enzyme.x - dna.x, 2) + Math.pow(enzyme.y - dna.y, 2));
                if (dist < 30 && !dna.replicating && dna !== enzyme.parentDNA) {
                    // Start replication
                    dna.replicating = true;
                    enzyme.active = false;
                    
                    // Create new DNA after delay
                    setTimeout(() => {
                        if (this.dnaStrands.length < 15) {
                            const offspring = {
                                x: dna.x + (Math.random() - 0.5) * 80,
                                y: dna.y + (Math.random() - 0.5) * 80,
                                sequence: this.mutateSequence([...dna.sequence], dna.mutationRate),
                                replicating: false,
                                age: 0,
                                generation: dna.generation + 1,
                                fitness: 0,
                                replicationCount: 0,
                                enzymeProduction: this.mutateValue(dna.enzymeProduction, dna.mutationRate),
                                replicationSpeed: this.mutateValue(dna.replicationSpeed, dna.mutationRate),
                                mutationRate: dna.mutationRate
                            };
                            
                            this.dnaStrands.push(offspring);
                            dna.replicationCount++;
                        }
                        dna.replicating = false;
                    }, 1000 / enzyme.efficiency);
                }
            });
            
            // Remove inactive enzymes
            if (!enzyme.active || enzyme.age > 200) {
                this.enzymes.splice(index, 1);
            }
        });
    }
    
    mutateSequence(sequence, rate) {
        const bases = ['A', 'T', 'G', 'C'];
        return sequence.map(base => {
            if (Math.random() < rate) {
                return bases[Math.floor(Math.random() * 4)];
            }
            return base;
        });
    }
    
    mutateValue(value, rate) {
        if (Math.random() < rate) {
            return Math.max(0.1, Math.min(1, value + (Math.random() - 0.5) * 0.2));
        }
        return value;
    }
    
    draw() {
        this.clear();
        
        // Draw selection pressure indicator
        this.ctx.fillStyle = 'rgba(255, 0, 0, 0.1)';
        this.ctx.fillRect(0, 0, this.width, 30);
        this.ctx.fillStyle = '#ff6b6b';
        this.ctx.font = '12px sans-serif';
        this.ctx.fillText('SELECTION PRESSURE: Replication Efficiency', 10, 20);
        
        // Draw DNA strands
        this.dnaStrands.forEach(dna => {
            this.drawDNA(dna);
        });
        
        // Draw enzymes
        this.enzymes.forEach(enzyme => {
            if (enzyme.active) {
                // Size based on efficiency
                const size = 5 + enzyme.efficiency * 5;
                this.ctx.fillStyle = enzyme.color;
                this.ctx.globalAlpha = 0.8;
                this.ctx.beginPath();
                this.ctx.arc(enzyme.x, enzyme.y, size, 0, Math.PI * 2);
                this.ctx.fill();
                
                // Speed indicator
                this.ctx.strokeStyle = '#ffffff';
                this.ctx.lineWidth = 1;
                this.ctx.globalAlpha = 0.5;
                this.ctx.beginPath();
                this.ctx.arc(enzyme.x, enzyme.y, size + 3, 0, Math.PI * 2 * enzyme.efficiency);
                this.ctx.stroke();
            }
        });
        
        // Calculate and show fitness stats
        if (this.dnaStrands.length > 0) {
            const avgFitness = this.dnaStrands.reduce((sum, dna) => sum + dna.fitness, 0) / this.dnaStrands.length;
            const maxFitness = Math.max(...this.dnaStrands.map(dna => dna.fitness));
            this.drawFitnessGraph(avgFitness / 2, maxFitness / 2); // Normalize to 0-1
        }
        
        // Draw stats
        this.ctx.globalAlpha = 1;
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = '12px sans-serif';
        this.ctx.fillText(`Generation: ${this.generation}`, 10, 40);
        this.ctx.fillText(`Population: ${this.dnaStrands.length}`, 10, 55);
        
        // Show evolution progress
        if (this.generation > 0) {
            const avgEnzyme = this.dnaStrands.reduce((sum, dna) => sum + dna.enzymeProduction, 0) / this.dnaStrands.length;
            const avgSpeed = this.dnaStrands.reduce((sum, dna) => sum + dna.replicationSpeed, 0) / this.dnaStrands.length;
            this.ctx.fillText(`Avg Enzyme Production: ${avgEnzyme.toFixed(2)}`, 10, 70);
            this.ctx.fillText(`Avg Replication Speed: ${avgSpeed.toFixed(2)}`, 10, 85);
        }
    }
    
    drawDNA(dna) {
        const startX = dna.x - 10;
        const startY = dna.y - 40;
        
        // Fitness glow
        if (dna.fitness > 0) {
            const glowRadius = 20 + dna.fitness * 30;
            const gradient = this.ctx.createRadialGradient(dna.x, dna.y, 0, dna.x, dna.y, glowRadius);
            gradient.addColorStop(0, `rgba(76, 175, 80, ${dna.fitness * 0.3})`);
            gradient.addColorStop(1, 'rgba(76, 175, 80, 0)');
            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(dna.x, dna.y, glowRadius, 0, Math.PI * 2);
            this.ctx.fill();
        }
        
        // Draw double helix - color intensity based on fitness
        const baseColor = dna.replicating ? '#ffeb3b' : '#4caf50';
        this.ctx.strokeStyle = baseColor;
        this.ctx.lineWidth = 2 + dna.fitness * 2;
        this.ctx.globalAlpha = 0.5 + dna.fitness * 0.5;
        
        for (let i = 0; i < 20; i++) {
            const x1 = startX + Math.sin(i * 0.5 + this.frame * 0.02) * 10;
            const x2 = startX - Math.sin(i * 0.5 + this.frame * 0.02) * 10;
            const y = startY + i * 4;
            
            this.ctx.beginPath();
            this.ctx.moveTo(x1, y);
            this.ctx.lineTo(x2, y);
            this.ctx.stroke();
            
            // Base pairs
            if (i % 2 === 0) {
                this.ctx.fillStyle = this.getBaseColor(dna.sequence[i/2]);
                this.ctx.fillRect(x1 - 2, y - 2, 4, 4);
                this.ctx.fillRect(x2 - 2, y - 2, 4, 4);
            }
        }
        
        this.ctx.globalAlpha = 1;
        
        // Fitness and generation indicators
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = '10px sans-serif';
        this.ctx.fillText(`Gen ${dna.generation}`, dna.x - 20, dna.y + 50);
        this.ctx.fillText(`Fit: ${dna.fitness.toFixed(2)}`, dna.x - 20, dna.y + 62);
        
        // Replication count badge
        if (dna.replicationCount > 0) {
            this.ctx.fillStyle = '#ffeb3b';
            this.ctx.beginPath();
            this.ctx.arc(dna.x + 15, dna.y - 35, 10, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.fillStyle = '#000000';
            this.ctx.font = '10px sans-serif';
            this.ctx.fillText(dna.replicationCount, dna.x + 12, dna.y - 32);
        }
        
        if (dna.replicating) {
            this.ctx.fillStyle = '#ffeb3b';
            this.ctx.font = '11px sans-serif';
            this.ctx.fillText('Replicating...', dna.x - 30, dna.y + 75);
        }
    }
    
    getBaseColor(base) {
        const colors = { 'A': '#ff6b6b', 'T': '#4ecdc4', 'G': '#45b7d1', 'C': '#f7b731' };
        return colors[base] || '#ffffff';
    }
}

// Neural Recursion Simulator with Selection for Pattern Recognition
class NeuralSimulator extends RecursionSimulator {
    constructor(canvas) {
        super(canvas);
        this.networks = [];
        this.targetPattern = [1, 0, 1, 0]; // Pattern to learn
        this.generation = 0;
        this.initNetworks();
    }
    
    initNetworks() {
        // Create multiple competing neural networks
        for (let n = 0; n < 6; n++) {
            const network = {
                id: n,
                x: 80 + (n % 3) * 180,
                y: 80 + Math.floor(n / 3) * 120,
                neurons: [],
                connections: [],
                fitness: 0,
                generation: 0,
                outputs: [],
                successRate: 0,
                plasticity: Math.random() * 0.5 + 0.1 // Learning rate gene
            };
            
            // Create neurons for this network
            const layers = [4, 3, 4]; // Input, hidden, output
            let neuronId = 0;
            
            for (let layer = 0; layer < layers.length; layer++) {
                for (let i = 0; i < layers[layer]; i++) {
                    network.neurons.push({
                        id: neuronId++,
                        layer: layer,
                        activation: 0,
                        bias: (Math.random() - 0.5) * 2
                    });
                }
            }
            
            // Create connections with random weights
            for (let layer = 0; layer < layers.length - 1; layer++) {
                const layerStart = layers.slice(0, layer).reduce((a, b) => a + b, 0);
                const nextLayerStart = layers.slice(0, layer + 1).reduce((a, b) => a + b, 0);
                
                for (let i = 0; i < layers[layer]; i++) {
                    for (let j = 0; j < layers[layer + 1]; j++) {
                        network.connections.push({
                            from: layerStart + i,
                            to: nextLayerStart + j,
                            weight: (Math.random() - 0.5) * 2,
                            plasticityStrength: 0
                        });
                    }
                }
            }
            
            this.networks.push(network);
        }
    }
    
    update() {
        this.frame++;
        
        // Test each network with the pattern
        if (this.frame % 20 === 0) {
            this.networks.forEach(network => {
                // Set input pattern
                const inputNeurons = network.neurons.filter(n => n.layer === 0);
                this.targetPattern.forEach((val, i) => {
                    if (inputNeurons[i]) {
                        inputNeurons[i].activation = val;
                    }
                });
                
                // Forward propagation
                for (let layer = 1; layer < 3; layer++) {
                    network.neurons.forEach(neuron => {
                        if (neuron.layer === layer) {
                            let sum = neuron.bias;
                            network.connections.forEach(conn => {
                                if (conn.to === neuron.id) {
                                    sum += network.neurons[conn.from].activation * conn.weight;
                                }
                            });
                            neuron.activation = this.sigmoid(sum);
                        }
                    });
                }
                
                // Get output and calculate fitness
                const outputNeurons = network.neurons.filter(n => n.layer === 2);
                network.outputs = outputNeurons.map(n => n.activation > 0.5 ? 1 : 0);
                
                // Calculate how well it matches target pattern
                let correct = 0;
                for (let i = 0; i < this.targetPattern.length; i++) {
                    if (network.outputs[i] === this.targetPattern[i]) {
                        correct++;
                    }
                }
                
                const accuracy = correct / this.targetPattern.length;
                network.successRate = network.successRate * 0.9 + accuracy * 0.1; // Moving average
                network.fitness = network.successRate;
                
                // Hebbian learning - strengthen connections that contributed to correct outputs
                if (accuracy > 0.5) {
                    network.connections.forEach(conn => {
                        const fromActivation = network.neurons[conn.from].activation;
                        const toActivation = network.neurons[conn.to].activation;
                        
                        // Hebbian rule: neurons that fire together wire together
                        const delta = network.plasticity * fromActivation * toActivation * accuracy;
                        conn.weight += delta;
                        conn.weight = Math.max(-2, Math.min(2, conn.weight)); // Clamp weights
                        conn.plasticityStrength = Math.abs(delta);
                    });
                }
            });
        }
        
        // Evolution - reproduce successful networks
        if (this.frame % 300 === 0 && this.generation > 0) {
            this.networks.sort((a, b) => b.fitness - a.fitness);
            
            // Keep top 3, replace bottom 3
            const parents = this.networks.slice(0, 3);
            const newNetworks = [];
            
            parents.forEach(parent => {
                const child = JSON.parse(JSON.stringify(parent)); // Deep copy
                child.id = this.networks.length + newNetworks.length;
                child.generation = parent.generation + 1;
                child.fitness = 0;
                child.successRate = 0;
                
                // Mutate weights and plasticity
                child.connections.forEach(conn => {
                    if (Math.random() < 0.1) {
                        conn.weight += (Math.random() - 0.5) * 0.5;
                    }
                });
                child.plasticity = Math.max(0.01, Math.min(1, parent.plasticity + (Math.random() - 0.5) * 0.1));
                
                // Position child near parent
                child.x = parent.x + (Math.random() - 0.5) * 30;
                child.y = parent.y + (Math.random() - 0.5) * 30;
                
                newNetworks.push(child);
            });
            
            // Replace worst performers
            this.networks = [...parents, ...newNetworks];
            this.generation++;
        }
    }
    
    sigmoid(x) {
        return 1 / (1 + Math.exp(-x));
    }
    
    draw() {
        this.clear();
        
        // Draw selection pressure indicator
        this.ctx.fillStyle = 'rgba(156, 39, 176, 0.1)';
        this.ctx.fillRect(0, 0, this.width, 30);
        this.ctx.fillStyle = '#9c27b0';
        this.ctx.font = '12px sans-serif';
        this.ctx.fillText('SELECTION PRESSURE: Pattern Recognition (1-0-1-0)', 10, 20);
        
        // Draw target pattern
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillText('Target:', this.width - 150, 20);
        this.targetPattern.forEach((val, i) => {
            this.ctx.fillStyle = val ? '#4caf50' : '#333333';
            this.ctx.fillRect(this.width - 100 + i * 20, 10, 15, 15);
        });
        
        // Draw each network
        this.networks.forEach(network => {
            this.drawNetwork(network);
        });
        
        // Calculate fitness stats
        if (this.networks.length > 0) {
            const avgFitness = this.networks.reduce((sum, net) => sum + net.fitness, 0) / this.networks.length;
            const maxFitness = Math.max(...this.networks.map(net => net.fitness));
            this.drawFitnessGraph(avgFitness, maxFitness);
        }
        
        // Stats
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = '12px sans-serif';
        this.ctx.fillText(`Generation: ${this.generation}`, 10, 45);
        
        const avgPlasticity = this.networks.reduce((sum, net) => sum + net.plasticity, 0) / this.networks.length;
        this.ctx.fillText(`Avg Plasticity: ${avgPlasticity.toFixed(3)}`, 10, 60);
    }
    
    drawNetwork(network) {
        const scale = 0.7;
        const nodeSize = 8;
        
        // Fitness glow
        if (network.fitness > 0.5) {
            const glowRadius = 40 + network.fitness * 20;
            const gradient = this.ctx.createRadialGradient(network.x, network.y, 0, network.x, network.y, glowRadius);
            gradient.addColorStop(0, `rgba(156, 39, 176, ${network.fitness * 0.2})`);
            gradient.addColorStop(1, 'rgba(156, 39, 176, 0)');
            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(network.x, network.y, glowRadius, 0, Math.PI * 2);
            this.ctx.fill();
        }
        
        // Draw connections
        const layers = [4, 3, 4];
        network.connections.forEach(conn => {
            const fromNeuron = network.neurons[conn.from];
            const toNeuron = network.neurons[conn.to];
            
            const fromX = network.x + (fromNeuron.layer - 1) * 40 * scale;
            const fromY = network.y + (fromNeuron.id % layers[fromNeuron.layer] - layers[fromNeuron.layer]/2) * 20 * scale;
            
            const toX = network.x + (toNeuron.layer - 1) * 40 * scale;
            const toY = network.y + (toNeuron.id % layers[toNeuron.layer] - layers[toNeuron.layer]/2) * 20 * scale;
            
            // Connection strength visualization
            const opacity = Math.abs(conn.weight) / 2;
            this.ctx.strokeStyle = conn.weight > 0 ? 
                `rgba(76, 175, 80, ${opacity})` : 
                `rgba(244, 67, 54, ${opacity})`;
            this.ctx.lineWidth = Math.abs(conn.weight) + conn.plasticityStrength * 5;
            this.ctx.globalAlpha = 0.3 + opacity * 0.5;
            
            this.ctx.beginPath();
            this.ctx.moveTo(fromX, fromY);
            this.ctx.lineTo(toX, toY);
            this.ctx.stroke();
        });
        
        this.ctx.globalAlpha = 1;
        
        // Draw neurons
        network.neurons.forEach((neuron, i) => {
            const x = network.x + (neuron.layer - 1) * 40 * scale;
            const y = network.y + (i % layers[neuron.layer] - layers[neuron.layer]/2) * 20 * scale;
            
            // Neuron body
            const activation = neuron.activation || 0;
            this.ctx.fillStyle = neuron.layer === 0 ? '#2196f3' : 
                               neuron.layer === 2 ? '#ff9800' : '#9c27b0';
            this.ctx.globalAlpha = 0.3 + activation * 0.7;
            this.ctx.beginPath();
            this.ctx.arc(x, y, nodeSize, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Activation core
            if (activation > 0.5) {
                this.ctx.fillStyle = '#ffeb3b';
                this.ctx.globalAlpha = activation;
                this.ctx.beginPath();
                this.ctx.arc(x, y, nodeSize * 0.5, 0, Math.PI * 2);
                this.ctx.fill();
            }
        });
        
        this.ctx.globalAlpha = 1;
        
        // Draw output pattern
        const outputStart = network.x + 50;
        network.outputs.forEach((val, i) => {
            this.ctx.fillStyle = val ? '#4caf50' : '#333333';
            this.ctx.fillRect(outputStart + i * 12, network.y - 30, 10, 10);
        });
        
        // Success indicator
        const isCorrect = JSON.stringify(network.outputs) === JSON.stringify(this.targetPattern);
        if (isCorrect) {
            this.ctx.strokeStyle = '#4caf50';
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(outputStart - 2, network.y - 32, 50, 14);
        }
        
        // Network info
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = '10px sans-serif';
        this.ctx.fillText(`Gen ${network.generation}`, network.x - 30, network.y + 40);
        this.ctx.fillText(`Fit: ${network.fitness.toFixed(2)}`, network.x - 30, network.y + 52);
        this.ctx.fillText(`η: ${network.plasticity.toFixed(2)}`, network.x - 30, network.y + 64);
    }
}

// Evolution Simulator - Clear visualization of Genes → Organisms → Genes cycle
class EvolutionSimulator extends RecursionSimulator {
    constructor(canvas) {
        super(canvas);
        this.organisms = [];
        this.genes = [];
        this.generation = 0;
        this.reproductionPhase = false;
        this.phaseTimer = 0;
        this.initPopulation();
    }
    
    initPopulation() {
        // Create initial organisms with visible genes
        for (let i = 0; i < 6; i++) {
            const organism = {
                id: i,
                x: 100 + (i % 3) * 150,
                y: 100 + Math.floor(i / 3) * 100,
                genes: {
                    size: ['S', 'M', 'L'][Math.floor(Math.random() * 3)],
                    speed: ['slow', 'medium', 'fast'][Math.floor(Math.random() * 3)],
                    color: ['red', 'green', 'blue'][Math.floor(Math.random() * 3)]
                },
                phenotype: null,
                fitness: 0,
                reproducing: false,
                age: 0
            };
            
            // Express genes as phenotype
            organism.phenotype = this.expressPhenotype(organism.genes);
            this.organisms.push(organism);
        }
    }
    
    expressPhenotype(genes) {
        return {
            size: genes.size === 'S' ? 15 : genes.size === 'M' ? 25 : 35,
            speed: genes.speed === 'slow' ? 0.5 : genes.speed === 'medium' ? 1 : 1.5,
            color: genes.color === 'red' ? '#ff6b6b' : genes.color === 'green' ? '#4caf50' : '#2196f3'
        };
    }
    
    update() {
        this.frame++;
        this.phaseTimer++;
        
        if (!this.reproductionPhase) {
            // ORGANISM PHASE - organisms live and accumulate fitness
            this.organisms.forEach(org => {
                // Move based on speed gene
                org.x += (Math.random() - 0.5) * org.phenotype.speed * 2;
                org.y += (Math.random() - 0.5) * org.phenotype.speed * 2;
                
                // Keep in bounds
                org.x = Math.max(50, Math.min(this.width - 50, org.x));
                org.y = Math.max(50, Math.min(this.height - 50, org.y));
                
                org.age++;
                
                // Fitness based on position (favor right side) and traits
                const rightness = org.x / this.width;
                const speedBonus = org.phenotype.speed / 1.5;
                const sizeBonus = (40 - org.phenotype.size) / 40; // Smaller is better
                org.fitness = rightness * 0.5 + speedBonus * 0.3 + sizeBonus * 0.2;
                
                // Visual feedback for high fitness
                org.reproducing = org.fitness > 0.6;
            });
            
            // Switch to reproduction phase
            if (this.phaseTimer > 180) {
                this.reproductionPhase = true;
                this.phaseTimer = 0;
                this.startReproduction();
            }
        } else {
            // REPRODUCTION PHASE - genes create new organisms
            if (this.phaseTimer > 120) {
                this.reproductionPhase = false;
                this.phaseTimer = 0;
                this.generation++;
            }
        }
    }
    
    startReproduction() {
        // Sort by fitness
        const sorted = [...this.organisms].sort((a, b) => b.fitness - a.fitness);
        const parents = sorted.slice(0, 3); // Top 3 reproduce
        
        // Create gene packets that will form new organisms
        this.genes = [];
        parents.forEach(parent => {
            // Extract and visualize genes
            const genePacket = {
                fromOrganism: parent.id,
                x: parent.x,
                y: parent.y,
                targetX: 100 + (this.genes.length % 3) * 150,
                targetY: 250,
                genes: { ...parent.genes },
                moving: true
            };
            
            // Mutation chance
            if (Math.random() < 0.3) {
                const geneTypes = ['size', 'speed', 'color'];
                const mutateGene = geneTypes[Math.floor(Math.random() * 3)];
                
                if (mutateGene === 'size') {
                    genePacket.genes.size = ['S', 'M', 'L'][Math.floor(Math.random() * 3)];
                } else if (mutateGene === 'speed') {
                    genePacket.genes.speed = ['slow', 'medium', 'fast'][Math.floor(Math.random() * 3)];
                } else {
                    genePacket.genes.color = ['red', 'green', 'blue'][Math.floor(Math.random() * 3)];
                }
                genePacket.mutated = true;
            }
            
            this.genes.push(genePacket);
        });
        
        // Remove unfit organisms
        this.organisms = sorted.slice(0, Math.ceil(this.organisms.length / 2));
    }
    
    draw() {
        this.clear();
        
        // Draw phase indicator
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = '16px sans-serif';
        this.ctx.fillText('Genes → Organisms → Genes', 10, 25);
        this.ctx.font = '14px sans-serif';
        this.ctx.fillText(`Generation: ${this.generation}`, 10, 45);
        
        // Phase label
        this.ctx.fillStyle = this.reproductionPhase ? '#ffeb3b' : '#4caf50';
        this.ctx.fillText(this.reproductionPhase ? 'REPRODUCTION PHASE' : 'ORGANISM PHASE', this.width - 180, 25);
        
        if (!this.reproductionPhase) {
            // Draw fitness gradient
            const gradient = this.ctx.createLinearGradient(0, 0, this.width, 0);
            gradient.addColorStop(0, 'rgba(255, 0, 0, 0.1)');
            gradient.addColorStop(1, 'rgba(0, 255, 0, 0.1)');
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(0, 0, this.width, this.height);
            
            // Draw organisms
            this.organisms.forEach(org => {
                this.drawOrganism(org);
            });
            
            // Fitness zone indicator
            this.ctx.strokeStyle = 'rgba(0, 255, 0, 0.3)';
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(this.width * 0.7, 20, this.width * 0.25, this.height - 40);
            this.ctx.fillStyle = 'rgba(0, 255, 0, 0.6)';
            this.ctx.font = '12px sans-serif';
            this.ctx.fillText('High Fitness Zone', this.width * 0.72, 15);
        } else {
            // Draw gene transfer
            this.genes.forEach((gene, index) => {
                if (gene.moving) {
                    // Move gene packet
                    gene.x += (gene.targetX - gene.x) * 0.05;
                    gene.y += (gene.targetY - gene.y) * 0.05;
                    
                    if (Math.abs(gene.x - gene.targetX) < 5) {
                        gene.moving = false;
                        
                        // Create new organism from genes
                        setTimeout(() => {
                            const newOrg = {
                                id: this.organisms.length,
                                x: gene.targetX,
                                y: gene.targetY,
                                genes: gene.genes,
                                phenotype: this.expressPhenotype(gene.genes),
                                fitness: 0,
                                reproducing: false,
                                age: 0,
                                isNew: true
                            };
                            this.organisms.push(newOrg);
                        }, 500);
                    }
                }
                
                this.drawGenePacket(gene);
            });
            
            // Draw remaining organisms (parents)
            this.organisms.forEach(org => {
                this.drawOrganism(org);
                if (org.reproducing) {
                    // Show as parent
                    this.ctx.strokeStyle = '#ffeb3b';
                    this.ctx.lineWidth = 3;
                    this.ctx.beginPath();
                    this.ctx.arc(org.x, org.y, org.phenotype.size + 5, 0, Math.PI * 2);
                    this.ctx.stroke();
                }
            });
        }
    }
    
    drawOrganism(org) {
        // Body
        this.ctx.fillStyle = org.phenotype.color;
        this.ctx.globalAlpha = org.isNew ? 0.6 : 0.8;
        this.ctx.beginPath();
        this.ctx.arc(org.x, org.y, org.phenotype.size, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Gene labels
        this.ctx.globalAlpha = 1;
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = '10px sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(org.genes.size, org.x, org.y - org.phenotype.size - 5);
        this.ctx.fillText(org.genes.speed[0], org.x - org.phenotype.size - 5, org.y);
        
        // Fitness indicator
        if (!this.reproductionPhase && org.fitness > 0) {
            this.ctx.fillStyle = `rgba(255, 255, 255, ${org.fitness})`;
            this.ctx.beginPath();
            this.ctx.arc(org.x, org.y, 5, 0, Math.PI * 2);
            this.ctx.fill();
        }
        
        this.ctx.textAlign = 'left';
    }
    
    drawGenePacket(gene) {
        // DNA helix visual
        this.ctx.strokeStyle = gene.mutated ? '#ffeb3b' : '#4caf50';
        this.ctx.lineWidth = 2;
        
        for (let i = 0; i < 10; i++) {
            const x1 = gene.x - 10 + Math.sin(i * 0.5) * 5;
            const x2 = gene.x + 10 - Math.sin(i * 0.5) * 5;
            const y = gene.y - 15 + i * 3;
            
            this.ctx.beginPath();
            this.ctx.moveTo(x1, y);
            this.ctx.lineTo(x2, y);
            this.ctx.stroke();
        }
        
        // Gene content
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = '9px sans-serif';
        this.ctx.fillText(`${gene.genes.size}-${gene.genes.speed[0]}-${gene.genes.color[0]}`, gene.x - 20, gene.y + 20);
        
        if (gene.mutated) {
            this.ctx.fillStyle = '#ffeb3b';
            this.ctx.fillText('mutated!', gene.x - 20, gene.y + 30);
        }
    }
}

// Cultural Recursion Simulator with Selection Pressure
class CultureSimulator extends RecursionSimulator {
    constructor(canvas) {
        super(canvas);
        this.minds = [];
        this.ideas = [];
        this.connections = [];
        this.generation = 0;
        this.generationTimer = 0;
        this.generationLength = 300;
        this.selectionPressure = 0.6; // Survival rate
        this.mutationRate = 0.15;
        this.initCulture();
    }
    
    initCulture() {
        // Create minds in a network with genetic traits
        const gridSize = 4;
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                this.minds.push({
                    id: i * gridSize + j,
                    x: 100 + i * 100,
                    y: 50 + j * 50,
                    ideas: [],
                    creativity: Math.random() * 0.5 + 0.5,
                    influence: Math.random() * 0.5 + 0.5,
                    receptivity: Math.random() * 0.5 + 0.5, // How likely to adopt ideas
                    ideaRetention: Math.random() * 0.5 + 0.5, // How well they remember ideas
                    fitness: 0,
                    generation: 0,
                    totalSpreadCount: 0
                });
            }
        }
        
        // Create initial ideas with value
        for (let i = 0; i < 5; i++) {
            const mind = this.minds[Math.floor(Math.random() * this.minds.length)];
            const idea = {
                id: i,
                originMind: mind.id,
                x: mind.x,
                y: mind.y,
                content: `Idea-${i}`,
                value: Math.random() * 0.5 + 0.5, // Idea quality/fitness
                spreadCount: 0,
                color: `hsl(${Math.random() * 360}, 70%, 50%)`,
                spreading: false,
                age: 0
            };
            mind.ideas.push(idea.id);
            this.ideas.push(idea);
        }
    }
    
    calculateFitness() {
        this.minds.forEach(mind => {
            mind.fitness = 0;
            
            // Fitness from creating influential ideas
            this.ideas.forEach(idea => {
                if (idea.originMind === mind.id) {
                    mind.fitness += idea.spreadCount * idea.value * 2;
                }
            });
            
            // Fitness from holding valuable ideas
            mind.ideas.forEach(ideaId => {
                const idea = this.ideas.find(i => i.id === ideaId);
                if (idea) {
                    mind.fitness += idea.value * 0.5;
                }
            });
            
            // Fitness from influence and creativity
            mind.fitness += mind.totalSpreadCount * 0.1;
            mind.fitness += mind.creativity * 0.2;
            
            // Normalize
            mind.fitness = Math.min(1, mind.fitness / 10);
        });
    }
    
    evolveCulture() {
        this.calculateFitness();
        
        // Sort by fitness
        const sorted = [...this.minds].sort((a, b) => b.fitness - a.fitness);
        
        // Select survivors
        const survivorCount = Math.floor(this.minds.length * this.selectionPressure);
        const survivors = sorted.slice(0, survivorCount);
        
        // Create new generation
        const newMinds = [];
        
        // Elite preservation
        survivors.forEach((parent, i) => {
            newMinds.push({
                id: i,
                x: parent.x + (Math.random() - 0.5) * 20,
                y: parent.y + (Math.random() - 0.5) * 20,
                ideas: [],
                creativity: this.mutateValue(parent.creativity),
                influence: this.mutateValue(parent.influence),
                receptivity: this.mutateValue(parent.receptivity),
                ideaRetention: this.mutateValue(parent.ideaRetention),
                fitness: 0,
                generation: this.generation + 1,
                totalSpreadCount: 0
            });
        });
        
        // Fill rest with offspring
        while (newMinds.length < this.minds.length) {
            const parent1 = survivors[Math.floor(Math.random() * survivors.length)];
            const parent2 = survivors[Math.floor(Math.random() * survivors.length)];
            
            const x = 100 + Math.floor(newMinds.length / 4) * 100;
            const y = 50 + (newMinds.length % 4) * 50;
            
            newMinds.push({
                id: newMinds.length,
                x: x + (Math.random() - 0.5) * 30,
                y: y + (Math.random() - 0.5) * 30,
                ideas: [],
                creativity: this.crossover(parent1.creativity, parent2.creativity),
                influence: this.crossover(parent1.influence, parent2.influence),
                receptivity: this.crossover(parent1.receptivity, parent2.receptivity),
                ideaRetention: this.crossover(parent1.ideaRetention, parent2.ideaRetention),
                fitness: 0,
                generation: this.generation + 1,
                totalSpreadCount: 0
            });
        }
        
        this.minds = newMinds;
        
        // Preserve best ideas for next generation
        const bestIdeas = [...this.ideas].sort((a, b) => (b.spreadCount * b.value) - (a.spreadCount * a.value)).slice(0, 3);
        this.ideas = [];
        
        bestIdeas.forEach((oldIdea, i) => {
            const randomMind = this.minds[Math.floor(Math.random() * this.minds.length)];
            const idea = {
                id: i,
                originMind: randomMind.id,
                x: randomMind.x,
                y: randomMind.y,
                content: oldIdea.content,
                value: oldIdea.value * 0.9, // Slight decay
                spreadCount: 0,
                color: oldIdea.color,
                spreading: false,
                age: 0
            };
            randomMind.ideas.push(idea.id);
            this.ideas.push(idea);
        });
        
        this.generation++;
    }
    
    mutateValue(value) {
        if (Math.random() < this.mutationRate) {
            return Math.max(0.1, Math.min(1, value + (Math.random() - 0.5) * 0.2));
        }
        return value;
    }
    
    crossover(value1, value2) {
        const mixed = (value1 + value2) / 2 + (Math.random() - 0.5) * 0.1;
        return this.mutateValue(Math.max(0.1, Math.min(1, mixed)));
    }
    
    update() {
        this.frame++;
        this.generationTimer++;
        
        // Check for generation change
        if (this.generationTimer >= this.generationLength) {
            this.generationTimer = 0;
            this.evolveCulture();
        }
        
        // Spread ideas between connected minds
        if (this.frame % 20 === 0) {
            this.minds.forEach(mind => {
                // Find nearby minds
                this.minds.forEach(otherMind => {
                    if (mind.id === otherMind.id) return;
                    
                    const dist = Math.sqrt(
                        Math.pow(mind.x - otherMind.x, 2) + 
                        Math.pow(mind.y - otherMind.y, 2)
                    );
                    
                    if (dist < 150) {
                        // Share ideas based on influence and receptivity
                        mind.ideas.forEach(ideaId => {
                            const idea = this.ideas.find(i => i.id === ideaId);
                            if (idea && !otherMind.ideas.includes(ideaId)) {
                                // Probability based on sender influence, receiver receptivity, and idea value
                                const spreadProb = mind.influence * otherMind.receptivity * idea.value * 0.2;
                                
                                if (Math.random() < spreadProb) {
                                    // Spread idea
                                    otherMind.ideas.push(ideaId);
                                    idea.spreading = true;
                                    idea.spreadCount++;
                                    mind.totalSpreadCount++;
                                    
                                    // Visual connection
                                    this.connections.push({
                                        from: mind,
                                        to: otherMind,
                                        life: 30,
                                        color: idea.color,
                                        strength: idea.value
                                    });
                                    
                                    setTimeout(() => { idea.spreading = false; }, 500);
                                }
                            }
                        });
                    }
                });
                
                // Create new ideas based on creativity and existing ideas
                if (mind.ideas.length >= 2 && Math.random() < mind.creativity * 0.05 && this.ideas.length < 20) {
                    const parentIdeas = mind.ideas.slice(-2).map(id => this.ideas.find(i => i.id === id)).filter(i => i);
                    const avgValue = parentIdeas.reduce((sum, i) => sum + i.value, 0) / parentIdeas.length;
                    
                    const newIdea = {
                        id: this.ideas.length,
                        originMind: mind.id,
                        x: mind.x,
                        y: mind.y,
                        content: `Idea-${this.ideas.length}`,
                        value: Math.min(1, avgValue * (0.8 + Math.random() * 0.4)), // Inherit and vary value
                        spreadCount: 0,
                        color: `hsl(${Math.random() * 360}, 70%, 50%)`,
                        spreading: false,
                        age: 0
                    };
                    mind.ideas.push(newIdea.id);
                    this.ideas.push(newIdea);
                }
                
                // Forget old ideas based on retention
                if (mind.ideas.length > 5) {
                    const forgetProb = 1 - mind.ideaRetention;
                    mind.ideas = mind.ideas.filter(() => Math.random() > forgetProb * 0.1);
                }
            });
        }
        
        // Update connections
        this.connections = this.connections.filter(conn => {
            conn.life--;
            return conn.life > 0;
        });
        
        // Age and decay ideas
        this.ideas = this.ideas.filter(idea => {
            idea.age++;
            const mindsWithIdea = this.minds.filter(m => m.ideas.includes(idea.id)).length;
            return mindsWithIdea > 0 && idea.age < 500;
        });
        
        // Calculate current fitness
        this.calculateFitness();
        
        // Track fitness history
        if (this.frame % 30 === 0) {
            const avgFitness = this.minds.reduce((sum, m) => sum + m.fitness, 0) / this.minds.length;
            const maxFitness = Math.max(...this.minds.map(m => m.fitness));
            this.fitnessHistory.push({ avg: avgFitness, max: maxFitness });
            if (this.fitnessHistory.length > this.maxFitnessHistory) this.fitnessHistory.shift();
        }
    }
    
    draw() {
        this.clear();
        
        // Draw selection pressure indicator
        this.ctx.fillStyle = 'rgba(33, 150, 243, 0.1)';
        this.ctx.fillRect(0, 0, this.width, 30);
        this.ctx.fillStyle = '#2196f3';
        this.ctx.font = '12px sans-serif';
        this.ctx.fillText('SELECTION PRESSURE: Idea Spread & Cultural Influence', 10, 20);
        
        // Draw connections
        this.connections.forEach(conn => {
            const alpha = (conn.life / 30) * conn.strength;
            this.ctx.strokeStyle = conn.color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
            this.ctx.lineWidth = 1 + conn.strength * 2;
            this.ctx.beginPath();
            this.ctx.moveTo(conn.from.x, conn.from.y);
            this.ctx.lineTo(conn.to.x, conn.to.y);
            this.ctx.stroke();
        });
        
        // Draw minds
        this.minds.forEach(mind => {
            // Fitness glow
            if (mind.fitness > 0.3) {
                const glowRadius = 25 + mind.fitness * 20;
                const gradient = this.ctx.createRadialGradient(mind.x, mind.y, 0, mind.x, mind.y, glowRadius);
                gradient.addColorStop(0, `rgba(76, 175, 80, ${mind.fitness * 0.3})`);
                gradient.addColorStop(1, 'rgba(76, 175, 80, 0)');
                this.ctx.fillStyle = gradient;
                this.ctx.beginPath();
                this.ctx.arc(mind.x, mind.y, glowRadius, 0, Math.PI * 2);
                this.ctx.fill();
            }
            
            // Mind circle - size based on influence
            const mindSize = 15 + mind.influence * 10;
            this.ctx.fillStyle = `rgba(255, 255, 255, ${0.2 + mind.creativity * 0.3})`;
            this.ctx.strokeStyle = '#ffffff';
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.arc(mind.x, mind.y, mindSize, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.stroke();
            
            // Ideas in mind - orbiting
            const ideaCount = mind.ideas.length;
            if (ideaCount > 0) {
                mind.ideas.slice(0, 5).forEach((ideaId, i) => {
                    const idea = this.ideas.find(id => id.id === ideaId);
                    if (idea) {
                        const angle = (i / ideaCount) * Math.PI * 2 + this.frame * 0.02;
                        const orbitRadius = mindSize + 8;
                        
                        this.ctx.fillStyle = idea.color;
                        this.ctx.globalAlpha = 0.5 + idea.value * 0.5;
                        this.ctx.beginPath();
                        this.ctx.arc(
                            mind.x + Math.cos(angle) * orbitRadius,
                            mind.y + Math.sin(angle) * orbitRadius,
                            3 + idea.value * 3,
                            0,
                            Math.PI * 2
                        );
                        this.ctx.fill();
                    }
                });
            }
            
            this.ctx.globalAlpha = 1;
            
            // Show exceptional traits
            if (mind.creativity > 0.8) {
                this.ctx.strokeStyle = '#ffeb3b';
                this.ctx.lineWidth = 1;
                this.ctx.beginPath();
                this.ctx.arc(mind.x, mind.y, mindSize + 5, 0, Math.PI * 2);
                this.ctx.stroke();
            }
        });
        
        // Labels
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = '14px sans-serif';
        this.ctx.fillText('Cultural Evolution: Ideas → Minds → Ideas', 10, 45);
        this.ctx.fillText(`Generation: ${this.generation}`, this.width - 120, 25);
        
        this.ctx.font = '12px sans-serif';
        this.ctx.fillText(`Active Ideas: ${this.ideas.length}`, 10, 65);
        this.ctx.fillText(`Total Spreads: ${this.ideas.reduce((sum, i) => sum + i.spreadCount, 0)}`, 10, 80);
        this.ctx.fillText(`Selection Rate: ${(this.selectionPressure * 100).toFixed(0)}%`, 10, 95);
        
        // Average traits
        const avgCreativity = this.minds.reduce((sum, m) => sum + m.creativity, 0) / this.minds.length;
        const avgInfluence = this.minds.reduce((sum, m) => sum + m.influence, 0) / this.minds.length;
        const avgReceptivity = this.minds.reduce((sum, m) => sum + m.receptivity, 0) / this.minds.length;
        
        this.ctx.fillText(`Avg Creativity: ${avgCreativity.toFixed(2)}`, 10, 110);
        this.ctx.fillText(`Avg Influence: ${avgInfluence.toFixed(2)}`, 10, 125);
        this.ctx.fillText(`Avg Receptivity: ${avgReceptivity.toFixed(2)}`, 10, 140);
        
        // Draw fitness graph
        if (this.fitnessHistory.length > 1) {
            const avgFitness = this.minds.reduce((sum, m) => sum + m.fitness, 0) / this.minds.length;
            const maxFitness = Math.max(...this.minds.map(m => m.fitness));
            this.drawFitnessGraph(avgFitness, maxFitness);
        }
        
        // Legend
        this.ctx.font = '10px sans-serif';
        this.ctx.fillStyle = '#888';
        this.ctx.fillText('Green glow: fitness | Yellow ring: high creativity', 10, this.height - 25);
        this.ctx.fillText('Mind size: influence | Idea size: value', 10, this.height - 10);
    }
}

// Show recursion with simulator
function showRecursion(type) {
    const display = document.getElementById('recursionDisplay');
    const simulator = document.getElementById('recursionSimulator');
    const canvas = document.getElementById('recursionCanvas');
    
    // Stop current simulation
    if (currentSimulation) {
        currentSimulation.stop();
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
    }
    
    const recursions = {
        dna: {
            title: "🧬 DNA Recursion",
            steps: [
                "1. DNA contains instructions for making proteins",
                "2. Some of these proteins are enzymes that replicate DNA", 
                "3. These enzymes copy the DNA, including the instructions for making themselves",
                "4. New DNA can make new enzymes, continuing the cycle",
                "→ Information creates the machinery that copies information"
            ],
            SimulatorClass: DNASimulator
        },
        brain: {
            title: "🧠 Neural Recursion", 
            steps: [
                "1. Neural activity creates thoughts and mental states",
                "2. These thoughts influence which neural connections strengthen",
                "3. Stronger connections change future patterns of neural activity",
                "4. New activity patterns create new thoughts and behaviors",
                "→ The mind literally rewires itself based on its own activity"
            ],
            SimulatorClass: NeuralSimulator
        },
        evolution: {
            title: "🌱 Evolutionary Recursion",
            steps: [
                "1. Genes code for organisms with certain traits",
                "2. Some traits improve the organism's ability to survive and evolve",
                "3. These 'evolvability' traits get passed to offspring",
                "4. Offspring are better at evolving than their parents",
                "→ Evolution evolves its own ability to evolve"
            ],
            SimulatorClass: EvolutionSimulator
        },
        culture: {
            title: "🧑‍🤝‍🧑 Cultural Recursion",
            steps: [
                "1. Ideas exist in human minds and shape behavior",
                "2. Behaviors create new experiences and observations", 
                "3. New experiences generate new ideas and modify old ones",
                "4. Modified ideas change behavior in new ways",
                "→ Culture continuously recreates and transforms itself"
            ],
            SimulatorClass: CultureSimulator
        }
    };
    
    const recursion = recursions[type];
    display.innerHTML = `
        <h4 style="color: #4caf50; margin-bottom: 20px;">${recursion.title}</h4>
        ${recursion.steps.map(step => `<div style="margin: 10px 0; text-align: left;">${step}</div>`).join('')}
    `;
    
    // Show simulator
    simulator.style.display = 'block';
    currentSimulation = new recursion.SimulatorClass(canvas);
    
    // Animation loop
    function animate() {
        if (currentSimulation.running) {
            currentSimulation.update();
            currentSimulation.draw();
            animationId = requestAnimationFrame(animate);
        }
    }
    animate();
}

// Export function
window.showRecursion = showRecursion;