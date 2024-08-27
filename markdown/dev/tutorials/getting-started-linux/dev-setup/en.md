---
title: Setting up the FreeSewing development environment
order: 40
---

FreeSewing provides a development environment to help you design and develop
patterns.

There are two ways to run this development environment:

- [**Monorepo development**](#monorepo-development): Use this if you intend to
  contribute your work to FreeSewing
- [**Stand-alone development**](#stand-alone-development): Use this if you want
  to do your own thing, and not contribute to FreeSewing

## Monorepo development

<Note compact>
This is the recommended way for (aspiring) FreeSewing contributors
</Note>

### TL;DR

```bash
git clone https://github.com/freesewing/freesewing
cd freesewing
yarn kickstart
```

<Tip>
Even better: [clone your own
fork](https://github.com/freesewing/freesewing/fork)

```bash
git clone https://github.com/your-username/freesewing
cd freesewing
yarn kickstart
```
</Tip>

This sets up the monorepo. If you would like to create a new design, run the
following command:

```sh
yarn new design
```

If you'd like to create a new plugin, run this variant instead:

```sh
yarn new plugin
```

### Step by step

<Comment by="joost">
These docs assume you have git installed.
But if you're running Linux, you have git, right?
</Comment>

#### Install yarn

Our repository uses yarn workspaces. So you'll need `yarn` to work with it.

To install it run:

```bash
npm install yarn --global
```

#### Fork our repository

You'll want to fork our repository. This way you have your own copy where you can make
all the changes you want. To do so, visit https://github.com/freesewing/freesewing/fork

#### Clone the forked repository

Now that you have your very own fork, it's time to clone it locally.

```bash
git clone <url to your fork>
```

Make sure to use the URL to your own fork, typically `https://github.com/your-username/freesewing` but
obviously with your real username rather than `your-username`.

#### Install dependencies

Enter the directory that was created, and run the `yarn kickstart` command:

```bash
cd freesewing
yarn kickstart
```

Now you're ready to [start the development environment](/tutorials/getting-started-linux/dev-start).

<Note>

There is another `yarn` command that comes with some Linux distributions,
installed as part of the `cmdtest` package and used for command line
scenario testing.
If you get an `ERROR: There are no scenarios; must have at least one.`
message when trying to run the `yarn` command, it may be because the wrong
`yarn` is being used.

Possible workarounds for this include uninstalling the `cmdtest` package
or making sure that npm `yarn` is installed and comes first in your `PATH`
environment variable.

</Note>

## Creating a new design

If you would like to create a new design, run the following command:

```sh
yarn new design
```

## Creating a new plugin

If you'd like to create a new plugin, run the following command:

```sh
yarn new plugin
```

## Stand-alone development

With Node.js installed, all you need to do to setup the stand-alone development environment is run this command:

```bash
npx @freesewing/new-design
```

After you've answered [some questions](#questions), it will take a while to set
everything up.  When it's done, you will have a new folder with the development
environment inside.

Now you're ready to [start the development
environment](/tutorials/getting-started-linux/dev-start).

<Note>

### Questions

#### What folder name to use

- Select a new folder name to create a new installation
- Select a folder name containing an existing installation to:
  - `Overwrite` the installation with an entirely new installation;
  - `Re-initialize` the installation by re-installing dependencies and re-dowloading files; or
  - `Re-download` files in the installation.

#### What package manager to use

You may wish to choose `yarn` since that is the package manager
that we use when doing work in the monorepo,
and many of our tutorials are written to use `yarn`.
However, it doesn't really matter.
You can choose either `yarn` or `npm` as you wish.

</Note>
