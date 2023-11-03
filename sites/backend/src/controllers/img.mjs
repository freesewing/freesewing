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
  return splitLine(intro, imgConfig.templates.chars[type].intro)
}

/* Hide unused placeholders */
const hidePlaceholders = (list, type) => {
  let svg = templates[type]
  for (const i of list) {
    svg = svg
      .replace(`${i}title_1`, '')
      .replace(`${i}title_2`, '')
      .replace(`${i}title_3`, '')
      .replace(`${i}title_4`, '')
      .replace(`${i}title_5`, '')
  }

  return svg
}

/* Place text in SVG template */
const decorateSvg = (data) => {
  let svg
  // Single title line
  if (data.title.length === 1) {
    svg = hidePlaceholders([2, 3, 4, 5], data.type).replace(`1title_1`, data.title[0])
  }
  // Double title line
  else if (data.title.length === 2) {
    svg = hidePlaceholders([1, 3, 4, 5], data.type)
      .replace(`2title_1`, data.title[0])
      .replace(`2title_2`, data.title[1])
  }
  // Triple title line
  else if (data.title.length === 3) {
    svg = hidePlaceholders([1, 2, 4, 5], data.type)
      .replace(`3title_1`, data.title[0])
      .replace(`3title_2`, data.title[1])
      .replace(`3title_3`, data.title[2])
  }
  // Quadruple title line
  else if (data.title.length === 4) {
    svg = hidePlaceholders([1, 2, 3, 5], data.type)
      .replace(`4title_1`, data.title[0])
      .replace(`4title_2`, data.title[1])
      .replace(`4title_3`, data.title[2])
      .replace(`4title_4`, data.title[3])
  }
  // Quintuple title line
  else if (data.title.length === 5) {
    svg = hidePlaceholders([1, 2, 3, 4], data.type)
      .replace(`5title_1`, data.title[0])
      .replace(`5title_2`, data.title[1])
      .replace(`5title_3`, data.title[2])
      .replace(`5title_4`, data.title[3])
      .replace(`5title_5`, data.title[4])
  }

  return svg
    .replace(`intro_1`, data.intro[0] || '')
    .replace(`intro_2`, data.intro[1] || '')
    .replace('site', data.site || '')
}

export function ImgController() {}

/*
 * Generate an Open Graph image
 * See: https://freesewing.dev/reference/backend/api
 */
ImgController.prototype.generate = async (req, res, tools) => {
  /*
   * Extract body parameters
   */
  const {
    site = false,
    title = 'Please provide a title',
    intro = 'Please provide an intro',
    type = 'wide',
  } = req.body
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
    .toBuffer((err, data, info) => {
      if (err) console.log(err)
      return res.type('png').send(data)
    })
}
