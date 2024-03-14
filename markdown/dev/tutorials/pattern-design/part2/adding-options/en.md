---
title: Adding options
order: 40
---

I have shown what our bib should look like, and added the _head_ measurement
to work with. But there's still a number of choices I have to make:

- How large should the neck opening be?
- How wide should the bib be?
- How long should the bib be?

I could make all of these choices for the user and set them in stone, so to speak.

But since the pattern I am designing is code, it is trivial (and _IMHO_ very satisfying) 
to make a pattern flexible and let the user choose.
All I need to do to give control to the user is add _options_ to the part.

## Add the neckRatio option

The first option I will add controls the ratio between the neck opening
and the head circumference. Let's call it `neckRatio`.

For this, I will add the `options` property to our `bib` object:

```design/src/bib.mjs
function draftBib({ part }) {
  return part
}

export const bib = {
  name: 'fromscratch.bib',
  draft: draftBib,
  measurements: [ 'head' ],
  // highlight-start
  options: {
    neckRatio: { 
      pct: 80, 
      min: 70, 
      max: 90, 
      menu: 'fit'
    },
  },
  // highlight-end
}
```

Can you guess what it means?

- We've added the `options` property to our `bib` object
- On the `options` property, we have added `neckRatio` which holds the configuration for our option
- It is a `pct` option -- which means it's a percentage
- Its default value is 80%
- Its minimum value is 70%
- Its maximum value is 90%

There are different types of options, but percentages are by far the most common ones.
They are all documented [in the part reference docs](/reference/api/part/config/options).

<Note>

##### What is `menu` and why should you care?

The `menu` property on our option is *extra*. 
It will be ignored by FreeSewing's core library and if we leave it out, our design will produce the same result.

Instead, this `menu` property is there for the benefit of FreeSewing's development environment which will use this to build a menu structure for the various
options.

This is covered in more detail in [Part 3](/tutorials/pattern-design/part3) of this tutorial.

</Note>

## Add the widthRatio and lengthRatio options

Let's do something similar for the width and length of our bib:

```design/src/bib.mjs
function draftBib({ part }) => {
  return part
}

export const bib = {
  name: 'fromScratch.bib',
  draft: draftBib,
  measurements: [ 'head' ],
  options: {
    neckRatio: { 
      pct: 80, 
      min: 70, 
      max: 90, 
      menu: 'fit'
    },
    
    // highlight-start
    widthRatio: { 
      pct: 45, 
      min: 35, 
      max: 55, 
      menu: 'style' 
    },
    lengthRatio: { 
      pct: 75, 
      min: 55, 
      max: 85, 
      menu: 'style' 
    },
    // highlight-end
  },
}
```

This is pretty much the exact same thing, except that are placing these in the `style` menu.

Later, I will test-drive our pattern to see how it behaves when we adapt the options
between their minimum and maximum values. At that time, I may need to tweak these values.

With that out of the way, I will start drawing the bib.

