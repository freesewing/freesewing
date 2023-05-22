---
title: Points
order: 30
---

Developing a pattern with FreeSewing is similar to doing it on paper.
But instead of using a pencil and paper, you'll be writing code.

Before we can draw any line, we need to know where it starts from, and where it ends.
That's why we have **points**. They are the most basic building block of a
FreeSewing pattern, and their role is to store coordinates.

Each point must have:

- A **X-coordinate**
- A **Y-coordinate**

Together, these coordinates determine the location of the point in the 2-dimensional plane we're drawing on.

<Note>

Points are unlikely to confuse you. The only gotcha is [the
coordinate system](/guides/prerequisites/coordinate-system/) which has a Y-axis that is inverted to what you
may intuitively expect.

</Note>

<Example caption="A schematic overview of where points are kept inside a FreeSewing pattern">
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
  drawBox('points', -24, -24, 38, 12, true, 'note fill-note')
  paths['points'].attr('fill-opacity', 0.2)
  drawBox('paths', -24, -9, 38, 12, true, 'note')
  drawBox('snippets', -24, 6, 38, 12, true, 'note')

  drawBox('Part B (set 0)', 26, -27, 44, 70, 'b', 'note', 'bold')
  drawBox(' points ', 29, -24, 38, 12, true, 'fill-note note')
  paths[' points '].attr('fill-opacity', 0.2)
  drawBox(' paths ', 29, -9, 38, 12, true, 'note')
  drawBox(' snippets ', 29, 6, 38, 12, true, 'note')

  drawBox('Part C (set 0)', 79, -27, 44, 70, 'b', 'note', 'bold')
  drawBox('  points  ', 82, -24, 38, 12, true, 'note fill-note')
  paths['  points  '].attr('fill-opacity', 0.2)
  drawBox('  paths  ', 82, -9, 38, 12, true, 'note')
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

Our example image (which, if you hadn't realized was created with FreeSewing) has a lot of
points in it. The corners of the boxes, the location where the text goes, and so on.

Click the **X-Ray** tab to reveal them.

</Tip>


