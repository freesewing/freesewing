---
title: Installing NodeJS
order: 10
---

FreeSewing is a JavaScript project, so you need JavaScript to work with it.
You certainly already have JavaScript on your system. In your browser to be
precise. You can switch this website theme from light to dark mode, and
that would not work without JavaScript.

As a **user** of FreeSewing, this is all you need. To develop with FreeSewing
you are going to need to be able to run JavaScript *outside* the browswer using
a JavaScript *runtime*. Which just means a thing that can *run* JavaScript.

We are going to be using [NodeJS](https://nodejs.org/) in this tutorial. It is
the most established of the different JavaScript runtimes. But there's also 
other runtimes like [Deno](https://deno.com/) or [Bun](https://bun.sh/). 

## Install
If you don't have NodeJS on your system, you can go to
[NodeJS.org](https://nodejs.org/) and follow the install instructions.

<Tip>

##### NodeJS versions

You need Node.js 18 (lts/hydrogen) or higher to use FreeSewing

If you're looking to use different versions, I can recommend using `nvm` which makes this very easy: https://github.com/nvm-sh/nvm

</Tip>

## Test

To test whether NodeJS is installed, and see it's version, you can run this command:

```sh
node -v
```

If you get the Node.js version number, that means NodeJs is installed. Yay!
