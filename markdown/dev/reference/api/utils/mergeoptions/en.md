---
title: utils.mergeOptions()
---

The `utils.mergeOptions()` function merges the user-provided options with the
options from the pattern configuration.

## Signature

```js
float deg2rad(object settings, object optionsConfig)
```

## Notes

Typically the only options that are passed as part of settings to the pattern
are those that differ from the defaults.  This means that if you want to check
an option outside a draft method, you need to check whether the option is set,
and if it's not get the default value from the pattern config. Furthermore,
where the default is stored and whether or not it should be further transformed
depends on the option type.

This method exists to facilitate this. You pass it the user-provided settings,
and the pattern config options key, and it will return an object where all
options are populated with the user-provided values, or their defaults if the
user did not provide any input.

