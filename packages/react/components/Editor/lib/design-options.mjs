import React from 'react'
import { mergeOptions } from '@freesewing/core'
import { designOptionType, set, orderBy } from '@freesewing/utils'
import { i18n } from '@freesewing/collection'
import { linkClasses } from '@freesewing/utils'

const DesignDocsLink = ({ design, item }) => (
  <a
    href={`/docs/designs/${design}/options/#${item.toLowerCase()}`}
    className={`${linkClasses} tw-px-2`}
    target="_BLANK"
  >
    Learn more
  </a>
)

export function menuDesignOptionsStructure(design, options, settings, asFullList = false) {
  if (!options) return options
  const sorted = {}
  for (const [name, option] of Object.entries(options)) {
    if (typeof option === 'object') {
      sorted[name] = {
        ...option,
        name,
        title: i18n[design].en.o[name].t,
        about: (
          <span>
            {i18n[design].en.o[name].d}
            <DesignDocsLink item={name} design={design} />
          </span>
        ),
        dense: true,
        sideBySide: true,
      }
    }
  }

  const menu = {}
  for (const option of orderBy(sorted, ['order', 'menu', 'name'], ['asc', 'asc', 'asc'])) {
    if (typeof option === 'object') {
      const oType = designOptionType(option)
      option.dflt = option.dflt || option[oType]
      // Percentage option tweaks
      if (oType === 'pct') option.dflt /= 100
      // List option tweaks
      else if (oType === 'list') {
        option.valueTitles = {}
        option.choiceTitles = {}
        option.choiceDescriptions = {}
        for (const entry of option.list) {
          option.choiceTitles[entry] = i18n[design].en.o[`${option.name}.${entry}`].t
          option.choiceDescriptions[entry] = i18n[design].en.o[`${option.name}.${entry}`].d
          option.valueTitles[entry] = i18n[design].en.o[`${option.name}.${entry}`].t
        }
      }
      // Bool option tweaks
      else if (oType === 'bool') {
        option.list = [false, true]
        option.valueTitles = {}
        option.choiceTitles = {}
        option.choiceDescriptions = {}
        for (const entry of option.list) {
          option.choiceTitles.false = i18n[design].en.o[`${option.name}No`].t
          option.choiceDescriptions.false = i18n[design].en.o[`${option.name}No`].d
          option.valueTitles.false = 'No'
          option.choiceTitles.true = i18n[design].en.o[`${option.name}Yes`].t
          option.choiceDescriptions.true = i18n[design].en.o[`${option.name}Yes`].d
          option.valueTitles.true = 'Yes'
        }
      }
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
export function getOptionStructure(option, Design, state) {
  const structure = menuDesignOptionsStructure(Design.patternConfig.options, state.settings)

  return findOption(structure, option)
}

export function findOption(structure, option) {
  for (const [key, val] of Object.entries(structure)) {
    if (key === option) return val
    if (val.isGroup) {
      const sub = findOption(val, option)
      if (sub) return sub
    }
  }

  return false
}
