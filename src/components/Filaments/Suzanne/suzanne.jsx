import Filament from 'filament';
import Trackball from 'gltumble';
import { mat4 } from 'gl-matrix';

export default class App {
    constructor(canvas, assets, lookAt = 0) {
        let { filamat_url, filamesh_url, sky_small_url, ibl_url,
            sky_large_url, albedo_url, roughness_url, metallic_url,
            normal_url, ao_url } = assets;
        this.lookAt = lookAt;
        this.canvas = canvas;
        this.engine = Filament.Engine.create(canvas);
        this.scene = this.engine.createScene();
        const material = this.engine.createMaterial(filamat_url);
        this.matinstance = material.createInstance();
        const filamesh = this.engine.loadFilamesh(filamesh_url, this.matinstance);
        this.suzanne = filamesh.renderable;
        this.skybox = this.engine.createSkyFromKtx(sky_small_url);
        this.scene.setSkybox(this.skybox);
        this.indirectLight = this.engine.createIblFromKtx(ibl_url);
        this.indirectLight.setIntensity(100000);
        this.scene.setIndirectLight(this.indirectLight);
        this.trackball = new Trackball(canvas, {
            startSpin: 0.035
        });
        Filament.fetch([sky_large_url, albedo_url, roughness_url, metallic_url, normal_url, ao_url],
            () => {
                const albedo = this.engine.createTextureFromKtx(albedo_url, {
                    srgb: true
                });
                const roughness = this.engine.createTextureFromKtx(roughness_url);
                const metallic = this.engine.createTextureFromKtx(metallic_url);
                const normal = this.engine.createTextureFromKtx(normal_url);
                const ao = this.engine.createTextureFromKtx(ao_url);
                const sampler = new Filament.TextureSampler(Filament.MinFilter.LINEAR_MIPMAP_LINEAR,
                    Filament.MagFilter.LINEAR, Filament.WrapMode.CLAMP_TO_EDGE);
                this.matinstance.setTextureParameter('albedo', albedo, sampler);
                this.matinstance.setTextureParameter('roughness', roughness, sampler);
                this.matinstance.setTextureParameter('metallic', metallic, sampler);
                this.matinstance.setTextureParameter('normal', normal, sampler);
                this.matinstance.setTextureParameter('ao', ao, sampler);
                // Replace low-res skybox with high-res skybox.
                this.engine.destroySkybox(this.skybox);
                this.skybox = this.engine.createSkyFromKtx(sky_large_url);
                this.scene.setSkybox(this.skybox);
                this.scene.addEntity(this.suzanne);
            });
        this.swapChain = this.engine.createSwapChain();
        this.renderer = this.engine.createRenderer();
        this.camera = this.engine.createCamera();
        this.view = this.engine.createView();
        this.view.setCamera(this.camera);
        this.view.setScene(this.scene);
        this.view.setClearColor([0, 0, 0, 0.0]); // blue-green background
        this.render = this.render.bind(this);
        this.resize = this.resize.bind(this);
        //window.addEventListener('resize', this.resize);
        const eye = [0, 0, 4],
            center = [0, 0, 0],
            up = [0, 1, 0];
        this.camera.lookAt(eye, center, up);
        this.resize(window.innerWidth, window.innerHeight);
        window.requestAnimationFrame(this.render);
    }
    trackballTransform() {
        const radians = this.lookAt * 10000;
        const newMat = mat4.create();
        const transform = mat4.add(newMat, this.trackball.getMatrix(), mat4.fromRotation(mat4.create(), radians, [1, 0, 1]));
        return transform;
    }
    rotateTransform() {
        const radians = this.lookAt * 2 * 3.1414;
        return mat4.fromRotation(mat4.create(), radians, [0, 1, 0]);
    }
    render() {
        const tcm = this.engine.getTransformManager();
        const inst = tcm.getInstance(this.suzanne);
        //const transform = this.trackballTransform(tcm, inst);
        const transform = this.rotateTransform(tcm, inst);
        tcm.setTransform(inst, transform);
        this.renderer.render(this.swapChain, this.view);
        inst.delete();
        window.requestAnimationFrame(this.render);
    }
    resize(parentWidth, parentHeight) {
        const dpr = window.devicePixelRatio;
        const width = this.canvas.width = parentWidth * dpr;
        const height = this.canvas.height = parentHeight * dpr;
        this.view.setViewport([0, 0, width, height]);
        const aspect = width / height;
        const Fov = Filament.Camera$Fov,
            fov = aspect < 1 ? Fov.HORIZONTAL : Fov.VERTICAL;
        this.camera.setProjectionFov(45, aspect, 1.0, 10.0, fov);
    }
}
