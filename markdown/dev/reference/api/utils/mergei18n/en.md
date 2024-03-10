---
title: utils.mergeI18n()
---

The `utils.mergeI18n()` function merges translation files from different designs.

When your design re-uses parts from other designs, it should provide
translation for those parts and any strings or options they use.  Rather than
re-creating this content in your own design, you can pull it out of of the
design you are using the part from by importing the `i18n` named export, and
then use this function to merge it with your own translations.

## Signature

```js
Object mergeI18n({
  Array designs,
  Object options
})
```

## Use

In its simplest form, this function will receive an Array of translation data
(typically the `i18n` named export of a design) and merge them:

```js
import { i18n as brianI18n } from '@freesewing/brian'
import { i18n as simonI18n } from '../i18n/index.mjs'

// Merge translations
const i18n = mergeI18n([brianI18n, simonI18n])
```

This simple approach is typically what you want when you are extending a design
and you are keeping all the parts and options of the design you are extending.
In the example above, Simon extends Brian in this way.

## Configuration

If you don't want to keep all options or parts, you can further control how the
translation data will be merged by passing in a second parameter which is an
object holding the configuration that describes how to merge the translation
data.

The configuration object takes 3 top-level properties:

- `s`: Specifies configuration for how to merge the translation of strings (under `s` in the translation files)
- `p`: Specifies configuration for how to merge the part name translations (under `p` in the translation files)
- `o`: Specifies configuration for how to merge the option translations (under `p` in the translation files)

For **each of the `s`, `p`, and `o` keys** you can specify the following properties:

- `drop`: An Array with the keys of entries to not merge (drop). Keys that are not in this array will be merged.
- `keep`: An Array with the keys of entries to merge (keep). Keys that are not in this array will not be merged.

### Example

```js
import { i18n as brianI18n } from '@freesewing/brian'
import { i18n as otherI18n } from '../i18n/index.mjs'

// Merge translations
const i18n = mergeI18n(
  [brianI18n, otherI18n],
  {
    p: {
      keep: ['sleevecap'],
    },
    o: {
      drop: ['waistEase', 'chestEase']
      }
    }
  }
)
```

The function will check each key under the `s`, `p`, and `o` top-level keys in the translation files.
For each it will:

- Check whether there is a `drop` array configured. If there is, it will remove the entry if its key is included in the `drop` Array.
- Check whether there is a `keep` array configured. If there is, it will remove the entry if its key is not included in the `keep` Array.

If the entry is not explicitly removed by including it in `drop` or excluding it from a list set in `keep` it will be kept.
