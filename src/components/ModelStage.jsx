import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';

export default function ModelStage({
  src,
  className = '',
  label,
  fit = 2.45,
  rotation = [0, 0, 0],
  speed = 0.22,
  cameraZ = 3.4
}) {
  const hostRef = useRef(null);
  const [status, setStatus] = useState('loading');
  const [rotX, rotY, rotZ] = rotation;

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;

    let frame;
    let alive = true;
    let model;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.01, 100);
    camera.position.set(0, 0.05, cameraZ);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);

    const rig = new THREE.Group();
    rig.rotation.set(rotX, rotY, rotZ);
    scene.add(rig);

    scene.add(new THREE.HemisphereLight(0xdde5ef, 0x111419, 2.25));
    const key = new THREE.DirectionalLight(0xffffff, 4.8);
    key.position.set(3.5, 4.5, 5);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x91a6c4, 3.2);
    rim.position.set(-4, 1, -3);
    scene.add(rim);
    const fill = new THREE.DirectionalLight(0xb6a897, 1.6);
    fill.position.set(0, -3, 2);
    scene.add(fill);

    const loader = new GLTFLoader();
    loader.setMeshoptDecoder(MeshoptDecoder);
    loader.load(
      src,
      gltf => {
        if (!alive) return;
        model = gltf.scene;
        model.traverse(child => {
          if (!child.isMesh) return;
          child.frustumCulled = true;
          if (child.material) {
            child.material.envMapIntensity = 0.72;
            child.material.needsUpdate = true;
          }
        });
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const scale = fit / Math.max(size.x, size.y, size.z);
        model.position.sub(center);
        model.scale.setScalar(scale);
        rig.add(model);
        setStatus('ready');
      },
      undefined,
      () => alive && setStatus('error')
    );

    let pointerX = 0;
    let pointerY = 0;
    const onPointerMove = event => {
      const rect = host.getBoundingClientRect();
      pointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 0.22;
      pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 0.12;
    };
    host.addEventListener('pointermove', onPointerMove, { passive: true });

    const resize = () => {
      const width = Math.max(1, host.clientWidth);
      const height = Math.max(1, host.clientHeight);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    resize();

    let previousTime = performance.now();
    const render = () => {
      const now = performance.now();
      const delta = Math.min((now - previousTime) / 1000, 0.05);
      previousTime = now;
      if (model && !reduceMotion) rig.rotation.y += delta * speed;
      rig.rotation.x += (rotX + pointerY - rig.rotation.x) * 0.035;
      camera.position.x += (pointerX - camera.position.x) * 0.025;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
      frame = requestAnimationFrame(render);
    };
    render();

    return () => {
      alive = false;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      host.removeEventListener('pointermove', onPointerMove);
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [cameraZ, fit, rotX, rotY, rotZ, speed, src]);

  return (
    <div ref={hostRef} className={`model-stage ${className}`} aria-label={label} role="img">
      <div className={`model-status model-status-${status}`} aria-live="polite">
        {status === 'loading' && <><span /> Loading 3D object</>}
        {status === 'error' && '3D preview unavailable'}
      </div>
    </div>
  );
}
