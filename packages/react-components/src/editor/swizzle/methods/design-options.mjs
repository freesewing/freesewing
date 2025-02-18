export function designOptionType(Swizzled, option) {
  if (typeof option?.pct !== 'undefined') return 'pct'
  if (typeof option?.bool !== 'undefined') return 'bool'
  if (typeof option?.count !== 'undefined') return 'count'
  if (typeof option?.deg !== 'undefined') return 'deg'
  if (typeof option?.list !== 'undefined') return 'list'
  if (typeof option?.mm !== 'undefined') return 'mm'

  return 'constant'
}
import { mergeOptions } from '@freesewing/core'
import set from 'lodash.set'
import orderBy from 'lodash.orderby'

export function menuDesignOptionsStructure(Swizzled, options, settings, asFullList = false) {
  if (!options) return options
  const sorted = {}
  for (const [name, option] of Object.entries(options)) {
    if (typeof option === 'object') sorted[name] = { ...option, name }
  }

  const menu = {}
  // Fixme: One day we should sort this based on the translation
  for (const option of orderBy(sorted, ['order', 'menu', 'name'], ['asc', 'asc', 'asc'])) {
    if (typeof option === 'object') {
      const oType = Swizzled.methods.designOptionType(option)
      option.dflt = option.dflt || option[oType]
      if (oType === 'pct') option.dflt /= 100
      if (typeof option.menu === 'function')
        option.menu = asFullList
          ? 'conditional'
          : option.menu(settings, mergeOptions(settings, options))
      if (option.menu) {
        // Handle nested groups that don't have any direct children
        if (option.menu.includes('.')) {
          let menuPath = []
          for (const chunk of option.menu.split('.')) {
            menuPath.push(chunk)
            set(menu, `${menuPath.join('.')}.isGroup`, true)
          }
        }
        set(menu, `${option.menu}.isGroup`, true)
        set(menu, `${option.menu}.${option.name}`, option)
      } else if (typeof option.menu === 'undefined') {
        console.log(
          `Warning: Option ${option.name} does not have a menu config. ` +
            'Either configure it, or set it to false to hide this option.'
        )
      }
    }
  }

  // Always put advanced at the end
  if (menu.advanced) {
    const adv = menu.advanced
    delete menu.advanced
    menu.advanced = adv
  }

  return menu
}
/*
 * Helper method to grab an option from an Design options structure
 *
 * Since these structures can be nested with option groups, this needs some extra logic
 */
export function getOptionStructure(Swizzled, option, Design, state) {
  const structure = Swizzled.methods.menuDesignOptionsStructure(
    Design.patternConfig.options,
    state.settings
  )
  console.log({ structure })

  return Swizzled.methods.findOption(structure, option)
}

export function findOption(Swizzled, structure, option) {
  for (const [key, val] of Object.entries(structure)) {
    if (key === option) return val
    if (val.isGroup) {
      const sub = findOption(val, option)
      if (sub) return sub
    }
  }

  return false
}
