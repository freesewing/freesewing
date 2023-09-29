import rdir from 'recursive-readdir'
import path from 'path'

const ignore = [
  'node_modules',
  '.eslint',
  '.gitignore',
  '.md',
  '.next',
  'prebuild.mjs',
  'prebuild',
  'public/locales',
  'shared/config/measurements.js',
  'sde/public/android-chrome-192x192.png',
  'sde/public/android-chrome-384x384.png',
  'sde/public/apple-touch-icon.png',
  'sde/public/browserconfig.xml',
  'sde/public/favicon-16x16.png',
  'sde/public/favicon-32x32.png',
  'sde/public/favicon.ico',
  'sde/public/mstile-150x150.png',
  'sde/public/safari-pinned-tab.svg',
  'sde/public/site.webmanifest',
]

const getFiles = async (dir) => {
  const all = await rdir(path.resolve(dir))
  return all
    .filter((file) => {
      for (const skip of ignore) {
        if (file.includes(skip)) return false
      }
      return true
    })
    .map((file) => file.split('/sites/').pop())
}

const doIt = async () => {
  let files = []
  const sde = await getFiles('../../sites/sde')
  const shared = await getFiles('../../sites/shared/config')
  console.log(JSON.stringify([...shared, ...sde], null, 2))
}

doIt()
