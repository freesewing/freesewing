---
title: Using jargon
---

Jargon are terms that could throw off new users.
Rather than create a glossary on every page, we use MDX to manage
jargon terms for us. This page shows you how to use it.

<Tip compact>Think of jargon as glossary terms</Tip>

## Adding jargon terms

To add a new jargon term, you first need to document it, then you can add it to
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
Note that this should point to a page that holds MDX content.

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

### Adding freesewing.org jargon translations

Because the freesewing.org jargon file contains keys for all supported
languages, a key/value pair for each supported language must be added
to the file when adding a new jargon term.
To do this, you will need to know the jargon term's translation in
each language, information which you may not have initially.

**Because the jargon file itself does not get translated as part of the
regular FreeSewing translation process, it will be your responsibility
to obtain the translations and add them to the file manually.**
We have developed a process to help you do this:

1. Add key/value pairs for your new jargon term to the jargon file,
temporarily using the English-language key as the key for all the
other languages.
2. Add the jargon file and the English documentation web page file
to the repository.
3. File a GitHub Issue to track the chore that the temporary
English-language keys will need to be replaced with the actual
translations once they become available.
4. Eventually FreeSewing's translation process will result in the
English documentation web page getting translated into the other
supported languages.
When this happens the needed translations for the jargon term will
be available in the translated documentation files.
5. Edit the jargon file to replace the temporary English-language
keys with the actual translations, and close the GitHub issue once
the edited jargon file is added to the repository.

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
