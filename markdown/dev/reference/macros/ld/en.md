---
title: ld
---

The `ld` macro adds a _linear dimension_ to your pattern.
It is provided by the [annotations plugin](/reference/plugins/annotations).

## Signature

```js
macro('ld', {
  Number d,
  String id,
  Point from,
  Boolean noEndMarker,
  Boolean noStartMarker,
  String text,
  Point to,
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
| `id`            | auto-assigned | String | A custom ID under which paths and points will be created |
| `text`          | Linear distance   | Number    | The text to go on the dimension if not the from-to linear distance |
| `noStartMarker` | `false` | Boolean             | Whether to not draw a start marker |
| `noEndMarker`   | `false` | Boolean             | Whether to not draw an end marker |

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
