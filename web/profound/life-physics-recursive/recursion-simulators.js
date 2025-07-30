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
    }
    
    clear() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        this.ctx.fillRect(0, 0, this.width, this.height);
    }
    
    stop() {
        this.running = false;
    }
}

// DNA → Enzymes → DNA Simulator
class DNASimulator extends RecursionSimulator {
    constructor(canvas) {
        super(canvas);
        this.dnaStrands = [];
        this.enzymes = [];
        this.initDNA();
    }
    
    initDNA() {
        // Create initial DNA strands
        for (let i = 0; i < 3; i++) {
            this.dnaStrands.push({
                x: 100 + i * 150,
                y: this.height / 2,
                sequence: this.generateSequence(),
                replicating: false,
                age: 0
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
    
    update() {
        this.frame++;
        
        // Create enzymes from DNA
        this.dnaStrands.forEach(dna => {
            if (this.frame % 60 === 0 && Math.random() < 0.3) {
                this.enzymes.push({
                    x: dna.x,
                    y: dna.y,
                    targetX: dna.x + (Math.random() - 0.5) * 100,
                    targetY: dna.y + (Math.random() - 0.5) * 50,
                    type: 'polymerase',
                    active: true,
                    color: '#ff6b9d'
                });
            }
            dna.age++;
        });
        
        // Move enzymes
        this.enzymes.forEach((enzyme, index) => {
            if (!enzyme.active) return;
            
            // Move towards target
            enzyme.x += (enzyme.targetX - enzyme.x) * 0.05;
            enzyme.y += (enzyme.targetY - enzyme.y) * 0.05;
            
            // Check for DNA collision
            this.dnaStrands.forEach(dna => {
                const dist = Math.sqrt(Math.pow(enzyme.x - dna.x, 2) + Math.pow(enzyme.y - dna.y, 2));
                if (dist < 30 && !dna.replicating) {
                    // Start replication
                    dna.replicating = true;
                    enzyme.active = false;
                    
                    // Create new DNA after delay
                    setTimeout(() => {
                        if (this.dnaStrands.length < 10) {
                            this.dnaStrands.push({
                                x: dna.x + 50,
                                y: dna.y + (Math.random() - 0.5) * 30,
                                sequence: [...dna.sequence],
                                replicating: false,
                                age: 0
                            });
                        }
                        dna.replicating = false;
                    }, 1000);
                }
            });
            
            // Remove inactive enzymes
            if (!enzyme.active) {
                this.enzymes.splice(index, 1);
            }
        });
    }
    
    draw() {
        this.clear();
        
        // Draw DNA strands
        this.dnaStrands.forEach(dna => {
            this.drawDNA(dna);
        });
        
        // Draw enzymes
        this.enzymes.forEach(enzyme => {
            if (enzyme.active) {
                this.ctx.fillStyle = enzyme.color;
                this.ctx.beginPath();
                this.ctx.arc(enzyme.x, enzyme.y, 8, 0, Math.PI * 2);
                this.ctx.fill();
                
                // Label
                this.ctx.fillStyle = '#ffffff';
                this.ctx.font = '10px sans-serif';
                this.ctx.fillText('Enzyme', enzyme.x - 20, enzyme.y - 12);
            }
        });
        
        // Draw labels
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = '14px sans-serif';
        this.ctx.fillText('DNA → Enzymes → DNA Replication', 10, 20);
    }
    
    drawDNA(dna) {
        const startX = dna.x - 10;
        const startY = dna.y - 40;
        
        // Draw double helix
        this.ctx.strokeStyle = dna.replicating ? '#ffeb3b' : '#4caf50';
        this.ctx.lineWidth = 3;
        
        for (let i = 0; i < 20; i++) {
            const x1 = startX + Math.sin(i * 0.5) * 10;
            const x2 = startX - Math.sin(i * 0.5) * 10;
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
        
        // Label
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = '12px sans-serif';
        this.ctx.fillText('DNA', dna.x - 15, dna.y + 60);
        
        if (dna.replicating) {
            this.ctx.fillStyle = '#ffeb3b';
            this.ctx.fillText('Replicating...', dna.x - 30, dna.y + 75);
        }
    }
    
    getBaseColor(base) {
        const colors = { 'A': '#ff6b6b', 'T': '#4ecdc4', 'G': '#45b7d1', 'C': '#f7b731' };
        return colors[base] || '#ffffff';
    }
}

// Neural Recursion Simulator
class NeuralSimulator extends RecursionSimulator {
    constructor(canvas) {
        super(canvas);
        this.neurons = [];
        this.connections = [];
        this.thoughts = [];
        this.initNetwork();
    }
    
    initNetwork() {
        // Create neuron network
        const layers = 3;
        const neuronsPerLayer = 4;
        
        for (let layer = 0; layer < layers; layer++) {
            for (let n = 0; n < neuronsPerLayer; n++) {
                const x = 100 + layer * 150;
                const y = 50 + n * 50;
                
                this.neurons.push({
                    id: `${layer}-${n}`,
                    x: x,
                    y: y,
                    layer: layer,
                    activation: Math.random() * 0.5,
                    threshold: 0.5,
                    connections: []
                });
            }
        }
        
        // Create connections
        this.neurons.forEach((neuron, i) => {
            if (neuron.layer < 2) {
                // Connect to next layer
                this.neurons.forEach((target, j) => {
                    if (target.layer === neuron.layer + 1) {
                        this.connections.push({
                            from: i,
                            to: j,
                            weight: Math.random() * 0.5 + 0.5,
                            strengthening: false
                        });
                        neuron.connections.push(j);
                    }
                });
            }
        });
    }
    
    update() {
        this.frame++;
        
        // Propagate activation
        if (this.frame % 30 === 0) {
            // Random input activation
            this.neurons.forEach(neuron => {
                if (neuron.layer === 0) {
                    neuron.activation = Math.random();
                }
            });
            
            // Forward propagation
            for (let layer = 1; layer < 3; layer++) {
                this.neurons.forEach(neuron => {
                    if (neuron.layer === layer) {
                        let input = 0;
                        this.connections.forEach(conn => {
                            if (conn.to === this.neurons.indexOf(neuron)) {
                                input += this.neurons[conn.from].activation * conn.weight;
                            }
                        });
                        neuron.activation = this.sigmoid(input);
                    }
                });
            }
            
            // Create thought bubble
            const outputNeurons = this.neurons.filter(n => n.layer === 2);
            const activeOutputs = outputNeurons.filter(n => n.activation > 0.7);
            
            if (activeOutputs.length > 0) {
                this.thoughts.push({
                    x: 450,
                    y: 150,
                    text: `Pattern ${Math.floor(Math.random() * 100)}`,
                    life: 100
                });
                
                // Strengthen connections that led to this thought
                this.connections.forEach(conn => {
                    if (this.neurons[conn.to].activation > 0.7) {
                        conn.weight = Math.min(conn.weight * 1.1, 2);
                        conn.strengthening = true;
                        setTimeout(() => { conn.strengthening = false; }, 500);
                    }
                });
            }
        }
        
        // Update thoughts
        this.thoughts.forEach((thought, index) => {
            thought.life--;
            thought.y -= 0.5;
            if (thought.life <= 0) {
                this.thoughts.splice(index, 1);
            }
        });
    }
    
    sigmoid(x) {
        return 1 / (1 + Math.exp(-x));
    }
    
    draw() {
        this.clear();
        
        // Draw connections
        this.connections.forEach(conn => {
            const from = this.neurons[conn.from];
            const to = this.neurons[conn.to];
            
            this.ctx.strokeStyle = conn.strengthening ? '#ffeb3b' : `rgba(139, 195, 74, ${conn.weight})`;
            this.ctx.lineWidth = conn.weight * 2;
            this.ctx.beginPath();
            this.ctx.moveTo(from.x, from.y);
            this.ctx.lineTo(to.x, to.y);
            this.ctx.stroke();
        });
        
        // Draw neurons
        this.neurons.forEach(neuron => {
            const brightness = neuron.activation;
            this.ctx.fillStyle = `rgba(156, 39, 176, ${0.5 + brightness * 0.5})`;
            this.ctx.strokeStyle = '#9c27b0';
            this.ctx.lineWidth = 2;
            
            this.ctx.beginPath();
            this.ctx.arc(neuron.x, neuron.y, 15, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.stroke();
            
            // Activation indicator
            if (neuron.activation > 0.7) {
                this.ctx.fillStyle = '#ffeb3b';
                this.ctx.beginPath();
                this.ctx.arc(neuron.x, neuron.y, 5, 0, Math.PI * 2);
                this.ctx.fill();
            }
        });
        
        // Draw thoughts
        this.thoughts.forEach(thought => {
            this.ctx.fillStyle = `rgba(255, 255, 255, ${thought.life / 100})`;
            this.ctx.font = '14px sans-serif';
            this.ctx.fillText(thought.text, thought.x, thought.y);
            
            // Thought bubble
            this.ctx.strokeStyle = `rgba(255, 255, 255, ${thought.life / 100})`;
            this.ctx.beginPath();
            this.ctx.arc(thought.x - 10, thought.y - 5, 20, 0, Math.PI * 2);
            this.ctx.stroke();
        });
        
        // Labels
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = '14px sans-serif';
        this.ctx.fillText('Neural Network Self-Modification', 10, 20);
        this.ctx.font = '12px sans-serif';
        this.ctx.fillText('Input', 85, 35);
        this.ctx.fillText('Hidden', 230, 35);
        this.ctx.fillText('Output', 380, 35);
    }
}

// Evolution Simulator
class EvolutionSimulator extends RecursionSimulator {
    constructor(canvas) {
        super(canvas);
        this.organisms = [];
        this.generation = 0;
        this.initPopulation();
    }
    
    initPopulation() {
        for (let i = 0; i < 20; i++) {
            this.organisms.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                genome: this.randomGenome(),
                fitness: 0,
                age: 0,
                generation: 0,
                evolvability: Math.random() * 0.5
            });
        }
    }
    
    randomGenome() {
        return {
            size: 5 + Math.random() * 10,
            speed: 0.5 + Math.random() * 2,
            color: `hsl(${Math.random() * 60 + 60}, 70%, 50%)`,
            mutationRate: 0.1 + Math.random() * 0.2
        };
    }
    
    update() {
        this.frame++;
        
        // Move organisms
        this.organisms.forEach(org => {
            org.x += (Math.random() - 0.5) * org.genome.speed;
            org.y += (Math.random() - 0.5) * org.genome.speed;
            
            // Wrap around
            if (org.x < 0) org.x = this.width;
            if (org.x > this.width) org.x = 0;
            if (org.y < 0) org.y = this.height;
            if (org.y > this.height) org.y = 0;
            
            org.age++;
            
            // Calculate fitness (center preference)
            const distFromCenter = Math.sqrt(
                Math.pow(org.x - this.width/2, 2) + 
                Math.pow(org.y - this.height/2, 2)
            );
            org.fitness = 1 - (distFromCenter / (this.width/2));
        });
        
        // Reproduction
        if (this.frame % 120 === 0) {
            const parents = this.organisms
                .sort((a, b) => b.fitness - a.fitness)
                .slice(0, 10);
            
            // Create offspring
            const offspring = [];
            parents.forEach(parent => {
                if (offspring.length < 10) {
                    const child = {
                        x: parent.x + (Math.random() - 0.5) * 50,
                        y: parent.y + (Math.random() - 0.5) * 50,
                        genome: this.mutate(parent.genome, parent.evolvability),
                        fitness: 0,
                        age: 0,
                        generation: parent.generation + 1,
                        evolvability: parent.evolvability + (Math.random() - 0.5) * 0.1
                    };
                    offspring.push(child);
                }
            });
            
            // Replace old organisms
            this.organisms = [...parents, ...offspring];
            this.generation++;
        }
    }
    
    mutate(genome, evolvability) {
        const mutationStrength = genome.mutationRate * evolvability;
        return {
            size: genome.size + (Math.random() - 0.5) * mutationStrength * 5,
            speed: genome.speed + (Math.random() - 0.5) * mutationStrength,
            color: `hsl(${parseInt(genome.color.match(/\d+/)[0]) + (Math.random() - 0.5) * 20}, 70%, 50%)`,
            mutationRate: genome.mutationRate + (Math.random() - 0.5) * 0.05
        };
    }
    
    draw() {
        this.clear();
        
        // Draw target zone
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        this.ctx.beginPath();
        this.ctx.arc(this.width/2, this.height/2, 100, 0, Math.PI * 2);
        this.ctx.stroke();
        
        // Draw organisms
        this.organisms.forEach(org => {
            this.ctx.fillStyle = org.genome.color;
            this.ctx.globalAlpha = 0.7;
            this.ctx.beginPath();
            this.ctx.arc(org.x, org.y, org.genome.size, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Show evolvability
            if (org.evolvability > 0.5) {
                this.ctx.strokeStyle = '#ffeb3b';
                this.ctx.lineWidth = 2;
                this.ctx.beginPath();
                this.ctx.arc(org.x, org.y, org.genome.size + 3, 0, Math.PI * 2);
                this.ctx.stroke();
            }
        });
        
        // Stats
        this.ctx.globalAlpha = 1;
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = '14px sans-serif';
        this.ctx.fillText('Evolution of Evolvability', 10, 20);
        this.ctx.font = '12px sans-serif';
        this.ctx.fillText(`Generation: ${this.generation}`, 10, 40);
        
        const avgEvolvability = this.organisms.reduce((sum, org) => sum + org.evolvability, 0) / this.organisms.length;
        this.ctx.fillText(`Avg Evolvability: ${avgEvolvability.toFixed(2)}`, 10, 55);
    }
}

// Cultural Recursion Simulator
class CultureSimulator extends RecursionSimulator {
    constructor(canvas) {
        super(canvas);
        this.minds = [];
        this.ideas = [];
        this.connections = [];
        this.initCulture();
    }
    
    initCulture() {
        // Create minds in a network
        const gridSize = 4;
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                this.minds.push({
                    id: i * gridSize + j,
                    x: 100 + i * 100,
                    y: 50 + j * 50,
                    ideas: [],
                    creativity: Math.random(),
                    influence: Math.random()
                });
            }
        }
        
        // Create initial ideas
        for (let i = 0; i < 5; i++) {
            const mind = this.minds[Math.floor(Math.random() * this.minds.length)];
            const idea = {
                id: i,
                originMind: mind.id,
                x: mind.x,
                y: mind.y,
                content: `Idea-${i}`,
                strength: 1,
                color: `hsl(${Math.random() * 360}, 70%, 50%)`,
                spreading: false
            };
            mind.ideas.push(idea.id);
            this.ideas.push(idea);
        }
    }
    
    update() {
        this.frame++;
        
        // Spread ideas between connected minds
        if (this.frame % 30 === 0) {
            this.minds.forEach(mind => {
                // Find nearby minds
                this.minds.forEach(otherMind => {
                    if (mind.id === otherMind.id) return;
                    
                    const dist = Math.sqrt(
                        Math.pow(mind.x - otherMind.x, 2) + 
                        Math.pow(mind.y - otherMind.y, 2)
                    );
                    
                    if (dist < 150) {
                        // Share ideas
                        mind.ideas.forEach(ideaId => {
                            const idea = this.ideas.find(i => i.id === ideaId);
                            if (idea && !otherMind.ideas.includes(ideaId) && Math.random() < mind.influence) {
                                // Spread idea
                                otherMind.ideas.push(ideaId);
                                idea.spreading = true;
                                idea.strength += 0.2;
                                
                                // Visual connection
                                this.connections.push({
                                    from: mind,
                                    to: otherMind,
                                    life: 30,
                                    color: idea.color
                                });
                                
                                setTimeout(() => { idea.spreading = false; }, 500);
                            }
                        });
                    }
                });
                
                // Create new ideas based on combinations
                if (mind.ideas.length >= 2 && Math.random() < mind.creativity * 0.1) {
                    const newIdea = {
                        id: this.ideas.length,
                        originMind: mind.id,
                        x: mind.x,
                        y: mind.y,
                        content: `Idea-${this.ideas.length}`,
                        strength: 1,
                        color: `hsl(${Math.random() * 360}, 70%, 50%)`,
                        spreading: false
                    };
                    mind.ideas.push(newIdea.id);
                    this.ideas.push(newIdea);
                }
            });
        }
        
        // Update connections
        this.connections.forEach((conn, index) => {
            conn.life--;
            if (conn.life <= 0) {
                this.connections.splice(index, 1);
            }
        });
        
        // Decay weak ideas
        this.ideas.forEach((idea, index) => {
            const mindsWithIdea = this.minds.filter(m => m.ideas.includes(idea.id)).length;
            if (mindsWithIdea === 0) {
                this.ideas.splice(index, 1);
            }
        });
    }
    
    draw() {
        this.clear();
        
        // Draw connections
        this.connections.forEach(conn => {
            this.ctx.strokeStyle = conn.color + Math.floor(conn.life / 30 * 255).toString(16).padStart(2, '0');
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.moveTo(conn.from.x, conn.from.y);
            this.ctx.lineTo(conn.to.x, conn.to.y);
            this.ctx.stroke();
        });
        
        // Draw minds
        this.minds.forEach(mind => {
            // Mind circle
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
            this.ctx.strokeStyle = '#ffffff';
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.arc(mind.x, mind.y, 20, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.stroke();
            
            // Ideas in mind
            const ideaCount = mind.ideas.length;
            if (ideaCount > 0) {
                mind.ideas.slice(0, 3).forEach((ideaId, i) => {
                    const idea = this.ideas.find(id => id.id === ideaId);
                    if (idea) {
                        this.ctx.fillStyle = idea.color;
                        this.ctx.beginPath();
                        this.ctx.arc(
                            mind.x + Math.cos(i * 2) * 10,
                            mind.y + Math.sin(i * 2) * 10,
                            5,
                            0,
                            Math.PI * 2
                        );
                        this.ctx.fill();
                    }
                });
            }
            
            // Show creativity/influence
            if (mind.creativity > 0.7) {
                this.ctx.strokeStyle = '#ffeb3b';
                this.ctx.lineWidth = 1;
                this.ctx.beginPath();
                this.ctx.arc(mind.x, mind.y, 25, 0, Math.PI * 2);
                this.ctx.stroke();
            }
        });
        
        // Labels
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = '14px sans-serif';
        this.ctx.fillText('Cultural Evolution Through Idea Exchange', 10, 20);
        this.ctx.font = '12px sans-serif';
        this.ctx.fillText(`Active Ideas: ${this.ideas.length}`, 10, 40);
        this.ctx.fillText(`Connections: ${this.connections.length}`, 10, 55);
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