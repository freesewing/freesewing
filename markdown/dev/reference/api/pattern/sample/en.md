---
title: Pattern.sample()
---

The `Pattern.sample()` method will _sample_ the pattern which means
to draft multiple variants of the same pattern, and stack them on
top of each other.

<Note>This method is chainable as it returns the Pattern object</Note>

Under the hood, this method will call one of
[Pattern.sampleOption()](/reference/api/pattern/sampleoption),
[Pattern.sampleMeasurement()](/reference/api/pattern/samplemeasurement), or
[Pattern.sampleModels()](/reference/api/pattern/samplemodels) to sample
an option, a measurement, or different models respectively.

Unlike those three methods where you pass the relevant info to to the method,
this `Pattern.sample()` method will instead read the
[`settings.sample`](/reference/settings/sample)
object to determine what needs to be done.

See the specific sample methods below for more details:

- [Pattern.sampleOption()](/reference/api/pattern/sampleoption)
- [Pattern.sampleMeasurement()](/reference/api/pattern/samplemeasurement)
- [Pattern.sampleModels()](/reference/api/pattern/samplemodels)

## Pattern.sample() signature

```js
Pattern pattern.sample()
```

## Pattern.sample() example

```js
import { Aaron } from "@freesewing/aaron"
import { cisFemaleAdult } from "@freesewing/models"

const pattern = new Aaron({
  sample: {
    models: cisFemaleAdult
  }
})

const svg = pattern.sample().render()
```
