---
title: Using jargon
order: yyy
---

Jargon are terms that could throw off new users.
Rather than create a glossary on every page, we use MDX to manage
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

To add a new jargon term, you first need to document it, than you can add it to
the jargon component for the website you'd like to add it to:

| Website | Jargon file | GitHub link |
| ------- | ----------- | ----------- |
| freesewing.dev | `sites/dev/components/jargon.mjs` | [jargon.mjs](https://github.com/freesewing/freesewing/blob/develop/sites/dev/comonents/jargon.mjs) |
| freesewing.org | `sites/org/components/jargon.mjs` | [jargon.mjs](https://github.com/freesewing/freesewing/blob/develop/sites/org/components/jargon.mjs) |

The file consists of key/value pairs where:

- The **key** is the jargon term
- The **value** is the jargon description

### Tips for jargon keys

The key in the jargon file should always be lowercase. That's because we
lowercase the term before matching it.

So in your text, you can use `ESM`, `esm`, or even `eSm`, but the key in
the jargon file should be `esm`.

### Tips for jargon values

The value can hold HTML tags, just make sure it's valid HTML and don't go
overboard.

Note that the definition will be _italic_ by default.

## FreeSewing Jargon Glossary

Below is the jargon which is currently defined and available to use
on our websites.

### Jargon on freesewing.dev

| Term | Description |
| ----------- | ----------- |
| `cjs` | **CJS** stands for CommonJS, it is the JavaScript module format popularized by NodeJS, but now increasingly phased out in favor of **ESM**
| `esm` | **ESM** stands for EcmaScript Module, it is the standardized module syntax in JavaScript

### Jargon on freesewing.org

| Term | Description |
| ----------- | ----------- |

_(Currently, no jargon has been defined for the freesewing.org site.)_
