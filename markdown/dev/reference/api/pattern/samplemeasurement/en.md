---
title: Pattern.sampleMeasurement()
---

A pattern's `sampleMeasurement()` method will *sample* a given measurement,
which means to draft it in different iterations while adjusting the input value
of the given measurement.
In practice, it will draft 10 iterations of the pattern
while adapting the measurement between 90% and 110% of its original value.

<Tip>
The goal of measurement sampling is to understand the impact of a given measurement on a pattern.
</Tip>

<Note>This method is chainable as it returns the Pattern object</Note>

<Tip>
The goal of option sampling is to verify the impact of an option on the pattern, and verify that
its min and max boundaries are correct and its default value is sensible.
</Tip>

## Pattern.sampleMeasurement() signature

```js
Pattern pattern.sampleMeasurement(string measurement)
```

## Pattern.sampleMeasurement() example

```js
import Aaron from "@freesewing/aaron"
import models from "@freesewing/models"

const pattern = new Aaron({ measurements: models.manSize38 })

const svg = pattern.sampleMeasurement("chest").render()
```
