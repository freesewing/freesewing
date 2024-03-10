import { execa } from 'execa'
import { exec } from 'node:child_process'
import { gitToAuthor, authors as authorInfo } from '../../../config/authors.mjs'
import path from 'path'
import fs from 'fs'
import { yyyymmdd } from '../utils.mjs'

const divider = '____'

const parseLog = (line) => line.split(divider).map((item) => item.trim())

/*
 * Helper method to get the website slug (path) from the file path
 */
const fileToSlug = (file, site, lang) =>
  file.slice(-6) === `/${lang}.md` ? file.split(`/markdown/${site}/`).pop().slice(0, -6) : false

/*
 * Extracts git authors and last modification date from git log.
 * Strictly speaking, it's the last commit date, but you get the idea.
 */
export const getGitMetadata = async (file, site) => {
  const slug = fileToSlug(file, site, 'en')
  if (!slug) console.log({ file, slug })
  const log = await execa(`git log --pretty="format:%cs${divider}%aN${divider}%aE" ${file}`, {
    shell: true,
  })

  const authors = new Set()
  let lastUpdated = false
  for (const line of log.stdout.split('\n')) {
    const [date, author, email] = parseLog(line)
    if (!lastUpdated) lastUpdated = date.split('-').join('')
    let key = false
    if (typeof authorInfo[author] !== 'undefined') key = author
    else if (typeof authorInfo[email] !== 'undefined') key = author
    else {
      if (typeof gitToAuthor[author] !== 'undefined') key = gitToAuthor[author]
      else if (typeof gitToAuthor[email] !== 'undefined') key = gitToAuthor[email]
    }
    if (!key) {
      if (typeof email === 'undefined') {
        // This means files lack git history (they are new and haven't been committed yet)
        authors.add('unknown')
      } else {
        // There is a git history, but the author is not known
        console.log('Missing git author info for:', { email, author, slug })
        // Don't throw, it's annotying
        //throw `Git author email ${email} is unknown in the git-to-author table`
      }
    } else authors.add(key)
  }

  return {
    lastUpdated,
    authors,
    slug,
  }
}

/*
 * Writes data to the prebuild files
 */
const writeData = async (store) => {
  // Write page to disk
  const dir = path.resolve('..', store.site, 'prebuild')
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(
    path.resolve(dir, `doc-updates.mjs`),
    `export const docUpdates = ${JSON.stringify(store.git.pages)}`
  )

  fs.writeFileSync(
    path.resolve(dir, `doc-stats.mjs`),
    `export const docStats = ${JSON.stringify(store.git.stats)}`
  )
}

/*
 * Helper method to load all MDX files from a folder
 */
const getMdxFileList = async (cwd) => {
  const cmd = `find ${cwd} -type f -name "en.md"`
  const find = exec(cmd, { cwd }, (error, stdout, stderr) => {
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
  for await (const data of find.stdout) stdout += data

  /*
   * Rerturn all matches as  a sorted array
   */
  return stdout.split('\n').sort()
}

/*
 * Main method that does what needs doing
 */
export const prebuildGitData = async (store, mock) => {
  if (mock) {
    store.git = mockedData(store)
    return writeData(store)
  }

  // Setup MDX root path
  const root = ['..', '..', 'markdown', store.site]
  if (store.site === 'org') root.push('docs')
  const mdxRoot = path.resolve(...root)

  store.git = {
    pages: {},
    stats: {},
  }

  // Get list of filenames
  const list = await getMdxFileList(mdxRoot)
  // Loop over files
  for (const file of list) {
    // This list will include '' which we don't want to get the git log for as that
    // will return  the entire history
    if (file) {
      const { lastUpdated, authors, slug } = await getGitMetadata(file, store.site)
      store.git.pages[slug] = { u: lastUpdated, a: [...authors] }
    }
  }

  // How about some stats
  for (const slug in store.git.pages) {
    for (const author of store.git.pages[slug].a) {
      if (typeof store.git.stats[author] === 'undefined') store.git.stats[author] = 0
      store.git.stats[author]++
    }
  }

  return writeData(store)
}

/*
 * In development, we return this mocked data to speed things up
 */
const mockedData = (store) => {
  const pages = {}
  const u = yyyymmdd()
  for (const slug of store.navigation.sluglut) pages[slug] = { u, a: ['mocked'] }

  return {
    pages,
    stats: { mocked: store.navigation.sluglut.length },
  }
}
