/** Init Scene */
const SCENE = new THREE.Scene();
if(GameConfig.renderer.fog) {
    const color = 0xE7B251; // sandstorm - #FFB934
    const near = 1;
    const far = 175;
    SCENE.fog = new THREE.Fog(color, near, far);
}
SCENE.background = new THREE.Color( 0xE7B251 );

/** Init Camera */
const CAMERA = new THREE.PerspectiveCamera(
    GameConfig.camera.fov,
    GameConfig.camera.aspect,
    GameConfig.camera.near,
    GameConfig.camera.far
);

const clock = new THREE.Clock();

let PLAYER = new PlayerManager();
let ENEMY = new EnemyManager();

/** Init Stats */
if(GameConfig.stats.enabled) {
    var STATS = new Stats();
    STATS.setMode(0);
    STATS.domElement.style.position = 'absolute';
    STATS.domElement.style.left = '0px';
    STATS.domElement.style.top = '0px';
    STATS.domElement.id = 'Stats-output';
    document.body.appendChild(STATS.domElement);
}

/** Init Axis */
if(GameConfig.axis.enabled) {
    const AXES = new THREE.AxesHelper(20);
    SCENE.add(AXES);
}

// let input = new InputManager();

/** Init Renderer */
const RENDERER = new THREE.WebGLRenderer({
    antialias: GameConfig.renderer.antialias,
    alpha: false,
    powerPreference: 'high-performance',
    depth: true
});
RENDERER.setSize(GameConfig.renderer.width * GameConfig.renderer.render_at, GameConfig.renderer.height * GameConfig.renderer.render_at);
RENDERER.setPixelRatio( window.devicePixelRatio );
if(GameConfig.renderer.shadows) {
    RENDERER.shadowMap.enabled = true;
    RENDERER.shadowMap.type = GameConfig.renderer.shadowType;
}
if(GameConfig.renderer.toneMapping) {
    RENDERER.toneMapping = GameConfig.renderer.toneMapType;
}

RENDERER.domElement.id = 'three-canvas';
document.body.appendChild(RENDERER.domElement);

if(GameConfig.camera.controls) {
    var CONTROLS = new THREE.OrbitControls(CAMERA, RENDERER.domElement);
    CONTROLS.enableDamping = true;
    CONTROLS.dampingFactor = 0.05;
    CONTROLS.screenSpacePanning = false;
    CONTROLS.minDistance = 5;
    CONTROLS.maxDistance = 10;
    CONTROLS.maxPolarAngle = Math.PI / 2;
}
