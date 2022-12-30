---
title: Path.setText()
---

The `Path.setText()` method sets text on the path.

## Signature

```js
Path path.setText(string text, string className)
```

The second argument will optionally be used to set the CSS class for the text.

<Tip compact>This method is chainable as it returns the `Path` object</Tip>

## Example

<Example caption="Example of the Path.setText() method">
```js
({ Point, points, Path, paths, part }) => {
  points.from = new Point(5, 10)
  points.to = new Point(95, 10)

  paths.line = new Path()
    .move(points.from)
    .line(points.to)
    .setText('FreeSewing rocks')

  return part
}
```
</Example>

## Notes

The main purpose of this method is to save your some typing,
as the two following calls yield the same result:

```js
path.attr('data-text', 'Hello')
path.setText('Hello')
```

The difference with [Path.addText()](/reference/api/path/addtext) is that this
method will overwrite existing text on the path, whereas `Path.addText()` will
add to the existing text.
