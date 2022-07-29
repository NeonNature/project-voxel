import React, { Suspense, useState } from "react";
import { container } from "./three.module.scss";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera, Stage } from "@react-three/drei";
import {
    Physics,
    usePlane,
    useBox,
    useSphere,
    useRaycastVehicle,
} from "@react-three/cannon";
import * as THREE from "three";
import DatGui, { DatNumber } from "react-dat-gui";
import "/node_modules/react-dat-gui/dist/index.css";
import { Vector3 } from "three";
import { usePersonControls } from "../utilities/controls";
import Cat from "./Cat";

function Plane(props) {
    const [ref] = usePlane(() => ({
        rotation: [-Math.PI / 2, 0, 0],
        mass: 100,
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

const Composition = ({ options }) => {
    return (
        <>
            <Physics>
                <Plane />
                <Cat options={options} />
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
                min={-100}
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
            <DatNumber
                path="catMass"
                label="Cat Mass"
                min={0}
                max={100}
                step={0.5}
            />
        </DatGui>
    );
};

const Three = () => {
    const [options, setOptions] = useState({
        cameraX: 0,
        cameraY: 9,
        cameraZ: -51,
        rotationX: 0.5,
        rotationY: Math.PI,
        rotationZ: 0,
        catMass: 1,
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
