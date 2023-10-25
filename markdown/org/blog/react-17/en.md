---
author: "joostdecock"
caption: "Hat-tip to nappy.co for the picture"
date: "2021-05-24"
intro: "FreeSewing 2.16 comes with React 17 and Webpack 5"
title: "FreeSewing 2.16 comes with React 17 and Webpack 5"
---


We released FreeSewing v2.16 today. 
To the casual observer, there's not that many changes. 
And for users of this website, that's certainly the case.

Scratch the surface however, and you'll find a lot of work went into this release.

Let's look at what's been changed:

## create-freesewing-pattern

The biggest change is related to [create-freesewing-pattern](https://www.npmjs.com/package/create-freesewing-pattern) and the development environment it sets up for you.

We use [create-react-app](https://www.npmjs.com/package/create-react-app) (aka <abbr title='Create React App'>CRA</abbr>) under the hood, and FreeSewing 2.16 is our first release to ship with [React](https://reactjs.org/) 17, CRA 4, and [Webpack](https://webpack.js.org/) 5.

That migration to CRA 4 (and its companion [react-scripts](https://www.npmjs.com/package/react-scripts) 4) is significant be because it has a whole new way of hot-reloading your application, called `FAST_REFRESH`.

The downside is that it will only work for *local components* in your app. And since our development environment loads your pattern code as a (local) dependency, it does not reload when you change your pattern file.

To make matters worse, Webpack 5 will keep a cache in memory of the built dependencies. So even restarting the development environment won't show the changes you've made to your pattern.

Obviously, that ain't cool. And while there's certainly ways to configure Webpack to behave as we want it to, CRA doesn't allow for that sort of customization. You can always eject the CRA configuration (or fork react-scripts) but that would create too much maintenance overhead.

## The FreeSewing development environment: Now with fast refresh

We want the development environment to reflect any changes you make to your code. And we'd like to use the new fast refresh feature because it's pretty great.

Unlike the previous hot-reload that would just reload the page, fast refresh can dynamically update a changed React component.

That's an important distinction because a page reload will reset the development environment to the state that's stored in local storage. That includes the most important things like measurements, but it does not include what you were looking at in the development environment, pattern configuration, and so on. So each reload you'd need a few clicks to get back to what you were doing, which was a bit of an annoyance.

Fast refresh has the potential to fix that, and to enable it all we need to do is import the pattern as a local component. Alas, CRA uses Webpack's `ModuleScopePlugin` which forbids importing local code from outside the `example/src` folder.

To sidestep that issue, running:

```bash
npx create-freesewing-pattern
``` 

will now symlink `example/src/pattern` to the root folder of your pattern. That brings the code into the local scope, so it can be correctly loaded and fast-refreshed.

There's another advantage to this approach: Where previously you had to run two terminals — one to build/watch the pattern code and one to build/watch the development environment — you now need to load just one because the development environment will also build/watch the pattern code.

Developers rejoice 🎉

## Migration of react-markdown 5 to 6

Another major change is [react-markdown](https://www.npmjs.com/package/react-markdown). We've already upgraded it on our websites (part of the migration to Gatsby v3 that we completed earlier this month), but we're also using it in our development environment.

It's a relatively trivial change where the markdown content is no longer passed in as an explicit prop:

```jsx
<Markdown source={`Hello, I am **Markdown**`} />
```

But rather via the special *children* prop.

```jsx
<Markdown>Hello, I am **Markdown**</Markdown>
```

## Upgraded rollup plugins

The following rollup-plugins also had some major changes:

- rollup-plugin-terser 6 => 7
- @rollup/plugin-commonjs 14 => 19
- @rollup/plugin-node-resolve 8 => 13

This should not cause any issues unless perhaps you're bundling your own freesewing patterns. If you hit any snags, [let us know](https://discord.freesewing.org/).

## Defaults for browserlist

We now use the recommended `defaults` setting for [browserlist](https://github.com/browserslist/browserslist) which controls browser support for cross-compilers such as [Babel](https://babeljs.io/).

We used to have a set of custom settings but there is no real reason for us to not stick to the defaults.

This could potentiality impact browser support for some really old browsers, but chances are this too will pass under the radar.

## Summary

Not so much has changed in the FreeSewing code itself, but there's a bunch of changes that impact the dependencies and bundlers.

These are typically the hardest and most esoteric things about any JavaScript project.

If you run into any problems after upgrading to FreeSewing v2.16, please [hop onto our Discord server](https://discord.freesewing.org/) so we can help you out.

That being said, as long as you use the same version of different FreeSewing packages, you should not have any problems.

