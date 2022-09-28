---
title: units()
---

Calling `units()` in a part's draft method will format a float you pass it --
 which should represent a value in mm -- into the units requested by the user.

The returned value is to be used in presentation only, as it will be
a string that includes the user's units.

## units() example

```js
cont part = {
  name: 'examples.units',
  draft: ({ log, measurements, part }) => {
    log.info(`Pattern drafted for a ${units(measurements.chest)} chest`)

    return part
  }
}
```
