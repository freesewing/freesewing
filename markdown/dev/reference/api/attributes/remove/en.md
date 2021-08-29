---
title: remove()
---

```js
Attributes attributes.remove(string key)
```

Removes the attribute values under key and returns the Attributes object.

```js
let { Path, paths } = part.shorthand();

paths.demo = new Path()
  .attr('class', 'classA')
  .attr('class', 'classB');

let class = paths.example.attributes
  .remove()
  .get('class'); 
// class now holds: false
```
