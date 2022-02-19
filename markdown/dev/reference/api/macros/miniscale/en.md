---
title: miniscale
---

The `miniscale` macro adds a mini *scale box* to your pattern. This box allows
users to verify their pattern is printed to scale.

The `miniscale` macro is provided by the [scalebox plugin](/reference/plugins/scalebox).
It is the mini version of [the scalebox macro](/reference/macros/scalebox/).

<Example part="plugin_scalebox">
Example of a scalebox (left) and miniscale (right)
</Example>

```js
macro('miniscale', {
  at: points.anchor
})
```

| Property    | Default | Type                | Description |
|-------------|---------|---------------------|-------------|
| `at`        |         | [Point](/reference/api/point) | The point to anchor the *scale box* on |
| `rotate`    | 0       | Number              | Rotation in degrees |
