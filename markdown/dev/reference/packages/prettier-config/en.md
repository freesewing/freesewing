---
title: prettier-config
---

Published as [@freesewing/prettier-config][1], this package is
FreeSewing's shared configuration for [Prettier](https://prettier.io/).

## Installation

```sh
npm install @freesewing/prettier-config
```

## Usage

Edit package.json:

```json
{
  // ...
  "prettier": "@freesewing/prettier-config"
}
```

## Prettier options

The Prettier options configured by this package:

| Option | Value |
|--------|-------|
| semi | `false` |
| singleQuote | `true` |
| trailingComma | "es5" |
| printWidth | 100 |

<Related>

Please see the
[Prettier options documentation](https://prettier.io/docs/en/options.html)
for information about the effects of each option.

</Related>

[1]: https://www.npmjs.com/package/@freesewing/prettier-config
