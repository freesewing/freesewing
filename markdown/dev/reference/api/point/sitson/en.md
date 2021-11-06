---
title: Point.sitsOn()
---

Returns `true` if this point has the _exact_ same coordinates as the point you pass to it.

<Note>

###### Too exact?

This method is _very_ precise, so points with an X-coordinate of `10` and `10.0001`
are considered to be different.

To check if two points have the same coordinates rounded to the nearest
millimeter, use [`Point.sitsRoughlyOn()`](/reference/api/point/sitsroughlyon/) instead.

</Note>

## Point.sitsOn() signature

```js
bool point.sitsOn(Point check)
```

## Point.sitsOn() example

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
