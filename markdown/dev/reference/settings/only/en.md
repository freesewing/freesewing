---
title: only
---

The `only` setting allows you to specify one or more parts to
draft, rather than the entire pattern.

It accepts either a single part name as a string, or an array of
one or more part names.

## Signature

```js
const settings = {
  Array|Boolean only=false
}
```

## Example

```js
import { Aaron } from "@freesewing/aaron"

const pattern = new Aaron({
  only: ['aaron.front']
})
```

## Notes

When `only` is not specified, it defaults to `false` which means all parts will
be included.
