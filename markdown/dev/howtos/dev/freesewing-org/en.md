---
title: Working on freesewing.org
for: developers
about: Shows you how to setup your development environment to work on freesewing.org, our website for makers
---

To work on freesewing.org, checkout the repository:

```bash
git@github.com:freesewing/freesewing.org.git
```

<Note>
You should check out your own fork so you can write your changes to it.
Update the command above with the path of your own fork on Github
</Note>

Enter the newly installed repository:

```bash
cd freesewing.dev
```

Copy the `.env.example` file to `.env`

```bash
cp .env.example .env
```

Now let NPM install the dependencies:

```bash
npm install
```

If you prefer, you can also use yarn:

```bash
yarn install
```

This will take a while. When it's done, 
run the following command to start your development environment:

```bash
npm run develop
```

Once the command builds the site, you can open your browser on http://localhost:8000 to see the site.

As you make changes, they will automatically be loaded into your browser.
