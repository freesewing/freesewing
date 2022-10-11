---
title: The coordinate system
order: 30
---

The coordinate system in FreeSewing -- and in SVG -- follows the same rules as text on a page.
You start at the top-left, and as you go to the right, the X-coordinate will increase.
As you go down the Y-coordinate will increase.

<Example caption="The coordinate system in an SVG document">
```mjs
({ Point, points, paths, Path, part }) => {
  points.origin = new Point(10, 10)
  points.x = new Point(100, 10)
  points.y = new Point(10, 50)
  points.textX = new Point(85, 20).addText('X', 'text-lg')
  points.textY = new Point(12, 43).addText('Y', 'text-lg')
  paths.coords = new Path()
    .move(points.y)
    .line(points.origin)
    .line(points.x)
    .addClass('mark')
    .attr('marker-start', 'url(#dimensionFrom)')
    .attr('marker-end', 'url(#dimensionTo)')

  return part
}
```
</Example>

The image above illustrates both the X-axis and Y-axis.
On the X-axis, `20` is further to the right than `10`.
On the Y-axis, `50` is lower than `20`.

<Note>

The Y-axis is inverted in many drawing programs, with the origin
`(0,0)` being the lower left corner, rather than the upper left corner.

This is a common point of confusion so keep in mind that the Y-axis may
not behave as you would have intuitively expected.

</Note>
