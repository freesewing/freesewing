---
title: Pattern.getRenderProps()
---

The `Pattern.getRenderProps()` method will return an object that
facilitates rendering the pattern by an external renderer such as
[our Pattern React component](/fixme).
It should only be called after calling `Pattern.draft()`.

## Pattern.getRenderProps() signature

```js
Object pattern.getRenderProps()
```

## Returned object properties

The `Pattern.getRenderProps()` method returns an object with 
the following properties:

| Property | Description |
| --------:| ----------- |
| `autoLayout` | An object describing the (automated) pattern layout |
| `height` | Height of the drafted pattern in `mm` |
| `width` | Width of the drafted pattern in `mm` |
| `settings` | The (sets of) settings used to draft the pattern |
| `stacks` | A plain object holding the drafted stacks |
| `svg` | The [Svg Object](/reference/api/svg/) object with the `preRender` hook applied as [Svg.asRenderProps()](/reference/api/svg/asrenderprops) |

