![FreeSewing](https://static.freesewing.org/banner.png)
<p align='center'><a
  href="https://www.npmjs.com/package/gatsby-remark-jargon"
  title="gatsby-remark-jargon on NPM"
  ><img src="https://img.shields.io/npm/v/gatsby-remark-jargon.svg"
  alt="gatsby-remark-jargon on NPM"/>
  </a><a
  href="https://opensource.org/licenses/MIT"
  title="License: MIT"
  ><img src="https://img.shields.io/npm/l/gatsby-remark-jargon.svg?label=License"
  alt="License: MIT"/>
  </a><a
  href="https://deepscan.io/dashboard#view=project&tid=2114&pid=2993&bid=23256"
  title="Code quality on DeepScan"
  ><img src="https://deepscan.io/api/teams/2114/projects/2993/branches/23256/badge/grade.svg"
  alt="Code quality on DeepScan"/>
  </a><a
  href="https://github.com/freesewing/freesewing/issues?q=is%3Aissue+is%3Aopen+label%3Apkg%3Agatsby-remark-jargon"
  title="Open issues tagged pkg:gatsby-remark-jargon"
  ><img src="https://img.shields.io/github/issues/freesewing/freesewing/pkg:gatsby-remark-jargon.svg?label=Issues"
  alt="Open issues tagged pkg:gatsby-remark-jargon"/>
  </a><a
  href="https://todo.freesewing.org/"
  title="Project board"
  ><img src="https://img.shields.io/badge/%F3%A0%80%A0-Project%20board-9775fa.svg?logo=github&logoColor=white&logoWidth=15"
  alt="Project board"/>
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

# gatsby-remark-jargon

A gatsby-transformer-remark sub-plugin for jargon terms

## About

This wraps the [remark-jargon](https://github.com/freesewing/freesewing/tree/develop/packages/remark-jargon) plugin
for Gatsby so you can use _jargon_ in the markdown/mdx of your Gatsby site:

![An example of this plugin being used on freesewing.org](example.png)

## Install

```bash
npm install --save gatsby-remark-jargon
```

## Configuration


In `gatsby-config.js` include your jargon file, and add the remark plugin:


```js
  {
    resolve: 'gatsby-remark-jargon',
    options: { jargon: require('./jargon.js') }
  }
```

## Usage

### The jargon file

The jagon file is a simple key-value file:

```js
const jargon = {
  msf: "<b>MSF</b> Médecins Sans Frontières / Doctors Without Borders — An international, independent, medical humanitarian organisation. See <a href='https://www.msf.org/'>msf.org</a>"
}

export default jargon
```

### Using jargon in markdown

This plugin will only add markup to your jargon if you emphasize it. In the following example, 
only the first mention of MSF will be changed:

```md
_MSF_ was founded in 1971 by 13 doctors and journalists. Today, MSF is a worldwide movement of more than 67,000 people.
```

This will be rendered as:

```html
<p>
  <em>
    <span class="jargon-term">
      MSF
      <span class="jargon-info">
        <b>MSF</b> Médecins Sans Frontières / Doctors Without Borders — An international, independent, medical humanitarian organisation. See <a href='https://www.msf.org/'>msf.org</a>
      </span>
    </span>
  </em>
  was founded in 1971 by 13 doctors and journalists. Today, MSF is a worldwide movement of more than 67,000 people.
</p>
```

Which you can then style so that the definition is only show on hover/touch.

### Styling your jargon

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




## What am I looking at? 🤔

This repository is our *monorepo* 
holding [all our NPM packages](https://freesewing.dev/reference/packages/).  

This folder holds: gatsby-remark-jargon

## About FreeSewing 💀

Where the world of makers and developers collide, that's where you'll find FreeSewing.

If you're a maker, checkout [freesewing.org](https://freesewing.org/) where you can generate
our sewing patterns adapted to your measurements.

If you're a developer, our documentation is on [freesewing.dev](https://freesewing.dev/).
Our [core library](https://freesewing.dev/reference/api/) is a *batteries-included* toolbox
for parametric design of sewing patterns. But we also provide a range 
of [plugins](https://freesewing.dev/reference/plugins/) that further extend the 
functionality of the platform.

If you have NodeJS installed, you can try it right now by running:

```bash
npx create-freesewing-pattern
```

Or, consult our getting started guides 
for [Linux](https://freesewing.dev/tutorials/getting-started-linux/),
[MacOS](https://freesewing.dev/tutorials/getting-started-mac/), 
or [Windows](https://freesewing.dev/tutorials/getting-started-windows/).

We also have a [pattern design tutorial](https://freesewing.dev/tutorials/pattern-design/) that
walks you through your first parametric design, 
and [a friendly community](https://freesewing.org/community/where/) with 
people who can help you when you get stuck.

## Support FreeSewing: Become a patron 🥰

FreeSewing is an open source project run by a community, 
and financially supported by our patrons.

If you feel what we do is worthwhile, and you can spend a few coind without
hardship, then you should [join us and become a patron](https://freesewing.org/community/join).

## Links 👩‍💻

 - 💻 Makers website: [freesewing.org](https://freesewing.org)
 - 💻 Developers website: [freesewing.dev](https://freesewing.dev)
 - 💬 Chat: On Discord via [chat.freesewing.org](https://chat.freesewing.org/)
 - ✅ Todo list/Kanban board: On Github via [todo.freesewing.org](https://todo.freesewing.org/)
 - 🐦 Twitter: [@freesewing_org](https://twitter.com/freesewing_org)
 - 📷 Instagram: [@freesewing_org](https://instagram.com/freesewing_org)

## License: MIT 🤓

© [Joost De Cock](https://github.com/joostdecock).  
See [the license file](https://github.com/freesewing/freesewing/blob/develop/LICENSE) for details.

## Where to get help 🤯

Our [chatrooms on Discord](https://chat.freesewing.org/) are the best place to ask questions,
share your feedback, or just hang out.

If you want to report a problem, please [create an issue](https://github.com/freesewing/freesewing/issues/new).
