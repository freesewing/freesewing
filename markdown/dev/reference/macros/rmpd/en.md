---
title: rmPd
---

The `rmPd` macro removes the nodes added by [the pd macro](/reference/macros/pd).
It is the recommended way to remove (the effects of) a `pd` macro.

It is provided by [plugin-annotations](/reference/plugins/annotations), which is
part of [core-plugins](/reference/plugins/core) (so it is available by default).

## Signature

```js
macro('rmPd', id = 'pd')
```
