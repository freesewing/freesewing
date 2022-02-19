---
title: gore
---

The `gore` macro facilitates the drafting of [gores][1] which are typically used in hats.
It is provided by the [gore plugin](/reference/plugins/grainline/).

<Example part="plugin_gore">Example of a gore as drafted by this macro</Example>

```js
macro("gore", {
  from: points.anchor,
  radius: measurements.head,
  gores: 6,
  extraLength: 20,
  render: true,
  class: 'fabric',
})
```

| Property      | Default | Type       | Description                                  |
|--------------:|---------|------------|----------------------------------------------|
| `from`        |         | [Point][2] | The point to start drafting the gore from |
| `radius`      |         | number     | The radius of the sphere the gores should cover |
| `gores`       |         | number     | The text to put on the *grainline* indicator |
| `extraLength` |         | number     | The length of the straight section after a complete semisphere |
| `render`      | `false` | boolean    | Whether or not to render the generated path |
| `class`       |         | boolean    | Any classes to add to the generated path |

[1]: https://en.wikipedia.org/wiki/Gore_\(segment\)

[2]: /reference/api/point
