---
title: Creating a new pattern design
---

When creating a new design, you have two options. You can create it in a
stand-alone development environment. Or, you can create it inside (your fork of)
the FreeSewing monorepo.

If you are unsure what to pick, go with the stand-alone development environment.
It is the best choice for people new to FreeSewing.

Working inside the monorepo is the preferred way of regular contributors, but
if you were a regular contributor, you would probably already know this. So
when in doubt, go stand-alone. You can always change track later.

## Stand-alone

To setup the stand-alone development environment, you need NodeJS 16 or higher.
Then run:

```sh
npx @freesewing/new-design@next
```

This command will setup FreeSewing's stand-alone development environment.

## Work inside the monorepo

First, [fork our monorepo](https://github.com/freesewing/freesewing/fork). Then run:

```sh
git clone <url to your fork>
cd freesewing
yarn kickstart
yarn new design
```

These commands will clone your fork of the
[freesewing/freesewing](https://github.com/freesewing/freesewing) repository on
GitHub and set it up for development.
