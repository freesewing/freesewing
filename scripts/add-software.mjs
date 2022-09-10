import fs from 'fs'
import path from 'path'
import prompts from 'prompts'
import chalk from 'chalk'
import { banner } from './banner.mjs'
import mustache from 'mustache'
import { execSync } from 'child_process'
// Software
import designs from '../config/software/designs.json' assert { type: 'json' }

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
}

else console.log(`
  Usage:

    ${chalk.bold.blue('yarn new design')} 👉 Adds a new design
    ${chalk.bold.blue('yarn new plugin')} 👉 Adds a new plugin
    ${chalk.bold.blue('yarn new')} ${chalk.yellow('[anything else]')} 👉 Shows this help
`)


async function addDesign() {
  console.log(`

  ${chalk.bold.yellow('👕 Add a new design')}
  ${chalk.gray('≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡')}

  We're going to add a new design to this repository. That's awesome 🎉
  Let's start by picking the category for this design 🏷️
`)
  const { type } = await prompts({
    type: 'select',
    name: 'type',
    message: 'In what category should we add the design?',
    choices: [
      { title: 'Accessories', value: 'accessories', description: 'Hats, bags, plushies, and so on' },
      { title: 'Blocks', value: 'blocks', description: 'Blocks/Slopers to base other designs on' },
      { title: 'Garments', value: 'garments', description: 'For clothes. The most common category' },
      { title: 'Utilities', value: 'utilities', description: 'For utility designs such as our rendertest or legend' },
    ],
    initial: 2,
  })

  console.log(`
  Cool cool cool.
  Now a name. Naming things is hard 😬

  We'd appreciate if you pick:

   - a firstname like ${chalk.green('alex')}, ${chalk.green('jordan')}, ${chalk.green('ezra')}, or ${chalk.green('logan')}
   - that is an aliteration with the kind of design, like ${chalk.green('wahid')} for a ${chalk.green('w')}aistcoat

   Bonus points for picking a name that embraces diversity 🌈 ✊
    `)

  const { name } = await prompts({
    type: 'text',
    name: 'name',
    message: 'What name would you like the design to have? ([a-z] only)',
    validate: validateName,
  })

  if (name && type) {
    console.log("\n"+`  Alright, let's add ${chalk.green(name)} under ${chalk.green(type)} 🪄`)
    createDesign(name, type)
    execSync("npm run reconfigure")
    console.log(`  All done 🎉`)

    try {
      console.log(`

  ${chalk.bold.yellow('✨ Summary')}
  ${chalk.gray('≡≡≡≡≡≡≡≡≡≡')}

  👉  We've created your design skeleton at ${chalk.green('designs/'+name)}
  👉  We've configured the packages via the ${chalk.green('pacakge.json')} file
  👉  We've added ${chalk.green('designs/'+name)} to the lab


  ${chalk.bold.yellow('✏️  Make it your own')}
  ${chalk.gray('≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡')}

  Hhere's a few other things you can configure:

  👉 ${chalk.yellow('Author')}: Credit where credit is due; Add yourself as author in ${chalk.green('config/exceptions.yaml')}
  👉 ${chalk.yellow('Description')}: We used a placeholder description; Update it in ${chalk.green('config/software/designs.json')}
  👉 ${chalk.yellow('Dependencies')}: If you need additional plugins or patterns to extend, update ${chalk.green('config/dependecies.yaml')}

  If you change any of these, run ${chalk.blue('yarn reconfigure')} to update the package(s).


  ${chalk.bold.yellow('👷 Get to work')}
  ${chalk.gray('≡≡≡≡≡≡≡≡≡≡≡≡≡≡')}

  🛠️   You can now start the development environment with ${chalk.blue('yarn lab')}
  📖  Documentation is available at ${chalk.green('https://freesewing.dev/')}
  🤓  Happy hacking

    `)
    } catch(err) {
      console.log(err)
    }
  }
}

async function addPlugin() {
  console.log(`

  ${chalk.bold.yellow('🙈 Oh no; You called our bluf!')}
  ${chalk.gray('≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡')}

  Adding plugins is not (yet) implemented 😬

  Sorry 🤥

`)
}


function validateName(name) {
  if ([
    ...Object.keys(designs.accessories),
    ...Object.keys(designs.blocks),
    ...Object.keys(designs.garments),
    ...Object.keys(designs.utilities)
  ].indexOf(name) !== -1) return `Sorry but ${name} is already taken so you'll need to pick something else`

  if (/^([a-z]+)$/.test(name)) return true
  else return ' 🙈 Please use only [a-z], no spaces, no capitals, no nothing 🤷'
}

function createDesign(name, type) {
  const template = ['config', 'templates', 'design']
  const design = ['designs', name]
  const capitalized_name = name.charAt(0).toUpperCase() + name.slice(1)

  // Add to designs config file
  designs[type][name] = {
    description: 'A FreeSewing pattern that needs a description',
    code: 'Coder name',
    design: 'Designer name',
    difficulty: 1,
    tags: [ 'tagname', ],
  }
  write(
    ['config', 'software', 'designs.json'],
    JSON.stringify(orderDesigns(designs), null, 2)
  )

  // Create folders
  mkdir([...design, 'src'])
  mkdir([...design, 'tests'])

  // Create package.json
  templateOut(
    [...template, 'package.json'],
    [...design, 'package.json'],
    { name, description }
  )

  // Create index.mjs
  templateOut(
    [...template, 'src', 'index.mjs'],
    [...design, 'src', 'index.mjs'],
    { capitalized_name }
  )

  // Create tests file
  cp(
    [...template, 'tests', 'shared.test.mjs'],
    [...design, 'tests', 'shared.test.mjs']
  )

  // Copy source
  for (const file of ['box.mjs']) {
    cp([...template, 'src', file], [...design, 'src', file])
  }
}

function templateOut(from, to, data) {
  try {
    fs.writeFileSync(
      path.join(process.cwd(), ...to),
      mustache.render(
        fs.readFileSync(path.join(process.cwd(), ...from), 'utf-8'),
        data
      )
    )
  } catch(err) {
    console.log(err)
  }

  return true
}

function write(to, data) {
  try {
    fs.writeFileSync(path.join(process.cwd(), ...to), data)
  } catch(err) {
    console.log(err)
  }

  return true
}

function mkdir(dir) {
  try {
    fs.mkdirSync(
      path.join(process.cwd(), ...dir),
      { recursive: true }
    )
  } catch(err) {
    console.log(err)
  }

  return true
}

function cp(from, to) {
  try {
    fs.copyFileSync(
      path.join(process.cwd(), ...from),
      path.join(process.cwd(), ...to)
    )
  } catch(err) {
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
