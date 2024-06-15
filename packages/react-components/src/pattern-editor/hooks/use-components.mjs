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
// Measurements Sets
import {
  UserSetPicker,
  BookmarkedSetPicker,
  CuratedSetPicker,
} from '../swizzle/components/sets.mjs'
// Curated Measurements Sets
import { CuratedMeasurementsSetLineup } from '../swizzle/components/curated-sets.mjs'
import { MeasurementsSetCard } from '../swizzle/components/measurements-set-card.mjs'
// Icons
import {
  BeakerIcon,
  BookmarkIcon,
  CloseIcon,
  CuratedMeasurementsSetIcon,
  DesignIcon,
  DocsIcon,
  EditIcon,
  ExportIcon,
  FlagIcon,
  GaugeIcon,
  ListIcon,
  MeasurementsSetIcon,
  NoIcon,
  OkIcon,
  OptionsIcon,
  PlusIcon,
  PrintIcon,
  SaveIcon,
  SettingsIcon,
  UiIcon,
  UploadIcon,
  XrayIcon,
  ViewDraftIcon,
  ViewMeasurementsIcon,
  ViewTestIcon,
  ViewTimingIcon,
  ViewPrintLayoutIcon,
  ViewSaveIcon,
  ViewExportIcon,
  ViewEditSettingsIcon,
  ViewLogsIcon,
  ViewInspectIcon,
  ViewDocsIcon,
  ViewDesignsIcon,
} from '../swizzle/components/icons.mjs'
// Measurements Editor
import { MeasurementsEditor } from '../swizzle/components/measurements-editor.mjs'
// Zoomable pattern
import { ZoomablePattern, ZoomContextProvider } from '../swizzle/components/zoomable-pattern.mjs'
import { PatternLayout } from '../swizzle/components/pattern-layout.mjs'
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
import { DraftView } from '../swizzle/components/draft-view.mjs'
import { ErrorView } from '../swizzle/components/error-view.mjs'
import { MeasurementsView } from '../swizzle/components/measurements-view.mjs'
import { ViewPicker } from '../swizzle/components/view-picker.mjs'
// Pattern
import { Pattern } from '../../pattern/index.mjs'
// Menus
import { DraftMenu } from '../swizzle/components/draft-menu.mjs'
import { DesignOptionsMenu } from '../swizzle/components/design-options-menu.mjs'
// Flags
import { Flags, FlagsAccordionTitle, FlagsAccordionEntries } from '../swizzle/components/flags.mjs'

/**
 * This object holds all components that can be swizzled
 */
const defaultComponents = {
  Accordion,
  BaseAccordion,
  BookmarkedSetPicker,
  ButtonFrame,
  CuratedMeasurementsSetIcon,
  CuratedMeasurementsSetLineup,
  CuratedSetPicker,
  DesignDropdown,
  DesignOptionsMenu,
  DesignsView,
  DraftMenu,
  DraftView,
  ErrorView,
  Flags,
  FlagsAccordionTitle,
  FlagsAccordionEntries,
  FormControl,
  ListInput,
  MarkdownInput,
  MeasurementInput,
  MeasurementsSetCard,
  MeasurementsView,
  MeasurementsEditor,
  NumberInput,
  Pattern,
  PatternLayout,
  Popout,
  StringInput,
  SubAccordion,
  TemporaryLoader,
  ToggleInput,
  UserSetPicker,
  ViewPicker,
  ZoomablePattern,
  ZoomContextProvider,
  // icons
  BeakerIcon,
  BookmarkIcon,
  CloseIcon,
  DesignIcon,
  DocsIcon,
  EditIcon,
  FlagIcon,
  GaugeIcon,
  ListIcon,
  MeasurementsSetIcon,
  NoIcon,
  OkIcon,
  OptionsIcon,
  PlusIcon,
  PrintIcon,
  SaveIcon,
  SettingsIcon,
  UiIcon,
  UploadIcon,
  XrayIcon,
  ViewDraftIcon,
  ViewMeasurementsIcon,
  ViewTestIcon,
  ViewTimingIcon,
  ViewPrintLayoutIcon,
  ViewSaveIcon,
  ViewExportIcon,
  ViewEditSettingsIcon,
  ViewLogsIcon,
  ViewInspectIcon,
  ViewDocsIcon,
  ViewDesignsIcon,
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
