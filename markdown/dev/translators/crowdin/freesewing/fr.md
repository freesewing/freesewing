---
title: Translating strings
---

Crowdin makes translations of strings very easy. If you provide the translation, Crowdin will make sure your changes make it back into our repository, where they will be picked up and merged by one of the development people.

Here's what you need to know to get started:

 - Crowdin link: https://crowdin.com/project/freesewing
 - Request an invite: https://gitter.im/freesewing/translation

## Syntax

Most strings are just text, but sometimes you'll find a little markup sprinkled in.

### HTML formatting

When you encounter HTML tags, simply translate around them. Par exemple :

```markup
<b>No</b>, never.
```

looks like this in Spanish:

```markup
<b>No</b>, nunca.
```

### Placeholders

When you encounter a `{key}` between curly braces, leave it as-is. These will be filled in later with the correct value. Par exemple :

```markup
{field} saved
```

looks like this in Spanish


```yaml
{field} guardado
```
