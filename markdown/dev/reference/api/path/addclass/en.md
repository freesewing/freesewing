---
title: Path.addClass()
---

The `Path.addClass()` method adds a CSS class to the path.

## Signature

```js
Path path.addClass(string className)
```

<Tip compact>This method is chainable as it returns the `Path` object</Tip>

## Example

<Example caption="Example of the Path.addClass() method">
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
</Example>

## Notes

The main purpose of this method is to save your some typing,
as the two following calls yield the same result:

```js
path.attr('class', 'fabric')
path.addClass('fabric')
```
