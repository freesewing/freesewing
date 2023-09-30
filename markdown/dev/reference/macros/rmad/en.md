---
title: rmad
---

The `rmad` macro removes all dimensions with the exception of those that were
created with a custom ID. 
It is provided by the [annotations plugin](/reference/plugins/annotations).

## Signature

```js
macro('rmad')
```

## Example

<Example caption="An example of the rmad macro">
```js
({ Point, macro, part }) => {

  // This will be removed
  macro('ld', {
    from: new Point(10, 0),
    to: new Point(40, 0),
    d: 5,
  })

  // This will not removed
  macro('ld', {
    from: new Point(10, 20),
    to: new Point(80, 20),
    d: 5,
    id: 'example' // custom ID
  })

  macro('rmad')

  return part
}
```
</Example>
