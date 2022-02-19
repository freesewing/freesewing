---
title: Part.raise.warning()
---

A part's `raise.warning()` method will log a warning-level event.
Warning events are typically used to pass information to pattern developers
so that can troubleshoot issues with the pattern, or users to warn them
that something is sub-optimal.

What happens with this data is entirely up to the frontend developer.
As such, data can by anything you like. A string is common, but you
can also add arrays or objects with data or information you want to
use in your frontend.

<Tip>

All raise methods are available via [the shorthand method](/reference/api/part/shorthand)

</Tip>

## Part.raise.warning() signature

```js
raise.warning(data)
```

## Part.raise.warning() example

```js
export default function (part) {
  const { raise, measurements } = part.shorthand()

  if (measurements.hips > measurements.chest) {
    raise.warning(`
      Chest circumference is smaller than hip circumference. 
      This might lead to unexpected results
    `)
  } 

  // You would do more useful stuff before returning
  return part
}
```
