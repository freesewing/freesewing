---
title: Translation guide
---

Supporting multiple languages is one of the best way to promote inclusion and
accessibility.  Thanks to the efforts of our community, FreeSewing is proudly
multilingual.

This translation guide covers everything you need to know to join the effort of
translating FreeSewing into other languages.

## Supported Languages

We currently support the following five languages:

- **en** : English <small>(This is our source language and the working language
  of the FreeSewing project)</small>
- **de** : German
- **es** : Spanish
- **fr** : French
- **nl** : Dutch

## Incubator Languages

For the following languages, our community has started an effort, but that
effort has not yet reached the level of maturity that to make it a supported
language.

In other words, **these are the languages where we are most in need of extra
translators**:

- **uk** : Ukranian

## Become a FreeSewing translator

To gain access as a FreeSewing translator, you will need an invite.

You can __[request a translator invite
online](https://next.freesewing.org/translation/join)__ and we will send you an
invite with all further instructions.

<Fixme compact>This link above still needs to be implemented in the new v3
website</Fixme>

We also have [a dedicated __Translation__ channel on
Discord](https://discord.freesewing.org) for any questions that may remain.

## Adding a new language

We would love to make FreeSewing available in more langauges.  If you are
interested in starting a new translation effort, that is great.

We ask that you familiarize yourself with this translation guide to understand
what it takes to add a new language.  Then if you want to start a new language,
you can get the ball rolling by completing this online form.


<Fixme compact>
This link above still needs to be implemented in the new v3 website
</Fixme>

<Tip>

##### Get the band together

We recommend finding some like-minded people who can help translating.

While the core materials of FreeSewing can realistically be handled by one
person, translating all of FreeSewing's documentation and content realistically
is a job you should not undertake on your own.

</Tip>

<Comment by="joost"           >

##### Do or do not. There is no try.

There is a certain cost to adding a new language.  It's not a cost in money,
but rather in increased bandwidth, storage requirements, build times,
repository size, test times, and so on.

It's a cost we are __more than happy__ to pay for the benefit gaining another
langauge.  But it is also a cost that needs to be paid up front, at the start
of the effort.

So, without wanting to discourage anyone, I would really like to avoid a
scenario where people enthusiastically start working on a new languages, only
to lose interest days or weeks later and see the effort falter.

With that out of the way, I hope to see many more languages being added in the
future.

</Comment>

## Translation status

The status of the ongoing translation work is available at
[FreeSewing.org/translation](https://freesewing.org/translation).

It's a good place to check what languages need extra help, and which are
leading the scoreboard.

## Content types and translation priorities

To fully translate FreeSewing, the following types of content needs to be
translated:

**Top priority: UX Translations**  These are translations the directly impact
the user experience (_UX_).  They include the content used in design, the names
of options, translations of menus, emails, and so on.

This is a relatively small amount of text, and makes up less than 10% of the
top & high priority content.  It's an effort that a motivated translator can
complete over the course of a weekend.

**High priority: Translation of Documenation**  This includes all the
documentation on FreeSewing.org.

This is a significant amount of text that makes up more than 90% of hte top *
high priority content.  It's an effort you should probably not take on by
yourself, but rather tackle with a team of translators.

**Low Priority: Content of blog and showcase posts**  This is
_nice to have_ as people can use and navigate FreeSewing even when this content
remains untranslated.

Still, if you are considering translating this content, you might want to
consider the following priorities within this categors:

- First: Showcases posts. Not only do they typically have less text, their
  value is also less tied to how recent they are
- Then: Blog posts. Start with the most recent onces. How older a blog post
  gets, the less relevant it becomes

## Translation through Crowdin

All of our top-priority and high-priority translation work is handled through
[Crowdin](https://crowdin.com/), an online platform to facilitate translation.

<Tip compact>

You can reach the FreeSewing project on Crowdin directly via
[translate.freesewing.org](https://translate.freesewing.org).
</Tip>

Crowdin is configured to automatically detect all of the various translation
files in our repository, upload them to the platform, and break them apart into
bite-sized portions that you can translate in a collaborative way. 
Rather than work on one large block of text, various people can jump in and
translate smaller snippets,

Once translated, there is a proofreading step that will be handled by one of
our proofreaders. This is often a formality, but it's an extra step to allow
qulity assurance and avoid any mistakes from slipping in. Much like the code
review process when you submit a pull request on GitHub.

Once your translation is approved, Crowdin will automatically submut a pull
request on GitHub to update the translation files in our repository. And the
next time our website or software packages get build, they will include the new
translations.

<Note>

##### Priorities of translations in Crowdin

- The top-priority translations in Crowdin are everything under the `packages`
  and `sites` folder. Do this first.
- The high-priory translations in Crowdin is everything under the `markdown`
  folder.

</Note>

## Translation through Sanity

Sanity ([sanity.io](https://sanity.io/)) is a so-called _headless content
management system (CMS)_.  "_Headless_" just means that we load the content
from it via an API, rather than have it be part of our website like a classic
CMS (eg. Wordpress).

In Sanity, we keep our blog and showcases posts for freesewing.org.
In other words, **Sanity only holds the low priority translation work**.

<Tip compact>

You can reach the FreeSewing project on Crowdin directly via
[translate.freesewing.org](https://translate.freesewing.org).
</Tip>

<Note>

##### Why we don use Crowdin for blog/showcase translations

Crowdin enforces a strict one-to-one match between the English source material
and the translation.

This strict correlation is important for the UX and documenation transaltions.
People expect a menu to have the same structure in all languages, and when we
refer to the documentation we need to ensure that those links works for all
languages, which requires that all languages use the same structure, the same
amount of headings, paragraphs, and so on.

Sanity supports different language versions for posts, but it does not enforce any structure on them.
A translated blog post could have more or less paragraphs, different images, you name it.

This additional freedom is why we use Sanity for these types of content. We lik
to encourage the non-English FreeSewing communities to make FreeSewing their
own, by writing blog posts that are relevant or specific to them, or
translating blog posts not merely word-for-word, but making them relevent to
their language group.

This also means that English does not have to be the source language in Sanity.
Somebody could write a French blog post (for example) which can then be
translated to English.

</Note>

## Syntax

Most strings are just text, but sometimes you'll find a little markup sprinkled in.

### HTML formatting

When you encounter HTML tags, simply translate around them. For example:

```yaml
<b>No</b>, never.
```

looks like this in Spanish:

```yaml
<b>No</b>, nunca.
```

### Placeholders

When you encounter a `{key}` between curly braces, leave it as-is.
These will be filled in later with the correct value. For example:

```yaml
{field} saved
```

looks like this in Spanish

```yaml
{field} guardado
```

## Questions, Suggestions, Discussion

If you have questions, suggestions, or would like to discuss
translation-related matters, please join
[discord.freesewing.org](https://discord.freesewing.org/) and head to the
__Translation__ channel.

