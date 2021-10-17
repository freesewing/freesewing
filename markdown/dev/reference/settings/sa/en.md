--- 
title: sa
---

The seam allowance in mm.

Not setting this, setting it to `false`, or to zero, will draft a pattern without seam allowance.


```js
import brian from "@freesewing/brian";

let pattern = new brian({
  sa: 10
})
```

<Note>

This is ignored if [settings.complete](#complete) is `false`

</Note>
