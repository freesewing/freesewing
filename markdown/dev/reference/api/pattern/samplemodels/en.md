---
title: Pattern.sampleModels()
---

The `Pattern.sampleModels()` method will _sample_ the pattern which means
to draft multiple variants of the same pattern, and stack them on
top of each other.

In this particular case, it will draft a variants for each of the models you pass it.

<Tip>
The goal of model sampling is to verify that a pattern grades correctly up and down as sizes change.
</Tip>

<Note>This method is chainable as it returns the Pattern object</Note>

## Pattern.sampleModels() signature

```js
Pattern pattern.sampleModels(object models, string focus)
```

The `models` object you pass as the first parameter should be structured as such:

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

By passing this second parameter, you can put the _focus_ on one of the models,
which will influence the render style, and make it
easier to see a comparison between a given set of measrurements, and the rest.

Alternatively, you can use the `Pattern.sample()` method and set `settings.sample.focus` to the key
identifying your model in the models object.

## Pattern.sampleModels() example

```js
import { Aaron } from "@freesewing/aaron"
import { cisFemaleAdult } from "@freesewing/models"

const Aaron = new Aaron()

const svg = aaron.sampleModels(cisFemaleAdult, "34').render()
```
