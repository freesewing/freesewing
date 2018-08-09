<p align="center">
  <a title="Go to freesewing.org" href="https://freesewing.org/"><img src="https://freesewing.org/img/logo/black.svg" align="center" width="150px" alt="Freesewing logo"/></a>
</p>
<h4 align="center"><em>&nbsp;<a title="Go to freesewing.org" href="https://freesewing.org/">freesewing</a></em>
<br><sup>a library for made-to-measure sewing patterns</sup>
</h4>

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

You now have the following snippets available:

 - logo-xs
 - logo-sm
 - logo
 - logo-lg
 - logo-xl
 - logo-xxl
 
You can use them as such:

```sh
snippets.logo = new Snippet('logo-sm', points.logo);
```

## Example

Below is an example of the logo and the different sizes.
As you can see, the logo's anchor point is the chin.

![Example of the logo plugin](https://github.com/freesewing/plugin-logo/raw/master/img/example.png)

## Where to get help

Questions? Stuck? The [freesewing chat room on Gitter](https://gitter.im/freesewing/freesewing)
is the best place to ask for help.
