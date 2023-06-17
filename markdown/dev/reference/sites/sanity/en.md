---
title: Sanity
---

FreeSewing uses [Sanity](https://www.sanity.io/) -- a headless CMS, or a SaaS
platform for structure content -- to host various types of content.

For background information, please refer to [the Sanity content
guide](/guides/content/sanity).

## Content schema

The Sanity content scheme is stored in `sites/sanity/schema` in our monorepo.

## Datasets

We use two datasets:

- `site-data` holds blog and showcase posts in all languages, as well as
  newsletter editions. This dataset is publicly avaialble.
- `user-data` holds images uploaded by users, such as for their account image,
  or measurements set image. This dataset is not publicly available.

## Sanity studio

The `sites/sanity` folder holds an instance of Sanity Studio -- the frontend to
manage the content -- preconfigured to work with our content.  This site is
published at https://cms.freesewing.org/ where editors can work on our content.

### Authentication

To be able to use the Sanity Studio with FreeSewing's data, you need to be
added as an editor.  Sanity supports using your GitHub account to authenticate,
so if you want to become an editor, you can ask joost to grant you access.

### Local development

After setting up the monorepo with `yarn kickstart` in the root folder, change your working directoy to `sites/sanity` and run `yarn dev`:

```sh
git clone git@github.com:freesewing/freesewing.git
cd freesewing
yarn kickstart
cd sites/sanity
yarn dev
```

The Sanity Studio UI will open at http://localhost:3333

<Warning compact>
This instance is setup to work with our production data. 
</Warning>

## Sanity API

The following data is required to interact with Sanity:

- Project ID: `hl5bw8cj`
- Dataset: `site-content`

With that and [the API reference
documentation](https://www.sanity.io/docs/reference) you should be able to get
started.

