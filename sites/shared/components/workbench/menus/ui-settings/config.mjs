export const loadSettingsConfig = () => ({
  control: {
    control: 1, // Show when control > 0
    list: ['1', '2', '3', '4', '5'],
    choiceTitles: {
      1: 'renderWithReact',
      2: 'renderWithCore',
      3: 'renderWithCore',
      4: 'renderWithCore',
      5: 'renderWithCore',
    },
    valueTitles: {
      1: 'renderWithReact',
      2: 'renderWithCore',
      3: 'renderWithCore',
      4: 'renderWithCore',
      5: 'renderWithCore',
    },
    dflt: '2',
    emoji: '🖥️',
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
})
