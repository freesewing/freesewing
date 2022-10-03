---
title: Settings
---

FreeSewing is all about parametric design, and the settings are the parameters
we pass to a pattern when drafting it.  Perhaps the most important of all
settings are the measurements, but there's other settings too.

## Signature

```js
Object settings = {
  Boolean complete=true,
  Boolean embed=false,
  Boolean idPrefix='fs-',
  Object|Boolean layout=false
  String locale='en',
  Number margin=2,
  Object measurements
  Array only,
  Object options,
  Boolean paperless=false
  Boolean sa=false
  Number scale=1
  String units='metric'
}
```

## Properties

Below is a complete list of all supported properties in a settings object:

<ReadMore list />

## Notes

You can pass multiple settings objects to a pattern in an array:

```js
new pattern([
  { 
    // settings
  },
  { 
    // different settings
  },
])
```

<Fixme>Add link to multiset docs</Fixme>


