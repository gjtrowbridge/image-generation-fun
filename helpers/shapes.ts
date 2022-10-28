const RADIANS_IN_CIRCLE = 2 * Math.PI

export function getEquilateralPolygon(
  // The radius of the circle where you're drawing the polygon
  radius: number,
  numVertices: number,
  center: [number, number]
): Array<[number, number]> {
  const points: Array<[number, number]> = []

  for (let i = 0; i < numVertices; i++) {
    const angle = i * (RADIANS_IN_CIRCLE / numVertices) - RADIANS_IN_CIRCLE / 4
    const xOffset = radius * Math.cos(angle)
    const yOffset = radius * Math.sin(angle)
    points.push([center[0] + xOffset, center[1] + yOffset])
  }
  return points
}

export function distanceBetweenPoints(
  point1: [number, number],
  point2: [number, number]
): number {
  return Math.sqrt((point1[0] - point2[0]) ** 2 + (point1[1] - point2[1]) ** 2)
}

// function doLinesOverlap() {
//   // If parallel, return false
//   // If non-parallel, calculate intersection point, make sure it is in bounds for both
// }
//
// export function doPolygonsOverlap(
//   points1: Array<[number, number]>,
//   points2: Array<[number, number]>
// ) {}
