<p align="center">
  <a title="Go to freesewing.org" href="https://freesewing.org/"><img src="https://freesewing.org/img/logo/black.svg" align="center" width="150px" alt="Freesewing logo"/></a>
</p>
<h4 align="center"><em>&nbsp;<a title="Go to freesewing.org" href="https://freesewing.org/">freesewing</a></em>
<br><sup>a library for made-to-measure sewing patterns</sup>
</h4>

# freesewing / plugins / macro-title

This is a macro for [freesewing](https://github.com/freesewing/freesewing) 
to add a title to your pattern part.

## Install

```sh
npm install @freesewing-plugins/macro-title --save
```

## Loading the plugin

Plugins are loaded by the `withPlugin` method of an instantiated freesewing pattern:

```js
import F from 'freesewing';
import partTitle from '@freesewing-plugins/macro-title';

var pattern = new F.pattern()
  .withPlugin(partTitle);
```

## Using the plugin

This plugin provides the `title` macro which you can call with the `macro` method on an instantiated pattern part:

```js
part.macro('title', {
  at: points.titleAnchor
, nr: 2
, name: 'backBlock'
, pattern: 'brian'
});
```

### Parameters

  - `at`: A point object to anchor the title on
  - `nr`: The part number
  - `name`: The part name
  - `pattern`: The name of the pattern
  
As all freesewing macros, bundle these parameters into a single object.

## Example

FIXME: include example
