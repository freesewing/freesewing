export const loadSettingsConfig = (settings) => {
  const uiSettings = {
    control: {
      control: 1, // Show when control > 0
      emoji: '🖥️',
      list: [1, 2, 3, 4, 5],
      choiceTitles: {},
    },
    renderer: {
      control: 4, // Show when control > 3
      list: ['react', 'svg'],
      choiceTitles: {
        react: 'renderWithReact',
        svg: 'renderWithCore',
      },
      valueTitles: {
        react: 'React',
        svg: 'SVG',
      },
      dflt: 'react',
      emoji: '🚀',
    },
    xray: settings.renderer !== 'svg' && {
      control: 4, // Show when control > 3
      list: [0, 1],
      choiceTitles: {
        0: 'xrayNo',
        1: 'xrayYes',
      },
      valueTitles: {
        0: 'no',
        1: 'yes',
      },
      dflt: 0,
      emoji: '🔬',
    },
  }

  uiSettings.control.list.forEach(
    (i) => (uiSettings.control.choiceTitles[i] = 'account:control' + i)
  )
  return uiSettings
}
