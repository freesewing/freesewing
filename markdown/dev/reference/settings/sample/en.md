---
title: sample
---

The `sample` setting holds an object that is used by pass information
to the [`Pattern.sample()`][1] method.
[1]: /reference/api/pattern/sample


## Signature

```js
const settings = {
  Object sample = {}
}
```

## Example

```js
import { Aaron } from "@freesewing/aaron"

const pattern = new Aaron({
  settings = {
    Object sample = {
      type: 'option',
      option: 'headEase',
    }
  }
})
```

## Notes

The `sample` setting object can hold the following properties:

- __type__: One of `option`, `measurement`, or `models`
- __option__: An option name as defined in the pattern config file (only used when `type` is option).
- __measurement__: A measurement name as defined in the pattern config file (only used when `type` is measurement).
- __models__: A plain object of different models where the key is the model name and the value an object with the required measurements.

<Related>

Please see the [`Pattern.sample()`][1] documentation for more information
about pattern sampling.

</Related>
