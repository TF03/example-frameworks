let ALight = new THREE.AmbientLight(0x404040, 2.4);
SCENE.add(ALight);

let DLight = new THREE.DirectionalLight( 0xffffff, .5 );
let DLightTargetObject = new THREE.Object3D();
DLight.position.set(50,30,-30);
DLight.target = DLightTargetObject;
DLightTargetObject.position.set(-65,-25,-50);

DLight.castShadow = GameConfig.renderer.shadows;
DLight.shadow.radius = 1;
DLight.shadow.mapSize.width = 1024 * 3;
DLight.shadow.mapSize.height = 1024 * 3;
DLight.shadow.camera.scale.y = 10;
DLight.shadow.camera.scale.x = 20;
DLight.shadow.camera.near = 0;
DLight.shadow.camera.far = 200;

SCENE.add(DLight);
SCENE.add(DLightTargetObject);

if(GameConfig.camera.helper) {
    SCENE.add(new THREE.CameraHelper(DLight.shadow.camera));
}