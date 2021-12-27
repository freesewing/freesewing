---
title: constant
---

If your option is a scalar value (like a string or a number), it will be treated as a constant:

```js
options: {
  collarFactor: 4.8
}
```

<Tip>
Rather than define constants in your code, it's good practice to set them in your configuration file.
This way, people who extend your pattern can change them if they would like to.
</Tip>

