import execa from 'execa'
import { gitToAuthor, authors as authorInfo } from '../../../config/authors.mjs'
import path from 'path'
import fs from 'fs'
import rdir from 'recursive-readdir'
import { getMdxFileList, fileToSlug } from './docs.mjs'

const divider = '____'

const parseLog = (line) => line.split(divider).map((item) => item.trim())

/*
 * Extracts git authors and last modification date from git log.
 * Strictly speaking, it's the last commit date, but you get the idea.
 */
export const getGitMetadata = async (file, site) => {
  const slug = fileToSlug(file, site, 'en')
  const log = await execa.command(
    `git log --pretty="format:%cs${divider}%aN${divider}%aE" ${file}`,
    { shell: true }
  )

  const authors = new Set()
  let lastUpdated = false
  for (const line of log.stdout.split('\n')) {
    const [date, author, email] = parseLog(line)
    if (!lastUpdated) lastUpdated = date.split('-').join('')
    let key = false
    if (typeof authorInfo[author] !== 'undefined') key = author
    else {
      if (typeof gitToAuthor[author] !== 'undefined') {
        key = gitToAuthor[author]
      } else if (typeof gitToAuthor[email] !== 'undefined') {
        key = gitToAuthor[email]
      }
    }
    if (!key) throw `Git author email ${email} is unknown in the git-to-author table`
    else authors.add(key)
  }

  return {
    lastUpdated,
    authors,
    slug,
  }
}

/*
 * Main method that does what needs doing
 */
export const prebuildGitData = async (site) => {
  // Say hi
  console.log()
  console.log(`Prebuilding git author data for freesewing.${site}`)

  // Setup MDX root path
  const root = ['..', '..', 'markdown', site]
  if (site === 'org') root.push('docs')
  const mdxRoot = path.resolve(...root)

  const pages = {}

  // Get list of filenames
  const list = await getMdxFileList(mdxRoot, 'en')

  // Loop over files
  for (const file of list) {
    const { lastUpdated, authors, slug } = await getGitMetadata(file, site)
    pages[slug] = { lastUpdated, authors: [...authors] }
  }
  // Write page to disk
  const dir = path.resolve('..', site, 'prebuild')
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(
    path.resolve(dir, `doc-updates.mjs`),
    `export const docUpdates = ${JSON.stringify(pages)}`
  )

  // How about some stats
  const stats = {}
  for (const slug in pages) {
    for (const author of pages[slug].authors) {
      if (typeof stats[author] === 'undefined') stats[author] = 0
      stats[author]++
    }
  }

  fs.writeFileSync(
    path.resolve(dir, `doc-stats.mjs`),
    `export const docStats = ${JSON.stringify(stats, null, 2)}`
  )

  return pages
}
