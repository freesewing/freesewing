---
title: hd
---

The `hd` macro adds a _horizontal dimension_ to your pattern.

It is provided by [plugin-annotations](/reference/plugins/annotations), which is
part of [core-plugins](/reference/plugins/core) (so it is available by default).

## Signature

```js
macro('hd', {
  String id = 'hd',
  Point from,
  Boolean noEndMarker,
  Boolean noStartMarker,
  String text,
  Point to,
  Number y,
  Boolean force = false,
})
```

## Example

<Example caption="An example of a horizontal dimension with the hd macro">
```js
({ Point, macro, part }) => {

  macro('hd', {
    from: new Point(0,0),
    to: new Point(100,0),
    y: 15,
    force: 1,
  })

  return part
}
```
</Example>

## Configuration

| Property        | Default  | Type                | Description |
|----------------:|----------|---------------------|-------------|
| `from`          |          | [Point](/reference/api/point) | The startpoint of the dimension |
| `to`            |          | [Point](/reference/api/point) | The endpoint of the dimension |
| `y`             |          | Number              | The Y-value at which to draw the dimension |
| `id`            | `hd`     | `string`            | The ID of this macro instance |
| `text`          | Horizontal distance | Number   | The text to go on the dimension if not the from-to horizontal distance |
| `noStartMarker` | `false`  | Boolean             | Whether to not draw a start marker |
| `noEndMarker`  | `false`  | Boolean             | Whether to not draw an end marker |
| `force`      | `false`    | `boolean`  | Set this to `true` to display the macro output even when `paperless` is `false` |

## Notes

This macro takes the `paperless` setting into account and won't output anything when both `paperless` and `force` are `false`.

