---
title: Saving space (and trees) with exand
order: 40
---

There is one more way we like to save space (and trees): The `expand` setting.

The `expand` setting (which is true by default) indicates that user wants pattern
parts to be fully expanded.

It's common to reduce the amount of space required by reducing simple shapes like
rectangles to a description or cut things on the fold.

The `exand` setting gives the user control over this, at least insofar the designer
supports it. It's not relevant to our bib, but it's good to know it's there.

Here is an example snippets from [Aaron's arm binding](https://github.com/freesewing/freesewing/blob/develop/designs/aaron/src/arm-binding.mjs#L24):

```mjs
const w = store.get('bindingWidth')
const l = store.get('armBindingLength')

if (expand) {
  store.flag.preset('expandIsOn')
} else {
  // Expand is off, do not draw the part but flag this to the user
  store.flag.note({
    msg: `aaron:cutArmBinding`,
    replace: {
      width: units(w),
      length: units(l),
    },
    suggest: {
      text: 'flag:show',
      icon: 'expand',
      update: {
        settings: ['expand', 1],
      },
    },
  })
  // Also hint about expand
  store.flag.preset('expand')

  return part.hide()
}
```

There's some stuff going on here that we'll learn next, but essentially if
`expand` is falsy, the part will hide itself with `part.hide()` and so it won't
be included on the pattern.

However, to avoid misunderstandings we want to inform the user about this.
That's what all those `store.flag` lines are about. We'll learn about then next.
