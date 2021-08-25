---
title: Add the frontmatter
order: 40
---

Frontmatter is metadata that we add to the top of the file. 
Please refere to [working with frontmatter](/howtos/editors/frontmatter/) is you're not sure how to use it.

The following fields need to be filled in:

| Name | Description |
| ----:| ----------- |
| `date` | **Must** be in format `YYYY-MM-DD`  |
| `title` | Title of the showcase |
| `img` | Filename of the main image. Must be placed in the folder of the showcase |
| `caption` | The caption that will go below the image |
| `patterns` | An array of designs/patterns that are being showcased. Lowercase only |
| `author` | FreeSewing username of the author |

Below is an example:

```md
---
date: 2018-09-29
title: Yoga Outfit by Paul
img: showcase.jpg
caption: "Aaron and Bruce yoga set with stripes by Paul (up-side-down)"
patterns: [aaron,bruce]
author: Tiger751023
---
```

Add the frontmatter to the top of the `en.md` file.
