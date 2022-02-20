---
title: grainline
---

The `grainline` macro adds a _grainline_ indicator to your pattern.\
It is provided by the [grainline plugin](/reference/plugins/grainline/).

<Example part="plugin_grainline">
Example of the grainline indicator added by this macro
</Example>

```js
macro("grainline", {
  from: points.grainlineFrom,
  to: points.grainlineTo,
})
```

| Property    | Default     | Type       | Description                                  |
|------------:|-------------|------------|----------------------------------------------|
| `from`      |             | [Point][1] | The startpoint of the _grainline_ indicator  |
| `to`        |             | [Point][1] | The endpoint of the _grainline_ indicator    |
| `text`      | 'grainline' | string     | The text to put on the _grainline_ indicator |

[1]: /reference/api/point
