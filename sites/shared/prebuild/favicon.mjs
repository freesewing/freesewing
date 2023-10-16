import { copyFile } from 'node:fs/promises'
import path from 'path'

const files = [
  'android-chrome-192x192.png',
  'android-chrome-384x384.png',
  'apple-touch-icon.png',
  'browserconfig.xml',
  'favicon-16x16.png',
  'favicon-32x32.png',
  'favicon.ico',
  'mstile-150x150.png',
  'safari-pinned-tab.svg',
  'site.webmanifest',
]

export const prebuildFavicon = async (store) => {
  // Setup from/to folders
  const from = ['..', 'shared', 'favicon']
  const to = ['..', store.site, 'public']

  const promises = []
  for (const file of files)
    promises.push(copyFile(path.resolve(...from, file), path.resolve(...to, file)))

  store.favicon = files

  return Promise.all(promises)
}
