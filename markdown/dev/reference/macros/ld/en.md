---
title: ld
---

The `ld` macro adds a _linear dimension_ to your pattern.

It is provided by [plugin-annotations](/reference/plugins/annotations), which is
part of [core-plugins](/reference/plugins/core) (so it is available by default).

## Signature

```js
macro('ld', {
  Number d,
  String id = 'ld',
  Point from,
  Boolean noEndMarker,
  Boolean noStartMarker,
  String text,
  Point to,
  Boolean force = false,
})
```

## Example

<Example caption="An example of a linear dimension with the ld macro">
```js
({ Point, macro, part }) => {

  macro('ld', {
    from: new Point(0,0),
    to: new Point(100,20),
    d:15,
    force: true,
  })

  return part
}
```
</Example>

## Configuration

| Property        | Default | Type                | Description |
|----------------:|---------|---------------------|-------------|
| `from`          |         | [Point](/reference/api/point) | The startpoint of the dimension |
| `to`            |         | [Point](/reference/api/point) | The endpoint of the dimension |
| `d`             | 0       | Number              | The offset at which to draw the dimension |
| `id`            | `ld`    | `string`            | The ID of this macro instance |
| `text`          | Linear distance   | Number    | The text to go on the dimension if not the from-to linear distance |
| `noStartMarker` | `false` | Boolean             | Whether to not draw a start marker |
| `noEndMarker`   | `false` | Boolean             | Whether to not draw an end marker |
| `force`      | `false`    | `boolean`  | Set this to `true` to display the macro output even when `paperless` is `false` |

## Notes

This macro takes the `paperless` setting into account and won't output anything when both `paperless` and `force` are `false`.
