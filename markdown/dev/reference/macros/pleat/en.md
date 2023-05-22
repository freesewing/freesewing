---
title: pleat
---

The `pleat` macro is used to mark a pleat on a pattern. It draws the appropriate 
lines perpendicular to the line going from `from` to `to`. 
The `pleat` macro follows the convention of paths being counter-clockwise to 
determine what is the inside or outside of the part. 

It is provided by [plugin-annotations](/reference/plugins/annotations/).

## Signature

```js
macro('pleat', {
  Point from,
  Point to,
  String prefix = 'pleat',
  Number margin = 35,
  Boolean reverse = false,
})
```

## Example

<Example caption="An example of the pleat macro">
```js
({ Point, points, Path, paths, macro, part }) => {
  points.seamTL = new Point(0,0)
  points.seamTR = new Point(70,0)

  paths.seam = new Path()
    .move(points.seamTL)
    .line(points.seamTR)
    .attr('class', 'fabric')

  points.from = new Point(40,0)
  points.to = new Point(30,0)

  macro('pleat', {
    from: points.from,
    to: points.to,
  })

  return part
}
```
</Example>

## Configuration

| Property        | Default  | Type                | Description |
|----------------:|----------|---------------------|-------------|
| `from`          |          | [Point](/reference/api/point) | The start point of the pleat |
| `to`            |          | [Point](/reference/api/point) | The end point of the pleat |
| `prefix`        | 'pleat'  | String   | The prefix to be used for creating all the points and paths |
| `margin`        | 35       | Number   | The size (in mm) of the pleat lines                         |
| `reverse`       | `false`    | Boolean  | Reverses the two pleat lines and the arrow                  |

## Result

| Generated Element | Description |
|-------------------|-------------|
| `points.${prefix}From` | Copy of the `from` Point  |
| `points.${prefix}To` | Copy of the `to` Point  |
| `points.${prefix}FromIn` | Point for the inside of the `from` path |
| `points.${prefix}ToIn` | Point for the inside of the `to` path |
| `paths.${prefix}PleatFrom` | Path forming the from line |
| `paths.${prefix}PleatTo` | Path forming the to line |
| `paths.${prefix}PleatArrow` | Path forming the arrow |
