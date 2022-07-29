import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function CatModel(props) {
    const group = useRef();
    const { nodes, materials } = useGLTF("/static/cat.glb");
    return (
        <group ref={group} {...props} dispose={null}>
            <mesh
                color="red"
                castShadow
                receiveShadow
                geometry={nodes.Tail_Tip.geometry}
                material={nodes.Tail_Tip.material}
                position={[0, 1.5, 0]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Tail.geometry}
                material={nodes.Tail.material}
                position={[0, 1.5, 0]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Left_IntEar.geometry}
                material={nodes.Left_IntEar.material}
                position={[0, 1.5, 0]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Right_IntEar.geometry}
                material={nodes.Right_IntEar.material}
                position={[0, 1.5, 0]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Left_ExtEar.geometry}
                material={nodes.Left_ExtEar.material}
                position={[0, 1.5, 0]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Right_ExtEar.geometry}
                material={nodes.Right_ExtEar.material}
                position={[0, 1.5, 0]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Right_Pupil.geometry}
                material={nodes.Right_Pupil.material}
                position={[0, 1.5, 0]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Right_Iris.geometry}
                material={nodes.Right_Iris.material}
                position={[0, 1.5, 0]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Left_Iris.geometry}
                material={nodes.Left_Iris.material}
                position={[0, 1.5, 0]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Left_Pupil.geometry}
                material={nodes.Left_Pupil.material}
                position={[0, 1.5, 0]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Left_FrontLeg.geometry}
                material={nodes.Left_FrontLeg.material}
                position={[-0.01, 1.5, -0.01]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Left_HindLeg.geometry}
                material={nodes.Left_HindLeg.material}
                position={[0.01, 1.5, -0.01]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Right_FrontLeg.geometry}
                material={nodes.Right_FrontLeg.material}
                position={[-0.01, 1.5, 0.01]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Right_HindLeg.geometry}
                material={nodes.Right_HindLeg.material}
                position={[0.01, 1.5, 0.01]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Body.geometry}
                material={nodes.Body.material}
                position={[0, 1.5, 0]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Nose.geometry}
                material={nodes.Nose.material}
                position={[0, 1.5, 0]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Whiskers.geometry}
                material={nodes.Whiskers.material}
                position={[0, 1.5, 0]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Mouth.geometry}
                material={nodes.Mouth.material}
                position={[0, 1.5, 0]}
            />
        </group>
    );
}

useGLTF.preload("/cat.glb");
