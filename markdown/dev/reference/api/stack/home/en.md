---
title: Stack.home()
---

The `Stack.home()` method calculates the stack's bounding box,
setting the `width`, `height`, `topLeft`, and `bottomRight` properties,
and returns the original stack.

## Stack.home() signature

```js
Stack stack.home()
```
<Note>This method is chainable as it returns the Stack object</Note>

## Notes

The bounding box is calculated taking into consideration the `margin` setting.

`Stack.home()` caches its calculations by checking whether the stack's
`topLeft` property has been set.
If `topLeft` has a truthy value, it will not re-calculate.
