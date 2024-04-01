---
title: Using jargon and terms
---

Jargon or terms is anything that could throw off new users.
Rather than create a glossary on every page, we use MDX to manage
jargon/terms for us. This page shows you how to use it.

<Tip compact>Think of jargon as glossary terms</Tip>

## Defining terms

To define a term, we need to establish a link between the term itself, and the documentation page that defines it.

In the most common scenario, the term is the title of the page.
For example, the title of this page is `Using jargon and terms`:

```mdx
---
title: Using jargon and terms
---
```

If we wanted to make it available as jargon, we only need to add the `jargon` frontmatter:

```mdx
---
title: Using jargon and terms
jargon: true
---
```

## Multiple terms for the same page

We can add additional terms that point to the same page by setting the `terms` in frontmatter to a comma-seperated list of terms.

For example to make both `jargon` and `term` point to this page, we can do this:


```mdx
---
title: Using jargon and terms
jargon: true
terms: jargon, term
---
```

## Terminology per site

The following pages show a list of all terminology per site:

| Site | Terminology List |
| ---- | ---------------- |
| FreeSewing.dev | [/reference/terminology](/reference/terms) |
| FreeSewing.org | [/docs/about/terminology](https://freesewing.org/docs/about/terms) |

All of the terms listed in the pages above can be used in the markdown/mdx
content of those websites.

## Using jargon terms in MDX content

To use jargon inside MDX content (like the markdown of our documentation, blog
posts, and so on), it's sufficient to emphasize the term:

```md
We are migrating from _cjs_ to _esm_ modules
```

Which renders as:

We are migrating from _cjs_ to _esm_ modules

## Using jargon terms outside MDX content

Outside MDX content -- more precisely, in React components -- you can achieve the same effect with the `Term` component:

```mjs
import { Term } from 'site/components/jargon.mjs'

export const MyComponent = () => (
  <p>Look, it works here too: <Term>esm</Term></p>
)
```

