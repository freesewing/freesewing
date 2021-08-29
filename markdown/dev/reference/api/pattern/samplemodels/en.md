---
title: sampleModels()
---

```js
Pattern pattern.sampleModels(object models, string focus)
``` 

Samples a pattern for a number of models you pass to it.

The goal of model sampling is to verify that a pattern grades correctly up and down as sizes change.

```js
import freesewing from "@freesewing/core"
import Aaron from "@freesewing/aaron"
import models from "@freesewing/models"

let aaron = new Aaron({
  settings: {
    embed: true,
    measurements: models.manSize38
  }, 
})

let svg = aaron.sampleModels(models, "manSize38").render()
``` 

<Tip>

###### Model focus: Making a comparison

When sampling models, you can put the *focus* on one of the models, thereby making it 
easier to see a comparison between a given set of measrurements, and the rest.

To do so, pass a second parameter to the `sampleModels()` method. This should be
the key of the model in the models object for that model you want the focus to be on.

Alternatively, you can use the `sample()` method and set `settings.sample.focus` to the key
identifying your model in the models object.

</Tip>

