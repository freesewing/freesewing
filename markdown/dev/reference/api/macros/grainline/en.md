---
title: grainline
---

The `grainline` macro adds a *grainline* indicator to your pattern.\
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
| `from`      |             | [Point][1] | The startpoint of the *grainline* indicator  |
| `to`        |             | [Point][1] | The endpoint of the *grainline* indicator    |
| `text`      | 'grainline' | string     | The text to put on the *grainline* indicator |

[1]: /reference/api/point
