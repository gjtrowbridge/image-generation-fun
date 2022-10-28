import { Svg } from '@svgdotjs/svg.js'
import { writeFile } from 'fs/promises'

export function saveSVGFile(fileName: string, svgContents: string) {
  return writeFile(__dirname + '/../dist/' + fileName + '.svg', svgContents, {
    encoding: 'utf-8',
  })
}

export function getNewSVGCanvas(): Svg {
  const { createSVGWindow } = require('svgdom')
  const window = createSVGWindow()
  const document = window.document
  const { SVG, registerWindow } = require('@svgdotjs/svg.js')
  registerWindow(window, document)
  const draw = SVG()
  return SVG(document.documentElement)
}
