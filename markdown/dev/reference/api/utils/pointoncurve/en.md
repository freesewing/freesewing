---
title: pointOnCurve()
---

```js
bool utils.pointOnCurve(
  Point start, 
  Point cp1, 
  Point cp2, 
  Point end, 
  Point check
)
```

Returns `true` if the point `check` lies on a curve described by points `start`, `cp1`, `cp2`, and `end`.

<Note>

Keep in mind that calculations with Bezier curves are often aproximations.

</Note>

<Example part="utils_pointoncurve">
A Utils.pointOnCurve() example
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

points.start = new Point(10, 10);
points.cp1 = new Point(90, 10);
points.cp2 = new Point(10, 60);
points.end = new Point(90, 60);

let scatter = [];
for (let i = 1; i < 19; i++) {
  for (let j = 1; j < 14; j++) {
    scatter.push(new Point(i * 10, j * 10));
  }
}
let snippet;
for (let point of scatter) {
  if (
    utils.pointOnCurve(
      points.start,
      points.cp1,
      points.cp2,
      points.end,
      point
    )
  ) {
    snippet = "notch";
  } else snippet = "bnotch";
  snippets[part.getId()] = new Snippet(snippet, point);
}
paths.curve = new Path()
  .move(points.start)
  .curve(points.cp1, points.cp2, points.end)
  .attr("class", "fabric stroke-lg");
```

