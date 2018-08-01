<p align="center">
  <a title="Go to freesewing.org" href="https://freesewing.org/"><img src="https://freesewing.org/img/logo/black.svg" align="center" width="150px" alt="Freesewing logo"/></a>
</p>
<h4 align="center"><em>&nbsp;<a title="Go to freesewing.org" href="https://freesewing.org/">freesewing</a></em>
<br><sup>a library for made-to-measure sewing patterns</sup>
</h4>

# freesewing / plugins / macro-cutonfold

This is a macro for [freesewing](https://github.com/freesewing/freesewing) 
to add cut-on-fold indicators on your patterns.

## Install

```sh
npm install @freesewing-plugins/macro-cutonfold --save
```

## Loading the plugin

Plugins are loaded by the `withPlugin` method of an instantiated freesewing pattern:

```js
import F from 'freesewing';
import cutonfold from '@freesewing-plugins/macro-cutonfold';

var pattern = new F.pattern()
  .withPlugin(cutonfold);
```

## Using the plugin

This plugin provides the `cutonfold` macro which you can call with the `macro` method on an instantiated pattern part:

```js
part.macro('cutonfold', {
  from: points.cbNeck
, to: points.cbHips
});
```

### Parameters

  - `to`: A point object at the start of the cut-on-fold indicator
  - `from`: A point object at the end of the cut-on-fold indicator
  
As all freesewing macros, bundle these parameters into a single object.

## Example

FIXME: include example
