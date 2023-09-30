---
title: Point.addText()
---

The `Point.addText()` method adds text on a Point. Under the hood, this will
call `Point.attr()` as text is added by setting attributes. Refer to [Adding
text](/howtos/code/adding-text) for more details.

## Signature

```js
Point point.addText(
  string text,
  string className
)
```

<Tip compact>This method is chainable as it returns the `Point` object</Tip>

## Example

<Example caption="Examples of Point.addText(), compare this to [Point.setText](/reference/api/point/settext)">
```js
({ Point, points, Path, paths, part }) => {
  points.anchor = new Point(100, 25)
    .addText('FreeSewing')
    .addText('rocks')

  // Avoid the text getting cropped
  paths.hidden = new Path()
    .move(points.anchor)
    .line(points.anchor.shift(0, 80))
    .addClass('hidden')


  return part
}
```
</Example>

## Notes

Remember to [use translation keys, not text](/guides/best-practices/use-translation-keys)
