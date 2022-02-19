---
title: pointOnBeam()
---

```js
bool utils.pointOnBeam(
  Point point1, 
  Point point2, 
  Point check, 
  float precision = 1e6
)
```

Returns `true` if the point `check` lies on the endless line that goes through `point1` and `point2`.
The fourth parameter controls the precision. Lower numbers make the check less precise.

<Note>

###### Tweak precision only when needed

Typically, you don't need to worry about precision. But occasionally, you may get
unexpected results because of floating point errors, rounding errors, or
cubic bezier juggling.

When that happens, you can lower the precision so you get what you expect.

</Note>

<Example part="utils_pointonbeam">
A Utils.pointOnBeam() example
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

points.from1 = new Point(10, 10);
points.to1 = new Point(90, 60);
points.from2 = new Point(10, 30);
points.to2 = new Point(90, 80);
points.b1 = new Point(170, 110);
points.b2 = new Point(170, 130);

let scatter = [];
for (let i = 1; i < 36; i++) {
  for (let j = 1; j < 27; j++) {
    scatter.push(new Point(i * 10, j * 10));
  }
}
let snippet;
for (let point of scatter) {
  if (utils.pointOnBeam(points.from1, points.to1, point)) snippet = "notch";
  else snippet = "bnotch";
  snippets[part.getId()] = new Snippet(snippet, point);
  if (utils.pointOnBeam(points.from2, points.to2, point, 0.01)) {
    snippet = "notch";
  } else snippet = "bnotch";
  snippets[part.getId()] = new Snippet(snippet, point);
}
paths.line1 = new Path()
  .move(points.from1)
  .line(points.to1)
  .attr("class", "fabric stroke-lg");
paths.lne1 = new Path()
  .move(points.to1)
  .line(points.b1)
  .attr("class", "fabric dashed");
paths.line2 = new Path()
  .move(points.from2)
  .line(points.to2)
  .attr("class", "fabric stroke-lg");
paths.lne2 = new Path()
  .move(points.to2)
  .line(points.b2)
  .attr("class", "fabric dashed");
```
