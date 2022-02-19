---
title: Adding options
order: 140
---

You know what your bib should look like, and you have the *head* measurement
to work with. But there's still a number of choices you have to make:

-   How large should the neck opening be?
-   How wide should the bib be?
-   How long should the bib be?

You can make all of these choices for the user and set them in stone, so to speak.

But since you're designing a pattern in code, it's trivial to make your pattern
flexible and let the user decide. All you have to do is add options to your pattern.

## Add the neckRatio option

The first option we're going to add controls the ratio between the neck opening
and the head circumference. Let's call it `neckRatio`.

Open the config file at `config/index.js` and add this to the options:

```js
  options: {
    // Remove this size option
    //size: { pct: 50, min: 10, max: 100 }
    // And add the neckRatio options
    neckRatio: { pct: 80, min: 70, max: 90 }, 
  }
```

Can you guess what it means?

-   We've added a option of type percentage
-   Its minimum value is 70%
-   Its maximum value is 90%
-   Its default value is 80%

<Note>

There are different types of options, but percentages are the most common ones.
They are all documented [in the API docs](/reference/config/options).

</Note>

Let's do something similar for the width and length of our bib:

```js
options: {
  neckRatio: { pct: 80, min: 70, max: 90 }, 
  widthRatio: { pct: 45, min: 35, max: 55 }, 
  lengthRatio: { pct: 75, min: 55, max: 85 }, 
}
```

-   You've added `widthRatio` and `lengthRatio` options
-   You've given all options sensible defaults
-   You've given all options sensible maximum and minimum boundaries

<Note>

Later, you'll test-drive your pattern to see how it behaves when you adapt the options
between their minimum and maximum values. At that time, you can still tweak these values.

</Note>

Before you close the `config/index.js` file, make sure to update the `optionGroups` entry as follows:

```js
optionGroups: {
  fit: ["neckRatio", "widthRatio", "lengthRatio"]
},
```

<Note>

The `optionGroups` entry does not do anything for your pattern as such.
Instead it signals to the frontend that this is how options should be grouped together and presented to the user.

</Note>

Because you have removed the `box` option, the pattern no longer draws a box.
So let's start drawing your bib instead.
