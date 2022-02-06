---
title: trim()
---

```js
Path path.trim()
```

Returns a new Path that is this path with overlapping parts removed.

This method is typically used when [Path.offset()](#offset) caused some overlap.

<Warning>

###### Use sparsely or performance will suffer

This method is recursive and complex, and the performance penalty for using
it on a long/complex path will be significant.

To limit the impact of path.trim(), follow this approach:

 - construct a minimal path that contains the overlap
 - trim it
 - now join it to the rest of your path

You can see an example of this 
[in the front part of the Bruce pattern](https://github.com/freesewing/freesewing/blob/develop/packages/bruce/src/front.js#L195).

</Warning>

<Example part="path_trim">
Example of the Path.trim() method
</Example>

```js
let { Point, points, Path, paths } = part.shorthand();

points.center = new Point(0, 0);
points.base = new Point(0, 10);
points.tip = new Point(0, 50);
points.tipCpRight = new Point(30, 50);
points.tipCpLeft = new Point(-30, 50);
paths.example = new Path().move(points.base);
for (let i = 0; i < 4; i++) {
  points["base" + i] = points.base.rotate(60 * i, points.center);
  points["tip" + i] = points.tip.rotate(60 * i, points.center);
  points["tipCpRight" + i] = points.tipCpRight.rotate(60 * i, points.center);
  points["tipCpLeft" + i] = points.tipCpLeft.rotate(60 * i, points.center);
  if (i < 2) {
    paths.example
      .line(points["base" + i])
      .curve(points["base" + i], points["tipCpLeft" + i], points["tip" + i])
      .curve(
        points["tipCpRight" + i],
        points["base" + i],
        points["base" + i]
      );
  } else {
    paths.example
      .line(points["base" + i])
      .line(points["tip" + i])
      .line(points["tipCpRight" + i])
      .line(points["base" + i]);
  }
}

paths.offset = paths.example
  .offset(10)
  .attr("class", "lining dotted stroke-sm");

paths.trimmed = paths.offset
  .trim()
  .attr("class", "various stroke-xl")
  .attr("style", "stroke-opacity: 0.5;");
```
