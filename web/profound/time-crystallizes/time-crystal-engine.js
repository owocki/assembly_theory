// Time Crystallization Engine - Shows how temporal processes become physical structures

class TimeCrystallizer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width = canvas.offsetWidth;
        this.height = canvas.height = canvas.offsetHeight;
        
        // Time flow parameters
        this.timeParticles = [];
        this.structures = [];
        this.bonds = [];
        
        // Animation state
        this.frame = 0;
        this.running = true;
        
        // Physics parameters
        this.gravity = 0.02;
        this.bondDistance = 30;
        this.bondStrength = 0.1;
        this.mergeDistance = 50;
        this.crystallizationThreshold = 5; // Particles needed to form structure
        
        // Time scales with labels
        this.timeScales = [
            { value: 0.2, color: '#ff6b6b', label: '1 ms' },
            { value: 0.4, color: '#ff9f40', label: '1 s' },
            { value: 0.6, color: '#ffeb3b', label: '1 min' },
            { value: 0.8, color: '#4caf50', label: '1 hour' },
            { value: 1.0, color: '#2196f3', label: '1 day' }
        ];
        
        this.init();
    }
    
    init() {
        // Start with some initial time particles
        this.spawnTimeParticles();
    }
    
    spawnTimeParticles() {
        // Continuously spawn time particles forever
        if (this.frame % 8 === 0) {
            const scale = this.timeScales[Math.floor(Math.random() * this.timeScales.length)];
            
            this.timeParticles.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height * 0.3, // Spawn in upper third
                vx: (Math.random() - 0.5) * 2,
                vy: Math.random() * 0.5 + 0.5,
                age: 0,
                timeScale: scale,
                timeValue: scale.value * (Math.random() * 50 + 50),
                color: scale.color,
                label: scale.label,
                size: 4 + scale.value * 2,
                bonds: [],
                structure: null,
                crystallizing: false
            });
        }
    }
    
    update() {
        this.frame++;
        this.spawnTimeParticles();
        
        // Update time particles
        for (let i = 0; i < this.timeParticles.length; i++) {
            const particle = this.timeParticles[i];
            if (particle.structure) continue; // Skip if already in structure
            
            particle.age++;
            
            // Apply gravity
            particle.vy += this.gravity;
            
            // Check for nearby particles to bond with
            for (let j = i + 1; j < this.timeParticles.length; j++) {
                const other = this.timeParticles[j];
                if (other.structure) continue;
                
                const dx = other.x - particle.x;
                const dy = other.y - particle.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                // Create bonds between nearby particles of similar time scales
                if (dist < this.bondDistance && !particle.bonds.includes(j) && !other.bonds.includes(i)) {
                    const timeDiff = Math.abs(particle.timeScale.value - other.timeScale.value);
                    if (timeDiff < 0.4 || Math.random() < 0.2) { // Similar scales or random chance
                        particle.bonds.push(j);
                        other.bonds.push(i);
                        
                        // Apply bonding force
                        const force = this.bondStrength;
                        particle.vx += dx * force;
                        particle.vy += dy * force;
                        other.vx -= dx * force;
                        other.vy -= dy * force;
                    }
                }
                
                // Repulsion at very close range
                if (dist < this.bondDistance * 0.5 && dist > 0) {
                    const repel = 0.5 / dist;
                    particle.vx -= dx * repel;
                    particle.vy -= dy * repel;
                    other.vx += dx * repel;
                    other.vy += dy * repel;
                }
            }
            
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Apply damping
            particle.vx *= 0.98;
            particle.vy *= 0.98;
            
            // Bounce off walls
            if (particle.x < particle.size || particle.x > this.width - particle.size) {
                particle.vx *= -0.8;
                particle.x = Math.max(particle.size, Math.min(this.width - particle.size, particle.x));
            }
            if (particle.y > this.height - particle.size) {
                particle.vy *= -0.8;
                particle.y = this.height - particle.size;
            }
            
            // Remove particles that fall off the bottom or are very old and unbonded
            if (particle.y > this.height + 100 || (particle.age > 2000 && particle.bonds.length === 0)) {
                // Clean up bonds from other particles
                this.timeParticles.forEach((other, j) => {
                    if (other.bonds.includes(i)) {
                        other.bonds = other.bonds.filter(b => b !== i);
                    }
                });
                this.timeParticles.splice(i, 1);
                i--;
            }
        }
        
        // Check for crystallization opportunities
        this.checkCrystallization();
        
        // Update structures
        this.structures.forEach((structure, idx) => {
            structure.age++;
            
            // Structure movement
            structure.vx *= 0.99;
            structure.vy *= 0.99;
            structure.x += structure.vx;
            structure.y += structure.vy;
            
            // Bounce structures off walls
            if (structure.x < 50 || structure.x > this.width - 50) {
                structure.vx *= -0.8;
            }
            if (structure.y > this.height - 50) {
                structure.vy *= -0.8;
                structure.y = this.height - 50;
            }
            
            // Apply slight gravity to structures
            structure.vy += this.gravity * 0.5;
            
            // Remove very old structures to keep simulation running forever
            if (structure.age > 3000 && this.structures.length > 5) {
                // Release particles back to free state
                structure.particles.forEach(pIdx => {
                    const particle = this.timeParticles[pIdx];
                    if (particle) {
                        particle.structure = null;
                        particle.crystallizing = false;
                        particle.bonds = [];
                        particle.vx = (Math.random() - 0.5) * 2;
                        particle.vy = -Math.random() * 2; // Send upward
                    }
                });
                this.structures.splice(idx, 1);
                return;
            }
            
            // Check for structure merging
            for (let j = idx + 1; j < this.structures.length; j++) {
                const other = this.structures[j];
                const dx = other.x - structure.x;
                const dy = other.y - structure.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < this.mergeDistance && Math.random() < 0.02) {
                    // Merge structures
                    this.mergeStructures(structure, other);
                    this.structures.splice(j, 1);
                    break;
                }
            }
            
            // Update particle positions relative to structure
            structure.particles.forEach(p => {
                const particle = this.timeParticles[p];
                if (particle) {
                    particle.x = structure.x + particle.relX;
                    particle.y = structure.y + particle.relY;
                }
            });
        });
    }
    
    checkCrystallization() {
        // Find groups of bonded particles that can crystallize
        const visited = new Set();
        
        for (let i = 0; i < this.timeParticles.length; i++) {
            if (visited.has(i) || this.timeParticles[i].structure) continue;
            
            const cluster = this.findCluster(i, visited);
            
            if (cluster.length >= this.crystallizationThreshold) {
                // Create a new structure from this cluster
                this.crystallizeCluster(cluster);
            }
        }
    }
    
    findCluster(startIdx, visited) {
        const cluster = [startIdx];
        const toVisit = [startIdx];
        visited.add(startIdx);
        
        while (toVisit.length > 0) {
            const idx = toVisit.pop();
            const particle = this.timeParticles[idx];
            
            particle.bonds.forEach(bondIdx => {
                if (!visited.has(bondIdx) && this.timeParticles[bondIdx] && !this.timeParticles[bondIdx].structure) {
                    visited.add(bondIdx);
                    cluster.push(bondIdx);
                    toVisit.push(bondIdx);
                }
            });
        }
        
        return cluster;
    }
    
    crystallizeCluster(cluster) {
        // Calculate center of mass
        let cx = 0, cy = 0, totalTime = 0;
        cluster.forEach(idx => {
            const p = this.timeParticles[idx];
            cx += p.x;
            cy += p.y;
            totalTime += p.timeValue;
        });
        cx /= cluster.length;
        cy /= cluster.length;
        
        // Create structure
        const structure = {
            x: cx,
            y: cy,
            vx: 0,
            vy: 0,
            particles: cluster,
            totalTime: totalTime,
            age: 0,
            rotation: 0,
            rotationSpeed: (Math.random() - 0.5) * 0.02
        };
        
        // Set relative positions for particles
        cluster.forEach(idx => {
            const p = this.timeParticles[idx];
            p.structure = structure;
            p.relX = p.x - cx;
            p.relY = p.y - cy;
            p.crystallizing = true;
        });
        
        this.structures.push(structure);
    }
    
    mergeStructures(struct1, struct2) {
        // Combine particles
        struct2.particles.forEach(idx => {
            const p = this.timeParticles[idx];
            if (p) {
                p.structure = struct1;
                p.relX = struct2.x + p.relX - struct1.x;
                p.relY = struct2.y + p.relY - struct1.y;
                struct1.particles.push(idx);
            }
        });
        
        // Update properties
        struct1.totalTime += struct2.totalTime;
        
        // Apply collision physics
        const dx = struct2.x - struct1.x;
        const dy = struct2.y - struct1.y;
        struct1.vx -= dx * 0.01;
        struct1.vy -= dy * 0.01;
    }
    
    render() {
        // Clear with fade effect
        this.ctx.fillStyle = 'rgba(0, 4, 40, 0.05)';
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        // Draw bonds between particles
        this.ctx.strokeStyle = 'rgba(100, 200, 255, 0.2)';
        this.ctx.lineWidth = 1;
        
        this.timeParticles.forEach((particle, i) => {
            particle.bonds.forEach(bondIdx => {
                const other = this.timeParticles[bondIdx];
                if (other && bondIdx > i) { // Draw each bond only once
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(other.x, other.y);
                    this.ctx.stroke();
                }
            });
        });
        
        // Draw time particles
        this.timeParticles.forEach(particle => {
            this.ctx.globalAlpha = particle.crystallizing ? 1 : 0.8;
            
            // Particle glow
            if (particle.bonds.length > 0) {
                const glowRadius = particle.size + particle.bonds.length * 2;
                const glow = this.ctx.createRadialGradient(
                    particle.x, particle.y, 0,
                    particle.x, particle.y, glowRadius
                );
                glow.addColorStop(0, particle.color + '40');
                glow.addColorStop(1, 'transparent');
                
                this.ctx.fillStyle = glow;
                this.ctx.beginPath();
                this.ctx.arc(particle.x, particle.y, glowRadius, 0, Math.PI * 2);
                this.ctx.fill();
            }
            
            // Particle body
            this.ctx.fillStyle = particle.color;
            if (particle.crystallizing) {
                // Hexagonal shape for crystallized particles
                this.ctx.beginPath();
                for (let i = 0; i < 6; i++) {
                    const angle = (i / 6) * Math.PI * 2;
                    const x = particle.x + Math.cos(angle) * particle.size;
                    const y = particle.y + Math.sin(angle) * particle.size;
                    if (i === 0) this.ctx.moveTo(x, y);
                    else this.ctx.lineTo(x, y);
                }
                this.ctx.closePath();
                this.ctx.fill();
            } else {
                // Circle for flowing particles
                this.ctx.beginPath();
                this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                this.ctx.fill();
            }
            
            // Time trail for moving particles
            if (!particle.crystallizing && (Math.abs(particle.vx) > 0.1 || Math.abs(particle.vy) > 0.1)) {
                this.ctx.strokeStyle = particle.color + '40';
                this.ctx.lineWidth = 1;
                this.ctx.beginPath();
                this.ctx.moveTo(particle.x, particle.y);
                this.ctx.lineTo(particle.x - particle.vx * 5, particle.y - particle.vy * 5);
                this.ctx.stroke();
            }
        });
        
        // Draw structure info
        this.ctx.globalAlpha = 1;
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = '11px sans-serif';
        this.ctx.textAlign = 'center';
        
        this.structures.forEach(structure => {
            // Rotation effect
            this.ctx.save();
            this.ctx.translate(structure.x, structure.y);
            this.ctx.rotate(structure.rotation);
            structure.rotation += structure.rotationSpeed;
            
            // Draw structure boundary
            const radius = Math.sqrt(structure.particles.length) * 15;
            this.ctx.strokeStyle = 'rgba(0, 210, 255, 0.3)';
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.arc(0, 0, radius, 0, Math.PI * 2);
            this.ctx.stroke();
            
            this.ctx.restore();
            
            // Structure label
            this.ctx.fillText(
                `${structure.totalTime.toFixed(0)} time units`,
                structure.x,
                structure.y - radius - 10
            );
            this.ctx.fillText(
                `${structure.particles.length} particles`,
                structure.x,
                structure.y - radius - 25
            );
        });
        
        // Info display
        this.ctx.textAlign = 'left';
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = '14px sans-serif';
        this.ctx.fillText('Emergent Time Crystallization', 10, 25);
        
        this.ctx.font = '12px sans-serif';
        this.ctx.fillText(`Free particles: ${this.timeParticles.filter(p => !p.structure).length}`, 10, 45);
        this.ctx.fillText(`Structures: ${this.structures.length}`, 10, 60);
        this.ctx.fillText(`Total time crystallized: ${this.structures.reduce((sum, s) => sum + s.totalTime, 0).toFixed(0)} units`, 10, 75);
        
        // Time scale legend
        this.ctx.font = '10px sans-serif';
        this.ctx.fillText('Time Scales:', this.width - 100, 15);
        
        this.timeScales.forEach((scale, i) => {
            this.ctx.fillStyle = scale.color;
            this.ctx.fillRect(this.width - 100, 25 + i * 15, 10, 10);
            this.ctx.fillStyle = '#ffffff';
            this.ctx.fillText(scale.label, this.width - 85, 33 + i * 15);
        });
    }
    
    animate() {
        if (this.running) {
            this.update();
            this.render();
            requestAnimationFrame(() => this.animate());
        }
    }
    
    stop() {
        this.running = false;
    }
    
    reset() {
        this.timeParticles = [];
        this.structures = [];
        this.bonds = [];
        this.frame = 0;
    }
}

// Export for use
window.TimeCrystallizer = TimeCrystallizer;