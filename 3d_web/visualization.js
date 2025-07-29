// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0a0a0a);
scene.fog = new THREE.Fog(0x0a0a0a, 100, 500);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(50, 50, 50);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.getElementById('container').appendChild(renderer.domElement);

// Controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minDistance = 20;
controls.maxDistance = 200;

// Lighting
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(50, 50, 50);
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0x4a9eff, 0.5);
pointLight.position.set(-50, 50, 0);
scene.add(pointLight);

// Axes
const axesHelper = new THREE.AxesHelper(50);
scene.add(axesHelper);

// Grid
const gridHelper = new THREE.GridHelper(100, 20, 0x444444, 0x222222);
gridHelper.rotation.x = Math.PI / 2;
scene.add(gridHelper);

// Axis labels
const loader = new THREE.FontLoader();
const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

// Create axis labels with sprites
function createAxisLabel(text, position) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 256;
    canvas.height = 64;
    
    context.font = '48px Arial';
    context.fillStyle = 'white';
    context.textAlign = 'center';
    context.fillText(text, 128, 48);
    
    const texture = new THREE.CanvasTexture(canvas);
    const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.position.copy(position);
    sprite.scale.set(10, 2.5, 1);
    
    scene.add(sprite);
}

createAxisLabel('Assembly Index', new THREE.Vector3(55, 0, 0));
createAxisLabel('Time', new THREE.Vector3(0, 55, 0));
createAxisLabel('Performance', new THREE.Vector3(0, 0, 55));

// Assembly data structure
class AssemblyPoint {
    constructor(complexity, time, performance, type, name) {
        this.complexity = complexity;
        this.time = time;
        this.performance = performance;
        this.type = type;
        this.name = name;
        this.mesh = null;
    }
}

// Color mapping for different types
const typeColors = {
    biological: 0xff6b6b,
    technological: 0x4a9eff,
    cognitive: 0x51cf66,
    convergence: 0xffd93d
};

// Generate assembly points
const assemblyPoints = [];
const pathGroups = [];

// Biological evolution path
const bioPath = [
    new AssemblyPoint(5, 10, 15, 'biological', 'RNA World'),
    new AssemblyPoint(15, 20, 25, 'biological', 'First Cells'),
    new AssemblyPoint(25, 30, 35, 'biological', 'Photosynthesis'),
    new AssemblyPoint(35, 40, 45, 'biological', 'Eukaryotes'),
    new AssemblyPoint(45, 50, 60, 'biological', 'Multicellularity'),
    new AssemblyPoint(55, 60, 75, 'biological', 'Complex Life'),
    new AssemblyPoint(65, 70, 85, 'convergence', 'Vision Systems')
];

// Technological evolution path
const techPath = [
    new AssemblyPoint(10, 65, 20, 'technological', 'Stone Tools'),
    new AssemblyPoint(20, 68, 35, 'technological', 'Agriculture'),
    new AssemblyPoint(30, 70, 50, 'technological', 'Writing'),
    new AssemblyPoint(40, 72, 65, 'technological', 'Printing'),
    new AssemblyPoint(50, 74, 80, 'technological', 'Computers'),
    new AssemblyPoint(60, 76, 90, 'technological', 'Internet'),
    new AssemblyPoint(65, 78, 85, 'convergence', 'AI Vision')
];

// Cognitive evolution path
const cogPath = [
    new AssemblyPoint(15, 45, 30, 'cognitive', 'Basic Neurons'),
    new AssemblyPoint(25, 50, 40, 'cognitive', 'Simple Brains'),
    new AssemblyPoint(35, 55, 55, 'cognitive', 'Learning'),
    new AssemblyPoint(45, 60, 70, 'cognitive', 'Social Cognition'),
    new AssemblyPoint(55, 65, 80, 'cognitive', 'Language'),
    new AssemblyPoint(65, 70, 85, 'convergence', 'Pattern Recognition')
];

// Additional convergence points
const convergencePoints = [
    new AssemblyPoint(70, 50, 90, 'convergence', 'Flight'),
    new AssemblyPoint(60, 55, 88, 'convergence', 'Echolocation'),
    new AssemblyPoint(75, 60, 92, 'convergence', 'Social Networks'),
    new AssemblyPoint(80, 65, 95, 'convergence', 'Swarm Intelligence')
];

// Combine all paths
const allPaths = [bioPath, techPath, cogPath];
allPaths.forEach(path => {
    path.forEach(point => assemblyPoints.push(point));
});
convergencePoints.forEach(point => assemblyPoints.push(point));

// Create point meshes
assemblyPoints.forEach(point => {
    const geometry = new THREE.SphereGeometry(
        point.type === 'convergence' ? 2 : 1.5,
        32,
        16
    );
    const material = new THREE.MeshPhongMaterial({
        color: typeColors[point.type],
        emissive: typeColors[point.type],
        emissiveIntensity: 0.3,
        transparent: true,
        opacity: 0.8
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(point.complexity, point.time, point.performance);
    mesh.userData = point;
    point.mesh = mesh;
    scene.add(mesh);
    
    // Add glow effect for convergence points
    if (point.type === 'convergence') {
        const glowGeometry = new THREE.SphereGeometry(3, 32, 16);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: typeColors[point.type],
            transparent: true,
            opacity: 0.2
        });
        const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
        glowMesh.position.copy(mesh.position);
        scene.add(glowMesh);
    }
});

// Create paths between points
let pathsVisible = true;
allPaths.forEach((path, pathIndex) => {
    const pathGroup = new THREE.Group();
    
    for (let i = 0; i < path.length - 1; i++) {
        const start = path[i];
        const end = path[i + 1];
        
        // Create curved path
        const curve = new THREE.CatmullRomCurve3([
            new THREE.Vector3(start.complexity, start.time, start.performance),
            new THREE.Vector3(
                (start.complexity + end.complexity) / 2,
                (start.time + end.time) / 2,
                (start.performance + end.performance) / 2 + 5
            ),
            new THREE.Vector3(end.complexity, end.time, end.performance)
        ]);
        
        const points = curve.getPoints(50);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({
            color: typeColors[path[0].type],
            opacity: 0.6,
            transparent: true
        });
        
        const line = new THREE.Line(geometry, material);
        pathGroup.add(line);
    }
    
    pathGroups.push(pathGroup);
    scene.add(pathGroup);
});

// Raycaster for mouse interaction
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const tooltip = document.getElementById('tooltip');

function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(
        assemblyPoints.map(p => p.mesh).filter(m => m)
    );
    
    if (intersects.length > 0) {
        const point = intersects[0].object.userData;
        tooltip.innerHTML = `
            <strong>${point.name}</strong><br>
            Type: ${point.type}<br>
            Complexity: ${point.complexity}<br>
            Time: ${point.time}<br>
            Performance: ${point.performance}
        `;
        tooltip.style.display = 'block';
        tooltip.style.left = event.clientX + 10 + 'px';
        tooltip.style.top = event.clientY + 10 + 'px';
    } else {
        tooltip.style.display = 'none';
    }
}

window.addEventListener('mousemove', onMouseMove);

// Animation
let isRotating = true;
let clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    
    const delta = clock.getDelta();
    
    // Rotate camera around center
    if (isRotating) {
        const rotationSpeed = 0.1;
        camera.position.x = camera.position.x * Math.cos(rotationSpeed * delta) - 
                           camera.position.z * Math.sin(rotationSpeed * delta);
        camera.position.z = camera.position.x * Math.sin(rotationSpeed * delta) + 
                           camera.position.z * Math.cos(rotationSpeed * delta);
        camera.lookAt(0, 35, 35);
    }
    
    // Pulse convergence points
    assemblyPoints.forEach(point => {
        if (point.type === 'convergence' && point.mesh) {
            const scale = 1 + 0.1 * Math.sin(clock.getElapsedTime() * 2);
            point.mesh.scale.set(scale, scale, scale);
        }
    });
    
    controls.update();
    renderer.render(scene, camera);
}

// Controls
document.getElementById('rotateToggle').addEventListener('click', () => {
    isRotating = !isRotating;
});

document.getElementById('resetView').addEventListener('click', () => {
    camera.position.set(50, 50, 50);
    controls.reset();
});

document.getElementById('showPaths').addEventListener('click', () => {
    pathsVisible = !pathsVisible;
    pathGroups.forEach(group => {
        group.visible = pathsVisible;
    });
});

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start animation
animate();