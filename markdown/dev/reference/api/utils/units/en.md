---
title: units()
---

```js
string utils.units(float value, string format = 'metric')
```

Converts the units `value` you pass it into a formatted string for the `format` you pass it.

Format must be either `imperial` or `metric` (the default).

<Tip>

The [Part.shorthand](/reference/api/part/shorthand/) call provides a context-aware
`unit()` method that will call this method and pass it the units requested by the user.

</Tip>
