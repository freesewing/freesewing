---
title: round
---

The `round` macro rounds a corner. It is provided by the [round plugin](/reference/plugins/round/).

Note that this is only intended for 90 degree corners.

<Example part="plugin_round">
Example of corners rounded with the round plugin
</Example>

```js
macro('round', {
  from: points.bottomRight,
  to: points.topLeft,
  via: points.topRight,
  radius: 20,
  prefix: 'tr',
  render: true
})
```

| Property    | Default | Type                | Description | 
|------------:|---------|---------------------|-------------|
| `from`      |         | [Point](/reference/api/point) | The startpoint towards the corner to round |
| `to`        |         | [Point](/reference/api/point) | The endpoint away from the corner to round |
| `via`       |         | [Point](/reference/api/point) | The corner to round |
| `radius`    | Maximum | Number              | The radius in mm in not the maximum |
| `prefix`    |         | String              | A prefix to give to the points and paths created by this macro |
| `render`    | `false` | Boolean             | Whether to render the path created by this macro |
| `class`     |         | String              | Class(es) to assign to the path created by this macro |

