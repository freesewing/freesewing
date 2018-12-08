<p align="center">
  <a title="Go to freesewing.org" href="https://freesewing.org/"><img src="https://freesewing.org/img/logo/black.svg" align="center" width="150px" alt="Freesewing logo"/></a>
</p>
<h4 align="center"><em>&nbsp;<a title="Go to freesewing.org" href="https://freesewing.org/">freesewing</a></em>
<br><sup>a library for made-to-measure sewing patterns</sup>
</h4>
<p align="center">
  <a href="https://travis-ci.org/freesewing/plugin-logo"><img src="https://badgen.net/travis/freesewing/plugin-logo/master" alt="Travis build"></a>
  <a href="https://www.npmjs.com/package/@freesewing/plugin-logo"><img src="https://badgen.net/npm/v/@freesewing/plugin-logo" alt="Version"></a>
  <a href="https://www.npmjs.com/package/@freesewing/plugin-logo"><img src="https://badgen.net/npm/license/@freesewing/plugin-logo" alt="License"></a>
  <a href="https://codecov.io/gh/freesewing/plugin-logo"><img src="https://badgen.net/codecov/c/github/freesewing/plugin-logo/master" alt="Code coverage"></a>
  <a href="https://deepscan.io/dashboard#view=project&pid=3267&bid=27574"><img src="https://deepscan.io/api/projects/3267/branches/27574/badge/grade.svg" alt="DeepScan grade"></a>
  <a href="https://gitter.im/freesewing/freesewing"><img src="https://badgen.net/badge/chat/on%20Gitter/cyan" alt="Chat on Gitter"></a>
  <a href="https://freesewing.org/patrons/join"><img src="https://badgen.net/badge/become/a%20Patron/FF5B77" alt="Become a Patron"></a>
</p>

# plugin-logo

A freesewing plugin to add our logo to your pattern.

## Install

Install this plugin from NPM:

```sh
npm install --save @freesewing/plugin-logo
```

## Usage

To load this plugin, add it to your instantiated pattern:

```js
import pattern from '@freesewing/pattern-brian'
import theme from '@freesewing/plugin-theme'
import logo from '@freesewing/plugin-logo'

pattern.with(theme).with(logo);
```

You now have the `logo` snippet available:

```js
snippets.logo = new Snippet('logo', points.logo);
```

**Good to know:**

 - The logo's anchor point is it's chin
 - Like any snippet, you can scale the logo by setting the `data-scale` attribbute on the snippet:
 
```js
snippets.logo = new Snippet('logo', points.logo)
 .attr('data-scale', 2); // Make it twice as big
```


## Where to get help

Questions? Stuck? The [freesewing chat room on Gitter](https://gitter.im/freesewing/freesewing)
is the best place to ask for help.
