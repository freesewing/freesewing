---
title: sitsOn()
---

```js
bool point.sitsOn(Point check)
```

Returns true if the point has the same coordinates as the one you pass to it.

<Example 
  part="point_sitson"
  caption="An example of the Point.sitsOn() method"
/>

```js
let { Point, points, Snippet, snippets } = part.shorthand();

let s;
for (let i = 0; i < 10; i++) {
  points[`a${i}`] = new Point(i * 10, 40);
  points[`b${i}`] = new Point(i * 10, i * 8);
  if (points[`a${i}`].sitsOn(points[`b${i}`])) s = "notch";
  else s = "bnotch";
  snippets[`b${i}`] = new Snippet(s, points[`b${i}`]);
  snippets[`a${i}`] = new Snippet(s, points[`a${i}`]);
}
```
