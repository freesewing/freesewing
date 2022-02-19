---
title: Pattern.getRenderProps()
---

A pattern's `getRenderProps()` method will return a set of properties
that allow the pattern to be rendered be an external renderer such as
a React component. It should only be called after calling `Pattern.draft()`.

## Pattern.getRenderProps() signature

```js
Object pattern.getRenderProps()
```

The object returned by this method contains the following properties:

| Property | Description |
| --------:| ----------- |
| `svg` | An [Svg Object](/reference/api/svg/) object with the `preRender` hook applied |
| `width` | Widht of the drafted pattern in `mm` |
| `height` | Height of the drafted pattern in `mm` |
| `settings` | The settings used to draft the pattern |
| `events` | An object with properties `debug`, `info`, `warning`, and `error` holding events of that type that were generated during the draft of the pattern |
| `parts` | A plain object holding the drafted parts |

<Tip>

See [the Draft React component](/reference/packages/components/draft/) for more info.

</Tip>

## Pattern.getRenderProps() example

```jsx
import React from 'react
import Aaron from "@freesewing/aaron"
import Draft from "@freesewing/components/Draft"

const MyReactComponent = ({ measurements }) => {
  const pattern = new Aaron({ measurements })

  return <Draft {...pattern.draft().getRenderProps()} />
}

export default MyReactComponent
```
