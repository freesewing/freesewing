//import { build } from '../src/prebuild.mjs'

// use a deny-list to keep locales that aren't ready out of the build
export const denyList = ['uk']

// call this here instead of in the src/prebuild.mjs so that build isn't called by other files importing that build function
//build((loc) => denyList.indexOf(loc) === -1)
