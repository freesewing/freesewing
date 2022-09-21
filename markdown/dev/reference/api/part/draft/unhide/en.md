---
title: unhide()
---

Calling `unhide()` in a part's draft method will mark the part as not hidden.

<Tip>This method returns the `part` object, so it's chainable</Tip>

<Related>

The [hide](/reference/api/part/draft/hide) and
[setHidden](/reference/api/part/draft/sethidden) methods also control a
part's visibility

</Related>

## unhide() example

```js
cont part = {
  name: 'examples.hide',
  draft: ({ unhide, part }) =>  part.unhide()
}
```
