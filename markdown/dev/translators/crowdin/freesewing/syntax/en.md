---
title: Syntax
---

Most strings are just text, but sometimes you'll find a little markup sprinkled in.

#### HTML formatting

When you encounter HTML tags, simply translate around them. For example:

```yaml
<b>No</b>, never.
```

looks like this in Spanish:

```yaml
<b>No</b>, nunca.
```

#### Placeholders

When you encounter a `{key}` between curly braces, leave it as-is.
These will be filled in later with the correct value. For example:

```yaml
{field} saved
```

looks like this in Spanish


```yaml
{field} guardado
```
