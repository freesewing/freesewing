---
title: expand
---

The `expand` setting controls whether all parts should be fully
drawn in a pattern.
Set `expand` to `false` when the pattern should instead omit parts and/or
draw abbreviated parts.

Omitting parts and using abbreviated parts saves space and paper
in printed patterns.
Typically, this is done for parts that are simple shapes like
rectangles or that can be cut on the fold.

## Signature

```js
const settings = {
  Boolean expand=true
}
```

The default `expand` setting is `true`.
Set this to `false` to draft a pattern with omitted or abbreviated parts,
rather than with fully-drawn parts.

## Example
```js
import { Aaron } from "@freesewing/aaron"

const pattern = new Aaron({
  expand: false
})
```

## Notes

The `expand` setting does not automatically cause pattern parts to
be omitted or abbreviated.
Instead, it is up to the pattern designer to have the design
check for the `expand` setting,
include all, full parts if set to `true`,
and omit or abbreviate relevant parts if set to `false`.
