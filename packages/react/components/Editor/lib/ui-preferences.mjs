import React from 'react'
import { defaultConfig } from '../config/index.mjs'
import { linkClasses } from '@freesewing/utils'
import {
  MenuIcon,
  KioskIcon,
  RotateIcon,
  RocketIcon,
  UxIcon,
} from '@freesewing/react/components/Icon'

const UiDocsLink = ({ item }) => (
  <a href={`/docs/about/site/draft/#${item.toLowerCase()}`} className={`${linkClasses} tw-px-2`}>
    Learn more
  </a>
)

export function menuUiPreferencesStructure() {
  const uiUx = defaultConfig.uxLevels.ui
  const uiPreferences = {
    ux: {
      dense: true,
      title: 'User Experience',
      about: (
        <span>
          Controls the user experience, from keep it simple, to give me all the powers.
          <UiDocsLink item="control" />
        </span>
      ),
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
    rotate: {
      dense: true,
      title: 'Rotate Pattern',
      about: (
        <span>
          Allows you to rotate your pattern 90 degrees, handy for tall patterns.
          <UiDocsLink item="rotate" />
        </span>
      ),
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
      about: (
        <span>
          Change the underlying method for rendering the pattern on screen.
          <UiDocsLink item="renderer" />
        </span>
      ),
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
