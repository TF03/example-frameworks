const GameConfig = {
    renderer: {
        width: window.innerWidth,
        height: window.innerHeight,
        fog: true,
        antialias: true, // low - false
        render_at: 1, // low - 0.9
        shadows: true, // low - false
        toneMapping: false,
    },
    camera: {
        fov: 75,
        aspect: window.innerWidth/window.innerHeight,
        near: 0.1,
        far: 150,
        controls: true,
        helper: false,
    },
    stats : {
        enabled: true
    },
    axis : {
        enabled: true
    }
}