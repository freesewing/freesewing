export const loadSettingsConfig = (settings, view) => {
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
    inspect: settings.renderer !== 'svg' && {
      control: 4, // Show when control > 3
      list: [0, 1],
      choiceTitles: {
        0: 'inspectNo',
        1: 'inspectYes',
      },
      valueTitles: {
        0: 'no',
        1: 'yes',
      },
      dflt: 0,
      emoji: '🔬',
    },
    view: {
      control: 3,
      list: ['draft', 'test', 'print', 'cut', 'save', 'export', 'logs'],
      dflt: view,
      emoji: '👀',
      choiceTitles: {
        draft: 'draft',
        test: 'test',
        print: 'print',
        cut: 'cut',
        save: 'save',
        export: 'export',
        logs: 'logs',
      },
      valueTitles: {
        draft: 'draft',
        test: 'test',
        print: 'print',
        cut: 'cut',
        save: 'save',
        export: 'export',
        logs: 'logs',
      },
    },
  }

  uiSettings.control.list.forEach(
    (i) => (uiSettings.control.choiceTitles[i] = 'account:control' + i)
  )
  return uiSettings
}
