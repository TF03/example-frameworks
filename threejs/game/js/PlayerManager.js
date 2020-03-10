class PlayerManager {
    constructor() {
        this.cube = null;
        this.floor = null;
        this.step = 0;
        this.clock = new THREE.Clock();
        this.jump = {
            "clock": new THREE.Clock(),
            "is_active": false,
            "prev_state_is_active": false,
            "vel": 13,
            "gravity": -37,
            "boost": {
                "vel": 1.1, // mult
                "gravity": -30 // new g
            }
        }
    }

    init() {
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

        window.addEventListener('keydown', (e) => {
            // console.log(e.keyCode);
            // setKeyFromKeyCode(e.keyCode, true);
            if (e.keyCode == 32) {
                this.jump.is_active = true;
                this.jump.clock.start();
            }
        });
    }

    initJump(timeDelta) {
        this.cube.vel = this.jump.vel;
        this.cube.gravity = this.jump.gravity;
        this.cube.boost = false;
        this.jump.prev_state_is_active = true;
    }

    doJump(timeDelta) {
        if(this.jump.is_active && !this.jump.prev_state_is_active) {
            this.initJump(timeDelta);
        }
        if(this.jump.is_active) {
            this.jump.clock.getElapsedTime();
            if(!this.cube.boost && this.jump.clock.getElapsedTime() > 0.20) {
                this.cube.vel = this.cube.vel * this.jump.boost.vel;
                this.cube.gravity = this.jump.boost.gravity;
                this.cube.boost = true;
            }

            this.cube.position.y = this.cube.position.y + this.cube.vel * timeDelta;
            this.cube.vel = this.cube.vel + this.cube.gravity * timeDelta;

            if(this.cube.position.y <= 0.6) {
                this.jump.is_active = false;
                this.jump.prev_state_is_active = false;
                this.jump.clock.stop();
                this.jump.clock.elapsedTime = 0;
                this.cube.position.y = 0.6;
            }
        }
    }

    update(timeDelta) {
        this.doJump(timeDelta);
    }
}