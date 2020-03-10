class GameManager {
    constructor(interface_manager) {
        // this.isPlaying = false;
        // this.isPaused = false;
        // this.isFirstStart = true;
        // this.lastTimeDelta = false;
        //
        this.interface = interface_manager;
        // this.starter = null;
        // this.stats = null;
    }

    init() {
        // init interface
        this.interface.init();

        // hook tab visibility
        // visibly.visibilitychange(this.tabVisibilityChanged);


        let geometry = new THREE.BoxGeometry(1, 1, 1)
        let material = new THREE.MeshPhongMaterial({
            color: 0x00FF00,
            flatShading: false,
            shininess: 0
            // specular: 0xD76531,
            // color: 0xef8834,
            // emissive: 0x8c2317,
            // shininess: 50,
            // wireframe: false
        })

        this.cube = new THREE.Mesh(geometry, material)
        SCENE.add(this.cube)
        this.cube.position.y = 0.6
        this.cube.position.z = 2.5
        this.cube.castShadow = true


        let geometryF = new THREE.BoxGeometry(3, 0.2, 50)
        let materialF = new THREE.MeshPhongMaterial({
            color: 0xFF0000,
            flatShading: false,
            shininess: 0
        })

        this.floor = new THREE.Mesh(geometryF, materialF)
        this.floor.position.z = -18
        this.floor.receiveShadow = true
        SCENE.add(this.floor)


        this.step = 0;
        this.pressJump = false;
        window.addEventListener('keydown', (e) => {
            // console.log(e.keyCode);
            // setKeyFromKeyCode(e.keyCode, true);
            if (e.keyCode == 32) {
                this.pressJump = true;
            }
        });

        ENEMY.init();

        this.render();
        this.loop();
    }

    render() {
        // let timeDelta = clock.getDelta();
        //
        // if(timeDelta > 0.15) {
        //     timeDelta = 0.15;
        // }
        //
        // if(config.camera.controls) {
        //     controls.update();}
        //
        // player.update(timeDelta);
        // enemy.update(timeDelta);
        // nature.update(timeDelta);
        // input.update();
        // effects.update(timeDelta);
        // nebulaSystem.update();
        //
        // if(config.renderer.postprocessing.enable) {
        //     // postprocessing
        //     composer.render(timeDelta);
        // } else {
        //     // standart
        //     renderer.render( scene, camera );
        // }
        //
        // score.update(timeDelta);

        // input.update();
        let timeDelta = clock.getDelta();

        if(timeDelta > 0.15) {
            timeDelta = 0.15;
        }
        ENEMY.update(timeDelta);
        if (this.pressJump == true) {
            this.step+=0.04;
            this.cube.position.y = 0.5 +( 2*Math.abs(Math.sin(this.step)));
            if (this.cube.position.y < 0.54) {
                this.step = 0;
                this.pressJump = false;
            }
        }

        if(GameConfig.camera.controls) {
            CONTROLS.update();
        }

        if(GameConfig.stats.enabled) {
            STATSS.update();
        }
        RENDERER.render(SCENE, CAMERA);
    }

    loop() {
        // if(!this.isPlaying) {
        //     // stop the loop if necessary
        //     return false;
        // }

        requestAnimationFrame(function() {
            game.loop();
        });

        this.render();
    }
}





// var Game = function () {
//     this.stats = null
//     this.scene = new THREE.Scene()
//     this.camera = new THREE.PerspectiveCamera(
//         GameConfig.camera.fov,
//         GameConfig.renderer.width / GameConfig.renderer.height,
//         GameConfig.camera.near,
//         GameConfig.camera.far
//     )
//     this.renderer = new THREE.WebGLRenderer({ antialias: true })
//     this.renderer.setSize(GameConfig.renderer.width, GameConfig.renderer.height)
//     this.renderer.shadowMap.enabled = true
//     this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
//     this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement )
//     this.controls.enableDamping = true
//     this.controls.dampingFactor = 0.05
//     this.controls.screenSpacePanning = false
//     this.controls.minDistance = 5
//     this.controls.maxDistance = 10
//     this.controls.maxPolarAngle = Math.PI / 2
//
//     this.axes = new THREE.AxesHelper(20)
//     this.scene.add(this.axes)
// }
//
// Game.prototype = {
//     init: function() {
//         document.body.appendChild(this.renderer.domElement)
//         if (GameConfig.stats.enabled) {
//             this.stats = this.initStats()
//         }
//
//         this.cube = this.initCube()
//         this.floor = this.initFloor()
//         this.initLight()
//         // this.camera.position.set(-3, 3, -5)
//         this.camera.position.x = 3.5
//         this.camera.position.y = 2
//         this.camera.position.z = 4
//         this.controls.update()
//         this.loop()
//     },
//     initStats: function () {
//         let stats = new Stats()
//         stats.setMode(0)
//         document.body.appendChild(stats.domElement)
//
//         return stats
//     },
//     initLight: function () {
//         let ALight = new THREE.AmbientLight(0x404040, 2)
//         this.scene.add(ALight)
//
//         let DLight = new THREE.DirectionalLight(0xffffff)
//         DLight.position.set( -5, 10, 20 )
//         DLight.castShadow = true;
//         this.scene.add(DLight)
//
//         // let spotLight = new THREE.SpotLight(0xfffeee)
//         // spotLight.position.set( -40, 60, -10 )
//         // spotLight.castShadow = true
//         // this.scene.add(spotLight)
//     },
//     initCube: function () {
//         let geometry = new THREE.BoxGeometry(1, 1, 1)
//         let material = new THREE.MeshPhongMaterial({
//             color: 0x00FF00,
//             flatShading: false,
//             shininess: 0
//             // specular: 0xD76531,
//             // color: 0xef8834,
//             // emissive: 0x8c2317,
//             // shininess: 50,
//             // wireframe: false
//         })
//
//         let cube = new THREE.Mesh(geometry, material)
//         this.scene.add(cube)
//         cube.position.y = 0.6
//         cube.position.z = 2.5
//         cube.castShadow = true
//
//         return cube
//     },
//     initFloor: function () {
//         let geometry = new THREE.BoxGeometry(3, 0.2, 50)
//         let material = new THREE.MeshPhongMaterial({
//             color: 0xFF0000,
//             flatShading: false,
//             shininess: 0
//         })
//
//         let floor = new THREE.Mesh(geometry, material)
//         floor.position.z = -18
//         floor.receiveShadow = true
//         this.scene.add(floor)
//
//         return floor
//     },
//     loop: function () {
//         let self = this
//         if (GameConfig.stats.enabled) {
//             this.stats.update();
//         }
//
//         // this.cube.rotation.x += 0.006
//         // this.cube.rotation.y += 0.006
//         // this.cube.rotation.z += 0.006
//
//         requestAnimationFrame(function () {
//             self.loop()
//         })
//         this.controls.update()
//         this.camera.lookAt(this.scene.position)
//         this.renderer.render(this.scene, this.camera)
//     }
// }