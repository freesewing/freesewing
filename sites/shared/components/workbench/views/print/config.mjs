import { measurementAsMm } from 'shared/utils.mjs'
import {
  PageSizeIcon,
  PageOrientationIcon,
  PageMarginIcon,
  CoverPageIcon,
  CuttingLayoutIcon,
} from 'shared/components/icons.mjs'
import { isProduction } from 'shared/config/freesewing.config.mjs'

export const printSettingsPath = ['print', 'pages']

export const defaultPrintSettings = (units, inMm = true) => {
  const margin = units === 'imperial' ? 0.5 : 1
  return {
    size: units === 'imperial' ? 'letter' : 'a4',
    orientation: 'portrait',
    margin: inMm ? measurementAsMm(margin, units) : margin,
    coverPage: true,
    cutlist: true,
  }
}
const sizes = ['a4', 'a3', 'a2', 'a1', 'a0', 'letter', 'legal', 'tabloid']
export const loadPrintConfig = (units) => {
  const defaults = defaultPrintSettings(units, false)
  const config = {
    size: {
      control: 2,
      list: sizes,
      dflt: defaults.size,
      choiceTitles: {},
      valueTitles: {},
      icon: PageSizeIcon,
    },
    orientation: {
      control: 2,
      list: ['portrait', 'landscape'],
      choiceTitles: {
        portrait: 'portrait',
        landscape: 'landscape',
      },
      valueTitles: {
        portrait: 'portrait',
        landscape: 'landscape',
      },
      dflt: defaults.orientation,
      icon: PageOrientationIcon,
    },
    margin: {
      control: 2,
      min: units === 'imperial' ? 0.25 : 0.5,
      max: 2.5,
      step: units === 'imperial' ? 0.125 : 0.1,
      dflt: defaults.margin,
      icon: PageMarginIcon,
    },
    coverPage: {
      control: 3,
      dflt: defaults.coverPage,
      icon: CoverPageIcon,
    },
    cutlist: {
      control: 3,
      dflt: defaults.cutlist,
      icon: CuttingLayoutIcon,
    },
  }

  sizes.forEach((s) => {
    config.size.choiceTitles[s] = s
    config.size.valueTitles[s] = s
  })

  /*
   * Don't include cutlist in production until it's ready to go
   */
  if (isProduction) delete config.cutlist

  return config
}
