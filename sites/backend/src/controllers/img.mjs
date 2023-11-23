import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { imgConfig } from '../config.mjs'

/*
 * Load SVG templates once at startup
 */
const templates = {}
for (const type of Object.keys(imgConfig.templates.sizes)) {
  templates[type] = fs.readFileSync(
    path.resolve(...imgConfig.templates.folder, `${type}.svg`),
    'utf-8'
  )
}

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

  return [firstLine.trim(), words.join(' ').slice(firstLine.length).trim()]
}

/* Divide title into lines to fit on image */
const titleAsLines = (title, type) => {
  // Does it fit on one line?
  if (title.length <= imgConfig.templates.chars[type].title_1) return [title]
  // Does it fit on two lines?
  let lines = splitLine(title, imgConfig.templates.chars[type].title_1)
  if (lines[1].length <= imgConfig.templates.chars[type].title_2) return lines
  // Does it fit on three lines?
  lines = [lines[0], ...splitLine(lines[1], imgConfig.templates.chars[type].title_2)]
  if (lines[2].length <= imgConfig.templates.chars[type].title_3) return lines
  // Does it fit on four lines?
  lines = [lines[0], lines[1], ...splitLine(lines[2], imgConfig.templates.chars[type].title_3)]
  if (lines[3].length <= imgConfig.templates.chars[type].title_4) return lines
  // Five lines it is
  return [
    lines[0],
    lines[1],
    lines[2],
    ...splitLine(lines[3], imgConfig.templates.chars[type].title_4),
  ]
}

/* Divive intro into lines to fit on image */
const introAsLines = (intro, type) => {
  // Does it fit on one line?
  if (intro.length <= imgConfig.templates.chars[type].intro) return [intro]
  // Two lines it is
  const lines = splitLine(intro, imgConfig.templates.chars[type].intro)
  if (lines[1].length > imgConfig.templates.chars[type].intro)
    lines[1] = lines[1].slice(0, imgConfig.templates.chars[type].intro) + '…'

  return lines
}

/* Hide unused placeholders */
const hidePlaceholders = (list, type) => {
  let svg = templates[type]
  for (const i of list) {
    svg = svg
      .replace(`__${i}title_1__`, '')
      .replace(`__${i}title_2__`, '')
      .replace(`__${i}title_3__`, '')
      .replace(`__${i}title_4__`, '')
      .replace(`__${i}title_5__`, '')
  }

  return svg
}

/* Place text in SVG template */
const decorateSvg = (data) => {
  let svg
  // Single title line
  if (data.title.length === 1) {
    svg = hidePlaceholders([2, 3, 4, 5], data.type).replace(`__1title_1__`, data.title[0])
  }
  // Double title line
  else if (data.title.length === 2) {
    svg = hidePlaceholders([1, 3, 4, 5], data.type)
      .replace(`__2title_1__`, data.title[0])
      .replace(`__2title_2__`, data.title[1])
  }
  // Triple title line
  else if (data.title.length === 3) {
    svg = hidePlaceholders([1, 2, 4, 5], data.type)
      .replace(`__3title_1__`, data.title[0])
      .replace(`__3title_2__`, data.title[1])
      .replace(`__3title_3__`, data.title[2])
  }
  // Quadruple title line
  else if (data.title.length === 4) {
    svg = hidePlaceholders([1, 2, 3, 5], data.type)
      .replace(`__4title_1__`, data.title[0])
      .replace(`__4title_2__`, data.title[1])
      .replace(`__4title_3__`, data.title[2])
      .replace(`__4title_4__`, data.title[3])
  }
  // Quintuple title line
  else if (data.title.length === 5) {
    svg = hidePlaceholders([1, 2, 3, 4], data.type)
      .replace(`__5title_1__`, data.title[0])
      .replace(`__5title_2__`, data.title[1])
      .replace(`__5title_3__`, data.title[2])
      .replace(`__5title_4__`, data.title[3])
      .replace(`__5title_5__`, data.title[4])
  }

  return svg
    .replace(`__intro_1__`, data.intro[0] || '')
    .replace(`__intro_2__`, data.intro[1] || '')
    .replace('__site__', data.site || '')
}

export function ImgController() {}

const parseInput = (req) => {
  let input = {}
  if (req.params.data) {
    try {
      input = JSON.parse(decodeURIComponent(req.params.data))
    } catch (err) {
      console.log(err)
    }
  } else input = req.body

  return input
}

/*
 * Generate an Open Graph image
 * See: https://freesewing.dev/reference/backend/api
 */
ImgController.prototype.generate = async (req, res) => {
  const input = parseInput(req)
  /*
   * Extract body parameters
   */
  const { site = false, title = '', intro = '', type = 'wide' } = input
  if (site && imgConfig.sites.indexOf(site) === -1)
    return res.status(400).send({ error: 'invalidSite' })

  /*
   * Preformat data for SVG template
   */
  const data = {
    title: titleAsLines(title, type),
    intro: introAsLines(intro, type),
    site: site ? 'FreeSewing.' + site : '',
    type,
  }

  /*
   * Inject data into SVG template
   */
  const svg = decorateSvg(data)

  /*
   * Convert to PNG and return
   */
  sharp(Buffer.from(svg, 'utf-8'))
    .resize({ width: imgConfig.templates.sizes[type] })
    .toBuffer((err, data) => {
      if (err) console.log(err)
      return res.type('png').send(data)
    })
}
