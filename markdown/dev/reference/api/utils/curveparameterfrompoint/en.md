---
title: utils.curveParameterFromPoint()
---

The `utils.curveParameterFromPoint()` function calculates where the point `check` lies on a
curve described by points `start`, `cp1`, `cp2`, and `end`.

For example a return value of 0 indicates that the given point is the start of the curve, a return value
of 1 indicated that the given point is identical to the end of the curve.

A return value of 0.5 indicates that the start point and the first control point had the same influence
as the end point and the second control point, to create the checked point, but this doesn't necessarily mean
that the point lies exactly half-way on the curve.
                                                                     
This method returns `false` if the point isn't (approximately) located on the curve.

## Signature

```js
number|false utils.curveParameterFromPoint(
  Point start, 
  Point cp1, 
  Point cp2, 
  Point end, 
  Point check
)
```

## Example

<Example caption="A Utils.curveParameterFromPoint() example">
```js
({ Point, points, Path, paths, Snippet, snippets, getId, utils, part }) => {

  points.start = new Point(10, 10)
  points.cp1 = new Point(90, 30)
  points.cp2 = new Point(10, 40)
  points.end = new Point(90, 60)
  
  const scatter = []
  for (let i = 1; i < 19; i++) {
    for (let j = 1; j < 14; j++) {
      scatter.push(new Point(i * 10, j * 10))
    }
  }
  let snippet
  for (let point of scatter) {
    let t = utils.curveParameterFromPoint(
        points.start,
        points.cp1,
        points.cp2,
        points.end,
        point
      )
    if(t !== false) {
      points[getId()] = point.addText(` ${Math.round(t * 100) / 100}`, 'text-sm') 
      snippets[getId()] = new Snippet('notch', point)    
    }
  }
  paths.curve = new Path()
    .move(points.start)
    .curve(points.cp1, points.cp2, points.end)
    .addClass("fabric stroke-lg")

  return part
}
```
</Example>


## Notes

Keep in mind that calculations with Bézier curves are often approximations.

This method is mostly used as internal building block for methods like 
`utils.pointOnCurve()`, `Path.split()` or `Path.angleAt()` and probably is not very relevant 
for direct usage from pattern code.
