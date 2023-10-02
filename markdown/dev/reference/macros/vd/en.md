---
title: vd
---

The `vd` macro adds a _vertical dimension_ to your pattern.
It is provided by the [annotations plugin](/reference/plugins/annotations).

## Signature

```js
macro('vd', {
  String id,
  Point from,
  Boolean noEndMarker,
  Boolean noStartMarker,
  String text,
  Point to,
  Number x,
})
```

## Example

<Example caption="An example of a vertical dimension with the vd macro">
```js
({ Point, macro, Path, paths, part }) => {

  macro('vd', {
    from: new Point(0,0),
    to: new Point(0,40),
    x:10,
  })

  // Prevent clipping
  paths.diag = new Path()
    .move(new Point(-20,0))
    .move(new Point(90,40))

  return part
}
```
</Example>

## Configuration

| Property        | Default | Type                | Description |
|----------------:|---------|---------------------|-------------|
| `from`          |         | [Point](/reference/api/point) | The startpoint of the dimension |
| `to`            |         | [Point](/reference/api/point) | The endpoint of the dimension |
| `x`             |         | Number              | The X-value at which to draw the dimension |
| `text`          | Vertical distance | Number    | The text to go on the dimension if not the from-to vertical distance |
| `id`            | auto-assigned | String | A custom ID under which paths and points will be created |
| `noStartMarker` | `false` | Boolean             | Whether to not draw a start marker |
| `noEndMarker`  | `false` | Boolean             | Whether to not draw an end marker |

## Result

| Generated Element | Description |
|-------------------|-------------|
| `paths.${id}` | Path for the span of the dimension |
| `paths.${id}_ls` | Path for the leader to the start of the dimension |
| `paths.${id}_le` | Path for the leader to the end of the dimension |

## Notes

Setting a custom ID will:

- Allow removal of the dimension with [the `rmd` macro](/reference/macros/rmd)
- Prevent removal of the dimension with [the `rmad` macro](/reference/macros/rmad/)
