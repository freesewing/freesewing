import fs_ from 'fs'
import path from 'path'
import { Buffer } from 'buffer'
import sharp from 'sharp'
import { capitalize } from '../../utils.mjs'

const fs = fs_.promises

const config = {
  template: ['..', '..', 'artwork', 'og', 'template.svg'],
  chars: {
    title_1: 18,
    title_2: 19,
    title_3: 20,
    intro: 34,
    sub: 42,
  },
}

// Load template once at startup
const template = fs_.readFileSync(path.resolve(...config.template), 'utf-8')

/* Find longest possible place to split a string */
const splitLine = (line, chars) => {
  const words = line.split(' ')
  if (words[0].length > chars) {
    // Force a word break
    return [line.slice(0, chars - 1) + '-', line.slice(chars - 1)]
  }
  // Glue chunks together until it's too long
  let firstLine = ''
  let max = false
  for (const word of words) {
    if (!max && `${firstLine}${word}`.length <= chars) firstLine += `${word} `
    else max = true
  }

  return [firstLine, words.join(' ').slice(firstLine.length)]
}

/* Divide title into lines to fit on image */
const titleAsLines = (title) => {
  // Does it fit on one line?
  if (title.length <= config.chars.title_1) return [title]
  // Does it fit on two lines?
  let lines = splitLine(title, config.chars.title_1)
  if (lines[1].length <= config.chars.title_2) return lines
  // Three lines it is
  return [lines[0], ...splitLine(lines[1], config.chars.title_2)]
}

/* Divive intro into lines to fit on image */
const introAsLines = (intro) => {
  // Does it fit on one line?
  if (intro.length <= config.chars.intro) return [intro]
  // Two lines it is
  return splitLine(intro, config.chars.intro)
}

// Get title and intro
const getMetaData = async ({ slug, title, intro, site, lead = false }) => {
  const chunks = slug.split('/')
  if (site === 'dev') {
    // Home page
    if (chunks.length === 1 && chunks[0] === '') {
      return {
        title: ['FreeSewing.dev'],
        intro: introAsLines('FreeSewing documentation for developers and contributors'),
        sub: ['With guides, tutorials,', "How-to's and more"],
        lead: '.dev',
      }
    } else {
      // MDX page
      return {
        title: titleAsLines(title),
        intro: introAsLines(intro),
        sub: ['https://freesewing.dev/', slug],
        lead: lead || capitalize(chunks[0]),
      }
    }
  }
}

/* Hide unused placeholders */
const hidePlaceholders = (list) => {
  let svg = template
  for (const i of list) {
    svg = svg.replace(`${i}title_1`, '').replace(`${i}title_2`, '').replace(`${i}title_3`, '')
  }

  return svg
}

/* Place text in SVG template */
const decorateSvg = (data) => {
  let svg
  // Single title line
  if (data.title.length === 1) {
    svg = hidePlaceholders([2, 3]).replace(`1title_1`, data.title[0])
  }
  // Double title line
  else if (data.title.length === 2) {
    svg = hidePlaceholders([1, 3])
      .replace(`2title_1`, data.title[0])
      .replace(`2title_2`, data.title[1])
  }
  // Triple title line
  else if (data.title.length === 3) {
    svg = hidePlaceholders([1, 2])
      .replace(`3title_1`, data.title[0])
      .replace(`3title_2`, data.title[1])
      .replace(`3title_3`, data.title[2])
  }

  return svg
    .replace('sub_1', data.sub[0] || '')
    .replace('sub_2', data.sub[1] || '')
    .replace(`intro_1`, data.intro[0] || '')
    .replace(`intro_2`, data.intro[1] || '')
    .replace('lead_1', data.lead || '')
}

const writeAsPng = async (svg, site, slug) => {
  const dir = path.resolve(path.join('..', '..', 'sites', site, 'public', 'og', ...slug.split('/')))
  await fs.mkdir(dir, { recursive: true })
  // Turn into PNG
  sharp(Buffer.from(svg, 'utf-8'))
    .resize({ width: 1200 })
    .toBuffer(async (err, data) => {
      if (err) console.log(err)
      if (data) return await fs.writeFile(path.join(dir, 'og.png'), data)
      else console.log('No data for', slug)
    })
}

/* This generates open graph images
 *
 * data holds {
 *   lang,
 *   site,
 *   title,
 *   intro,
 *   slug
 * }
 */

export const prebuildOgImages = async (data) => {
  // Inject into SVG
  const meta = await getMetaData(data)
  const svg = decorateSvg(meta)
  try {
    await writeAsPng(svg, data.site, data.slug)
  } catch (err) {
    console.log('Could not write PNG for', data, meta)
  }
}
