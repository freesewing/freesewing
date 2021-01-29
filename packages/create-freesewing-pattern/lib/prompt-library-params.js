'use strict'

const inquirer = require('inquirer')
const validateNpmName = require('validate-npm-package-name')
const languages = require('@freesewing/i18n').languages
const strings = require('@freesewing/i18n').strings
const config = require('./config')
const chalk = require('chalk')

const stringToPackageName = string =>
  string
    .replace(/'|"|`|!|\*|~|\(|\)/g, '')
    .replace(/ /g, '-')
    .toLowerCase()

let languageChoices = []
for (let l of Object.keys(languages)) {
  languageChoices.push({
    name: languages[l],
    value: l,
    short: languages[l]
  })
}

module.exports = async opts => {
  if (opts.name && !validateNpmName(opts.name).validForNewPackages) {
    throw new Error(`invalid package name "${opts.name}"`)
  }

  if (opts.skipPrompts) {
    if (!opts.name) {
      throw new Error('invalid input; you must pass a package name with --skip-prompts')
    }

    Object.keys(opts).forEach(key => {
      const value = opts[key]
      if (typeof value === 'function') {
        opts[key] = value(opts)
      }
    })

    return opts
  } else {
    let lang = 'en'
    const info = await inquirer.prompt([
      {
        type: 'list',
        name: 'language',
        message: 'Language',
        choices: languageChoices,
        default: 'en',
        validate: language => {
          lang = language
          return true
        }
      },
      {
        type: 'input',
        name: 'name',
        message: info => strings[lang]['cfp.patternName'],
        validate: name => {
          try {
            if (name && validateNpmName(name).validForNewPackages) return true
            else {
              return (
                strings[lang]['cfp.validNameWarning'] + ' ' + chalk.bold(stringToPackageName(name))
              )
            }
          } catch (err) {
            console.log({ err })
          }
        },
        default: opts.name
      },
      {
        type: 'input',
        name: 'description',
        message: info => strings[info.language]['cfp.patternDescription'],
        default: opts.description
      },
      {
        type: 'list',
        name: 'type',
        message: info => strings[info.language]['cfp.patternType'],
        choices: info => [
          {
            name: strings[info.language]['filter.type.pattern'],
            value: 'pattern'
          },
          { name: strings[info.language]['filter.type.block'], value: 'block' }
        ],
        default: 'pattern'
      },
      {
        type: 'list',
        name: 'department',
        message: info => strings[info.language]['filter.department.title'],
        choices: info => [
          {
            name: strings[info.language]['filter.department.menswear'],
            value: 'menswear'
          },
          {
            name: strings[info.language]['filter.department.womenswear'],
            value: 'womenswear'
          },
          {
            name: strings[info.language]['filter.department.accessories'],
            value: 'accessories'
          }
        ],
        default: 'womenswear'
      },
      {
        type: 'input',
        name: 'author',
        message: info => strings[info.language]['cfp.author'],
        default: opts.author
      },
      {
        type: 'input',
        name: 'repo',
        message: info => strings[info.language]['cfp.githubRepo'],
        default: opts.repo
      },
      {
        type: 'list',
        name: 'manager',
        message: info => strings[info.language]['cfp.packageManager'],
        choices: ['npm', 'yarn'],
        default: opts.manager
      }
    ])

    config.set('author', info.author)
    config.set('manager', info.manager)
    config.set('template', 'default')
    config.set('license', 'MIT')
    info.template = 'default'

    return {
      ...info,
      git: opts.git,
      freesewing_version: opts.freesewing_version
    }
  }
}
