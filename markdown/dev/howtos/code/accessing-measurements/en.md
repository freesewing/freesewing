---
title: Accessing measurements
---

Measurements are available on the `measurements` key of from the object passed
to your part's draft method. You can destructure them for easy access.

```design/src/part.mjs
function draftPart = ({ 
  // highlight-start
  measurements, 
  // highlight-end
  part 
}) {

  // Do something here 

  return part
}
```

<Note>

Keep in mind that [FreeSewing uses millimeter for everything](/guides/prerequisites/units).

</Note>
