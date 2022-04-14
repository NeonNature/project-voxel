import React, { Suspense, useState } from "react";
import { container } from "./three.module.scss";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera, Stage } from "@react-three/drei";
import { Physics, usePlane, useBox } from "@react-three/cannon";
import * as THREE from "three";
import DatGui, { DatNumber } from "react-dat-gui";
import "/node_modules/react-dat-gui/dist/index.css";
import { Vector3 } from "three";
import { usePersonControls } from "./controls";

function Plane(props) {
    const [ref] = usePlane(() => ({
        rotation: [-Math.PI / 2, 0, 0],
        mass: 10,
        type: "Static",
        ...props,
    }));
    return (
        <mesh ref={ref}>
            <planeGeometry args={[100, 100]} />
            <meshStandardMaterial color="blue" side={THREE.DoubleSide} />
        </mesh>
    );
}

function Cube(props) {
    const { camera } = useThree();
    const { forward, backward, left, right } = usePersonControls();
    const [ref, api] = useBox(() => ({
        mass: 1,
        position: [0, 5, 0],
        type: "Dynamic",
        ...props,
    }));

    const SPEED = 2;

    const velocity = React.useRef([0, 0, 0]);
    React.useEffect(() => {
        api.velocity.subscribe((v) => (velocity.current = v));
    }, [api.velocity]);

    useFrame(() => {
        // camera.position.copy(ref.current.position);
        const direction = new Vector3();
        const frontVector = new Vector3(
            0,
            0,
            Number(forward) - Number(backward)
        );
        const sideVector = new Vector3(Number(left) - Number(right), 0, 0);
        direction
            .subVectors(frontVector, sideVector)
            .normalize()
            .multiplyScalar(SPEED)
            .applyEuler(camera.rotation);

        api.velocity.set(direction.x, velocity.current[1], direction.z);
        ref.current.getWorldPosition(ref.current.position);
    });

    return (
        <mesh ref={ref}>
            <boxGeometry />
            <meshStandardMaterial color="red" side={THREE.DoubleSide} />
        </mesh>
    );
}

const Composition = ({ options }) => {
    return (
        <>
            <Physics>
                <Plane />
                <Cube />
            </Physics>
            <PerspectiveCamera
                position={[options.cameraX, options.cameraY, options.cameraZ]}
                rotation={[
                    options.rotationX,
                    options.rotationY,
                    options.rotationZ,
                ]}
                makeDefault
            />
        </>
    );
};

const DatGuiContainer = ({ options, setOptions }) => {
    return (
        <DatGui data={options} onUpdate={setOptions}>
            <DatNumber
                path="cameraX"
                label="Camera X"
                min={0}
                max={100}
                step={1}
            />
            <DatNumber
                path="cameraY"
                label="Camera Y"
                min={0}
                max={100}
                step={1}
            />
            <DatNumber
                path="cameraZ"
                label="Camera Z"
                min={0}
                max={100}
                step={1}
            />
            <DatNumber
                path="rotationX"
                label="Rotation X"
                min={0}
                max={3.141592}
                step={0.05}
            />
            <DatNumber
                path="rotationY"
                label="Rotation Y"
                min={0}
                max={3.141592}
                step={0.05}
            />
            <DatNumber
                path="rotationZ"
                label="Rotation Z"
                min={0}
                max={3.141592}
                step={0.05}
            />
        </DatGui>
    );
};

const Three = () => {
    const [options, setOptions] = useState({
        cameraX: 0,
        cameraY: 9,
        cameraZ: 60,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
    });

    return (
        <div className={container}>
            <Canvas style={{ cursor: "none" }} shadows>
                <Suspense fallback={null}>
                    <Stage
                        contactShadow
                        adjustCamera={false}
                        shadows
                        intensity={1}
                    >
                        <Composition options={options} />
                    </Stage>
                </Suspense>
            </Canvas>
            <DatGuiContainer options={options} setOptions={setOptions} />
        </div>
    );
};

export default Three;
