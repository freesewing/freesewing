---
title: Store.logs
---

A **Store** is initialized with a `logs` property that holds logging data.

<Note>
If errors are logged, FreeSewing will not try to layout the pattern.
</Note>

## Signature

```js
logs: {
  debug: [],
  info: [],
  warning: [],
  errors: []
}
```

## Notes

Users can override the default logging, so don't assume this is where logs end up.

That's why, you should always use the methods in [Store.log](/reference/api/store/log) to log.

