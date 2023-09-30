---
title: Understanding Bézier curves
order: 50
---

While lines on computers are easy to store with a start and end point,
curves require more information.
In FreeSewing — as in SVG and countless of other computer applications —
curves are stored as [Bézier curves](https://en.wikipedia.org/wiki/B%C3%A9zier_curve),
named after French engineer [Pierre Bézier](https://en.wikipedia.org/wiki/Pierre_B%C3%A9zier) who
popularized their use back in the 1960s.

In FreeSewing, we use so-called cubic Bézier curves which have:

- A start point
- A first control point that’s linked to the start point
- A second control point that’s linked to the end point
- An end point

<Example caption="An example of a Bézier curve drawn by the Path.curve() method" settings="margin: 20">
```js
({ Point, points, Path, paths, part }) => {

  points.from = new Point(10, 20)
  points.cp1 = new Point(40, 0)
  points.cp2 = new Point(60, 40)
  points.to = new Point(90, 20)
  
  paths.line = new Path()
    .move(points.from)
    .curve(points.cp1, points.cp2, points.to)
    .setText("Path.curve()", "text-sm center fill-note")

  return part
}
```
</Example>

Bézier curves and their _handles_ or _control points_ are surprisingly intuitive.
The following illustration does a great job at explaining how they are constructed:

![How Bézier curves are constructed](bezier.gif)

You don't need to understand the mathematics behind Bézier Curves.
As long as you intuitively _get_ how the control points influence the curve, you're good to go.

<Note>

###### More on Bézier curves

Wikipedia has a good [introduction to Bézier curves](https://en.wikipedia.org/wiki/B%C3%A9zier_curve).  
For a deep-dive into the subject, check out [A Primer on Bézier Curves](https://pomax.github.io/bezierinfo/) by
[Pomax](https://github.com/Pomax).

</Note>
