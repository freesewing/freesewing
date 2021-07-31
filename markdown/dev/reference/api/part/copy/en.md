---
title: copy()
---

```js
Part part.copy(Part original)
```

This will copy the points, paths, and snippets from a part you pass into it.

<Note>

This method is used internally, you are unlikely to need this.

If you want one part to build on another, you should set 
up [part inheritance](/advanced/inject)  in your pattern's [configuration](../config) file.

</Note>

