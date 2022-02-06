---
title: Creating the closure
order: 210
---

Things are starting to look good, but we can't fit the bib over the baby's head like this.
So we must create a closure. We'll let the straps overlap at the end, and put in a snap.

To round the straps, we'll use something new: **a macro**.

Macros are little helpers that automate things that would otherwise get rather tedious.
There are macros to add titles to your pattern, or grainline indicators, a scalebox, and
there's a macro to round corners. The `round` macro.

Before we can use it, we have to update our `part.shorthand()` call to indicate that we'd
also like to make use of macros. Simply add `macro` at the end:

```js
let {
  Point,
  points,
  Path,
  paths,
  complete,
  sa,
  paperless,
  measurements,
  options,
  macro
} = part.shorthand()
```

We need a half circle here, but the `round` macro works on 90° angles, so you'll use it twice.

As such, let's add some points to guide the macro, and then put it to work:

```js
let strap = points.edgeTop.dy(points.top)

points.tipRight = points.edgeTop.translate(strap / 2, strap / 2)
points.tipRightTop = new Point(points.tipRight.x, points.edgeTop.y)
points.tipRightBottom = new Point(points.tipRight.x, points.top.y)

macro("round", {
  from: points.edgeTop,
  to: points.tipRight,
  via: points.tipRightTop,
  prefix: "tipRightTop",
  render: true
})
macro("round", {
  from: points.tipRight,
  to: points.top,
  via: points.tipRightBottom,
  prefix: "tipRightBottom",
  render: true
})
```

<Note> You can find more information on the `round` macro in [the macros docs](/reference/api/macros/round/).</Note>

<Example pattern="tutorial" part="step7">
Pretty good, but how are we going to fit it over the baby's head?
</Example>

Like our neck opening, we've only drawn half since we can simply copy the points to the other side.

However, doing so would make both straps overlap. Which doesn't work for a pattern as it would make it
impossible to cut it out of a single piece of fabric. So let's deal with the overlap next.



