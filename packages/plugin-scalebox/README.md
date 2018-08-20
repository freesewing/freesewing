<p align="center">
  <a title="Go to freesewing.org" href="https://freesewing.org/"><img src="https://freesewing.org/img/logo/black.svg" align="center" width="150px" alt="Freesewing logo"/></a>
</p>
<h4 align="center"><em>&nbsp;<a title="Go to freesewing.org" href="https://freesewing.org/">freesewing</a></em>
<br><sup>a library for made-to-measure sewing patterns</sup>
</h4>

# plugin-scalebox

A freesewing plugin to add a scalebox to your pattern.

## Usage

To load this plugin, add it to your instantiated pattern.

On node.js:

```js
import freesewing from 'freesewing'
import scalebox from '@freesewing/plugin-scalebox'

let pattern = new freesewing.Pattern()
  .with(scalebox);
```

In the browser, this plugin will register as `freesewing.plugins.scalebox`:

```html
<script type="text/javascript" src="https://unpkg.com/freesewing"></script>
<script type="text/javascript" src="https://unpkg.com/@freesewing/plugin-scalebox"></script>

<script>
var pattern = new freesewing.Patter()
  .with(freesewing.plugins.scalebox);
</script>
```

You can now use the **scalebox** macro as such:

```js
macro('scalebox', {
  at: new Point(0,0),
  lead: 'This is the lead',
  title: 'This is the title',
  text: "And this is the text\nwhich has room for a few lines should you\nfeel so inclined"
});
```

## Configuration

The macro configuration object takes the following properties:

Name     |  Description                                | Default
---------|---------------------------------------------|-------------------
`at`     |  A Point object to anchor the scalebox on   | 
`lead`   |  The lead text                              | freesewing 
`title`  |  The lead text                              | pattern name & version 
`text`   |  The lead text                              | *See example below*


## Example

This plugin provides the **scalebox** macro that inserts a scalebox like this:

![Example of the scalebox inserted by this plugin](https://github.com/freesewing/plugin-scalebox/raw/master/img/example.png)

These are the default values. The example under Usage above would render like this:

![Example of the scalebox inserted by this plugin](https://github.com/freesewing/plugin-scalebox/raw/master/img/custom.png)

## Install

To install, run:

```sh
npm install @freesewing/plugin-scalebox
```

## Build

To build this plugin, run:

```sh
npm run build
```

