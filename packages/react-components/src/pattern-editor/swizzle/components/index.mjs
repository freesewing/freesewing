/*************************************************************************
 *                                                                       *
 * FreeSewing's pattern editor allows swizzling components               *
 *                                                                       *
 * To 'swizzle' means to replace the default implementation of a         *
 * component with a custom one. It allows one to customize               *
 * the pattern editor.                                                   *
 *                                                                       *
 * This file holds the 'swizzleComponents' method that will return       *
 * the various components that can be swizzled, or their default         *
 * implementation.                                                       *
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
import Link from 'next/link'
// Accordion
import { BaseAccordion, SubAccordion, Accordion } from './accordion.mjs'
// Popout
import { Popout } from './popout.mjs'
// Loader
import { TemporaryLoader } from './loaders.mjs'
// Measurements Sets
import { UserSetPicker, BookmarkedSetPicker, CuratedSetPicker } from './sets.mjs'
// Curated Measurements Sets
import { CuratedMeasurementsSetLineup } from './curated-sets.mjs'
import { MeasurementsSetCard } from './measurements-set-card.mjs'
// Icons
import {
  BeakerIcon,
  BookmarkIcon,
  BoolNoIcon,
  BoolYesIcon,
  CloseIcon,
  CuratedMeasurementsSetIcon,
  DesignIcon,
  DocsIcon,
  EditIcon,
  ExportIcon,
  FlagIcon,
  GaugeIcon,
  GroupIcon,
  ListIcon,
  MeasurementsSetIcon,
  NoIcon,
  OkIcon,
  OptionsIcon,
  PlusIcon,
  PrintIcon,
  ResetIcon,
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
} from './icons.mjs'
// Measurements Editor
import { MeasurementsEditor } from './measurements-editor.mjs'
// Zoomable pattern
import { ZoomablePattern, ZoomContextProvider } from './zoomable-pattern.mjs'
import { PatternLayout } from './pattern-layout.mjs'
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
} from './inputs.mjs'
// Views
import { DesignsView } from './designs-view.mjs'
import { DraftView } from './draft-view.mjs'
import { ErrorView } from './error-view.mjs'
import { MeasurementsView } from './measurements-view.mjs'
import { ViewPicker } from './view-picker.mjs'
// Pattern
import { Pattern } from '@freesewing/react-components/pattern'
// Menus
import { DraftMenu } from './menus/draft-menu.mjs'
import { CoreSettingsMenu, CoreSetting } from './menus/core-settings-menu.mjs'
import { DesignOptionsMenu, DesignOption } from './menus/design-options-menu.mjs'
import { MenuItem, MenuItemGroup, MenuItemTitle } from './menus/containers.mjs'
import {
  MenuBoolInput,
  MenuConstantInput,
  MenuDegInput,
  MenuListInput,
  MenuListToggle,
  MenuMmInput,
  MenuNumberInput,
  MenuOnlySettingInput,
  MenuPctInput,
  MenuSliderInput,
} from './menus/shared-inputs.mjs'
import {
  MenuBoolValue,
  MenuConstantOptionValue,
  MenuCountOptionValue,
  MenuDegOptionValue,
  MenuHighlightValue,
  MenuListOptionValue,
  MenuListValue,
  MenuMmOptionValue,
  MenuMmValue,
  MenuOnlySettingValue,
  MenuPctOptionValue,
  MenuScaleSettingValue,
  MenuShowValue,
} from './menus/shared-values.mjs'
// Flags
import { Flags, FlagsAccordionTitle, FlagsAccordionEntries } from './flags.mjs'

/**
 * This object holds all components that can be swizzled
 */
const defaultComponents = {
  Accordion,
  BaseAccordion,
  BookmarkedSetPicker,
  ButtonFrame,
  CoreSetting,
  CoreSettingsMenu,
  CuratedMeasurementsSetIcon,
  CuratedMeasurementsSetLineup,
  CuratedSetPicker,
  DesignDropdown,
  DesignOption,
  DesignOptionsMenu,
  DesignsView,
  DraftMenu,
  DraftView,
  ErrorView,
  Flags,
  FlagsAccordionTitle,
  FlagsAccordionEntries,
  FormControl,
  Link,
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
  BoolNoIcon,
  BoolYesIcon,
  CloseIcon,
  DesignIcon,
  DocsIcon,
  EditIcon,
  FlagIcon,
  GaugeIcon,
  GroupIcon,
  ListIcon,
  MeasurementsSetIcon,
  NoIcon,
  OkIcon,
  OptionsIcon,
  PlusIcon,
  PrintIcon,
  ResetIcon,
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
  // menus
  MenuItem,
  MenuItemGroup,
  MenuItemTitle,
  MenuBoolInput,
  MenuConstantInput,
  MenuDegInput,
  MenuListInput,
  MenuListToggle,
  MenuMmInput,
  MenuNumberInput,
  MenuOnlySettingInput,
  MenuPctInput,
  MenuSliderInput,
  MenuBoolValue,
  MenuConstantOptionValue,
  MenuCountOptionValue,
  MenuDegOptionValue,
  MenuHighlightValue,
  MenuListOptionValue,
  MenuListValue,
  MenuMmOptionValue,
  MenuMmValue,
  MenuOnlySettingValue,
  MenuPctOptionValue,
  MenuScaleSettingValue,
  MenuShowValue,
}

/*
 * This method returns a component that can be swizzled
 * So either the passed-in component, or the default one
 */
export const swizzleComponents = (components = {}, Swizzled) => {
  /*
   * We need to return all resulting components, swizzled or not
   * So we create this object so we can pass that down
   */
  const all = {}
  for (let [name, Component] of Object.entries(defaultComponents)) {
    all[name] = components[name]
      ? (props) => components[name]({ Swizzled, ...props })
      : (props) => <Component {...props} Swizzled={Swizzled} />
  }

  /*
   * Return all components
   */
  return all
}
