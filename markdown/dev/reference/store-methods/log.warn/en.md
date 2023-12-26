---
title: log.warn()
---

This is the logging method for logs of `warn` level (warning).

## Signature

```js
undefined Store.log.warn(...data)
```

Like all logging methods, this method is _variadic_.
It will add logs to the array at `store.logs.warn`.

## Example

```js
({ log, part }) => {
  log.warn('Hey, I am logging')
  log.warn(
    'I am logging too',
    "But you don't see me make a big deal out if it"
  )
   
  return part
}
```

## Notes

You can override the default logging methods in the store with a plugin.
