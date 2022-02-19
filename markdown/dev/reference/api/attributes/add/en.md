---
title: add()
---

```js
Attributes attributes.add(string key, string value)
```

Adds `value` to the attribute identified by `key`.

Adding multiple values to the same key will result in them being joined together
(with a space) when rendering.

```js
let { Path, paths } = part.shorthand();

// This will render as: class="classA classB"
paths.demo = new Path();
paths.demo.attributes.add('class', 'classA');
paths.demo.attributes.add('class', 'classB');

// This does the same thing:
paths.demo = new Path()
  .attr('class', 'classA')
  .attr('class', 'classB');

// This also has the same result:
paths.demo = new Path()
  .attr('class', 'classA classB');
```
