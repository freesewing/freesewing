---
title: Settings
---

FreeSewing is all about parametric design, and the settings are the parameters
we pass to a pattern when drafting it.  Perhaps the most important of all
settings are the measurements, but there's other settings too.

## Signature

```js
Object settings = {
  Object absoluteOptions,
  Boolean complete=true,
  Boolean embed=false,
  String idPrefix='fs-',
  Object|Boolean layout=true,
  String locale='en',
  Number margin=2,
  Object measurements,
  String|Array|Boolean only=false,
  Object options,
  Boolean paperless=false,
  Number|Boolean sa=false,
  Object sample,
  Number scale=1,
  String stackPrefix='',
  String units='metric',
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


