---
title: Path.setClass()
---

The `Path.setClass()` method sets the CSS class(es) of the path.

## Signature

```js
Path path.setClass(string className)
```

<Tip compact>This method is chainable as it returns the `Path` object</Tip>

## Example

<Example caption="Example of the Path.setClass() method">
```js
({ Point, points, Path, paths, part }) => {

  points.from = new Point(5, 10)
  points.to = new Point(95, 10)

  paths.line = new Path()
    .move(points.from)
    .line(points.to)
    .setClass('note dashed')

  return part
}
```
</Example>

## Notes

The main purpose of this method is to save your some typing,
as the two following calls yield the same result:

```js
path.attr('class', 'fabric', true)
path.addClass('fabric')
```
