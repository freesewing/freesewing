// Dependencies
import React from 'react'
import { defaultConfig } from '../config/index.mjs'
import { round, formatMm } from '@freesewing/utils'
import { formatDesignOptionValue, menuCoreSettingsStructure } from './index.mjs'
import { menuUiPreferencesStructure } from './ui-preferences.mjs'
// Components
import {
  ErrorIcon,
  MeasurementsIcon,
  OptionsIcon,
  SettingsIcon,
  UiIcon,
} from '@freesewing/react/components/Icon'
import { HtmlSpan } from '../components/HtmlSpan.mjs'

/*
 * This method drafts the pattern
 *
 * @param {function} Design - The Design constructor
 * @param {object} settings - The settings for the pattern
 * @return {object} data - The drafted pattern, along with errors and failure data
 */
export function draft(Design, settings) {
  const data = {
    // The pattern
    pattern: new Design(settings),
    // Any errors logged by the pattern
    errors: [],
    // If the pattern fails to draft, this will hold the error
    failure: false,
  }
  // Draft the pattern or die trying
  try {
    data.pattern.draft()
    data.errors.push(...data.pattern.store.logs.error)
    for (const store of data.pattern.setStores) data.errors.push(...store.logs.error)
  } catch (error) {
    data.failure = error
  }

  return data
}

export function flattenFlags(flags) {
  const all = {}
  for (const type of defaultConfig.flagTypes) {
    let i = 0
    if (flags[type]) {
      for (const flag of Object.values(flags[type])) {
        i++
        all[`${type}-${i}`] = { ...flag, type }
      }
    }
  }

  return all
}

export function getUiPreferenceUndoStepData({ step }) {
  /*
   * We'll need these
   */
  const field = step.name === 'ui' ? step.path[1] : step.path[2]
  const structure = menuUiPreferencesStructure()[field]

  /*
   * This we'll end up returning
   */
  const data = {
    icon: <UiIcon />,
    field,
    optCode: `${field}.t`,
    titleCode: 'uiPreferences.t',
    structure: menuUiPreferencesStructure()[field],
  }
  const FieldIcon = data.structure.icon
  data.fieldIcon = <FieldIcon />

  /*
   * Add oldval and newVal if they exist, or fall back to default
   */
  for (const key of ['old', 'new'])
    data[key + 'Val'] = t(
      structure.choiceTitles[
        structure.choiceTitles[String(step[key])] ? String(step[key]) : String(structure.dflt)
      ] + '.t'
    )

  return data
}

export function getCoreSettingUndoStepData({ step, state, Design }) {
  const field = step.path[1]
  const structure = menuCoreSettingsStructure({
    language: state.language,
    units: state.settings.units,
    sabool: state.settings.sabool,
    parts: Design.patternConfig.draftOrder,
  })

  const data = {
    field,
    titleCode: 'coreSettings.t',
    optCode: `${field}.t`,
    icon: <SettingsIcon />,
    structure: structure[field],
  }
  if (!data.structure && field === 'sa') data.structure = structure.samm
  const FieldIcon = data.structure?.icon || ErrorIcon
  data.fieldIcon = <FieldIcon />

  /*
   * Save us some typing
   */
  const cord = settingsValueCustomOrDefault
  const Html = HtmlSpan

  /*
   * Need to allow HTML in some of these in case this is
   * formated as imperial which uses <sub> and <sup>
   */
  switch (data.field) {
    case 'margin':
    case 'sa':
    case 'samm':
      if (data.field !== 'margin') {
        data.optCode = `samm.t`
      }
      data.oldVal = <Html html={formatMm(cord(step.old, data.structure.dflt))} />
      data.newVal = <Html html={formatMm(cord(step.new, data.structure.dflt))} />
      return data
    case 'scale':
      data.oldVal = cord(step.old, data.structure.dflt)
      data.newVal = cord(step.new, data.structure.dflt)
      return data
    case 'units':
      data.oldVal = t(step.new === 'imperial' ? 'pe:metricUnits' : 'pe:imperialUnits')
      data.newVal = t(step.new === 'imperial' ? 'pe:imperialUnits' : 'pe:metricUnits')
      return data
    case 'only':
      data.oldVal = cord(step.old, data.structure.dflt) || t('pe:includeAllParts')
      data.newVal = cord(step.new, data.structure.dflt) || t('pe:includeAllParts')
      return data
    default:
      data.oldVal = t(
        (data.structure.choiceTitles[String(step.old)]
          ? data.structure.choiceTitles[String(step.old)]
          : data.structure.choiceTitles[String(data.structure.dflt)]) + '.t'
      )
      data.newVal = t(
        (data.structure.choiceTitles[String(step.new)]
          ? data.structure.choiceTitles[String(step.new)]
          : data.structure.choiceTitles[String(data.structure.dflt)]) + '.t'
      )
      return data
  }
}

export function getDesignOptionUndoStepData({ step, state, Design }) {
  const option = Design.patternConfig.options[step.path[2]]
  const data = {
    icon: <OptionsIcon />,
    field: step.path[2],
    optCode: `${state.design}:${step.path[2]}.t`,
    titleCode: `designOptions.t`,
    oldVal: formatDesignOptionValue(option, step.old, state.units === 'imperial'),
    newVal: formatDesignOptionValue(option, step.new, state.units === 'imperial'),
  }

  return data
}

export function getUndoStepData(props) {
  /*
   * UI Preferences
   */
  if ((props.step.name === 'settings' && props.step.path[1] === 'ui') || props.step.name === 'ui')
    return getUiPreferenceUndoStepData(props)

  /*
   * Design options
   */
  if (props.step.name === 'settings' && props.step.path[1] === 'options')
    return getDesignOptionUndoStepData(props)

  /*
   * Core Settings
   */
  if (
    props.step.name === 'settings' &&
    [
      'sa',
      'samm',
      'margin',
      'scale',
      'only',
      'complete',
      'paperless',
      'sabool',
      'units',
      'expand',
    ].includes(props.step.path[1])
  )
    return getCoreSettingUndoStepData(props)

  /*
   * Measurements
   */
  if (props.step.name === 'settings' && props.step.path[1] === 'measurements') {
    const data = {
      icon: <MeasurementsIcon />,
      field: 'measurements',
      optCode: `measurements`,
      titleCode: 'measurements',
    }
    /*
     * Single measurements change?
     */
    if (props.step.path[2])
      return {
        ...data,
        field: props.step.path[2],
        oldVal: formatMm(props.step.old, props.imperial),
        newVal: formatMm(props.step.new, props.imperial),
      }
    let count = 0
    for (const m of Object.keys(props.step.new)) {
      if (props.step.new[m] !== props.step.old?.[m]) count++
    }
    return { ...data, msg: t('pe:xMeasurementsChanged', { count }) }
  }

  /*
   * Bail out of the step fell throug
   */
  return false
}
/*
 * This helper method constructs the initial state object.
 *
 * If they are not present, it will fall back to the relevant defaults
 */
export function initialEditorState(preload = {}, config) {
  /*
   * Create initial state object
   */
  const initial = { ...config.initialState, ...preload }

  /*
   * FIXME: Add preload support, from URL or other sources, rather than just passing in an object
   */

  return initial
}

/**
 * round a value to the correct number of decimal places to display all supplied digits after multiplication
 * this is a workaround for floating point errors
 * examples:
 * roundPct(0.72, 100) === 72
 * roundPct(7.5, 0.01) === 0.075
 * roundPct(7.50, 0.01) === 0.0750
 * @param  {Number} num the number to be operated on
 * @param  {Number} factor the number to multiply by
 * @return {Number}     the given num multiplied by the factor, rounded appropriately
 */
export function menuRoundPct(num, factor) {
  // stringify
  const str = '' + num
  // get the index of the decimal point in the number
  const decimalIndex = str.indexOf('.')
  // get the number of places the factor moves the decimal point
  const factorPlaces = factor > 0 ? Math.ceil(Math.log10(factor)) : Math.floor(Math.log10(factor))
  // the number of places needed is the number of digits that exist after the decimal minus the number of places the decimal point is being moved
  const numPlaces = Math.max(0, str.length - (decimalIndex + factorPlaces))
  return round(num * factor, numPlaces)
}

const menuNumericInputMatcher = /^-?[0-9]*[.,eE]?[0-9]+$/ // match a single decimal separator
const menuFractionInputMatcher = /^-?[0-9]*(\s?[0-9]+\/|[.,eE])?[0-9]+$/ // match a single decimal separator or fraction

/**
 * Validate and parse a value that should be a number
 * @param  {any}  val            the value to validate
 * @param  {Boolean} allowFractions should fractions be considered valid input?
 * @param  {Number}  min            the minimum allowable value
 * @param  {Number}  max            the maximum allowable value
 * @return {null|false|Number}      null if the value is empty,
 *                                  false if the value is invalid,
 *                                  or the value parsed to a number if it is valid
 */
export function menuValidateNumericValue(
  val,
  allowFractions = true,
  min = -Infinity,
  max = Infinity
) {
  // if it's empty, we're neutral
  if (typeof val === 'undefined' || val === '') return null

  // make sure it's a string
  val = ('' + val).trim()

  // get the appropriate match pattern and check for a match
  const matchPattern = allowFractions ? menuFractionInputMatcher : menuNumericInputMatcher
  if (!val.match(matchPattern)) return false

  // replace comma with period
  const parsedVal = val.replace(',', '.')
  // if fractions are allowed, parse for fractions, otherwise use the number as a value
  const useVal = allowFractions ? fractionToDecimal(parsedVal) : parsedVal

  // check that it's a number and it's in the range
  if (isNaN(useVal) || useVal > max || useVal < min) return false

  // all checks passed. return the parsed value
  return useVal
}

/**
 * Check to see if a value is different from its default
 * @param {Number|String|Boolean} current the current value
 * @param {Object} config  configuration containing a dflt key
 * @return {Boolean}         was the value changed?
 */
export function menuValueWasChanged(current, config) {
  if (typeof current === 'undefined') return false
  if (current == config.dflt) return false

  return true
}
import get from 'lodash.get'
import set from 'lodash.set'
import unset from 'lodash.unset'

const UNSET = '__UNSET__'
/*
 * Helper method to handle object updates
 *
 * @param {object} obj - The object to update
 * @param {string|array} path - The path to the key to update, either as array or dot notation
 * @param {mixed} val - The new value to set or 'unset' to unset the value
 * @return {object} result - The updated object
 */
export function objUpdate(obj = {}, path, val = '__UNSET__') {
  if (val === UNSET) unset(obj, path)
  else set(obj, path, val)

  return obj
}

/*
 * Helper method to handle object updates that also updates the undo history in ephemeral state
 *
 * @param {object} obj - The object to update
 * @param {string|array} path - The path to the key to update, either as array or dot notation
 * @param {mixed} val - The new value to set or 'unset' to unset the value
 * @param {function} setEphemeralState - The ephemeral state setter
 * @return {object} result - The updated object
 */
export function undoableObjUpdate(name, obj = {}, path, val = '__UNSET__', setEphemeralState) {
  const current = get(obj, path)
  setEphemeralState((cur) => {
    if (!Array.isArray(cur.undos)) cur.undos = []
    return {
      ...cur,
      undos: [
        {
          name,
          time: Date.now(),
          path,
          old: current,
          new: val,
          restore: cloneObject(obj),
        },
        ...cur.undos,
      ],
    }
  })

  return objUpdate(obj, path, val)
}

/*
 * Helper method to add an undo step for which state updates are handles in another way
 *
 * This is typically used for SA changes as it requires changing 3 fields:
 * - sabool: Is sa on or off?
 * - sa: sa value for core
 * - samm: Holds the sa value in mm even when sa is off
 *
 * @param {object} undo - The undo step to add
 * @param {object} restore - The state to restore for this step
 * @param {function} setEphemeralState - The ephemeral state setter
 */
export function addUndoStep(undo, restore, setEphemeralState) {
  setEphemeralState((cur) => {
    if (!Array.isArray(cur.undos)) cur.undos = []
    return {
      ...cur,
      undos: [{ time: Date.now(), ...undo, restore: cloneObject(restore) }, ...cur.undos],
    }
  })
}

/*
 * Helper method to clone an object
 */
export function cloneObject(obj) {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * Helper method to push a prefix to a set path
 *
 * By 'set path' we mean a path to be passed to the
 * objUpdate method, which uses lodash's set under the hood.
 *
 * @param {string} prefix - The prefix path to add
 * @param {string|array} path - The path to prefix either as array or a string in dot notation
 * @return {array} newPath - The prefixed path
 */
export function statePrefixPath(prefix, path) {
  if (Array.isArray(path)) return [prefix, ...path]
  else return [prefix, ...path.split('.')]
}

/*
 * This creates the helper object for state updates
 */
export function stateUpdateFactory(setState, setEphemeralState, config) {
  return {
    /*
     * This allows raw access to the entire state object
     */
    state: (path, val) => setState((cur) => objUpdate({ ...cur }, path, val)),
    /*
     * These hold an object, so we take a path
     */
    settings: (path = null, val = null) => {
      /*
       * This check can be removed once all code is migrated to the new editor
       */
      if (Array.isArray(path) && Array.isArray(path[0]) && val === null) {
        throw new Error(
          'Update.settings was called with an array of operations. This is no longer supported.'
        )
      }
      return setState((cur) =>
        undoableObjUpdate(
          'settings',
          { ...cur },
          statePrefixPath('settings', path),
          val,
          setEphemeralState
        )
      )
    },
    /*
     * Helper to restore from undo state
     * Takes the index of the undo step in the array in ephemeral state
     */
    restore: async (i, ephemeralState) => {
      setState(ephemeralState.undos[i].restore)
      setEphemeralState((cur) => {
        cur.undos = cur.undos.slice(i + 1)
        return cur
      })
    },
    /*
     * Helper to toggle SA on or off as that requires managing sa, samm, and sabool
     */
    toggleSa: () =>
      setState((cur) => {
        const sa = cur.settings?.samm || (cur.settings?.units === 'imperial' ? 15.3125 : 10)
        const restore = cloneObject(cur)
        // This requires 3 changes
        const update = cur.settings.sabool
          ? [
              ['sabool', 0],
              ['sa', 0],
              ['samm', sa],
            ]
          : [
              ['sabool', 1],
              ['sa', sa],
              ['samm', sa],
            ]
        for (const [key, val] of update) objUpdate(cur, `settings.${key}`, val)
        // Which we'll group as 1 undo action
        addUndoStep(
          {
            name: 'settings',
            path: ['settings', 'sa'],
            new: cur.settings.sabool ? 0 : sa,
            old: cur.settings.sabool ? sa : 0,
          },
          restore,
          setEphemeralState
        )

        return cur
      }),
    ui: (path, val) =>
      setState((cur) =>
        undoableObjUpdate('ui', { ...cur }, statePrefixPath('ui', path), val, setEphemeralState)
      ),
    /*
     * These only hold a string, so we only take a value
     */
    design: (val) => setState((cur) => objUpdate({ ...cur }, 'design', val)),
    view: (val) => {
      // Only take valid view names
      if (!config.views.includes(val)) return console.log('not a valid view:', val)
      setState((cur) => ({ ...cur, view: val }))
      // Also add it onto the views (history)
      setEphemeralState((cur) => {
        if (!Array.isArray(cur.views)) cur.views = []
        return { ...cur, views: [val, ...cur.views] }
      })
    },
    viewBack: () => {
      setEphemeralState((eph) => {
        if (Array.isArray(eph.views) && config.views.includes(eph.views[1])) {
          // Load view at the 1 position of the history
          setState((cur) => ({ ...cur, view: eph.views[1] }))
          return { ...eph, views: eph.views.slice(1) }
        }

        return eph
      })
    },
    ux: (val) => setState((cur) => objUpdate({ ...cur }, 'ux', val)),
    clearPattern: () =>
      setState((cur) => {
        const newState = { ...cur }
        objUpdate(newState, 'settings', {
          measurements: cur.settings.measurements,
        })
        /*
         * Let's also reset the renderer to React as that feels a bit like a pattern setting even though it's UI
         */
        objUpdate(newState, 'ui', { ...newState.ui, renderer: 'react' })
        return newState
      }),
    clearAll: () => setState(config.initialState),
    /*
     * These are setters for the ephemeral state which is passed down as part of the
     * state object, but is not managed in the state backend because it's ephemeral
     */
    startLoading: (id, conf = {}) =>
      setEphemeralState((cur) => {
        const newState = { ...cur }
        if (typeof newState.loading !== 'object') newState.loading = {}
        if (typeof conf.color === 'undefined') conf.color = 'info'
        newState.loading[id] = {
          msg: t('pe:genericLoadingMsg'),
          ...conf,
        }
        return newState
      }),
    stopLoading: (id) =>
      setEphemeralState((cur) => {
        const newState = { ...cur }
        if (typeof newState.loading[id] !== 'undefined') delete newState.loading[id]
        return newState
      }),
    clearLoading: () => setEphemeralState((cur) => ({ ...cur, loading: {} })),
    notify: (conf, id = false) =>
      setEphemeralState((cur) => {
        const newState = { ...cur }
        /*
         * Passing in an id allows making sure the same notification is not repeated
         * So if the id is set, and we have a loading state with that id, we just return
         */
        if (id && cur.loading?.[id]) return newState
        if (typeof newState.loading !== 'object') newState.loading = {}
        if (id === false) id = Date.now()
        newState.loading[id] = { ...conf, id, fadeTimer: config.notifyTimeout }
        return newState
      }),
    notifySuccess: (msg, id = false) =>
      setEphemeralState((cur) => {
        const newState = { ...cur }
        /*
         * Passing in an id allows making sure the same notification is not repeated
         * So if the id is set, and we have a loading state with that id, we just return
         */
        if (id && cur.loading?.[id]) return newState
        if (typeof newState.loading !== 'object') newState.loading = {}
        if (id === false) id = Date.now()
        newState.loading[id] = {
          msg,
          icon: 'success',
          color: 'success',
          id,
          fadeTimer: config.notifyTimeout,
        }
        return newState
      }),
    notifyFailure: (msg, id = false) =>
      setEphemeralState((cur) => {
        const newState = { ...cur }
        /*
         * Passing in an id allows making sure the same notification is not repeated
         * So if the id is set, and we have a loading state with that id, we just return
         */
        if (id && cur.loading?.[id]) return newState
        if (typeof newState.loading !== 'object') newState.loading = {}
        if (id === false) id = Date.now()
        newState.loading[id] = {
          msg,
          icon: 'failure',
          color: 'error',
          id,
          fadeTimer: config.notifyTimeout,
        }
        return newState
      }),
    fadeNotify: (id) =>
      setEphemeralState((cur) => {
        const newState = { ...cur }
        newState.loading[id] = { ...newState.loading[id], clearTimer: 600, id, fading: true }
        delete newState.loading[id].fadeTimer
        return newState
      }),
    clearNotify: (id) =>
      setEphemeralState((cur) => {
        const newState = { ...cur }
        if (typeof newState.loading[id] !== 'undefined') delete newState.loading[id]
        return newState
      }),
  }
}
/*
 * Returns the URL of a cloud-hosted image (cloudflare in this case) based on the ID and Variant
 */
export function cloudImageUrl({ id = 'default-avatar', variant = 'public' }) {
  /*
   * Return something default so that people will actually change it
   */
  if (!id || id === 'default-avatar') return config.cloudImageDflt

  /*
   * If the variant is invalid, set it to the smallest thumbnail so
   * people don't load enourmous images by accident
   */
  if (!config.cloudImageVariants.includes(variant)) variant = 'sq100'

  return `${config.cloudImageUrl}${id}/${variant}`
}
/**
 * This method does nothing. It is used to disable certain methods
 * that need to be passed it to work
 *
 * @return {null} null - null
 */
export function noop() {
  return null
}
/*
 * A method that check that a value is not empty
 */
export function notEmpty(value) {
  return String(value).length > 0
}
/**
 * Helper method to merge arrays of translation namespaces
 *
 * Note that this method is variadic
 *
 * @param {[string]} namespaces - A string or array of strings of namespaces
 * @return {[string]} namespaces - A merged array of all namespaces
 */
export function nsMerge(...args) {
  const ns = new Set()
  for (const arg of args) {
    if (typeof arg === 'string') ns.add(arg)
    else if (Array.isArray(arg)) {
      for (const el of nsMerge(...arg)) ns.add(el)
    }
  }

  return [...ns]
}

/*
 * A translation fallback method in case none is passed in
 *
 * @param {string} key - The input
 * @return {string} key - The input is returned
 */
export function t(key) {
  return Array.isArray(key) ? key[0] : key
}

export function settingsValueIsCustom(val, dflt) {
  return typeof val === 'undefined' || val === '__UNSET__' || val === dflt ? false : true
}

export function settingsValueCustomOrDefault(val, dflt) {
  return typeof val === 'undefined' || val === '__UNSET__' || val === dflt ? dflt : val
}
