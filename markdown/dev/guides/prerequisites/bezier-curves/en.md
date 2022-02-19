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

-   A start point
-   A first control point that’s linked to the start point
-   A second control point that’s linked to the end point
-   An end point

<Example settings_complete="0" part="path_curve">
An example of a Bézier curve drawn by the Path.curve() method
</Example>

Bézier curves and their *handles* or *control points* are surprisingly intuitive.
The following illustration does a great job at explaining how they are constructed:

![How Bézier curves are constructed](bezier.gif)

You don't need understand the mathematics behind Bézier Curves.
As long as you intuitively *get* how the control points influence the curve, you're good to go.

<Note>

###### More on Bézier curves

Wikipedia has a good [introduction to Bézier curves](https://en.wikipedia.org/wiki/B%C3%A9zier_curve).\
For a deep-dive into the subject, check out [A Primer on Bézier Curves](https://pomax.github.io/bezierinfo/) by
[Pomax](https://github.com/Pomax).

</Note>
