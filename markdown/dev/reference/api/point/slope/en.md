---
title: Point.slope()
---

The `Point.slope()` method returns slope of a line made by this Point and that Point.

## Signature

```js
point.slope(a,b)
```

## Example

<Example caption="An example of the Point.slope() method">
```js
({ Point, points, Path, paths, Snippet, snippets, part }) => {

 points.A = new Point(5,10)
 points.B = new Point(10,20)

point.slope(A,B)


  return part
}
```
</Example>


