--- 
title: sa
---

The `sa` setting controls the seam allowance. It expects a value in mm
or `false` or `0` to disable seam allowance altogether.

```js
import Brian from "@freesewing/brian";

const pattern = new Brian({
  sa: 10
})
```

<Note>

This is ignored if [settings.complete](#complete) is `false`

<Comment by="joost">
Is it though?
I suspect this is not clearly enforced and we should clarify that.
</Comment>

</Note>
