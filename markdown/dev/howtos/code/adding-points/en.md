---
title: Adding points
---

Points should be stored in the `points` key of the object passed to your part's
draft method. The constructor for points is available in the `Point` key. You
can destructure them for easy access.

<Example caption="An example of adding a point" tutorial>
```design/src/part.mjs
function draftPart = ({ 
  // highlight-start
  Point,
  points,
  // highlight-end
  part 
}) {

  // highlight-start
  points.demo = new Point(0,0).addText('hi')
  // highlight-end

  return part
}
```
</Example>
