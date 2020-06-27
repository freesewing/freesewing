/* eslint no-unused-expressions: "warn" */
import cutonfold from '@freesewing/plugin-cutonfold'
import dimension from '@freesewing/plugin-dimension'
import grainline from '@freesewing/plugin-grainline'
import logo from '@freesewing/plugin-logo'
import title from '@freesewing/plugin-title'
import scalebox from '@freesewing/plugin-scalebox'
import round from '@freesewing/plugin-round'
import sprinkle from '@freesewing/plugin-sprinkle'
import measurements from '@freesewing/plugin-measurements'
import { version, name } from '../package.json'

let bundle = [cutonfold, dimension, grainline, logo, title, scalebox, round, sprinkle, measurements]

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
  name: name,
  version: version,
  hooks: bundleHooks(),
  macros: bundleMacros()
}
