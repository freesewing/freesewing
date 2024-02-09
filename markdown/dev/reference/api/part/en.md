---
title: Part
---

A `Part` in FreeSewing holds all data, logic, and configuration of a Design.
Parts truly are the building blocks of FreeSewing as they not only provide
the configuration, but also a `draft()` method that does the actual work
of drafting a parametric design.

## Properties

A Part object comes with the following properties:

- `attributes` : An [Attributes](/reference/api/attributes) instance holding
  the part's attributes
- `hidden` : When this is `true` the part will be hidden (excluded it from the
  output).  See [Part.hide()](/reference/api/part/hide),
  [Part.unhide()](/reference/api/part/unhide), and
  [Part.setHidden()](/reference/api/part/sethidden) for various methods that
  allow setting this in a chainable way.
- `name` : The name of the part
- `paths` : Holds the paths used in the part
- `points` : Holds the points used in the part
- `snippets` : Holds the snippets used in the part

<Related>
See [Using Attributes](/howtos/code/attributes)
for information about custom Attributes that can be used with Parts.
</Related>

## Example

```js
const part = {
  name: 'example.part',
  from: otherPart,
  after: [ yetAnotherPart, oneMorePart ],
  measurements: ['head', 'chest' ],
  optionalMeasurements: ['neck'],
  options: {
    headEase: { pct: 12, min: 5, max: 20 }
  }
  hide: false,
  hideAll: false,
  hideDependencies: true,
  plugins: [ 
    plugin1, 
    plugin1, 
    [ plugin3, dataForPlugin3 ],
  ],
  draft: ({ part }) => part
}
```

## Methods

A Part object exposes the following methods:

- [Part.asRenderProps()](/reference/api/part/asrenderprops)
- [Part.attr()](/reference/api/part/attr)
- [Part.getId()](/reference/api/part/getid)
- [Part.hide()](/reference/api/part/hide)
- [Part.setHidden()](/reference/api/part/sethidden)
- [Part.shorthand()](/reference/api/part/shorthand)
- [Part.unhide()](/reference/api/part/unhide)
- [Part.units()](/reference/api/part/units)

## More information

Click below to learn more about:

- [A part's configuration](/reference/api/part/config)
- [A part's `draft()` method](/reference/api/part/draft)
