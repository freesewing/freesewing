--- 
title: options
---

The `options` setting allows you to specify the pattern-specific options
that have been implemented by the pattern designer.

The available options are listed in the pattern configuration.

```js
import Brian from "@freesewing/brian";

const pattern = new Brian({
  options: {
    chestEase: 120
  }
})
```

<Note>Unlike measurements, options come with defaults.</Note>

