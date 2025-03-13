import { ControlTheme, PolygonTheme } from "../types";
import { defaultPolygonTheme, defaultControlTheme, defaultPolygonViewTheme } from "./constant";

export class Theme {
    polygonTheme: PolygonTheme = defaultPolygonTheme;
    polygonViewTheme: PolygonTheme = defaultPolygonViewTheme;
    polygonControlTheme: ControlTheme = defaultControlTheme;

    getPolygonTheme() {
        return JSON.parse(JSON.stringify(this.polygonTheme));
    }

    getPolygonViewTheme() {
        return JSON.parse(JSON.stringify(this.polygonViewTheme));
    }

    getControlTheme() {
        return JSON.parse(JSON.stringify(this.polygonControlTheme));
    }

    setPolygonTheme(theme: PolygonTheme) {
        this.polygonTheme = theme;
    }

    setPolygonViewTheme(theme: PolygonTheme) {
        this.polygonViewTheme = theme;
    }

    setControlTheme(theme: ControlTheme) {
        this.polygonControlTheme = theme;
    }
}
