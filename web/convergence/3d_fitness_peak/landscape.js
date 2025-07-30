// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);
scene.fog = new THREE.Fog(0x000000, 50, 200);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(40, 30, 40);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minDistance = 15;
controls.maxDistance = 150;

// Lighting
const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(50, 50, 25);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 500;
scene.add(directionalLight);

const hemisphereLight = new THREE.HemisphereLight(0x4a9eff, 0x2c3e50, 0.4);
scene.add(hemisphereLight);

// Axes
const axesHelper = new THREE.AxesHelper(50);
scene.add(axesHelper);

// Create axis labels with sprites
function createAxisLabel(text, position) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 512;
    canvas.height = 128;
    
    context.font = 'bold 36px Arial';
    context.fillStyle = 'white';
    context.textAlign = 'center';
    context.fillText(text, 256, 64);
    
    const texture = new THREE.CanvasTexture(canvas);
    const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.position.copy(position);
    sprite.scale.set(15, 3.75, 1);
    
    scene.add(sprite);
}

// Create trait-based axis labels
createAxisLabel('Specialization →', new THREE.Vector3(45, 0, 0));
createAxisLabel('← Generalization', new THREE.Vector3(-45, 0, 0));
createAxisLabel('Overall Fitness ↑', new THREE.Vector3(0, 55, 0));
createAxisLabel('Processing Power →', new THREE.Vector3(0, 0, 45));
createAxisLabel('← Energy Efficiency', new THREE.Vector3(0, 0, -45));

// Add trait optimization grid
const gridSize = 80;
const gridDivisions = 10;
const gridHelper = new THREE.GridHelper(gridSize, gridDivisions, 0x444444, 0x222222);
gridHelper.rotation.x = Math.PI / 2;
scene.add(gridHelper);

// Add quadrant indicators
function createQuadrantLabel(text, position, color) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 256;
    canvas.height = 64;
    
    context.font = '24px Arial';
    context.fillStyle = color;
    context.textAlign = 'center';
    context.fillText(text, 128, 40);
    
    const texture = new THREE.CanvasTexture(canvas);
    const spriteMaterial = new THREE.SpriteMaterial({ 
        map: texture,
        transparent: true,
        opacity: 0.7
    });
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.position.copy(position);
    sprite.scale.set(12, 3, 1);
    
    scene.add(sprite);
}

// Add quadrant descriptions
createQuadrantLabel('Efficient Specialists', new THREE.Vector3(25, 1, -25), '#ff6b6b');
createQuadrantLabel('Power Specialists', new THREE.Vector3(25, 1, 25), '#4a9eff');
createQuadrantLabel('Efficient Generalists', new THREE.Vector3(-25, 1, -25), '#ff9ff3');
createQuadrantLabel('Power Generalists', new THREE.Vector3(-25, 1, 25), '#ffd93d');

// Fitness landscape parameters
const LANDSCAPE_SIZE = 80;
let RESOLUTION = 50;
let terrain, wireframeMesh;

// Define the trait optimization space
// X-axis: Specialization vs Generalization (-1 to 1)
// Z-axis: Energy Efficiency vs Processing Power (-1 to 1)
// Y-axis (height): Overall Fitness/Performance

const traitLabels = {
    x: { 
        negative: 'Generalization', 
        positive: 'Specialization',
        description: 'Trade-off between being a generalist vs specialist'
    },
    z: { 
        negative: 'Energy Efficiency', 
        positive: 'Processing Power',
        description: 'Trade-off between energy conservation vs computational capability'
    },
    y: {
        label: 'Overall Fitness',
        description: 'Combined performance measure'
    }
};

// Convergent solution peaks positioned based on trait optimization
const convergentSolutions = [
    // Vision systems - high specialization, moderate processing power
    { name: 'Vision (Camera Eye)', x: 0.7, z: 0.2, color: 0xff6b6b, type: 'vision', 
      traits: { specialization: 0.7, processing: 0.2, efficiency: -0.2 } },
    { name: 'Vision (Compound Eye)', x: 0.6, z: 0.4, color: 0xff6b6b, type: 'vision',
      traits: { specialization: 0.6, processing: 0.4, efficiency: -0.4 } },
    
    // Flight systems - high specialization, variable efficiency
    { name: 'Flight (Bird Wing)', x: 0.8, z: -0.3, color: 0x4a9eff, type: 'flight',
      traits: { specialization: 0.8, processing: -0.3, efficiency: 0.3 } },
    { name: 'Flight (Insect Wing)', x: 0.7, z: -0.1, color: 0x4a9eff, type: 'flight',
      traits: { specialization: 0.7, processing: -0.1, efficiency: 0.1 } },
    { name: 'Flight (Bat Wing)', x: 0.6, z: 0.1, color: 0x4a9eff, type: 'flight',
      traits: { specialization: 0.6, processing: 0.1, efficiency: -0.1 } },
    
    // Echolocation - very high processing power, specialized
    { name: 'Echolocation (Dolphins)', x: 0.5, z: 0.8, color: 0x51cf66, type: 'echolocation',
      traits: { specialization: 0.5, processing: 0.8, efficiency: -0.8 } },
    { name: 'Echolocation (Bats)', x: 0.6, z: 0.7, color: 0x51cf66, type: 'echolocation',
      traits: { specialization: 0.6, processing: 0.7, efficiency: -0.7 } },
    
    // Social networks - generalist, moderate processing
    { name: 'Social Networks (Ants)', x: -0.4, z: 0.3, color: 0xffd93d, type: 'social',
      traits: { specialization: -0.4, processing: 0.3, efficiency: -0.3 } },
    { name: 'Social Networks (Humans)', x: -0.2, z: 0.6, color: 0xffd93d, type: 'social',
      traits: { specialization: -0.2, processing: 0.6, efficiency: -0.6 } },
    
    // Photosynthesis - highly energy efficient, generalist
    { name: 'Photosynthesis (Plants)', x: -0.3, z: -0.8, color: 0xff9ff3, type: 'photosynthesis',
      traits: { specialization: -0.3, processing: -0.8, efficiency: 0.8 } },
    { name: 'Photosynthesis (Algae)', x: -0.1, z: -0.7, color: 0xff9ff3, type: 'photosynthesis',
      traits: { specialization: -0.1, processing: -0.7, efficiency: 0.7 } }
];

// Fitness function - creates peaks where convergent solutions exist
function fitnessFunction(x, z) {
    let fitness = 0;
    
    // Base landscape with some random variation
    fitness += 2 * Math.sin(x * 2) * Math.cos(z * 2);
    fitness += 1.5 * Math.sin(x * 4) * Math.sin(z * 3);
    fitness += 0.5 * Math.sin(x * 8) * Math.cos(z * 6);
    
    // Add peaks for convergent solutions
    convergentSolutions.forEach(solution => {
        const dx = x - solution.x;
        const dz = z - solution.z;
        const distance = Math.sqrt(dx * dx + dz * dz);
        
        // Gaussian peak with varying heights
        const peakHeight = solution.type === 'vision' ? 20 : 
                          solution.type === 'flight' ? 18 :
                          solution.type === 'echolocation' ? 16 :
                          solution.type === 'social' ? 15 : 14;
        
        const width = 0.15;
        fitness += peakHeight * Math.exp(-(distance * distance) / (2 * width * width));
    });
    
    // Add some valleys between peaks
    fitness -= 3 * Math.exp(-((x + 0.8) * (x + 0.8) + (z - 0.1) * (z - 0.1)) / 0.1);
    fitness -= 2 * Math.exp(-((x - 0.8) * (x - 0.8) + (z + 0.6) * (z + 0.6)) / 0.1);
    
    return Math.max(fitness, -5); // Minimum fitness floor
}

// Generate terrain
function generateTerrain() {
    if (terrain) scene.remove(terrain);
    if (wireframeMesh) scene.remove(wireframeMesh);
    
    const geometry = new THREE.PlaneGeometry(LANDSCAPE_SIZE, LANDSCAPE_SIZE, RESOLUTION, RESOLUTION);
    const vertices = geometry.attributes.position.array;
    
    // Apply fitness function to vertices
    for (let i = 0; i < vertices.length; i += 3) {
        const x = vertices[i] / LANDSCAPE_SIZE;
        const z = vertices[i + 2] / LANDSCAPE_SIZE;
        vertices[i + 1] = fitnessFunction(x, z);
    }
    
    geometry.attributes.position.needsUpdate = true;
    geometry.computeVertexNormals();
    
    // Create gradient material based on height
    const material = new THREE.ShaderMaterial({
        uniforms: {
            uTime: { value: 0 }
        },
        vertexShader: `
            varying vec3 vPosition;
            varying vec3 vNormal;
            varying float vElevation;
            
            void main() {
                vec4 modelPosition = modelMatrix * vec4(position, 1.0);
                vec4 viewPosition = viewMatrix * modelPosition;
                vec4 projectedPosition = projectionMatrix * viewPosition;
                
                vPosition = modelPosition.xyz;
                vNormal = normalize(normalMatrix * normal);
                vElevation = position.y;
                
                gl_Position = projectedPosition;
            }
        `,
        fragmentShader: `
            uniform float uTime;
            varying vec3 vPosition;
            varying vec3 vNormal;
            varying float vElevation;
            
            void main() {
                // Height-based coloring
                vec3 lowColor = vec3(0.1, 0.0, 0.2);      // Deep valleys - dark purple
                vec3 midColor = vec3(0.2, 0.1, 0.4);      // Mid elevation - purple
                vec3 highColor = vec3(0.8, 0.4, 0.1);     // Peaks - orange
                vec3 peakColor = vec3(1.0, 0.8, 0.2);     // Highest peaks - yellow
                
                float normalizedHeight = (vElevation + 5.0) / 25.0; // Normalize to 0-1
                
                vec3 color;
                if (normalizedHeight < 0.3) {
                    color = mix(lowColor, midColor, normalizedHeight / 0.3);
                } else if (normalizedHeight < 0.7) {
                    color = mix(midColor, highColor, (normalizedHeight - 0.3) / 0.4);
                } else {
                    color = mix(highColor, peakColor, (normalizedHeight - 0.7) / 0.3);
                }
                
                // Add some dynamic lighting based on normal
                float lightIntensity = dot(vNormal, normalize(vec3(1.0, 1.0, 0.5)));
                color *= (0.7 + 0.3 * lightIntensity);
                
                // Add subtle time-based variation for peaks
                if (normalizedHeight > 0.8) {
                    float pulse = 0.9 + 0.1 * sin(uTime * 2.0 + vPosition.x + vPosition.z);
                    color *= pulse;
                }
                
                gl_FragColor = vec4(color, 1.0);
            }
        `
    });
    
    terrain = new THREE.Mesh(geometry, material);
    terrain.rotation.x = -Math.PI / 2;
    terrain.receiveShadow = true;
    scene.add(terrain);
    
    // Wireframe overlay
    const wireframeGeometry = geometry.clone();
    const wireframeMaterial = new THREE.MeshBasicMaterial({
        color: 0x444444,
        wireframe: true,
        transparent: true,
        opacity: 0.1
    });
    
    wireframeMesh = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    wireframeMesh.rotation.x = -Math.PI / 2;
    wireframeMesh.position.y = 0.01;
    scene.add(wireframeMesh);
}

// Peak markers
const peakMarkers = [];
function createPeakMarkers() {
    // Clear existing markers
    peakMarkers.forEach(marker => scene.remove(marker));
    peakMarkers.length = 0;
    
    convergentSolutions.forEach(solution => {
        const x = solution.x * LANDSCAPE_SIZE;
        const z = solution.z * LANDSCAPE_SIZE;
        const y = fitnessFunction(solution.x, solution.z) + 2;
        
        // Create marker geometry
        const geometry = new THREE.ConeGeometry(1.5, 4, 8);
        const material = new THREE.MeshPhongMaterial({
            color: solution.color,
            emissive: solution.color,
            emissiveIntensity: 0.3,
            transparent: true,
            opacity: 0.9
        });
        
        const marker = new THREE.Mesh(geometry, material);
        marker.position.set(x, y, z);
        marker.userData = solution;
        marker.castShadow = true;
        
        // Add glow ring
        const ringGeometry = new THREE.RingGeometry(2, 3, 16);
        const ringMaterial = new THREE.MeshBasicMaterial({
            color: solution.color,
            transparent: true,
            opacity: 0.3,
            side: THREE.DoubleSide
        });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.rotation.x = -Math.PI / 2;
        ring.position.set(x, 0.1, z);
        
        scene.add(marker);
        scene.add(ring);
        peakMarkers.push(marker, ring);
    });
}

// Evolution paths and organisms
const evolutionPaths = [];
const organismDots = [];
let pathsVisible = true;
let organismsVisible = true;

// Organism data for different evolutionary lineages
const organismData = {
    vision: [
        { name: 'Light-sensitive spot', stage: 0.1, fitness: 2, description: 'Simple photoreceptive cells' },
        { name: 'Eye cup', stage: 0.3, fitness: 6, description: 'Curved photoreceptive surface' },
        { name: 'Pinhole eye', stage: 0.5, fitness: 10, description: 'Small aperture for directional vision' },
        { name: 'Lens eye', stage: 0.7, fitness: 14, description: 'Crystalline lens for focusing' },
        { name: 'Camera eye', stage: 0.9, fitness: 18, description: 'Complex vertebrate/cephalopod eye' },
        { name: 'Compound eye', stage: 0.95, fitness: 17, description: 'Arthropod multi-lens system' }
    ],
    flight: [
        { name: 'Gliding membrane', stage: 0.2, fitness: 4, description: 'Simple gliding adaptation' },
        { name: 'Proto-wing', stage: 0.4, fitness: 8, description: 'Early wing-like structures' },
        { name: 'Powered flight', stage: 0.6, fitness: 12, description: 'Active flight capability' },
        { name: 'Feathered wing', stage: 0.8, fitness: 16, description: 'Bird flight system' },
        { name: 'Membranous wing', stage: 0.85, fitness: 15, description: 'Bat flight system' },
        { name: 'Insect wing', stage: 0.9, fitness: 17, description: 'Articulated insect wings' }
    ],
    echolocation: [
        { name: 'Sound production', stage: 0.2, fitness: 3, description: 'Basic vocalization' },
        { name: 'Echo sensitivity', stage: 0.4, fitness: 7, description: 'Ability to hear echoes' },
        { name: 'Simple echolocation', stage: 0.6, fitness: 11, description: 'Basic biosonar' },
        { name: 'Precise biosonar', stage: 0.8, fitness: 15, description: 'Advanced dolphin sonar' },
        { name: 'Ultrasonic echolocation', stage: 0.9, fitness: 16, description: 'Bat ultrasonic system' }
    ],
    social: [
        { name: 'Basic aggregation', stage: 0.15, fitness: 2, description: 'Simple grouping behavior' },
        { name: 'Cooperative behavior', stage: 0.35, fitness: 6, description: 'Working together' },
        { name: 'Communication', stage: 0.55, fitness: 10, description: 'Information exchange' },
        { name: 'Division of labor', stage: 0.75, fitness: 13, description: 'Specialized roles' },
        { name: 'Complex societies', stage: 0.9, fitness: 15, description: 'Advanced social structures' }
    ],
    photosynthesis: [
        { name: 'Light absorption', stage: 0.1, fitness: 1, description: 'Simple light-sensitive molecules' },
        { name: 'Electron transport', stage: 0.3, fitness: 4, description: 'Basic photochemistry' },
        { name: 'Carbon fixation', stage: 0.5, fitness: 8, description: 'CO2 incorporation' },
        { name: 'Oxygenic photosynthesis', stage: 0.7, fitness: 12, description: 'Water-splitting system' },
        { name: 'Efficient photosystems', stage: 0.9, fitness: 14, description: 'Optimized light harvesting' }
    ]
};

// Create organism dots along paths
function createOrganismDots() {
    // Clear existing organisms
    organismDots.forEach(dot => scene.remove(dot));
    organismDots.length = 0;
    
    // Group solutions by type first
    const groupedSolutions = {};
    convergentSolutions.forEach(solution => {
        if (!groupedSolutions[solution.type]) {
            groupedSolutions[solution.type] = [];
        }
        groupedSolutions[solution.type].push(solution);
    });
    
    // Create dots for each evolutionary lineage
    Object.keys(groupedSolutions).forEach(type => {
        const solutions = groupedSolutions[type];
        const typeColor = solutions[0].color;
        const organisms = organismData[type] || [];
        
        solutions.forEach((solution, pathIndex) => {
            organisms.forEach(organism => {
                // Calculate position along path to peak
                const startX = (Math.random() - 0.5) * 1.5;
                const startZ = (Math.random() - 0.5) * 1.5;
                
                const endX = solution.x;
                const endZ = solution.z;
                
                // Position based on evolutionary stage
                const t = organism.stage;
                const x = startX + (endX - startX) * t;
                const z = startZ + (endZ - startZ) * t;
                const y = fitnessFunction(x, z) + 1;
                
                // Create organism dot
                const dotSize = 0.3 + (organism.fitness / 20) * 0.5; // Size based on fitness
                const geometry = new THREE.SphereGeometry(dotSize, 8, 6);
                
                // Color based on evolutionary stage and type
                const stageIntensity = 0.5 + organism.stage * 0.5;
                const material = new THREE.MeshPhongMaterial({
                    color: new THREE.Color().setHex(typeColor).multiplyScalar(stageIntensity),
                    emissive: new THREE.Color().setHex(typeColor).multiplyScalar(0.2),
                    transparent: true,
                    opacity: 0.8
                });
                
                const dot = new THREE.Mesh(geometry, material);
                dot.position.set(x * LANDSCAPE_SIZE, y, z * LANDSCAPE_SIZE);
                
                // Store organism data
                dot.userData = {
                    ...organism,
                    type: type,
                    pathIndex: pathIndex,
                    position: { x, z }
                };
                
                dot.castShadow = true;
                organismDots.push(dot);
                scene.add(dot);
                
                // Add subtle glow for more advanced organisms
                if (organism.stage > 0.7) {
                    const glowGeometry = new THREE.SphereGeometry(dotSize * 1.5, 8, 6);
                    const glowMaterial = new THREE.MeshBasicMaterial({
                        color: typeColor,
                        transparent: true,
                        opacity: 0.1
                    });
                    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
                    glow.position.copy(dot.position);
                    organismDots.push(glow);
                    scene.add(glow);
                }
            });
        });
    });
}

function createEvolutionPaths() {
    // Clear existing paths
    evolutionPaths.forEach(path => scene.remove(path));
    evolutionPaths.length = 0;
    
    // Group solutions by type for convergent paths
    const groupedSolutions = {};
    convergentSolutions.forEach(solution => {
        if (!groupedSolutions[solution.type]) {
            groupedSolutions[solution.type] = [];
        }
        groupedSolutions[solution.type].push(solution);
    });
    
    // Create paths for each type showing convergent evolution
    Object.keys(groupedSolutions).forEach(type => {
        const solutions = groupedSolutions[type];
        const typeColor = solutions[0].color;
        
        solutions.forEach((solution, index) => {
            // Create a path from a random starting point to the peak
            const startX = (Math.random() - 0.5) * 1.5;
            const startZ = (Math.random() - 0.5) * 1.5;
            const startY = fitnessFunction(startX, startZ);
            
            const endX = solution.x;
            const endZ = solution.z;
            const endY = fitnessFunction(solution.x, solution.z);
            
            // Create intermediate points following gradient ascent
            const pathPoints = [];
            const steps = 20;
            
            for (let i = 0; i <= steps; i++) {
                const t = i / steps;
                const x = startX + (endX - startX) * t;
                const z = startZ + (endZ - startZ) * t;
                
                // Add some noise to make paths more realistic
                const noise = 0.1 * Math.sin(t * Math.PI * 4) * (1 - t);
                const y = fitnessFunction(x, z) + noise + 0.5;
                
                pathPoints.push(new THREE.Vector3(
                    x * LANDSCAPE_SIZE,
                    y,
                    z * LANDSCAPE_SIZE
                ));
            }
            
            // Create path curve
            const curve = new THREE.CatmullRomCurve3(pathPoints);
            const points = curve.getPoints(50);
            
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const material = new THREE.LineBasicMaterial({
                color: typeColor,
                opacity: 0.8,
                transparent: true,
                linewidth: 3
            });
            
            const path = new THREE.Line(geometry, material);
            evolutionPaths.push(path);
            scene.add(path);
        });
    });
}

// Mouse interaction
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const tooltip = document.getElementById('tooltip');

function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    raycaster.setFromCamera(mouse, camera);
    
    // Check for organism dots first (they're smaller and might be hidden by peaks)
    const organismIntersects = raycaster.intersectObjects(
        organismDots.filter(dot => dot.geometry.type === 'SphereGeometry' && dot.userData.name)
    );
    
    if (organismIntersects.length > 0) {
        const organism = organismIntersects[0].object.userData;
        tooltip.innerHTML = `
            <h4>${organism.name}</h4>
            <p><strong>Type:</strong> ${organism.type}</p>
            <p><strong>Stage:</strong> ${(organism.stage * 100).toFixed(0)}% evolved</p>
            <p><strong>Fitness:</strong> ${organism.fitness}</p>
            <p><strong>Description:</strong> ${organism.description}</p>
        `;
        tooltip.style.display = 'block';
        tooltip.style.left = event.clientX + 15 + 'px';
        tooltip.style.top = event.clientY + 15 + 'px';
        return;
    }
    
    // Check for peak markers
    const peakIntersects = raycaster.intersectObjects(peakMarkers.filter(m => m.geometry.type === 'ConeGeometry'));
    
    if (peakIntersects.length > 0) {
        const solution = peakIntersects[0].object.userData;
        const traits = solution.traits;
        tooltip.innerHTML = `
            <h4>${solution.name}</h4>
            <p><strong>Type:</strong> ${solution.type}</p>
            <p><strong>Fitness:</strong> ${fitnessFunction(solution.x, solution.z).toFixed(1)}</p>
            <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #333;">
                <p><strong>Trait Optimization:</strong></p>
                <p>Specialization: ${traits.specialization > 0 ? '+' : ''}${(traits.specialization * 100).toFixed(0)}%</p>
                <p>Processing Power: ${traits.processing > 0 ? '+' : ''}${(traits.processing * 100).toFixed(0)}%</p>
                <p>Energy Efficiency: ${traits.efficiency > 0 ? '+' : ''}${(traits.efficiency * 100).toFixed(0)}%</p>
            </div>
        `;
        tooltip.style.display = 'block';
        tooltip.style.left = event.clientX + 15 + 'px';
        tooltip.style.top = event.clientY + 15 + 'px';
    } else {
        tooltip.style.display = 'none';
    }
}

window.addEventListener('mousemove', onMouseMove);

// Animation
const clock = new THREE.Clock();
let animationId;

function animate() {
    animationId = requestAnimationFrame(animate);
    
    const elapsedTime = clock.getElapsedTime();
    
    // Update terrain shader
    if (terrain && terrain.material.uniforms) {
        terrain.material.uniforms.uTime.value = elapsedTime;
    }
    
    // Animate peak markers
    peakMarkers.forEach((marker, index) => {
        if (marker.geometry.type === 'ConeGeometry') {
            const scale = 1 + 0.1 * Math.sin(elapsedTime * 2 + index);
            marker.scale.y = scale;
            
            // Rotate markers
            marker.rotation.y = elapsedTime * 0.5 + index;
        }
    });
    
    // Animate organism dots
    organismDots.forEach((dot, index) => {
        if (dot.geometry && dot.geometry.type === 'SphereGeometry' && dot.userData.name) {
            // Subtle pulsing based on fitness
            const pulseFactor = 1 + (dot.userData.fitness / 100) * Math.sin(elapsedTime * 3 + index * 0.1);
            dot.scale.setScalar(pulseFactor);
            
            // Advanced organisms get more pronounced animation
            if (dot.userData.stage > 0.7) {
                const bob = 0.5 * Math.sin(elapsedTime * 2 + index * 0.2);
                dot.position.y = fitnessFunction(dot.userData.position.x, dot.userData.position.z) + 1 + bob;
            }
        }
    });
    
    controls.update();
    renderer.render(scene, camera);
}

// Controls
document.getElementById('resolution').addEventListener('input', (e) => {
    RESOLUTION = parseInt(e.target.value);
    generateTerrain();
    createPeakMarkers();
    createEvolutionPaths();
    createOrganismDots();
});

document.getElementById('togglePaths').addEventListener('click', () => {
    pathsVisible = !pathsVisible;
    evolutionPaths.forEach(path => {
        path.visible = pathsVisible;
    });
});

// Add organism toggle control
const toggleOrganismsBtn = document.createElement('button');
toggleOrganismsBtn.textContent = 'Toggle Organisms';
toggleOrganismsBtn.addEventListener('click', () => {
    organismsVisible = !organismsVisible;
    organismDots.forEach(dot => {
        dot.visible = organismsVisible;
    });
});
document.getElementById('controls').appendChild(toggleOrganismsBtn);

document.getElementById('toggleWireframe').addEventListener('click', () => {
    if (wireframeMesh) {
        wireframeMesh.visible = !wireframeMesh.visible;
    }
});

document.getElementById('resetCamera').addEventListener('click', () => {
    camera.position.set(40, 30, 40);
    controls.reset();
});

let pathAnimationRunning = false;
document.getElementById('animatePaths').addEventListener('click', () => {
    if (!pathAnimationRunning) {
        animatePathsGradually();
    }
});

function animatePathsGradually() {
    pathAnimationRunning = true;
    
    evolutionPaths.forEach((path, index) => {
        path.visible = false;
        setTimeout(() => {
            path.visible = pathsVisible;
            
            // Animate path drawing
            const originalGeometry = path.geometry;
            const points = originalGeometry.attributes.position.array;
            const animatedGeometry = new THREE.BufferGeometry();
            
            let currentPoint = 0;
            const totalPoints = points.length / 3;
            
            function drawNextSegment() {
                if (currentPoint < totalPoints) {
                    const visiblePoints = points.slice(0, (currentPoint + 1) * 3);
                    animatedGeometry.setAttribute('position', new THREE.Float32BufferAttribute(visiblePoints, 3));
                    path.geometry = animatedGeometry;
                    currentPoint++;
                    setTimeout(drawNextSegment, 50);
                } else {
                    path.geometry = originalGeometry;
                    if (index === evolutionPaths.length - 1) {
                        pathAnimationRunning = false;
                    }
                }
            }
            
            drawNextSegment();
        }, index * 200);
    });
}

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Initialize
generateTerrain();
createPeakMarkers();
createEvolutionPaths();
createOrganismDots();
animate();
