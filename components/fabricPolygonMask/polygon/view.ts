import { TPointerEvent, TPointerEventInfo, Polygon, Point } from "fabric";
import { PolygonUtil } from "./polygonUtil";
import { nanoid } from "nanoid";

export class ViewTool {
    public polygonUtil: PolygonUtil;

    private polygonView?: Polygon;
    public isEnable: boolean = false;
    public isMouseDown: boolean = false;
    public isCover: boolean = true;
    public pointers: Point[] = [];
    public lastPointer: Point = new Point();
    constructor(polygonUtil: PolygonUtil) {
        this.polygonUtil = polygonUtil;
        this.bindEvent();
    }

    bindEvent() {
        this.polygonUtil.canvas.on('mouse:down', this.onMouseDown.bind(this));
        this.polygonUtil.canvas.on('mouse:move', this.onMouseMove.bind(this));
        window.addEventListener('keydown', this.onKeyDown.bind(this));
    }

    unbindEvent() {
        this.polygonUtil.canvas.off('mouse:down', this.onMouseDown.bind(this));
        this.polygonUtil.canvas.off('mouse:move', this.onMouseMove.bind(this));
        window.removeEventListener('keydown', this.onKeyDown.bind(this));
    }

    onMouseDown(e: TPointerEventInfo<TPointerEvent>) {
        if (!this.isEnable) return;
        this.isMouseDown = true;
        const pointer = this.polygonUtil.canvas.getScenePoint(e.e);
        this.pointers.push(pointer);
        this.lastPointer = pointer;
        this.render();
    }
    onMouseMove(e: TPointerEventInfo<TPointerEvent>) {
        if (!this.isEnable) return;
        if (!this.isMouseDown) return;
        const pointer = this.polygonUtil.canvas.getScenePoint(e.e);
        this.lastPointer = pointer;
        this.render();
    }
    onKeyDown(e: KeyboardEvent) {
        if (e.key === ' ') {
            e.preventDefault();
            e.stopPropagation();
            this.commit();
            this.removeViewPolygon();
        }
    }

    render() {
        const ifViewPolygonInCanvas = this.polygonUtil.canvas.getObjects().some(obj => obj.get('name') === 'view-polygon');
        if (ifViewPolygonInCanvas && this.polygonView) {
            this.polygonUtil.canvas.remove(this.polygonView);
        }
        this.polygonView = new Polygon([...this.pointers, this.lastPointer], {
            fill: this.polygonUtil.theme.getPolygonViewTheme().fill,
            stroke: this.polygonUtil.theme.getPolygonViewTheme().stroke,
            strokeWidth: this.polygonUtil.theme.getPolygonViewTheme().strokeWidth,
        })
        this.polygonView.set({
            name: 'view-polygon',
        })
        this.polygonUtil.canvas.add(this.polygonView);
        this.polygonUtil.canvas.renderAll();
    }

    removeViewPolygon() {
        const ifViewPolygonInCanvas = this.polygonUtil.canvas.getObjects().some(obj => obj.get('name') === 'view-polygon');
        if (ifViewPolygonInCanvas && this.polygonView) {
            this.polygonUtil.canvas.remove(this.polygonView);
        }
    }
    
    commit() {
        this.isEnable = false;
        this.polygonUtil.stash.addPolygon({
            points: this.pointers,
            id: nanoid(),
            theme: this.polygonUtil.theme.getPolygonTheme(),
            controlTheme: this.polygonUtil.theme.getControlTheme(),
            isCover: this.isCover,
        });
        this.polygonUtil.stash.render();
        this.pointers = [];
    }
}