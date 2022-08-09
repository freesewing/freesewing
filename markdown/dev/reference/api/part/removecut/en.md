---
title: Part.removeCut()
---

A part's `removeCut()` method allows designers to remove cutting information
that was added through [Part.addCut()](/reference/api/part/addcut).

## Part.addCut() signature when adding cut information

```js
Part.part.addCut(cut=2, material='fabric', identical=false)
```

In this form, this methiod takes three parameters:

| Parameter | type | description | default |
| --------- | ---- | ----------- | ------- |
| `cut` | integer | The amount of times this part should be cut. | `2` |
| `material` | string | The name of the material, typically one of `fabric`, `lining`, `facing`, `interfacing`, `canvas`, or `various` | `fabric` |
| `identical` | boolean | Whether or not parts should be cut identical (true) or mirrored (false). Mirorred is often referred to as _good sides together_ | `false` |

## Part.addCut() signature when removing cut information

```js
Part.part.addCut(false, material='fabric')
```

In this form, this methiod takes two parameters:

| Parameter | type | description | default |
| --------- | ---- | ----------- | ------- |
| `cut` | `boolean` | Pass `false` to remove the cut info for the material passed as the second parameter | `2` |
| `material` | string | The name of the material, typically one of `fabric`, `lining`, `facing`, `interfacing`, `canvas`, or `various` | `fabric` |

## Part.addCut() example

```js
export default function (part) {

  // Cut two from fabric with good sides together
  part.addCut(2, 'fabric')  

  // Cut seven from lining, identical
  part.addCut(7, 'lining')  

  // Remove the lining cut info (but keep the fabric info)
  part.addCut(false, 'lining')  

  // You would do more useful stuff before returning
  return part
}
```

<Tip>
The part's grain line and whether it should be cut on fold or not will be 
set automatically when you call the [grainline](/reference/api/macros/grainline) or
[cutonfold](/reference/api/macros/cutonfold) macro.
</Tip>
