---
title: round
---

The `round` macro creates a rounded corner.

It is provided by [plugin-round](/reference/plugins/round), which is
part of [core-plugins](/reference/plugins/core) (so it is available by default).

## Signature

```js
macro('round', { 
  String id = 'round',
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
| `id`        | `round` | `string` | The ID of this macro instance |
| `from`      |         | [Point](/reference/api/point) | The startpoint towards the corner to round |
| `to`        |         | [Point](/reference/api/point) | The endpoint away from the corner to round |
| `via`       |         | [Point](/reference/api/point) | The cornerpoint to round |
| `radius`    | Maximum | Number              | The radius in mm if not the maximum possible |
| `prefix`    |         | String              | A prefix to give to the points and paths created by this macro |
| `hide`      | `true`  | Boolean             | Whether to hide the path created by this macro |
| `class`     |         | String              | Class(es) to assign to the path created by this macro |


## Notes

This macro is only intended for 90 degree corners.
