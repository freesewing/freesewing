/* eslint-disable no-console */
const path = require('path')
const fs = require('fs')
const fse = require('fs-extra')
const glob = require('glob')
const yaml = require('js-yaml')
const chalk = require('chalk')
const handlebars = require('handlebars')
const Mustache = require('mustache')
const { version } = require('../lerna.json')
const capitalize = require('@freesewing/utils/capitalize')

const repoPath = process.cwd()
const config = {
  repoPath,
  defaults: readConfigFile('defaults.yaml'),
  descriptions: readConfigFile('descriptions.yaml'),
  keywords: readConfigFile('keywords.yaml'),
  badges: readConfigFile('badges.yaml'),
  scripts: readConfigFile('scripts.yaml'),
  changelog: readConfigFile('changelog.yaml'),
  changetypes: ['Added', 'Changed', 'Deprecated', 'Removed', 'Fixed', 'Security'],
  dependencies: readConfigFile('dependencies.yaml', { version }),
  exceptions: readConfigFile('exceptions.yaml'),
  templates: {
    pkg: readTemplateFile('package.dflt.json'),
    rollup: readTemplateFile('rollup.config.dflt.js'),
    changelog: readTemplateFile('changelog.dflt.md'),
    readme: readTemplateFile('readme.dflt.md')
  }
}

const packages = glob.sync('*', {
  cwd: path.join(config.repoPath, 'packages')
})

const contributors = fs.readFileSync(path.join(repoPath, 'CONTRIBUTORS.md'), 'utf-8')
const acconfig = JSON.parse(fs.readFileSync(path.join(repoPath, '.all-contributorsrc'), 'utf-8'))
const mainReadme = Mustache.render(
  fs.readFileSync(path.join(repoPath, 'config', 'templates', 'readme.main.md'), 'utf-8'),
  { allcontributors: acconfig.contributors.length }
)
fs.writeFileSync(path.join(repoPath, 'README.md'), mainReadme + contributors)

validate(packages, config)
reconfigure(packages, config)

process.exit()

/**
 * Reads a template file
 */
function readTemplateFile(file) {
  return fs.readFileSync(path.join(repoPath, 'config', 'templates', file), 'utf-8')
}

/**
 * Reads a pattern example file
 */
function readExampleFile(file, subdir = false) {
  return fs.readFileSync(
    subdir
      ? path.join(
          repoPath,
          'packages',
          'create-freesewing-pattern',
          'template',
          'default',
          'example',
          file
        )
      : path.join(
          repoPath,
          'packages',
          'create-freesewing-pattern',
          'template',
          'default',
          'example',
          subdir,
          file
        ),
    'utf-8'
  )
}

/**
 * Reads a YAML config file, with Mustache replacements if needed
 */
function readConfigFile(file, replace = false) {
  if (replace)
    return yaml.load(
      Mustache.render(fs.readFileSync(path.join(repoPath, 'config', file), 'utf-8'), replace)
    )
  return yaml.load(fs.readFileSync(path.join(repoPath, 'config', file), 'utf-8'))
}

/**
 * Reads info.md from the package directory
 * Returns its contents if it exists, or an empty string if not
 */
function readInfoFile(pkg) {
  let markup = ''
  try {
    markup = fs.readFileSync(path.join(repoPath, 'packages', pkg, 'info.md'), 'utf-8')
  } catch (err) {
    return ''
  }

  return markup
}

/**
 * Figure out what sort of package this is.
 * Returns a string, one of:
 *  - pattern
 *  - plugin
 *  - other
 */
function packageType(pkg, config) {
  if (pkg.substring(0, 7) === 'plugin-') return 'plugin'
  if (config.descriptions[pkg].substring(0, 21) === 'A FreeSewing pattern ') return 'pattern'
  return 'other'
}

/**
 * Returns an array of keywords for a package
 */
function keywords(pkg, config, type) {
  if (typeof config.keywords[pkg] !== 'undefined') return config.keywords[pkg]
  if (typeof config.keywords[type] !== 'undefined') return config.keywords[type]
  else {
    console.log(
      chalk.redBright.bold('Problem:'),
      chalk.redBright(`No keywords for package ${pkg} which is of type ${type}`)
    )
    process.exit()
  }
}

/**
 * Returns an plain object of scripts for a package
 */
function scripts(pkg, config, type) {
  let runScripts = {}
  for (let key of Object.keys(config.scripts._)) {
    runScripts[key] = Mustache.render(config.scripts._[key], {
      name: pkg
    })
  }
  if (typeof config.scripts._types[type] !== 'undefined') {
    for (let key of Object.keys(config.scripts._types[type])) {
      runScripts[key] = Mustache.render(config.scripts._types[type][key], {
        name: pkg
      })
    }
  }
  if (typeof config.scripts[pkg] !== 'undefined') {
    for (let key of Object.keys(config.scripts[pkg])) {
      if (config.scripts[pkg][key] === '!') delete runScripts[key]
      else
        runScripts[key] = Mustache.render(config.scripts[pkg][key], {
          name: pkg
        })
    }
  }

  return runScripts
}

/**
 * Returns an plain object with the of dependencies for a package
 * section is the key in the dependencies.yaml fine, one of:
 *
 *  - _ (for dependencies)
 *  - dev (for devDependencies)
 *  - peer (for peerDependencies)
 *
 */
function deps(section, pkg, config, type) {
  let dependencies = {}
  if (
    typeof config.dependencies._types[type] !== 'undefined' &&
    typeof config.dependencies._types[type][section] !== 'undefined'
  )
    dependencies = config.dependencies._types[type][section]
  if (typeof config.dependencies[pkg] === 'undefined') return dependencies
  if (typeof config.dependencies[pkg][section] !== 'undefined')
    return { ...dependencies, ...config.dependencies[pkg][section] }

  return dependencies
}

/**
 * These merely call deps() for the relevant dependency section
 */
function dependencies(pkg, config, type) {
  return deps('_', pkg, config, type)
}
function devDependencies(pkg, config, type) {
  return deps('dev', pkg, config, type)
}
function peerDependencies(pkg, config, type) {
  return deps('peer', pkg, config, type)
}

/**
 * Creates a package.json file for a package
 */
function packageConfig(pkg, config) {
  let type = packageType(pkg, config)
  let pkgConf = {}
  // Let's keep these at the top
  pkgConf.name = fullName(pkg, config)
  pkgConf.version = version
  pkgConf.description = config.descriptions[pkg]
  pkgConf = {
    ...pkgConf,
    ...JSON.parse(Mustache.render(config.templates.pkg, { name: pkg }))
  }
  pkgConf.keywords = pkgConf.keywords.concat(keywords(pkg, config, type))
  pkgConf.scripts = scripts(pkg, config, type)
  pkgConf.dependencies = dependencies(pkg, config, type)
  pkgConf.devDependencies = devDependencies(pkg, config, type)
  pkgConf.peerDependencies = peerDependencies(pkg, config, type)
  if (typeof config.exceptions.packageJson[pkg] !== 'undefined') {
    pkgConf = {
      ...pkgConf,
      ...config.exceptions.packageJson[pkg]
    }
    for (let key of Object.keys(config.exceptions.packageJson[pkg])) {
      if (config.exceptions.packageJson[pkg][key] === '!') delete pkgConf[key]
    }
  }
  if (config.exceptions.namedExports.indexOf(pkg) !== -1) {
    pkgConf.rollup.exports = 'named'
  }

  return pkgConf
}

/**
 * Returns an string with the markup for badges in the readme file
 */
function badges(pkg, config) {
  let markup = ''
  for (let group of ['_all', '_social']) {
    markup += "<p align='center'>"
    for (let key of Object.keys(config.badges[group])) {
      const name = (key === 'contributors')
        ? acconfig.contributors.length
        : pkg
      markup += formatBadge(config.badges[group][key], name, fullName(pkg, config))
    }
    markup += '</p>'
  }

  return markup
}

/**
 * Formats a badge for a readme file
 */
function formatBadge(badge, name, fullname) {
  return `<a
  href="${Mustache.render(badge.link, { name, fullname })}"
  title="${Mustache.render(badge.alt, { name, fullname })}"
  ><img src="${Mustache.render(badge.img, { name, fullname })}"
  alt="${Mustache.render(badge.alt, { name, fullname })}"/>
  </a>`
}
/**
 * Returns the full (namespaced) name of a package
 */
function fullName(pkg, config) {
  if (config.exceptions.noNamespace.indexOf(pkg) !== -1) return pkg
  else return `@freesewing/${pkg}`
}

/**
 * Creates a README.md file for a package
 */
function readme(pkg, config) {
  let markup = Mustache.render(config.templates.readme, {
    fullname: fullName(pkg, config),
    description: config.descriptions[pkg],
    badges: badges(pkg, config),
    info: readInfoFile(pkg),
    contributors
  })

  return markup
}

/**
 * Creates a CHANGELOG.md file for a package
 */
function changelog(pkg, config) {
  let markup = Mustache.render(config.templates.changelog, {
    fullname: pkg === 'global' ? 'FreeSewing (global)' : fullName(pkg, config),
    changelog: pkg === 'global' ? globalChangelog(config) : packageChangelog(pkg, config)
  })

  return markup
}

/**
 * Generates the global changelog data
 */
function globalChangelog(config) {
  let markup = ''
  for (let v in config.changelog) {
    let changes = config.changelog[v]
    markup += '\n## ' + v
    if (v !== 'Unreleased') markup += ' (' + formatDate(changes.date) + ')'
    markup += '\n\n'
    for (let pkg of packages) {
      let changed = false
      for (let type of config.changetypes) {
        if (
          typeof changes[type] !== 'undefined' &&
          changes[type] !== null &&
          typeof changes[type][pkg] !== 'undefined' &&
          changes[type][pkg] !== null
        ) {
          if (!changed) changed = ''
          changed += '\n#### ' + type + '\n\n'
          for (let change of changes[type][pkg]) changed += ' - ' + change + '\n'
        }
      }
      if (changed) markup += '### ' + pkg + '\n' + changed + '\n'
    }
  }

  return markup
}

/**
 * Generates the changelog data for a package
 */
function packageChangelog(pkg, config) {
  let log = {}
  let version
  let markup = ''
  for (let v in config.changelog) {
    version = v
    let changes = config.changelog[v]
    let changed = false
    for (let type of config.changetypes) {
      if (
        typeof changes[type] !== 'undefined' &&
        changes[type] !== null &&
        typeof changes[type][pkg] !== 'undefined' &&
        changes[type][pkg] !== null
      ) {
        if (!changed) changed = ''
        changed += '\n### ' + type + '\n\n'
        for (let change of changes[type][pkg]) changed += ' - ' + change + '\n'
      }
    }
    if (v !== 'Unreleased' && changed) {
      markup += '\n## ' + v
      markup += ' (' + formatDate(changes.date) + ')'
      markup += '\n'
      markup += changed
    }
  }

  markup += '\n\nThis is the **initial release**, and the start of this change log.\n'
  if (version === '2.0.0')
    markup += `
> Prior to version 2, FreeSewing was not a JavaScript project.
> As such, that history is out of scope for this change log.
`

  return markup
}

function formatDate(date) {
  let d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [year, month, day].join('-')
}

/**
 * Make sure we have (at least) a description for each package
 */
function validate(pkgs, config) {
  console.log(chalk.blueBright('Validating package descriptions'))
  for (let pkg of pkgs) {
    if (typeof config.descriptions[pkg] !== 'string') {
      console.log(
        chalk.redBright.bold('Problem:'),
        chalk.redBright(`No description for package ${pkg}`)
      )
      process.exit()
    }
  }
  console.log(chalk.yellowBright.bold('Looks good'))

  return true
}

/**
 * Creates and 'example' directory for patterns,
 * same result as what gets done by create-freesewing-pattern.
 */
function configurePatternExample(pkg, config) {
  // Create example dir structure
  let source = path.join(
    config.repoPath,
    'packages',
    'create-freesewing-pattern',
    'template',
    'freesewing',
    'example'
  )
  let dest = path.join(config.repoPath, 'packages', pkg, 'example')
  fse.ensureDirSync(path.join(dest, 'src'))
  fse.ensureDirSync(path.join(dest, 'public'))
  // Copy files
  for (let file of ['.babelrc', '.env'])
    fs.copyFileSync(path.join(source, file), path.join(dest, file))
  for (let file of ['index.js', 'serviceWorker.js', 'layout.css'])
    fs.copyFileSync(path.join(source, 'src', file), path.join(dest, 'src', file))
  fs.copyFileSync(
    path.join(source, 'public', 'favicon.ico'),
    path.join(dest, 'public', 'favicon.ico')
  )
  // Write templates
  let replace = {
    name: pkg,
    version,
    author: 'freesewing',
    yarn: true,
    language: 'en'
  }
  for (let file of ['package.json', 'README.md', 'netlify.toml']) {
    let template = handlebars.compile(fs.readFileSync(path.join(source, file), 'utf-8'))
    fs.writeFileSync(path.join(dest, file), template(replace))
  }
  for (let file of ['index.html', 'manifest.json', 'layout.css']) {
    let template = handlebars.compile(fs.readFileSync(path.join(source, 'public', file), 'utf-8'))
    fs.writeFileSync(path.join(dest, 'public', file), template(replace))
  }
  let template = handlebars.compile(fs.readFileSync(path.join(source, 'src', 'App.js'), 'utf-8'))
  fs.writeFileSync(path.join(dest, 'src', 'App.js'), template(replace))
}

/**
 * Adds unit tests for patterns and plugins
 */
function configurePkgUnitTests(type, pkg, config) {
  // Create tests directory
  const dest = path.join(config.repoPath, 'packages', pkg, 'tests')
  fse.ensureDirSync(dest)
  const source = path.join(config.repoPath, 'config', 'templates', 'tests', `${type}s`)
  // Write templates
  const peerdeps = peerDependencies(pkg, config, type)
  const devdeps = devDependencies(pkg, config, type)
  const replace = (type === 'pattern')
    ? {
        version,
        pattern: pkg,
        Pattern: capitalize(pkg),
        peerdeps: Object.keys(peerdeps)
          .map((dep) => dep + '@' + peerdeps[dep])
          .join(' ')
      }
    : {
        version,
        plugin: pkg,
        Plugin: capitalize(pkg),
        peerdeps: Object.keys(peerdeps)
          .map((dep) => dep + '@' + peerdeps[dep])
          .join(' '),
        devdeps: Object.keys(devdeps)
          .map((dep) => dep + '@' + devdeps[dep])
          .join(' ')
    }

  for (const file of ['shared.test.mjs']) {
    fs.writeFileSync(
      path.join(dest, file),
      Mustache.render(fs.readFileSync(path.join(source, file + '.template'), 'utf-8'), replace)
    )
  }
  // Add workflow file for Github actions
  fs.writeFileSync(
    path.join(config.repoPath, '.github', 'workflows', `tests.${pkg}.yml`),
    Mustache.render(
      fs.readFileSync(
        path.join(config.repoPath, 'config', 'templates', 'workflows', `tests.${type}.yml`),
        'utf-8'
      ),
      replace
    )
  )
}

/**
 * Puts a package.json, rollup.config.js, README.md, and CHANGELOG.md
 * into every subdirectory under the packages directory.
 * Also creates an example dir for pattern packages, and writes
 * the global CHANGELOG.md.
 * New: Adds unit tests for patterns
 */
function reconfigure(pkgs, config) {
  for (const pkg of pkgs) {
    console.log(chalk.blueBright(`Reconfiguring ${pkg}`))
    if (config.exceptions.customPackageJson.indexOf(pkg) === -1) {
      const pkgConfig = packageConfig(pkg, config)
      fs.writeFileSync(
        path.join(config.repoPath, 'packages', pkg, 'package.json'),
        JSON.stringify(pkgConfig, null, 2) + '\n'
      )
    }
    if (config.exceptions.customRollup.indexOf(pkg) === -1) {
      fs.writeFileSync(
        path.join(config.repoPath, 'packages', pkg, 'rollup.config.js'),
        config.templates.rollup
      )
    }
    if (config.exceptions.customReadme.indexOf(pkg) === -1) {
      fs.writeFileSync(path.join(config.repoPath, 'packages', pkg, 'README.md'), readme(pkg, config))
    }
    if (config.exceptions.customChangelog.indexOf(pkg) === -1) {
      fs.writeFileSync(
        path.join(config.repoPath, 'packages', pkg, 'CHANGELOG.md'),
        changelog(pkg, config)
      )
    }
    const type = packageType(pkg, config)
    if (type === 'pattern') configurePatternExample(pkg, config)
    if (['pattern', 'plugin'].indexOf(type) !== -1) configurePkgUnitTests(type, pkg, config)
  }
  fs.writeFileSync(path.join(config.repoPath, 'CHANGELOG.md'), changelog('global', config))
  console.log(chalk.yellowBright.bold('All done.'))
}
