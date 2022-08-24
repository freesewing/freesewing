---
title: Hide paths from an inherited part
for: developers
about: When you inherit a part, it comes with a bunch of paths. Here'show to hide them
---

<Note>

##### See this example in our source code

- [designs/aaron/src/front.js](https://github.com/freesewing/freesewing/blob/3ca5d0edfe54c7ac20aaf3af2f3544aee72f9b99/designs/aaron/src/front.js#L22)

</Note>

The example below is from Aaron which inherits from Brian.

We iterate over the paths and set their render property to false.

```js
  // Hide Brian paths
  for (let key of Object.keys(paths)) paths[key].render = false
```
