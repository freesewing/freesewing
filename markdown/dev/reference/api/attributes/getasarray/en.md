---
title: getAsArray()
---

```js
array attributes.getAsArray(string key)
```

Will return an array with the value of attribute stored under `key`, or `false` if it's not set.

```js
let { Path, paths } = part.shorthand();

paths.demo = new Path()
  .attr('class', 'classA')
  .attr('class', 'classB');

let class = paths.demo.attributes.getAsArray('class'); 
// class now holds: ["classA", "classB"]
```
