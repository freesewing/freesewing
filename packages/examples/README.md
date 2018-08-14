<p align="center">
  <a title="Go to freesewing.org" href="https://freesewing.org/"><img src="https://freesewing.org/img/logo/black.svg" align="center" width="150px" alt="Freesewing logo"/></a>
</p>
<h4 align="center"><em>&nbsp;<a title="Go to freesewing.org" href="https://freesewing.org/">freesewing</a></em>
<br><sup>a library for made-to-measure sewing patterns</sup>
</h4>

# freesewing pattern template

This repository contains all the boilerplate to jump-start your freesewing pattern.

It contains:

 - A config file with some options and measurements as example
 - Code structure with two example pattern parts
 - An index HTML file that you can open in your browser to see your progress
 - A package.json file with all the scripts to build/lint/publish your work
 - A rollup configuration that will transpile your code for Node.js, the browser, and as an ES6 module
 - Comes preloaded with the freesewing plugin bundle
 - Your HTML preview also loads the theme, designer, validate, and debug plugins
 - Comes with both models and antman to test your patterns with

## Getting started

Simply fork this repository, or download a local copy.
Then, in its root directory run:

```js
npm install
```

This will install all dependencies. When you're done, you can run:

```js
npm run build
```

Which will build the code for all targets.

You can open the index.html file in your browser, and it will show your pattern.

## Configuration

To make this pattern your own, all you have to do is pick a name. 
Then, change **template** into your own name in both the config file
and package.json.

## Development

The source code is in the src directory. You can make changes and check your 
progress in your browser. 

Make sure to keep the browser console open, as the debug plugin will provide you
with extra info there. This pattern also comes with the designer plugin that will
log info to the console when you hover over a point.

While developing, you can speed up your build by running:

```js
npm run browserbuild
```

As this will only run the build for the browser.

## Getting help

If you have any questions, help is available.
The [freesewing developer documentation](FIXME) is a good place to start.

Or, [join our chat room on Gitter](https://gitter.im/freesewing/freesewing),
the best place to ask questions.
