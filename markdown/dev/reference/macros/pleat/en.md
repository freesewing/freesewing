---
title: pleat
---

The `pleat` macro is used to mark a pleat on a pattern. It draws the appropriate 
lines perpendicular to the line going from `from` to `to`. 
The `pleat` macro follows the convention of paths being counter-clockwise to 
determine what is the inside or outside of the part. 

It is provided by [plugin-annotations](/reference/plugins/annotations), which is
part of [core-plugins](/reference/plugins/core) (so it is available by default).

## Signature

```js
macro('pleat', {
  String id = 'pleat',
  Point from,
  Point to,
  Number margin = 35,
  Boolean reverse = false,
  Boolean force = false,
  Object calsses = {
    arrow: 'note',
    from: 'note',
    to: 'note dashed',
  },
    
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
  points.to = new Point(10,0)

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
| `id`         | `pleat` | `string` | The ID of this macro instance |
| `to`            |          | [Point](/reference/api/point) | The end point of the pleat |
| `margin`        | 35       | Number   | The size (in mm) of the pleat lines                         |
| `reverse`       | `false`    | Boolean  | Reverses the two pleat lines and the arrow                  |
| `force`      | `false`    | `boolean`  | Set this to `true` to display the macro output even when `complete` is `false` |
| `classes.arrow`  | `note`    | `string`  | CSS classes to apply to the arrow |
| `classes.from`  | `note`    | `string`  | CSS classes to apply to the line at the `from` point |
| `classes.to`  | `note dashed`    | `string`  | CSS classes to apply to the line at the `to` point |

## Notes

This macro takes the `complete` setting into account and won't output anything when both complete and `force` are `false`.

