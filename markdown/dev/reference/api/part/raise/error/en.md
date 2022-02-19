---
title: Part.raise.error()
---

A part's `raise.error()` method will log a error-level event.
Unlike other raised events which have no side-effects, if there is one or more
events of type `error`, the pattern will not be completed.
In other words, you should only use this when end up in a situation
you cannot recover from.  If not, [raise a warning](/reference/api/part/raise/warning).

<Tip>

All raise methods are available via [the shorthand method](/reference/api/part/shorthand)

</Tip>

## Part.raise.error() signature

```js
raise.error(data)
```

## Part.raise.error() example

```js
export default function (part) {
  const { raise, measurements } = part.shorthand()

  if (measurements.hips > measurements.chest) {
    raise.warning('Chest circumference smaller than hip circumference is currently unsupported. Aborting.')
    return part
  } 
}
```
