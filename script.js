
import * as THREE from 'https://unpkg.com/three/build/three.module.js';



const scene = new THREE.Scene();
scene.fog = new THREE.Fog( 0xcccccc, 10, 15 );
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// const scene = new THREE.Scene();

const geometry = new THREE.CapsuleGeometry( 1, 2, 1, 8 );
// const material = new THREE.MeshBasicMaterial( {color: 0x0000FF} );
const shiny = new THREE.MeshNormalMaterial( {color: 0x0000FF} );
const capsule = new THREE.Mesh( geometry, shiny );
const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
// light.position.copy( camera.position );

scene.add(light);
scene.add( capsule );
camera.position.z = 10;

function animate() {
	requestAnimationFrame( animate );
    capsule.rotation.x += 0.01;
    capsule.rotation.y += 0.01;
	renderer.render( scene, camera );
}


// create an AudioListener and add it to the camera
const listener = new THREE.AudioListener();
camera.add( listener );

// create a global audio source
const sound = new THREE.Audio( listener );

// load a sound and set it as the Audio object's buffer

document.addEventListener('click', () => {
const audioLoader = new THREE.AudioLoader();
audioLoader.load( 'Sounds/Goat Scream Sound Effect .mp3', function( buffer ) {
	sound.setBuffer( buffer );
	sound.setLoop( false );
	sound.setVolume( 0.5 );
	sound.play();
    }) 
});

animate();