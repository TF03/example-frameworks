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

let ENEMY = new EnemyManager();
let STATSS = null;
/** Init Stats */
if(GameConfig.stats.enabled) {
    STATSS = new Stats();
    STATSS.setMode(0);
    STATSS.domElement.style.position = 'absolute';
    STATSS.domElement.style.left = '0px';
    STATSS.domElement.style.top = '0px';
    STATSS.domElement.id = 'Stats-output';
    document.body.appendChild(STATSS.domElement);
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
    RENDERER.shadowMap.type = THREE.PCFSoftShadowMap;
}
if(GameConfig.renderer.toneMapping) {
    RENDERER.toneMapping = THREE.Uncharted2ToneMapping;
}

RENDERER.domElement.id = 'three-canvas';
document.body.appendChild(RENDERER.domElement);

const CONTROLS = new THREE.OrbitControls(CAMERA, RENDERER.domElement);
CONTROLS.enableDamping = true;
CONTROLS.dampingFactor = 0.05;
CONTROLS.screenSpacePanning = false;
CONTROLS.minDistance = 5;
CONTROLS.maxDistance = 10;
CONTROLS.maxPolarAngle = Math.PI / 2;
