---
title: Path.reverse()
---

The `Path.reverse()` returns a path that is the reversed version of this path.
As in, start becomes end, and end becomes start.

## Signature

```js
Path path.reverse(bool cloneAttributes=false)
```

If you pass a truthy value to this method, it will return a deep clone of the
path, including its attributes. By default, it will return a shallow
copy, without the attributes.

## Example


<Example caption="Example of the Path.reverse() method">
```js
({ Point, points, Path, paths, part }) => {

  points.B = new Point(10, 30)
  points.BCp2 = new Point(40, 20)
  points.C = new Point(90, 30)
  points.CCp1 = new Point(50, -30)

  paths.example = new Path()
    .move(points.B)
    .curve(points.BCp2, points.CCp1, points.C)
    .setText("FreeSewing rocks", "text-xs fill-note center")

  paths.reverse = paths.example.reverse(true)

  return part
}
```
</Example>

## Notes

The reversed path is a shallow copy.
It will in other words not inherit the attributes of the original path.

If you want a deep copy, including the attributes, use `Path.reverse(true)`.
