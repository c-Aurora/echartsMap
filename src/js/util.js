//  射线法判断点是否在多边形内部

// {Object} p 待判断的点，格式：{ x: X坐标, y: Y坐标 }

// {Array} poly 多边形顶点，数组成员的格式同 p

//{String} 点 p 和多边形 poly 的几何关系

/**
* p :[x,y] ,带判定的P点
* poly: [[x0,y0],[x1,y1]......] 多边形的路径
*/
export function rayCasting(p, poly) {
    // px，py为p点的x和y坐标
    let px = p[0],
        py = p[1],
        flag = false
    //  console.log(poly.length,'哈哈',poly[0][0])
    //这个for循环是为了遍历多边形的每一个线段
    for(let i = 0, l = poly.length, j = l - 1; i < l; j = i, i++) {
        let sx = poly[i][0],  //线段起点x坐标
            sy = poly[i][1],  //线段起点y坐标
            tx = poly[j][0],  //线段终点x坐标
            ty = poly[j][1]   //线段终点y坐标

        // 点与多边形顶点重合
        if((sx === px && sy === py) || (tx === px && ty === py)) {
            return true
        }

        // 点的射线和多边形的一条边重合，并且点在边上
        if((sy === ty && sy === py) && ((sx > px && tx < px) || (sx < px && tx > px))) {
            return true
        }

        // 判断线段两端点是否在射线两侧
        if((sy < py && ty >= py) || (sy >= py && ty < py)) {
            // 求射线和线段的交点x坐标，交点y坐标当然是py  线段上与射线 Y 坐标相同的点的 X 坐标
            let x = sx + (py - sy) * (tx - sx) / (ty - sy)

            // 点在多边形的边上
            if(x === px) {
                return true
            }

            // x大于px来保证射线是朝右的，往一个方向射，假如射线穿过多边形的边界，flag取反一下
            if(x > px) {
                flag = !flag
            }
        }
    }

    // 射线穿过多边形边界的次数为奇数时点在多边形内
    return flag ? true : false
}


//判断点有没有在某个行政区
export function isPointInAreas(p, mapJson) {
    const areas = mapJson.features
    // console.log(areas,'areas')
    let flag = false
    console.log(areas[0].geometry.coordinates[0],'areas')
    for (let i = 0; i < areas.length; i++) {
        // console.log(areas[i].geometry.coordinates,'areas')
        if( rayCasting(p, areas[i].geometry.coordinates[0]) ) {
            flag = true
            break
        }
    }
    return flag
}
