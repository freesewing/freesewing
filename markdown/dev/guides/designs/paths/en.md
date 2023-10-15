---
title: Paths
order: 40
---

Paths are the lines and curves that make up your pattern.
They are made up of individual drawing operations that together make up the path.

FreeSewing supports the following types of drawing operations:

- The **move** operation moves our virtual pen but does not draw anything.
- The **line** operation draws a straight line
- The **curve** operation draws a [Bézier curve](/guides/prerequisites/bezier-curves)
- The **close** operation closes the path

To crucial thing to keep in mind is that, with the exception of the **move** operation,
all drawing operations start from wherever you are currently on your virtual sheet of paper.

For example, you might expect the **line** operation to take a start- and endpoint.
But in fact, it only takes an endpoint, and will draw a straight line from where our virtual pen
currently is to said endpoint.

Because all but the **move** drawing operations are relative to their operation preceding it,
**all Paths must start with a move operation**.

<Note>

Understanding that each drawing operation builds upon the next one is an important insight.

</Note>

<Example caption="A schematic overview of where paths are kept inside a FreeSewing pattern">
```mjs
({ Point, points, Path, paths, options, part }) => {

  // Draws a w*h box, returns a Path object
  const box = (name, origin, width, height, classes='fabric') => {
    let base = height
    if (width < height) base = width
    let t = base
    points[name + 'TopLeft'] = new Point(origin.x, origin.y)
    points[name + 'BottomLeft'] = new Point(origin.x, origin.y + height)
    points[name + 'BottomRight'] = new Point(
      origin.x + width,
      origin.y + height
    )
    points[name + 'TopRight'] = new Point(origin.x + width, origin.y)
    points[name + 'Mid'] = points[name + 'TopLeft'].shiftFractionTowards(
      points[name + 'BottomRight'],
      0.5
    )
    points[name + 'Mid'].y += 3

    return new Path()
      .move(points[name + 'TopLeft'])
      .line(points[name + 'BottomLeft'])
      .line(points[name + 'BottomRight'])
      .line(points[name + 'TopRight'])
      .line(points[name + 'TopLeft'])
      .close()
      .addClass(classes)
  }

  // Draws a box and handled text placement
  const drawBox = (name, x, y, width, height, text=true, classes, textClasses='') => {
    points[name + 'Origin'] = new Point(x, y)
    paths[name] = box(name, points[name + 'Origin'], width, height, classes)
    if (text === 'b') {
      paths[name+'_label'] = new Path()
        .move(points[name+'BottomLeft'])
        .line(points[name+'BottomRight'])
        .addClass('hidden')
        .addText(name, 'center ' + textClasses)
        .attr('data-text-dy', -1)
    }
    else if (text) points[name + 'Mid'].addText(name, 'center')
  }

  // Parts set 0
  drawBox('Part A (set 0)', -27, -27, 44, 70, 'b', 'note', 'bold')
  drawBox('points', -24, -24, 38, 12, true, 'note')
  drawBox('paths', -24, -9, 38, 12, true, 'note fill-note')
  paths['paths'].attr('fill-opacity', 0.2)
  drawBox('snippets', -24, 6, 38, 12, true, 'note')

  drawBox('Part B (set 0)', 26, -27, 44, 70, 'b', 'note', 'bold')
  drawBox(' points ', 29, -24, 38, 12, true, 'note')
  drawBox(' paths ', 29, -9, 38, 12, true, 'note fill-note')
  paths[' paths '].attr('fill-opacity', 0.2)
  drawBox(' snippets ', 29, 6, 38, 12, true, 'note')

  drawBox('Part C (set 0)', 79, -27, 44, 70, 'b', 'note', 'bold')
  drawBox('  points  ', 82, -24, 38, 12, true, 'note')
  drawBox('  paths  ', 82, -9, 38, 12, true, 'note fill-note')
  paths['  paths  '].attr('fill-opacity', 0.2)
  drawBox('  snippets  ', 82, 6, 38, 12, true, 'note')

  drawBox('setStore 0', -24, 21, 144, 12, true, 'lining dashed')
  paths['setStore 0'].attr('fill-opacity', 0.2)

  // Pattern
  drawBox('Pattern Store', -30, -45, 155, 15, true, 'lining')
  paths['Pattern Store'].attr('fill-opacity', 0.2)
  drawBox('Pattern', -34, -49, 163, 106, 'b', 'fabric stroke-lg', 'text-lg bold')

  return part
}
```
</Example>

<Tip>

Our example image (which, if you hadn't realized was created with FreeSewing)
has a lot of paths in it.
Each box is a path made of 4 lines, and every text label is anchored on a path
containing a hidden line.

Click the **X-Ray** tab to reveal some of the lines in the paths.

</Tip>


