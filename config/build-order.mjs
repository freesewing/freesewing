import { designs, plugins, packages, software  } from './software/index.mjs'

/*
 * As this monorepo has interlocking dependencies
 * we need to ensure things get built in the correct
 * order. This file takes care of that
 */

const first = [ 'core', 'config-helpers', 'remark-jargon' ]
const blocks = [ 'brian', 'titan', 'bella', 'breanna', 'bent' ]

export const buildOrder = [

  // First build FreeSewing core library and config-helpers
  first,

  // Then build all FreeSewing plugins
  Object.keys(plugins),

  // Then build the plugin bundle, but not the bundle
  [ 'plugin-bundle' ],

  // Then build all FreeSewing designs that are blocks
  blocks,

  // Then build all FreeSewing designs, but not the bundle
  Object.keys(designs).filter(id => blocks.indexOf(id) === -1),

  // Finally build any other packages (without core)
  Object.keys(packages).filter(id => first.indexOf(id) === -1)
]

