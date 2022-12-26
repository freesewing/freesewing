---
title: Respect draft settings
order: 40
---

Apart from the pattern options that you configure for your pattern,
all FreeSewing patterns have a set of [draft settings](/reference/settings) that can be tweaked
by the user.

While many of these will automatically be handled by FreeSewing, there are some
that you will need to take into account while developing your pattern. They are:

## Complete

The [`complete`](/reference/settings/complete) setting is a boolean that is either true or false.

Its goal is to determine whether we should draft a _complete_ pattern which
includes elements such as seam allowance lines, labels, and markings for
buttons and notches,
or if the pattern should include the part outlines only.

It is your job when developing your pattern to ensure that the pattern
checks the `complete` setting and includes or omits the appropriate elements
based on the setting's value.

## Paperless

The [`paperless`](/reference/settings/paperless) setting is a boolean that is either true or false.

A _paperless_ pattern is a pattern that has extra dimension markings so
users can trace or transfer the pattern onto fabric or paper without having
the need to print it.

It is your job when developing your pattern to ensure that the pattern
checks the `paperless` setting and includes or omits the dimensions
based on the setting's value.

## Seam allowance

The [`sa`](/reference/settings/sa) setting is a number that controls the seam allowance width.

Unless `sa` is zero, patterns are drafted with seam allowance lines included.

It is your job when developing your pattern to ensure that the pattern
checks the `sa` setting and includes or omits the seam allowance lines
based on the setting's value.

<Tip>

##### Use a multiple of `sa` for your hem allowance

Resist the temptation to use an absolute value for any seam allowance,
including at the hem.

Instead, always use a multiple of the `sa` value.
This will help to ensure that the seam allowances will scale to appropriate
values when the pattern is scaled up or down to giant or doll sizes.

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
