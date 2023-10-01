//  __SDEFILE__ - This file is a dependency for the stand-alone environment
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
  ExpandIcon,
} from 'shared/components/icons.mjs'
import { freeSewingConfig as config } from 'shared/config/freesewing.config.mjs'

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
    control: config.coreSettingsControl.sa,
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
        control: config.coreSettingsControl.sa,
        min: 0,
        max: units === 'imperial' ? 2 : 2.5,
        dflt: defaultSamm(units),
        icon: SaIcon,
      }
    : false,
  paperless: {
    control: config.coreSettingsControl.paperless,
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
    control: config.coreSettingsControl.locale,
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
    control: config.coreSettingsControl.units,
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
    control: config.coreSettingsControl.complete,
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
  expand: {
    control: config.coreSettingsControl.expand,
    list: [1, 0],
    dflt: 1,
    choiceTitles: {
      0: 'expandNo',
      1: 'expandYes',
    },
    valueTitles: {
      0: 'no',
      1: 'yes',
    },
    icon: ExpandIcon,
  },
  only: {
    control: config.coreSettingsControl.only,
    dflt: false,
    list: parts,
    parts,
    icon: IncludeIcon,
  },
  scale: {
    control: config.coreSettingsControl.scale,
    min: 0.1,
    max: 5,
    dflt: 1,
    step: 0.1,
    icon: ScaleIcon,
  },
  margin: {
    control: config.coreSettingsControl.margin,
    min: 0,
    max: 2.5,
    dflt: measurementAsMm(units === 'imperial' ? 0.125 : 0.2, units),
    icon: MarginIcon,
  },
})
