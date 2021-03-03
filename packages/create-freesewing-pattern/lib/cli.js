#!/usr/bin/env node
'use strict'

const path = require('path')
const chalk = require('chalk')
const program = require('commander')
const strings = require('@freesewing/i18n').strings
const freesewing_version = require('@freesewing/pattern-info').versions.brian

const getDefaultLibraryParams = require('./get-default-library-params')
const createLibrary = require('./create-library')
const promptLibraryParams = require('./prompt-library-params')

module.exports = async () => {
  // Check node version
  const node_version = process.version.slice(1).split('.')[0]
  if (parseInt(node_version) < 10 && process.argv.indexOf('--skip-version-check') === -1)
    throw `
⚠️  FreeSewing requires Node v10 or newer.

   We hightly recommend using NVM to manage your Node versions:
     https://github.com/nvm-sh/nvm

   When in doubt, pick an active LTS version:
     https://nodejs.org/en/about/releases/

`

  const defaults = await getDefaultLibraryParams()

  program
    .name('create-freesewing-pattern')
    .version(node_version)
    .usage('[options] [package-name]')
    .option('-d, --desc <string>', 'package description')
    .option('-a, --author <string>', "author's github handle", defaults.author)
    .option('-l, --license <string>', 'package license', defaults.license)
    .option('-r, --repo <string>', 'package repo path')
    .option('-g, --no-git', 'generate without git init')
    .option('-m, --manager <npm|yarn>', 'package manager to use', /^(npm|yarn)$/, defaults.manager)
    .option('-v, --skip-version-check', 'proceed even with Node < v10')
    .option(
      '-t, --template <default|custom>',
      'package template to use',
      /^(default|custom)$/,
      defaults.template
    )
    .option('-p, --template-path <string>', 'custom package template path')
    .option('-s, --skip-prompts', 'skip all prompts (must provide package-name via cli)')
    .parse(process.argv)

  const opts = {
    description: program.desc,
    author: program.author,
    license: program.license,
    repo: program.repo,
    manager: program.manager,
    template: program.template,
    templatePath: program.templatePath,
    skipPrompts: program.skipPrompts,
    git: program.git,
    freesewing_version
  }

  Object.keys(opts).forEach((key) => {
    if (!opts[key] && defaults[key]) {
      opts[key] = defaults[key]
    }
  })

  if (program.args.length === 1) {
    opts.name = program.args[0]
  } else if (program.args.length > 1) {
    console.error('invalid arguments')
    program.help()
    process.exit(1)
  }

  const params = await promptLibraryParams(opts)
  const dest = await createLibrary(params)

  console.log(`
🎉 ${strings[params.language]['cfp.patternCreated']} ${chalk.bold(dest)}

${strings[params.language]['cfp.runTheseCommands']}:

 - ${strings[params.language]['cfp.startRollup']}

  👉  ${chalk.cyan(`cd ${params.shortName} && ${params.manager} start`)}

 - ${strings[params.language]['cfp.startWebpack']}

  👉  ${chalk.cyan(`cd ${path.join(params.shortName, 'example')} && ${params.manager} start`)}


${strings[params.language]['cfp.devDocsAvailableAt']}
  ${chalk.bold('https://freesewing.dev/')}

${strings[params.language]['cfp.talkToUs']}
  ${chalk.bold('https://chat.freesewing.org/')}

`)

  return dest
}

module.exports().catch((err) => {
  console.error(err)
  process.exit(1)
})
