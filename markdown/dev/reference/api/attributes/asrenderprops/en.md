---
title: Attributes.asRenderProps()
---

The `Attributes.asRenderProps()` method will return the data stored in the
attributes as a serializable Javascript object. This method is typically
note invoked directly but rather called under the hood as a result of
calling [`Pattern.getRenderProps()`](/reference/core/pattern/getrenderprops).

## Signature

```js
Object attributes.asRenderProps()
```

## Returned object properties

This returns Javascript object has the following properties:

| Name | Description |
| ----:| ----------- |
| `list`| A plain object representation of all attributes |
| `forSvg`| All attributes rendered as a string for inclusion in an SVG (or HTML) tag |
| `forCss`| All attributes rendered as a string for inclusion in CSS |
| `circle`| An array of circles radii to render  (set as the `data-circle` attribute) |
| `circleProps`| A plain object representation of all circle-specific attributes (set as the `data-circle-*` attribute) |
| `text`| An array of texts to render  (set as the `data-text` attribute) |
| `textProps`| A plain object representation of all text-specific attributes (set as the `data-text-*` attribute) |

## Example

```js
const attr = new Attributes()
  .add('class', 'various')
  .add('stroke', 'red')
  .add('stroke-width', 2)
  .add('data-circle', 20)
  .add('data-circle-class', 'lining')
  .add('data-text', 'test')
  .add('data-text-dx', 3)

const json = JSON.stringify(
  attr.asRenderProps(), null ,2
)

/* json holds:
{
  "list": {
    "class": [
      "various"
    ],
    "stroke": [
      "red"
    ],
    "stroke-width": [
      2
    ],
    "data-circle": [
      20
    ],
    "data-circle-class": [
      "lining"
    ],
    "data-text": [
      "test"
    ],
    "data-text-dx": [
      3
    ]
  },
  "forSvg": " class=\"various\" stroke=\"red\" stroke-width=\"2\" data-circle=\"20\" data-circle-class=\"lining\" data-text=\"test\" data-text-dx=\"3\"",
  "forCss": " class:various; stroke:red; stroke-width:2; data-circle:20; data-circle-class:lining; data-text:test; data-text-dx:3;",
  "circle": [
    20
  ],
  "circleProps": {
    "className": "lining"
  },
  "text": [
    "test"
  ],
  "textProps": {
    "dx": "3"
  }
}
*/
```
