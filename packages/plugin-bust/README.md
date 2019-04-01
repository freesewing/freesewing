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
