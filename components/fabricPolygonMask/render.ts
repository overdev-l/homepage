import { Canvas, FabricImage } from "fabric";
import { useEffect, useRef } from "react";
import { PolygonUtil } from "./polygon";
import { loadImage } from "utils/dom";

const imageUrl = 'https://cdn.overdev.cn/ef18d561-bec8-4417-8245-55ff71b1d2bf.png'

export default function useRender(id: string) {
    const fabricCanvas = useRef<any | null>(null);
    const polygonUtil = useRef<PolygonUtil | null>(null);
    const init = () => {
        const canvas = document.getElementById(id) as HTMLCanvasElement;
        if (!canvas) {
            throw new Error('Failed to get 2d context');
        }
        if (!fabricCanvas.current) {
            fabricCanvas.current = new Canvas(canvas, {
                selection: false,
                width: 580,
                height: 580,
            });
            fabricCanvas.current.setDimensions({
                width: 580,
                height: 580,
            })
            loadImage(imageUrl).then((img) => {
                const image = new FabricImage(img, {
                    left: 0,
                    top: 0,
                    originX: 'center',
                    originY: 'center',
                    selectable: false,
                    evented: false,
                })
                image.scaleToWidth(580);
                image.scaleToHeight(580);
                image.set({
                    left: 290,
                    top: 290,
                })
                console.log('1')
                fabricCanvas.current?.add(image);
                if (!polygonUtil.current) {
                    polygonUtil.current = new PolygonUtil(fabricCanvas.current);
                }
            })
        }
    }
    useEffect(() => {
        init();
        return () => {
            fabricCanvas.current?.destroy();
            polygonUtil.current?.disableViewTool();
        }
    }, []);
    return {
        polygonUtil: polygonUtil,
    }
}