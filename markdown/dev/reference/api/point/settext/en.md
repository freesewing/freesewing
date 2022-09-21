---
title: Point.setText()
---

Sets text on a Point. Under the hood, this will call `Point.attr()` as text 
is set via attributes. Refer to [Adding text](/howtos/code/adding-text) for 
more details.

## Point.setText() signature

```js
Point point.setText(
  string text, 
  string className
)
```

## Point.setText() example

<Example part="point_settext">
Examples of Point.setText(), compare this to [Point.setText](/reference/api/point/settext)
</Example>

```js
({ Point, points, part }) => {
  points.anchor = new Point(100, 25)
    .setText('supportFreesewingBecomeAPatron', 'center')
    .setText('please?')

  return part
}
```

<Tip compact>Remember to [use translation keys, not text](/guides/best-practices/use-translation-keys)</Tip>

