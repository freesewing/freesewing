---
title: grainline
---

The `grainline` macro adds a *grainline* indicator to your pattern.  
It is provided by the [grainline plugin](/reference/plugins/grainline/).

<Example part="plugin_grainline" caption="Example of the grainline indicator added by this macro" />

```js
macro("grainline", {
  from: points.grainlineFrom,
  to: points.grainlineTo,
}
```

| Property    | Default | Type                | Description | 
|------------:|---------|---------------------|-------------|
| `from`      |         | [Point](/reference/api/point) | The startpoint of the *grainline* indicator |
| `to`        |         | [Point](/reference/api/point) | The endpoint of the *grainline* indicator |

