---
title: hide()
---

Calling `hide()` in a part's draft method will mark the part as hidden.

<Tip>This method returns the `part` object, so it's chainable</Tip>

<Related>

The [unhide](/reference/api/part/draft/unhide) and
[setHidden](/reference/api/part/draft/sethidden) methods also control a
part's visibility

</Related>

## hide() example

```js
cont part = {
  name: 'examples.hide',
  draft: ({ hide, part }) =>  part.hide()
}
```
