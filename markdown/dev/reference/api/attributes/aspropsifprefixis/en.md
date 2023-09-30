---
title: Attributes.asPropsIfPrefixIs()
---

The `Attributes.asPropsIfPrefixIs()` method will return attribute values as a
props object (a plain JavaScript object) but only for those keys who start with
`prefix`.

## Signature

```js
Object attributes.asPropsIfPrefixIs(string prefix)
```

## Example

```js
const attr = new Attributes()
  .add('class', 'various')
  .add('stroke', 'red')
  .add('stroke-width', 2)

const props = attr.asPropsIfPrefixIs('stroke')
/* Props holds:
{
  stroke: 'red',
  stroke-width: 2
}
*/
```
