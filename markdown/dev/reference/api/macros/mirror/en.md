---
title: mirror
---

The `mirror` macro allows you to mirror points and/or paths around a mirror line.
It is provided by the [mirror plugin](/reference/plugins/mirror/).

<Example part="plugin_mirror">
Example of the mirror plugin
</Example>

```js
points.a = new Point(5,5)
points.b = new Point(45,30)
points.c = new Point(5,30)
points.d = new Point(45,5)
points.mid = new Point(25,15)


paths.a = new Path()
  .move(points.a)
  .curve(points.b, points.c, points.d)

macro('mirror', {
  mirror: [points.b, points.d],
  points: [points.mid],
  paths: [paths.a]
})

macro('sprinkle', {
  snippet: 'notch',
  on: ['mid', 'mirroredMid']
})
```

| Property     | Default    | Type       | Description |
|-------------:|------------|------------|-------------|
| `mirror`     |            | `array`    | Array with 2 [Point](/reference/api/point) objects that define the *mirror line* |
| `clone`      | `true`     | `bool`     | Whether to clone mirrored points and or paths |
| `points`     |            | `array`    | An array of [Point](/reference/api/point) objects |
| `paths`      |            | `array`    | An array of [Path](/reference/api/path) objects |
| `prefix`     | `mirrored` | `string`   | A prefix to apply to the names of the clones points and or paths. Ignored if `nameFormat` is set |
| `nameFormat` |            | `function` | A method that receives the name of the path or point and should return the name for the cloned path and or point |
