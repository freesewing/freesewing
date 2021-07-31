---
title: Strings
order: 30
---

With *strings* we mean all of the translation stored in [our i18n package](/reference/pacakges/i18n) that
provides internationalization.

They are a number of YAML files that you can find in the `packages/i18n/src/locales/en` folder of 
[our monorepo](https://github.com/freesewing/freesewing/)

These files are typically the domain of translators, as they contain short strings and snippets of
text used throughout the software/website rather than flowing text.

However, as an editor, it's good to know where they live.

<Note>

##### Beware that making changes will have ripple-effects on translation

If you make a change to one of the (English) YAML files, this will have a knock-on
effect on translators as this string now needs to be re-translated.

</Note>

<Warning>

Never make changes in the non-English files as they will simply be
overwritten by our translation software.

</Warning>

