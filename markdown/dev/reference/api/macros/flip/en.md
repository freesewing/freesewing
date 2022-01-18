---
title: flip
---

The `flip` macro flips (mirrors) an entire part vertically around either the X-axis or the Y-axis.  
It is provided by the [flip plugin](/reference/plugins/flip).

```js
macro("flip", { 
  axis: 'x' 
})
```

| Property        | Default | Type                | Description | 
|----------------:|---------|---------------------|-------------|
| `axis`          | 'x'     | The axis to flip around. Either `x` or `y` |

<Note>

Under the hood, this macro will:

 - Go through all Points in your Part, and multiply their (X or Y)-coordinate by -1
 - Go through all the Paths in your Part, and for each drawing operation will multiply the (X or Y)-coordinare by -1
 - Go through all the Snippets in your Part and multiply the (X or Y)-coordinate of the anchor point by -1

</Note>
