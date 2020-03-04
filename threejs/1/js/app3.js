/**
 * x - gred
 * y - green
 * z - blue
 */

var step = 0;
var STATS = initStats();
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;
var controls = new function() {
    this.rotationSpeed = 0.02;
    this.bouncingSpeed = 0.03;
};
var gui = new dat.GUI();
gui.add(controls, 'rotationSpeed',0,0.5);
gui.add(controls, 'bouncingSpeed',0,0.5);

var normalVector = new THREE.Vector3( 0, 1, 0 );
var planeConstant = 0.01; // this value must be slightly higher than the groundMesh's y position of 0.0
var groundPlane = new THREE.Plane( normalVector, planeConstant );

var lightPosition4D = new THREE.Vector4();

var scene = new THREE.Scene();

// камера
var camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 1, 1000);
camera.position.x = -30;
camera.position.y = 40;
camera.position.z = 30;

// Рендер
var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xEEEEEE);
renderer.setSize(WIDTH, HEIGHT);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Ось
var axes = new THREE.AxesHelper(20);
scene.add(axes);

// Плоскость
var planeGeometry = new THREE.PlaneGeometry(60,20, 32, 32);
var planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
var plane = new THREE.Mesh(planeGeometry,planeMaterial);
plane.receiveShadow = true;
plane.rotation.x=-0.5*Math.PI;
plane.position.x = 15;
plane.position.y = 0;
plane.position.z = 0;
scene.add(plane);

// Куб
var cubeGeometry = new THREE.CubeGeometry(4,4,4);
var cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.castShadow = true;
cube.position.x = -4;
cube.position.y = 3;
cube.position.z = 0;
scene.add(cube);

cubeShadow = new THREE.ShadowMesh(cube);
scene.add(cubeShadow);

// Куб
var cube2Geometry = new THREE.CubeGeometry(4,4,4);
// var cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
var cube2Material = new THREE.MeshPhongMaterial({
    specular: 0xD76531,
    color: 0xef8834,
    emissive: 0x8c2317,
    shininess: 50,
});
var cube2 = new THREE.Mesh(cube2Geometry, cube2Material);
cube2.castShadow = true;
cube2.position.x = -10;
cube2.position.y = 3;
cube2.position.z = 0;
scene.add(cube2);

cube2Shadow = new THREE.ShadowMesh(cube2);
scene.add(cube2Shadow);

// Сфера
var sphereGeometry = new THREE.SphereGeometry(4,20,20);
var sphereMaterial = new THREE.MeshLambertMaterial({color: 0x7777ff /*, wireframe: true*/});
var sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);
sphere.position.x = 20;
sphere.position.y = 4;
sphere.position.z = 2;
sphere.castShadow = true;
sphere.receiveShadow = false;
scene.add(sphere);

sphereShadow = new THREE.ShadowMesh(sphere);
scene.add(sphereShadow);

// Свет
// var spotLight = new THREE.AmbientLight(0xffffff);
var spotLight = new THREE.DirectionalLight(0xffffff);
// var spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set( -40, 60, -10 );
spotLight.castShadow = true;
scene.add(spotLight);
var aLight = new THREE.AmbientLight(0x404040, 1);
aLight.castShadow = true;
scene.add(aLight);


lightPosition4D.x = spotLight.position.x;
lightPosition4D.y = spotLight.position.y;
lightPosition4D.z = spotLight.position.z;
// amount of light-ray divergence. Ranging from:
// 0.001 = sunlight(min divergence) to 1.0 = pointlight(max divergence)
lightPosition4D.w = 0.001; // must be slightly greater than 0, due to 0 causing matrixInverse errors

// $("#WebGL-output").append(renderer.domElement);
// var effect = new THREE.AsciiEffect(renderer);
// effect.setSize(WIDTH, HEIGHT);
// document.body.appendChild(effect.domElement);
document.body.appendChild(renderer.domElement);
render();

function render() {
    // var timer = Date.now() * 0.0002;
    // camera.position.x = Math.cos(timer) * 10;
    // camera.position.z = Math.sin(timer) * 10;

    animate();
    STATS.update();
    requestAnimationFrame(render);
    camera.lookAt(scene.position);
    // effect.render(scene,camera)
    renderer.render(scene, camera);
}

function initStats() {
    var STATS = new Stats();
    STATS.setMode(0);
    STATS.domElement.style.position = 'absolute';
    STATS.domElement.style.left = '0px';
    STATS.domElement.style.top = '0px';
    $("#Stats-output").append(STATS.domElement );

    return STATS;
}

function animate() {
    cube.rotation.x += controls.rotationSpeed;
    cube.rotation.y += controls.rotationSpeed;
    cube.rotation.z += controls.rotationSpeed;

    cube2.rotation.x += controls.rotationSpeed;
    cube2.rotation.y += controls.rotationSpeed;
    cube2.rotation.z += controls.rotationSpeed;

    step+=controls.bouncingSpeed;
    sphere.position.x = 20+( 10*(Math.cos(step)));
    sphere.position.y = 2 +( 10*Math.abs(Math.sin(step)));

    cubeShadow.update( groundPlane, lightPosition4D );
    cube2Shadow.update( groundPlane, lightPosition4D );
    sphereShadow.update( groundPlane, lightPosition4D );
}