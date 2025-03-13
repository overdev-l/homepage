import { nanoid } from "nanoid";
import { BasicTransformEvent, Circle, FabricObject, Point, Polygon, TPointerEvent } from "fabric";
import { PolygonUtil } from "./polygonUtil";
import { StashPolygon } from "./types";
import { defaultControlTheme, defaultPolygonPointerJson, defaultPolygonTheme } from "./default";
import { polygonUnion } from "./polybool";
export class Stash {
    public polygonUtil: PolygonUtil;

    public polygons: StashPolygon[] = [];
    constructor(polygonUtil: PolygonUtil) {
        this.polygonUtil = polygonUtil;
        const pointers = JSON.parse(defaultPolygonPointerJson) as { x: number, y: number }[];
        this.addPolygon({
            points: pointers.map(item => new Point(item.x, item.y)),
            theme: defaultPolygonTheme,
            controlTheme: defaultControlTheme,
            id: nanoid(),
            isCover: false,
        });
        this.render();
        this.bindEvent();
    }

    bindEvent() {
        this.polygonUtil.canvas.on('object:moving', this.onObjectMoving.bind(this));
    }

    unbindEvent() {
        this.polygonUtil.canvas.off('object:moving', this.onObjectMoving.bind(this));
    }

    onObjectMoving(e: BasicTransformEvent<TPointerEvent> & {
        target: FabricObject;
    }) {
        const target = e.target
        const polygonId = target.get('polygonId');
        const pointerIndex = target.get('pointerIndex');
        if (polygonId !== undefined && pointerIndex !== undefined) {
            const polygonElement = this.polygonUtil.canvas.getObjects().find(item => item.get('id') === polygonId);
            if (!polygonElement ) return 
            const polygon = this.polygons.find(item => item.id === polygonId);
            if (!polygon) return
            const newPoints = target.getCenterPoint()
            const pointers = polygonElement.get('points')
            pointers[pointerIndex] = newPoints
            polygonElement.set('points', pointers);
            this.polygonUtil.canvas.renderAll();
        }
    }

    addPolygon(polygon: StashPolygon) {
        if (polygon.isCover) {
            this.polygons.push(polygon);
        } else {
            polygonUnion.call(this, polygon);
        }
    }

    removeAllPolygonByCanvas() {
        const ids = this.polygons.map(polygon => polygon.id);
        const allPolygon = this.polygonUtil.canvas.getObjects().filter(obj => ids.includes(obj.get('id')));
        const allControl = this.polygonUtil.canvas.getObjects().filter(obj => ids.includes(obj.get('polygonId')));
        this.polygonUtil.canvas.remove(...allPolygon, ...allControl);
    }

    renderAllPolygon() {
        this.polygons.forEach(item => {
            const polygon = new Polygon(item.points, {
                fill: item.theme.fill,
                stroke: item.theme.stroke,
                strokeWidth: item.theme.strokeWidth,
                selectable:false,
                hasBorders: false,
                hasControls: false,
                objectCaching: false,
            });
            polygon.set({
                id: item.id,
            });
            this.polygonUtil.canvas.add(polygon);
        });
    }

    renderAllControl() {
        this.polygons.forEach(item => {
            item.points.forEach((point, index) => {
                const control = new Circle({
                    fill: item.controlTheme.fill,
                    stroke: item.controlTheme.stroke,
                    strokeWidth: item.controlTheme.strokeWidth,
                    originX: 'center',
                    originY: 'center',
                    radius: 3,
                    left: point.x,
                    top: point.y,
                    hasControls: false,
                    hasBorders: false,
                });
                control.set({
                    polygonId: item.id,
                    pointerIndex: index,
                });
                this.polygonUtil.canvas.add(control);
            });
        });
    }
    render() {
        this.removeAllPolygonByCanvas();
        this.renderAllPolygon();
        this.renderAllControl();
    }
}