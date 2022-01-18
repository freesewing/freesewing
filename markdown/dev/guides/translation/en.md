---
title: Translation guide
---

Freesewing.org is proudly multilingual, and we currently support five languges.
For this, we rely on the work of our translators who volunteer their
time to translate FreeSewing into various languages from English, which
is our source language. 

This translation guide will tell you everything you need to
know to join the effort as a translator for FreeSewing.

<Tip>

##### TL;DR: Becoming a FreeSewing translator

Our translation project on Crowdin is accessible 
via [translate.freesewing.org](https://translate.freesewing.org).

To get started, you will need to be invited as a translator. No need to worry,
simply [let us know you'd like to help out](https://discord.freesewing.org/) and we'll add you.

For access to Strapi, you will need an account on [our Strapi instance](https://posts.freesewing.org/).
Here too, [Discord is the place to let us know you'd like to help out](https://discord.freesewing.org/).

Bonus: You'll get an `@freesewing.org` email alias

</Tip>


## Languages

We currently support the following five languages:

  - **en** : English
  - **de** : German
  - **es** : Spanish
  - **fr** : French
  - **nl** : Dutch

<Note>

If you'd like to start working on a new language, that's great, but a bit
beyond the scope of this documentation. Before you start working on a new language
please [come and talk to us on Discord](https://discord.freesewing.org).

</Note>

## Translation in Crowdin vs Strapi

We use two different tools to manage our translations, depending on the context:

 - Markdown content and code strings in our monorepo are translated within **Crowdin**
 - Blog and showcase posts are translated within **Strapi**

<Tip>

##### Translation priorities

If you'd like to help out, please join our translation team on Crowdin.

While it can be nice to have blog and showcase posts translated, these are less important than the 
translation work in Crowdin which is about the documentation and strings that allow people to
use FreeSewing.org in a different language.

</Tip>

### Crowdin

Most translation happens in Crowdin ([crowdin.com](https://crowdin.com/)), an online translation platform
that makes translation and collaboration a breeze.

In Crowdin, all text is broken up into lines, words or paragraphs, that are than translated.
This does not only facilitate collaboration — as rather than work on one large block of text
various people can jump in and translate smaller snippets — it also enforces a strict one-on-one
match between the English source material and the translation.

This strict correlation is important. People who refer to the documentation in a different language
expect to find the same structure, the same amount of headings, paragraphs and so on.

### Strapi

Strapi ([strapi.io](https://strapi.io/)) is a so-called *headless content management system (CMS)*.
Headless just means that we load the content from it via an API, rather than have it be part of our
website like a classic CMS (eg. Wordpress).

In Strapi, we keep our blog posts and showcases for FreeSewing.org. 
We also keep our newsletter editions there and developer blog posts for FreeSewing.dev there, but since
those are not translated, we will ignore them in this guide.

Strapi supports different language versions for posts, but it's not a translation system like Crowdin
that breaks text down into small parts to translate.
Instead, each post can be translated as a whole, and there is not enforcement whatsover of structure or
content between the different language versions.

In other words, a translated blog posts could use a different structure, or even different images.
This is by design, because we want to encourage the different (non-English) FreeSewing communities
to make FreeSewing their own, by writing blog posts that are relevant or specific to them.

This also means that English does not have to be the source language in Strapi.
Somebody could write a French blog post (for example) which can then be translated to English.

## Syntax

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

