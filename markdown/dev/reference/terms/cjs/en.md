---
title: cjs
jargon: true
---

**cjs** stands for **CommonJS**. It is a module system for JavaScript that was
popularized by NodeJS, and as such typically used in server-side JavaScript.

CommonJS uses the **require** keyword to import modules:

```js
const fs = require('fs')
```

In recent years, **cjs** is increasingly being replaced by **esm**, or ECMA
Script Modules which is the official module system of the JavaScript language,
and the future-proof choice.

Since version 3, FreeSewing is ESM-only.
