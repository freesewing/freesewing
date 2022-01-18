---
title: Pattern design tutorial
order: 50
icons: 
  - javascript
  - pattern
for: developers
about: |
  You'll learn how to create a FreeSewing pattern.
  We will take you start to finish, from setting up the development environment
  up to a completed pattern.
goals:
  - Setting up the development environment
  - Creating a pattern part
  - Using the user's measurements
  - Using pattern options
  - Using the shorthand method
  - Creating points
  - Creating paths
  - Using macros and snippets
  - Testing your pattern
  - Adding seam allowance
  - Adding dimentions for a paperless pattern
---

Welcome to the FreeSewing tutorial, where you'll learn how to create a made-to-measure
sewing pattern, start to finish.

You will be designing a pattern for a baby bib. It's a very simple pattern, but that's the point.
Your focus today is on learning FreeSewing and how to translate your designs into code.

At the end of this tutorial, you will have created this pattern:

<Example pattern="tutorial" part="bib">Your end result</Example>

Before we can get started, let's make sure you have the required software 
installed on your computer:

## Prerequisites

FreeSewing is a JavaScript library that runs on [Node.js](https://nodejs.org/).

If you don't have Node.js on your system, follow the link above and 
install it on your system.

When you're done, you can test whether it works by running:

```bash
node -v
```

If you get the node version number, you're all set.

You can find the complete code of the tutorial pattern for the final result to help make sure you're following the steps correctly [here on GitHub](https://github.com/freesewing/freesewing/blob/develop/packages/tutorial/src/bib.js).
