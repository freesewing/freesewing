---
title: Measurements Sets
---

A measurements set holds information and measurements on the people we generate patterns
for.

## Endpoints

<ReadMore />

## Notes

### The `imperial` property is a Boolean

- If the `imperial` property is `false`, the measurements set uses metric units.
- If the `imperial` property is `true`, the measurements set uses imperial units.

### The `measies` property holds measurements

These measurments should be structured as an object that can be used for the
`measurements` key in the [pattern settings
object](/reference/settings/measurements).

The backend will only accept known measurements listed in the configuration file.

<Comment by="joost">
##### Why we use measies instead of measurements
First of all, _measies_ is a cute and adorable alternative for _measurements_
coined by Karen. She deserves all the credit.

But also, I am slightly dyslexic and for some reason, I often drop the middle
_e_ when typing measurements' (sic).

Those typos lead to bugs and I find it much easier to write _measies_.   
So because fewer bugs, plus did I mention it's cute?

</Comment>

### The `settings` property should hold the pattern settings

The `settings` property should hold [a settings object](/reference/settings)
that can be passed to [the Pattern
constructor](/reference/api/pattern#creating-a-pattern).
