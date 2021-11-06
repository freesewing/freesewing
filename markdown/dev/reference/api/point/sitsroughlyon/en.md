---
title: Point.sitsRoughlyOn()
---

Returns `true` if this point has roughly (rounded to the nearest millimeter) the same coordinates as the one you pass to it.

## Point.sitsRoughlyOn() signature

```js
bool point.sitsRoughlyOn(Point check)
```

<Note>

###### How rough?

The difference between this method and [`Point.sitsOn()`](/reference/api/point/sitson/) is
that this one rounds things down to the nearest integer (thus mm) before checking.

</Note>

## Point.sitsRoughlyOn() example

<Example 
  part="point_sitsroughlyon"
  caption="An example of the Point.sitsRoughlyOn() method"
/>

```js
let { Point, points, Snippet, snippets } = part.shorthand();

box(part);

let s;
for (let i = 0; i < 10; i++) {
  points[`a${i}`] = new Point(i * 10, 40);
  points[`b${i}`] = new Point(i * 10, i * 8);
  if (points[`a${i}`].sitsRoughlyOn(points[`b${i}`])) s = "notch";
  else s = "bnotch";
  snippets[`b${i}`] = new Snippet(s, points[`b${i}`]);
  snippets[`a${i}`] = new Snippet(s, points[`a${i}`]);
}
```
