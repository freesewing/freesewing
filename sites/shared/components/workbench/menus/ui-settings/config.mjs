import { RocketIcon, ControlIcon, KioskIcon } from 'shared/components/icons.mjs'

export const loadSettingsConfig = () => {
  const uiSettings = {
    control: {
      control: 1, // Show when control > 0
      emoji: '🖥️',
      list: [1, 2, 3, 4, 5],
      choiceTitles: {},
      icon: ControlIcon,
    },
    kiosk: {
      control: 4, // Show when control > 3
      list: [0, 1],
      choiceTitles: {
        0: 'ui-settings:websiteMode',
        1: 'ui-settings:kioskMode',
      },
      //valueTitles: {
      //  react: 'ui-settings:regular',
      //  svg: 'ui-settings:kiosk',
      //},
      dflt: 0,
      icon: KioskIcon,
    },
    renderer: {
      control: 4, // Show when control > 3
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
      icon: RocketIcon,
    },
  }

  uiSettings.control.list.forEach(
    (i) => (uiSettings.control.choiceTitles[i] = 'account:control' + i)
  )
  return uiSettings
}
