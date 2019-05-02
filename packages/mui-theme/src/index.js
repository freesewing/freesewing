const darkBg = "#212529";
const lightBg = "#f8f9fa";
const colors = {
  light: {
    primary: darkBg,
    secondary: lightBg,
    link: "#74c0fc",
    paper: "#FFF"
  },
  dark: {
    primary: lightBg,
    secondary: darkBg,
    link: "#74c0fc",
    paper: "#000"
  }
};
const asTitle = {
  fontFamily: "Roboto Condensed",
  fontWeight: "bold"
};
const important = "!important";

const getTheme = mode => {
  let c = colors[mode];
  let forceColor = {
    root: {
      color: c.primary + important
    }
  };
  return {
    overrides: {
      MuiButton: { root: asTitle },
      MuiMenuItem: { root: asTitle },
      MuiListItemText: { primary: asTitle },
      MuiRadio: forceColor,
      MuiCheckbox: forceColor,
      MuiSlider: {
        container: { padding: "25px 0" },
        track: { height: "4px" },
        thumb: { width: "16px", height: "16px" }
      }
    },
    palette: {
      primary: {
        main: c.primary
      },
      secondary: {
        main: c.secondary
      },
      type: mode,
      background: {
        paper: c.paper,
        default: c.secondary
      }
    },
    themeName: mode
  };
};

export const light = getTheme("light");
export const dark = getTheme("dark");
