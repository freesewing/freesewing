---
title: bartackFractionAlong
---

The `bartackFractionAlong` macro allows you to add a *bartack* marker to your sewing pattern.
More specifically, a bartack along a fraction of a path.
It is provided by the [bartack plugin](/reference/plugins/bartack/).

<Example part="plugin_bartackfractionalong" caption="Example of the bartackFractionAlong macro" />

```js
points.a = new Point(15, 15)
points.b = new Point(20, 20)
points.c = new Point(30, 20)
points.d = new Point(35, 15)
points.e = new Point(20, 10)
points.f = new Point(30, 10)

paths.a = new Path()
  .move(points.a)
  .curve(points.b, points.c, points.d)
  .setRender(false)

macro('bartackFractionAlong', { 
  path: paths.a,
  start: 0.2,
  end: 0.8
})

macro('sprinkle', {
  snippet: 'notch',
  on: ['e', 'f']
})
```

| Property     | Default    | Type       | Description | 
|-------------:|------------|------------|-------------|
| `angle`      | `0`        | `number`   | The angle under which to draw the bartack |
| `density`    | `3`        | `number`   | Controls how close the stitches are togeter |
| `end`        | `1`        | `number`   | At which fraction of the path length (from `0` to `1`) should the bartack end |
| `length`     | `15`       | `number`   | Length of the bartack |
| `nameFormat` |            | `function` | A method that receives the name of the path or point and should return the name for the cloned path and or point |
| `path`       |            | `Path`     | The path the bartack should follow |
| `prefix`     |            | `string`   | A prefix to apply to the names of the generated path and points |
| `start`      | `0`        | `number`   | At which fraction of the path length (from `0` to `1`) should the bartack start |
| `suffix`     |            | `string`   | A suffix to apply to the names of the generated path and points |
| `width`      | `3`        | `number`   | Width of the bartack |

