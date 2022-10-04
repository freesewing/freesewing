---
title: Pattern design tutorial
---

Welcome to the FreeSewing pattern design tutorial, where you'll learn how to
design a made-to-measure sewing pattern, start to finish.

You will be designing a pattern for a baby bib. It's a very simple pattern, but
that's the point.  Your focus today is on learning FreeSewing and how to
translate your designs into code.

At the end of this tutorial, you will have created this pattern:

<Examples part="tutorial.step11">Your end result</Examples>

Before we can get started, let's make sure you have the required software
installed on your computer:

## Prerequisites

FreeSewing is a JavaScript library that can run in the browser, on
[Node.js](https://nodejs.org/), or a variety of other runtimes such as Deno,
AWS Lambda, and so on.

For development, we'll use NodeJS. If you don't have Node.js on your system,
follow the link above and install it on your system.

<Tip compact>You need NodeJS 16 or higher to use FreeSewing</Tip>

When you're done, you can test whether it works by running:

```sh
node -v
```

If you get the node version number, you're all set.

You can find the complete code of the tutorial pattern for the final result to
help make sure you're following the steps correctly [here on
GitHub](https://github.com/freesewing/freesewing/blob/develop/designs/tutorial/src/bib.mjs).
