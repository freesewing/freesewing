***

title: For translators
order: 1140
-----------

Freesewing is proudly multilingual. We currently support 5 languges:

We currently support the following five languages:

*   **en** : English
*   **de** : German
*   **es** : Spanish
*   **fr** : French
*   **nl** : Dutch

<Note>

If you'd like to start working on a new language, that's great, but a bit
beyond the scope of this documentation. So in that case,
please [come and talk to us on Discord](https://discord.freesewing.org).

</Note>

For content hosted on [Strapi](/editors/content/#strapi), translation is available within Strapi as different language versions of the same post.

For markdown content and strings, we use [crowdin](https://crowdin.com/) to manage translations.
It's an online platform that makes translation a breeze.

There's a good deal of documentation on Crowdin online, so we won't try to replicate that here.
You can access the Crowdin project at: [translate.freesewing.org](https://translate.freesewing.org).

To get started, you will need to be invited as a translator. No need to worry,
simply [let us know you'd like to help out](https://discord.freesewing.org/) and we'll add you.

<Tip>

##### English as origin language, and differences between Crowdin and Strapi

Our content comes in two flavors:

*   Strings and markdown content **on Crowdin**. Here, English is the **origin language** and
    translations are kept close to the origin.
*   Blog posts and showcases **on Strapi**. Here, there is no origin langauge. People can write
    blog posts in any language, or translate more freely to adapt the content to a different audience.

</Tip>

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
