<p align='center'><a
  href="https://www.npmjs.com/package/rehype-jargon"
  title="rehype-jargon on NPM"
  ><img src="https://img.shields.io/npm/v/rehype-jargon.svg"
  alt="rehype-jargon on NPM"/>
  </a><a
  href="https://opensource.org/licenses/MIT"
  title="License: MIT"
  ><img src="https://img.shields.io/npm/l/rehype-jargon.svg?label=License"
  alt="License: MIT"/>
  </a><a
  href="https://deepscan.io/dashboard#view=project&tid=2114&pid=2993&bid=23256"
  title="Code quality on DeepScan"
  ><img src="https://deepscan.io/api/teams/2114/projects/2993/branches/23256/badge/grade.svg"
  alt="Code quality on DeepScan"/>
  </a><a
  href="https://github.com/freesewing/freesewing/issues?q=is%3Aissue+is%3Aopen+label%3Apkg%3Arehype-jargon"
  title="Open issues tagged pkg:rehype-jargon"
  ><img src="https://img.shields.io/github/issues/freesewing/freesewing/pkg:rehype-jargon.svg?label=Issues"
  alt="Open issues tagged pkg:rehype-jargon"/>
  </a><a
  href="#contributors-"
  title="All Contributors"
  ><img src="https://img.shields.io/badge/all_contributors-125-pink.svg"
  alt="All Contributors"/>
  </a></p><p align='center'><a
  href="https://twitter.com/freesewing_org"
  title="Follow @freesewing_org on Twitter"
  ><img src="https://img.shields.io/badge/%F3%A0%80%A0-Follow%20us-blue.svg?logo=twitter&logoColor=white&logoWidth=15"
  alt="Follow @freesewing_org on Twitter"/>
  </a><a
  href="https://chat.freesewing.org"
  title="Chat with us on Discord"
  ><img src="https://img.shields.io/discord/698854858052075530?label=Chat%20on%20Discord"
  alt="Chat with us on Discord"/>
  </a><a
  href="https://freesewing.org/patrons/join"
  title="Become a FreeSewing Patron"
  ><img src="https://img.shields.io/badge/%F3%A0%80%A0-Support%20us-blueviolet.svg?logo=cash-app&logoColor=white&logoWidth=15"
  alt="Become a FreeSewing Patron"/>
  </a><a
  href="https://instagram.com/freesewing_org"
  title="Follow @freesewing_org on Twitter"
  ><img src="https://img.shields.io/badge/%F3%A0%80%A0-Follow%20us-E4405F.svg?logo=instagram&logoColor=white&logoWidth=15"
  alt="Follow @freesewing_org on Twitter"/>
  </a></p>

# rehype-jargon

A Rehype plugin for jargon terms

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


# FreeSewing

> [!TIP]
>#### Support FreeSewing: Become a patron, or make a one-time donation 🥰
>
> FreeSewing is an open source project maintained by Joost De Cock and financially supported by the FreeSewing patrons.
>
> If you feel FreeSewing is worthwhile, and you can spend a few coins without
hardship, then you should [join us and become a patron](https://freesewing.org/community/join).

## What am I looking at? 🤔

This repository is the FreeSewing *monorepo* holding all FreeSewing's websites, documentation, designs, plugins, and other NPM packages.

This folder holds: rehype-jargon

If you're not entirely sure what to do or how to start, type this command:

```
npm run tips
```

> [!NOTE]
> If you don't want to set up a dev environment, you can run it in your browser:
> 
> [![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/freesewing/freesewing)
> 
> We recommend that you fork our repository and then 
> put `gitpod.io/#<entire-url-of-your-fork` into a browser 
> to start up a browser-based dev environment of your own.

## About FreeSewing 💀

Where the world of makers and developers collide, that's where you'll find FreeSewing.

If you're a maker, checkout [freesewing.org](https://freesewing.org/) where you can generate
sewing patterns adapted to your measurements.

If you're a developer, the FreeSewing documentation lives at [freesewing.dev](https://freesewing.dev/).
The FreeSewing [core library](https://freesewing.dev/reference/api/) is a *batteries-included* toolbox
for parametric design of sewing patterns. But FreeSewing also provides a range 
of [plugins](https://freesewing.dev/reference/plugins/) that further extend the 
functionality of the platform.

If you have NodeJS installed, you can try it right now by running:

```bash
npx @freesewing/new-design
```

Getting started guides are available for:
- [Linux](https://freesewing.dev/tutorials/getting-started-linux/)
- [MacOS](https://freesewing.dev/tutorials/getting-started-mac/)
- [Windows](https://freesewing.dev/tutorials/getting-started-windows/)

The [pattern design tutorial](https://freesewing.dev/tutorials/pattern-design/) will
show you how to create your first parametric design.

## Getting started ⚡ 

To get started with FreeSewing, you can spin up our development environment with:

```bash
npx @freesewing/new-design
```

To work with FreeSewing's monorepo, you'll need [NodeJS v18](https://nodejs.org), [lerna](https://lerna.js.org/) and [yarn](https://yarnpkg.com/) on your system.  
Once you have those, clone (or fork) this repo and run `yarn kickstart`:

```bash
git clone git@github.com:freesewing/freesewing.git
cd freesewing
yarn kickstart
```

## Links 👩‍💻

**Official channels**

 - 💻 Makers website: [FreeSewing.org](https://freesewing.org)
 - 💻 Developers website: [FreeSewing.dev](https://freesewing.dev)
 - ✅ [Support](https://github.com/freesewing/freesewing/issues/new/choose),
   [Issues](https://github.com/freesewing/freesewing/issues) &
   [Discussions](https://github.com/freesewing/freesewing/discussions) on
   [GitHub](https://github.com/freesewing/freesewing)

**Social media**

 - 🐦 Twitter: [@freesewing_org](https://twitter.com/freesewing_org)
 - 📷 Instagram: [@freesewing_org](https://instagram.com/freesewing_org)

**Places the FreeSewing community hangs out**

 - 💬 [Discord](https://discord.freesewing.org/)
 - 💬 [Facebook](https://www.facebook.com/groups/627769821272714/)
 - 💬 [Reddit](https://www.reddit.com/r/freesewing/)

## License: MIT 🤓

© [Joost De Cock](https://github.com/joostdecock).  
See [the license file](https://github.com/freesewing/freesewing/blob/develop/LICENSE) for details.

## Where to get help 🤯

For [Support](https://github.com/freesewing/freesewing/issues/new/choose),
please use the [Issues](https://github.com/freesewing/freesewing/issues) &
[Discussions](https://github.com/freesewing/freesewing/discussions) on
[GitHub](https://github.com/freesewing/freesewing).

