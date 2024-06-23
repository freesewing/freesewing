export const menuSettingsStructure = (
  Swizzled,
  { language = 'en', units = 'metric', sabool = false, parts = [] }
) => ({
  sabool: {
    control: Swizzled.config.controlLevels.core.sa,
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
    icon: Swizzled.components.SaIcon,
  },
  samm: sabool
    ? {
        control: Swizzled.config.controlLevels.core.sa,
        min: 0,
        max: units === 'imperial' ? 2 : 2.5,
        dflt: Swizzled.methods.defaultSamm(units),
        icon: Swizzled.components.SaIcon,
      }
    : false,
  paperless: {
    control: Swizzled.config.controlLevels.core.paperless,
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
    icon: Swizzled.components.PaperlessIcon,
  },
  units: {
    control: Swizzled.config.controlLevels.core.units,
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
    icon: Swizzled.components.UnitsIcon,
  },
  complete: {
    control: Swizzled.config.controlLevels.core.complete,
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
    icon: Swizzled.components.DetailIcon,
  },
  expand: {
    control: Swizzled.config.controlLevels.core.expand,
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
    icon: Swizzled.components.ExpandIcon,
  },
  only: {
    control: Swizzled.config.controlLevels.core.only,
    dflt: false,
    list: parts,
    parts,
    icon: Swizzled.components.IncludeIcon,
  },
  scale: {
    control: Swizzled.config.controlLevels.core.scale,
    min: 0.1,
    max: 5,
    dflt: 1,
    step: 0.1,
    icon: Swizzled.components.ScaleIcon,
  },
  margin: {
    control: Swizzled.config.controlLevels.core.margin,
    min: 0,
    max: 2.5,
    dflt: Swizzled.methods.measurementAsMm(units === 'imperial' ? 0.125 : 0.2, units),
    icon: Swizzled.components.MarginIcon,
  },
})
