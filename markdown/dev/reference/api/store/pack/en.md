---
title: Store.pack()
---

A **Store** is initialized with a `log` property that holds methods for logging.

Specifically, the `Store.log` property holds the following methods:

- `Store.log.debug()`: Logs at the debug level
- `Store.log.info()`: Logs at the info level
- `Store.log.warning()`: Logs at the warning level
- `Store.log.error()`: Logs at the error level

<Note>
If errors are logged, FreeSewing will not try to layout the pattern.
</Note>

## Signature

This signature is for the `info` level, but applies to all methods/levels:

```js
undefined Store.log.info(...data)
```

All logging methods are _variadic_, they will add logs to the array at `store.logs`.

So logging with `Store.log.info()` will add the logs to the array at `Store.logs.info`.

## Example

```js
({ log, part }) => {
  log.info('Hey, I am logging')
  log.debug(
    'I am logging too',
    `But you don't see me make a big deal out if it`
  )
   
  return part
}
```

## Notes

You can override the default logging methods in the store with a plugin.
