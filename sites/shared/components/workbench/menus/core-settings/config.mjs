export const loadSettingsConfig = ({
  language = 'en',
  units = 'metric',
  sabool = false,
  parts = [],
}) => ({
  sabool: {
    control: 2, // Show when control > 1
    list: [0, 1],
    choiceTitles: {
      0: 'saNo',
      1: 'saYes',
    },
    valueTitles: {
      0: 'no',
      1: 'yes',
    },
    dflt: 0,
    emoji: '✂️',
  },
  samm: sabool
    ? {
        control: 2, // Show when control > 1
        min: 0,
        max: 25,
        dflt: 10,
        step: 0.1,
      }
    : false,
  paperless: {
    control: 2, // Show when control > 1
    list: [0, 1],
    choiceTitles: {
      0: 'paperlessNo',
      1: 'paperlessYes',
    },
    valueTitles: {
      0: 'no',
      1: 'yes',
    },
    dflt: 0,
    emoji: '🌲',
  },
  locale: {
    control: 3, // Show when control > 2
    list: ['de', 'en', 'es', 'fr', 'nl'],
    dflt: language,
    choiceTitles: {
      de: 'de',
      en: 'en',
      es: 'es',
      fr: 'fr',
      nl: 'nl',
    },
    valueTitles: {
      de: 'de.t',
      en: 'en.t',
      es: 'es.t',
      fr: 'fr.t',
      nl: 'nl.t',
    },
    emoji: '🇺🇳',
  },
  units: {
    control: 3, // Show when control > 2
    list: ['metric', 'imperial'],
    dflt: 'metric',
    choiceTitles: {
      metric: 'metric',
      imperial: 'imperial',
    },
    valueTitles: {
      metric: 'metric',
      imperial: 'imperial',
    },
    emoji: '📐',
  },
  complete: {
    control: 4, // Show when control > 3
    list: [1, 0],
    dflt: 1,
    choiceTitles: {
      0: 'completeNo',
      1: 'completeYes',
    },
    valueTitles: {
      0: 'no',
      1: 'yes',
    },
    emoji: '🔎',
  },
  only: {
    control: 4, // Show when control > 3
    dflt: false,
    parts,
    emoji: '🛍️',
  },
  scale: {
    control: 4, // Show when control > 3
    min: 0.1,
    max: 5,
    dflt: 1,
    step: 0.1,
    emoji: '🪆',
  },
  margin: {
    control: 4, // Show when control > 3
    min: 0,
    max: 25,
    dflt: 2,
    step: 1,
    emoji: '🔲',
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
