import './style.css';
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import TexturePng01 from "./public/cube08_r.png";
import TexturePng02 from "./public/cube08_l.png";
import TexturePng03 from "./public/cube08_u.png";
import TexturePng04 from "./public/cube08_d.png";
import TexturePng05 from "./public/cube08_f.png";
import TexturePng06 from "./public/cube08_b.png";


//canvas
const canvas = document.querySelector("#webgl");
//sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};
//scene
const scene = new THREE.Scene();
//camera
const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.1, 100);
camera.position.set(-0.5, -1.5, 4);
scene.add(camera);
//renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
//renderer.setClearColor(0xc5e7da, 1);
renderer.setPixelRatio(window.devicePixelRatio);
//controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
//light
const directionalLight = new THREE.DirectionalLight("#ffffff", 3);
directionalLight.position.set(0.5, 1, 0);
scene.add(directionalLight);

//cubetexture
const urls01 = [
  TexturePng01,
  TexturePng02,
  TexturePng03,
  TexturePng04,
  TexturePng05,
  TexturePng06,
]
const loader01 = new THREE.CubeTextureLoader();
const textureCube01 = loader01.load(urls01);
textureCube01.mapping = THREE.CubeReflectionMapping;

//geometry
const sphereGeometry = new THREE.SphereGeometry(1, 20, 10);
//material
const material01 = new THREE.MeshBasicMaterial({
  reflectivity: 1,
  envMap:textureCube01,
  metalness: 0.96,
  roughness: 0.99,
  transparent: true,
  opacity: 0.6,
  clearcoat: 1,
});
//mesh
const mesh1 = new THREE.Mesh(sphereGeometry, material01);
mesh1.position.set(-0.5, 0, 0);
scene.add(mesh1);

//animation
const clock = new THREE.Clock();
let lastElapsedTime = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - lastElapsedTime;
  lastElapsedTime = elapsedTime;

  if(!!mesh1) {
    mesh1.position.y = Math.sin(elapsedTime * 0.4) * 0.9 - 0.1;
    mesh1.position.x = Math.sin(elapsedTime * 0.4) * 0.9 - 0.1;
  }
  mesh1.rotation.x = elapsedTime;
  mesh1.rotation.y = elapsedTime;

  renderer.render(scene, camera);
  controls.update();
  window.requestAnimationFrame(tick);
};
tick();
//resize
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width/sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(window.devicePixelRatio);
})