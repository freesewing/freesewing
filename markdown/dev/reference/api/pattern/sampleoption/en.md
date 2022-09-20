---
title: Pattern.sampleOption()
---

The `Pattern.sampleOption()` method will _sample_ the pattern which means
to draft multiple variants of the same pattern, and stack them on
top of each other.

In this particular case, the variants it drafts depend
 on [the type of option](/config/options/):

- For options that are an object with a **min** and **max** property, 10 steps will be sampled, between min and max
- For options that are a numeric value (**constants**), 10 steps will be sampled between 90% and 110% of the value
- For options with a **list** of options, each option in the list will be sampled

<Fixme>Handle other option types</Fixme>

<Tip>
The goal of option sampling is to verify the impact of an option on the pattern, and verify that
its min and max boundaries are correct and its default value is sensible.
</Tip>

<Note>This method is chainable as it returns the Pattern object</Note>

## Pattern.sampleOption() signature

```js
Pattern pattern.sampleOption(string option)
```

## Pattern.sampleOption() example

```js
import { Aaron } from "@freesewing/aaron"
import { cisFemaleAdult34 } from "@freesewing/models"

const pattern = new Aaron({
  measurements: cisFemaleAdult34
})

const svg = pattern.draft().sampleMeasurement('chest')
```
