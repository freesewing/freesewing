---
title: Setting up the development environment
order: 100
---

FreeSewing provides a development environment that visualizes your design for you.

To set it up, I will open a terminal and enter the following command:

```sh
npx @freesewing/new-design@next
```
<Fixme compact>Remove `@next` suffix once v3 is in production</Fixme>

It will ask some questions.
All the defaults will do, but here are the details:

- *What template would you like to use?* — Pick the default: **Tutorial**
- *What package manager should we use?* — Pick the default: **npm**, unless you are certain you have **yarn** installed

After answering these questions, files will be copied, dependencies installed, and requirements downloaded.

<Note>

This will take a few minutes because the development environment has a number
of dependencies that need to be downloaded.

</Note>

When it's ready, you can enter the `tutorial` directory that was just created and run `npm run dev`:

```sh
cd tutorial
npm run dev
```

Or if you want to use yarn as package manager:

```sh
cd tutorial
yarn dev
```

Now open a browser and go to http://localhost:8000

If all goes well, we'll should see this landing page:

![The FreeSewing development environment](./nd.png)

## Notes

### Need help?

If you run into any issues, head over to [FreeSewing.org/support](https://next.freesewing.org/support)
which lists the various ways in which you can get help.

