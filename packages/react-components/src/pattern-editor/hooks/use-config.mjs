/*************************************************************************
 *                                                                       *
 * FreeSewing's pattern editor useConfig hook, with swizzle support      *
 *                                                                       *
 * To 'swizzle' means to replace the default implementation of a         *
 * method with a custom one. It allows one to customize                  *
 * the pattern editor.                                                   *
 *                                                                       *
 * This file holds the 'useConfig' hook that will load the pattern       *
 * editor configuration. It's a plain object for which all keys can be   *
 * overwritten.                                                          *
 *                                                                       *
 * To use a custom config, simply pas it as a prop into the editor       *
 * under the 'config' key. So to pass a custom 'newSet' link (used to    *
 * link to a page to create a new measurements set), you do:             *
 *                                                                       *
 * <PatternEditor config={{ newSet: '/my/custom/page' }} />              *
 *                                                                       *
 *************************************************************************/

/*
 * Default config for the FreeSewing pattern editor
 */
export const defaultConfig = {
  // Enable use of a (FreeSewing) backend to load data from
  enableBackend: true,
  // Link to create a new measurements set, set to false to disable
  hrefNewSet: 'https://freesewing.org/new/set',
  // Cloud default image
  cloudImageDflt:
    'https://imagedelivery.net/ouSuR9yY1bHt-fuAokSA5Q/365cc64e-1502-4d2b-60e0-cc8beee73f00/public',
  // Cloud image base URL
  cloudImageUrl: 'https://imagedelivery.net/ouSuR9yY1bHt-fuAokSA5Q/',
  // Cloud image variants
  cloudImageVariants: ['public', 'sq100', 'sq200', 'sq500', 'w200', 'w500', 'w1000', 'w2000'],
  // Views
  mainViews: ['draft', 'designs', 'save', 'export'],
  extraViews: ['measurements', 'printLayout', 'editSettings', 'docs'],
  devViews: ['inspect', 'logs', 'test', 'timing'],
  mainViewColors: {
    draft: 'primary',
    save: 'none',
    export: 'none',
    designs: 'accent',
  },
  // View components
  // Facilitate lookup of view components
  viewComponents: {
    draft: 'DraftView',
    designs: 'DesignsView',
    save: 'ViewPicker',
    export: 'ViewPicker',
    measurements: 'MeasurementsView',
    printLayout: 'ViewPicker',
    editSettings: 'ViewPicker',
    docs: 'ViewPicker',
    inspect: 'ViewPicker',
    logs: 'ViewPicker',
    test: 'ViewPicker',
    timing: 'ViewPicker',
    picker: 'ViewPicker',
    error: 'ViewPicker',
  },
  // Facilitate lookup of menu value components
  menuValueComponents: {
    bool: 'BoolValue',
    constant: 'ConstantOptionValue',
    count: 'CountOptionValue',
    deg: 'DegOptionValue',
    list: 'ListOptionValue',
    mm: 'MmOptionValue',
    pct: 'PctOptionValue',
  },
  menuGroupEmojis: {
    advanced: '🤓',
    fit: '👕',
    style: '💃🏽',
    dflt: '🕹️',
    groupDflt: '📁',
  },
  // i18n
  i18nPatternNamespaces: ['plugin-annotations'],
  // State backend (one of 'react', 'storage', 'session', or 'url')
  stateBackend: 'url',
}

/*
 * This hook returns the swizzled configuration
 */
export const useConfig = (config = {}) => {
  const mergedConfig = {
    ...defaultConfig,
    ...config,
  }
  mergedConfig.views = [
    ...mergedConfig.mainViews,
    ...mergedConfig.extraViews,
    ...mergedConfig.devViews,
  ]

  return mergedConfig
}
