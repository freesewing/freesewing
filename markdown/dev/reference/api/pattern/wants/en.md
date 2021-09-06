---
title: wants()
---

```js
bool pattern.wants(string partName)
``` 

Returns `true` or `false` depending on whether a pattern part is *wanted*, based 
on the value of [pattern.settings.only](/settings#only).

A part is wanted if:

 - it is requested by the user in the `only` setting
 - the `only` setting is not set or is `false`, and the part is not hidden

> You don't typically use this method. Instead, configure part
> dependencies in your [configuration file](/config).

