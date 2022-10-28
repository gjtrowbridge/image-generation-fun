import { saveSVGFile } from './helpers'
import { getNewSVGCanvas } from './helpers'

const canvas = getNewSVGCanvas()
canvas.viewbox(0, 0, 1000, 1000)

let totalSoFar = 0
let radius = 1
for (let circleNumber = 0; circleNumber < 10; circleNumber++) {
  const newRadius = radius + 10
  canvas
    .circle(radius * 2)
    .fill('none')
    .stroke({
      color: 'black',
      width: 1,
    })
    .move(totalSoFar, totalSoFar)
  const xyDistanceToEdge = (totalSoFar +=
    radius + radius / Math.sqrt(2) - newRadius + newRadius / Math.sqrt(2))

  radius = newRadius
}

void saveSVGFile('example', canvas.svg())
