---
title: Adding points
for: developers
about: Shows you how to add points to your pattern
---

After using the [shorthand](/howtos/code/shorthand/) call,
`Point` contains the point constructor, while `points` is a reference to `part.points`,
which is where you should store your points.

Things will now *just work* when you do this:

```js
points.centerBack  = new Point(0,0);
```

<Tip>

The [Point API docs](/reference/api/point/) list many ways to create a point.

</Tip>
