---
title: optionGroups
---

Organises your pattern options in groups. 
It expects an object where the key is the group title, and the value an array of options:

```js
optionGroups: {
  fit: ["chestEase", "hipsEase", "stretchFactor"],
  style: [
    "armholeDrop",
    "backlineBend",
    "necklineBend",
    "necklineDrop",
    "shoulderStrapWidth",
    "shoulderStrapPlacement",
    "lengthBonus"
  ]
} 
```

<Note>

Options that are not included in the `optionGroup` configuration won't be
exposed in the frontend and thus will be unavailable to the user.

</Note>

