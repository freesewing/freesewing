import { measurementAsMm } from 'shared/utils.mjs'
import {
  SaIcon,
  ScaleIcon,
  PaperlessIcon,
  I18nIcon,
  UnitsIcon,
  DetailIcon,
  IncludeIcon,
  MarginIcon,
} from 'shared/components/icons.mjs'

export const defaultSamm = (units, inMm = true) => {
  const dflt = units === 'imperial' ? 0.5 : 1
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
    icon: SaIcon,
  },
  samm: sabool
    ? {
        control: 2, // Show when control > 1
        min: 0,
        max: units === 'imperial' ? 2 : 2.5,
        dflt: defaultSamm(units),
        icon: SaIcon,
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
    icon: PaperlessIcon,
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
    icon: I18nIcon,
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
    icon: UnitsIcon,
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
    icon: DetailIcon,
  },
  only: {
    control: 4, // Show when control > 3
    dflt: false,
    list: parts,
    parts,
    icon: IncludeIcon,
  },
  scale: {
    control: 4, // Show when control > 3
    min: 0.1,
    max: 5,
    dflt: 1,
    step: 0.1,
    icon: ScaleIcon,
  },
  margin: {
    control: 4, // Show when control > 3
    min: 0,
    max: 2.5,
    dflt: measurementAsMm(units === 'imperial' ? 0.125 : 0.2, units),
    icon: MarginIcon,
  },
})
