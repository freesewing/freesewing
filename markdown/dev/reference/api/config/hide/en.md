---
title: hide
---

The `hide` key in the pattern configuration file allow you to configure
parts the should be hidden by default.
*Hidden* means that they will be drafted, but not rendered. This is
ypically used for a base part on which other parts are built.

Note that hidden parts will be rendered when the user requests 
to [only draft some parts of a pattern](/reference/api/settings/only) 
and includes the hidden part(s).


## Structure

An array with strings that hold part names.

## Example

```js
hide: [
  "base"
]
```

In the configuration above, the `base` part will be hidden by default.
