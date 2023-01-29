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

/**
 * The base plugin for adding a layout helper part like pages or fabric
 * sheetWidth: the width of the helper part
 * sheetHeight: the height of the helper part
 * boundary: should the helper part calculate its boundary?
 * responsiveColumns: should the part make more columns if the pattern exceed its width? (for pages you want this, for fabric you don't)
 * printStyle: hould the pages be rendered for printing or for screen viewing?
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
    preLayout: function (pattern) {
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

      // Re-calculate the pattern's config
      pattern.getConfig()
      // create the part so that a stack gets made for it during packing
      // but don't draft it so that it doesn't have a size
      pattern.createPartForSet(partName, pattern.activeSet)
    },
    postLayout: function (pattern) {
      let { height, width, stacks } = pattern
      if (!responsiveColumns) width = sheetWidth
      // get the layout
      const layout =
        typeof pattern.settings[0].layout === 'object'
          ? pattern.settings[0].layout
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
    },
    preRender: function (svg) {
      const pattern = svg.pattern
      const only = pattern.settings[pattern.activeStack || 0].only
      // add the layout part to the include list if there is one so that it gets rendered
      if (Array.isArray(only) && !only.includes(partName)) {
        pattern.settings[pattern.activeStack || 0].only.push(partName)
      }
    },
    postRender: function (svg) {
      const pattern = svg.pattern
      const only = pattern.settings[pattern.activeStack || 0].only
      // remove the layout part from the include list if there is one so that we don't pollute the settings
      if (Array.isArray(only) && only.includes(partName)) {
        pattern.settings[pattern.activeStack || 0].only.splice(only.indexOf(partName), 1)
      }
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
      // arbitrary number of units for the ruler
      const rulerLength = 2
      const isMetric = this.context.settings.units === 'metric'
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
        .attr('data-text', rulerLength + (isMetric ? 'cm' : '"'))
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
        if (d.toFixed(3) % (1 / rulerLength) === 0) tick = 3
        // if this tick indicates half a unit, long
        else if (d.toFixed(3) % (0.5 / rulerLength) === 0) tick = 2

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
          along: [points[`${pageName}-tl`], points[`${pageName}-tr`]],
          label: '' + row,
          isRow: true,
          pageName,
        })
      if (col !== 0 && withContent[row][col - 1])
        macro('addPageMarker', {
          along: [points[`${pageName}-tl`], points[`${pageName}-bl`]],
          label: indexStr(col),
          isRow: false,
          pageName,
        })
    },
    /** add a page marker for either the row of the column */
    addPageMarker({ along, label, isRow, pageName }) {
      const { points, paths, Path } = this.shorthand()
      const markerName = `${pageName}-${isRow ? 'row' : 'col'}-marker`

      // get a point on the center of the appropriate side
      points[`${markerName}-center`] = along[0]
        .shiftFractionTowards(along[1], 0.5)
        // add the label to it
        .attr('data-text', label)
        .attr('data-text-class', 'text-sm center baseline-center bold')
        // give it an explicit ID in case we need to hide it later
        .attr('data-text-id', markerName + '-text')

      // get points to make a diamond around the center point
      points[`${markerName}-r`] = points[`${markerName}-center`].translate(-5, 0)
      points[`${markerName}-l`] = points[`${markerName}-center`].translate(5, 0)
      points[`${markerName}-t`] = points[`${markerName}-center`].translate(0, -5)
      points[`${markerName}-b`] = points[`${markerName}-center`].translate(0, 5)

      // make a path for the diamond
      paths[markerName] = new Path()
        .move(points[`${markerName}-r`])
        .line(points[`${markerName}-t`])
        .line(points[`${markerName}-l`])
        .line(points[`${markerName}-b`])
        .close()
        .attr('class', 'fill-interfacing interfacing')
        // give it an explicit ID in case we need to hide it later
        .attr('id', markerName)
    },
  },
})
