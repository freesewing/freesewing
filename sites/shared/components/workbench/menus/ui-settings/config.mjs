export const loadSettingsConfig = () => {
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
  }

  uiSettings.control.list.forEach(
    (i) => (uiSettings.control.choiceTitles[i] = 'account:control' + i)
  )
  return uiSettings
}
