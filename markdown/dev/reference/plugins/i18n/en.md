---
title: plugin-i18n
---

Published as [@freesewing/plugin-i18n][1], this plugin facilitates
translation of your designs by allowing you to provide your own
language translations.

## Installation

```sh
npm install @freesewing/plugin-i18n
```

## Usage

Either [add it as a part plugins](/reference/api/part/config/plugins) in your
design, or [add it to a pattern instance with
Pattern.use()](/reference/api/pattern/use).

To import the plugin for use:
```js
import { i18nPlugin } from '@freesewing/plugin-i18n'
// or
import { pluginI18n } from '@freesewing/plugin-i18n'
```

## Notes

This plugin provides the mechanism for translation but does not come with
translations itself.  For this, you can use our [i18n
package](https://www.npmjs.com/package/@freesewing/i18n).

To add your own translations, you will need to pass data to this plugin
containing translation keys and the translations for them for each language.
The data should be in the form of an `Object` structured as such:

```js
{
  strings:
    en: {
      example: "Example",
      examplePhrase: "An example phrase",
      anotherTranslationKey: "(English translation for the translation key)",
      // More translations can follow...
    },
    nl: {
      example: "Voorbeeld",
      examplePhrase: "Een voorbeeldzin",
      anotherTranslationKey: "(Dutch translation for the translation key)",
      // More translations can follow...
    },
    es: {
      example: "Ejemplo",
      examplePhrase: "Una frase de ejemplo",
      anotherTranslationKey: "(Spanish translation for the translation key)",
      // More translations can follow...
    },
    // More languages can follow...
  }
}
```

<Related compact>
To learn more about using translations in a design, see the
[Translation guide](/guides/translation/)
</Related>

[1]: https://www.npmjs.com/package/@freesewing/plugin-i18n
