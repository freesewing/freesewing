---
title: Working on freesewing.org
for: developers
about: Shows you how to setup your development environment to work on freesewing.org, our website for makers
---

freesewing.org is being moved from its current location ([freesewing/freesewing.org](https://github.com/freesewing/freesewing.org)) to the monorepo ([freesewing/freesewing](https://github.com/freesewing/freesewing)). These instructions are subject to change and may be out of date. If you run into issues please reach out on #development-help in [Discord](https://discord.freesewing.org/). In the meantime, to work on freesewing.org, checkout the freesewing.org repository:

```bash
git@github.com:freesewing/freesewing.org.git
```

<Note>
You should check out your own fork so you can write your changes to it.
Update the command above with the path of your own fork on Github
</Note>

Enter the newly installed repository:

```bash
cd freesewing.org
```

Copy the `.env.example` file to `.env`. If you just want to get the site running you don't need to edit the values inside the `.env` file. But if you want to use any of the integrations (e.g. Google Authentication, Algolia search) you will need to enter your own values to this file. 

```bash
cp .env.example .env
```

Because freesewing.org is in the process of moving to the monorepo, it's using shared components from the monorepo as a submodule. You will need to initialize the monorepo submodule. Do so with the following git commands: 

```bash
git submodule init
git submodule update
```

Before running the above command the `monorepo` folder will be empty. After running the above commands you should see files in the `monorepo` folder. 

Now install the dependencies:

```bash
yarn install
```

If you prefer, you can also use npm:

```bash
npm install
```

This will take a while. When it's done, run the following command to start your development environment:

```bash
npm run develop
```

Once the command builds the site, you can open your browser on http://localhost:8000 to see the site.

As you make changes, they will automatically be loaded into your browser.
