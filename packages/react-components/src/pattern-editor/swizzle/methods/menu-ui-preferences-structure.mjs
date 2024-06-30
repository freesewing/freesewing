export const menuUiPreferencesStructure = (Swizzled) => {
  const uiControl = Swizzled.config.controlLevels.ui
  const uiSettings = {
    control: {
      control: uiControl.control,
      emoji: '🖥️',
      list: [1, 2, 3, 4, 5],
      choiceTitles: {},
      icon: Swizzled.components.ControlIcon,
      dflt: Swizzled.config.defaultControl,
    },
    kiosk: {
      control: uiControl.kiosk,
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
      control: uiControl.renderer,
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

  uiSettings.control.list.forEach((i) => (uiSettings.control.choiceTitles[i] = 'pe:control' + i))
  return uiSettings
}
