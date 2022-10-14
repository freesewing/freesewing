---
title: Add several of the same snippets with the sprinkle macro
---

Adding multiple snippets at the same time results in a lot of repetitive code.
It is better to use the `sprinkle` macro instead:

```js
macro('sprinkle', {
  snippet: 'notch',
  on: [
    'neck',
    'shoulder',
    'armholePitch',
    'chestPocketBottomLeft',
    'chestPocketBottomRight',
    'lapelBreakPoint',
    'notchMax',
    'notch',
    'innerPocketLeft',
    'innerPocketRight',
    'frontPocketTopLeft',
    'frontPocketBottomLeft',
    'armholeHollow',
    'waist'
  ]
})
```

<Tip>

Refer to [the sprinkle macro documentation](/reference/macros/sprinkle) for details on how
to use this macro

</Tip>
