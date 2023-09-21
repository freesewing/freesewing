import { measurementAsMm, formatFraction128 } from 'shared/utils.mjs'
import { materialPlugin } from 'shared/plugins/plugin-layout-part.mjs'
import { cutLayoutPlugin } from 'shared/plugins/plugin-cut-layout.mjs'
import { pluginAnnotations } from '@freesewing/plugin-annotations'
import { round } from 'shared/utils'
import get from 'lodash.get'

export const activeMaterialPath = ['cutting', 'activeMaterial']
export const materialSettingsPath = ['cutting', 'materials']

export const useMaterialLength = (isImperial, height, format = 'none') => {
  // regular conversion from mm to inches or cm
  const unit = isImperial ? 25.4 : 10
  // conversion from inches or cm to yards or meters
  const materialUnit = isImperial ? 36 : 100
  // for material, these divisions are granular enough
  const rounder = isImperial ? 16 : 10

  // we convert the used material height to the right units so we can round it
  const inMaterialUnits = height / (materialUnit * unit)
  // we multiply it by the rounder, round it up, then divide by the rounder again to get the rounded amount
  const roundCount = Math.ceil(rounder * inMaterialUnits) / rounder
  // format as a fraction for imperial, a decimal for metric
  const count = isImperial ? formatFraction128(roundCount, format) : round(roundCount, 1)

  return `${count}${isImperial ? 'yds' : 'm'}`
}

export const materialSettingsOrDefault = (units, ui, material) => {
  const isImperial = units === 'imperial'
  const sheetHeight = measurementAsMm(isImperial ? 36 : 100, units)
  const uiSettings = get(ui, [...materialSettingsPath, material], {})
  const sheetWidth = uiSettings.sheetWidth || measurementAsMm(isImperial ? 54 : 120, units)
  const grainDirection = uiSettings.grainDirection === undefined ? 90 : uiSettings.grainDirection

  return { activeMaterial: material, sheetWidth, grainDirection, sheetHeight }
}

export const useMaterialSettings = ({ ui }) => {
  const activeMaterial = get(ui, activeMaterialPath, 'fabric')
  return {
    activeMaterial,
    ...get(ui, [...materialSettingsPath, activeMaterial]),
  }
}

export const useMaterialDraft = ({ settings, ui, Design, materialSettings }) => {
  // get the appropriate layout for the view
  const layout = get(ui, ['layouts', 'cut', materialSettings.activeMaterial], true)
  // hand it separately to the design
  const pattern = new Design({ ...settings, layout })

  materialSettings = materialSettingsOrDefault(settings.units, ui, materialSettings.activeMaterial)
  const layoutSettings = {
    sheetWidth: materialSettings.sheetWidth,
    sheetHeight: materialSettings.sheetHeight,
  }

  let renderProps
  try {
    // add the material plugin to the draft
    pattern.use(materialPlugin(layoutSettings))
    // add the cutLayout plugin
    pattern.use(cutLayoutPlugin(materialSettings.activeMaterial, materialSettings.grainDirection))
    // also, pluginAnnotations and pluginFlip are needed
    pattern.use(pluginAnnotations)

    // draft the pattern
    pattern.draft()
    renderProps = pattern.getRenderProps()
  } catch (err) {
    console.log(err)
  }

  return { pattern, renderProps }
}

export const useMaterialList = (pattern) => {
  return pattern.setStores[0].cutlist.getCutFabrics(pattern.settings[0])
}
