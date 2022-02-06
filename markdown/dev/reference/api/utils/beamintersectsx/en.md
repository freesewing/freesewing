---
title: beamIntersectsX()
---

```js
Point | false utils.beamIntersectsX(Point A, Point B, float X)
```

Finds the intersection between an endless line and a given X-value. Returns a [Point](#point) object
for the intersection, or `false` there is no intersection.

<Example part="utils_beamintersectsx">
A Utils.beamIntersectsX() example
</Example>

```js
  let {
    Point,
    points,
    Path,
    paths,
    Snippet,
    snippets,
    utils
  } = part.shorthand();

  points.A = new Point(10, 10);
  points.B = new Point(90, 30);

  paths.AB = new Path().move(points.A).line(points.B);

  snippets.x = new Snippet("notch", utils.beamIntersectsX(points.A, points.B, 40));

  paths.help = new Path()
    .move(new Point(40, 5))
    .line(new Point(40, 35))
    .attr("class", "note dashed");
```

