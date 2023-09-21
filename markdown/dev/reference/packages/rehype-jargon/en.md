---
title: rehype-jargon
---

Published as [@freesewing/rehype-jargon][1], this package provides
a [Rehype](https://github.com/rehypejs/rehype)
plugin for adding HTML markup for jargon terms.
It allows you to use jargon in your markdown/mdx/html content and use
a centrally managed file of jargon terms and their definitions.

## Installation

```sh
npm install @freesewing/rehype-jargon
```

## Usage

In file `jargon.mjs`:
```js
export const jargon = {
  term: '<b>term</b> has this description',
  term2: 'A <i>differenti</i> description',
}
```

In NodeJS:
```js
import rehypeJargon from @freesewing/rehype-jargon
import { jargon } from './jargon.mjs'

...
   rehypePlugins: [
     [rehypeJargon, { jargon: jargon }],
   ],
```

### Example

Here is an example of _jargon_ in markdown.


## Configuration

| Property | Type | Default | Description |
|----------|------|---------|-------|
| jargon | Object |      | Key/Value pairs where the key is a jargon term and the value is the jargon description. The description is a string that can contain HTML tags. Required. |
| transform | Function | (see below) | Given the jargon term and description, returns a string with the final HTML to output. |

### Default transform function

The default `transform` function is:
```js
(term, html) =>
   `<span class="jargon-term">${term}<span class="jargon-info">${html}</span></span>`
```

The default `transform` function applies these CSS classes:
- `jargon-term` is applied to jargon terms
- `jargon-info` is applied to jargon descriptions

You can style your jargon by adding styles to these CSS classes.

## Notes

- Markup will be added to jargon only if the terms are _emphasized_.

- Keys should be in all lowercase characters in the jargon file.
This is because terms are converted to lowercase before they are matched
against the jargon file.

- How terms are capitalized does not matter, for the same reason.

- If you use HTML in your jargon descriptions, use only inline elements such as adding bold/italic formatting and inserting links.

<Related>

Please see [Using Jargon](/guides/markdown/jargon) for information
about how Jargon is used in the FreeSewing websites.

</Related>

[1]: https://www.npmjs.com/package/@freesewing/rehype-jargon
