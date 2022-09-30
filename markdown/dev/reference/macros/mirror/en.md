---
title: mirror
---

The `mirror` macro allows you to mirror points and/or paths around a mirror
line. It is provided by the [mirror plugin](/reference/plugins/mirror/).

## Signature

```js
macro('mirror', {
  Boolean clone,
  Array mirror,
  Function nameFormat,
  Array paths,
  Array points,
  String prefix,
})
```

## Example

<Example caption="An example of the mirror macro">
```js
({ Point, points, Path, paths, macro, part }) => {

  points.from = new Point(0,0)
  points.cp1 = new Point(10,20)
  points.cp2 = new Point(60,20)
  points.to = new Point(70,0)
  paths.example = new Path()
    .move(points.from)
    .curve(points.cp1, points.cp2, points.to)
  
  macro('mirror', {
    clone: true,
    mirror: [
      new Point(20,10),
      new Point(20,20),
    ],
    paths: Object.values(paths),
    points: Object.values(points),
  })

  return part
}
```
</Example>

## Configuration

| Property     | Default    | Type       | Description |
|-------------:|------------|------------|-------------|
| `mirror`     |            | `array`    | Array with 2 [Point](/reference/api/point) objects that define the _mirror line_ |
| `clone`      | `true`     | `bool`     | Whether to clone mirrored points and or paths |
| `points`     |            | `array`    | An array of [Point](/reference/api/point) objects |
| `paths`      |            | `array`    | An array of [Path](/reference/api/path) objects |
| `prefix`     | `mirrored` | `string`   | A prefix to apply to the names of the clones points and or paths. Ignored if `nameFormat` is set |
| `nameFormat` |            | `function` | A method that receives the name of the path or point and should return the name for the cloned path and or point |
