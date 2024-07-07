export const menuCoreSettingsStructure = (
  Swizzled,
  { language = 'en', units = 'metric', sabool = false, parts = [] }
) => ({
  sabool: {
    ux: Swizzled.config.uxLevels.core.sa,
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
        ux: Swizzled.config.uxLevels.core.sa,
        min: 0,
        max: units === 'imperial' ? 2 : 2.5,
        dflt: Swizzled.methods.defaultSamm(units),
        icon: Swizzled.components.SaIcon,
      }
    : false,
  paperless: {
    ux: Swizzled.config.uxLevels.core.paperless,
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
    ux: Swizzled.config.uxLevels.core.units,
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
    ux: Swizzled.config.uxLevels.core.complete,
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
    ux: Swizzled.config.uxLevels.core.expand,
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
    ux: Swizzled.config.uxLevels.core.only,
    dflt: false,
    list: parts,
    parts,
    icon: Swizzled.components.IncludeIcon,
  },
  scale: {
    ux: Swizzled.config.uxLevels.core.scale,
    min: 0.1,
    max: 5,
    dflt: 1,
    step: 0.1,
    icon: Swizzled.components.ScaleIcon,
  },
  margin: {
    ux: Swizzled.config.uxLevels.core.margin,
    min: 0,
    max: 2.5,
    dflt: Swizzled.methods.measurementAsMm(units === 'imperial' ? 0.125 : 0.2, units),
    icon: Swizzled.components.MarginIcon,
  },
})
