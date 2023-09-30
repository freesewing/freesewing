---
title: Parts
order: 120
---

A pattern is a container for a bunch of parts. And parts are in turn a
container for the points, paths, and snippets of (a part of) your pattern.
Parts can be re-used and mixed and matched to create other patterns, a powerful
concept to build a pattern library.

If you design a T-shirt pattern with a `front`, `back`, and `sleeve`, each of
those would be a part.  If you then wanted to make a long-sleeved version of
your T-shirt pattern, you only need to design a new sleeve part. You can re-use
the `front` and `back` parts of your short-sleeved T-shirt pattern, as they did
not change.

When developing a FreeSewing pattern, you will spend most of your time designing the individual parts.

<Example caption="A schematic overview of parts inside a FreeSewing pattern">
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
  drawBox('Part A (set 0)', -27, -27, 44, 70, 'b', 'note fill-note', 'bold')
  paths['Part A (set 0)'].attr('fill-opacity', 0.2)
  drawBox('points', -24, -24, 38, 12, true, 'note')
  drawBox('paths', -24, -9, 38, 12, true, 'note')
  drawBox('snippets', -24, 6, 38, 12, true, 'note')

  drawBox('Part B (set 0)', 26, -27, 44, 70, 'b', 'note fill-note', 'bold')
  paths['Part B (set 0)'].attr('fill-opacity', 0.2)
  drawBox(' points ', 29, -24, 38, 12, true, 'note')
  drawBox(' paths ', 29, -9, 38, 12, true, 'note')
  drawBox(' snippets ', 29, 6, 38, 12, true, 'note')

  drawBox('Part C (set 0)', 79, -27, 44, 70, 'b', 'note fill-note', 'bold')
  paths['Part C (set 0)'].attr('fill-opacity', 0.2)
  drawBox('  points  ', 82, -24, 38, 12, true, 'note')
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

