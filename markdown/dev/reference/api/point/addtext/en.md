---
title: Point.addText()
---

Adds text on a Point. Under the hood, this will call `Point.attr()` as text 
is added by setting attributes. Refer to [Adding text](/howtos/code/adding-text) for 
more details.

## Point.addText() signature

```js
Point point.addText(
  string text, 
  string className
)
```

## Point.addText() example

<Example part="point_addtext">
Examples of Point.addText(), compare this to [Point.setText](/reference/api/point/settext)
</Example>

```js
({ Point, points, part }) => {
  points.anchor = new Point(100, 25)
    .addText('supportFreesewingBecomeAPatron', 'center')
    .addText('please?')

  return part
}
```

<Tip compact>Remember to [use translation keys, not text](/guides/best-practices/use-translation-keys)</Tip>

