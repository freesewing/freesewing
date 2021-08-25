---
title: Working on freesewing.dev
for: developers
about: Shows you how to setup your development environment to work on freesewing.dev, our website for developers
---

To work on freesewing.dev, checkout the repository:

```bash
git@github.com:freesewing/freesewing.dev.git
```

<Note>
You should check out your own fork so you can write your changes to it.
Update the command above with the path of your own fork on Github
</Note>

Enter the newly installed repository:

```bash
cd freesewing.dev
```

Now let NPM install the dependencies:

```bash
npm install
```

If you prefer, you can also use yarn:

```bash
yarn install
```

This will take a while. Then it's done, run the following command to start your development environment:

```bash
npm run develop
```

Once the command builds the site, you can open your browser on http://localhost:8000 to see the site.

As you make changes, they will automatically be loaded into your browser.
