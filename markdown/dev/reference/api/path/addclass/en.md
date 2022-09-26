---
title: Path.addClass()
---

The `Path.addClass()` method adds a CSS class to the path.

```js
Path path.addClass(string className)
```

<Tip | compact>This method is chainable as it returns the `Path` object</Tip>

<Tip>

###### This method exists to save you some typing

Note that the two following calls yield the same result:

```js
path.attr('class', 'fabric')
path.addClass('fabric')
```

So the only purpose of this method is to save your some typing.

</Tip>

<Example part="path_addclass">
Example of the Path.addClass() method
</Example>

```js
({ Point, points, Path, paths, part }) => {

  points.from = new Point(5, 10)
  points.to = new Point(95, 10)

  paths.line = new Path()
    .move(points.from)
    .line(points.to)
    .addClass('note dashed')

  return part
}
```
