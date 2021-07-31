---
title: set()
---

```js
Attributes attributes.set(string key, string value)
```

Sets the attribute identified by `key` to value `value`.

<Warning>

This will overwrite any value that's currently set on the attribute identified by `key`.

</Warning>

```js
let { Path, paths } = part.shorthand();

// This will render as: class="classB"
paths.demo = new Path();
paths.demo.attributes.set('class', 'classA');
paths.demo.attributes.set('class', 'classB');

// This does the same thing:
paths.demo = new Path()
  .attr('class', 'classA', true)
  .attr('class', 'classB', true);
```
