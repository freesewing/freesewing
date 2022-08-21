---
title: Remove paths from an inherited part
for: developers
about: When you inherit a part, it comes with a bunch of paths. Here'show to remove them
---

<Note>

##### See this example in our source code

- [designs/carlton/src/back.js](https://github.com/freesewing/freesewing/blob/3ca5d0edfe54c7ac20aaf3af2f3544aee72f9b99/designs/carlton/src/back.js#L62)

</Note>

```js
  for (let i in paths) {
    if (['backArmhole', 'backCollar'].indexOf(i) === -1) delete paths[i]
  }
```
