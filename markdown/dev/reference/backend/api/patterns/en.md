---
title: Patterns
---

Patterns hold information on and settings for a user's patterns.

## Endpoints

<ReadMore />

## Notes

### The `design` property should hold the design

The `design` property should hold the name of the FreeSewing design.
For example, `aaron`.

### The `notes` vs `data` properties

Both the `data` and `notes` properties can hold additional information about
the pattern.  

Keep in mind that:
- The `notes` property is intended to be used by the user to add notes about
  their pattern. It will only accept data of type `string`.
- The `data` property is intended to allow frontend developers to store
  additional data about the pattern. It will only accept data of type `object`.

### The `settings` property should hold the pattern settings

The `settings` property should hold [a settings object](/reference/settings)
that can be passed to [the Pattern
constructor](/reference/api/pattern#creating-a-pattern).
