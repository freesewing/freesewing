
## Getting the theme

After installing [@freesewing/mui-theme](https://www.npmjs.com/package/@freesewing/mui-theme), 
import it:

```js 
import createTheme from "@freesewing/mui-theme";
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
