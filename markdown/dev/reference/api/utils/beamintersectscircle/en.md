---
title: beamIntersectsCircle()
---

```js
array | false utils.beamIntersectsCircle(
  Point center, 
  float radius, 
  Point point1, 
  Point point1, 
  string sort = 'x'
)
```

Finds the intersection between an endless line through points `point1` and `point2`
and a circle with its center at point `center` and a radius of `radius` mm.

The 5th and last parameter controls the *sorting* of the found intersections.
This will (almost) always return 2 intersections, and you can choose how 
they are ordered in the returned array:

Set sort to:

 - `x` : The point with the lowest X-coordinate will go first (left to right)
 - `y` : The point with the lowest Y-coordinate will go first (top to bottom)

<Example part="utils_beamintersectscircle">
A Utils.beamIntersectsCircle() example
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

points.A = new Point(45, 45)
  .attr("data-circle", 35)
  .attr("data-circle-class", "fabric");
points.B = new Point(5, 50);
points.C = new Point(25, 30);
points.D = new Point(5, 65);
points.E = new Point(65, 5);
points.F = new Point(15, 75);
points.G = new Point(75, 15);

paths.line1 = new Path().move(points.B).line(points.C);
paths.line2 = new Path().move(points.D).line(points.E);
paths.line3 = new Path().move(points.F).line(points.G);

let intersections1 = utils.beamIntersectsCircle(
  points.A,
  points.A.attributes.get("data-circle"),
  points.B,
  points.C
);
let intersections2 = utils.beamIntersectsCircle(
  points.A,
  points.A.attributes.get("data-circle"),
  points.D,
  points.E,
  "y"
);
let intersections3 = utils.beamIntersectsCircle(
  points.A,
  points.A.attributes.get("data-circle"),
  points.F,
  points.G
);

snippets.first1 = new Snippet("bnotch", intersections1[0]);
snippets.second1 = new Snippet("notch", intersections1[1]);
snippets.first2 = new Snippet("bnotch", intersections2[0]);
snippets.second2 = new Snippet("notch", intersections2[1]);
snippets.first3 = new Snippet("bnotch", intersections3[0]);
snippets.second3 = new Snippet("notch", intersections3[1]);
```
