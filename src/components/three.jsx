import React, { Suspense } from "react";
import { container } from "./three.module.scss";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, Stage } from "@react-three/drei";
import { Physics, usePlane, useBox } from "@react-three/cannon";
import * as THREE from "three";

function Plane(props) {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }));
  return (
    <mesh ref={ref}>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color="blue" side={THREE.DoubleSide} />
    </mesh>
  );
}

function Cube(props) {
  const [ref] = useBox(() => ({ mass: 1, position: [0, 5, 0], ...props }));
  return (
    <mesh ref={ref}>
      <boxGeometry />
      <meshStandardMaterial color="white" side={THREE.DoubleSide} />
    </mesh>
  );
}

const Composition = () => {
  return (
    <>
      <Physics>
        <Plane />
        <Cube />
      </Physics>
      <PerspectiveCamera position={[0, 0, 0]} rotation={[0, Math.PI / 5, 0]}  makeDefault />
    </>
  );
};

const Three = () => {
  return (
    <div className={container}>
      <Canvas style={{ cursor: "none" }} shadows>
        <Suspense fallback={null}>
          <Stage contactShadow adjustCamera={false} shadows intensity={1}>
            <Composition />
          </Stage>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Three;
