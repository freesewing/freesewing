---
title: Bézier curves
order: 50
---

While lines on computers are easy to store with a start and end point, 
curves require more information.

In FreeSewing — as in SVG and countless of other applications —  
curves are stored as Bézier curves. They have:

 - A start point
 - A first control point that’s linked to the start point
 - A second control point that’s linked to the end point
 - An end point

<Example settings={{complete: false}} part="path_curve" caption="An example of a Bézier curve drawn by the Path.curve() method" />

Bézier curves and their *handles* or *control points* are surprisingly intuitive. 
The following illustration does a great job at explaining how they are constructed:

![How Bézier curves are constructed](bezier.gif)

<Note>

###### More on Bézier curves

Wikipedia has a good [introduction to Bézier curves](https://pomax.github.io/bezierinfo/).  
For a deep-dive into the subject, check out [A Primer on Bézier Curves](https://pomax.github.io/bezierinfo/) by Pomax.

Note that you don't need understand the mathematics behind Bézier Curves. 
As long as you intuitively *get* how the control points influence the curve, you're good to go.

</Note>

