---
title: Using jargon
order: yyy
---

Jargon are terminology that could throw off new users.
Rather than create a glossary on every page, we use a plugin to manage
jargon terms for us. This page shows you how to use it.

<Tip compact>Think of jargon as glossary terms</Tip>

## Using jargon

To use jargon, it's sufficient to emphasize the term:

```md
We are migrating from _cjs_ to _esm_ modules
```

Which renders as:

We are migrating from _cjs_ to _esm_ modules

## Adding jargon

To add a new jargon term, you need to add it to the jargon file for the
website you'd like to add it to:

| Website | Jargon file | Github link |
| ------- | ----------- | ----------- |
| freesewing.dev | `sites/dev/jargon.mjs` | [jargon.mjs](https://github.com/freesewing/freesewing/blob/develop/sites/dev/jargon.mjs) |
| freesewing.org | `sites/org/jargon.mjs` | [jargon.mjs](https://github.com/freesewing/freesewing/blob/develop/sites/org/jargon.mjs) |

The file consists of key/value pairs where:

- The **key** is the jargon term
- The **value** is the jargon description

### Tips for jargon keys

The key in the jargon file should always be lowercase. That's because we
lowercase the term before matching it.

So in your text, you can use `ESM`, `ems`, or even `eSm`, but the key in
the jargon file should be `esm`.

### Tips for jargon values

The value can hold HTML tags, just make sure it's valid HTML and don't go
overboard.

Note that the definition will be _italic_ by default.
