---
title: Path.bbox()
---

The `Path.bbox()` method returns an object describing the bounding box of a path.
In other words, it gives you a rectangle the Path fits in.

```js
object path.bbox()
```

It returns an object with a signature like this:

```js
{
  topLeft: Point,
  bottomRight: Point
}
```

<Note>

This method is mostly aimed at people looking to implement their own layout solution.

</Note>
