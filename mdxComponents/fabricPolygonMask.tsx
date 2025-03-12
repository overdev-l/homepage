'use client';
import Button from "../components/Button";
import useRender from "../components/fabricPolygonMask/render";
export default function FabricPolygonMask() {
    useRender('canvas');
    return (
        <div className="w-full h-full">
            <div className="flex gap-2">
                <Button onClick={() => { }}>
                    开始标注，按下空格结束
                </Button>
            </div>
            <div className="w-full mt-2 border border-gray-300 rounded-md h-[580px]">
                <canvas id="canvas" className="w-full h-full"></canvas>
            </div>
        </div>
    )
}