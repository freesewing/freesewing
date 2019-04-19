> **Note**: This is part of version 2 of FreeSewing.  
> It is a work in progress, and not ready for prime-time yet
> 
> For all questions, please come say hellp in [our chatroom on Gitter](https://gitter.im/).

<p align="center"><a title="Go to freesewing.org" href="https://freesewing.org/"><img src="https://freesewing.org/img/logo/black.svg" align="center" width="150px" alt="Freesewing logo"/></a></p>
<p>FreeSewing is a free and open source library for made-to-measure sewing patterns</p>
<p align="center"><a href="https://gitter.im/freesewing/freesewing" title="Chat with us on Gitter"><img src="https://badgen.net/badge/Gitter/Chat%20with%20us/CA0547?icon=gitter" alt="Chat with us on Gitter"/></a><a href="https://twitter.com/freesewing_org" title="Follow @freesewing_org on Twitter"><img src="https://badgen.net/badge/Twitter/@freesewing_org/1DA1F2?icon=twitter" alt="Follow @freesewing_org on Twitter"/></a><a href="https://github.com/freesewing" title="FreeSewing on GitHub"><img src="https://badgen.net/badge/GitHub/freesewing/269F42?icon=github" alt="FreeSewing on GitHub"/></a><a href="https://freesewing.org/patrons/join" title="Become a FreeSewing Patron"><img src="https://badgen.net/badge/Become%20a/Patron/purple" alt="Become a FreeSewing Patron"/></a><a href="https://opensource.org/licenses/MIT" title="License: MIT"><img src="https://badgen.net/badge/License/MIT/blue" alt="License: MIT"/></a><a href="https://freesewing.org/patrons/join" title="Become a FreeSewing Patron"><img src="https://badgen.net/badge/Become%20a/Patron/purple" alt="Become a FreeSewing Patron"/></a><a href="https://freesewing.org/" title="FreeSewing.org"><img src="https://badgen.net/badge/FreeSewing/.org/3DA639" alt="FreeSewing.org"/></a><a href="https://freesewing.dev/" title="FreeSewing.dev"><img src="https://badgen.net/badge/FreeSewing/.dev/3DA639" alt="FreeSewing.dev"/></a></p>

# @freesewing&#x2F;plugin-bust

A FreeSewing plugin that helps with bust-adjusting menswear patterns

<p align="center">
  <a title="Go to freesewing.org" href="https://freesewing.org/"><img src="https://freesewing.org/img/logo/black.svg" align="center" width="150px" alt="Freesewing logo"/></a>
</p>
<h4 align="center"><em>&nbsp;<a title="Go to freesewing.org" href="https://freesewing.org/">freesewing</a></em>
<br><sup>a library for made-to-measure sewing patterns</sup>
</h4>
<p align="center">
  <a href="https://travis-ci.org/freesewing/plugin-bust"><img src="https://badgen.net/travis/freesewing/plugin-bust/master" alt="Travis build"></a>
  <a href="https://www.npmjs.com/package/@freesewing/plugin-bust"><img src="https://badgen.net/npm/v/@freesewing/plugin-bust" alt="Version"></a>
  <a href="https://www.npmjs.com/package/@freesewing/plugin-bust"><img src="https://badgen.net/npm/license/@freesewing/plugin-bust" alt="License"></a>
  <a href="https://codecov.io/gh/freesewing/plugin-bust"><img src="https://badgen.net/codecov/c/github/freesewing/plugin-bust/master" alt="Code coverage"></a>
  <a href="https://deepscan.io/dashboard#view=project&pid=3267&bid=27574"><img src="https://deepscan.io/api/projects/3267/branches/27574/badge/grade.svg" alt="DeepScan grade"></a>
  <a href="https://gitter.im/freesewing/freesewing"><img src="https://badgen.net/badge/chat/on%20Gitter/cyan" alt="Chat on Gitter"></a>
  <a href="https://freesewing.org/patrons/join"><img src="https://badgen.net/badge/become/a%20Patron/FF5B77" alt="Become a Patron"></a>
</p>

# plugin-bust

A freesewing plugin that helps with bust-adjusting menswear pattern.

> This is a build-time plugin, which means its aimed at pattern designers.

## Usage
 
The goal of this plugin is to make it easier to adapt extended menswear patterns for breasts.

When adapting a menswear pattern for breasts, you follow the *full-bust-adjustment* approach:

 - Draft the pattern with your *high bust* measurement as *chest circumference*
 - Add a bust dart to create room for the full bust measurement

This plugin helps to accomplish that by:

 - Setting the `fullBust` measurement to the value of the `chestCircumference` measurement
 - Setting the `chestCircumference` measurement to the value of the `highBust` measurement

Now you can extend any freesewing menswear pattern, and it will be drafted with the
`chestCircumference` value replaced with the `highBust`.

The original chest circumference (full bust) is now available in the `fullBust` measurement.

> Note: Only when extending menswear patterns
>
> If you are designing a womenswear pattern from scratch, you don't need this.
> You can simply use the measurements of your choice.
>
> This plugin is to be used when you extend a menswear pattern and want to make
> a womenswear version.


## Install

Install this plugin from NPM:

```sh
npm install --save @freesewing/plugin-bust
```

## Usage

To load this plugin, load it when instantiating your instantiated pattern:

```js
import freesewing from 'freesewing'
import plugins from "@freesewing/plugin-bundle";
import bust from '@freesewing/plugin-bust'

const Carlita = new freesewing.Design(config, [
  plugins,
  bust
]);
```

## Where to get help

Questions? Stuck? The [freesewing chat room on Gitter](https://gitter.im/freesewing/freesewing)
is the best place to ask for help.


## About FreeSewing

Where the world of makers and developers collide, that's where you'll find FreeSewing.

Our [core library](https://freesewing.dev/en/freesewing) is a *batteries-included* toolbox
for parametric design of sewing patterns. It's a modular system (check our list
of [plugins](https://freesewing.dev/en/plugins) and getting started is as simple as:

```bash
npm init freesewing-pattern
```

The [getting started] section on [freesewing.dev](https://freesewing.dev/) is a good
entrypoint to our documentation, but you'll find a lot more there, including
our [API documentation](https://freesewing.dev/en/freesewing/api),
as well as [examples](https://freesewing.dev/en/freesewing/examples),
and [best practices](https://freesewing.dev/en/do).

If you're a maker, checkout [freesewing.org](https://freesewing/) where you can generate
our sewing patterns adapted to your measurements.

## ♥️ Support FreeSewing: Become a patron ♥️

FreeSewing is an open source project run by a community, 
and financially supported by our patrons.

If you feel what we do is worthwhile, you too 
should [become a patron](https://freesewing.org/patrons/join).

## Links

 - 💻 Makers website: [freesewing.org](https://freesewing.org)
 - 💻 Developers website: [freesewing.dev](https://freesewing.org)
 - 💬 Chat: [gitter.im/freesewing](https://gitter.im/freesewing/freesewing)
 - 🐦 Twitter: [@freesewing_org](https://twitter.com/freesewing_org)
 - 📷 Instagram: [@freesewing_org](https://instagram.com/freesewing_org)
