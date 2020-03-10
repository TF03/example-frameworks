class EnemyPool {

    constructor() {
        this.items = [];
        this.keys = [];
    }

    addItem(item) {
        this.items.push(item);
        this.keys.push(this.items.length-1);
    }

    getItem(k) {
        return this.items[k];
    }

    // getRandomKey() {
    //     if(!this.keys.length) {
    //         return false;
    //     }
    //
    //     let i = Math.floor(Math.random() * this.keys.length);
    //     let k = this.keys.splice(i, 1)[0];
    //     return k;
    // }
    //
    // returnKey(k) {
    //     this.keys.push(k);
    // }
    //
    // reset() {
    //     this.items = [];
    //     this.keys = [];
    // }
}

class EnemyManager {
    constructor() {
        this.pool = new EnemyPool();
        this.clock = new THREE.Clock();
        this.config = {
            "velocity": 13,
            "max_amount": {
                "pool": {
                    "enemy": 1//50
                }
            },
        };
    }

    init() {

        // fill the pool
        if(!this.pool.items.length) {
            for(let i = 0; i < this.config.max_amount.pool.enemy; i++) {
                this.pool.addItem(this.createEnemy('enemy'));
            }
        }

        // this.increase_velocity(15, true);
    }

    createEnemy(type = 'enemy', tail = false) {
        let cubeGeometry = new THREE.BoxGeometry(0.5,1.5,0.5);
        let cubeMaterial = new THREE.MeshLambertMaterial({color: 0xffff00, wireframe: false});
        let box = new THREE.Mesh(cubeGeometry, cubeMaterial);

        // let box = new THREE.BoxHelper( mesh, 0xffff00 );
        box.castShadow = true;
        box.rotation.y = -(Math.PI / 2);
        box.position.y = 0.8;
        box.position.z = -30;
        SCENE.add(box);

        // let enemiesGroup = [box];
        // if(tail) {
        //     // return tail
        //     return enemiesGroup[0];
        // } else {
        //     if (Math.floor(Math.random() * 100) < 100) {
        //         enemiesGroup.push(this.createEnemy('enemy', true));
        //         if (Math.floor(Math.random() * 100) < 25) {
        //             enemiesGroup.push(this.createEnemy('enemy', true));
        //         }
        //     }
        // }

        // return
        return box;
    }

    update(timeDelta) {
        let e = this.pool.getItem(0);

        if(e.position.z > 10) {
            e.position.z = -30;
        } else {
            e.position.z += this.config.velocity * timeDelta;
        }
        // this.move(timeDelta);

        // draw ptero frames
        // if( this.clock.getElapsedTime() > this.config.ptero_anim_speed ) {
        //     this.clock.elapsedTime = 0;
        //     this.pteroNextFrame();
        // }
    }
}