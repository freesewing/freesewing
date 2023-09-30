---
title: Path.addText()
---

The `Path.addText()` method adds text to the path.

## Signature

```js
Path path.addText(string text, string className)
```

The second argument will optionally be used to set the CSS class for the text.

<Tip compact>This method is chainable as it returns the `Path` object</Tip>

## Example

<Example caption="Example of the Path.addText() method">
```js
({ Point, points, Path, paths, part }) => {
  points.from = new Point(5, 10)
  points.to = new Point(95, 10)

  paths.line = new Path()
    .move(points.from)
    .line(points.to)
    .addText('FreeSewing rocks')

  return part
}
```
</Example>

## Notes

The main purpose of this method is to save your some typing,
as the two following calls yield the same result:

```js
path.attr('data-text', 'Hello')
path.addText('Hello')
```

The difference with [Path.setText()](/reference/api/path/addtext) is that this
method will add to the existing text whereas `Path.setText()` will overwrite
existing text on the path,
