//http://blog.felixbreuer.net/2014/08/05/using-threejs-to-create-vector-graphics-from-3d-visualizations.html
import React, { Component } from 'react';
import * as THREE from 'three';
import * as OrbitControls from 'three-orbitcontrols';
import csv from "./NutritionalFacts_Fruit_Vegetables_Seafood.csv";

class ThreeScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0
        };
    }
    componentDidMount() {
        this.init();
        this.start();
    }
    componentWillUnmount() {
        this.stop()
        this.mount.removeChild(this.renderer.domElement)
    }
    start = () => {
        if (!this.frameId) {
            this.frameId = requestAnimationFrame(this.animate)
        }
    }
    stop = () => {
        cancelAnimationFrame(this.frameId)
    }

    init = () => {
        const width = this.props.width;
        const height = this.props.height;
        const { bg_color, main_color } = this.props;

        this.framecount = 0;
        this.originalVertices = [];
        this.targetVertices = [];

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(bg_color);

        this.camera = new THREE.PerspectiveCamera(45, width / height, .1, 2000);

        this.camera.position.x = 0;
        this.camera.position.y = 0;
        this.camera.position.z = 15;
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(width, height);

        this.camControls = new OrbitControls(this.camera, this.mount);
        //this.camControls.enableZoom = false;

        var directionalLight = new THREE.DirectionalLight();
        directionalLight.position.set(-50, -50, -50);
        this.scene.add(directionalLight);

        var directionalLight2 = new THREE.DirectionalLight();
        directionalLight2.position.set(0, 50, 0);
        this.scene.add(directionalLight2);

        this.scene.add(new THREE.AmbientLight("green"));

        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.mount.addEventListener('mousemove', this.handleMouseMove);
        this.INTERSECTED = null;

        var material = new THREE.MeshPhongMaterial({ color: "green", side: THREE.DoubleSide });
        // for (let i = 0; i < csv.length; i++){
        //     let calcium = csv[i]["Calcium"];
        //     var mygeo = new THREE.ParametricGeometry(kleinBottle, calcium*10, 100);
        //     mygeo.verticesNeedUpdate = false;
        //     mygeo.dynamic = false;
        //     var mymesh = new THREE.Mesh(mygeo, material);
        //     mymesh.scale.set(1, 1, 1);
        //     mymesh.position.x = (10 * i);
        //     this.scene.add(mymesh);
        // }

        var hCount = Math.sqrt(csv.length),
        vCount = Math.sqrt(csv.length),
        size = 1,
        spacing = 7;
        this.grid = new THREE.Group(); // just to hold them all together

        for (var h=0; h<hCount; h+=1) {
            for (var v=0; v<vCount; v+=1) {
                var material = new THREE.MeshLambertMaterial();    
                var geometry = new THREE.ConeGeometry(.25, 1* csv[h + v*h]["Calcium"], 6);
                var theta = v * 139.512 * Math.PI / 180;
                var radius = 0.25 * Math.sqrt(h);
                var x = radius * Math.cos(theta);
                var y = radius * Math.sin(theta);
                var mesh = new THREE.Mesh(geometry, material);
                //mesh.rotation.x = h*1;
                //mesh.rotation.y = v*1;
                //mesh.rotation.z = theta + 1.5*Math.PI;
                //mesh.position.set(x,y,-i*0.015);
                mesh.position.x = (h-hCount/2) * spacing;
                mesh.position.y = (v-vCount/2) * spacing;
                this.grid.add(mesh);
            }
        }
        this.scene.add(this.grid);
        //this.grid.rotation.y = Math.PI / 2;

        //var count = this.mymesh.geometry.vertices.length;
        // var mygeo2 = new THREE.ParametricGeometry(kleinBottle2, 100, 100);
        // for (var i = 0; i < count; i++) {
        //     var v = this.mymesh.geometry.vertices[i];
        //     this.originalVertices.push(new THREE.Vector3(v.x, v.y, v.z))
        //     var v2 = mygeo2.vertices[i];
        //     this.targetVertices.push(new THREE.Vector3(v2.x, v2.y, v2.z))
        // }

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(width, height);

        this.mount.appendChild(this.renderer.domElement);
    }

    handleMouseMove = ( event ) => {

        // calculate mouse position in normalized device coordinates
        // (-1 to +1) for both components
        //console.log(this.mouse);
        this.mouse.x = ( (event.screenX - this.mount.getBoundingClientRect().x) / this.props.width ) * 2 - 1;
        this.mouse.y = - ( (event.screenY - this.mount.getBoundingClientRect().y - 80) / this.props.height ) * 2 + 1;
    }

    animate = () => {
        requestAnimationFrame(this.animate);
        this.camControls.update();
        // update the picking ray with the camera and mouse position
        this.raycaster.setFromCamera( this.mouse, this.camera );

        // calculate objects intersecting the picking ray
        var intersects = this.raycaster.intersectObjects( this.scene.children, true );
        if ( intersects.length > 0 ) {
            if ( this.INTERSECTED != intersects[ 0 ].object ) {
                if ( this.INTERSECTED ) this.INTERSECTED.material.emissive.setHex( this.INTERSECTED.currentHex );
                this.INTERSECTED = intersects[ 0 ].object;
                console.log(this.INTERSECTED);
                this.INTERSECTED.currentHex = this.INTERSECTED.material.emissive.getHex();
                this.INTERSECTED.material.emissive.setHex( 0xff0000 );
            }
        } else {
            if ( this.INTERSECTED ) this.INTERSECTED.material.emissive.setHex( this.INTERSECTED.currentHex );
            this.INTERSECTED = null;
        }

        this.renderer.render(this.scene, this.camera);
    }

    render() {
        return (
            <div
                style={{ width: this.width + 'px', height: this.height + 'px' }}
                ref={(mount) => { this.mount = mount }}
            />
        )
    }
}
export default ThreeScene