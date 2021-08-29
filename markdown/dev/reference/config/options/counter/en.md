---
title: counter
---

For a given number of things, use a counter.
Counters are for integers only. Things like number of buttons and so on.

Your counter option should be an object with these properties:

 - `count` : The default integer value
 - `min` : The minimal integer value that's allowed
 - `max` : The maximum integer value that's allowed

```js
options: {
  butttons: { 
    count: 7, 
    min:   4,
    max:  12 
  }
}
```
