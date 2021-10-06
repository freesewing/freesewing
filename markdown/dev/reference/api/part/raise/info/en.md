---
title: Part.raise.info()
---

A part's `raise.info()` method will log a ingo-level event.
Info events are typically used to pass information to users
that is informative to them.

What happens with this data is entirely up to the frontend developer.
As such, data can by anything you like. A string is common, but you
can also add arrays or objects with data or information you want to
use in your frontend.

<Tip>

All raise methods are available via [the shorthand method](/reference/api/part/shorthand)

</Tip>

## Part.raise.info() signature

```js
raise.info(data)
```

## Part.raise.info() example

```js
export default function (part) {
  const { raise, options } = part.shorthand()

  if (options.shortSleeves) { 
    raise.info('Not drafting french cuffs because you opted for short sleeves')
    return part
  }
}
```
