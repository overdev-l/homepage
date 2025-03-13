import { Canvas } from 'fabric';
import { ViewTool } from './view';
import { Stash } from './stash';
import { Theme } from './theme';

export class PolygonUtil {
    public canvas: Canvas;

    public viewTool: ViewTool;
    public stash: Stash;
    public theme: Theme;
    constructor(canvas: Canvas) {
        this.theme = new Theme();
        this.canvas = canvas;
        this.viewTool = new ViewTool(this);
        this.stash = new Stash(this);
    }

    enableViewTool() {
        this.viewTool.isEnable = true;
    }

    disableViewTool() {
        this.viewTool.isEnable = false;
    }

    changeIsCoverInViewTool(isCover: boolean) {
        this.viewTool.isCover = isCover;
    }
}
