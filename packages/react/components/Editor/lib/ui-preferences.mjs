import React from 'react'
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
      dense: true,
      title: 'User Experience',
      about: 'Controls the user experience, from keep it simple, to give me all the powers',
      ux: uiUx.ux,
      emoji: '🖥️',
      list: [1, 2, 3, 4, 5],
      choiceTitles: {
        1: 'Keep it as simple as possible',
        2: 'Keep it simple, but not too simple',
        3: 'Balance simplicity with power',
        4: 'Give me all powers, but keep me safe',
        5: 'Get out of my way',
      },
      _choiceDescriptions: {
        1: 'Hides all but the most crucial features.',
        2: 'Hides most of the advanced features.',
        3: 'Reveals the majority of advanced features, but not all of them.',
        4: 'Reveals all advanced features, keeps handrails and safety checks.',
        5: 'Reveals all advanced features, removes handrails and safety checks.',
      },
      icon: UxIcon,
      dflt: defaultConfig.defaultUx,
    },
    /*
    aside: {
      title: 'Aside Menu',
      about: 'Whether or not to display the aside menu',
      ux: uiUx.aside,
      list: [0, 1],
      choiceTitles: {
        0: 'Display the aside menu',
        1: 'Hide the aside menu',
      },
      choiceDescriptions: {
        0: 'Displays the Design Options, Core Settings, and UI Preferences menu on the side of the screen (not on mobile).',
        1: 'Uses the entire screen size for your pattern, providing access to the Design Options, Core Settings, and UI Preferences through the header navigation only.',
      },
      dflt: 1,
      icon: MenuIcon,
    },
    kiosk: {
      title: 'Kiosk View',
      about: 'Whether or not to hide the header and footer',
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
    */
    rotate: {
      dense: true,
      title: 'Rotate Pattern',
      about: 'Allows you to rotate your pattern 90 degrees, handy for tall patterns',
      ux: uiUx.rotate,
      list: [0, 1],
      choiceTitles: {
        0: 'Do not rotate the pattern',
        1: 'Rotate the pattern 90 degrees',
      },
      dflt: 0,
      icon: RotateIcon,
    },
    renderer: {
      dense: true,
      title: 'Pattern render engine',
      about: 'Change the way the pattern is rendered on screen',
      ux: uiUx.renderer,
      list: ['react', 'svg'],
      choiceTitles: {
        react: (
          <span>
            Render using <em>@freesewing/react</em>
          </span>
        ),
        svg: (
          <span>
            Render using <em>@freesewing/core</em>
          </span>
        ),
      },
      choiceDescriptions: {
        0: 'pe:noAside',
        1: 'pe:withAside',
      },
      valueTitles: {
        react: 'React',
        svg: 'Core',
      },
      dflt: 'react',
      icon: RocketIcon,
    },
  }

  return uiPreferences
}
