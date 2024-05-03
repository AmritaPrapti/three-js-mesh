// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// // Vertex shader
// const vertexShader = `
//   varying vec2 vUv;

//   void main() {
//     vUv = uv;
//     vec3 pos = position;
//     pos.z += sin(pos.x * 10.0) * 0.1; // Example distortion effect
//     pos.z += sin(pos.y * 10.0) * 0.1; // Example distortion effect
//     gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
//   }
// `;

// // Fragment shader
// const fragmentShader = `
//   varying vec2 vUv;

//   void main() {
//     gl_FragColor = vec4(vUv, 0.5, 1.0); // Example color based on UV coordinates
//   }
// `;

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// camera.position.z = 5;

// const controls = new OrbitControls(camera, renderer.domElement);

// // Create geometry
// const geometry = new THREE.PlaneGeometry(5, 5, 10, 10);

// // Create shader material
// const material = new THREE.ShaderMaterial({
//   vertexShader,
//   fragmentShader,
//   wireframe: true,
//   side: THREE.DoubleSide
// });

// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

// function animate() {
//   requestAnimationFrame(animate);
//   renderer.render(scene, camera);
// }

// animate();


// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// // Vertex shader
// const vertexShader = `
//   varying vec2 vUv;

//   void main() {
//     vUv = uv;
//     vec3 pos = position;
//     gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
//   }
// `;

// // Fragment shader
// const fragmentShader = `
//   varying vec2 vUv;

//   void main() {
//     gl_FragColor = vec4(vUv, 0.5, 1.0); // Example color based on UV coordinates
//   }
// `;

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// camera.position.z = 0; // Set camera position to 0 for 2D view
// camera.position.y = 8; // Adjust camera position if needed to frame the scene nicely



// const controls = new OrbitControls(camera, renderer.domElement);

// controls.maxPolarAngle = Math.PI / 2; // Restrict vertical movement
// controls.minDistance = 0; // Set min distance to 0 to prevent zooming out
// controls.maxDistance = 10;

// // Create geometry
// const geometry = new THREE.PlaneGeometry(5, 5, 10, 10);

// // Create shader material
// const material = new THREE.ShaderMaterial({
//   vertexShader,
//   fragmentShader,
//   wireframe: true,
//   side: THREE.DoubleSide
// });

// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

// // Create control points
// const controlPoints = [];
// const controlMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// const controlGeometry = new THREE.SphereGeometry(0.1);

// geometry.vertices.forEach((vertex) => {
//   const point = new THREE.Mesh(controlGeometry, controlMaterial);
//   point.position.copy(vertex);
//   scene.add(point);
//   controlPoints.push(point);
// });

// // Variables for mouse dragging
// let raycaster = new THREE.Raycaster();
// let mouse = new THREE.Vector2();
// let selectedPoint = null;

// document.addEventListener('mousedown', onMouseDown);
// document.addEventListener('mousemove', onMouseMove);
// document.addEventListener('mouseup', onMouseUp);

// function onMouseDown(event) {
//     event.preventDefault();

//     mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//     mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

//     raycaster.setFromCamera(mouse, camera);

//     const intersects = raycaster.intersectObjects(controlPoints); // Only check for intersections with control points
//     if (intersects.length > 0) {
//       selectedPoint = intersects[0].object;
//     }
//   }

//   function onMouseMove(event) {
//     event.preventDefault();

//     if (selectedPoint !== null) {
//       mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//       mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

//       raycaster.setFromCamera(mouse, camera);

//       const intersects = raycaster.intersectObject(mesh); // Only check for intersection with the mesh for updating control point position
//       if (intersects.length > 0) {
//         const vertex = intersects[0].point;
//         selectedPoint.position.copy(vertex);
//         geometry.vertices[controlPoints.indexOf(selectedPoint)].copy(vertex);
//         geometry.verticesNeedUpdate = true;
//       }
//     }
//   }


// function onMouseUp(event) {
//   event.preventDefault();
//   selectedPoint = null;
// }

// function animate() {
//     requestAnimationFrame(animate);
//     // controls.update(); // Update controls in animation loop
//     renderer.render(scene, camera);
//   }

// animate();



import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import img from './asset/design-2.jpg';

const vertexShader = `
uniform float time;  // Uniform variable declaration

varying vec2 vUv;  // Declaration to pass UV to the fragment shader

void main() {
    vUv = uv;  // Pass UV coordinates to the fragment shader
    vec3 pos = position;
    // Initialize with no distortion
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

const fragmentShader = `
varying vec2 vUv;  // Must match the declaration in the vertex shader
uniform sampler2D texture;  // Texture uniform declaration

void main() {
    gl_FragColor = texture2D(texture, vUv);  // Use the UVs passed from the vertex shader
}

`;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);



// Load image texture
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load(img);

// Create plane geometry for image
const geometry = new THREE.PlaneGeometry(4, 4, 4, 4);
const wireframe = new THREE.WireframeGeometry(geometry);
const line = new THREE.LineSegments(wireframe, new THREE.LineBasicMaterial({ color: 0xffffff }));
scene.add(line);

// Create shader material with texture
const material = new THREE.ShaderMaterial({
    uniforms: {
        texture: { value: texture },
        time: { value: 0.0 }  // Correctly initialize the time uniform
    },
    vertexShader,
    fragmentShader
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);



// Create control points
const controlMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const controlGeometry = new THREE.SphereGeometry(0.1);
const controlPoints = [];

geometry.vertices.forEach((vertex) => {
    const point = new THREE.Mesh(controlGeometry, controlMaterial);
    point.position.copy(vertex);
    scene.add(point);
    controlPoints.push(point);
});

let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();
let selectedPoint = null;

document.addEventListener('mousedown', onMouseDown);
document.addEventListener('mousemove', onMouseMove);
document.addEventListener('mouseup', onMouseUp);

function onMouseDown(event) {
    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(controlPoints);
    if (intersects.length > 0) {
        selectedPoint = intersects[0].object;
    }
}

function onMouseMove(event) {
    event.preventDefault();

    if (selectedPoint !== null) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObject(mesh);
        if (intersects.length > 0) {
            const vertex = intersects[0].point;
            selectedPoint.position.copy(vertex);
            const index = controlPoints.indexOf(selectedPoint);
            geometry.vertices[index].copy(vertex);
            geometry.verticesNeedUpdate = true;
            texture.needsUpdate = true; // Update texture

            // Update vertex shader to apply distortion based on this vertex
            material.uniforms.time.value = index * 0.1;  // Example to use index as part of distortion effect
        }

        // Update vertex shader to apply distortion based on this vertex
        material.uniforms.time.value = selectedPoint.position.x;  // Example to use x position as part of distortion effect

        // Update LineSegments as well to match the updated vertices
        line.geometry.dispose(); // Dispose of the old geometry to prevent memory leaks
        line.geometry = new THREE.WireframeGeometry(geometry);
        line.geometry.verticesNeedUpdate = true;

    }
}




function onMouseUp(event) {
    event.preventDefault();
    selectedPoint = null;
}

camera.position.z = 5;

const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
    requestAnimationFrame(animate);
    console.log('controls :>> ', controls);
    controls.enableRotate = false;

    controls.update();
    renderer.render(scene, camera);
}

animate();
