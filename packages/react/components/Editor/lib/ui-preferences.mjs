import { defaultConfig } from '../config/index.mjs'
import {
  MenuIcon,
  KioskIcon,
  RotateIcon,
  RocketIcon,
  UxIcon,
} from '@freesewing/react/components/Icon'

export function menuUiPreferencesStructure() {
  const uiUx = defaultConfig.uxLevels.ui
  const uiPreferences = {
    ux: {
      ux: uiUx.ux,
      emoji: '🖥️',
      list: [1, 2, 3, 4, 5],
      choiceTitles: {},
      icon: UxIcon,
      dflt: defaultConfig.defaultUx,
    },
    aside: {
      ux: uiUx.aside,
      list: [0, 1],
      choiceTitles: {
        0: 'pe:noAside',
        1: 'pe:withAside',
      },
      choiceDescriptions: {
        0: 'pe:noAside',
        1: 'pe:withAside',
      },
      dflt: 1,
      icon: MenuIcon,
    },
    kiosk: {
      ux: uiUx.kiosk,
      list: [0, 1],
      choiceTitles: {
        0: 'pe:websiteMode',
        1: 'pe:kioskMode',
      },
      choiceDescriptions: {
        0: 'pe:noAside',
        1: 'pe:withAside',
      },
      dflt: 0,
      icon: KioskIcon,
    },
    rotate: {
      ux: uiUx.rotate,
      list: [0, 1],
      choiceTitles: {
        0: 'pe:rotateNo',
        1: 'pe:rotateYes',
      },
      choiceDescriptions: {
        0: 'pe:noAside',
        1: 'pe:withAside',
      },
      dflt: 0,
      icon: RotateIcon,
    },
    renderer: {
      ux: uiUx.renderer,
      list: ['react', 'svg'],
      choiceTitles: {
        react: 'pe:renderWithReact',
        svg: 'pe:renderWithCore',
      },
      choiceDescriptions: {
        0: 'pe:noAside',
        1: 'pe:withAside',
      },
      valueTitles: {
        react: 'React',
        svg: 'SVG',
      },
      dflt: 'react',
      icon: RocketIcon,
    },
  }

  uiPreferences.ux.list.forEach((i) => (uiPreferences.ux.choiceTitles[i] = 'pe:ux' + i))
  return uiPreferences
}
