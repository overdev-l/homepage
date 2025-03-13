import { Stash } from "../stash"
import { StashPolygon } from "../types"
import { createShape } from "./create"
import { createExistingShape } from "./create"
import { Receiver } from "./Receover"

/**
 * 预先处理多边形
 * @param this 
 * @param newPointers 
 */
export function polygonUnion(this:Stash, newPointers: StashPolygon) {
    const pointers = this.polygons
    const newPolygon = polygonUnionHandler(pointers, newPointers)
    this.polygons = [...pointers, {
        ...newPointers,
        points: newPolygon,
    }]
}

export function polygonUnionHandler(pointers: StashPolygon[], newPointers: StashPolygon) {
    // 创建新多边形的 shape
    const newShape = createShape(newPointers.points)

    // 如果没有已存在的多边形,直接返回新多边形
    if (pointers.length === 0) {
        const receiver = new Receiver()
        const resultPaths = newShape.output(receiver).done()
        return resultPaths[0]
    }

    // 创建已存在多边形的 shapes
    const existingShape = createExistingShape(pointers)

    // 计算新多边形与已存在多边形的相交部分
    const intersection = existingShape.combine(newShape).intersect()
    
    // 从新多边形中减去相交部分
    const result = newShape.combine(intersection).difference()

    // 输出结果
    const receiver = new Receiver()
    const resultPaths = result.output(receiver).done()
    return resultPaths[0]
}