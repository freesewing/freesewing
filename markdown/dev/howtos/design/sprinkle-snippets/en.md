---
title: Add several of the same snippets with the sprinkle macro
for: developers
about: Adding multiple snippets doesn't need to be a chore with this handy macro
---

<Note>

##### See this example in our source code

-   [packages/jaeger/src/front.js](https://github.com/freesewing/freesewing/blob/8474477911daed3c383700ab29c9565883f16d66/packages/jaeger/src/front.js#L381)

</Note>

Adding multiple snippets at the same time results in a lot of repetitive code.

Better to use the `sprinkle` macro instead:

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

Refer to [the sprinkle macro documentation](/reference/macros/sprinkle/) for details on how
to use this macro

</Tip>
