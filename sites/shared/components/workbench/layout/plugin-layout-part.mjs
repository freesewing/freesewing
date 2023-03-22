const name = 'Pages Plugin'
const version = '1.0.0'
export const sizes = {
  a4: [210, 297],
  a3: [297, 420],
  a2: [420, 594],
  a1: [594, 841],
  a0: [841, 1188],
  letter: [215.9, 279.4],
  tabloid: [279.4, 431.8],
}

/** get a letter to represent an index less than 26*/
const indexLetter = (i) => String.fromCharCode('A'.charCodeAt(0) + i - 1)

/** get a string of letters to represent an index */
const indexStr = (i) => {
  let index = i % 26
  let quotient = i / 26
  let result

  if (i <= 26) {
    return indexLetter(i)
  } //Number is within single digit bounds of our encoding letter alphabet

  if (quotient >= 1) {
    //This number was bigger than the alphabet, recursively perform this function until we're done
    if (index === 0) {
      quotient--
    } //Accounts for the edge case of the last letter in the dictionary string
    result = indexStr(quotient)
  }

  if (index === 0) {
    index = 26
  } //Accounts for the edge case of the final letter; avoids getting an empty string

  return result + indexLetter(index)
}
/**
 * A plugin to add printer pages
 * */
export const pagesPlugin = ({ size = 'a4', ...settings }) => {
  const ls = settings.orientation === 'landscape'
  let sheetHeight = sizes[size][ls ? 0 : 1]
  let sheetWidth = sizes[size][ls ? 1 : 0]
  sheetWidth -= settings.margin * 2
  sheetHeight -= settings.margin * 2

  return basePlugin({ ...settings, sheetWidth, sheetHeight })
}

export const fabricPlugin = (settings) => {
  return basePlugin({
    ...settings,
    partName: 'fabric',
    responsiveColumns: false,
  })
}

/** check if there is anything to render on the given section of the svg so that we can skip empty pages */
const doScanForBlanks = (stacks, layout, x, y, w, h) => {
  let hasContent = false
  for (var s in stacks) {
    let stack = stacks[s]

    // get the position of the part
    let stackLayout = layout.stacks[s]
    if (!stackLayout) continue

    let stackMinX = stackLayout.tl?.x || stackLayout.move.x + stack.topLeft.x
    let stackMinY = stackLayout.tl?.y || stackLayout.move.y + stack.topLeft.y
    let stackMaxX = stackLayout.br?.x || stackMinX + stack.width
    let stackMaxY = stackLayout.br?.y || stackMinY + stack.height

    // check if the stack overlaps the page extents
    if (
      // if the left of the stack is further left than the right end of the page
      stackMinX < x + w &&
      // and the top of the stack is above the bottom of the page
      stackMinY < y + h &&
      // and the right of the stack is further right than the left of the page
      stackMaxX > x &&
      // and the bottom of the stack is below the top to the page
      stackMaxY > y
    ) {
      // the stack has content inside the page
      hasContent = true
      // so we stop looking
      break
    }
  }

  return hasContent
}

function addToOnly(pattern, partName) {
  const only = pattern.settings[0].only
  if (only && !only.includes(partName)) {
    pattern.settings[0].only = [].concat(only, partName)
  }
}

function removeFromOnly(pattern, partName) {
  const only = pattern.settings[0].only
  if (only && only.includes(partName)) {
    pattern.settings[0].only.splice(only.indexOf(partName), 1)
  }
}
/**
 * The base plugin for adding a layout helper part like pages or fabric
 * sheetWidth: the width of the helper part
 * sheetHeight: the height of the helper part
 * boundary: should the helper part calculate its boundary?
 * responsiveColumns: should the part make more columns if the pattern exceed its width? (for pages you want this, for fabric you don't)
 * printStyle: should the pages be rendered for printing or for screen viewing?
 * */
const basePlugin = ({
  sheetWidth,
  sheetHeight,
  // boundary = false,
  partName = 'pages',
  responsiveColumns = true,
  printStyle = false,
  scanForBlanks = true,
  renderBlanks = true,
  setPatternSize = false,
}) => ({
  name,
  version,
  hooks: {
    preDraft: function (pattern) {
      if (!responsiveColumns) {
        pattern.settings[0].maxWidth = sheetWidth
      }

      addToOnly(pattern, partName)
      // Add part
      pattern.addPart({
        name: partName,
        draft: (shorthand) => {
          const layoutData = shorthand.store.get('layoutData')
          // only actually draft the part if layout data has been set
          if (layoutData) {
            shorthand.macro('addPages', layoutData, shorthand)
            shorthand.part.unhide()
          } else {
            shorthand.part.hide()
          }
          return shorthand.part
        },
      })
    },
    postLayout: function (pattern) {
      let { height, width, stacks } = pattern
      if (!responsiveColumns) width = sheetWidth
      // get the layout
      const layout =
        typeof pattern.settings[pattern.activeSet].layout === 'object'
          ? pattern.settings[pattern.activeSet].layout
          : pattern.autoLayout

      // if the layout doesn't start at 0,0 we want to account for that in our height and width
      if (layout?.topLeft) {
        height += layout.topLeft.y
        responsiveColumns && (width += layout.topLeft.x)
      }

      // store the layout data so the part can use it during drafting
      pattern.setStores[pattern.activeSet].set('layoutData', {
        size: [sheetHeight, sheetWidth],
        height,
        width,
        layout,
        stacks,
      })

      // draft the part
      pattern.draftPartForSet(partName, pattern.activeSet)

      // if the pattern size is supposed to be re-set to the full width and height of all pages, do that
      if (setPatternSize) {
        const generatedPageData = pattern.setStores[pattern.activeSet].get('pages')
        pattern.width = sheetWidth * generatedPageData.cols
        pattern.height = sheetHeight * generatedPageData.rows
      }

      removeFromOnly(pattern, partName)
    },
    preRender: function (svg) {
      addToOnly(svg.pattern, partName)
    },
    postRender: function (svg) {
      removeFromOnly(svg.pattern, partName)
    },
  },
  macros: {
    /** draft the pages */
    addPages: function (so, shorthand) {
      const [h, w] = so.size
      const cols = Math.ceil(so.width / w)
      const rows = Math.ceil(so.height / h)
      const { points, Point, paths, Path, part, macro, store } = shorthand
      let count = 0
      let withContent = {}
      part.topLeft = so.layout.topLeft || { x: 0, y: 0 }

      // get the layout from the pattern
      const { layout } = so
      for (let row = 0; row < rows; row++) {
        let y = row * h
        withContent[row] = {}
        for (let col = 0; col < cols; col++) {
          let x = col * w
          let hasContent = true
          if (scanForBlanks && layout) {
            hasContent = doScanForBlanks(so.stacks, layout, x, y, w, h)
          }
          withContent[row][col] = hasContent
          if (!renderBlanks && !hasContent) continue
          if (hasContent) count++
          const pageName = `_pages__row${row}-col${col}`
          points[`${pageName}-tl`] = new Point(x, y)
          points[`${pageName}-tr`] = new Point(x + w, y)
          points[`${pageName}-br`] = new Point(x + w, y + h)
          points[`${pageName}-bl`] = new Point(x, y + h)
          points[`${pageName}-circle`] = new Point(x + w / 2, y + h / 2)
            .setCircle(56, 'stroke-4xl muted fabric')
            .attr('data-circle-id', `${pageName}-circle`)
          points[`${pageName}-text`] = new Point(x + w / 2, y + h / 2)
            .setText(
              `${indexStr(col + 1)}${row + 1}`,
              'text-4xl center baseline-center bold muted fill-fabric'
            )
            .attr('data-text-id', `${pageName}-text`)

          paths[pageName] = new Path()
            .attr('id', pageName)
            .move(points[`${pageName}-tl`])
            .line(points[`${pageName}-bl`])
            .line(points[`${pageName}-br`])
            .line(points[`${pageName}-tr`])
            .close()

          if (col === cols - 1 && row === rows - 1) {
            const br = points[`${pageName}-br`]
            part.width = br.x
            part.height = br.y
            part.bottomRight = { x: br.x, y: br.y }
          }

          if (!printStyle) {
            paths[pageName]
              .attr('class', 'fill-fabric')
              .attr(
                'style',
                `stroke-opacity: 0; fill-opacity: ${(col + row) % 2 === 0 ? 0.03 : 0.09};`
              )
          } else {
            paths[pageName].attr('class', 'interfacing stroke-xs')
            // add markers and rulers
            macro('addPageMarkers', { row, col, pageName, withContent }, shorthand)
            macro('addRuler', { xAxis: true, pageName }, shorthand)
            macro('addRuler', { xAxis: false, pageName }, shorthand)
          }
        }
      }
      // Store page count in part
      store.set(partName, { cols, rows, count, withContent, width: w, height: h })
    },
    /** add a ruler to the top left corner of the page */
    addRuler({ xAxis, pageName }, shorthand) {
      const { points, paths, Path } = shorthand
      const isMetric = this.context.settings.units === 'metric'
      // not so arbitrary number of units for the ruler
      const rulerLength = isMetric ? 10 : 2
      // distance to the end of the ruler
      const endPointDist = [(isMetric ? 10 : 25.4) * rulerLength, 0]

      const axisName = xAxis ? 'x' : 'y'
      const rulerName = `${pageName}-${axisName}`
      // start by making an endpoint for the ruler based on the axis
      const endPoint = [endPointDist[xAxis ? 0 : 1], endPointDist[xAxis ? 1 : 0]]
      points[`${rulerName}-ruler-end`] = points[`${pageName}-tl`].translate(
        endPoint[0],
        endPoint[1]
      )
      // also make a tick for the end of the ruler
      points[`${rulerName}-ruler-tick`] = points[`${rulerName}-ruler-end`]
        .translate(xAxis ? 0 : 3, xAxis ? 3 : 0)
        // add a label to it
        .attr('data-text', rulerLength + (isMetric ? 'cm' : '&quot;'))
        // space the text properly from the end of the line
        .attr('data-text-class', 'fill-interfacing baseline-center' + (xAxis ? ' center' : ''))
        .attr(`data-text-d${xAxis ? 'y' : 'x'}`, xAxis ? 5 : 3)
        // give the text an explicit id in case we need to hide it later
        .attr('data-text-id', `${rulerName}-ruler-text`)

      // start the path
      paths[`${rulerName}-ruler`] = new Path()
        .move(points[`${pageName}-tl`])
        // give it an explicit id in case we need to hide it later
        .attr('id', `${rulerName}-ruler`)
        .attr('class', 'interfacing stroke-xs')

      // get the distance between the smaller ticks on the rule
      const division = (isMetric ? 0.1 : 0.125) / rulerLength
      // Set up intervals for whole and half units.
      const wholeInterval = isMetric ? 10 : 8
      const halfInterval = isMetric ? 5 : 4
      let tickCounter = 1
      // we're going to go by fraction, so we want to do this up to 1
      for (var d = division; d < 1; d += division) {
        // make a start point
        points[`${rulerName}-ruler-${d}-end`] = points[`${pageName}-tl`].shiftFractionTowards(
          points[`${rulerName}-ruler-end`],
          d
        )

        // base tick size on whether this is a major interval or a minor one
        let tick = 1
        // if this tick indicates a whole unit, extra long
        if (tickCounter % wholeInterval === 0) tick = 3
        // if this tick indicates half a unit, long
        else if (tickCounter % halfInterval === 0) tick = 2
        tickCounter++

        // make a point for the end of the tick
        points[`${rulerName}-ruler-${d}-tick`] = points[`${rulerName}-ruler-${d}-end`].translate(
          xAxis ? 0 : tick,
          xAxis ? tick : 0
        )

        // add the whole set to the ruler path
        paths[`${rulerName}-ruler`]
          .line(points[`${rulerName}-ruler-${d}-end`])
          .line(points[`${rulerName}-ruler-${d}-tick`])
          .line(points[`${rulerName}-ruler-${d}-end`])
      }

      // add the end
      paths[`${rulerName}-ruler`]
        .line(points[`${rulerName}-ruler-end`])
        .line(points[`${rulerName}-ruler-tick`])
    },
    /** add page markers to the given page */
    addPageMarkers({ row, col, pageName, withContent }, shorthand) {
      const { macro, points } = shorthand
      // these markers are placed on the top and left of the page,
      // so skip markers for the top row or leftmost column
      if (row !== 0 && withContent[row - 1][col])
        macro('addPageMarker', {
          along: [points[`${pageName}-tr`], points[`${pageName}-tl`]],
          label: [`${row}`, `${row + 1}`],
          isRow: true,
          pageName,
        })
      if (col !== 0 && withContent[row][col - 1])
        macro('addPageMarker', {
          along: [points[`${pageName}-tl`], points[`${pageName}-bl`]],
          label: [indexStr(col), indexStr(col + 1)],
          isRow: false,
          pageName,
        })
    },
    /** add a page marker for either the row or the column, to aid with alignment and orientation */
    addPageMarker({ along, label, isRow, pageName }) {
      const { points, paths, Path, scale } = this.shorthand()
      const markerName = `${pageName}-${isRow ? 'row' : 'col'}-marker`

      // x and y distances between corners. one will always be 0, which is helpful
      const xDist = along[0].dx(along[1])
      const yDist = along[0].dy(along[1])

      // size of the x mark should be impacted by the scale setting
      const markSize = 4 * scale

      // make one at 25% and one at 75%
      for (var d = 25; d < 100; d += 50) {
        // get points to make an x at d% along the edge
        const dName = `${markerName}-${d}`
        const centerName = `${dName}-center`
        points[centerName] = along[0].translate((xDist * d) / 100, (yDist * d) / 100)
        points[`${dName}-tr`] = points[centerName].translate(-markSize, markSize)
        points[`${dName}-tl`] = points[centerName].translate(-markSize, -markSize)
        points[`${dName}-br`] = points[centerName].translate(markSize, markSize)
        points[`${dName}-bl`] = points[centerName].translate(markSize, -markSize)

        // make a path for the x
        paths[`${dName}`] = new Path()
          .move(points[`${dName}-tr`])
          .line(points[`${dName}-bl`])
          .move(points[`${dName}-tl`])
          .line(points[`${dName}-br`])
          .attr('class', 'interfacing stroke-xs')
          // give it an explicit ID in case we need to hide it later
          .attr('id', dName)

        // add directional labels
        let angle = along[0].angle(along[1]) - 90
        for (var i = 0; i < 2; i++) {
          points[`${dName}-label-${i + 1}`] = points[centerName]
            .shift(angle, markSize)
            .setText(label[i], 'text-xs center baseline-center fill-interfacing')
            // give it an explicit ID in case we need to hide it later
            .attr('data-text-id', `${dName}-text-${i + 1}`)
          // rotate for the next one
          angle += 180
        }
      }
    },
  },
})
