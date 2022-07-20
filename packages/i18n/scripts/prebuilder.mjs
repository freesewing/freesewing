import {build} from '../src/prebuild.mjs'

// call this here instead of in the src/prebuild.mjs so that build isn't called by other files importing that build function
build()
