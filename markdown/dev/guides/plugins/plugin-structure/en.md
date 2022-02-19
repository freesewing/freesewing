---
title: Plugin structure
order: 50
---

Plugins can do two things:

-   They can use hooks
-   They can provide macros

Your plugin should export an object with the following structure:

```js
{
  name: 'myPlugin',
  version: '1.0.0',
  hooks: {},
  macros: {}
};
```

The `name` and `version` attributes are self-explanatory.
The  [hooks](/guides/plugins/hooks/) and [macros](/guides/plugins/macros/) sections
explain the `hooks` and `macros` properties.
