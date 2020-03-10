/**
 * Controls initialization.
 * @type {THREE.MapControls}
 */
if(GameConfig.camera.controls) {
    let controls = new THREE.MapControls(CAMERA, RENDERER.domElement);

    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    controls.screenSpacePanning = false;

    controls.minDistance = 5;
    controls.maxDistance = 100;

    controls.maxPolarAngle = Math.PI / 2;
}