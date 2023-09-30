---
title: Attributes.render()
---

The `Attributes.render()` method will render attributes as a string suitable
for inclusion in an SVG tag.

## Signature

```js
string attributes.render()
```

## Example

```js
const attr = new Attributes()
  .set('id', 'example')
  .add('class', 'classA')
  .add('class', 'classb')

const paragraph = `<p ${attr.render()}>Hello</p>`
```
