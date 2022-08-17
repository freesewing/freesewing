const name = 'Pages Plugin'
const version = '1.0.0'
export const sizes = {
  a4: [ 210, 297 ],
  a3: [ 297, 420 ],
  a2: [ 420, 594 ],
  a1: [ 594, 841 ],
  a0: [ 841, 1188 ],
  letter: [ 215.9, 279.4 ],
  tabloid: [ 279.4, 431.8 ],
}

const indexLetter = (i) => String.fromCharCode('A'.charCodeAt(0) + i - 1)

export const pagesPlugin = ({size='a4', orientation='portrait', margin=10}, outlineStyle = true ) => {
  let [sheetWidth, sheetHeight] = sizes[size];
  sheetWidth -= margin
  sheetHeight -= margin
  return basePlugin({sheetWidth, sheetHeight, orientation, outlineStyle})
}

export const cutFabricPlugin = (sheetWidth, sheetHeight) => basePlugin({sheetWidth, sheetHeight, boundary: true, partName: "cutFabric", responsiveWidth: false})

const basePlugin = ({sheetWidth, sheetHeight, orientation='portrait', boundary=false, partName="pages", responsiveWidth=true, outlineStyle=false}) => ({
  name,
  version,
  hooks: {
    postLayout: function(pattern) {
      // Add part
      pattern.parts[partName] = pattern.Part(partName)
      // Keep part out of layout
      pattern.parts[partName].layout = false
      // But add the part to the autoLayout property
      pattern.autoLayout.parts[partName] = {
        move: { x: 0, y: 0 }
      }
      // Add pages
      const { macro } = pattern.parts[partName].shorthand()
      let { height, width } = pattern
      if (!responsiveWidth) width = sheetWidth;
      if (pattern.settings.layout?.topLeft) {
        height += pattern.settings.layout.topLeft.y
        responsiveWidth && (width += pattern.settings.layout.topLeft.x)
      }

      macro('addPages', { size: [sheetWidth, sheetHeight], orientation, height, width })

      if (boundary) pattern.parts[partName].boundary();
    }
  },
  macros: {
    addPages: function(so) {
      const ls = so.orientation === 'landscape'
      const w = so.size[ls ? 1 : 0]
      const h = so.size[ls ? 0 : 1]
      const cols = Math.ceil(so.width / w)
      const rows = Math.ceil(so.height / h)
      const { points, Point, paths, Path, macro } = this.shorthand()
      let x = 0
      let y = 0
      let count = 0
      for (let row=0;row<rows;row++) {
        x=0
        for (let col=0;col<cols;col++) {
          count++
          const pageName = `_pages__row${row}-col${col}`
          points[`${pageName}-tl`] = new Point(x,y)
          points[`${pageName}-tr`] = new Point(x+w,y)
          points[`${pageName}-br`] = new Point(x+w,y+h)
          points[`${pageName}-bl`] = new Point(x,y+h)
          points[`${pageName}-circle`] = new Point(x+w/2,y+h/2)
            .attr('data-circle', 42)
            .attr('data-circle-class', 'stroke-4xl muted fabric')
            .attr('data-circle-id', `${pageName}-circle`)
          points[`${pageName}-text`] = new Point(x+w/2,y+h/2)
            .attr('data-text', `${indexLetter(col + 1)}${row + 1}`)
            .attr('data-text-class', 'text-4xl center baseline-center bold muted fill-fabric')
            .attr('data-text-id', `${pageName}-text`)

          paths[pageName] = new Path()
            .attr('id', pageName)
            .move(points[`${pageName}-tl`])
            .line(points[`${pageName}-bl`])
            .line(points[`${pageName}-br`])
            .line(points[`${pageName}-tr`])
            .close()

          if (!outlineStyle) {
            paths[pageName].attr('class', 'fill-fabric')
            .attr('style', `stroke-opacity: 0; fill-opacity: ${(col+row)%2===0 ? 0.03 : 0.09};`)
          }
          else {
            paths[pageName].attr('class', 'interfacing stroke-xs')
            macro('addPageMarkers', {row, col, pageName})
            macro('addRuler', {xAxis: true, pageName})
            macro('addRuler', {xAxis: false, pageName})
          }
          x += w
        }
        y += h
      }
      // Store page count in part
      this.pages = { cols, rows, count: cols*rows }

    },
    addRuler({xAxis, pageName}) {
      const { points, Point, paths, Path } = this.shorthand()
      const rulerLength = 2
      const isMetric = this.context.settings.units === 'metric'
      const endPointDist = [(isMetric ? 10 : 25.4) * rulerLength, 0]

      const axisName = xAxis ? 'x' : 'y'
      const endPoint = [endPointDist[xAxis ? 0 : 1], endPointDist[xAxis ? 1 : 0]]
      points[`${pageName}-${axisName}-ruler-start`] = points[`${pageName}-tl`].translate(endPoint[0], endPoint[1])
      points[`${pageName}-${axisName}-ruler-end`] = points[`${pageName}-${axisName}-ruler-start`].translate(xAxis ? 0 : 3, xAxis ? 3 : 0)
        .attr('data-text', rulerLength + (isMetric ? 'cm' : 'in'))
        .attr('data-text-class', 'fill-interfacing baseline-center' +  (xAxis ? ' center' : ''))
        .attr('data-text-id', `${pageName}-${axisName}-ruler-text`)
        .attr(`data-text-d${xAxis ? 'y' : 'x'}`, xAxis ? 5 : 3)
      paths[`${pageName}-${axisName}-ruler`] = new Path()
        .move(points[`${pageName}-tl`])
        .attr('id', `${pageName}-${axisName}-ruler`)

      const division = (isMetric ? 0.1 : 0.125) / rulerLength
      for (var d = division; d < 1; d+= division) {
        points[`${pageName}-${axisName}-ruler-${d}-start`] = points[`${pageName}-tl`].shiftFractionTowards(points[`${pageName}-${axisName}-ruler-start`], d)

        let tick = 1;
        if (d.toFixed(3) % (1/rulerLength) === 0) tick = 3
        else if (d.toFixed(3) % (0.5/rulerLength) === 0) tick = 2

        points[`${pageName}-${axisName}-ruler-${d}-end`] = points[`${pageName}-${axisName}-ruler-${d}-start`].translate(xAxis ? 0 : tick, xAxis ? tick : 0)

        paths[`${pageName}-${axisName}-ruler`]
          .line(points[`${pageName}-${axisName}-ruler-${d}-start`])
          .line(points[`${pageName}-${axisName}-ruler-${d}-end`])
          .line(points[`${pageName}-${axisName}-ruler-${d}-start`])
      }

      paths[`${pageName}-${axisName}-ruler`]
      .line(points[`${pageName}-${axisName}-ruler-start`])
      .line(points[`${pageName}-${axisName}-ruler-end`])
      .attr('class', 'interfacing stroke-xs')

    },
    addPageMarkers({row, col, pageName}) {
      const {macro, points} = this.shorthand()
      if (row !== 0) macro('addPageMarker', {
        along: [points[`${pageName}-tl`], points[`${pageName}-tr`]],
        label: '' + row,
        isRow: true,
        pageName
      })
      if (col !== 0) macro('addPageMarker', {
        along: [points[`${pageName}-tl`], points[`${pageName}-bl`]],
        label: indexLetter(col),
        isRow: false,
        pageName
      })
    },
    addPageMarker({along, label, isRow, pageName}) {
      const {points, paths, Point, Path} = this.shorthand()
      const markerName = `${pageName}-${isRow ? 'row' : 'col'}-marker`
      points[`${markerName}-center`] = along[0].shiftFractionTowards(along[1], 0.5)
        .attr('data-text', label)
        .attr('data-text-class', 'text-sm center baseline-center bold')
        .attr('data-text-id', markerName + '-text')
      points[`${markerName}-r`] = points[`${markerName}-center`].translate(-5, 0)
      points[`${markerName}-l`] = points[`${markerName}-center`].translate(5, 0)
      points[`${markerName}-t`] = points[`${markerName}-center`].translate(0, -5)
      points[`${markerName}-b`] = points[`${markerName}-center`].translate(0, 5)

      paths[markerName] = new Path()
        .move(points[`${markerName}-r`])
        .line(points[`${markerName}-t`])
        .line(points[`${markerName}-l`])
        .line(points[`${markerName}-b`])
        .close()
        .attr('class', 'fill-interfacing interfacing')
        .attr('id', markerName)
    }
  }
})
