import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const MODEL_URL = "/models/hitem3d.glb";
const START_ROTATION_Y = THREE.MathUtils.degToRad(10);
const PROFILE_TURN_Y = THREE.MathUtils.degToRad(50);
const TARGET_FRAME_MS = 1000 / 30;

export const HeroGlbModel = () => {
  const containerRef = useRef(null);
  const mountedRef = useRef(false);

  useEffect(() => {
    if (!containerRef.current || mountedRef.current) return;
    mountedRef.current = true;

    const container = containerRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0.02, 5.35);

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: "low-power",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.15));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.84;
    container.appendChild(renderer.domElement);

    const modelGroup = new THREE.Group();
    modelGroup.rotation.set(0.02, START_ROTATION_Y, 0);
    scene.add(modelGroup);

    scene.add(new THREE.AmbientLight(0xf4e9ff, 0.46));

    const violetKey = new THREE.DirectionalLight(0xc084fc, 1.55);
    violetKey.position.set(3, 4, 5);
    scene.add(violetKey);

    const roseFill = new THREE.PointLight(0xf472b6, 0.42, 12);
    roseFill.position.set(-3, 1.8, 2.5);
    scene.add(roseFill);

    const rim = new THREE.PointLight(0xf4c56f, 0.72, 12);
    rim.position.set(2.4, -1.8, 2.8);
    scene.add(rim);

    const glow = new THREE.Mesh(
      new THREE.SphereGeometry(1.55, 32, 32),
      new THREE.MeshBasicMaterial({
        color: 0xc084fc,
        transparent: true,
        opacity: 0.03,
        depthWrite: false,
      })
    );
    glow.scale.set(1.08, 1.22, 1);
    modelGroup.add(glow);

    const mouse = { x: 0, y: 0 };
    const onPointerMove = (event) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    };
    container.addEventListener("pointermove", onPointerMove);

    const resize = () => {
      const width = Math.max(container.clientWidth, 1);
      const height = Math.max(container.clientHeight, 1);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    let model = null;
    let rafId = 0;
    let disposed = false;

    const loader = new GLTFLoader();
    loader.load(
      MODEL_URL,
      (gltf) => {
        if (disposed) return;

        model = gltf.scene;
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z) || 1;
        const scale = 2.78 / maxDim;

        model.position.sub(center);
        model.scale.setScalar(scale);

        model.traverse((child) => {
          if (!child.isMesh) return;
          child.castShadow = false;
          child.receiveShadow = false;
          if (child.material) {
            child.material.side = THREE.DoubleSide;
            child.material.transparent = child.material.transparent || child.material.opacity < 1;
            child.material.needsUpdate = true;
          }
        });

        modelGroup.add(model);
      },
      undefined,
      (error) => {
        console.error("Failed to load hero GLB model", error);
      }
    );

    const clock = new THREE.Clock();
    let lastFrame = 0;
    const animate = (timestamp = 0) => {
      rafId = requestAnimationFrame(animate);
      if (document.hidden || timestamp - lastFrame < TARGET_FRAME_MS) return;
      lastFrame = timestamp;

      const elapsed = clock.getElapsedTime();

      const profileSwing = (1 - Math.cos(elapsed * 0.36)) * 0.5;
      const targetX = 0.02 + mouse.y * 0.026 + Math.sin(elapsed * 0.24) * 0.006;
      const targetY = START_ROTATION_Y + profileSwing * PROFILE_TURN_Y + mouse.x * 0.012;
      modelGroup.rotation.x += (targetX - modelGroup.rotation.x) * 0.045;
      modelGroup.rotation.y += (targetY - modelGroup.rotation.y) * 0.045;
      modelGroup.position.y = Math.sin(elapsed * 0.52) * 0.018;

      glow.material.opacity = 0.022 + Math.sin(elapsed * 0.62) * 0.006;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      container.removeEventListener("pointermove", onPointerMove);
      resizeObserver.disconnect();
      if (model) {
        model.traverse((child) => {
          if (!child.isMesh) return;
          child.geometry?.dispose();
          const materials = Array.isArray(child.material) ? child.material : [child.material];
          materials.forEach((material) => {
            if (!material) return;
            Object.values(material).forEach((value) => {
              if (value?.isTexture) value.dispose();
            });
            material.dispose();
          });
        });
      }
      glow.geometry.dispose();
      glow.material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      mountedRef.current = false;
    };
  }, []);

  return (
    <div
      data-testid="hero-glb-model"
      ref={containerRef}
      className="hero-glb-model absolute inset-0"
    />
  );
};

export default HeroGlbModel;
