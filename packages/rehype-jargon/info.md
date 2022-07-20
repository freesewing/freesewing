## About

This [Rehype](https://github.com/rehypejs/rehype) plugin allows you to use _jargon_ in your 
markdown/mdx/html content and use a centrally managed file of jargon terms and their definitions.

![An example of this plugin being used on freesewing.org](example.png)

## Install

To install this plugin, run:

```
npm install --save rehype-jargon
```

## Getting started

> **Tip**: See https://github.com/joostdecock/rehype-jargon-example for a minimal repository that uses this plugin

### Create your jargon file

This plugin requires a _jargon file_ with terms defenitions. For example:

```js
export const jargon = {
  rehype: "<b>rehype</b> is a tool that transforms HTML with plugins. These plugins can inspect and change the HTML. You can use rehype on the server, the client, CLIs, deno, etc.",
  freesewing: "<b>FreeSewing</b> is an open source platform for made-to-measure sewing patterns. See <a href='https://freesewing.org/'>freesewing.org</a>"
}
```

### Import the plugin

Now import the plugin, and pass it your jargon:

```js
var remark = require('remark')
var html = require('remark-html')
var plugin = require('remark-jargon')
var jargon = require('./jargon.js')

remark()
  .use(html)
  .use(plugin, { jargon: jargon })
  .process('This is a plugin for _remark_ originally written for _freesewing_.', function (err, file) {
    console.log(String(file))
  })
```

> **Note**
>
> This plugin will only add markup to your jargon if you _emphasize_ it.


### Style your jargon

You will need to add CSS to style your jargon properly, and hide the definition by default.
Below is an example to get you started:

```css
// Add a dashed line under jargon terms
.jargon-term {
  text-decoration: underline dotted #228be6
}
// Add a question mark behind/above jargon terms
.jargon-term::after {
  content: "?";
  font-weight: bold;
  display: inline-block;
  transform: translate(0, -0.5em);
  font-size: 75%;
  color: #228be6;
  margin-left: 3px;
}
// Hover behavior for the therm itself
.jargon-term:hover {
  position: relative;
  text-decoration: none;
  cursor: help;
}
// Hide info by default
.jargon-term .jargon-info {
  display: none
}
// Show info on hover
.jargon-term:hover .jargon-info {
  display: block;
  position: absolute;
  top: 1.5em;
  left: 0;
  background: #F8F8F8;
  border: 1px solid #DCDCDC;
  padding: 1rem;
  border-radius: 4px;
  font-size: 90%;
  min-width: 250px;
  max-width: 450px;
  z-index: 1;
}
```

## Tips for using jargon

### Lowercase your terms in the jargon file

When looking for terms to match, we lowercase the term your emphazised.
So in the jargon file, you should use `msf`, but in your text, you can use `MSF`, `Msf`, or `msf`.

### If you use HTML, only use inline elements

Your jargon term definition can contain HTML, but only inline elements.
Typically, you will want to stick to:

 - Making things **bold**
 - Inserting [links](#)

## Getting help

This plugin is written by/for [FreeSewing](https://github.com/freesewing).
For help or feedback, please stop by [the FreeSewing chat room](https://gitter.im/freesewing/development) or
[create an issue](https://github.com/freesewing/freesewing/issues/new).


## Use with Gatsby

Please see [gatsby-remark-jargon](https://github.com/freesewing/freesewing/tree/develop/packages/gatsby-remark-jargon) for
info and instructions on how to use this plugin with [Gatsby](https://www.gatsbyjs.org/). 
