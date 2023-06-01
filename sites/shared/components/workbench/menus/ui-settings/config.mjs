export const loadSettingsConfig = () => ({
  control: {
    control: 1, // Show when control > 0
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
  inspect: {
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
})
