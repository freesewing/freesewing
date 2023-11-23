---
title: vd
---

The `vd` macro adds a _vertical dimension_ to your pattern.

It is provided by [plugin-annotations](/reference/plugins/annotations), which is
part of [core-plugins](/reference/plugins/core) (so it is available by default).

## Signature

```js
macro('vd', {
  String id = 'vd',
  Point from,
  Boolean noEndMarker,
  Boolean noStartMarker,
  String text,
  Point to,
  Number x,
  Boolean force = false,
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
    force: true,
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
| `id`            | `vd` | `string` | The ID of this macro instance |
| `noStartMarker` | `false` | Boolean             | Whether to not draw a start marker |
| `noEndMarker`  | `false` | Boolean             | Whether to not draw an end marker |
| `force`      | `false`    | `boolean`  | Set this to `true` to display the macro output even when `paperless` is `false` |

## Notes

This macro takes the `paperless` setting into account and won't output anything when both `paperless` and `force` are `false`.
