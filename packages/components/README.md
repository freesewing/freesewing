<p align="center">
  <a title="Go to freesewing.org" href="https://freesewing.org/"><img src="https://freesewing.org/img/logo/black.svg" align="center" width="150px" alt="Freesewing logo"/></a>
</p>
<h4 align="center"><em>&nbsp;<a title="Go to freesewing.org" href="https://freesewing.org/">freesewing</a></em>
<br><sup>a library for made-to-measure sewing patterns</sup>
</h4>
<p align="center">
  <a href="https://www.npmjs.com/package/@freesewing/components"><img src="https://badgen.net/npm/v/@freesewing/components" alt="Version"></a>
  <a href="https://www.npmjs.com/package/@freesewing/components"><img src="https://badgen.net/npm/license/@freesewing/components" alt="License"></a>
  <a href="https://deepscan.io/dashboard#view=project&tid=2114&pid=4633&bid=37171"><img src="https://deepscan.io/api/teams/2114/projects/4633/branches/37171/badge/grade.svg" alt="DeepScan grade"></a>
  <a href="https://gitter.im/freesewing/freesewing"><img src="https://badgen.net/badge/chat/on%20Gitter/cyan" alt="Chat on Gitter"></a>
  <a href="https://freesewing.org/patrons/join"><img src="https://badgen.net/badge/become/a%20Patron/FF5B77" alt="Become a Patron"></a>
</p>

# @freesewing/components

This is a [Material UI](https://material-ui.com) theme that's used by the freesewing web sites.


## Install

```
npm i --save @freesewing/components
```

## Getting the theme

After installing [@freesewing/components](https://www.npmjs.com/package/@freesewing/components), 
import it:

```js 
import createTheme from "@freesewing/components";
```

The default export (`createTheme` in our example above) is a method that 
calls [`createMuiTheme`](https://material-ui.com/customization/themes/#createmuitheme-options-theme) under the hood. 
It takes a single argument, the theme name:

```
object createTheme(string themeName = "light")
```

If the name you pass it is `dark` you'll get the dark theme. 
Anything else, and you'll get the light theme.

## Using the theme

To use this theme, you need to pass it as the `theme` prop to
[`muiThemeProvider`](https://material-ui.com/customization/themes/#muithemeprovider):

```js 
<MuiThemeProvider theme={createTheme(true)}>
  // ... your app here
</MuiThemeProvider>
```

See [the Material-UI docs on themes](https://material-ui.com/customization/themes/) for more details.
