import config from "../config";
import { capitalize } from "../utils";
import sharp from 'sharp';
import fs from "fs";
import path from "path";
import axios from 'axios'
import remark from 'remark'
import remarkParse from 'remark-parse'
import remarkFrontmatter from 'remark-frontmatter'
import toString from 'mdast-util-to-string'
import { Buffer } from 'buffer'
import yaml from 'yaml'

// Sites for which we generate images
const sites = ['dev', 'org']
// Langauges for which we generate images
const languages = ['en', 'fr', 'de', 'es', 'nl' ]

// Load template once at startup
const template = fs.readFileSync(
  path.resolve(...config.og.template),
  'utf-8'
)

/* Helper method to extract intro from strapi markdown */
const introFromStrapiMarkdown = async (md, slug) => {
  const tree = await remark().use(remarkParse).parse(md)
  if (tree.children[0].type !== 'paragraph')
    console.log('Markdown does not start with paragraph', slug)

  return toString(tree.children[0])
}

/* Helper method to extract title from markdown frontmatter */
const titleAndIntroFromLocalMarkdown = async (md, slug) => {
  const tree = await remark()
    .use(remarkParse)
    .use(remarkFrontmatter, ['yaml'])
    .parse(md)

  if (tree.children[0].type !== 'yaml')
    console.log('Markdown does not start with frontmatter', slug)
  else return {
    title: titleAsLines(yaml.parse(tree.children[0].value).title),
    intro: introAsLines(toString(tree.children.slice(1, 2)))
  }

  return false
}

/* Helper method to load dev blog post */
const loadDevBlogPost = async (slug) => {
  const result = await axios.get(
    `${config.strapi}/blogposts?_locale=en&dev_eq=true&slug_eq=${slug}`
  )
  if (result.data) return {
    title: titleAsLines(result.data[0].title),
    intro: introAsLines(await introFromStrapiMarkdown(result.data[0].body, slug)),
    sub: [
      result.data[0].author.displayname,
      new Date(result.data[0].published_at).toString().split(' ').slice(0,4).join(' '),
    ],
    lead: 'Developer Blog',
  }

  return false
}

/* Helper method to load markdown file from disk */
const loadMarkdownFile = async (page, site, lang) => fs.promises.readFile(
  path.resolve('..', '..', 'markdown', site, ...page.split('/'), `${lang}.md`),
  'utf-8'
).then(async (md) => md
  ? {
    ...(await titleAndIntroFromLocalMarkdown(md, page)),
    sub: [
      'freesewing.dev/',
      page
    ],
    lead: capitalize(page.split('/').shift())
  }
  : false
)

/* Find longest possible place to split a string */
const splitLine = (line, chars) => {
  const words = line.split(' ')
  if (words[0].length > chars) {
    // Force a word break
    return [ line.slice(0, chars-1)+'-', line.slice(chars-1) ]
  }
  // Glue chunks together until it's too long
  let firstLine = ''
  let max = false
  for (const word of words) {
    if (!max && `${firstLine}${word}`.length <= chars) firstLine += `${word} `
    else max = true
  }

  return [ firstLine, words.join(' ').slice(firstLine.length) ]
}

/* Divide title into lines to fit on image */
const titleAsLines = title => {
  // Does it fit on one line?
  if (title.length <= config.og.chars.title_1) return [title]
  // Does it fit on two lines?
  let lines = splitLine(title, config.og.chars.title_1)
  if (lines[1].length <= config.og.chars.title_2) return lines
  // Three lines it is
  return [ lines[0], ...splitLine(lines[1], config.og.chars.title_2) ]
}

/* Divive intro into lines to fit on image */
const introAsLines = intro => {
  // Does it fit on one line?
  if (intro.length <= config.og.chars.intro) return [intro]
  // Two lines it is
  return splitLine(intro, config.og.chars.intro)
}

// Get title and intro
const getMetaData = {
  dev: async (page) => {
    const chunks = page.split('/')
    // Home page
    if (chunks.length === 1 && chunks[0] === '') return {
      title: ['FreeSewing.dev'],
      intro: introAsLines('FreeSewing API documentation and tutorials for developers and contributors'),
      sub: ['Also featuring', ' our developers blog'],
      lead: '.dev',
    }
    // Blog index page
    if (chunks.length === 1 && chunks[0] === 'blog') return {
      title: titleAsLines('FreeSewing Developer Blog'),
      intro: introAsLines("Contains no sewing news whatsover. Only posts for (aspiring) developers :)"),
      sub: ['freesewing.dev', '/blog'],
      lead: 'Developer Blog',
    }
    // Blog post
    if (chunks.length === 2 && chunks[0] === 'blog') {
      return await loadDevBlogPost(chunks[1])
    }
    // Other (MDX) page
    const md = await loadMarkdownFile(page, 'dev', 'en')

    // Return markdown info or default generic data
    return md
      ? md
      : {
      title: titleAsLines('FreeSewing.dev'),
      intro: introAsLines('Documentation, guides, and howtos for contributors and developers alike'),
      sub: ['https://freesewing.dev/', '&lt;== Check it out'],
      lead: 'freesewing.dev'
    }
  },
  org: async (page, site, lang) => ({})
}

/* Hide unused placeholders */
const hidePlaceholders = list => {
  let svg = template
  for (const i of list) {
    svg = svg
      .replace(`${i}title_1`, '')
      .replace(`${i}title_2`, '')
      .replace(`${i}title_3`, '')
  }

  return svg
}

/* Place text in SVG template */
const decorateSvg = data => {
  let svg
  // Single title line
  if (data.title.length === 1) {
    svg = hidePlaceholders([2,3])
      .replace(`1title_1`, data.title[0])
  }
  // Double title line
  else if (data.title.length === 2) {
    svg = hidePlaceholders([1,3])
      .replace(`2title_1`, data.title[0])
      .replace(`2title_2`, data.title[1])
  }
  // Triple title line
  else if (data.title.length === 3) {
    svg = hidePlaceholders([1,2])
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

/* This generates open graph images */

function OgController() { }

OgController.prototype.image = async function (req, res) {
  // Extract path parameters
  const { lang='en', site='dev' } = req.params
  const page = req.params["0"]
  if (sites.indexOf(site) === -1) return res.send({error: 'sorry'})
  if (languages.indexOf(lang) === -1) return res.send({error: 'sorry'})

  // Load meta data
  const data = await getMetaData[site](page, site, lang)
  // Inject into SVG
  const svg = decorateSvg(data)
  // Turn into PNG
  sharp(Buffer.from(svg, 'utf-8'))
    .resize({ width: 1200 })
    .toBuffer((err, data, info) => {
      if (err) console.log(err)
      return res.type('png').send(data)
    })
}



export default OgController;
