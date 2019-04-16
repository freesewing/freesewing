import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

const asTitle = {
  fontFamily: "Roboto Condensed",
  fontWeight: "bold"
};

const theme = {
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      "Segoe UI",
      "Roboto",
      "Helvetica",
      "Arial",
      "sans-serif",
      "Apple Color Emoji",
      "Segoe UI Emoji",
      "Segoe UI Symbol"
    ].join(","),
    useNextVariants: true
  },
  props: {
    MuiButtonBase: {
      //disableRipple: true // Disabling ripple everywhere
    }
  },
  overrides: {
    MuiButton: { root: asTitle },
    MuiMenuItem: { root: asTitle },
    MuiListItemText: { primary: asTitle }
  }
};

const dark = "#111";
const light = "#fff";

const palettes = {
  dark: {
    primary: { main: light },
    secondary: { main: dark },
    type: "dark"
  },
  light: {
    primary: { main: dark },
    secondary: { main: light },
    type: "light"
  }
};

/** Allows us to switch the theme's dark mode
 * returns a theme object configured for dark mode
 * or not, depending whether you pass it 'dark' or anything else
 */
const createTheme = name =>
  createMuiTheme({
    ...theme,
    palette: name === "dark" ? palettes.dark : palettes.light
  });

export default createTheme;
