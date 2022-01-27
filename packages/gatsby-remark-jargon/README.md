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
  href="#contributors-"
  title="All Contributors"
  ><img src="https://img.shields.io/badge/all_contributors-81-pink.svg"
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
 - 💬 Chat: On Discord via [discord.freesewing.org](https://discord.freesewing.org/)
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



## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://adamrtomkins.github.io/"><img src="https://avatars.githubusercontent.com/u/5709603?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Adam Tomkins</b></sub></a><br /><a href="https://github.com/freesewing/freesewing/commits?author=AdamRTomkins" title="Documentation">📖</a></td>
    <td align="center"><a href="http://polymerisation-des-concepts.fr/"><img src="https://avatars.githubusercontent.com/u/365999?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Alexandre Ignjatovic</b></sub></a><br /><a href="https://github.com/freesewing/freesewing/commits?author=bankair" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/AlfaLyr"><img src="https://avatars.githubusercontent.com/u/39273729?v=4?s=100" width="100px;" alt=""/><br /><sub><b>AlfaLyr</b></sub></a><br /><a href="https://github.com/freesewing/freesewing/commits?author=AlfaLyr" title="Code">💻</a> <a href="#plugin-AlfaLyr" title="Plugin/utility libraries">🔌</a> <a href="#design-AlfaLyr" title="Design">🎨</a></td>
    <td align="center"><a href="http://thelettereph.com"><img src="https://avatars.githubusercontent.com/u/357684?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Andrew James</b></sub></a><br /><a href="https://github.com/freesewing/freesewing/commits?author=ephphatha" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/annekecaramin"><img src="https://avatars.githubusercontent.com/u/38046191?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Anneke</b></sub></a><br /><a href="https://github.com/freesewing/freesewing/commits?author=annekecaramin" title="Documentation">📖</a> <a href="#translation-annekecaramin" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/anniekao"><img src="https://avatars.githubusercontent.com/u/1550506?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Annie Kao</b></sub></a><br /><a href="https://github.com/freesewing/freesewing/commits?author=anniekao" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/Anternative"><img src="https://avatars.githubusercontent.com/u/81079850?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Anternative</b></sub></a><br /><a href="https://github.com/freesewing/freesewing/commits?author=Anternative" title="Documentation">📖</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/Quiltmaster"><img src="https://avatars.githubusercontent.com/u/71795777?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Anthony</b></sub></a><br /><a href="#question-Quiltmaster" title="Answering Questions">💬</a></td>
    <td align="center"><a href="https://github.com/camerondubas"><img src="https://avatars.githubusercontent.com/u/6216460?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Cameron Dubas</b></sub></a><br /><a href="https://github.com/freesewing/freesewing/commits?author=camerondubas" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/cabi"><img src="https://avatars.githubusercontent.com/u/2596253?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Carsten Biebricher</b></sub></a><br /><a href="https://github.com/freesewing/freesewing/commits?author=cabi" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/cathyzoller"><img src="https://avatars.githubusercontent.com/u/2120275?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Cathy Zoller</b></sub></a><br /><a href="https://github.com/freesewing/freesewing/commits?author=cathyzoller" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/Chantalbijoux"><img src="https://avatars.githubusercontent.com/u/39673694?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Chantal Lapointe</b></sub></a><br /><a href="#translation-Chantalbijoux" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/dpiquet"><img src="https://avatars.githubusercontent.com/u/4688628?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Damien PIQUET</b></sub></a><br /><a href="https://github.com/freesewing/freesewing/commits?author=dpiquet" title="Code">💻</a></td>
    <td align="center"><a href="https://www.darigovresearch.com/"><img src="https://avatars.githubusercontent.com/u/30328618?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Darigov Research</b></sub></a><br /><a href="https://github.com/freesewing/freesewing/commits?author=darigovresearch" title="Documentation">📖</a> <a href="#ideas-darigovresearch" title="Ideas, Planning, & Feedback">🤔</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/ElenaFdR"><img src="https://avatars.githubusercontent.com/u/5113815?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Elena FdR</b></sub></a><br /><a href="https://github.com/freesewing/freesewing/commits?author=ElenaFdR" title="Documentation">📖</a> <a href="#blog-ElenaFdR" title="Blogposts">📝</a></td>
    <td align="center"><a href="https://emmanuelnyachoke.com/"><img src="https://avatars.githubusercontent.com/u/1908926?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Emmanuel Nyachoke</b></sub></a><br /><a href="https://github.com/freesewing/freesewing/commits?author=enyachoke" title="Code">💻</a> <a href="https://github.com/freesewing/freesewing/commits?author=enyachoke" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/EvEkSwed"><img src="https://avatars.githubusercontent.com/u/39723451?v=4?s=100" width="100px;" alt=""/><br /><sub><b>EvEkSwed</b></sub></a><br /><a href="#translation-EvEkSwed" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/Fantastik-Maman"><img src="https://avatars.githubusercontent.com/u/39785382?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Fantastik-Maman</b></sub></a><br /><a href="#translation-Fantastik-Maman" title="Translation">🌍</a></td>
    <td align="center"><a href="https://www.forresto.com/"><img src="https://avatars.githubusercontent.com/u/395307?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Forrest O.</b></sub></a><br /><a href="https://github.com/freesewing/freesewing/commits?author=forresto" title="Documentation">📖</a></td>
    <td align="center"><a href="https://www.linkedin.com/in/glennfmatthews/"><img src="https://avatars.githubusercontent.com/u/5603551?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Glenn Matthews</b></sub></a><br /><a href="https://github.com/freesewing/freesewing/commits?author=glennmatthews" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/Irapeke"><img src="https://avatars.githubusercontent.com/u/39604334?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Irapeke</b></sub></a><br /><a href="#translation-Irapeke" title="Translation">🌍</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/jsawo"><img src="https://avatars.githubusercontent.com/u/1294706?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jacek Sawoszczuk</b></sub></a><br /><a href="https://github.com/freesewing/freesewing/commits?author=jsawo" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/jgfichte"><img src="https://avatars.githubusercontent.com/u/1787162?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jason Williams</b></sub></a><br /><a href="https://github.com/freesewing/freesewing/commits?author=jgfichte" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/jejacks0n"><img src="https://avatars.githubusercontent.com/u/13765?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jeremy Jackson</b></sub></a><br /><a href="https://github.com/freesewing/freesewing/commits?author=jejacks0n" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Joebidido"><img src="https://avatars.githubusercontent.com/u/39796210?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Joebidido</b></sub></a><br /><a href="#translation-Joebidido" title="Translation">🌍</a></td>
    <td align="center"><a href="https://joost.at/"><img src="https://avatars.githubusercontent.com/u/1708494?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Joost De Cock</b></sub></a><br /><a href="#maintenance-joostdecock" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://github.com/joshessman"><img src="https://avatars.githubusercontent.com/u/9941074?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Josh Essman</b></sub></a><br /><a href="https://github.com/freesewing/freesewing/commits?author=joshessman" title="Documentation">📖</a></td>
    <td align="center"><a href="http://www.earth.li/~kake/"><img src="https://avatars.githubusercontent.com/u/1956810?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Kake</b></sub></a><br /><a href="https://github.com/freesewing/freesewing/commits?author=KakeLP" title="Documentation">📖</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://twitter.com/kapunahele"><img src="https://avatars.githubusercontent.com/u/4116963?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Kapunahele Wong</b></sub></a><br /><a href="https://github.com/freesewing/freesewing/commits?author=kapunahelewong" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/tangerineshark"><img src="https://avatars.githubusercontent.com/u/70777269?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Karen</b></sub></a><br /><a href="https://github.com/freesewing/freesewing/commits?author=tangerineshark" title="Documentation">📖</a> <a href="#eventOrganizing-tangerineshark" title="Event Organizing">📋</a></td>
    <td align="center"><a href="https://github.com/mcgnly"><img src="https://avatars.githubusercontent.com/u/5653631?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Katie McGinley</b></sub></a><br /><a href="https://github.com/freesewing/freesewing/commits?author=mcgnly" title="Documentation">📖</a></td>
    <td align="center"><a href="http://www.kieranklaassen.com/"><img src="https://avatars.githubusercontent.com/u/209089?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Kieran Klaassen</b></sub></a><br /><a href="https://github.com/freesewing/freesewing/commits?author=kieranklaassen" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Kittycatou"><img src="https://avatars.githubusercontent.com/u/48165583?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Kittycatou</b></sub></a><br /><a href="#translation-Kittycatou" title="Translation">🌍</a></td>
    <td align="center"><a href="https://www.krishoward.org/"><img src="https://avatars.githubusercontent.com/u/5946286?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Kris</b></sub></a><br /><a href="https://github.com/freesewing/freesewing/commits?author=web-goddess" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/kristinruben"><img src="https://avatars.githubusercontent.com/u/17237479?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Kristin Ruben</b></sub></a><br /><a href="https://github.com/freesewing/freesewing/commits?author=kristinruben" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/Loudepeuter"><img src="https://avatars.githubusercontent.com/u/38081954?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Loudepeuter</b></sub></a><br /><a href="#translation-Loudepeuter" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/lucibytes"><img src="https://avatars.githubusercontent.com/u/77203781?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Lucian</b></sub></a><br /><a href="#eventOrganizing-lucibytes" title="Event Organizing">📋</a></td>
    <td align="center"><a href="https://github.com/manufakturedelweiss"><img src="https://avatars.githubusercontent.com/u/38063391?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Marcus</b></sub></a><br /><a href="#translation-manufakturedelweiss" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/martintribo"><img src="https://avatars.githubusercontent.com/u/1613442?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Martin Tribo</b></sub></a><br /><a href="https://github.com/freesewing/freesewing/commits?author=martintribo" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/nadege"><img src="https://avatars.githubusercontent.com/u/3792171?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Nadege Michel</b></sub></a><br /><a href="https://github.com/freesewing/freesewing/commits?author=nadege" title="Tests">⚠️</a> <a href="https://github.com/freesewing/freesewing/commits?author=nadege" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/nataliasayang"><img src="https://avatars.githubusercontent.com/u/48160791?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Natalia</b></sub></a><br /><a href="https://github.com/freesewing/freesewing/commits?author=nataliasayang" title="Code">💻</a> <a href="#design-nataliasayang" title="Design">🎨</a> <a href="#blog-nataliasayang" title="Blogposts">📝</a></td>
    <td align="center"><a href="http://yergler.net/"><img src="https://avatars.githubusercontent.com/u/510875?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Nathan Yergler</b></sub></a><br /><a href="https://github.com/freesewing/freesewing/commits?author=nyergler" title="Documentation">📖</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/nicholasdower"><img src="https://avatars.githubusercontent.com/u/9117775?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Nick Dower</b></sub></a><br /><a href="https://github.com/freesewing/freesewing/commits?author=nicholasdower" title="Documentation">📖</a> <a href="https://github.com/freesewing/freesewing/commits?author=nicholasdower" title="Code">💻</a> <a href="https://github.com/freesewing/freesewing/issues?q=author%3Anicholasdower" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://pat.forringer.com/"><img src="https://avatars.githubusercontent.com/u/136456?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Patrick Forringer</b></sub></a><br /><a href="#plugin-destos" title="Plugin/utility libraries">🔌</a></td>
    <td align="center"><a href="http://pd75.github.io/"><img src="https://avatars.githubusercontent.com/u/10294795?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Paul</b></sub></a><br /><a href="https://github.com/freesewing/freesewing/commits?author=PD75" title="Documentation">📖</a> <a href="#blog-PD75" title="Blogposts">📝</a> <a href="#translation-PD75" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/phillipthelen"><img src="https://avatars.githubusercontent.com/u/298062?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Phillip Thelen</b></sub></a><br /><a href="https://github.com/freesewing/freesewing/commits?author=phillipthelen" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Pixieish"><img src="https://avatars.githubusercontent.com/u/32991415?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Pixieish</b></sub></a><br /><a href="https://github.com/freesewing/freesewing/commits?author=Pixieish" title="Documentation">📖</a></td>
    <td align="center"><a href="https://www.uza.be/persoon/prof-dr-sorcha-ni-dhubhghaill"><img src="https://avatars.githubusercontent.com/u/30624634?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Prof. dr. Sorcha Ní Dhubhghaill</b></sub></a><br /><a href="https://github.com/freesewing/freesewing/commits?author=sorchanidhubhghaill" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/QuentinFelix"><img src="https://avatars.githubusercontent.com/u/5288091?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Quentin FELIX</b></sub></a><br /><a href="https://github.com/freesewing/freesewing/commits?author=QuentinFelix" title="Code">💻</a> <a href="#design-QuentinFelix" title="Design">🎨</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/RikHekker"><img src="https://avatars.githubusercontent.com/u/31843274?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Rik Hekker</b></sub></a><br /><a href="https://github.com/freesewing/freesewing/issues?q=author%3ARikHekker" title="Bug reports">🐛</a></td>
    <td align="center"><a href="http://resume.livingston-gray.com/faq.html"><img src="https://avatars.githubusercontent.com/u/6462?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Sam Livingston-Gray</b></sub></a><br /><a href="https://github.com/freesewing/freesewing/commits?author=geeksam" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/sannek"><img src="https://avatars.githubusercontent.com/u/17491062?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Sanne</b></sub></a><br /><a href="https://github.com/freesewing/freesewing/commits?author=sannek" title="Code">💻</a> <a href="https://github.com/freesewing/freesewing/commits?author=sannek" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/Tyrannogina"><img src="https://avatars.githubusercontent.com/u/19556565?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Sara Latorre</b></sub></a><br /><a href="#translation-Tyrannogina" title="Translation">🌍</a></td>
    <td align="center"><a href="https://www.instagram.com/celine_mge/"><img src="https://avatars.githubusercontent.com/u/57619777?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Slylele</b></sub></a><br /><a href="https://github.com/freesewing/freesewing/commits?author=Slylele" title="Documentation">📖</a> <a href="#translation-Slylele" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/Soazillon"><img src="https://avatars.githubusercontent.com/u/40845940?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Soazillon</b></sub></a><br /><a href="#translation-Soazillon" title="Translation">🌍</a></td>
    <td align="center"><a href="http://metafly.info/"><img src="https://avatars.githubusercontent.com/u/961256?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Stefan Sydow</b></sub></a><br /><a href="#translation-stsydow" title="Translation">🌍</a> <a href="https://github.com/freesewing/freesewing/commits?author=stsydow" title="Documentation">📖</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/TriploidTree"><img src="https://avatars.githubusercontent.com/u/4170521?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Tríona</b></sub></a><br /><a href="https://github.com/freesewing/freesewing/commits?author=TriploidTree" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/theUnmutual"><img src="https://avatars.githubusercontent.com/u/22374635?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Unmutual</b></sub></a><br /><a href="https://github.com/freesewing/freesewing/commits?author=theUnmutual" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/woutervdub"><img src="https://avatars.githubusercontent.com/u/24414629?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Wouter van Wageningen</b></sub></a><br /><a href="https://github.com/freesewing/freesewing/commits?author=woutervdub" title="Code">💻</a> <a href="#design-woutervdub" title="Design">🎨</a> <a href="#tool-woutervdub" title="Tools">🔧</a></td>
    <td align="center"><a href="https://github.com/amysews"><img src="https://avatars.githubusercontent.com/u/25280778?v=4?s=100" width="100px;" alt=""/><br /><sub><b>amysews</b></sub></a><br /><a href="https://github.com/freesewing/freesewing/commits?author=amysews" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/beautifulsummermoon"><img src="https://avatars.githubusercontent.com/u/40396388?v=4?s=100" width="100px;" alt=""/><br /><sub><b>beautifulsummermoon</b></sub></a><br /><a href="#translation-beautifulsummermoon" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/berce"><img src="https://avatars.githubusercontent.com/u/10439709?v=4?s=100" width="100px;" alt=""/><br /><sub><b>berce</b></sub></a><br /><a href="https://github.com/freesewing/freesewing/commits?author=berce" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/biou"><img src="https://avatars.githubusercontent.com/u/1340376?v=4?s=100" width="100px;" alt=""/><br /><sub><b>biou</b></sub></a><br /><a href="https://github.com/freesewing/freesewing/commits?author=biou" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/bobgeorgethe3rd"><img src="https://avatars.githubusercontent.com/u/16866285?v=4?s=100" width="100px;" alt=""/><br /><sub><b>bobgeorgethe3rd</b></sub></a><br /><a href="https://github.com/freesewing/freesewing/commits?author=bobgeorgethe3rd" title="Code">💻</a> <a href="https://github.com/freesewing/freesewing/commits?author=bobgeorgethe3rd" title="Documentation">📖</a> <a href="#design-bobgeorgethe3rd" title="Design">🎨</a></td>
    <td align="center"><a href="https://github.com/brmlyklr"><img src="https://avatars.githubusercontent.com/u/22308713?v=4?s=100" width="100px;" alt=""/><br /><sub><b>brmlyklr</b></sub></a><br /><a href="https://github.com/freesewing/freesewing/commits?author=brmlyklr" title="Documentation">📖</a></td>
    <td align="center"><a href="http://www.chrisbarrett.fr"><img src="https://avatars.githubusercontent.com/u/2373249?v=4?s=100" width="100px;" alt=""/><br /><sub><b>chri5b</b></sub></a><br /><a href="https://github.com/freesewing/freesewing/commits?author=chri5b" title="Code">💻</a> <a href="https://github.com/freesewing/freesewing/commits?author=chri5b" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/dingcycle"><img src="https://avatars.githubusercontent.com/u/1681985?v=4?s=100" width="100px;" alt=""/><br /><sub><b>dingcycle</b></sub></a><br /><a href="#translation-dingcycle" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/econo202"><img src="https://avatars.githubusercontent.com/u/34138153?v=4?s=100" width="100px;" alt=""/><br /><sub><b>econo202</b></sub></a><br /><a href="https://github.com/freesewing/freesewing/commits?author=econo202" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/ericamattos"><img src="https://avatars.githubusercontent.com/u/4341417?v=4?s=100" width="100px;" alt=""/><br /><sub><b>ericamattos</b></sub></a><br /><a href="#translation-ericamattos" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/fightingrabbit"><img src="https://avatars.githubusercontent.com/u/25751445?v=4?s=100" width="100px;" alt=""/><br /><sub><b>fightingrabbit</b></sub></a><br /><a href="https://github.com/freesewing/freesewing/commits?author=fightingrabbit" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/DocSpencer77"><img src="https://avatars.githubusercontent.com/u/43393580?v=4?s=100" width="100px;" alt=""/><br /><sub><b>gaylyndie</b></sub></a><br /><a href="https://github.com/freesewing/freesewing/commits?author=DocSpencer77" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/grimlokason"><img src="https://avatars.githubusercontent.com/u/5112238?v=4?s=100" width="100px;" alt=""/><br /><sub><b>grimlokason</b></sub></a><br /><a href="https://github.com/freesewing/freesewing/commits?author=grimlokason" title="Code">💻</a></td>
    <td align="center"><a href="https://weblog.redisdead.net"><img src="https://avatars.githubusercontent.com/u/6494414?v=4?s=100" width="100px;" alt=""/><br /><sub><b>hellgy</b></sub></a><br /><a href="#design-hellgy" title="Design">🎨</a></td>
    <td align="center"><a href="https://github.com/marckiesel"><img src="https://avatars.githubusercontent.com/u/39653780?v=4?s=100" width="100px;" alt=""/><br /><sub><b>marckiesel</b></sub></a><br /><a href="#translation-marckiesel" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/starfetch"><img src="https://avatars.githubusercontent.com/u/80041179?v=4?s=100" width="100px;" alt=""/><br /><sub><b>starfetch</b></sub></a><br /><a href="https://github.com/freesewing/freesewing/commits?author=starfetch" title="Code">💻</a> <a href="https://github.com/freesewing/freesewing/commits?author=starfetch" title="Documentation">📖</a> <a href="#translation-starfetch" title="Translation">🌍</a> <a href="#design-starfetch" title="Design">🎨</a></td>
    <td align="center"><a href="https://github.com/ttimearl"><img src="https://avatars.githubusercontent.com/u/77916590?v=4?s=100" width="100px;" alt=""/><br /><sub><b>ttimearl</b></sub></a><br /><a href="#content-ttimearl" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/chrisgloom"><img src="https://avatars.githubusercontent.com/u/15905991?v=4?s=100" width="100px;" alt=""/><br /><sub><b>tuesgloomsday</b></sub></a><br /><a href="https://github.com/freesewing/freesewing/commits?author=chrisgloom" title="Documentation">📖</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/valadaptive"><img src="https://avatars.githubusercontent.com/u/79560998?v=4?s=100" width="100px;" alt=""/><br /><sub><b>valadaptive</b></sub></a><br /><a href="https://github.com/freesewing/freesewing/commits?author=valadaptive" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/viocky"><img src="https://avatars.githubusercontent.com/u/39279173?v=4?s=100" width="100px;" alt=""/><br /><sub><b>viocky</b></sub></a><br /><a href="#translation-viocky" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/woolishboy"><img src="https://avatars.githubusercontent.com/u/57816321?v=4?s=100" width="100px;" alt=""/><br /><sub><b>woolishboy</b></sub></a><br /><a href="https://github.com/freesewing/freesewing/commits?author=woolishboy" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/cloutiy"><img src="https://avatars.githubusercontent.com/u/8433147?v=4?s=100" width="100px;" alt=""/><br /><sub><b>yc</b></sub></a><br /><a href="#translation-cloutiy" title="Translation">🌍</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

