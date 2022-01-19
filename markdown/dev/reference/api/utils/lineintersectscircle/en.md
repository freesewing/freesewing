---
title: lineIntersectsCircle()
---

```js
array | false utils.lineIntersectsCircle(
  Point center, 
  float radius, 
  Point from, 
  Point to, 
  string sort = 'x'
)
```

Finds the intersection between a line segment from point `from` to point `to`
and a circle with its center at point `center` and a radius of `radius` mm.

The 5th and last parameter controls the *sorting* of the found intersections.
When this returns 2 intersections, you can choose how they are ordered in the returned array:

Set sort to:

 - `x` : The point with the lowest X-coordinate will go first (left to right)
 - `y` : The point with the lowest Y-coordinate will go first (top to bottom)

<Example part="utils_lineintersectscircle">
A Utils.lineIntersectsCircle() example
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

points.A = new Point(95, 45)
  .attr("data-circle", 35)
  .attr("data-circle-class", "fabric");
points.B = new Point(55, 50);
points.C = new Point(75, 30);

points.D = new Point(55, 65);
points.E = new Point(115, 5);
points.F = new Point(65, 75);
points.G = new Point(125, 15);

paths.line1 = new Path().move(points.B).line(points.C);
paths.line2 = new Path().move(points.D).line(points.E);
paths.line3 = new Path().move(points.F).line(points.G);

let intersections1 = utils.lineIntersectsCircle(
  points.A,
  points.A.attributes.get("data-circle"),
  points.B,
  points.C
);
let intersections2 = utils.lineIntersectsCircle(
  points.A,
  points.A.attributes.get("data-circle"),
  points.D,
  points.E,
  "y"
);
let intersections3 = utils.lineIntersectsCircle(
  points.A,
  points.A.attributes.get("data-circle"),
  points.F,
  points.G
);
snippets.first1 = new Snippet("bnotch", intersections1[0]);
snippets.first2 = new Snippet("bnotch", intersections2[0]);
snippets.second2 = new Snippet("notch", intersections2[1]);
snippets.first3 = new Snippet("bnotch", intersections3[0]);
snippets.second3 = new Snippet("notch", intersections3[1]);
```

