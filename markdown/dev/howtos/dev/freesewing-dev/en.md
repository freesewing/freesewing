---
title: Working on freesewing.dev
for: developers
about: Shows you how to setup your development environment to work on freesewing.dev, our website for developers
---

freesewing.dev is built from a package in our monorepo. You will need the following setup and installed before you begin: Node, [lerna](https://lerna.js.org/) and [yarn](https://yarnpkg.com/).

To get started, checkout the repository:

```bash
git@github.com:freesewing/freesewing.git
```

<Note>
You should check out your own fork so you can write your changes to it.
Update the command above with the path of your own fork on Github
</Note>

Enter the newly installed repository and run kickstart:

```bash
cd freesewing
yarn kickstart
```

After that completes, navigate to the freesewing.dev package directory:

```bash
cd freesewing/packages/freesewing.dev
```

Now install the dependencies:

```bash
yarn install
```

This will take a while. When it's done, run the following commands to build and then start your development environment:

```bash
yarn prebuild
yarn dev
```

Once the command builds the site, you can open your browser on http://localhost:3002 to see the site.

As you make changes, they will automatically be loaded into your browser.
