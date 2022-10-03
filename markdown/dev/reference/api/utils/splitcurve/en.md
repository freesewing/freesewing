---
title: utils.splitCurve()
---

The `utils.splitCurve()` function splits a curve defined by 4 points `start`,
`cp1`, `cp2`, and `end` on the point `split` and returns an array holding both
halves.

## Signature

```js
array utils.splitCurve(
  Point start, 
  Point cp1, 
  Point cp2, 
  Point end, 
  Point check, 
)
```

## Example

<Example caption="A Utils.splitCurve() example">
```js
({ Point, points, Path, paths, utils, part }) => {

  points.start = new Point(10, 10)
  points.cp1 = new Point(100, 80)
  points.cp2 = new Point(100, 0)
  points.end = new Point(10, 50)

  paths.example = new Path()
    .move(points.start)
    .curve(points.cp1, points.cp2, points.end)
    .addClass('dotted stroke-xs')

  points.split = paths.example.shiftFractionAlong(0.4)
  const halves = utils.splitCurve(
    points.start,
    points.cp1,
    points.cp2,
    points.end,
    points.split
  )
  for (let i=0; i<2; i++) {
    const { start, cp1, cp2, end } = halves[i]
    console.log({start, cp1, cp2,end})
    paths[`segment${i}`] = new Path()
      .move(start)
      .curve(cp1, cp2, end)
      .addClass('stroke-xl')
      .attr('style', 'stroke-opacity: 0.5;')
  }
  paths.segment0.addClass('note')
  paths.segment1.addClass('lining')

  return part
}
```
</Example>

## Notes

The returned object has this signature:

```js
[
  { 
    start: Point,
    cp1: Point,
    cp2: Point,
    end: Point,
  },
  { 
    start: Point,
    cp1: Point,
    cp2: Point,
    end: Point,
  },
]

