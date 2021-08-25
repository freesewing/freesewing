---
title: freesewing.org
---

import RepoPage from "../../../../../src/components/repo-page";

<RepoPage repo="freesewing.org" />

This is the source code for [FreeSewing.org](https://freesewing.org), our main website.

It's a [JAMStack](https://jamstack.org/) site powered by [Gatsby](https://www.gatsbyjs.org/) and
hosted by [Netlify](https://www.netlify.com/).

The content (documentation, blog posts, and so on) is kept in [our markdown repository](/reference/repos/markdown) and
included in this repository as a submodule.

## Getting started

To run your own copy of our website, follow these steps:

```bash
git clone --recurse-submodules git@github.com:freesewing/freesewing.org.git
cd freesewing
npm install
cp .env.example .env
npm run develop
```

<Note>

We're using the `--recurse-submodules` option to fetch the [markdown](/reference/repos/markdown) submodule in one go.
However, this is only available in newer versions of git.

If after cloning the `markdown` directory is empty,
please check [these alternatives](https://stackoverflow.com/questions/3796927/how-to-git-clone-including-submodules).

</Note>


<Note>

We're creating a copy of the `.env.example` file here as it contains required environment variables.
For more details, see **Environment variables** below.

</Note>

Gatsby will build your site and make it avaialable on http://localhost:8000.

<Tip>

There's also very useful GraphQL playground on http://localhost:8000/\_\_\_graphql

</Tip>

## Dependencies

### Backend

Without a backend, certain aspects of the website won't work.
The backend needs to be configured in the `GATSBY_BACKEND` environment variable.

To facilitate development, our backend is available as a Docker image that you can spin up.
See [the backend repo](/reference/repos/backend) for more info.

### Tiler (svg2pdf)

Without an svg2pdf backend (aka the tiler), the website won't be able to generate PDFs for patterns.
The svg2pdf backend needs to be configured in the `GATSBY_TILER` environment variable.

You can spin up your own version of [our svg2pdf repository](/reference/repos/tile).
FreeSewing contributors can also simply point to https://tiler.freesewing.org.

### Oauth

The website allows signing up/logging in via your Github or Google account.

We use Oauth for this, which has a few dependencies:

 - You need to create/configure an app with Github and Google for Oauth
 - You need to configure the various environment variables (see below)

If you don't setup/configure Oauth, everything will work, except Oath (duh).

### Algolia

Algolia handles the search on the website.

<Warning>

This feature is not yet implemented.

</Warning>

## Environment variables

The following variables configure different aspects of our website.
The `.env.example` file contains the required variables to get the site up and running.

| Var    | Purpose | Example |
|--------|---------|---------|
| `GATSBY_LANGUAGE` | Determines the language of the site | `en` |
| `GATSBY_FRONTEND` | URL under which the website is served | `http://localhost:8000/` |
| `GATSBY_BACKEND` | The location of the data backend | `http://localhost:3000/` |
| `GATSBY_TILER` | The location of the tiler backend | `http://localhost:4000/` |
| `GATSBY_GITHUB_CLIENT_ID` | The Github client ID used for Oauth | `13734754d4aa03f5c70e` |
| `GATSBY_GOOGLE_CLIENT_ID` | The Google client ID used for Oauth | `730107872143-l1gfa3e0eerads4clqu458pblgpnu54h.apps.googleusercontent.com` |
| `GATSBY_ALGOLIA_API_ID` | The Algolia client ID for search (under construction) | `MA0Y5A2PF0` |
| `GATSBY_ALGOLIA_SEARCH_KEY` | The Algolia *read only* key for search (under construction) | `9209470ad243eee797156aa2874d886c` |
| `GATSBY_ALGOLIA_UPDATE_KEY` | The *write* key to update the Algolia search index at build time (under construction) | `ba780a3afe2118062ee08ea4fb54c097` |


