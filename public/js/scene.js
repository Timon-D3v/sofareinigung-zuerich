"use strict";

import { getElm, ready, on, getDevice, getQuery } from "timonjs";


if (getDevice() !== "mobile") ready(init);
else modifyCss();

async function init() {
    const { default: gsap } = await import("gsap");
    const THREE = await import("three");
    const { GLTFLoader } = await import("three/examples/jsm/loaders/GLTFLoader.js");
    const { RGBELoader } = await import("three/examples/jsm/loaders/RGBELoader.js");
    const canvas = getElm("scene");
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    const camera = new THREE.PerspectiveCamera(70, canvas.x() / canvas.y(), 0.1, 1000);
    const modelLoader = new GLTFLoader();
    const envLoader = new RGBELoader();
    const pi = Math.PI;
    const angle = pi / 6;
    const pi2 = pi * 2;
    let couch;
    let direction = 1;
    let canAnimate = true;
    let isAnimating = false;

    modelLoader.load("/scene/couch.glb", (model) => {
        couch = model.scene;
        couch.rotation.set(angle, -pi / 20, 0);
        scene.add(couch);
    });
    envLoader.load("/scene/environment.hdr", (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = texture;
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.autoClear = false;
    renderer.setClearColor(0x000000, 0.0);
    renderer.setSize(canvas.x(), canvas.y());
    camera.position.set(0, 0, 2);

    render();

    on(window, "resize", () => {
        renderer.setSize(canvas.x(), canvas.y());
        camera.updateProjectionMatrix();
    });

    canvas.on("mouseenter", rotateCouchX);
    canvas.on("touchstart", rotateCouchX);
    canvas.on("mouseleave", () => canAnimate = true);
    canvas.on("touchcancel", () => canAnimate = true);
    canvas.on("touchend", () => canAnimate = true);
    canvas.on("mousemove", rotateCouch);
    canvas.on("touchmove", rotateCouch);
    canvas.click(scaleCouch);

    function render() {
        requestAnimationFrame(render);

        renderer.clear();
        renderer.render(scene, camera);

        if (!couch || isAnimating) return;
        else if (couch.rotation.y <= -angle) direction = 1;
        else if (couch.rotation.y >= angle) direction = -1;

        couch.rotation.y += 0.001 * direction;
    }

    function rotateCouchX() {
        if (!canAnimate || isAnimating) return;

        canAnimate = false;
        animate();

        gsap.to(couch.rotation, {
            x: couch.rotation.x + pi2,
            duration: 2,
            ease: "power2.inOut"
        });
    }

    function rotateCouch() {
        if (isAnimating) return;

        animate();

        const currentY = couch.rotation.y;

        gsap.to(couch.rotation, {
            x: couch.rotation.x + pi2,
            y: currentY + pi2,
            z: couch.rotation.z + pi2,
            duration: 2,
            ease: "power2.inOut"
        });

        gsap.set(couch.rotation, {
            y: currentY,
            delay: 2
        });
    }

    function scaleCouch() {
        if (isAnimating) return;

        animate();

        gsap.to(couch.scale, {
            x: 1.1,
            y: 1.1,
            z: 1.1,
            duration: 1,
            ease: "power2.in"
        });

        gsap.to(couch.scale, {
            x: 1,
            y: 1,
            z: 1,
            duration: 1,
            ease: "power2.out",
            delay: 1
        });
    }

    function animate() {
        isAnimating = true;
        setTimeout(() => isAnimating = false, 2000);
    }
}

function modifyCss() {
    getQuery(".prefooter-playground").addClass("hidden");
    getQuery(".prefooter").css({ "--children-count": 2 });
}