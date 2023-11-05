---
title: Pattern.sampleMeasurement()
---

The `Pattern.sampleMeasurement()` method will _sample_ the pattern which means
to draft multiple variants of the same pattern, and stack them on
top of each other.

In this particular case, it will draft 10 variants of the pattern that vary
the measurement of your choice between 90% and 110% if the value in the settings.

<Tip>
The goal of measurement sampling is to understand the impact of a given measurement on a pattern.
</Tip>

<Note>This method is chainable as it returns the Pattern object</Note>

## Pattern.sampleMeasurement() signature

```js
Pattern pattern.sampleMeasurement(string measurement)
```

## Pattern.sampleMeasurement() example

```js
import { Aaron } from "@freesewing/aaron"

// Load some public test measurements from the FreeSewing backend
const measurements = (
  await (
    await fetch("https://backend3.freesewing.org/curated-sets/1.json")
  ).json()
).measurements

const pattern = new Aaron({ measurements })

const svg = pattern.draft().sampleMeasurement('chest')
```
