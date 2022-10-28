import { getNewSVGCanvas, saveSVGFile } from './helpers'
import { getEquilateralPolygon } from './helpers/shapes'

const canvas = getNewSVGCanvas()
canvas.viewbox(0, 0, 1000, 1000)

canvas.polygon(getEquilateralPolygon(500, 8, [500, 500]))

void saveSVGFile('gravityPentagon', canvas.svg())
