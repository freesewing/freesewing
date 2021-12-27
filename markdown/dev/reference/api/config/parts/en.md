---
title: parts
---

```js
parts: [
  "front",
  "back"
]
```

An array that lists your (additional) pattern parts. The name must be the key the `pattern.parts` object.

<Tip>

###### This does not need to be an exhaustive list of all parts in your pattern.

This list of parts is needed for the `draft()` method to figure out what
parts need to be drafted.
So if parts are included in the `dependencies`, `inject`, or `hide` configuration, 
there's no need to include them here, as we already know of their existence.

</Tip>
