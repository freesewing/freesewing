---
title: Point.setText()
---

The `Point.setText()` method sets text on a Point. Under the hood, this will
call `Point.attr()` as text is set via attributes. Refer to [Adding
text](/howtos/code/adding-text) for more details.

## Signature

```js
Point point.setText(
  string text,
  string className
)
```

<Tip compact>This method is chainable as it returns the `Point` object</Tip>

## Example

<Example caption="Examples of Point.setText(), compare this to [Point.setText()](/reference/api/point/settext)">
```js
({ Point, points, Path, paths, part }) => {

  points.anchor = new Point(100, 25)
    .setText('FreeSewing')
    .setText('rocks')

  // Avoid the text getting cropped
  paths.hidden = new Path()
    .move(points.anchor)
    .line(points.anchor.shift(0, 80))
    .addClass('hidden')

  return part
}
```
</Example>

<Tip compact>Remember to [use translation keys, not text](/guides/best-practices/use-translation-keys)</Tip>
