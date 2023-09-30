---
title: Part.hide()
---

The `Part.hide()` method will mark the part as hidden.
This method returns the `part` object, so it's chainable.

<Tip>
This method can be destructured as `hidden` 
in [a part's draft method](/reference/api/part/draft).
</Tip>

<Related>

The [unhide](/reference/api/part/unhide) and
[setHidden](/reference/api/part/sethidden) methods also control a
part's visibility

</Related>

## Part.hide() example

```js
cont part = {
  name: 'examples.hide',
  draft: ({ hide, part }) =>  part.hide()
}
```
