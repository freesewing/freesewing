---
title: Part.setHidden()
---

The `Part.setHidden()` method will mark the part either hidden
or not, depending on the value you pass it.
This method returns the `part` object, so it's chainable

- Pass a *truthy* value: The part will be hidden
- Pass a *falsy* value: The part will be unhidden/revealed

<Tip>
This method can be destructured as `setHidden` 
in [a part's draft method](/reference/api/part/draft).
</Tip>

<Related>

The [hide](/reference/api/part/hide) and
[unhide](/reference/api/part/unhide) also control a
part's visibility

</Related>

## Part.setHidden() example

```js
cont part = {
  name: 'examples.hide',
  draft: ({ setHidden, part }) =>  part.setHidden(true)
}
```
