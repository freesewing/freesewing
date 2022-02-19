---
title: intersects()
---

    array|false path.intersects(Path path)

Returns the Point object(s) where the path intersects with a path you pass it.

<Tip>

###### Use the intersection methods in Utils whenever possible

This is an expensive (read: slow) method that you should only use when you don't know
in advance in what segment of your path the intersection will occur.

If you do know, use one of the intersection methods in [Utils](/reference/api/utils).

</Tip>

<Example part="path_intersects">
Example of the Path.intersects() method
</Example>

```js
let { Point, points, Path, paths, Snippet, snippets } = part.shorthand();

points.A = new Point(45, 60);
points.B = new Point(10, 30);
points.BCp2 = new Point(40, 20);
points.C = new Point(90, 30);
points.CCp1 = new Point(50, -30);
points.D = new Point(50, 130);
points.DCp1 = new Point(150, 30);

points._A = new Point(55, 40);
points._B = new Point(0, 55);
points._BCp2 = new Point(40, -20);
points._C = new Point(90, 40);
points._CCp1 = new Point(50, -30);
points._D = new Point(40, 120);
points._DCp1 = new Point(180, 40);

paths.demo1 = new Path()
  .move(points.A)
  .line(points.B)
  .curve(points.BCp2, points.CCp1, points.C)
  .curve(points.DCp1, points.DCp1, points.D);
paths.demo2 = new Path()
  .move(points._A)
  .line(points._B)
  .curve(points._BCp2, points._CCp1, points._C)
  .curve(points._DCp1, points._DCp1, points._D);

for (let p of paths.demo1.intersects(paths.demo2)) {
  snippets[part.getId()] = new Snippet("notch", p);
}
```
