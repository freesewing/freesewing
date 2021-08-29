---
title: sampleOption()
---

```js
Pattern pattern.sampleOption(string option)
``` 

Samples an option by drafting variations of the pattern while adapting the option's value.  

The exact behavior depends on [the type of option](/config#options):

The goal of option sampling is to verify the impact of an option on the pattern, and verify that
its min and max boundaries are correct and its default value is sensible.

 - For options that are an object with a **min** and **max** property, 10 steps will be sampled, between min and max
 - For options that are a numeric value (**constants**), 10 steps will be sampled between 90% and 110% of the value
 - For options with a **list** of options, each option in the list will be sampled

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

let svg = pattern.sampleOption("necklineDrop").render()
``` 

