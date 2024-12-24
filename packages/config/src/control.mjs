/*
 * This configuration file holds various control levels.
 * Control is a setting that determines what to hide/show in the UI
 *
 * This file has the following named exports:
 *
 * accountControlLevels: Fields and control levels, and other account related settings
 * controlLevels: Consolidated object holding all control levels
 * defaultControlLevel: The default control level to apply when we have no user-specific level
 * editorControlLevels: Configuration for the pattern editor
 *
 * They are all re-exported from index.mjs
 */

/*
 * The default control level in case we have nothing more specific
 */
const dflt = 3

/*
 * Structure of the various account fields and their control levels
 */
const account = {
  fields: {
    data: {
      bookmarks: 2,
      sets: 1,
      patterns: 1,
    },
    info: {
      img: 2,
      bio: 2,
      email: 3,
      username: 2,
    },
    settings: {
      consent: 2,
      compare: 3,
      newsletter: 2,
      units: 2,
      control: 1,
    },
    security: {
      password: 2,
      mfa: 3,
      apikeys: 4,
    },
    identities: {
      github: 3,
      instagram: 3,
      mastodon: 3,
      reddit: 3,
      twitch: 3,
      tiktok: 3,
      website: 3,
    },
  },
  sets: {
    name: 1,
    img: 1,
    public: 3,
    units: 1,
    notes: 2,
    createdAt: 2,
    updatedAt: 2,
    id: 4,
  },
  patterns: {
    name: 1,
    img: 1,
    public: 3,
    notes: 2,
    createdAt: 2,
    updatedAt: 2,
    id: 4,
  },
  statuses: {
    0: {
      name: 'inactive',
      color: 'neutral',
    },
    1: {
      name: 'active',
      color: 'success',
    },
    '-1': {
      name: 'paused',
      color: 'warning',
    },
    '-2': {
      name: 'disabled',
      color: 'error',
    },
  },
}

/*
 * Editor control levels
 */
const editor = {
  core: {
    sa: 2,
    paperless: 2,
    locale: 3,
    units: 1,
    complete: 4,
    expand: 4,
    only: 4,
    scale: 4,
    margin: 4,
  },
  ui: {
    renderer: 4,
    kiosk: 2,
  },
  views: {
    draft: 1,
    measies: 1,
    test: 3,
    time: 3,
    print: 1,
    export: 1,
    save: 1,
    edit: 4,
    logs: 2,
    inspect: 4,
    docs: 1,
  },
}

export const control = {
  account,
  editor,
  dflt,
  flat: {
    ...account.fields.data,
    ...account.fields.info,
    ...account.fields.settings,
    ...account.fields.security,
    ...account.fields.identities,
    sets: account.sets,
    core: editor.core,
    ui: editor.ui,
    views: editor.views,
  },
}

export const controlDesc = {
  1: {
    title: `Keep it as simple as possible`,
    desc: `Hides all but the most crucial features.`,
  },
  2: {
    title: `Keep it simple, but not too simple`,
    desc: `Hides the majority of features.`,
  },
  3: {
    title: `Balance simplicity with power`,
    desc: `Reveals the majority of features, but not all.`,
  },
  4: {
    title: `Give me all powers, but keep me safe`,
    desc: `Reveals all features, keeps handrails and safety checks`,
  },
  5: {
    title: `Get out of my way`,
    desc: `Reveals all features, removes handrails and safety checks`,
  },
}
