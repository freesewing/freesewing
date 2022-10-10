---
title: Adding options
order: 140
---

You know what your bib should look like, and you have the _head_ measurement
to work with. But there's still a number of choices you have to make:

- How large should the neck opening be?
- How wide should the bib be?
- How long should the bib be?

You can make all of these choices for the user and set them in stone, so to speak.

But since you're designing a pattern in code, it's trivial to make your pattern
flexible and let the user decide. All you have to do is add options to your part.

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
  measurements: ['head'],
  // highlight-start
  options: {
    neckRatio: { pct: 80, min: 70, max: 90, menu: 'fit' }, 
  },
  // highlight-end
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

- You've added `widthRatio` and `lengthRatio` options
- You've given all options sensible defaults
- You've given all options sensible maximum and minimum boundaries
- You've added these two new options to the *style* menu

Later, you'll test-drive your pattern to see how it behaves when you adapt the options
between their minimum and maximum values. At that time, you can still tweak these values.

With that out of the way, let's start drawing our bib.

## Notes

The `menu` key on an option does not do anything for your pattern as such.
Instead it signals to the frontend that this is how options should be grouped
together and presented to the user.
