---
title: cutonfold
---

The `cutonfold` macro adds a *cut on fold* indicator to your pattern.  
It is provided by the [cutonfold plugin](/reference/plugins/cutonfold).

<Example part="plugin_cutonfold" caption="Example of the cut on fold indicator added by this macro" />

```js
macro('cutonfold', {
  from: points.cofLeft,
  to: points.cofRight,
  grainline: true
}
```

| Property    | Default | Type                | Description | 
|------------:|---------|---------------------|-------------|
| `from`      |         | [Point](/reference/api/point) | The startpoint of the *cut on fold* indicator |
| `to`        |         | [Point](/reference/api/point) | The endpoint of the *cut on fold* indicator |
| `margin`    | 5       | [Point](/reference/api/point) | The distance in % to keep from the start/end edge |
| `offset`    | 50      | Number              | The distance in mm to offset from the line from start to end |
| `grainline` | `false` | Boolean             | Whether this cutonfold indicator is also the grainline |



