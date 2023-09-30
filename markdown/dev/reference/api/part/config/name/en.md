---
title: Naming parts
---

The `name` property is  -- together with [the `draft()` 
method](/reference/api/part/draft) -- the
only mandatory property in a part's configuration object.

It should hold a string and be unique in the design:

```js
const part = {
  name: 'example.front',
  draft: ({ part }) => part
}
```

<Tip>

We recommend to use a `design.part` format when naming your part.
This avoids naming clashes when people re-use your parts in other designs.

</Tip>

