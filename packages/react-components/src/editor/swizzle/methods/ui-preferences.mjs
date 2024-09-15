export function menuUiPreferencesStructure(Swizzled) {
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
    aside: {
      ux: uiUx.aside,
      list: [0, 1],
      choiceTitles: {
        0: 'pe:noAside',
        1: 'pe:withAside',
      },
      dflt: 1,
      icon: Swizzled.components.MenuIcon,
    },
    kiosk: {
      ux: uiUx.kiosk,
      list: [0, 1],
      choiceTitles: {
        0: 'pe:websiteMode',
        1: 'pe:kioskMode',
      },
      dflt: 0,
      icon: Swizzled.components.KioskIcon,
    },
    rotate: {
      ux: uiUx.rotate,
      list: [0, 1],
      choiceTitles: {
        0: 'pe:rotateNo',
        1: 'pe:rotateYes',
      },
      dflt: 0,
      icon: Swizzled.components.RotateIcon,
    },
    renderer: {
      ux: uiUx.renderer,
      list: ['react', 'svg'],
      choiceTitles: {
        react: 'pe:renderWithReact',
        svg: 'pe:renderWithCore',
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
