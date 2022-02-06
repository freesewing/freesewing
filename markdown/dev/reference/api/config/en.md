---
title: Pattern configuration file
---

The pattern configuration file holds a variety of information about the
pattern, its various parts, what measurements it requires, the options it
accepts and so on.

It is part of the initial design and as such static in nature.

<Note>

This is about the pattern configuration file, used at build-time.

For run-time configuration, see [Pattern settings](/reference/api/settings).

</Note>

## Structure

The pattern configuration is a plain object with one or more of the following
properties:

<ReadMore />

## Example

Below is a minimal example. Look at [the Aaron config file][aaron] for a full example.

```js
const config = {
  version: '0.0.1',
  name: "sorcha",
  // More configuration here
}
```

[aaron]: https://github.com/freesewing/freesewing/blob/develop/packages/aaron/config/index.js
