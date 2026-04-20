"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import * as THREE from "three";

type PhoneSceneProps = {
  progress: number;
};

function PhoneScene({ progress }: PhoneSceneProps) {
  const model = useGLTF("/models/tabcura-phone.gltf");
  const groupRef = useRef<THREE.Group>(null);
  const pointerRef = useRef({ x: 0, y: 0 });

  const video = useMemo(() => {
    const element = document.createElement("video");
    element.src = "/videos/tabcura-video.mp4";
    element.loop = true;
    element.muted = true;
    element.playsInline = true;
    element.crossOrigin = "anonymous";
    element.preload = "auto";
    return element;
  }, []);

  const videoTexture = useMemo(() => {
    const texture = new THREE.VideoTexture(video);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.flipY = false;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;
    return texture;
  }, [video]);

  useEffect(() => {
    const tryPlay = async () => {
      try {
        await video.play();
      } catch {
        const resume = () => {
          void video.play();
          window.removeEventListener("pointerdown", resume);
        };
        window.addEventListener("pointerdown", resume, { once: true });
      }
    };

    void tryPlay();

    return () => {
      video.pause();
      videoTexture.dispose();
    };
  }, [video, videoTexture]);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = (event.clientY / window.innerHeight) * 2 - 1;
      pointerRef.current = { x, y };
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  useEffect(() => {
    const scene = model.scene;

    scene.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) {
        return;
      }

      object.castShadow = true;
      object.receiveShadow = true;

      if (object.name === "Screen") {
        object.material = new THREE.MeshStandardMaterial({
          map: videoTexture,
          emissiveMap: videoTexture,
          emissive: new THREE.Color("#ffffff"),
          emissiveIntensity: 0.9,
          metalness: 0,
          roughness: 1,
        });
      }
    });

    return () => {
      scene.traverse((object) => {
        if (!(object instanceof THREE.Mesh)) {
          return;
        }

        const material = object.material;
        if (material instanceof THREE.Material) {
          material.dispose();
        }
      });
    };
  }, [model.scene, videoTexture]);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) {
      return;
    }

    const autoYaw = state.clock.elapsedTime * 0.2;
    const pointerYaw = pointerRef.current.x * 0.16;
    const pointerPitch = -pointerRef.current.y * 0.08;
    const scrollYaw = THREE.MathUtils.lerp(-0.2, 0.2, progress);
    const scrollPitch = THREE.MathUtils.lerp(0.1, -0.08, progress);

    const targetY = autoYaw + scrollYaw + pointerYaw;
    const targetX = scrollPitch + pointerPitch;

    group.rotation.y = THREE.MathUtils.damp(group.rotation.y, targetY, 3.8, delta);
    group.rotation.x = THREE.MathUtils.damp(group.rotation.x, targetX, 3.8, delta);
  });

  return (
    <group ref={groupRef}>
      <primitive object={model.scene} scale={1.35} />
    </group>
  );
}

useGLTF.preload("/models/tabcura-phone.gltf");

export default function TabcuraPhoneModel({ progress }: PhoneSceneProps) {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 2.5], fov: 34 }} dpr={[1, 1.8]}>
        <ambientLight intensity={0.9} />
        <directionalLight position={[2, 4, 3]} intensity={1.05} color="#d6fff7" />
        <directionalLight position={[-2, -3, 2]} intensity={0.5} color="#84e7d4" />
        <pointLight position={[0, 0.8, 1.5]} intensity={1.2} color="#7bf5dd" />
        <PhoneScene progress={progress} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
