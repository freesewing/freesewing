---
title: Part.raise.debug()
---

A part's `raise.debug()` method will log a debug-level event.
Debug events are typically used to pass information to pattern developers
so that can troubleshoot issues with the pattern.

What happens with this data is entirely up to the frontend developer.
As such, data can by anything you like. A string is common, but you
can also add arrays or objects with data or information you want to
use in your frontend.

<Tip>

All raise methods are available via [the shorthand method](/reference/api/part/shorthand)

</Tip>

## Part.raise.debug() signature

```js
raise.debug(data)
```

## Part.raise.debug() example

```js
export default function (part) {
  const { raise } = part.shorthand()

  raise.debug('Entered the draft method of partmyPart')
  
  // You would do more useful stuff before returning
  return part
}
```
