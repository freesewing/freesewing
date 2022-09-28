---
title: Pattern.sample()
---

The `Pattern.sample()` method will _sample_ the pattern which means
to draft multiple variants of the same pattern, and stack them on
top of each other.

<Note>This method is chainable as it returns the Pattern object</Note>

Under the hood, this method will call one of
[Pattern.sampleOption()](/reference/apu/pattern/sampleoption),
[Pattern.sampleMeasurement()](/reference/apu/pattern/sampleoption), or
[Pattern.sampleModels()](/reference/apu/pattern/sampleoption) to sample
an option, a measurement, or different models respectively.

Unlike those three methods where you pass the relevant info to to the method,
this `Pattern.sample()` method will instead read the `settings.sample`
object to determine what needs to be done.

The `settings.sample` object can hold the following properties:

- **type**: One of `option`, `measurement`, or `models`
- **option**: An option name as defined in the pattern config file (only used when `type` is option).
- **measurement**: A measurement name as defined in the pattern config file (only used when `type` is measurement).
- **models**: A plain object of different models where the key is the model name and the value an object with the required measurements.

See the specific sample methods below for more details:

- [Pattern.sampleOption()](/reference/apu/pattern/sampleoption)
- [Pattern.sampleMeasurement()](/reference/apu/pattern/sampleoption)
- [Pattern.sampleModels()](/reference/apu/pattern/sampleoption)

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
