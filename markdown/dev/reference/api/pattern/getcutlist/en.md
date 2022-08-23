---
title: Pattern.getCutList()
---

This method will return the cut list, which means the `cut` property of
all parts that were included in the most recent call to `Pattern.draft()`.

This relies on the pattern designers properly setting the cut property
in each part.

<Note>This method is chainable as it returns the Pattern object</Note>

## Pattern.getCutList() signature

```js
Object pattern.getCutList()
```

## Pattern.getCutList() example

```js
import Aaron from "@freesewing/aaron"
import models from "@freesewing/models"

const pattern = new Aaron({
  settings: {
    embed: true,
  },
  measurements: models.manSize38
})

const cutList = pattern.draft().getCutList()
```
## Cut list format

The object returned by `Pattern.getCutList()` is a plain object
with a property for each part that will be included in the pattern's output.

The value of these properties is the `cut` property of the part in question.

<Tip>
Refer to [part.addCut()](/reference/api/part/addcut) for details on the 
format of a part's `cut` property
</Tip>



