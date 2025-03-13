import polybool from "@velipso/polybool"
import { Point } from "fabric"
import { StashPolygon } from "../types"

/**
 * 创建多边形
 * @param pointers 
 * @returns 
 */
export function createShape(pointers: Array<Point>) {
    const newShape = polybool.shape().beginPath()
    pointers.forEach((point, index) => {
        if (index === 0) {
            newShape.moveTo(point.x, point.y)
        } else {
            newShape.lineTo(point.x, point.y)
        }
    })
    newShape.closePath()
    return newShape
}


export function createExistingShape(polygons: StashPolygon[]) {
    const existingShape = polybool.shape().beginPath()
    polygons.forEach(polygon => {
        polygon.points.forEach((point, index) => {
            if (index === 0) {
                existingShape.moveTo(point.x, point.y)
            } else {
                existingShape.lineTo(point.x, point.y)
            }
        })
        existingShape.closePath()
    })
    return existingShape
}