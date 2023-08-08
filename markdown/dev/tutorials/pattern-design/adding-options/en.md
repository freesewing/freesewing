---
title: Adding options
order: 140
---

We know what our bib should look like, and we have the _head_ measurement
to work with. But there's still a number of choices we have to make:

- How large should the neck opening be?
- How wide should the bib be?
- How long should the bib be?

We can make all of these choices for the user and set them in stone, so to speak.

But since we're designing a pattern in code, it's trivial to make our pattern
flexible and let the user decide. All we have to do is add options to our part.

## Add the neckRatio option

The first option we're going to add controls the ratio between the neck opening
and the head circumference. Let's call it `neckRatio`.

We'll add a new `options` key to our part object for this:

```design/src/bib.mjs
function draftBib({ part }) {

  return part
}

export const bib = {
 
  name: 'tutorial.bib',
  draft: draftBib,
  from: false,
  hide: {
    self: false,
    from: false,
    after: false
  },
  // highlight-start
  options: {
    neckRatio: { pct: 80, min: 70, max: 90, menu: 'fit' },
  },
  // highlight-end
  measurements: [],
  optionalMeasurements: [],
  plugins: []
}

```

Can you guess what it means?

- We've added a option of type percentage
- Its minimum value is 70%
- Its maximum value is 90%
- Its default value is 80%
- We've added this option to the *fit* menu

<Note>

There are different types of options, but percentages are the most common ones.
They are all documented [in the part reference docs](/reference/api/part/config/options).

</Note>

## Add the widthRatio and lengthRatio options

Let's do something similar for the width and length of our bib:

```design/src/bib.mjs
options: {
  neckRatio: { pct: 80, min: 70, max: 90, menu: 'fit' },
  widthRatio: { pct: 45, min: 35, max: 55, menu: 'style' },
  lengthRatio: { pct: 75, min: 55, max: 85, menu: 'style' },
}
```

- We've added `widthRatio` and `lengthRatio` options
- We've given all options sensible defaults
- We've given all options sensible maximum and minimum boundaries
- We've added these two new options to the *style* menu

Later, we'll test-drive our pattern to see how it behaves when we adapt the options
between their minimum and maximum values. At that time, we can still tweak these values.

With that out of the way, let's start drawing our bib.

## Notes

The `menu` key on an option does not do anything for our pattern as such.
Instead it signals to the frontend that this is how options should be grouped
together and presented to the user.
