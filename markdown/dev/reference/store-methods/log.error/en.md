---
title: log.error()
---

This is the logging method for logs of `error` level.


<Note>
Logging something at the `error` level will stop FreeSewing from completing the draft of the pattern.
</Note>

## Signature

```js
undefined Store.log.error(...data)
```

Like all logging methods, this method is _variadic_.
It will add logs to the array at `store.logs.error`.

## Example

```js
({ log, part }) => {
  log.error('Hey, I am logging')
  log.error(
    'I am logging too',
    "But you don't see me make a big deal out if it"
  )
   
  return part
}
```

## Notes

You can override the default logging methods in the store with a plugin.
