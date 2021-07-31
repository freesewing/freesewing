---
title: needs()
---

```js
bool pattern.needs(string partName)
``` 

Returns `true` or `false` depending on whether a pattern part is *needed*, based 
on the value of [pattern.settings.only](/reference/settings/only/) and the 
part dependencies listed in the configuration file.

A part is needed if:

 - it is requested by the user in the `only` setting
 - it is a dependency of a part requested by the user in the `only` setting
 - the `only` setting is not set or is `false`, and the part is not hidden

<Note>

You don't typically use this method. Instead, configure part
dependencies in your [configuration file](/reference/config/).

</Note>

