***

## title: Content sources

As an editor, you need to know where you can find/edit what type of content.

## The freesewing monorepo

Our [freesewing monorepo](https://github/freesewing/freesewing) holds the majority of all our code and content.

Here you can find:

*   Content for freesewing.org: in the `markdown/org` folder
*   Content for freesewing.dev: in the `markdown/dev` folder
*   Strings used throughout the software: in the `packages/i18n/src/locales` folder

<Note>

##### Edit, don't translate

As an editor, you only ever work with the `en.md` files. The rest is for the translators.

When creating new content, you don't have to create the other files, only `en.md`.
The rest will be created automatically.

</Note>

## Strapi

FreeSewing uses [the Strapi content management system](https://strapi.io/) as a headless content management system for various posts:

*   For blog posts on freesewing.org
*   For showcase posts on freesewing.org
*   For blog posts on freesewing.dev
*   For newsletter editions

The Strapi instance is available at [posts.freesewing.org](https://posts.freesewing.org)

## Emails sent from our backend

The last bit of content is emails that are sent out from our backend systems.
They are in the [backend repository](https://github.com/freesewing/backend).

<Note>

It's on our todo list to bring the backend code into our monorepo

</Note>
