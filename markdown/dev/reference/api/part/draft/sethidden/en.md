---
title: setHidden()
---

Calling `setHidden()` in a part's draft method will mark the part either hidden
or not, depending on whether you:

- Pass a *truthy* value: part will be hidden
- Pass a *falsy* value: part will be unhidden/revealed

<Tip>This method returns the `part` object, so it's chainable</Tip>

<Related>

The [hide](/reference/api/part/draft/hide) and
[unhide](/reference/api/part/draft/unhide) also control a
part's visibility

</Related>

## setHidden() example

```js
cont part = {
  name: 'examples.hide',
  draft: ({ setHidden, part }) =>  part.setHidden(true)
}
```
