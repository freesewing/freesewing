export const menuUiPreferencesStructure = (Swizzled) => {
  const uiUx = Swizzled.config.uxLevels.ui
  const uiPreferences = {
    ux: {
      ux: uiUx.ux,
      emoji: '🖥️',
      list: [1, 2, 3, 4, 5],
      choiceTitles: {},
      icon: Swizzled.components.UxIcon,
      dflt: Swizzled.config.defaultUx,
    },
    kiosk: {
      ux: uiUx.kiosk,
      list: [0, 1],
      choiceTitles: {
        0: 'pe:websiteMode',
        1: 'pe:kioskMode',
      },
      //valueTitles: {
      //  react: 'ui-settings:regular',
      //  svg: 'ui-settings:kiosk',
      //},
      dflt: 0,
      icon: Swizzled.components.KioskIcon,
    },
    renderer: {
      ux: uiUx.renderer,
      list: ['react', 'svg'],
      choiceTitles: {
        react: 'ui-settings:renderWithReact',
        svg: 'ui-settings:renderWithCore',
      },
      valueTitles: {
        react: 'React',
        svg: 'SVG',
      },
      dflt: 'react',
      icon: Swizzled.components.RocketIcon,
    },
  }

  uiPreferences.ux.list.forEach((i) => (uiPreferences.ux.choiceTitles[i] = 'pe:ux' + i))
  return uiPreferences
}
