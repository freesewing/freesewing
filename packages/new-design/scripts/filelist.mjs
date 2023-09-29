import rdir from 'recursive-readdir'
import path from 'path'
import fs from 'node:fs'
import { exec } from 'node:child_process'

const ignore = [
  'node_modules',
  '.eslint',
  '.gitignore',
  '.md',
  '.next',
  'prebuild.mjs',
  //'prebuild',
  //'public/locales',
  //'shared/config/measurements.js',
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

const searchFiles = async (dirs) => {
  /*
   * Figure out what directory to spawn the child process in
   */
  const cwd = await path.resolve(process.cwd())

  /*
   * Holds the matches
   */
  const matches = []

  /*
   * When going through a small number of files in a flat directory (eg. blog posts) a
   * recursive grep through all files is faster.
   * But the biggest task is combing through all the org documentation and for this
   * it's much faster to first run find to limit the number of files to open
   */
  for (const dir of dirs) {
    const cmd = `grep "__SDEFILE__" -Rislm 1 ${path.resolve(cwd, dir)}`
    const grep = exec(cmd, { cwd, maxBuffer: 2048 * 1024 }, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error} - ${stderr}`)
        return
      }

      return stdout
    })

    /*
     * Stdout is buffered, so we need to gather all of it
     */
    let stdout = ''
    for await (const data of grep.stdout) stdout += data

    /*
     * Add all all matches to the array
     */
    matches.push(
      ...stdout
        .split('\n')
        .filter((entry) => entry.length > 2)
        .map((file) => file.split('/sites/').pop())
    )
  }

  return matches
}

const doIt = async () => {
  let files = []
  const sde = await getFiles('../../sites/sde')
  const shared = await searchFiles([
    '../../sites/shared/components',
    '../../sites/shared/config',
    '../../sites/shared/context',
    '../../sites/shared/hooks',
    '../../sites/shared/plugins',
    '../../sites/shared/styles',
    '../../sites/shared/themes',
  ])
  console.log(JSON.stringify([...sde, ...shared], null, 2))
}

doIt()
