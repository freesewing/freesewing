---
title: Part.unhide()
---

The `Part.unhide()` method will mark the part as not hidden.
This method returns the `part` object, so it's chainable.

<Tip>
This method can be destructured as `inhide` 
in [a part's draft method](/reference/api/part/draft).
</Tip>

<Related>

The [hide](/reference/api/part/hide) and
[setHidden](/reference/api/part/sethidden) methods also control a
part's visibility

</Related>

## Part.unhide() example

```js
cont part = {
  name: 'examples.hide',
  draft: ({ unhide, part }) =>  part.unhide()
}
```
