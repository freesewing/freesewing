---
title: layout
---

An object that holds rendered SVG for all parts, and a list of their transforms.
It is structured as follows:

```js
{
  back: {
    svg: "( Holds rendered SVG for this part )",
    transforms: [ "translate(2, 2)" ]
  },
  // Other parts follow
}
```
