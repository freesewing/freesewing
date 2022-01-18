---
title: Fitting the neck opening
order: 170
---

Here's how we'll make sure the neck opening is *just right*:

```js
let tweak = 1
let target = (measurements.head * options.neckRatio) /4
let delta
do {
	points.right = new Point(tweak * measurements.head / 10, 0)
	points.bottom = new Point(0, tweak * measurements.head / 12)

	points.rightCp1 = points.right.shift(90, points.bottom.dy(points.right)/2)
	points.bottomCp2 = points.bottom.shift(0, points.bottom.dx(points.right)/2)

	paths.quarterNeck = new Path()
	  .move(points.right)
	  .curve(points.rightCp1, points.bottomCp2, points.bottom)

	delta = paths.quarterNeck.length() - target
  if (delta > 0) tweak = tweak * 0.99
  else tweak = tweak * 1.02
} while (Math.abs(delta) > 1)
```

We've added a few new variables:

 - `tweak`: A *tweak factor* that we'll use to increase or decrease the neck opening by making it more or less than 1
 - `target`: How long our (quarter) neck opening should be
 - `delta`: How far we're off. Positive numbers mean it's too long, negative means too short

Now that we know what `target` is, we construct our path as we did before.
But this time around, we multiply our point coordinates with our `tweak` variable (1 at the start).

Then, we compare our `target` to the result of `paths.neck.length()` which — you guessed it — returns the 
length of our neck path.

If the delta is positive, our path is too long and we reduce the tweak factor.  
If the delta is negative, our path is too short and we increase the tweak factor.

We keep on doing this until `Math.abs(delta)` is less than 1. Meaning that we are within 1mm of our target value.

<Example pattern="tutorial" part="step2">
It might look the same as before, but now it's just right
</Example>

Now that we're happy with the length of our quarter neck opening, let's construct the entire neck opening.

