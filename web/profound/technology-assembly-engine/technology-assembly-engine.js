// Technology Is Life's Assembly Engine - Interactive Visualization

// Assembly space explorer functionality
function exploreSpace(type) {
    const display = document.getElementById('spaceDisplay');
    const spaces = {
        materials: {
            title: "🧪 Material Assembly Space",
            content: `
                <strong>Biology:</strong> 20 amino acids, 4 DNA bases, limited metals<br>
                <strong>Technology:</strong> All 118 elements, millions of alloys, polymers, composites<br><br>
                <em>Result:</em> Technology explores 10,000× more material combinations than biology ever could.
            `
        },
        energy: {
            title: "⚡ Energy Assembly Space",
            content: `
                <strong>Biology:</strong> ATP (~0.3 eV), sunlight, chemical gradients<br>
                <strong>Technology:</strong> Nuclear (MeV), laser (focused), plasma (10,000K)<br><br>
                <em>Result:</em> Technology accesses energy densities 1,000,000× greater than biology.
            `
        },
        scale: {
            title: "📏 Scale Assembly Space",
            content: `
                <strong>Biology:</strong> Nanometers (proteins) to meters (organisms)<br>
                <strong>Technology:</strong> Picometers (atomic) to kilometers (structures)<br><br>
                <em>Result:</em> Technology operates across 12 more orders of magnitude than biology.
            `
        },
        time: {
            title: "⏱️ Temporal Assembly Space",
            content: `
                <strong>Biology:</strong> Generations (years to decades for complex changes)<br>
                <strong>Technology:</strong> Iterations (hours to days for new designs)<br><br>
                <em>Result:</em> Technology explores assembly space 10,000× faster than evolution.
            `
        }
    };
    
    const space = spaces[type];
    display.innerHTML = `
        <h4 style="color: #00d4ff; margin-bottom: 15px;">${space.title}</h4>
        <p>${space.content}</p>
    `;
    
    // Add visual effect
    display.style.opacity = '0';
    setTimeout(() => {
        display.style.transition = 'opacity 0.5s ease';
        display.style.opacity = '1';
    }, 100);
}

// Timeline animation
document.addEventListener('DOMContentLoaded', function() {
    // Animate timeline nodes
    const nodes = document.querySelectorAll('.timeline-node');
    nodes.forEach((node, index) => {
        node.style.opacity = '0';
        node.style.transform = 'translateY(20px)';
        setTimeout(() => {
            node.style.transition = 'all 0.5s ease';
            node.style.opacity = '1';
            node.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    // Animate tech cards
    const cards = document.querySelectorAll('.tech-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.9)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
        }, 1000 + index * 100);
    });
    
    // Create particle effects for the technological speed meter
    createTechParticles();
});

// Create particle effects around the technological speed meter
function createTechParticles() {
    const techMeter = document.querySelector('.technological');
    if (!techMeter) return;
    
    const container = techMeter.parentElement;
    container.style.position = 'relative';
    
    // Create orbiting particles
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.backgroundColor = '#00d4ff';
        particle.style.borderRadius = '50%';
        particle.style.left = '60px';
        particle.style.top = '60px';
        particle.style.transform = 'translate(-50%, -50%)';
        particle.style.opacity = '0.8';
        
        container.appendChild(particle);
        
        // Animate in circular path
        const angle = (i / 8) * Math.PI * 2;
        const radius = 80;
        
        animateParticle(particle, angle, radius);
    }
}

function animateParticle(particle, startAngle, radius) {
    let angle = startAngle;
    const speed = 0.02 + Math.random() * 0.02;
    
    function update() {
        angle += speed;
        const x = 60 + Math.cos(angle) * radius;
        const y = 60 + Math.sin(angle) * radius;
        
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.opacity = 0.3 + Math.sin(angle * 2) * 0.3;
        
        requestAnimationFrame(update);
    }
    
    update();
}

// Interactive assembly comparison
let comparisonInterval;

function startComparison() {
    const bioMeter = document.querySelector('.biological');
    const techMeter = document.querySelector('.technological');
    
    if (!bioMeter || !techMeter) return;
    
    let bioProgress = 0;
    let techProgress = 0;
    
    comparisonInterval = setInterval(() => {
        // Biological progress (slow)
        bioProgress += 0.1;
        if (bioProgress > 100) bioProgress = 0;
        
        // Technological progress (fast)
        techProgress += 5;
        if (techProgress > 100) techProgress = 0;
        
        // Update visual indicators
        updateProgressIndicator(bioMeter, bioProgress, '#4caf50');
        updateProgressIndicator(techMeter, techProgress, '#00d4ff');
    }, 50);
}

function updateProgressIndicator(element, progress, color) {
    const angle = (progress / 100) * 360;
    element.style.background = `conic-gradient(${color} ${angle}deg, transparent ${angle}deg)`;
}

// Future vision hover effects
document.addEventListener('DOMContentLoaded', function() {
    const visionItems = document.querySelectorAll('.future-vision > div > div');
    
    visionItems.forEach(item => {
        item.style.cursor = 'pointer';
        item.style.transition = 'all 0.3s ease';
        item.style.padding = '10px';
        item.style.borderRadius = '10px';
        
        item.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'rgba(0, 212, 255, 0.2)';
            this.style.transform = 'scale(1.1)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'transparent';
            this.style.transform = 'scale(1)';
        });
        
        // Add click interaction
        item.addEventListener('click', function() {
            showFutureDetail(this.textContent);
        });
    });
});

function showFutureDetail(topic) {
    const details = {
        '🚀 Space Assembly': 'Building megastructures in zero gravity, asteroid mining, orbital factories—assembly without Earth\'s constraints.',
        '⚛️ Atomic Precision': 'Molecular assemblers arranging atoms individually, creating materials impossible through chemistry alone.',
        '🧠 Synthetic Consciousness': 'AI systems that design and build autonomously, exploring assembly spaces beyond human imagination.',
        '🌌 Stellar Engineering': 'Dyson spheres, stellar engines, manipulating stars themselves as assembly tools.',
        '🔮 Quantum Construction': 'Building with quantum states, creating structures that exist in superposition.',
        '♾️ Self-Replicating Systems': 'Von Neumann probes, grey goo scenarios, exponential assembly expansion.'
    };
    
    const detail = details[topic] || 'The future of assembly is limited only by physics, not biology.';
    
    // Create popup
    const popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
    popup.style.border = '2px solid #00d4ff';
    popup.style.borderRadius = '15px';
    popup.style.padding = '30px';
    popup.style.maxWidth = '500px';
    popup.style.zIndex = '1000';
    popup.style.boxShadow = '0 0 30px rgba(0, 212, 255, 0.5)';
    
    popup.innerHTML = `
        <h3 style="color: #00d4ff; margin-bottom: 15px;">${topic}</h3>
        <p style="color: white; line-height: 1.6;">${detail}</p>
        <button style="margin-top: 20px; padding: 10px 20px; background: #00d4ff; border: none; border-radius: 5px; color: black; cursor: pointer;" onclick="this.parentElement.remove()">Close</button>
    `;
    
    document.body.appendChild(popup);
}

// Start comparison animation on page load
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(startComparison, 2000);
});

// Evolution timeline interaction
document.querySelectorAll('.node-content').forEach(node => {
    node.addEventListener('click', function() {
        const title = this.querySelector('h3').textContent;
        const description = this.querySelector('p').textContent;
        
        // Highlight selected node
        document.querySelectorAll('.node-content').forEach(n => {
            n.style.border = '1px solid rgba(255, 255, 255, 0.1)';
        });
        this.style.border = '2px solid #00d4ff';
        
        // Show details
        showEvolutionDetail(title, description);
    });
});

function showEvolutionDetail(title, description) {
    const detailsPanel = document.createElement('div');
    detailsPanel.style.position = 'fixed';
    detailsPanel.style.bottom = '20px';
    detailsPanel.style.right = '20px';
    detailsPanel.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    detailsPanel.style.border = '1px solid #00d4ff';
    detailsPanel.style.borderRadius = '10px';
    detailsPanel.style.padding = '20px';
    detailsPanel.style.maxWidth = '300px';
    detailsPanel.style.animation = 'slideIn 0.3s ease';
    
    detailsPanel.innerHTML = `
        <h4 style="color: #00d4ff; margin-bottom: 10px;">${title}</h4>
        <p style="color: white; font-size: 14px;">${description}</p>
        <div style="margin-top: 15px; font-size: 12px; color: #888;">Click another stage to compare</div>
    `;
    
    // Remove existing panel
    const existing = document.querySelector('.evolution-detail-panel');
    if (existing) existing.remove();
    
    detailsPanel.className = 'evolution-detail-panel';
    document.body.appendChild(detailsPanel);
}

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);