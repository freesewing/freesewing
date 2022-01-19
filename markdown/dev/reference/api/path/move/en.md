---
title: move()
---

```js
Path path.move(Point to)
```

Moves to a given point without drawing a line. 


<Tip>

###### Always start your path with a move

When drawing a path, you must always start with a `move()` call, 
followed by your `line()` and/or `curve()` calls
and an optional `close()` call.

These calls are chainable, making your code easier to read:
 
```js
paths.example = new Path()
  .move(points.a)
  .curve(points.b, points.c, points.d)
  .line(points.e)
  .close();
```

</Tip>


<Example part="path_move">
Example of the Path.move() method
</Example>

```js
let { Point, points, Path, paths } = part.shorthand();

points.to = new Point(50, 20)
  .attr("data-text", "Path.move()")
  .attr("data-text-class", "text-xs fill-note");

paths.noline = new Path().move(points.to);
```
