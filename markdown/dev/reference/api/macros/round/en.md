---
title: round
---

The `round` macro rounds a corner. It is provided by the [round
plugin](/reference/plugins/round/).

## Signature

```js
macro('round', { 
  String class,
  Point from,
  Boolean hide,
  String prefix,
  Number radius,
  Point to,
  Point via,
})
```

## Example

<Example caption="An example of the round macro">
```js
({ Point, points, macro, part }) => {

  macro('round', {
    from: new Point(0, 0),
    to: new Point(100, 40),
    via: new Point(100, 0),
    radius: 30,
    hide: false,
  })

  return part
}
```
</Example>

## Configuration

| Property    | Default | Type                | Description |
|------------:|---------|---------------------|-------------|
| `from`      |         | [Point](/reference/api/point) | The startpoint towards the corner to round |
| `to`        |         | [Point](/reference/api/point) | The endpoint away from the corner to round |
| `via`       |         | [Point](/reference/api/point) | The corner to round |
| `radius`    | Maximum | Number              | The radius in mm in not the maximum |
| `prefix`    |         | String              | A prefix to give to the points and paths created by this macro |
| `hide`      | `true`  | Boolean             | Whether to hide the path created by this macro |
| `class`     |         | String              | Class(es) to assign to the path created by this macro |

## Notes

This macro is only intended for 90 degree corners.
