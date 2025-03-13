import { Point } from "fabric/*";

export interface PolygonTheme {
    fill: string;
    stroke: string;
    strokeWidth: number;
}

export interface ControlTheme {
    fill: string;
    stroke: string;
    strokeWidth: number;
}

export interface ViewPolygonTheme extends PolygonTheme {
}

export interface Polygon {
    points: Point[];
    theme: PolygonTheme;
    controlTheme: ControlTheme;
}

export interface StashPolygon {
    points: Point[];
    theme: PolygonTheme;
    controlTheme: ControlTheme;
    id: string;
    isCover: boolean;
}
