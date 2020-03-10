const GameConfig = {
    logs: true,
    debug: false,
    camera: {
        fov: 75,
        aspect: window.innerWidth/window.innerHeight,
        near: 0.1,
        far: 200,
        controls: true,
        helper: false,
    },
    renderer: {
        width: window.innerWidth,
        height: window.innerHeight,
        fog: true,
        render_at: 1,
        antialias: true,
        shadows: true,
        shadowType: THREE.PCFSoftShadowMap,
        toneMapping: false,
        toneMapType: THREE.Uncharted2ToneMapping,
    },
    stats : {
        enabled: true
    },
    axis : {
        enabled: true
    }
}
// const GameConfig = {
//     logs: true,
//     debug: false,
//     camera: {
//         fov: 75,
//         aspect: window.innerWidth/window.innerHeight,
//         near: 0.1,
//         far: 150,
//         controls: true,
//         helper: false,
//     },
//     renderer: {
//         width: window.innerWidth,
//         height: window.innerHeight,
//         fog: true,
//         render_at: 0.9,
//         antialias: false,
//         shadows: false,
//         shadowType: THREE.PCFSoftShadowMap,
//         toneMapping: true,
//         toneMapType: THREE.Uncharted2ToneMapping,
//     },
//     stats : {
//         enabled: true
//     },
//     axis : {
//         enabled: true
//     }
// }