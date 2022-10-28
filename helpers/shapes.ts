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
