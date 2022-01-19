---
title: Drawing the straps
order: 230
---

All we have to do now is flip a bunch of points on the other side,
and create one single path that follows our bib outline.

First, let's create the points:

```js
points.edgeTopRightCp = points.edgeTopLeftCp.flipX()
points.topCp1 = points.topCp2.flipX()
points.tipLeftTopStart = points.tipRightTopStart.flipX()
points.tipLeftTopCp1 = points.tipRightTopCp1.flipX()
points.tipLeftTopCp2 = points.tipRightTopCp2.flipX()
points.tipLeftTopEnd = points.tipRightTopEnd.flipX()
points.tipLeftBottomStart = points.tipRightBottomStart.flipX()
points.tipLeftBottomCp1 = points.tipRightBottomCp1.flipX()
points.tipLeftBottomCp2 = points.tipRightBottomCp2.flipX()
points.tipLeftBottomEnd = points.tipRightBottomEnd.flipX()
points.snapRight = points.snapLeft.flipX()
```

Now, remove the `neck` and `rect` paths that we created earlier, and replace
them with this new path:

```js
paths.seam = new Path()
  .move(points.edgeLeft)
  .line(points.bottomLeft)
  .line(points.bottomRight)
  .line(points.edgeRight)
  .curve(
    points.edgeRightCp, 
    points.edgeTopRightCp, 
    points.tipLeftTopStart
  )
  .curve(
    points.tipLeftTopCp1, 
    points.tipLeftTopCp2, 
    points.tipLeftTopEnd
  )
  .curve(
    points.tipLeftBottomCp1,
    points.tipLeftBottomCp2,
    points.tipLeftBottomEnd
  )
  .curve(
    points.topCp1, 
    points.rightCp2, 
    points.right
  )
  .curve(
    points.rightCp1, 
    points.bottomCp2, 
    points.bottom
  )
  .curve(
    points.bottomCp1, 
    points.leftCp2, 
    points.left
  )
  .curve(
    points.leftCp1, 
    points.topCp2, 
    points.tipRightBottomEnd
  )
  .curve(
    points.tipRightBottomCp2,
    points.tipRightBottomCp1,
    points.tipRightBottomStart
  )
  .curve(
    points.tipRightTopCp2,
    points.tipRightTopCp1,
    points.tipRightTopStart
  )
  .curve(
    points.edgeTopLeftCp, 
    points.edgeLeftCp, 
    points.edgeLeft
  )
  .close()
  .attr("class", "fabric")
```

The `round` macro we added earlier is still drawing a half-circle. We cannot remove the macros, or the points it creates would also disappear. Luckily, we can simply set `render` to `false` and keep the points without drawing the curves between them:

```js
macro("round", {
  from: points.edgeTop,
  to: points.tipRight,
  via: points.tipRightTop,
  prefix: "tipRightTop",
  render: false // set this from true to false
})
macro("round", {
  from: points.tipRight,
  to: points.top,
  via: points.tipRightBottom,
  prefix: "tipRightBottom",
  render: false // set this from true to false
})

```

<Note>

  You can also remove the `render` line completely. More on this in the next section.
  
</Note>

With that out of the way, our bib now looks like this:

<Example pattern="tutorial" part="step9">
That is looking a lot like a bib
</Example>


<Note> 

We used the `part.attr()` method to style our path? But because the `fabric` class is drawn in black,
it doesn't look much different. We'll use some other classes later that will make its effect more clear. 

</Note> 

It's looking pretty good. But those sharp corners at the bottom don't exactly say *baby* do they?
Let's fix that.

