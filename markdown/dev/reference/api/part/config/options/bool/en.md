---
title: Boolean options
---

For options where the choice is either `true` or `false`, **on** or **off**,
or **yes** or **no**, use a boolean option.

## Structure

A boolean option is a plain object with these properties:

- `bool` : Either `true` or `false` which will be the default

<Tip>

Like all options that are configured through an object, you can 
add more properties to the options' object to implement functionality on
top of what's provided by the core library.

Refer to [extending options](/reference/api/part/config/options/extend) for
more details.

</Tip>

## Example

```js
const part = {
  name: 'example.front',
  options: {
    withLining: { 
      bool: true 
    }
  },
  draft: ({ part }) => part
}
```
