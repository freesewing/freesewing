---
title: Setting up the development environment
order: 100
---

Open a terminal and enter the following command:

```bash
npm init freesewing-pattern
```

This will load a few dependencies, and then ask you the following questions:

 - **Language**: Use the arrow keys to select the language of your choice
 - **Pattern name**: Enter `tutorial` 
 - **description**: Enter `The FreeSewing tutorial`
 - **Pattern type**: Use the arrow key to select `Pattern`
 - **Department**: Use the arrow keys to select `Accessories`
 - **Author**: Enter your GitHub username
 - **GitHub repository**: This will be prefilled for you, so just hit Enter
 - **Package manager**: Use the arrow to choose. Pick `NPM` if you're not sure.

After you've answered these questions, the default template will be copied, after which all dependencies will be installed.

<Note>

This will take a few minutes because we're loading some software for your development environment. 

</Note>

When it's ready, you'll need to run two commands in parallel. In the current terminal,
enter the directory that was just created for our `tutorial` pattern and start rollup in watch mode:

```bash
cd tutorial
npm run start
```

Or if you chose to use Yarn as package manager:

```bash
cd tutorial
yarn start
```

Now open a second terminal, and navigate to the `example` subfolder and run the same command there:

```bash:
cd tutorial/example
npm run start
```

Or if you chose to use Yarn as package manager:

```bash
cd tutorial/example
yarn start
```

If all goes well, your browser will open and show the following landing page:

![The FreeSewing development environment](./cfp.png)

<Note>

###### Using Windows?

We have tested this on Linux and MacOS, but not on Windows since I (joost) don't have
a Windows machine I can test this on.

If you run into any issues, join [our chatroom](https://discord.freesewing.org/) and
we'll figure it out together.

</Note>
