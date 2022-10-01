---
title: plugin-i18n
---

Published as [@freesewing/plugin-i18n][1], this plugin faciliates
translation of your designs.

## Installation

```sh
npm install @freesewing/plugin-i18n
```

## Usage

Either [add it as a part plugins](/reference/api/part/config/plugins) in your
design, or [add it to a pattern instance with
Pattern.use()](/reference/api/pattern/use).

## Notes

This plugin provides the mechanism for translation, but does not come with
translations itself.  For this, you can use our [i18n
package](/reference/packages/i18n).

To add (your own) translations, you should pass data to this plugin.
It should be structured as such:

```js
{
  strings:
    en: {
      example: "Example"
    },
    nl: {
      example: "Voorbeeld"
    },
    // More languages can follow
  }
}
```

The i18n plugin is part of our [plugin-bundle](/reference/plugins/bundle)

[1]: https://www.npmjs.com/package/@freesewing/plugin-i18n

