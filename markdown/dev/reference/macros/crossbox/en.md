---
title: crossBox
---

The `crossbox` macro is used to mark a feature on a sewing pattern 
to attach and reinforce an attachment between two pieces. 
This is regularly done by sewing along the outside of the pieces 
that needs to be joined, and then sewing along the diagonals too.

It is provided by [plugin-annotations](/reference/plugins/annotations), which is
part of [core-plugins](/reference/plugins/core) (so it is available by default).

## Signature

```js
macro('crossbox', {
  String id='crossbox',
  Point topLeft,
  Point bottomRight,
  String text,
  Boolean force = false,
})
```

## Example

<Example caption="An example of the crossbox macro">
```js
({ Point, points, Path, paths, macro, part }) => {
  points.tl = new Point(5,5)
  points.br = new Point(45,25)

  macro('crossbox', {
    topLeft: new Point(5, 5),
    bottomRight: new Point(45, 25),
    text: 'Attach here',
  })

  return part
}
```
</Example>

## Configuration

| Property        | Default  | Type                | Description |
|----------------:|----------|---------------------|-------------|
| `bottomRight`   |          | [Point](/reference/api/point) | The bottom right point of the crossbox |
| `topLeft`       |          | [Point](/reference/api/point) | The top left point of the crossbox |
| `id`            | `crossbox` | `string` | The ID of this macro instance |
| `text`          |          | String   | Optional text to go in the center of the crossbox |
| `force`         | `false`    | `boolean`  | Set this to `true` to display the macro output even when `complete` is `false` |

## Notes

This macro takes the `complete` setting into account and won't output anything when both complete and `force` are `false`.

