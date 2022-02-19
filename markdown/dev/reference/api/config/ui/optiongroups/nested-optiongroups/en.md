---
title: Nested option groups
---

You can create sub-groups within an option group:

```js
optionGroups: {
  style: [
    'hemStyle',
    'hemCurve',
    {
      closure: [
        'extraTopButton',
        'buttons',
        'buttonFreeLength'
      ]
    },
  ]
}
```

<Warning>
Only create subgroups one level deep. 
We do not support groups in groups in groups.
</Warning>
