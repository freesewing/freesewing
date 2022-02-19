---
title: banner
---

The `banner` macro allows you to add repeating text along a path.
It is provided by the [banner plugin](/reference/plugins/banner).

<Example part="plugin_banner">Example of the banner macro</Example>

```js
points.from = new Point(0,0)
points.to = new Point(320,0)

paths.banner = new Path()
  .move(points.from)
  .line(points.to)

macro('banner', {
  path: 'banner',
  text: 'banner plugin',
})
```

| Property     | Default    | Type       | Description |
|-------------:|------------|------------|-------------|
| `text`       |            | `text`     | The text to place repeat along the path |
| `dy`         | `1`        | `number`   | Controls how far the text will be located above the path |
| `spaces`     | `12`       | `number`   | The number of spaces to place between repetitions |
| `repeat`     | `10`       | `number`   | The number of repetitions |
