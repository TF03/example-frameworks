class EnemyPool {

    constructor() {
        this.items = [];
        this.keys = [];
    }

    getRandomKey() {
        if(!this.keys.length) {
            return false;
        }

        let i = Math.floor(Math.random() * this.keys.length);
        return this.keys.splice(i, 1)[0];
    }

    addItem(item) {
        this.items.push(item);
        this.keys.push(this.items.length-1);
    }

    returnKey(k) {
        this.keys.push(k);
    }

    getItem(k) {
        return this.items[k];
    }
}

class EnemyManager {
    constructor() {
        this.buffer = [];
        this.pool = new EnemyPool();
        this.clock = new THREE.Clock();
        this.config = {
            "velocity": 13,
            "max_amount": {
                "buffer": 10,
                "pool": {
                    "enemy": 20
                }
            },
            "remove_z": 10,
            "initial_z": -50,
            "z_distance": 20,
            "z_distance_rand": [.9, 2.5],
        };
    }

    init() {
        // fill the pool
        if(!this.pool.items.length) {
            for(let i = 0; i < this.config.max_amount.pool.enemy; i++) {
                this.pool.addItem(this.createEnemy('enemy'));
            }
        }

        // initial buffer fill
        for(let i = 0; i < this.config.max_amount.buffer; i++) {
            this.buffer.push(this.spawn());
        }
    }

    spawn() {
        let rand = this.pool.getRandomKey();

        if(rand !== false) {
            let enemy = this.pool.getItem(rand);
            let rescaleRand = 1;
            rescaleRand = this.random(.6, 1.2);
            enemy.scale.set(rescaleRand, rescaleRand, rescaleRand);

            // random x position
            // enemy.position.x = this.random(.5, -.5);

            // position Z
            let zRand = this.get_z();
            if(!this.buffer.length) {
                enemy.position.z = this.config.initial_z;
            } else {
                let last = this.pool.getItem(this.buffer.leader);
                enemy.position.z = -(-last.position.z + zRand);
            }
            enemy.visible = true;

            this.buffer.leader = rand;
            return rand;
        }
    }

    get_z() {
        let zrr = this.random(this.config.z_distance_rand[0], this.config.z_distance_rand[1]);
        return this.config.z_distance * zrr;
    }

    random(from, to, float = true) {
        if(float) {
            return (Math.random() * (to - from) + from).toFixed(4)
        } else {
            return Math.floor(Math.random() * to) + from;
        }
    }

    createEnemy(type = 'enemy', tail = false) {
        let cubeGeometry = new THREE.CylinderGeometry(0.1,0.1,1,32);
        let cubeMaterial = new THREE.MeshLambertMaterial({color: 0xffff00, wireframe: false});
        let box = new THREE.Mesh(cubeGeometry, cubeMaterial);

        box.castShadow = true;
        box.rotation.y = -(Math.PI / 2);
        box.position.y = 0.8;
        box.position.z = this.config.initial_z;
        box.visible = false;
        SCENE.add(box);

        // return
        return box;
    }

    move(timeDelta) {
        for(let i = 0; i < this.buffer.length; i++) {
            let e = this.pool.getItem(this.buffer[i]);
            if (i == 0 || i == 1) {
                // console.log(i);
                // console.log(e.position);
            }

            if(e.position.z > this.config.remove_z) {
                let newEnemy = this.spawn();
                this.despawn(this.buffer[i]);
                this.buffer[i] = newEnemy;

                continue;
            }

            e.position.z += this.config.velocity * timeDelta;
        }
    }

    despawn(k = false) {
        // identify key
        let key = null;

        if(k !== false) {
            // key = this.buffer.splice(this.buffer.indexOf(k), 1)[0];
            key = this.buffer[this.buffer.indexOf(k)];
        } else {
            // key = this.buffer.splice(0, 1)[0];
            key = this.buffer[0];
        }

        // hide mesh
        let enemy = this.pool.getItem(key);
        enemy.position.z = this.config.remove_z * 2;
        enemy.visible = false;

        // push key back
        this.pool.returnKey(key);
    }

    update(timeDelta) {
        this.move(timeDelta);
        // let e = this.pool.getItem(0);
        //
        // if(e.position.z > 10) {
        //     e.position.z = -30;
        // } else {
        //     e.position.z += this.config.velocity * timeDelta;
        // }
    }
}