---
title: esm
jargon: true
---

**esm** stands for **ECMAScript Modules** and is the official module system of
the JavaScript language, supported both in the browser, and on the server.

While ESM is the official standard, before it existed people would typically use CJS outside the browser, as it was popularized by NodeJS.
Some libraries still are not available in ESM, but FreeSewing has been ESM-only since version 3.


ESM uses the **import** keyword to import modules:

```js
import fs from 'fs'
```

