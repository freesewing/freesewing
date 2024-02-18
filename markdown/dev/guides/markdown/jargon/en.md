---
title: Using jargon
---

Jargon are terms that could throw off new users.
Rather than create a glossary on every page, we use MDX to manage
jargon terms for us. This page shows you how to use it.

<Tip compact>Think of jargon as glossary terms</Tip>

## Adding jargon terms

To add a new jargon term, you first need to document it, than you can add it to
the jargon component for the website you'd like to add it to:

| Website | Jargon file | GitHub link |
| ------- | ----------- | ----------- |
| freesewing.dev | `sites/dev/components/jargon.mjs` | [jargon.mjs](https://github.com/freesewing/freesewing/blob/develop/sites/dev/comonents/jargon.mjs) |
| freesewing.org | `sites/org/components/jargon.mjs` | [jargon.mjs](https://github.com/freesewing/freesewing/blob/develop/sites/org/components/jargon.mjs) |

The file holds a `jargon` object that consists of key/value pairs per language.

The **key** is the jargon term. It should always be lowercase because we lowercase the term before matching it.
So in your text, you can use `ESM`, `esm`, or even `eSm`, but the key in the jargon file should be `esm`.

The **value** is the URL path to the documentation page for the term.
You do not need to include the language prefix in the doc path.
Note that this shoud point to a page that holds MDX content.

An example will make this more clear:

```js
const jargon = {
  en: {
    basting: 'docs/sewing/basting',
  },
  nl: {
    driegen: 'docs/sewing/basting',
  },
}
```

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
