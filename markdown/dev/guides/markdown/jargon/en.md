---
title: Using jargon and terms
---

Jargon or terms is anything that could throw off new users.
Rather than create a glossary on every page, we use MDX to manage
jargon/terms for us. This page shows you how to use it.

<Tip compact>Think of jargon as glossary terms</Tip>

## Defined terms

The list of terminology that is defined differs from site to site:

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

