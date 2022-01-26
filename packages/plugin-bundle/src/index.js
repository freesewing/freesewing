/* eslint no-unused-expressions: "warn" */
import banner from '@freesewing/plugin-banner'
import bartack from '@freesewing/plugin-bartack'
import buttons from '@freesewing/plugin-buttons'
import cutonfold from '@freesewing/plugin-cutonfold'
import dimension from '@freesewing/plugin-dimension'
import grainline from '@freesewing/plugin-grainline'
import logo from '@freesewing/plugin-logo'
import mirror from '@freesewing/plugin-mirror'
import notches from '@freesewing/plugin-notches'
import title from '@freesewing/plugin-title'
import scalebox from '@freesewing/plugin-scalebox'
import round from '@freesewing/plugin-round'
import sprinkle from '@freesewing/plugin-sprinkle'
import measurements from '@freesewing/plugin-measurements'
import pkg from '../package.json'

const bundle = [
  banner,
  bartack,
  buttons,
  cutonfold,
  dimension,
  grainline,
  logo,
  mirror,
  notches,
  title,
  scalebox,
  round,
  sprinkle,
  measurements,
]

function bundleHooks() {
  let hooks = {}
  for (let plugin of bundle) {
    for (let i in plugin.hooks) {
      if (typeof hooks[i] === 'undefined') hooks[i] = []
      let hook = plugin.hooks[i]
      if (typeof hook === 'function') hooks[i].push(hook)
      else if (typeof hook === 'object') {
        for (let method of hook) hooks[i].push(method)
      }
    }
  }

  return hooks
}

function bundleMacros() {
  let macros = {}
  for (let plugin of bundle) {
    for (let i in plugin.macros) macros[i] = plugin.macros[i]
  }

  return macros
}

export default {
  name: pkg.name,
  version: pkg.version,
  hooks: bundleHooks(),
  macros: bundleMacros(),
}
