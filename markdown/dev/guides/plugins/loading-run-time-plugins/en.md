---
title: Loading run-time plugins
order: 40
---

Run-time plugin are loaded at run time, by passing them to the `use` method of
an instatiated pattern. That method is chainable, so if you have multiple plugins
you can just chain them together:

```js
import Aaron from "@freesewing/aaron";
import theme from "@freesewing/plugin-theme";
import i18n from "@freesewing/plugin-i18n";

const myAaron = new Aaron()
  .use(theme)
  .use(i18n)
```

<Tip>

Plugins that use only hooks are typically run-time plugins

</Tip>
