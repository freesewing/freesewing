import { measurementAsMm } from 'shared/utils.mjs'

export const defaultSamm = (units, inMm = true) => {
  const dflt = units === 'metric' ? 1 : 0.5
  return inMm ? measurementAsMm(dflt, units) : dflt
}

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
        max: units === 'metric' ? 2.5 : 2,
        dflt: defaultSamm(units, false),
        step: units === 'metric' ? 0.1 : 0.125,
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
    control: 1, // Show when control > 2
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
    list: parts,
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
    max: 2.5,
    dflt: units === 'metric' ? 0.2 : 0.125,
    step: units === 'metric' ? 0.1 : 0.125,
    emoji: '🔲',
  },
})
