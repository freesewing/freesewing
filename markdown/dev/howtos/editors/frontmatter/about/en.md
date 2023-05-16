---
title: About Frontmatter
order: 10
---

Frontmatter is a way to add metadata to Markdown documents.

Frontmatter sits at the top of the file (it's matter that's at the front) and is
surrounded by lines with three dashes on them. It contains several keys with a value. 

The `title` key is required on every page, it holds the title of the page. 

The `order` key is not required and can be used to sort pages in a certain order, if there is no order key then the pages will be sorted alphabetically.

```md
---
title: About Frontmatter
order: 20
---
```

<ReadMore list />
