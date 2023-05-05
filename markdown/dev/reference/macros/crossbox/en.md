---
title: crossbox
---

The `crossbox` macro is used to mark a feature on a sewing pattern 
to attach and reinforce an attachment between two pieces. 
This is regularly done by sewing along the outside of the pieces 
that needs to be joined, and then sewing along the diagonals too.

It is provided by [plugin-annotations](/reference/plugins/annotations/).

## Signature

```js
macro('crossbox', {
  Point from,
  Point to,
  String text,
})
```

## Example

<Example caption="An example of the crossbox macro">
```js
({ Point, points, Path, paths, macro, part }) => {
  points.partTL = new Point(0,0)
  points.partTR = new Point(0,70)
  points.partBR = new Point(50,70)
  points.partBL = new Point(50,0)

  paths.part = new Path()
    .move(points.partTL)
    .line(points.partTR)
    .line(points.partBR)
    .line(points.partBL)
    .close()
    
  points.tl = new Point(5,5)
  points.br = new Point(45,25)

  macro('crossbox', {
    from: points.tl,
    to: points.br,
    text: 'attach here',
  })

  return part
}
```
</Example>

## Configuration

| Property        | Default  | Type                | Description |
|----------------:|----------|---------------------|-------------|
| `from`          |          | [Point](/reference/api/point) | The top left point of the crossbox |
| `to`            |          | [Point](/reference/api/point) | The bottom right point of the crossbox |
| `text`          |          | String   | The text to go on the dimension if not the from-to horizontal distance |

## Result

| Generated Element | Description |
|-------------------|-------------|
| `points.${id}_boxTopLeft` | Point Top Left of the outer box |
| `points.${id}_boxTopRight` | Point Top Right of the outer box |
| `points.${id}_boxBottomLeft` | Point Bottom Left of the outer box |
| `points.${id}_boxBottomRight` | Point Bottom Right of the outer box |
| `points.${id}_topCrossTL` | Point Top Left of the inner box |
| `points.${id}_topCrossTR` | Point Top Right of the inner box |
| `points.${id}_topCrossBL` | Point Bottom Left of the inner box |
| `points.${id}_topCrossBR` | Point Bottom Right of the inner box |
| `points.${id}_textAnchor` | Point for the text |
| `paths.${id}crossBox` | Path for the outer box |
| `paths.${id}_topCross` | Path for the inner box and cross |
