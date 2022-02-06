---
title: Rounding the corners
order: 240
---

We already know how to round corners, let the `round` macro do it:


```js
macro("round", {
  from: points.topLeft,
  to: points.bottomRight,
  via: points.bottomLeft,
  radius: points.bottomRight.x / 4,
  prefix: "bottomLeft"
})
macro("round", {
  from: points.bottomLeft,
  to: points.topRight,
  via: points.bottomRight,
  radius: points.bottomRight.x / 4,
  prefix: "bottomRight"
})
```

But there's still something to be learned here. If you look at our earlier use of the `round` macro,
you'll notice that we used this line in the beginning:

```js
  render: true,
```

This instructs the `round` macro create a path that draws the rounded corner. 
Whereas by default, it merely constructs the points required to round the corner. 

Typically, your rounded corner will be part of a larger path and so you don't want the macro
to draw it. That's why the `round` macro's `render` property defaults to `false`.

We've left it out here, and you should also remove it from your earlier use of the `round` macro.
We merely set `render` to `true` and then `false` at that time so you could see what the macro was doing.

<Note>
  
  There is no need to explicitly specify a default value. While writing `render: false,` also works, it clutters up your code a bit. 
  
  </Note>

With our corners rounded, we should update our path.
Fortunately, we merely have to update the start of it. Replace this:

```js
paths.seam = new Path()
  .move(points.edgeLeft)
  .line(points.bottomLeft)
  .line(points.bottomRight)
  .line(points.edgeRight)
```

With this:

```js
paths.seam = new Path()
  .move(points.edgeLeft)
  .line(points.bottomLeftStart)
  .curve(points.bottomLeftCp1, points.bottomLeftCp2, points.bottomLeftEnd)
  .line(points.bottomRightStart)
  .curve(points.bottomRightCp1, points.bottomRightCp2, points.bottomRightEnd)
  .line(points.edgeRight)
```

and keep the rest of the path as it was.

The shape our bib is now completed:

<Example pattern="tutorial" part="step10">
That is looking a lot like a bib
</Example>



