const name = 'Pages Plugin'
const version = '1.0.0'
const sizes = {
  a4: [ 210, 297 ],
  a3: [ 297, 420 ],
  a2: [ 420, 594 ],
  a1: [ 594, 841 ],
  a0: [ 841, 1188 ],
  letter: [ 215.9, 279.4 ],
  tabloid: [ 279.4, 431.8 ],
}

const pagesPlugin = (size='a4', orientation='portrait') => ({
  name,
  version,
  hooks: {
    postLayout: function(pattern) {
      // Add part
      pattern.parts.pages = pattern.Part('pages')
      // Keep part out of layout
      pattern.parts.pages.layout = false
      // But add the part to the autoLayout property
      pattern.autoLayout.parts.pages = {
        move: { x: 0, y: 0 }
      }
      // Add pages
      const { macro } = pattern.parts.pages.shorthand()
      const { height, width } = pattern
      macro('addPages', { size, orientation, height, width })
    }
  },
  macros: {
    addPages: function(so) {
      const ls = so.orientation === 'landscape'
      const w = sizes[so.size][ls ? 1 : 0]
      const h = sizes[so.size][ls ? 0 : 1]
      const cols = Math.ceil(so.width / w)
      const rows = Math.ceil(so.height / h)
      const { points, Point, paths, Path } = this.shorthand()
      let x = 0
      let y = 0
      let count = 0
      for (let row=0;row<rows;row++) {
        x=0
        for (let col=0;col<cols;col++) {
          count++
          points[`_pages__row${row}-col${col}-tl`] = new Point(x,y)
          points[`_pages__row${row}-col${col}-tr`] = new Point(x+w,y)
          points[`_pages__row${row}-col${col}-br`] = new Point(x+w,y+h)
          points[`_pages__row${row}-col${col}-bl`] = new Point(x,y+h)
          points[`_pages__row${row}-col${col}-circle`] = new Point(x+w/2,y+h/2-24)
            .attr('data-circle', 42)
            .attr('data-circle-class', 'stroke-4xl muted fabric')
          points[`_pages__row${row}-col${col}-text`] = new Point(x+w/2,y+h/2)
            .attr('data-text', `${count}`)
            .attr('data-text-class', 'text-4xl center bold muted fill-fabric')

          paths[`_pages__row${row}-col${col}`] = new Path()
            .move(points[`_pages__row${row}-col${col}-tl`])
            .line(points[`_pages__row${row}-col${col}-bl`])
            .line(points[`_pages__row${row}-col${col}-br`])
            .line(points[`_pages__row${row}-col${col}-tr`])
            .close()
            .attr('class', 'fill-fabric')
            .attr('style', `stroke-opacity: 0; fill-opacity: ${(col+row)%2===0 ? 0.03 : 0.09};`)
          x += w
        }
        y += h
      }
      // Store page count in part
      this.pages = { cols, rows, count: cols*rows }

    }
  }
})

export default pagesPlugin
