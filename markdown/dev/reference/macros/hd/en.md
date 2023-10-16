---
title: hd
---

The `hd` macro adds a _horizontal dimension_ to your pattern.
It is provided by the [annotations plugin](/reference/plugins/annotations).

## Signature

```js
macro('hd', {
  String id,
  Point from,
  Boolean noEndMarker,
  Boolean noStartMarker,
  String text,
  Point to,
  Number y,
})
```

## Example

<Example caption="An example of a horizontal dimension with the hd macro">
```js
({ Point, macro, part }) => {

  macro('hd', {
    from: new Point(0,0),
    to: new Point(100,0),
    y:15,
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
| `id`            | auto-assigned | String | A custom ID under which paths and points will be created |
| `text`          | Horizontal distance | Number   | The text to go on the dimension if not the from-to horizontal distance |
| `noStartMarker` | `false`  | Boolean             | Whether to not draw a start marker |
| `noEndMarker`  | `false`  | Boolean             | Whether to not draw an end marker |

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

