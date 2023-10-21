---
title: Store.log.debug()
---

This is the logging method for logs of `debug` level.

## Signature

```js
undefined Store.log.debug(...data)
```

Like all logging methods, this method is _variadic_.
It will add logs to the array at `store.logs.debug`.

## Example

```js
({ log, part }) => {
  log.debug('Hey, I am logging')
  log.debug(
    'I am logging too',
    "But you don't see me make a big deal out if it"
  )
   
  return part
}
```

## Notes

You can override the default logging methods in the store with a plugin.
