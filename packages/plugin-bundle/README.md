<p align="center">
<a title="Go to freesewing.org" href="https://freesewing.org/"><img src="https://freesewing.org/logo.svg" align="center" width="150px" alt="FreeSewing logo"/></a>
<br>
<a href="https://freesewing.org/">FreeSewing</a>
</p>
<p align="center">An open source platform for made-to-measure sewing patterns</p>
<p align='center'><a
  href="https://www.npmjs.com/package/@freesewing/plugin-bundle"
  title="@freesewing/plugin-bundle on NPM"
  ><img src="https://img.shields.io/npm/v/@freesewing/plugin-bundle.svg"
  alt="@freesewing/plugin-bundle on NPM"/>
  </a><a
  href="https://opensource.org/licenses/MIT"
  title="License: MIT"
  ><img src="https://img.shields.io/npm/l/@freesewing/plugin-bundle.svg?label=License"
  alt="License: MIT"/>
  </a><a
  href="https://deepscan.io/dashboard#view=project&tid=2114&pid=2993&bid=23256"
  title="Code quality on DeepScan"
  ><img src="https://deepscan.io/api/teams/2114/projects/2993/branches/23256/badge/grade.svg"
  alt="Code quality on DeepScan"/>
  </a><a
  href="https://github.com/freesewing/freesewing/issues?q=is%3Aissue+is%3Aopen+label%3Apkg%3Aplugin-bundle"
  title="Open issues tagged pkg:plugin-bundle"
  ><img src="https://img.shields.io/github/issues/freesewing/freesewing/pkg:plugin-bundle.svg?label=Issues"
  alt="Open issues tagged pkg:plugin-bundle"/>
  </a></p><p align='center'><a
  href="https://twitter.com/freesewing_org"
  title="Follow @freesewing_org on Twitter"
  ><img src="https://img.shields.io/badge/%F3%A0%80%A0-Follow%20us-blue.svg?logo=twitter&logoColor=white&logoWidth=15"
  alt="Follow @freesewing_org on Twitter"/>
  </a><a
  href="https://gitter.im/freesewing/chat"
  title="Chat with us on Gitter"
  ><img src="https://img.shields.io/badge/%F3%A0%80%A0-Chat%20with%20us-CA0547.svg?logo=gitter&logoColor=white&logoWidth=15"
  alt="Chat with us on Gitter"/>
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

# @freesewing/plugin-bundle

An umbrella package of 8 essential FreeSewing build-time plugins


# Plugins

 1)  [plugin-cutonfold](https://github.com/freesewing/plugin-cutonfold) : Add cut-on-fold indicators to your patterns 
 2)  [plugin-dimension](https://github.com/freesewing/plugin-dimension) : Add dimensions to your (paperless) patterns 
 3)  [plugin-grainline](https://github.com/freesewing/plugin-grainline) : Add grainline indicators to your patterns 
 4)  [plugin-logo](https://github.com/freesewing/plugin-logo) : Add a scalebox to your patterns
 5)  [plugin-scalebox](https://github.com/freesewing/plugin-scalebox) : Add pretty titles to your pattern parts 
 6)  [plugin-title](https://github.com/freesewing/plugin-title) : Add pretty titles to your pattern parts 
 7)  [plugin-round](https://github.com/freesewing/plugin-title) : Rounds corners
 8)  [plugin-sprinkle](https://github.com/freesewing/plugin-sprinkle) : Add multiple snippets to your pattern

Note that these are all **build-time plugins**. In other words, plugins used by developers/pattern designers,
rather than run-time plugins that are used when generating patterns.

Without exception, all freesewing patterns use all these plugins, so it made sense to bundle them.

## Usage

To load this plugin, add it to your instantiated pattern.

On node.js:

```js
import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'

let pattern = new freesewing.Pattern().with(plugins);
```


## About FreeSewing 🤔

Where the world of makers and developers collide, that's where you'll find FreeSewing.

Our [core library](https://freesewing.dev/) is a *batteries-included* toolbox
for parametric design of sewing patterns. It's a modular system (check our list
of [plugins](https://freesewing.dev/plugins) and getting started is as simple as:

```bash
npm init freesewing-pattern
```

The [getting started](https://freesewing.dev/start) section on [freesewing.dev](https://freesewing.dev/) is a good
entrypoint to our documentation, but you'll find a lot more there, including
our [API reference](https://freesewing.dev/api),
as well as [our turorial](https://freesewing.dev/tutorial),
and [best practices](https://freesewing.dev/do).

If you're a maker, checkout [freesewing.org](https://freesewing/) where you can generate
our sewing patterns adapted to your measurements.

## Support FreeSewing: Become a patron 🥰

FreeSewing is an open source project run by a community, 
and financially supported by our patrons.

If you feel what we do is worthwhile, you too 
should [become a patron](https://freesewing.org/patrons/join).

## Links 👩‍💻

 - 💻 Makers website: [freesewing.org](https://freesewing.org)
 - 💻 Developers website: [freesewing.dev](https://freesewing.org)
 - 💬 Chat: [gitter.im/freesewing](https://gitter.im/freesewing/chat)
 - 🐦 Twitter: [@freesewing_org](https://twitter.com/freesewing_org)
 - 📷 Instagram: [@freesewing_org](https://instagram.com/freesewing_org)

## License: MIT 🤓

© [Joost De Cock](https://github.com/joostdecock).  
See [the license file](https://github.com/freesewing/freesewing/blob/develop/LICENSE) for details.

## Where to get help 🤯

Our [chatroom on Gitter](https://gitter.im/freesewing/chat) is the best place to ask questions,
share your feedback, or just hang out.

If you want to report a problem, please [create an issue](https://github.com/freesewing/freesewing/issues/new).
