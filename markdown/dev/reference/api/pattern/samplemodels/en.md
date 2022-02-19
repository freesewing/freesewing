---
title: Pattern.sampleModels()
---

A pattern's `sampleModels()` method will *sample* a pattern for a list of
models you pass to it. It will draft different iterations of the pattern,
using the measurements for each model you pass to it.

<Tip>
The goal of model sampling is to verify that a pattern grades correctly up and down as sizes change.
</Tip>

<Note>This method is chainable as it returns the Pattern object</Note>

<Tip>

###### Anchor your samples

If you add a point named `anchor` to your pattern part, the different samples
will be anchored on this point.

In other words, for each sample, the anchor point will be kept in the same location.

</Tip>

## Pattern.sampleModels() signature

```js
Pattern pattern.sampleModels(object models, string focus)
```

The models object you pass as the first parameter should be structured as such:

```js
{
 modelName1: {
   measurement1: valueInMm,
   measurement2: valueInMm,
   // ...
 },
 modelName2: {
   measurement1: valueInMm,
   measurement2: valueInMm,
   // ...
 },
 // ...
}
```

The (optional) string you can pass as the second parameter should hold the
key of one of the models in the first parameter. In our example above, it
could hold `modelName2` for example.

By passing this second parameter, you can put the *focus* on one of the models,
which will influence the render style, and make it
easier to see a comparison between a given set of measrurements, and the rest.

Alternatively, you can use the `Pattern.sample()` method and set `settings.sample.focus` to the key
identifying your model in the models object.

## Pattern.sampleModels() example

```js
import Aaron from "@freesewing/aaron"
import models from "@freesewing/models"

const Aaron = new Aaron()

const svg = aaron.sampleModels(models, "manSize38").render()
```
