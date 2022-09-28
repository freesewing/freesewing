---
title: Part
order: 15
---

A `Part` in FreeSewing holds all data, logic, and configuration of a Design.
Parts truly are the building blocks of FreeSewing as they not only provide
the configurarion, but also a `draft()` method that does the actual work
of drafting a parametric design.

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
  ]
}
```

Click below to learn more about:

- [A part's configuration](/reference/api/part/config)
- [A part's `draft()` method](/reference/api/part/draft)
