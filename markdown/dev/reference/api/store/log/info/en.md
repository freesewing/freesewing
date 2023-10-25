---
title: Store.log.info()
---

This is the logging method for logs of `info` level.

## Signature

```js
undefined Store.log.info(...data)
```

Like all logging methods, this method is _variadic_.
It will add logs to the array at `store.logs.info`.

## Example

```js
({ log, part }) => {
  log.info('Hey, I am logging')
  log.info(
    'I am logging too',
    "But you don't see me make a big deal out if it"
  )
   
  return part
}
```

## Notes

You can override the default logging methods in the store with a plugin.
