---
title: Pattern.sample()
---

A pattern's `sample()` method will *sample* the pattern which means
to draft it in different iterations while adjusting the input settings.
Under the hood, this method will call one of
[Pattern.sampleOption()](/reference/apu/pattern/sampleoption),
[Pattern.sampleMeasurement()](/reference/apu/pattern/sampleoption), or
[Pattern.sampleModels()](/reference/apu/pattern/sampleoption) to sample
an option, a measurement, or a set of measurements respectively.

Unlike those three methods where you pass the relevant info to to the method,
this `Pattern.sample()` will instead read the `pattern.settings.sample`
object to determine what to do.

The possiblities are:

-   **type**: One of `option`, `measurement`, or `models`
-   **option**: An option name as defined in the pattern config file (only used when `type` is option).
-   **measurement**: A measurement name as defined in the pattern config file (only used when `type` is measurement).
-   **models**: An array of models with the required measurements for this pattern (only used when `type` is models).

See the specific sample methods below for more details:

-   [Pattern.sampleOption()](/reference/apu/pattern/sampleoption)
-   [Pattern.sampleMeasurement()](/reference/apu/pattern/sampleoption)
-   [Pattern.sampleModels()](/reference/apu/pattern/sampleoption)

From a lifecycle point of view, the `Pattern.sample()` method is a substitute for
`Pattern.draft()`. So you call it after instantiating the pattern, prior to
calling `Pattern.render()`.

<Tip>

###### Anchor your samples

If you add a point named `anchor` to your pattern part, the different samples
will be anchored on this point.

In other words, for each sample, the anchor point will be kept in the same location.

</Tip>

<Note>This method is chainable as it returns the Pattern object</Note>

<Warning>

##### FreeSewing v3 breaking changes

This method does some juggling under the hood, essentially cramming
different versions of a pattern into a single Pattern object.

This behavior is likely to change in FreeSewing v3. Refer to [the
roadmap](https://github.com/freesewing/freesewing/discussions/1278) for details.

</Warning>

## Pattern.sample() signature

```js
Pattern pattern.sample()
```

## Pattern.sample() example

```js
import Aaron from "@freesewing/aaron"
import models from "@freesewing/models"

const pattern = new Aaron({
  settings: {
    embed: true,
  },
  measurements: models.manSize38
})

const svg = pattern.sample().render()
```
