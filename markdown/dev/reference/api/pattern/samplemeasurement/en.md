---
title: sampleMeasurement
---

```js
Pattern pattern.sampleMeasurement(string measurement)
``` 

Samples a measurement by drafting 10 variations of the pattern 
while adapting the measurement between 90% and 110% of its original value.

The goal of measurement sampling is to understand the impact of a given measurement on a pattern.

```js
import freesewing from "@freesewing/core"
import aaron from "@freesewing/aaron"
import models from "@freesewing/models"

let pattern = new aaron({
  settings: {
    embed: true,
    measurements: models.manSize38
  }, 
})

let svg = pattern.sampleMeasurement("chestCircumference").render()
``` 

