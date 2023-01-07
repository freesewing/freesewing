---
title: Setting up the development environment
order: 100
---

Open a terminal and enter the following command:

```sh
npx @freesewing/new-design@next
```
<Fixme compact>Remove `@next` suffix once v3 is in production</Fixme>

We'll be asked some questions.
All the defaults will do, but here are the details:

- *What template would you like to use?* — Pick the default: **Tutorial**
- *What package manager should we use?* — Pick the default: **npm**, unless you are certain you have **yarn** installed

After we've answered these questions, files will be copied, dependencies installed, and components downloaded.

<Note>

This will take a few minutes because we're loading some software for our development environment.

</Note>

When it's ready, enter the `tutorial` directory that was just created and run `npm run dev`:

```sh
cd tutorial
npm run dev
```

Or if we chose to use yarn as package manager:

```sh
cd tutorial
yarn dev
```

Now open our browser at http://localhost:8000

If all goes well, we'll should see this landing page:

![The FreeSewing development environment](./nd.png)

## Notes

### Need help?

If you run into any issues, [join our **#development-help** chat room on on
Discord](https://discord.freesewing.org/) and we'll figure it out together.
