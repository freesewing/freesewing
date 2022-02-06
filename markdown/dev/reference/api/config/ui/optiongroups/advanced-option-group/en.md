---
title: The advanced option group
---

Naming an option group `advanced` will hide it by default from the user
unless they enable *expert mode*.

```js
optionGroups: {
  fit: ["chestEase", "hipsEase", "stretchFactor"],
  style: ["armholeDrop", "backlineBend"],
  advanced: [ "plutoniumCount" ]
} 
```

<Tip>

The `advanced` option group can also have nested groups

</Tip>
