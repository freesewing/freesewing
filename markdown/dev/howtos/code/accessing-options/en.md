---
title: Accessing options
---

(the value of) Options are available on the `options` key of from the object
passed to your part's draft method. You can destructure them for easy access.

```design/src/part.mjs
function draftPart = ({ 
  // highlight-start
  options, 
  // highlight-end
  part 
}) {

  // Do something here 

  return part
}
```

<Note>

Unlike measurements, options come with default values.

</Note>
