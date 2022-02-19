---
title: bartack
---

The `bartack` macro allows you to add a *bartack* marker to your sewing pattern.
It is provided by the [bartack plugin](/reference/plugins/bartack/).

<Example part="plugin_bartack">
Example of the bartack macro
</Example>

```js
points.a = new Point(15, 15)

macro('bartack', {
  anchor: points.a,
  angle: 30,
  length: 15
})
```

| Property     | Default    | Type       | Description |
|-------------:|------------|------------|-------------|
| `anchor`     |            | `Point`    | The point to start the bartack from |
| `angle`      | `0`        | `number`   | The angle under which to draw the bartack |
| `density`    | `3`        | `number`   | Controls how close the stitches are togeter |
| `length`     | `15`       | `number`   | Length of the bartack |
| `nameFormat` |            | `function` | A method that receives the name of the path or point and should return the name for the cloned path and or point |
| `prefix`     |            | `string`   | A prefix to apply to the names of the generated path and points |
| `suffix`     |            | `string`   | A suffix to apply to the names of the generated path and points |
| `width`      | `3`        | `number`   | Width of the bartack |
