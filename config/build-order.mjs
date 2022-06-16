import { designs, plugins, packages, software  } from './software/index.mjs'

/*
 * As this monorepo has interlocking dependencies
 * we need to ensure things get built in the correct
 * order. This file takes care of that
 */

const first = [ 'core', 'config-helpers', 'remark-jargon' ]
const blocks = [ 'brian', 'titan', 'bella', 'breanna', 'bent' ]
const extend = [ 'carlita', 'simone', 'unice' ]

export const buildOrder = [

  // First build FreeSewing core library and config-helpers
  first,

  // Then build all FreeSewing plugins, but not the bundle
  Object.keys(plugins).filter(id => id !== 'plugin-bundle'),

  // Then build the plugin bundle
  [ 'plugin-bundle' ],

  // Then build all FreeSewing designs that are blocks
  blocks,

  // Then build all designs, but not the ones that extend a non-block
  Object.keys(designs).filter(id => [...blocks, ...extend].indexOf(id) === -1),

  // Finally build the rest and designs that extend other non-block designs
  [
    ...extend,
    ...Object.keys(packages).filter(id => first.indexOf(id) === -1),
  ]
]

