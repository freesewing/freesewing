---
title: get()
---

```js
string attributes.get(string key)
```

Will return the value of attribute stored under `key`, or `false` if it's not set.

If key has multiple values, they will be joined together in a string, seperated by spaces.

```js
let { Path, paths } = part.shorthand();

paths.demo = new Path()
  .attr('class', 'classA')
  .attr('class', 'classB');

let class = paths.demo.attributes.get('class'); 
// class now holds: "classA classB"
```
