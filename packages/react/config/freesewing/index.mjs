/*
 * This configuration file has the following named exports:
 *
 * account: Fields and control levels, and other account related settings
 * backend: URL of the FreeSewing backend
 * editor: Configuration for the pattern editor
 * monorepo: URL of the FreeSewing monorepo
 * social : Social media and other account links for FreeSewing
 * controlLevels: Consolidated object holding all control levels
 */

/*
 * Structure of the various account fields and their control levels
 */
export const account = {
  fields: {
    data: {
      bookmarks: 2,
      sets: 1,
      patterns: 1,
      apikeys: 4,
    },
    info: {
      username: 2,
      bio: 2,
      img: 2,
      email: 3,
    },
    settings: {
      language: 2,
      units: 2,
      newsletter: 2,
      compare: 3,
      control: 1,
      consent: 2,
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
 * URL of the FreeSewing backend
 */
export const backend = 'https://backend3.freesewing.org'

/*
 * The default control level in case we have nothing more specific
 */
export const defaultControlLevel = 3

/*
 * Editor control levels
 */
export const editor = {
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

/*
 * URL of the FreeSewing monorepo
 */
export const monorepo = 'https://github.com/freesewing/freesewing'

/*
 * Social media and other account links for FreeSewing
 */
export const social = {
  YouTube: 'https://www.youtube.com/@freesewing',
  Discord: 'https://discord.freesewing.org/',
  Instagram: 'https://instagram.com/freesewing_org',
  Facebook: 'https://www.facebook.com/groups/627769821272714/',
  GitHub: 'https://github.com/freesewing',
  Reddit: 'https://www.reddit.com/r/freesewing/',
  Mastodon: 'https://freesewing.social/@freesewing',
  Bluesky: 'https://bsky.app/profile/freesewing.org',
}

/*
 * Consolidated object holding all control levels
 */
export const controlLevels = {
  ...account.fields.data,
  ...account.fields.info,
  ...account.fields.settings,
  ...account.fields.security,
  ...account.fields.identities,
  sets: account.sets,
  core: editor.core,
  ui: editor.ui,
  views: editor.views,
}
