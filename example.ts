import { saveSVGFile } from './helpers'
import { getNewSVGCanvas } from './helpers'

const canvas = getNewSVGCanvas()
canvas.rect(100, 100).fill('green').move(50, 50)

void saveSVGFile('test', canvas.svg())
