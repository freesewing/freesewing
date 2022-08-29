import { designs, plugins, packages  } from './software/index.mjs'

/*
 * As this monorepo has interlocking dependencies
 * we need to ensure things get built in the correct
 * order. This file takes care of that
 */

const first = [ 'core', 'config-helpers', 'remark-jargon']
const blocks = [ 'brian', 'titan', 'bella', 'breanna' ]
const extended = [ 'bent', 'simon', 'carlton', 'ursula' ]
const last = ['i18n']

export const buildOrder = [

  // First build FreeSewing core library and config-helpers
  first,

  // Then build all FreeSewing plugins, but not the bundle
  Object.keys(plugins).filter(id => id !== 'plugin-bundle'),

  // Then build the plugin bundle
  [ 'plugin-bundle' ],

  // Then build all FreeSewing designs that are blocks
  blocks,

  // Then build all FreeSewing designs that are further extended
  extended,

  // Then build all remaining designs
  Object.keys(designs).filter(id => [...blocks, ...extended].indexOf(id) === -1),

  // Finally build the rest of the packages
  Object.keys(packages).filter(id => first.indexOf(id) === -1 && last.indexOf(id) === -1),

  last
]

