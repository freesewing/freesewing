/*************************************************************************
 *                                                                       *
 * FreeSewing's pattern editor allows swizzling methods                  *
 *                                                                       *
 * To 'swizzle' means to replace the default implementation of a         *
 * method with a custom one. It allows one to customize                  *
 * the pattern editor.                                                   *
 *                                                                       *
 * This file holds the 'swizzleMethods' method that will return          *
 * the various methods that can be swizzled, or their default            *
 * implementation.                                                       *
 *                                                                       *
 * To use a custom version, simply pas it as a prop into the editor      *
 * under the 'methods' key. So to pass a custom 't' method (used for     *
 * translation(, you do:                                                 *
 *                                                                       *
 * <PatternEditor methods={{ t: myCustomTranslationMethod }} />          *
 *                                                                       *
 *************************************************************************/

/*
 * Import of methods that can be swizzled
 */
import {
  defaultSa,
  defaultSamm,
  menuCoreSettingsOnlyHandler,
  menuCoreSettingsSaboolHandler,
  menuCoreSettingsSammHandler,
  menuCoreSettingsStructure,
} from './core-settings.mjs'
import {
  designOptionType,
  findOption,
  getOptionStructure,
  menuDesignOptionsStructure,
} from './design-options.mjs'
import {
  addUndoStep,
  cloneObject,
  cloudImageUrl,
  draft,
  flattenFlags,
  getCoreSettingUndoStepData,
  getDesignOptionUndoStepData,
  getUiPreferenceUndoStepData,
  getUndoStepData,
  initialEditorState,
  menuRoundPct,
  menuValidateNumericValue,
  menuValueWasChanged,
  noop,
  notEmpty,
  nsMerge,
  objUpdate,
  settingsValueIsCustom,
  settingsValueCustomOrDefault,
  statePrefixPath,
  stateUpdateFactory,
  t,
  undoableObjUpdate,
} from './editor.mjs'
import {
  capitalize,
  formatDesignOptionValue,
  formatFraction128,
  formatImperial,
  formatMm,
  formatPercentage,
  round,
  roundMm,
  fractionToDecimal,
  measurementAsMm,
  measurementAsUnits,
  shortDate,
  parseDistanceInput,
} from './formatting.mjs'
import {
  designMeasurements,
  hasRequiredMeasurements,
  isDegreeMeasurement,
  missingMeasurements,
  structureMeasurementsAsDesign,
} from './measurements.mjs'
import { menuUiPreferencesStructure } from './ui-preferences.mjs'

/**
 * This object holds all methods that can be swizzled
 */
const defaultMethods = {
  // core-settings.mjs
  defaultSa,
  defaultSamm,
  menuCoreSettingsOnlyHandler,
  menuCoreSettingsSaboolHandler,
  menuCoreSettingsSammHandler,
  menuCoreSettingsStructure,
  // design-options.mjs
  designOptionType,
  findOption,
  getOptionStructure,
  menuDesignOptionsStructure,
  // editor.mjs
  addUndoStep,
  cloneObject,
  cloudImageUrl,
  draft,
  flattenFlags,
  getCoreSettingUndoStepData,
  getDesignOptionUndoStepData,
  getUiPreferenceUndoStepData,
  getUndoStepData,
  initialEditorState,
  menuRoundPct,
  menuValidateNumericValue,
  menuValueWasChanged,
  noop,
  notEmpty,
  nsMerge,
  objUpdate,
  settingsValueIsCustom,
  settingsValueCustomOrDefault,
  statePrefixPath,
  stateUpdateFactory,
  t,
  undoableObjUpdate,
  // formatting.mjs
  capitalize,
  formatDesignOptionValue,
  formatFraction128,
  formatImperial,
  formatMm,
  formatPercentage,
  round,
  roundMm,
  fractionToDecimal,
  measurementAsMm,
  measurementAsUnits,
  shortDate,
  parseDistanceInput,
  // measurements.mjs
  designMeasurements,
  hasRequiredMeasurements,
  isDegreeMeasurement,
  missingMeasurements,
  structureMeasurementsAsDesign,
  // ui-preferences.mjs
  menuUiPreferencesStructure,
}

/*
 * This method returns methods that can be swizzled
 * So either the passed-in methods, or the default ones
 */
export const swizzleMethods = (methods, Swizzled) => {
  /*
   * We need to pass down the resulting methods, swizzled or not
   * because some methods rely on other (possibly swizzled) methods.
   * So we put this in this object so we can pass that down
   */
  const all = {}
  for (const [name, method] of Object.entries(defaultMethods)) {
    if (typeof method !== 'function')
      console.warn(`${name} is not defined as default method in swizzleMethods`)
    all[name] = methods[name]
      ? (...params) => methods[name](all, ...params)
      : (...params) => method(Swizzled, ...params)
  }

  /*
   * Return all methods
   */
  return all
}
