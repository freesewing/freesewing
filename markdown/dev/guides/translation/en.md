---
title: Translation guide
---

Supporting multiple languages is one of the best way to promote inclusion and
accessibility.  Thanks to the efforts of our community, FreeSewing is proudly
multilingual.

This translation guide covers everything you need to know to join the effort of
translating FreeSewing into other languages.

## Supported Languages

FreeSewing is currently available in the following languages:

| Code | Language       | Website |
| ----:|:-------------- |:------- |
| `de` | **German**     | https://freesewing.org/de |
| `en` | **English**    | https://freesewing.org/ |
| `es` | **Spanish**    | https://freesewing.org/es |
| `fr` | **French**     | https://freesewing.org/fr |
| `nl` | **Dutch**      | https://freesewing.org/nl |
| `uk` | **Ukrainian**   | https://freesewing.org/uk |

<Note compact>
English is the translation source language and the working language of the FreeSewing project
</Note>

## Become a FreeSewing translator

To gain access as a FreeSewing translator, you will need an invite.
You can request a translator invite with the link below.
When you do, we will send you an email with all further instructions.

<Link compact>

###### [Request a FreeSewing translator invite](https://freesewing.org/translation/join)
</Link>

<Tip>

We also have [a dedicated __Translation__ channel on
Discord](https://discord.freesewing.org) for any questions that may remain.
</Tip>

## Adding a new language

We would love to make FreeSewing available in more languages. If you are
interested in starting a new translation effort, that is great.

We ask that you familiarize yourself with this translation guide to understand
what it takes to add a new language. Then if you can submit your request to setup
a new language with the link below.

<Link compact>

###### [Suggest a new FreeSewing language](https://freesewing.org/translation/suggest-language)
</Link>

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

## Translation priorities

To fully translate FreeSewing, the following types of content needs to be
translated:

### Top priority: UX Translations
These are translations the directly impact
the user experience (_UX_).  They include the content used in design, the names
of options, translations of menus, emails, and so on.

This is a relatively small amount of text, and makes up less than 10% of the
top & high priority content.  It's an effort that a motivated translator can
complete over the course of a weekend.

<Tip>
The top-priority translations in Crowdin are everything under the `packages`
and `sites` folder. Do this first.
</Tip>

### High priority: Translation of Documentation
This includes all the documentation on FreeSewing.org.

This is a significant amount of text that makes up more than 90% of the top &
high priority content.  It's an effort you should probably not take on by
yourself, but rather tackle with a team of translators.

<Tip>
The high-priory translations in Crowdin is everything under the
`markdown/org/docs` folder.
</Tip>

### Low Priority: Content of blog and showcase posts, and newsletters
This is _nice to have_ as people can use and navigate FreeSewing even when this
content remains untranslated.

<Tip>
The low-priory translations in Crowdin is everything under the
`markdown/org/blog`, `markdown/org/showcase`, and `markdown/org/newsletter` folders.
</Tip>

## Translation through Crowdin

All of our translation work is handled through [Crowdin](https://crowdin.com/), 
an online platform to facilitate translation.

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
quality assurance and avoid any mistakes from slipping in. Much like the code
review process when you submit a pull request on GitHub.

Once your translation is approved, Crowdin will automatically submit a pull
request on GitHub to update the translation files in our repository. And the
next time our website or software packages get built, they will include the new
translations.

## Machine translation

While everybody knows that translation is best when it's done by a human being, 
we also have to be realistic that the growing body of documentation and other 
FreeSewing content can be a daunting task to take on for translators, especially
when you want to start a new language.

Fortunately, machine translation has gotten rather good so we can get some help.
Our Crowdin project is integrated with a [DeepL](https://www.deepl.com) 
subscription, and this can be a great help to translators.

You can use the DeepL suggestions when translating, or there is also the possibility
to machine-translate entire files or folders. For example, you may start a new 
language by machine-translating everything, and then focus on proofreading the
top-priority content, and then move on to the high-priority content.

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

