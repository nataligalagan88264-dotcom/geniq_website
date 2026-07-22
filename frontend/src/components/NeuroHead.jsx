import React, { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Vanilla Three.js neuro-head — points + wireframe with mouse parallax.
 * Compatible with React 19 (no react-three-fiber).
 */
export const NeuroHead = () => {
  const containerRef = useRef(null);
  const mountedRef = useRef(false);

  useEffect(() => {
    if (!containerRef.current || mountedRef.current) return;
    mountedRef.current = true;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.2, 4.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Circular sprite texture for dots
    const makeDotTexture = () => {
      const c = document.createElement("canvas");
      c.width = 64;
      c.height = 64;
      const ctx = c.getContext("2d");
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, "rgba(255,255,255,1)");
      grad.addColorStop(0.4, "rgba(228,210,255,0.95)");
      grad.addColorStop(1, "rgba(228,210,255,0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(32, 32, 32, 0, Math.PI * 2);
      ctx.fill();
      const tex = new THREE.CanvasTexture(c);
      tex.needsUpdate = true;
      return tex;
    };
    const dotTexture = makeDotTexture();

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const p1 = new THREE.PointLight(0x764cb0, 1.2, 30);
    p1.position.set(5, 4, 5);
    scene.add(p1);
    const p2 = new THREE.PointLight(0x6080f1, 0.6, 30);
    p2.position.set(-4, -2, 3);
    scene.add(p2);

    const group = new THREE.Group();
    group.rotation.y = -0.35;
    scene.add(group);

    // Outer glow sphere
    const glow = new THREE.Mesh(
      new THREE.SphereGeometry(1.85, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0x764cb0, transparent: true, opacity: 0.04 })
    );
    group.add(glow);

    // Head-shaped icosahedron (low-poly)
    const headGeo = new THREE.IcosahedronGeometry(1.8, 4);
    const pos = headGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);
      const ny = y * 1.18;
      const nx = x * 0.92;
      const front = Math.max(0, z) * (1 + 0.18 * Math.exp(-Math.pow(ny - 0.05, 2) * 6));
      const back = Math.min(0, z) * 0.92;
      pos.setXYZ(i, nx, ny, front + back);
    }
    headGeo.computeVertexNormals();

    // Full triangular wireframe (low-poly look)
    const edgesGeo = new THREE.WireframeGeometry(headGeo);
    const edges = new THREE.LineSegments(
      edgesGeo,
      new THREE.LineBasicMaterial({ color: 0x9b7bd4, transparent: true, opacity: 0.32 })
    );
    group.add(edges);

    // Vertex points (small, dense; texture for circular shape)
    const vertPoints = new THREE.Points(
      headGeo,
      new THREE.PointsMaterial({
        size: 0.05,
        color: 0xe4d2ff,
        transparent: true,
        opacity: 0.95,
        sizeAttenuation: true,
        depthWrite: false,
        map: dotTexture,
        alphaTest: 0.001,
      })
    );
    group.add(vertPoints);

    // Surface particles
    // Surface particles
    const N = 3500;
    const arr = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const x = Math.sin(phi) * Math.cos(theta) * 1.65;
      const y = Math.cos(phi) * 1.95;
      let z = Math.sin(phi) * Math.sin(theta) * 1.6;
      const front = Math.max(0, z) * (1 + 0.22 * Math.exp(-Math.pow(y - 0.05, 2) * 6));
      const back = Math.min(0, z) * 0.92;
      z = front + back;
      arr[i * 3] = x;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = z;
    }
    const surfGeo = new THREE.BufferGeometry();
    surfGeo.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    const surfMat = new THREE.PointsMaterial({
      size: 0.035,
      color: 0xffffff,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true,
      depthWrite: false,
      map: dotTexture,
      alphaTest: 0.001,
    });
    const surfPoints = new THREE.Points(surfGeo, surfMat);
    group.add(surfPoints);

    // Orbit torus rings
    const orbitGroup = new THREE.Group();
    [2.5, 2.9, 3.3].forEach((r, i) => {
      const torus = new THREE.Mesh(
        new THREE.TorusGeometry(r, 0.005, 16, 128),
        new THREE.MeshBasicMaterial({
          color: 0x764cb0,
          transparent: true,
          opacity: 0.45 - i * 0.1,
        })
      );
      torus.rotation.x = Math.PI / 2 + i * 0.2;
      torus.rotation.y = i * 0.15;
      orbitGroup.add(torus);
    });
    scene.add(orbitGroup);

    // Orbit dots
    const dotsN = 24;
    const dotsArr = new Float32Array(dotsN * 3);
    for (let i = 0; i < dotsN; i++) {
      const angle = (i / dotsN) * Math.PI * 2;
      const r = 2.4 + Math.random() * 0.6;
      dotsArr[i * 3] = Math.cos(angle) * r;
      dotsArr[i * 3 + 1] = (Math.random() - 0.5) * 3.5;
      dotsArr[i * 3 + 2] = Math.sin(angle) * r;
    }
    const dotsGeo = new THREE.BufferGeometry();
    dotsGeo.setAttribute("position", new THREE.BufferAttribute(dotsArr, 3));
    const dotsPoints = new THREE.Points(
      dotsGeo,
      new THREE.PointsMaterial({
        size: 0.06,
        color: 0xb79be0,
        transparent: true,
        opacity: 0.9,
        sizeAttenuation: true,
        depthWrite: false,
        map: dotTexture,
        alphaTest: 0.001,
      })
    );
    scene.add(dotsPoints);

    // Mouse
    const mouse = { x: 0, y: 0 };
    const onMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", onMouseMove);

    // Resize
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    const clock = new THREE.Clock();
    let rafId;
    const animate = () => {
      const delta = clock.getDelta();
      const t = clock.getElapsedTime();

      group.rotation.y += delta * 0.05;
      const tx = mouse.x * 0.35;
      const ty = -mouse.y * 0.25;
      group.rotation.x += (ty - group.rotation.x) * 0.05;
      group.position.x += (tx * 0.2 - group.position.x) * 0.04;
      group.position.y += (-mouse.y * 0.15 - group.position.y) * 0.04;

      vertPoints.material.opacity = 0.85 + Math.sin(t * 0.6) * 0.1;
      surfMat.opacity = 0.55 + Math.sin(t * 0.8) * 0.1;
      orbitGroup.rotation.z += delta * 0.04;
      dotsPoints.rotation.y += delta * 0.06;

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      headGeo.dispose();
      edgesGeo.dispose();
      surfGeo.dispose();
      dotsGeo.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      mountedRef.current = false;
    };
  }, []);

  return <div data-testid="neuro-head" ref={containerRef} className="absolute inset-0 pointer-events-none" />;
};

export default NeuroHead;
