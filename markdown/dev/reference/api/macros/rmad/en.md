---
title: rmad
---

The `rmad` macro removes all dimensions with the exception of those that were created with a custom ID.
It is provided by the [dimension plugin](/reference/plugins/dimension/).

To be able to use this plugin, you need to give your dimension an id:

```js
// This will be removed
macro('ld', {
  from: points.from,
  to: points.to,
  d: 0,
})
// This will not removed
macro('ld', {
  from: points.from,
  to: points.to,
  d: 0,
  id: 'example' // custom ID
})

macro('rmad')
```
