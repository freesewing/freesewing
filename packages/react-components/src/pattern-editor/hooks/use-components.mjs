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
import { BaseAccordion, SubAccordion, Accordion } from '../swizzle/components/accordion.mjs'
// Popout
import { Popout } from '../swizzle/components/popout.mjs'
// Loader
import { TemporaryLoader } from '../swizzle/components/loaders.mjs'
// (curated) Sets
import {
  UserSetPicker,
  BookmarkedSetPicker,
  CuratedSetPicker,
} from '../swizzle/components/sets.mjs'
import { MeasurementsSetCard } from '../swizzle/components/measurements-set-card.mjs'
// Icons
import {
  BookmarkIcon,
  CloseIcon,
  EditIcon,
  MeasurementsSetIcon,
  NoIcon,
  OkIcon,
  PlusIcon,
} from '../swizzle/components/icons.mjs'
// Measurements Editor
import { MeasurementsEditor } from '../swizzle/components/measurements-editor.mjs'
// inputs
import {
  FormControl,
  ButtonFrame,
  NumberInput,
  StringInput,
  DesignDropdown,
  ListInput,
  MarkdownInput,
  MeasurementInput,
  ToggleInput,
} from '../swizzle/components/inputs.mjs'
// Views
import { DesignsView } from '../swizzle/components/designs-view.mjs'
import { ErrorView } from '../swizzle/components/error-view.mjs'
import { MeasurementsView } from '../swizzle/components/measurements-view.mjs'

/**
 * This object holds all components that can be swizzled
 */
const defaultComponents = {
  Accordion,
  BaseAccordion,
  BookmarkedSetPicker,
  ButtonFrame,
  CuratedSetPicker,
  DesignDropdown,
  DesignsView,
  ErrorView,
  FormControl,
  ListInput,
  MarkdownInput,
  MeasurementInput,
  MeasurementsSetCard,
  MeasurementsView,
  MeasurementsEditor,
  NumberInput,
  Popout,
  StringInput,
  SubAccordion,
  TemporaryLoader,
  ToggleInput,
  UserSetPicker,
  // icons
  BookmarkIcon,
  CloseIcon,
  EditIcon,
  MeasurementsSetIcon,
  NoIcon,
  OkIcon,
  PlusIcon,
}

/*
 * This hook returns a component that can be swizzled
 * So either the passed-in component, or the default one
 */
export const useComponents = (components = {}, methods = {}) => {
  /*
   * We need to pass down the resulting components, swizzled or not
   * So we put this in this object so we can pass that down
   */
  const all = {}
  for (let [name, Component] of Object.entries(defaultComponents)) {
    if (components[name]) Component = components[name]
    all[name] = (props) => <Component {...props} components={all} methods={methods} />
  }

  /*
   * Return all components
   */
  return all
}
