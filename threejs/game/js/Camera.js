CAMERA.position.x = 5;
CAMERA.position.y = 3;
CAMERA.position.z = 5;

CAMERA.rotation.x = -0.2521795322818087;
CAMERA.rotation.y = 0.5626175577081858;
CAMERA.rotation.z = 0.1365832725087437;

if(GameConfig.camera.controls) {
    // CONTROLS.target.set(-1.2946982583264495, -3.0793822864709634e-18, 9.30358864783445);
    CONTROLS.update();
}

window.addEventListener( 'resize', onWindowResize, false );
    function onWindowResize(){
        CAMERA.aspect = window.innerWidth / window.innerHeight;
        CAMERA.updateProjectionMatrix();

        RENDERER.setSize(window.innerWidth, window.innerHeight);
}