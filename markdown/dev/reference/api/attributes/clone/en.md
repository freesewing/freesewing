---
title: clone()
---

```js
Attributes attributes.clone()
```

Returns a new Attributes object that is a deep copy of this one.

```js
let { Path, paths } = part.shorthand();

paths.demo = new Path()
  .attr('class', 'classA')
  .attr('class', 'classB');

paths.clone = paths.demo.clone()
```
