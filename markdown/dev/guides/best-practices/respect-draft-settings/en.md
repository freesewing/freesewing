---
title: Respect draft settings
order: 40
---

Apart from the pattern options that you configure for your pattern,
all FreeSewing patterns have a set of [draft settings](/reference/api/settings) that can be tweaked
by the user.

While many of these will automatically be handled by FreeSewing, there are some
that you should take into account while developing your pattern. They are:

## Complete

The [complete](/reference/api/settings#complete) setting is a boolean that is either true or false.
Its goal is to determine whether we should draft a *complete* pattern, or merely the outline.

## Paperless

The [paperless](/reference/api/settings#paperless) setting is a boolean that is either true or false.

A *paperless* pattern is a pattern that has extra dimensions so users can trace the
paper on fabric or paper without having the need to print it.

## Seam allowance

The [sa](/reference/api/settings#sa) setting is a number that controls the seam allowance.

Unless `sa` is zero, you should add the requested seam allowance to your pattern.

<Tip>

##### Use a multiple of `sa` for your hem allowance

Resist the temptation to use an absolute value for any seam allowance, including at the hem.

Always use a multiple of the `sa` value.

</Tip>

## Example

To respect the `complete`, `paperless`, and `sa` draft settings, structure your parts as such:

```js
export default function(part) {
  let { complete, sa, paperless } = part.shorthand()
  // Your paths and points here

  if (complete) {
    // Your snippets, text, helplines and so on here
    
    if (sa) {
      // Your seam allowance here
    }

    if (paperless) {
      // Your dimensions
    }
  }

  return part
}
```
