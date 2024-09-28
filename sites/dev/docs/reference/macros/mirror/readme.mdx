---
title: mirror
---

The `mirror` macro allows you to mirror points and/or paths around a mirror line. 

It is provided by the [mirror plugin](/reference/plugins/mirror/), which is
part of [core-plugins](/reference/plugins/core) (so it is available by default).

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

  points.m1 =  new Point(20,0)
  points.m2 =  new Point(20,20)
  paths.mirror = new Path()
    .move(points.m1)
    .line(points.m2)
    .addClass('stroke-xm dashed stroke-lining')
  
  macro('mirror', {
    clone: true,
    mirror: [ points.m1, points.m2 ],
    paths: Object.keys(paths),
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
| `points`     |            | `array`    | An array of pointnames, the names of Points in the `points` array to mirror |
| `paths`      |            | `array`    | An array of pathnames, the names of Paths in the `paths` array to mirror |
| `prefix`     | `mirrored` | `string`   | A prefix to apply to the names of the clones points and or paths. Ignored if `nameFormat` is set |
| `nameFormat` |            | `function` | A method that receives the name of the path or point as a first argument and one of `path` or `point` as the second argument and should return the name for the cloned path and or point |

