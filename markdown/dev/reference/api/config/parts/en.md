---
title: parts
---

The `parts` key in the pattern configuration file holds a list of
names of pattern parts.

<Tip>

###### This does not need to be an exhaustive list of all parts in your pattern.

This list of parts is needed for the `draft()` method to figure out what
parts need to be drafted.
So if parts are included in the `dependencies`, `inject`, or `hide` configuration,
there's no need to include them here, as we already know of their existence.

</Tip>

## Structure

An array of strings where the strings are part name.

## Example

```js
parts: [
  "front",
  "back"
]
```
