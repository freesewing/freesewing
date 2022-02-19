---
title: options
---

The `options` setting allows you to specify values for the pattern-specific
options that have been implemented by the pattern designer.

The available options are listed in the pattern configuration.
Refer to the [the options section in the pattern configuration file][1] for
all details about using options in FreeSewing.

[1]: /reference/api/config/options

```js
import Brian from "@freesewing/brian";

const pattern = new Brian({
  options: {
    chestEase: 120
  }
})
```

<Note>Unlike measurements, options come with defaults.</Note>
