import React from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls'

export default function ThreeEarth() {
    React.useEffect(() => {
        const sizes = {
            height: window.innerHeight,
            width: window.innerWidth,
        }
        const scene = new THREE.Scene()

        //Camera
        const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 1000)
        camera.position.z = 4

        scene.add(camera)

        //Light
        // const light = new THREE.PointLight('#fff', 3)
        // light.position.set(5, 4, 0)
        // scene.add(light)
        const light1 = new THREE.DirectionalLight('#fff', 0.5)
        scene.add(light1)

        //Sphere
        const geometry = new THREE.SphereGeometry(3, 64, 64)
        const material = new THREE.MeshStandardMaterial({ color: '#00ff83' })
        const sphere = new THREE.Mesh(geometry, material)
        // scene.add(sphere)

        //Earth

        const loader = new GLTFLoader()

        loader.load(
            'EarthOptimized.glb',
            function (gltf) {
                scene.add(gltf.scene)
            },
            undefined,
            function (error) {
                console.error(error)
            }
        )

        //Canvas & renderer
        const canvas = document.querySelector('.webgl') as HTMLCanvasElement
        const renderer = new THREE.WebGLRenderer({ canvas })
        renderer.setSize(sizes.width, sizes.height)
        // renderer.setPixelRatio(2)
        renderer.render(scene, camera)

        //Controls
        // const controls = new OrbitControls(camera, canvas)
        // controls.enableDamping = true
        // controls.enablePan = false
        // controls.enableZoom = false
        // controls.autoRotate = true
        // controls.autoRotateSpeed = 4
        const controls = new TrackballControls(camera, canvas)
        controls.staticMoving = false
        controls.dynamicDampingFactor = 0.03
        controls.rotateSpeed = 1.5
        controls.noPan = true
        controls.noZoom = true

        //Resize
        window.addEventListener('resize', () => {
            sizes.width = window.innerWidth
            sizes.height = window.innerHeight

            camera.aspect = sizes.width / sizes.height
            camera.updateProjectionMatrix()
            renderer.setSize(sizes.width, sizes.height)
        })

        function animate() {
            controls.update()
            renderer.render(scene, camera)
            requestAnimationFrame(animate)
        }
        animate()

        const tl = gsap.timeline({ defaults: { duration: 1 } })
        tl.fromTo(sphere.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 })
    }, [])

    return <canvas className="webgl w-full h-full absolute top-0 left-0"></canvas>
}
