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
// Ux
import { Ux } from './ux.mjs'
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
  ApplyIcon,
  BeakerIcon,
  BookmarkIcon,
  BoolNoIcon,
  BoolYesIcon,
  CircleIcon,
  CloseIcon,
  CuratedMeasurementsSetIcon,
  DesignIcon,
  DetailIcon,
  DocsIcon,
  EditIcon,
  ExpandIcon,
  ExportIcon,
  FlagIcon,
  FlagNoteIcon,
  FlagInfoIcon,
  FlagTipIcon,
  FlagWarningIcon,
  FlagErrorIcon,
  FlagFixmeIcon,
  FlagExpandIcon,
  FlagOtionsIcon,
  GaugeIcon,
  GroupIcon,
  HelpIcon,
  KioskIcon,
  LeftIcon,
  ListIcon,
  MeasurementsSetIcon,
  NoIcon,
  OkIcon,
  OptionsIcon,
  PaperlessIcon,
  PlusIcon,
  PrintIcon,
  ResetIcon,
  RightIcon,
  RocketIcon,
  SaIcon,
  SaveIcon,
  SettingsIcon,
  TrashIcon,
  UiIcon,
  UnitsIcon,
  UploadIcon,
  UxIcon,
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
  ViewViewPickerIcon,
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
import { UiPreferencesMenu, UiPreference } from './menus/ui-preferences-menu.mjs'
import { MenuItem, MenuItemGroup, MenuItemTitle } from './menus/containers.mjs'
import {
  MenuBoolInput,
  MenuConstantInput,
  MenuDegInput,
  MenuEditOption,
  MenuListInput,
  MenuListToggle,
  MenuMmInput,
  MenuNumberInput,
  MenuUxSettingInput,
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
import {
  HeaderMenu,
  HeaderMenuAllViews,
  HeaderMenuDraftView,
  HeaderMenuButton,
  HeaderMenuDropdown,
  HeaderMenuDropdowns,
  HeaderMenuDraftViewDesignOptions,
  HeaderMenuDraftViewCoreSettings,
  HeaderMenuDraftViewUiPreferences,
  HeaderMenuDraftViewFlags,
  HeaderMenuDraftViewIcons,
  HeaderMenuIconSpacer,
  HeaderMenuViewMenu,
} from './header-menu.mjs'
// Flags
import { Flag, Flags, FlagTypeIcon, FlagsAccordionTitle, FlagsAccordionEntries } from './flags.mjs'
// View Menu
import {
  ViewMenu,
  ViewMenuIcons,
  ViewMenuButton,
  ViewMenuSpacer,
  ViewTypeIcon,
} from './view-menu.mjs'
import { Null } from './null.mjs'

/**
 * This object holds all components that can be swizzled
 */
const defaultComponents = {
  Accordion,
  BaseAccordion,
  BookmarkedSetPicker,
  ButtonFrame,
  CircleIcon,
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
  Flag,
  Flags,
  FlagsAccordionTitle,
  FlagsAccordionEntries,
  FlagTypeIcon,
  FormControl,
  HeaderMenu,
  HeaderMenuAllViews,
  HeaderMenuDraftView,
  HeaderMenuDraftViewDesignOptions,
  HeaderMenuDraftViewCoreSettings,
  HeaderMenuDraftViewUiPreferences,
  HeaderMenuDraftViewFlags,
  HeaderMenuDraftViewIcons,
  HeaderMenuButton,
  HeaderMenuDropdown,
  HeaderMenuDropdowns,
  HeaderMenuIconSpacer,
  Link,
  ListInput,
  MarkdownInput,
  MeasurementInput,
  MeasurementsSetCard,
  MeasurementsView,
  MeasurementsEditor,
  NumberInput,
  Null,
  Pattern,
  PatternLayout,
  Popout,
  StringInput,
  SubAccordion,
  TemporaryLoader,
  ToggleInput,
  UiPreferencesMenu,
  UiPreference,
  UserSetPicker,
  Ux,
  ViewMenu,
  ViewMenuIcons,
  ViewMenuButton,
  ViewMenuSpacer,
  HeaderMenuViewMenu,
  ViewPicker,
  ViewTypeIcon,
  ZoomablePattern,
  ZoomContextProvider,
  // icons
  ApplyIcon,
  BeakerIcon,
  BookmarkIcon,
  BoolNoIcon,
  BoolYesIcon,
  CloseIcon,
  DesignIcon,
  DetailIcon,
  DocsIcon,
  EditIcon,
  ExpandIcon,
  FlagIcon,
  FlagNoteIcon,
  FlagInfoIcon,
  FlagTipIcon,
  FlagWarningIcon,
  FlagErrorIcon,
  FlagFixmeIcon,
  FlagExpandIcon,
  FlagOtionsIcon,
  GaugeIcon,
  GroupIcon,
  HelpIcon,
  KioskIcon,
  LeftIcon,
  ListIcon,
  MeasurementsSetIcon,
  NoIcon,
  OkIcon,
  OptionsIcon,
  PaperlessIcon,
  PlusIcon,
  PrintIcon,
  ResetIcon,
  RightIcon,
  RocketIcon,
  SaIcon,
  SaveIcon,
  SettingsIcon,
  TrashIcon,
  UiIcon,
  UnitsIcon,
  UploadIcon,
  UxIcon,
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
  ViewViewPickerIcon,
  // menus
  MenuItem,
  MenuItemGroup,
  MenuItemTitle,
  MenuBoolInput,
  MenuConstantInput,
  MenuDegInput,
  MenuEditOption,
  MenuListInput,
  MenuListToggle,
  MenuMmInput,
  MenuNumberInput,
  MenuUxSettingInput,
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
