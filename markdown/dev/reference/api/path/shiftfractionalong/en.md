---
title: shiftFractionAlong()
---

```js
Point path.shiftFractionAlong(float fraction[, int stepsPerMm=25])
```

Returns a point that lies at fraction of the length of the path travelled along the path.

<Example part="path_shiftfractionalong">
Example of the Path.shiftFractionAlong() method
</Example>

```js
let { Point, points, Path, paths, Snippet, snippets } = part.shorthand();

points.A = new Point(45, 60);
points.B = new Point(10, 30);
points.BCp2 = new Point(40, 20);
points.C = new Point(90, 30);
points.CCp1 = new Point(50, -30);

paths.example = new Path()
  .move(points.A)
  .line(points.B)
  .curve(points.BCp2, points.CCp1, points.C);

points.x1 = paths.example
  .shiftFractionAlong(0.2)
  .attr("data-text", "msg_20")
  .attr("data-text-class", "center")
  .attr("data-text-lineheight", 6);
points.x2 = paths.example
  .shiftFractionAlong(0.9)
  .attr("data-text", "msg_90")
  .attr("data-text-class", "center")
  .attr("data-text-lineheight", 6);

snippets.xl = new Snippet("notch", points.x1);
snippets.x2 = new Snippet("notch", points.x2);
```

<Note>

##### The second parameter is optional

The second parameter controls the precision by which the path will be *walked*.
By default, we'll divide it into 25 steps per mm.

If you don't need that precision, you can pass a lower number.
But for most cases, you can just ignore it.

</Note>

