import { Canvas } from "fabric";
import { useEffect, useRef } from "react";

export default function useRender(id: string) {
    const fabricCanvas = useRef<any | null>(null);
    const init = () => {
        const canvas = document.getElementById(id) as HTMLCanvasElement;
        if (!canvas) {
            throw new Error('Failed to get 2d context');
        }
        fabricCanvas.current = new Canvas(canvas);
        console.log(canvas);

    }
    useEffect(() => {
        init();
    }, []);

}