---
title: Path.clean()
---

The `Path.clean()` method removes spurious drawing operations from a path.

A _spurious_ drawing operation is one that has no effect, but can still cause
problems if left in place.  For example, a line from a given point to the same
given point will not cause any problems as such, but can trip up things like
path offset and other methods. For this reason, such drawing operations can be
cleaned up with the `Path.clean()` method.

As this method is called under the hood to guard against various scenarios
where spurious segments could cause an issue, you should have no need to call
this method yourself explicitly, but it's there if you need it.  path that you
pass it.

## Signature

```js
Path path.clean()
```

## Example

<Example caption="Example of the Path.clean() method">
```js
({ Point, points, Path, paths, snippets, Snippet, part }) => {

  points.A = new Point(10, 10)
  points.B = new Point(10, 20)
  points.C = new Point(10, 30)
  points.D = new Point(90, 10)
  points.E = new Point(90, 20)
  points.F = new Point(90, 30)

  paths.a = new Path()
    .move(points.A)
    .line(points.C)
    .line(points.B)
    .line(points.B) // spurious op
    .line(points.E)
    .line(points.F)
    .curve_(points.F, points.F) // another spurious op
    .line(points.D)
    .addClass('lining')

  paths.b = paths.a
    .clone()
    .clean()
    .addClass('interfacing')

  paths.a.addText(`${paths.a.ops.length} ops in a`, 'center fill-lining')
  paths.b.addText(`${paths.b.ops.length} ops in b`, 'center fill-note')
    .attr('data-text-dy', 7)

  return part
}
```
</Example>
