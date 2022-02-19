---
title: Constructing the neck opening
order: 160
---

Your goal is to construct a slightly oval neck opening that has a circumference that is
the `head` measurements multiplied by the `neckRatio` option.

That might involve some trial and error. But since the neck opening will be symetric
both horizontal and vertical, you only need to construct one quadrant.

We'll be adding some points to our pattern to do just that. But we want to have access
to our measurements and options to do so. For this, you first update the shorthand call
to indicate you also want access to `measurements` and `options`:

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
  options
} = part.shorthand()
```

Great. Now let's get to work:

```js
// Design pattern here
points.right = new Point(measurements.head / 10, 0)
points.bottom = new Point(0, measurements.head / 12)

points.rightCp1 = points.right
  .shift(90, points.bottom.dy(points.right)/2)
points.bottomCp2 = points.bottom
  .shift(0, points.bottom.dx(points.right)/2)

paths.quarterNeck = new Path()
  .move(points.right)
  .curve(points.rightCp1, points.bottomCp2, points.bottom)
```

You've added some points to your part, and drawn your first path. Let's look at each line in detail:

```js
points.right = new Point(measurements.head / 10, 0)
```

-   We're adding a point named `right` to `points` which holds our part's points
-   We're using the Point constructor, which takes two arguments: The point's X and Y values
-   The X value is `measurements.head / 10`
-   The Y value is `0`

The `bottom` part is very similar, so let's skip to the next line:

```js
points.rightCp1 = points.right
  .shift(90, points.bottom.dy(points.right)/2)
```

-   We're adding a point named `rightCp1`, which will become the *control point* of the right part
-   Instead of using the Point constructor, we're calling the `Point.shift()` method on an existing point
-   It takes two arguments: The angle to shift towards, and the distance
-   You can see that we're shifting 90 degrees (that means up) but the distance uses another method
-   The `Point.dy()` method returns the delta along the Y axis between the point you call it on and the point you pass it
-   We shift half of the Y-delta

The next point is very similar again, except that this time we're shifting to the right (0 degrees) for half of
the X-delta between points `bottom` and `right`.

<Tip>

Points come with a bunch of these methods.
You can find them all in [the Point API docs](/reference/api/point/).

</Tip>

The next line introduces you to something new: Paths:

```js
paths.quarterNeck = new Path()
  .move(points.right)
  .curve(points.rightCp1, points.bottomCp2, points.bottom)
```

-   We're adding a path named `quarterNeck` to `paths` which holds our part's paths
-   We're using the Path constructor, which takes no arguments
-   We're following up with a `Path.move()` call that takes one Point as argument
-   Then, there's a `Path.curve()` call that takes 3 points as arguments

If you've read through the high-level [Pattern guide](/guides/patterns/) you will have learned that paths
always start with a `move()` operation. In this case, we moved to our `right` points.

From there, we drew a Bezier curve to our `bottom` point by using `rightCp1` and `bottomCp2` as control points.

When all is said and done, we now have a quarter of our neck opening:

<Example pattern="tutorial" part="step2">You have drawn your first path</Example>

The only problem is, we have no guarantee whatsoever that this opening is the correct size.

Rather than hope it is the correct size, you'll make sure it is next.
