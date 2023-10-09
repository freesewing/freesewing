---
title: Adding seam allowance
order: 10
---

When adding seam allowance to a pattern, there are 3 things that come into play:

- Does the user want seam allowance?
- How much seam allowance does the user want?
- How can we add seam allowance?

Let's whip up a quick example for a moment to clarify how we will handle this:

<Example settings="sa: 10"caption="Some straight lines and some curves">
```design/src/bib.mjs
function draftBib({
  Path,
  Point,
  paths,
  points,
  // highlight-start
  sa,
  // highlight-end
  part,
}) {

  points.topLeft = new Point(0,0)
  points.bottomRight = new Point(100,40)
  points.topRight = new Point(points.bottomRight.x, points.topLeft.y)
  points.bottomLeft = new Point(points.topLeft.x, points.bottomRight.y)
  points.cp1 = new Point(50, 20)
  points.cp2 = new Point(70, 60)

  paths.shape = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .curve(points.cp1, points.cp2, points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .addClass('fabric')

  // highlight-start
  if (sa) paths.sa = paths.shape.offset(sa).addClass('fabric sa')
  // highlight-end

  return part
}
```
</Example>

As you can see from the source, we can descructure an `sa` variable (short for
seam allowance) that will hold either:

- `false` if the user does not want seam allowance
- A value in `mm` indicating how much seam allwance the user wants

To add seam allowance to our path, we just `offset` it by `sa` and add
some classes to it to style it. But, crucially, only if the user wants
seam allowance:

```mjs
if (sa) paths.sa = paths.shape
  .offset(sa)
  .addClass('fabric sa')
```

To refer back to our three question: Whether the user wants seam allowance, and
if so how much seam allowance is answered by the `sa` value passed to our draft
method.

And we add it with the `path.offset()` method which will offset the path.

Our bib pattern does not require seam allowance as it will be finished with
bias tape. But we can use this same technique to indicate that.

Before we do so though, we should talk about `complete`.
