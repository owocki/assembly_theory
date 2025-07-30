// Possibility Cone Visualization
const canvas = document.getElementById('possibilityCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Visualization parameters
const params = {
    timeStart: 0,
    timeEnd: 13.8, // Billion years
    possibilityStart: 1000,
    possibilityEnd: 10,
    assemblyIndexMax: 1e15,
    currentTime: 0,
    animationSpeed: 0.05,
    paused: false
};

// Constraint forces - now act as horizontal bars that push down
const constraints = [
    {
        name: "Fundamental Constraints",
        color: "#3f51b5",
        strength: 0.3,
        timeStart: 0,
        timeEnd: 13.8,
        yPosition: 100, // Pixels from top
        description: "Physical laws eliminate impossible configurations",
        isDragging: false,
        minY: 50,
        maxY: 400
    },
    {
        name: "Assembly Filtering", 
        color: "#9c27b0",
        strength: 0.25,
        timeStart: 3,
        timeEnd: 13.8,
        yPosition: 150,
        description: "Only buildable structures survive",
        isDragging: false,
        minY: 50,
        maxY: 400
    },
    {
        name: "Temporal Selection",
        color: "#e91e63", 
        strength: 0.2,
        timeStart: 6,
        timeEnd: 13.8,
        yPosition: 200,
        description: "Time constraints filter unstable patterns",
        isDragging: false,
        minY: 50,
        maxY: 400
    },
    {
        name: "Causal Constraints",
        color: "#ff9800",
        strength: 0.25,
        timeStart: 9,
        timeEnd: 13.8,
        yPosition: 250,
        description: "Information flow requirements",
        isDragging: false,
        minY: 50,
        maxY: 400
    }
];

// Mouse interaction
let mouseX = 0;
let mouseY = 0;
let selectedConstraint = null;

canvas.addEventListener('mousedown', handleMouseDown);
canvas.addEventListener('mousemove', handleMouseMove);
canvas.addEventListener('mouseup', handleMouseUp);
canvas.addEventListener('mouseleave', handleMouseUp);

function handleMouseDown(e) {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
    
    // Check if clicking on a constraint bar
    const xScale = canvas.width / params.timeEnd;
    constraints.forEach(constraint => {
        const startX = constraint.timeStart * xScale;
        const endX = constraint.timeEnd * xScale;
        
        if (mouseX >= startX && mouseX <= endX && 
            Math.abs(mouseY - constraint.yPosition) < 15) {
            constraint.isDragging = true;
            selectedConstraint = constraint;
            canvas.style.cursor = 'ns-resize';
        }
    });
}

function handleMouseMove(e) {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
    
    // Update cursor
    let onConstraint = false;
    const xScale = canvas.width / params.timeEnd;
    constraints.forEach(constraint => {
        const startX = constraint.timeStart * xScale;
        const endX = constraint.timeEnd * xScale;
        
        if (mouseX >= startX && mouseX <= endX && 
            Math.abs(mouseY - constraint.yPosition) < 15) {
            onConstraint = true;
        }
    });
    
    if (onConstraint && !selectedConstraint) {
        canvas.style.cursor = 'ns-resize';
    } else if (!selectedConstraint) {
        canvas.style.cursor = 'default';
    }
    
    // Drag constraint
    if (selectedConstraint && selectedConstraint.isDragging) {
        selectedConstraint.yPosition = Math.max(
            selectedConstraint.minY,
            Math.min(selectedConstraint.maxY, mouseY)
        );
        
        // Update strength based on position - inverted so lower = stronger
        const normalizedPosition = (selectedConstraint.yPosition - selectedConstraint.minY) / 
                                  (selectedConstraint.maxY - selectedConstraint.minY);
        selectedConstraint.strength = 0.9 - (normalizedPosition * 0.85); // Strength from 0.05 to 0.9
    }
}

function handleMouseUp() {
    constraints.forEach(constraint => {
        constraint.isDragging = false;
    });
    selectedConstraint = null;
    canvas.style.cursor = 'default';
}

// Particles representing possible structures
const particles = [];
const particleCount = 500;

class Particle {
    constructor(time, possibility) {
        this.time = time;
        this.possibility = possibility;
        this.initialPossibility = possibility;
        this.assemblyIndex = 1;
        this.alive = true;
        this.color = this.getColor();
        this.velocity = {
            time: 0.02 + Math.random() * 0.03,
            possibility: (Math.random() - 0.5) * 2
        };
        this.trailPoints = [];
    }
    
    getColor() {
        const hue = 120 - (this.assemblyIndex / params.assemblyIndexMax) * 120; // Green to red
        return `hsla(${hue}, 70%, 50%, 0.6)`;
    }
    
    update() {
        if (!this.alive) return;
        
        // Store trail
        this.trailPoints.push({
            time: this.time,
            possibility: this.possibility
        });
        if (this.trailPoints.length > 20) {
            this.trailPoints.shift();
        }
        
        // Move forward in time
        this.time += this.velocity.time;
        
        // Get particle Y position in canvas coordinates
        const yScale = canvas.height / params.possibilityStart;
        const particleY = canvas.height - (this.possibility * yScale);
        
        // Apply constraints - they push particles down with much stronger force
        constraints.forEach(constraint => {
            if (this.time >= constraint.timeStart && this.time <= constraint.timeEnd) {
                // Check if particle is above the constraint bar
                if (particleY < constraint.yPosition) {
                    // Apply downward force based on distance to constraint
                    const distance = constraint.yPosition - particleY;
                    
                    // Much stronger exponential force
                    const force = constraint.strength * constraint.strength * Math.exp(-distance / 50);
                    
                    // Strong repulsion when very close
                    if (distance < 20) {
                        this.possibility -= force * 50; // Massive push
                        this.velocity.possibility = -Math.abs(this.velocity.possibility) - force * 10;
                    } else {
                        // Progressive push based on distance
                        this.possibility -= force * 15;
                        this.velocity.possibility -= force * 5;
                    }
                    
                    // Add violent turbulence near constraints
                    this.velocity.possibility += (Math.random() - 0.5) * force * 2;
                    
                    // Lateral drift based on assembly index
                    this.velocity.time *= (1 - force * 0.1);
                    
                    // Complex structures are affected more
                    const complexityFactor = Math.log10(this.assemblyIndex) / 15;
                    this.possibility -= force * complexityFactor * 10;
                }
            }
        });
        
        // Apply velocity dampening
        this.velocity.possibility *= 0.95;
        this.possibility += this.velocity.possibility;
        
        // Increase assembly index
        this.assemblyIndex *= 1.01 + Math.random() * 0.02;
        this.color = this.getColor();
        
        // Kill particles that go out of bounds or reach very low possibility
        if (this.possibility <= 0.1 || this.time > params.timeEnd || this.possibility > params.possibilityStart) {
            this.alive = false;
        }
    }
    
    draw(ctx, xScale, yScale) {
        if (!this.alive) return;
        
        const x = this.time * xScale;
        const y = canvas.height - (this.possibility * yScale);
        
        // Draw trail with varying opacity based on velocity
        ctx.strokeStyle = this.color;
        const speed = Math.abs(this.velocity.possibility);
        ctx.lineWidth = 1 + Math.min(speed * 0.1, 3);
        ctx.globalAlpha = 0.3 + Math.min(speed * 0.02, 0.5);
        ctx.beginPath();
        this.trailPoints.forEach((point, i) => {
            const tx = point.time * xScale;
            const ty = canvas.height - (point.possibility * yScale);
            if (i === 0) {
                ctx.moveTo(tx, ty);
            } else {
                ctx.lineTo(tx, ty);
            }
        });
        ctx.lineTo(x, y);
        ctx.stroke();
        
        // Draw particle - size based on assembly index
        const particleSize = 2 + Math.log10(this.assemblyIndex) * 0.5;
        ctx.globalAlpha = 0.8;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(x, y, particleSize, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw glow effect when moving fast
        if (speed > 10) {
            ctx.globalAlpha = 0.2;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(x, y, particleSize * 2, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}

// Initialize particles
function initParticles() {
    particles.length = 0;
    for (let i = 0; i < particleCount; i++) {
        const time = Math.random() * 2; // Start in first 2 billion years
        const possibility = params.possibilityStart * (0.7 + Math.random() * 0.3); // Start higher up
        particles.push(new Particle(time, possibility));
    }
}

// Draw possibility space background
function drawPossibilitySpace(ctx, xScale, yScale) {
    // Draw gradient background for possibility space
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, 'rgba(100, 150, 255, 0.1)');
    gradient.addColorStop(0.5, 'rgba(50, 100, 200, 0.05)');
    gradient.addColorStop(1, 'rgba(20, 50, 100, 0.02)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw possibility grid lines
    ctx.globalAlpha = 0.1;
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 1;
    
    // Horizontal lines (possibility levels)
    for (let p = 0; p <= params.possibilityStart; p += 100) {
        const y = canvas.height - (p * yScale);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
    
    // Vertical lines (time markers)
    for (let t = 0; t <= params.timeEnd; t += 1) {
        const x = t * xScale;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
}

// Draw constraint regions as horizontal bars
function drawConstraints(ctx, xScale, yScale) {
    constraints.forEach((constraint, index) => {
        const startX = constraint.timeStart * xScale;
        const endX = constraint.timeEnd * xScale;
        const y = constraint.yPosition;
        
        // Draw constraint bar with gradient - thickness based on strength
        const barThickness = 4 + constraint.strength * 20;
        const gradient = ctx.createLinearGradient(startX, y, endX, y);
        gradient.addColorStop(0, `${constraint.color}00`);
        gradient.addColorStop(0.1, `${constraint.color}${Math.floor(constraint.strength * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(0.9, `${constraint.color}${Math.floor(constraint.strength * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(1, `${constraint.color}00`);
        
        ctx.globalAlpha = 0.8 + constraint.strength * 0.2;
        ctx.strokeStyle = gradient;
        ctx.lineWidth = barThickness;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(startX, y);
        ctx.lineTo(endX, y);
        ctx.stroke();
        
        // Draw pressure field below constraint - stronger when constraint is stronger
        const pressureHeight = 50 + constraint.strength * 150;
        ctx.globalAlpha = 0.1 + constraint.strength * 0.2;
        const pressureGradient = ctx.createLinearGradient(0, y, 0, y + pressureHeight);
        pressureGradient.addColorStop(0, constraint.color);
        pressureGradient.addColorStop(0.5, `${constraint.color}88`);
        pressureGradient.addColorStop(1, `${constraint.color}00`);
        ctx.fillStyle = pressureGradient;
        ctx.fillRect(startX, y, endX - startX, pressureHeight);
        
        // Draw energy waves when constraint is strong
        if (constraint.strength > 0.5) {
            ctx.globalAlpha = (constraint.strength - 0.5) * 0.4;
            ctx.strokeStyle = constraint.color;
            ctx.lineWidth = 2;
            for (let wave = 1; wave < 4; wave++) {
                const waveY = y + wave * 20 * constraint.strength;
                const waveAmp = Math.sin(Date.now() * 0.001 * wave) * 5;
                ctx.beginPath();
                ctx.moveTo(startX, waveY + waveAmp);
                for (let x = startX; x <= endX; x += 10) {
                    const phase = (x - startX) / (endX - startX) * Math.PI * 4;
                    ctx.lineTo(x, waveY + Math.sin(phase + Date.now() * 0.002) * waveAmp);
                }
                ctx.stroke();
            }
        }
        
        // Draw constraint handle (for dragging)
        if (constraint.isDragging || (Math.abs(mouseY - y) < 15 && mouseX >= startX && mouseX <= endX)) {
            ctx.globalAlpha = 0.9;
            ctx.fillStyle = constraint.color;
            ctx.beginPath();
            ctx.arc((startX + endX) / 2, y, 10, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Draw label
        ctx.globalAlpha = 0.9;
        ctx.fillStyle = constraint.color;
        ctx.font = "14px sans-serif";
        ctx.fillText(constraint.name, startX + 10, y - 10);
        
        // Draw strength indicator
        ctx.font = "12px sans-serif";
        ctx.fillStyle = "#ffffff";
        ctx.fillText(`Strength: ${(constraint.strength * 100).toFixed(0)}%`, endX - 80, y - 10);
    });
}

// Draw axes
function drawAxes(ctx, xScale, yScale) {
    ctx.globalAlpha = 1;
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.font = "14px sans-serif";
    ctx.fillStyle = "#ffffff";
    
    // X-axis (Time)
    ctx.beginPath();
    ctx.moveTo(0, canvas.height);
    ctx.lineTo(canvas.width, canvas.height);
    ctx.stroke();
    
    // X-axis labels
    for (let t = 0; t <= params.timeEnd; t += 2) {
        const x = t * xScale;
        ctx.fillText(`${t} Gyr`, x - 20, canvas.height - 5);
    }
    
    // Y-axis (Possibility Space)
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, canvas.height);
    ctx.stroke();
    
    // Y-axis labels
    ctx.save();
    ctx.translate(15, canvas.height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("Possibility Space", -60, 0);
    ctx.restore();
}

// Draw assembly index scale
function drawAssemblyScale(ctx) {
    const scaleWidth = 200;
    const scaleHeight = 20;
    const x = canvas.width - scaleWidth - 20;
    const y = 20;
    
    // Draw gradient
    const gradient = ctx.createLinearGradient(x, y, x + scaleWidth, y);
    gradient.addColorStop(0, "hsl(120, 70%, 50%)");
    gradient.addColorStop(1, "hsl(0, 70%, 50%)");
    
    ctx.fillStyle = gradient;
    ctx.fillRect(x, y, scaleWidth, scaleHeight);
    
    // Draw labels
    ctx.fillStyle = "#ffffff";
    ctx.font = "12px sans-serif";
    ctx.fillText("Assembly Index", x + scaleWidth/2 - 40, y - 5);
    ctx.fillText("1", x - 10, y + 15);
    ctx.fillText(`10¹⁵`, x + scaleWidth - 20, y + 15);
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const xScale = canvas.width / params.timeEnd;
    const yScale = canvas.height / params.possibilityStart;
    
    // Draw components
    drawPossibilitySpace(ctx, xScale, yScale);
    
    // Update and draw particles
    particles.forEach(particle => {
        particle.update();
        particle.draw(ctx, xScale, yScale);
    });
    
    // Draw constraints on top of particles
    drawConstraints(ctx, xScale, yScale);
    
    // Remove dead particles and add new ones
    for (let i = particles.length - 1; i >= 0; i--) {
        if (!particles[i].alive) {
            particles.splice(i, 1);
        }
    }
    
    // Continuously add new particles
    if (particles.length < particleCount && Math.random() < 0.15) {
        const time = Math.random() * 2;
        const possibility = params.possibilityStart * (0.8 + Math.random() * 0.2); // Start very high
        particles.push(new Particle(time, possibility));
    }
    
    drawAxes(ctx, xScale, yScale);
    drawAssemblyScale(ctx);
    
    // Update current time
    params.currentTime += params.animationSpeed;
    if (params.currentTime > params.timeEnd) {
        params.currentTime = 0;
    }
    
    if (!params.paused) {
        requestAnimationFrame(animate);
    }
}

// Control functions
function startSimulation() {
    params.paused = false;
    animate();
}

function pauseSimulation() {
    params.paused = true;
}

function resetSimulation() {
    params.currentTime = 0;
    initParticles();
    params.paused = true;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const xScale = canvas.width / params.timeEnd;
    const yScale = canvas.height / params.possibilityStart;
    drawPossibilitySpace(ctx, xScale, yScale);
    drawConstraints(ctx, xScale, yScale);
    drawAxes(ctx, xScale, yScale);
    drawAssemblyScale(ctx);
}

// Initialize
initParticles();
startSimulation();

// Export functions for HTML buttons
window.startSimulation = startSimulation;
window.pauseSimulation = pauseSimulation;
window.resetSimulation = resetSimulation;