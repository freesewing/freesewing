/*************************************************************************
 *                                                                       *
 * FreeSewing's pattern editor allows swizzling the config               *
 *                                                                       *
 * To 'swizzle' means to replace a default implementation with a         *
 * custom one. It allows one to customize the pattern editor.            *
 *                                                                       *
 * This file holds the 'swizzleConfig' method that will return           *
 * the merged configuration.                                             *
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
  utilViews: ['picker'],
  measurementsFreeViews: ['designs', 'measurements', 'docs', 'picker'],
  mainViewColors: {
    draft: 'primary',
    save: 'none',
    export: 'none',
    designs: 'accent',
    measurements: 'primary',
    docs: 'secondary',
  },
  // View components
  // Facilitate lookup of view components
  viewComponents: {
    draft: 'DraftView',
    designs: 'DesignsView',
    save: 'SaveView',
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
  // Facilitate custom handlers for core settings
  menuCoreSettingsHandlerMethods: {
    only: 'menuCoreSettingsOnlyHandler',
    sabool: 'menuCoreSettingsSaboolHandler',
    samm: 'menuCoreSettingsSammHandler',
  },
  menuGroupEmojis: {
    advanced: '🤓',
    fit: '👕',
    style: '💃🏽',
    dflt: '🕹️',
    groupDflt: '📁',
  },
  menuOptionEditLabels: {
    pct: '%',
    count: '#',
    deg: '°',
    mm: 'mm',
  },
  // i18n
  i18nPatternNamespaces: ['plugin-annotations'],
  // State backend (one of 'react', 'storage', 'session', or 'url')
  stateBackend: 'url',
  // UX levels
  uxLevels: {
    core: {
      sa: 1,
      paperless: 2,
      units: 1,
      complete: 3,
      expand: 4,
      only: 4,
      scale: 3,
      margin: 3,
    },
    ui: {
      renderer: 4,
      aside: 3,
      kiosk: 3,
      rotate: 4,
      ux: 1,
    },
    views: {
      draft: 1,
      measurements: 1,
      test: 4,
      timing: 4,
      printLayout: 2,
      export: 1,
      save: 1,
      editSettings: 3,
      logs: 4,
      inspect: 4,
      docs: 1,
      designs: 1,
      picker: 1,
    },
  },
  defaultUx: 4,
  // Flag types
  flagTypes: ['error', 'warn', 'note', 'info', 'tip', 'fixme'],
  // Initial state
  initialState: {
    settings: {},
    ui: {
      renderer: 'react',
      kiosk: 0,
      aside: 1,
      ux: 4,
    },
    locale: 'en',
  },
  loadingStatus: {
    timeout: 2,
    defaults: {
      color: 'secondary',
      icon: 'Spinner',
    },
  },
  classes: {
    horFlex: 'flex flex-row items-center justify-between gap-4 w-full',
    horFlexNoSm: 'md:flex md:flex-row md:items-center md:justify-between md:gap-4 md-w-full',
    link: 'underline decoration-2 hover:decoration-4 text-secondary hover:text-secondary-focus',
  },
  roles: {
    levels: {
      readNone: 0,
      readSome: 1,
      readOnly: 2,
      writeSome: 3,
      user: 4,
      tester: 4,
      curator: 5,
      bughunter: 6,
      support: 8,
      admin: 9,
    },
    base: 'user',
  },
  // Ms before to fade out a notification
  notifyTimeout: 6660,
}

/*
 * This method returns the swizzled configuration
 */
export const swizzleConfig = (config = {}) => {
  const mergedConfig = {
    ...defaultConfig,
    ...config,
  }
  mergedConfig.views = [
    ...mergedConfig.mainViews,
    ...mergedConfig.extraViews,
    ...mergedConfig.devViews,
    ...mergedConfig.utilViews,
  ]

  return mergedConfig
}
