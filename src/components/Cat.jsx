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
import CatModel from "../models/CatModel";

const Cat = ({ options }) => {
    const { camera } = useThree();
    const { forward, backward, left, right } = usePersonControls();
    const [ref, api] = useSphere(() => ({
        mass: options.catMass,
        position: [0, 5, 0],
        type: "Dynamic",
    }));

    const SPEED = 20;

    const velocity = React.useRef([0, 0, 0]);
    React.useEffect(() => {
        api.velocity.subscribe((v) => (velocity.current = v));
    }, [api.velocity]);

    useFrame(() => {
        // camera.position.copy(ref.current.position);

        camera.position.x = ref.current.position.x;
        // camera.position.y = ref.current.position.y - 5;
        camera.position.z = ref.current.position.z - 20;

        // ref.current.rotation.y = camera.position.z * Math.PI; <- What is this line again?

        const direction = new Vector3();
        const frontVector = new Vector3(
            0,
            0,
            Number(backward) - Number(forward)
        );
        const sideVector = new Vector3(Number(left) - Number(right), 0, 0);
        direction
            .subVectors(frontVector, sideVector)
            .normalize()
            .multiplyScalar(SPEED)
            .applyEuler(camera.rotation);

        // api.velocity.set(direction.x, velocity.current[1], direction.z);
        api.velocity.set(direction.x, -20, direction.z);
        api.angularVelocity.set(0, 0, 0);
        // ref.current.quaternion.set(20, 20, 20);
        // ref.current.applyQuaternion(direction);
        ref.current.getWorldPosition(ref.current.position);
        // console.log(ref.current);
    });

    return (
        <mesh ref={ref}>
            <CatModel />
            {/* <boxGeometry />
            <meshStandardMaterial transparent={true} /> */}
        </mesh>
    );
};

export default Cat;
