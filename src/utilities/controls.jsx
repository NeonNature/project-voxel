import { useEffect, useState } from "react";

export const usePersonControls = () => {
    const [movement, setMovement] = useState({
        forward: false,
        backward: false,
        left: false,
        right: false,
    });

    const keys = {
        KeyW: "forward",
        KeyS: "backward",
        KeyA: "left",
        KeyD: "right",
    };

    const moveFieldByKey = (key) => keys[key];

    useEffect(() => {
        const handleKeyDown = (e) => {
            setMovement((m) => ({ ...m, [moveFieldByKey(e.code)]: true }));
        };
        const handleKeyUp = (e) => {
            setMovement((m) => ({ ...m, [moveFieldByKey(e.code)]: false }));
        };
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    return movement;
};
