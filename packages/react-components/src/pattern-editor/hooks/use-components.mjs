/*************************************************************************
 *                                                                       *
 * FreeSewing's pattern editor useComponents hook, with swizzle support  *
 *                                                                       *
 * To 'swizzle' means to replace the default implementation of a         *
 * component with a custom one. It allows one to customize               *
 * the pattern editor.                                                   *
 *                                                                       *
 * This file holds the 'useComponents' hook that will load the various   *
 * components that can be swizzled, as well as their default versions    *
 * that can be overridden.                                               *
 *                                                                       *
 * To use a custom version, simply pas it as a prop into the editor      *
 * under the 'components' key. So to pass a custom 'TemporaryLoader'     *
 * component, you do:                                                    *
 *                                                                       *
 * <PatternEditor compnents={{ TemporaryLoader: MyTemporaryLoader }} />  *
 *                                                                       *
 *************************************************************************/

/*
 * Import of components that can be swizzled
 */
// Accordion
import { BaseAccordion, SubAccordion, Accordion } from '../swizzle/accordion.mjs'
// Popout
import { Popout } from '../swizzle/popout.mjs'
// Loader
import { TemporaryLoader } from '../swizzle/loaders.mjs'
// Views
import { DesignsView } from '../swizzle/designs-view.mjs'
import { MeasurementsView } from '../swizzle/measurements-view.mjs'

/*
 * This hook returns a component that can be swizzled
 * So either the passed-in component, or the default one
 */
export const useComponents = (props) => ({
  // accordion.mjs
  Accordion: props?.Accordion || Accordion,
  BaseAccordion: props?.BaseAccordion || Accordion,
  SubAccordion: props?.SubAccordion || SubAccordion,
  // loaders.mjs
  TemporaryLoader: props?.TemporaryLoader || TemporaryLoader,
  // popout.mjs
  Popout: props?.Popout || Popout,
  // Views
  DesignsView: props?.DesignsView || DesignsView,
  MeasurementsView: props?.MeasurementsView || MeasurementsView,
})
