import { config } from './config.mjs'
import { mkdir, readFile, writeFile, copyFile } from 'node:fs/promises'
import { join, resolve, dirname, extname } from 'path'
import mustache from 'mustache'
import rdir from 'recursive-readdir'
import chalk from 'chalk'
import prompts from 'prompts'
import {oraPromise} from 'ora'
import { execa } from 'execa'
import axios from 'axios'

const nl = "\n"
const tab = "  "
const nlt = nl+tab

// Checks for node 14 or higher
export const checkNodeVersion = () => {
  const node_version = process.version.slice(1).split('.')[0]
  if (parseInt(node_version) < config.node) {
    console.log(
      chalk.yellow(nlt+`⚠️  FreeSewing requires Node v${config.node} or newer`) +
      nl+nlt+'We hightly recommend using NVM to manage your Node versions:' +
      nlt+chalk.blue('https://github.com/nvm-sh/nvm') +
      nl+nlt+'When in doubt, pick an active LTS version:' +
      nlt+chalk.blue('https://nodejs.org/en/about/releases/')+nl+nl
    )
    process.exit(1)
  }
}

// Helper method to validate the design name
const validateDesignName = (name) => {
  if (/^([a-z]+)$/.test(name)) return true
  else return ' 🙈 Please use only [a-z], no spaces, no capitals, no nothing 🤷'
}

// Gets user input to figure out what to do
export const getChoices = async () => {

  const { template } = await prompts({
    type: 'select',
    name: 'template',
    message: 'What template would you like to use? 📑',
    choices: [
      { title: 'From Scratch', value: 'scratch', description: 'Create a design from scratch' },
      { title: 'Extend Brian', value: 'brian', description: "Extend the Brian design (basic torso block for menswear)" },
      { title: 'Extend Bent', value: 'bent', description: "Extend the Bent design (like brian with added two-part sleeve)" },
      { title: 'Extend Bella', value: 'bella', description: "Extend the Bella design (womenswear torso block)" },
      { title: 'Extend Breanna', value: 'breanna', description: "Extend the Breanna design (womenswear torso block - YMMV)" },
      { title: 'Extend Titan', value: 'titan', description: "Extend the Titan design (gender-neutral trouser block)" },
    ],
    initial: 0,
  })

  const { name } = await prompts({
    type: 'text',
    name: 'name',
    message: 'What name would you like the design to have? 🏷️ ([a-z] only)',
    validate: validateDesignName,
  })

  const { manager } = await prompts({
    type: 'select',
    name: 'manager',
    message: 'Last but not least, what package manager do you use? 📦',
    choices: [
      { title: 'yarn', value: 'yarn', description: 'Yarn - Nice if you have it' },
      { title: 'npm', value: 'npm', description: "NPM - Comes with NodeJS" },
    ],
    initial: 0,
  })

  return { template, name, manager }
}

// Keep track of directories that need to be created
const dirs = {}
const ensureDir = async (file, suppress=false) => {
  const dir = suppress
    ? dirname(file.replace(suppress))
    : dirname(file)
  if (!dirs[dir]) {
    await mkdir(dir, { recursive: true })
    dirs[dir] = true
  }
}

// Helper method to copy template files
const copyTemplate = async (config, choices) => {

  // Copy files in parallel rather than using await
  const promises = []

  // Copy shared files
  for (const from of config.files.shared) {
    const to = config.dest + from.slice(config.source.shared.length)
    if (!dirs[to]) await ensureDir(to)
    console.log(to)
    promises.push(copyFile(from, to))
  }

  // Template files
  for (const from of config.files.template) {
    const to = config.dest + from.slice(config.source.template.length)
    if (!dirs[to]) await ensureDir(to)
    if (extname(from) === '.json') {
      // Template out package.json
      const src = await readFile(from, 'utf-8')
      promises.push(
        writeFile(to, mustache.render(src, { name: choices.name }))
      )
    } else {
      // Just copy the file
      promises.push(copyFile(from, to))
    }
  }

  await Promise.all(promises)

  return
}

// Helper method to run [yarn|npm] install
const installDependencies = async (config, choices) => await execa(
  `${choices.manager} install`,
  {
    cwd: config.dest,
    shell: true
  }
)

// Helper method to download web environment
const downloadLabFiles = async (config) => {
  const base = 'https://raw.githubusercontent.com'
  const promises = []
  for (const dir in config.fetch) {
    for (const file of config.fetch[dir]) {
      const to = (typeof file === 'string')
        ? join(config.dest, file)
        : join(config.dest, file.to)
      if (!dirs[to]) await ensureDir(to)
      console.log(to)
      promises.push(
        axios.get(`${base}/${config.repo}/${config.branch}/${dir}/${typeof file === 'string' ? file : file.from}`)
        .catch(err => console.log(err))
        .then(res => promises.push(writeFile(to, res.data)))
      )
    }
  }

  await Promise.all(promises)

  return
}

// Creates the environment based on the user's choices
export const createEnvironment = async (choices) => {

  // Store directories for re-use
  config.cwd = process.cwd()
  config.source = {
    root: dirname(process.argv[1]),
    template: dirname(process.argv[1]) + `/templates/from-${choices.template}`,
    shared: dirname(process.argv[1]) + `/shared`
  }
  config.dest = join(config.cwd, choices.name)

  // Create target directory
  await mkdir(config.dest, { recursive: true })

  // Find files
  config.files = {
    template: await rdir(config.source.template),
    shared: await rdir(config.source.shared),
  }

  // Copy/Template files
  await copyTemplate(config, choices)

  // Install dependencies
  await oraPromise(
    installDependencies(config, choices),
    chalk.white.bold('Installing dependencies')+chalk.white.dim(' (This will take a while)')
  )

  // Fetch web components
  await oraPromise(
    downloadLabFiles(config),
    chalk.white.bold('Downloading web components')+chalk.white.dim(' (This too will take a while)')
  )

}

//const handlebars = require('handlebars')
//const execa = require('execa')
//const fs = require('fs')
//const globby = require('globby')
//const normalize = require('normalize-path')
//const mkdirp = require('make-dir')
//const ora = require('ora')
//const pEachSeries = require('p-each-series')

//const pkg = require('../package')
/*
const templateBlacklist = new Set([path.join('example', 'public', 'favicon.ico')])

module.exports = async (info) => {





  if (git) {
    const promise = module.exports.initGitRepo({ dest })
    ora.promise(promise, 'Initializing git repo')
    await promise
  }


  return dest
}

module.exports.initGitRepo = async (opts) => {
  const { dest } = opts

  const gitIgnorePath = path.join(dest, '.gitignore')
  fs.writeFileSync(
    gitIgnorePath,
    `
# See https://help.github.com/ignore-files/ for more about ignoring files.

# dependencies
node_modules

# builds
build
dist
.rpt2_cache

# misc
.DS_Store
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*
`,
    'utf8'
  )

  const cmd = `git init && git add . && git commit -m ":tada: Initialized ${pkg.name}@${pkg.version} with create-freesewing-pattern"`
  return execa.sync(cmd, { cwd: dest, shell: true })
}

*/
