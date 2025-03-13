'use client';
import { useState } from "react";
import Button from "../components/Button";
import useRender from "../components/fabricPolygonMask/render";
export default function FabricPolygonMask() {
    const { polygonUtil } = useRender('canvas');
    const [isCover, setIsCover] = useState(true);
    return (
        <div className="w-full h-full">
            <div className="flex gap-2">
                <Button onClick={() => {
                    polygonUtil.current?.enableViewTool();
                }}>
                    开始标注，按下空格结束
                </Button>
                <Button onClick={() => {
                    polygonUtil.current?.changeIsCoverInViewTool(!isCover);
                    setIsCover(!isCover);
                }}>
                    相交{isCover ? '覆盖' : '裁剪'}
                </Button>
            </div>
            <div className="w-full mt-2 border border-gray-300 rounded-md h-[580px]">
                <canvas id="canvas" className="w-full h-full"></canvas>
            </div>
        </div>
    )
}