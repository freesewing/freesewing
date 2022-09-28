---
title: Counter options
---

For a given number of things, use a counter option.
Counters are for integers only. Things like number of buttons and so on.

## Structure

Your counter option should be a plain object with these properties:

- `count` : The default integer value
- `min` : The minimal integer value that's allowed
- `max` : The maximum integer value that's allowed

<Tip>

Like all options that are configured through an object, you can 
add more properties to the options' object to implement functionality on
top of what's provided by the core library.

Refer to [extending options](/reference/api/part/config/options/extend) for
more details.

</Tip>

## Example

```js
options: {
  butttons: { 
    count: 7, 
    min:   4,
    max:  12 
  }
}
```
