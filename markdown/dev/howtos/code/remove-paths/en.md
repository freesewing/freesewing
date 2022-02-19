---
title: Remove paths from an inherited part
for: developers
about: When you inherit a part, it comes with a bunch of paths. Here'show to remove them
---

<Note>

##### See this example in our source code

-   [packages/carlton/src/back.js](https://github.com/freesewing/freesewing/blob/8474477911daed3c383700ab29c9565883f16d66/packages/carlton/src/back.js#L62)

</Note>

```js
  for (let i in paths) delete paths[i]
```
