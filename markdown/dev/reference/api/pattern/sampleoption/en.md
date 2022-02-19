---
title: Pattern.sampleOption()
---

A pattern's `sampleOption()` method will *sample* a given option,
which means to draft it in different iterations while adjusting the input value
of the given option.
The practical implementation varies based on [the type of option](/config/options/):

-   For options that are an object with a **min** and **max** property, 10 steps will be sampled, between min and max
-   For options that are a numeric value (**constants**), 10 steps will be sampled between 90% and 110% of the value
-   For options with a **list** of options, each option in the list will be sampled

<Tip>
The goal of option sampling is to verify the impact of an option on the pattern, and verify that
its min and max boundaries are correct and its default value is sensible.
</Tip>

<Note>This method is chainable as it returns the Pattern object</Note>

<Tip>

###### Anchor your samples

If you add a point named `anchor` to your pattern part, the different samples
will be anchored on this point.

In other words, for each sample, the anchor point will be kept in the same location.

</Tip>

## Pattern.sampleOption() signature

```js
Pattern pattern.sampleOption(string option)
```

## Pattern.sampleOption() example

```js
import Aaron from "@freesewing/aaron"
import models from "@freesewing/models"

const pattern = new aaron({
  measurements: models.manSize38
})

const svg = pattern.sampleOption("necklineDrop").render()
```
