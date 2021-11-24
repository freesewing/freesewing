---
title: setIfUnset()
---

```js
Attributes attributes.setIfUnset(string key, string value)
```

Sets the attribute identified by `key` to value `value` but only if it's currently unset (`undefined`).

<Tip>

This will never overwrite any value and thus is a safe way to set attributes

</Tip>

```js
let { Path, paths } = part.shorthand();

// This will render as: class="classA"
paths.demo = new Path();
paths.demo.attributes.set('class', 'classA');
paths.demo.attributes.setIfUnset('class', 'classB');
```
