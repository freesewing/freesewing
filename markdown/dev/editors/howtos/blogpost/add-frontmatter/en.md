---
title: Add the frontmatter
order: 40
---

Frontmatter is metadata that we add to the top of the file. 
Please refere to [working with frontmatter](/howtos/editors/frontmatter/) if you're not sure how to use it.

The following fields need to be filled in:

| Name | Description |
| ----:| ----------- |
| `date` | **Must** be in format `YYYY-MM-DD`  |
| `title` | Title of the blog post |
| `linktitle` | If the title is very long, you can specify an alternative title for use in menus, breadcrumbs, and so on. This field is optional. |
| `img` | Filename of the main image. Must be placed in the folder of the showcase |
| `caption` | The caption that will go below the image |
| `author` | FreeSewing username of the author |

Below is an example:

```md
---
date: 2020-09-09
title: FreeSewing 2.9 brings our Teagan T-shirt pattern
linktitle: "Our latest pattern is Teagan, a fitted T-shirt"
img: teagan2.jpg
caption: "Photo by Alex Andrews from Pexels"
author: joost
---
```

Add the frontmatter to the top of the `en.md` file.

