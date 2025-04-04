import fs from 'fs'
import path from 'path'
import prompts from 'prompts'
import chalk from 'chalk'
import { banner } from './banner.mjs'
import mustache from 'mustache'
import { execSync } from 'child_process'
import languages from '../config/languages.json' assert { type: 'json' }
// Software
import designs from '../config/software/designs.json' assert { type: 'json' }
import plugins from '../config/software/plugins.json' assert { type: 'json' }

const type = process.argv[2]

// Add new design
if (type === 'design') {
  console.clear()
  console.log(banner)
  addDesign()
}

// Add new plugin
else if (type === 'plugin') {
  console.clear()
  console.log(banner)
  addPlugin()
} else
  console.log(`
  Usage:

    ${chalk.bold.blue('npm run new design')} 👉 Adds a new design
    ${chalk.bold.blue('npm run new plugin')} 👉 Adds a new plugin
    ${chalk.bold.blue('npm run new')} ${chalk.yellow('[anything else]')} 👉 Shows this help
`)

async function addDesign() {
  console.log(`

  ${chalk.bold.yellow('👕 Add a new design')}
  ${chalk.gray('≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡')}

  We're going to add a new design to this repository. That's awesome 🎉
  Let's start by picking a name. Naming things is hard 😬

  We'd appreciate if you pick:

   - a firstname like ${chalk.green('alex')}, ${chalk.green('jordan')}, ${chalk.green(
     'ezra'
   )}, or ${chalk.green('logan')}
   - that is an aliteration with the kind of design, like ${chalk.green(
     'wahid'
   )} for a ${chalk.green('w')}aistcoat

   Bonus points for picking a name that embraces diversity 🌈 ✊🏾
    `)

  const { name } = await prompts({
    type: 'text',
    name: 'name',
    message: 'What name would you like the design to have? ([a-z0-9_] only)',
    validate: validateDesignName,
  })

  if (name) {
    console.log('\n' + `  Alright, let's add ${chalk.green(name)} 🪄`)
    createDesign(name)
    execSync('npm run reconfigure')
    console.log(`  Installing & linking dependencies...`)
    execSync('npm install')
    console.log(`  All done 🎉`)

    try {
      console.log(`

  ${chalk.bold.yellow('✨ Summary')}
  ${chalk.gray('≡≡≡≡≡≡≡≡≡≡')}

  👉  We've created your design skeleton at ${chalk.green('designs/' + name)}
  👉  We've configured the packages via the ${chalk.green('package.json')} file
  👉  We've added ${chalk.green('designs/' + name)} to the local repository


  ${chalk.bold.yellow('✏️  Make it your own')}
  ${chalk.gray('≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡')}

  Hhere's a few other things you can configure:

  👉 ${chalk.yellow('Author')}: Credit where credit is due; Add yourself as author in ${chalk.green(
    'config/exceptions.yaml'
  )}
  👉 ${chalk.yellow('Description')}: We used placeholder metadata; Update it in ${chalk.green(
    'config/software/designs.json'
  )}
  👉 ${chalk.yellow(
    'Dependencies'
  )}: If you need additional plugins or patterns to extend, update ${chalk.green(
    'config/dependencies.yaml'
  )}

  If you change any of these, run ${chalk.blue('npm run reconfigure')} to update the package(s).


  ${chalk.bold.yellow('👷 Get to work')}
  ${chalk.gray('≡≡≡≡≡≡≡≡≡≡≡≡≡≡')}

  🚀  You can now start the org development environment with ${chalk.blue('npm run org')}
  📖  Documentation is available at ${chalk.green('https://freesewing.dev/')}
  🤓  Happy hacking

    `)
    } catch (err) {
      console.log(err)
    }
  }
}

async function addPlugin() {
  console.log(`

  ${chalk.bold.yellow('👕 Add a new plugin')}
  ${chalk.gray('≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡')}

  We're going to add a new plugin to this repository. That's awesome 🎉
  Let's start by picking the name for this plugin 🏷️
  Try to keep it to one word that explains what the plugin does e.g. ${chalk.green(
    'flip'
  )}, ${chalk.green('mirror')},
   ${chalk.green('round')}.

`)

  const { name } = await prompts({
    type: 'text',
    name: 'name',
    message: 'What name would you like the plugin to have? ([a-z] only)',
    validate: validatePluginName,
  })

  if (name) {
    console.log('\n' + `  Alright, let's add ${chalk.green(name)} to plugins 🪄`)
    createPlugin(name)
    execSync('npm run reconfigure')
    console.log(`  All done 🎉`)

    try {
      console.log(`

  ${chalk.bold.yellow('✨ Summary')}
  ${chalk.gray('≡≡≡≡≡≡≡≡≡≡')}

  👉  We've created your plugin skeleton at ${chalk.green('plugins/plugin-' + name)}
  👉  We've configured the packages via the ${chalk.green('package.json')} file


  ${chalk.bold.yellow('✏️  Make it your own')}
  ${chalk.gray('≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡')}

  Hhere's a few other things you can configure:

  👉 ${chalk.yellow('Author')}: Credit where credit is due; Add yourself as author in ${chalk.green(
    'config/exceptions.yaml'
  )}
  👉 ${chalk.yellow('Description')}: We used a placeholder description; Update it in ${chalk.green(
    'config/software/plugins.json'
  )}
  👉 ${chalk.yellow(
    'Dependencies'
  )}: If you need additional plugins or patterns to extend, update ${chalk.green(
    'config/dependencies.yaml'
  )}

  If you change any of these, run ${chalk.blue('npm run reconfigure')} to update the package(s).


  ${chalk.bold.yellow('👷 Get to work')}
  ${chalk.gray('≡≡≡≡≡≡≡≡≡≡≡≡≡≡')}

  🛠️   You can now start the org development environment with ${chalk.blue('npm run org')}
  📖  Documentation is available at ${chalk.green('https://freesewing.dev/')}
  🤓  Happy hacking

    `)
    } catch (err) {
      console.log(err)
    }
  }
}

function validateDesignName(name) {
  if (Object.keys(designs).indexOf(name) !== -1)
    return `Sorry but ${name} is already taken so you'll need to pick something else`

  if (/^([a-z][a-z0-9_]*)$/.test(name)) return true
  else
    return ' 🙈 Please use only lowercase letters, digits, or underscores. Names must start with a lowercase letter. 🤷'
}

function validatePluginName(name) {
  const pluginName = 'plugin-' + name
  if ([...Object.keys(plugins)].indexOf(pluginName) !== -1)
    return `Sorry but ${pluginName} is already taken so you'll need to pick something else`

  if (/^([a-z]+)$/.test(name)) return true
  else return ' 🙈 Please use only [a-z], no spaces, no capitals, no nothing 🤷'
}

function createDesign(name) {
  const template = ['config', 'templates', 'design']
  const design = ['designs', name]
  const description = 'A FreeSewing pattern that needs a description'
  const capitalized_name = name.charAt(0).toUpperCase() + name.slice(1)

  // Add to designs config file
  designs[name] = {
    code: 'Coder name',
    description: description,
    design: 'Designer name',
    difficulty: 1,
    lab: true,
    org: true,
    tags: ['tagname'],
    techniques: ['techname'],
  }
  write(['config', 'software', 'designs.json'], JSON.stringify(orderDesigns(designs), null, 2))

  // Create folders
  mkdir([...design, 'src'])
  mkdir([...design, 'i18n'])
  mkdir([...design, 'tests'])

  // Create package.json
  templateOut([...template, 'package.json.mustache'], [...design, 'package.json'], {
    name,
    description,
  })

  // Create src/index.mjs
  templateOut([...template, 'src', 'index.mjs.mustache'], [...design, 'src', 'index.mjs'], {
    capitalized_name,
  })

  // Copy i18n/index.mjs
  cp([...template, 'i18n', 'index.mjs'], [...design, 'i18n', 'index.mjs'])

  // Create i18n translation files
  for (const language of languages)
    templateOut([...template, 'i18n', 'en.json'], [...design, 'i18n', `${language}.json`], {
      title: capitalized_name,
      description,
    })

  // Create tests file
  cp([...template, 'tests', 'shared.test.mjs'], [...design, 'tests', 'shared.test.mjs'])

  // Copy source
  for (const file of ['box.mjs']) {
    cp([...template, 'src', file], [...design, 'src', file])
  }
}

function createPlugin(name) {
  const pluginName = 'plugin-' + name
  const template = ['config', 'templates', 'plugin']
  const description = 'A FreeSewing plugin that needs a description'
  const plugin = ['plugins', pluginName]
  const capitalized_name = name.charAt(0).toUpperCase() + name.slice(1)

  // Create folders
  mkdir([...plugin, 'src'])
  mkdir([...plugin, 'tests'])

  // Create package.json
  templateOut([...template, 'package.json.mustache'], [...plugin, 'package.json'], {
    pluginName,
    description,
  })

  plugins[pluginName] = description
  write(['config', 'software', 'plugins.json'], JSON.stringify(orderPlugins(plugins), null, 2))

  // Create index.mjs
  templateOut([...template, 'src', 'index.mjs.mustache'], [...plugin, 'src', 'index.mjs'], {
    name,
    capitalized_name,
  })
}

function templateOut(from, to, data) {
  try {
    fs.writeFileSync(
      path.join(process.cwd(), ...to),
      mustache.render(fs.readFileSync(path.join(process.cwd(), ...from), 'utf-8'), data)
    )
  } catch (err) {
    console.log(err)
  }

  return true
}

function write(to, data) {
  try {
    fs.writeFileSync(path.join(process.cwd(), ...to), data)
  } catch (err) {
    console.log(err)
  }

  return true
}

function mkdir(dir) {
  try {
    fs.mkdirSync(path.join(process.cwd(), ...dir), { recursive: true })
  } catch (err) {
    console.log(err)
  }

  return true
}

function cp(from, to) {
  try {
    fs.copyFileSync(path.join(process.cwd(), ...from), path.join(process.cwd(), ...to))
  } catch (err) {
    console.log(err)
  }

  return true
}

function orderDesigns(designs) {
  // Ensure designs are listed alphabetically
  const newDesigns = {}
  for (const type in designs) {
    newDesigns[type] = {}
    for (const design of Object.keys(designs[type]).sort()) {
      newDesigns[type][design] = designs[type][design]
    }
  }

  return newDesigns
}
function orderPlugins(plugins) {
  // Ensure plugins are listed alphabetically
  const newPlugins = {}
  for (const plugin of Object.keys(plugins).sort()) {
    newPlugins[plugin] = plugins[plugin]
  }

  return newPlugins
}
