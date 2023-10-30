---
title: Pattern.sampleOption()
---

The `Pattern.sampleOption()` method will _sample_ the pattern which means
to draft multiple variants of the same pattern, and stack them on
top of each other.

In this particular case, the variants it drafts depend
 on [the type of option](/reference/api/part/config/options/):

- For a Percentage or Degree option, 10 steps will be sampled, between min and max
- For a Counter or Millimeter option, a maximum of 10 steps will be sampled, between min and max
- For a Constant numeric option, 10 steps will be sampled between 90% and 110% of the value
- For a List option, each option in the list will be sampled
- For a Boolean option, both `false` and `true` will be sampled

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

// Load some public test measurements from the FreeSewing backend
const measurements = (
  await (
    await fetch("https://backend3.freesewing.org/curated-sets/1.json")
  ).json()
).measurements

const pattern = new Aaron({ measurements })

const svg = pattern.draft().sampleOption('backlineBend')
```
