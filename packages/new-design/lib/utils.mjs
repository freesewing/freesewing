import { config } from './config.mjs'
import { mkdir, readFile, writeFile, copyFile, open, opendir } from 'node:fs/promises'
import { join, dirname, relative } from 'path'
import mustache from 'mustache'
import rdir from 'recursive-readdir'
import chalk from 'chalk'
import prompts from 'prompts'
import { oraPromise } from 'ora'
import { execa } from 'execa'
import axios from 'axios'
import { fileURLToPath } from 'url'

// Current working directory
let filename
try {
  filename = __filename
} catch {
  filename = fileURLToPath(new URL(import.meta.url))
}
const newDesignDir = join(filename, '../..')
const designSrcDir = 'design/src'

const nl = '\n'
const tab = '  '
const nlt = nl + tab

// Checks for node 16 or higher
export const checkNodeVersion = () => {
  const node_version = process.version.slice(1).split('.')[0]
  if (parseInt(node_version) < config.node) {
    console.log(
      chalk.yellow(nlt + `⚠️  FreeSewing requires Node v${config.node} or newer`) +
        nl +
        nlt +
        'We hightly recommend using NVM to manage your Node versions:' +
        nlt +
        chalk.blue('https://github.com/nvm-sh/nvm') +
        nl +
        nlt +
        'When in doubt, pick an active LTS version:' +
        nlt +
        chalk.blue('https://nodejs.org/en/about/releases/') +
        nl +
        nl
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
      { title: 'Tutorial', value: 'tutorial', description: 'Setup the pattern design tutorial' },
      { title: 'From Scratch', value: 'scratch', description: 'Create a design from scratch' },
      {
        title: 'Extend Brian',
        value: 'brian',
        description: 'Extend the Brian design (basic torso block for menswear)',
      },
      {
        title: 'Extend Bent',
        value: 'bent',
        description: 'Extend the Bent design (like brian with added two-part sleeve)',
      },
      {
        title: 'Extend Bella',
        value: 'bella',
        description: 'Extend the Bella design (womenswear torso block)',
      },
      {
        title: 'Extend Breanna',
        value: 'breanna',
        description: 'Extend the Breanna design (womenswear torso block - YMMV)',
      },
      {
        title: 'Extend Titan',
        value: 'titan',
        description: 'Extend the Titan design (gender-neutral trouser block)',
      },
    ],
    initial: 0,
  })

  let finalName = false // we're going to use this to track whether we stay in the naming loop
  let overwrite = true // should we overwrite existing files?
  const cwd = process.cwd()
  let name // name will go here

  // while we're not finalized on a name
  while (finalName === false) {
    // request a name
    name =
      template === 'tutorial' && name === undefined
        ? 'tutorial'
        : (
            await prompts({
              type: 'text',
              name: 'name',
              message: 'What name would you like the design to have? 🏷️ ([a-z] only)',
              validate: validateDesignName,
            })
          ).name

    // check whether a folder with that name already exists
    const dest = join(cwd, name)
    try {
      const dir = await opendir(dest)
      dir.close()
    } catch {
      // the folder didn't exist, so we're good to go
      finalName = true
      break
    }

    // the folder did exist, so now we need to ask what to do
    const { nextStep } = await prompts({
      type: 'select',
      name: 'nextStep',
      message:
        'It looks like you already have a design by that name in progress. What should we do?',
      choices: [
        { title: 'Rename', value: 'rename', description: 'Choose a new name for this design' },
        { title: 'Overwrite', value: 'overwrite', description: 'Overwrite the existing design' },
        {
          title: 'Re-initialize',
          value: 'reinit',
          description:
            "Bring in a fresh workbench, but don't overwrite existing design files (useful for updating to the latest dev environment)",
        },
      ],
    })

    // if they said rename, we loop again. otherwise
    if (nextStep !== 'rename') {
      finalName = true
      // set the overwrite choice
      overwrite = nextStep === 'overwrite'
    }
  }

  const { manager } = await prompts({
    type: 'select',
    name: 'manager',
    message: 'What package manager should we use? 📦',
    choices: [
      { title: 'yarn', value: 'yarn', description: 'Yarn - Nice if you have it' },
      { title: 'npm', value: 'npm', description: 'NPM - Comes with NodeJS' },
    ],
    initial: 0,
  })

  return { template, name, manager, overwrite }
}

const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1)

// Keep track of directories that need to be created
const dirPromises = {}
const ensureDir = async (file, suppress = false) => {
  const dir = suppress ? dirname(file.replace(suppress)) : dirname(file)
  if (!dirPromises[dir]) {
    dirPromises[dir] = mkdir(dir, { recursive: true })
  }
  await dirPromises[dir]
}

// Helper method to copy template files
const copyFileOrTemplate = async (
  fromRootOrTemplate,
  toRoot,
  relativeDest,
  templateVars,
  overwrite = true
) => {
  const to = join(toRoot, relativeDest)

  // if the file shouldn't be overwritten, open it to see if it exists
  if (!overwrite) {
    try {
      // if the file doesn't exist, this will throw an error
      const fd = await open(to)
      fd.close()
      // we only reach this return if the file exists, which means we're safe to leave
      return
    } catch {
      // don't do anything with the error because it just means the file wasn't there and we can continue
    }
  }

  await ensureDir(to)

  if (templateVars) {
    const rendered = mustache.render(fromRootOrTemplate, templateVars)
    await writeFile(to, rendered)
  } else {
    const from = join(fromRootOrTemplate, relativeDest)
    await copyFile(from, to)
  }
}

// Template the package.json
const copyPackageJson = async (config, choices) => {
  const packageJsonTemplate = await readFile(
    config.relativeFiles.templates['package.json'],
    'utf-8'
  )

  await copyFileOrTemplate(packageJsonTemplate, config.dest, 'package.json', {
    name: choices.name,
    tag: config.tag,
    dependencies: config.templateData.dependencies,
    includeTests: choices.includeTests,
  })
}

// Template the design index file
const copyIndexFile = async (config, choices) => {
  // Template the index file
  const indexTemplate = await readFile(config.relativeFiles.templates['index'], 'utf-8')

  // get the part names based on how they are given in the configuration
  const partNames = config.complexParts
    ? config.templateData.parts.map((p) => p.part)
    : config.templateData.parts
  // write the file
  await copyFileOrTemplate(
    indexTemplate,
    config.dest,
    `${designSrcDir}/index.mjs`,
    {
      name: choices.name,
      Name: capitalize(choices.name),
      parts: partNames,
    },
    choices.overwrite
  )
}

// Template the part files
const copyPartFiles = async (config, choices) => {
  // Template the parts
  const partTemplate = await readFile(config.relativeFiles.templates.part, 'utf-8')
  // does this design inherit from another?
  const doesInherit = !config.templateData.noInheritance

  // all part templates need these arguments
  const baseConfig = {
    name: choices.name, // the name of the design
    doesInherit, // whether it's an inherited design
    draftUses: {}, // what parameters need to be uncommented in the draft method (default none because part is always uncommented)
  }

  // if it inherits, we also need the name of the design it inherits from
  if (doesInherit) {
    baseConfig.baseName = choices.template
    baseConfig.BaseName = capitalize(choices.template)
  }

  // for each part
  return config.templateData.parts.map((p) => {
    // set up the arguments based on what's in the part's config
    const templateArgs = config.complexParts
      ? {
          ...baseConfig,
          ...p,
        }
      : {
          ...baseConfig,
          part: p,
        }

    // add an uppercase version of the partName
    templateArgs.Part = capitalize(templateArgs.part)

    // write the part file
    return copyFileOrTemplate(
      partTemplate,
      config.dest,
      `${designSrcDir}/${templateArgs.part}.mjs`,
      templateArgs,
      choices.overwrite
    )
  })
}

// Helper method to copy template files
const copyAll = async (config, choices) => {
  let promises = []

  // Copy shared files
  promises = promises.concat(
    config.relativeFiles.shared.map((from) => {
      if (choices.includeTests || !from.match(/e2e|playwright/))
        copyFileOrTemplate(config.source.shared, config.dest, from)
    })
  )

  // template design files
  promises.push(copyPackageJson(config, choices))
  promises.push(copyIndexFile(config, choices))
  promises = promises.concat(copyPartFiles(config, choices))

  await Promise.all(promises)
}

// Helper method to run [yarn|npm] install
const installDependencies = async (config, choices) =>
  await execa(`${choices.manager} install`, {
    cwd: config.dest,
    shell: true,
  })

// Helper method to download web environment
const downloadLabFiles = async (config) => {
  const promises = []
  for (const dir in config.fetch) {
    promises.push(
      ...config.fetch[dir].map(async (file) => {
        const to = typeof file === 'string' ? join(config.dest, file) : join(config.dest, file.to)
        await ensureDir(to)
        try {
          const res = await axios.get(
            `${config.fileUri}/${config.repo}/${config.branch}/${dir}/${
              typeof file === 'string' ? file : file.from
            }`
          )
          await writeFile(to, res.data)
        } catch (err) {
          console.log(err)
        }
      })
    )
  }

  return Promise.all(promises)
}

// Helper method to initialize a git repository
const initGitRepo = async (config, choices) => {
  await copyFileOrTemplate(config.gitignore, config.dest, '.gitignore', {}, choices.overwrite)

  return execa(
    `git init -b main && git add . && git commit -m ":tada: Initialized ${choices.name} repository"`,
    {
      cwd: config.dest,
      shell: true,
    }
  )
}

// Tips
const showTips = (config, choices) => {
  console.log(`
  All done 🤓 Your new design ${chalk.yellow.bold(
    choices.name
  )} was initialized in: ${chalk.green.bold(config.dest)}

  The code for your design is in the ${chalk.yellow.bold('design')} folder.
  The other files and folders are the development environment. You can safely ignore those.

  To start your development environment, follow these three steps:

    1) Start by entering the directory: ${chalk.blue.bold('cd ' + config.dest)}
    2) Then run this command: ${chalk.blue.bold(
      choices.manager === 'yarn' ? 'yarn dev' : 'npm run dev'
    )}
    3) Now open your browser and navigate to ${chalk.green('http://localhost:8000/')}

  ${chalk.bold.yellow('🤔 More info & help')}
  ${chalk.gray('≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡')}`)

  if (choices.template === 'tutorial')
    console.log(`
  Our pattern design tutorial is available at: ${chalk.green(
    'https://freesewing.dev/tutorials/pattern-design'
  )}

  It will walk your through the process step by step.
  If you get stuck, reach out to our community on Discord: ${chalk.green(
    'https://discord.freesewing.dev/'
  )}
  The ${chalk.bold('development-help')} channel is a good place to ask questions

  Don't be shy to reach out. If something is not clear, that's on us, not on you.
  So your feedback really helps us improve our tutorial/documentation.

  Thanks for giving FreeSewing a shot. We hope you'll 💜 it.

  Have fun 🤓
  `)
  else
    console.log(`

  FreeSewing's documentation for developers is available at: ${chalk.green(
    'https://freesewing.dev/'
  )}

  Our community is on Discord: ${chalk.green('https://discord.freesewing.dev/')}
  The ${chalk.bold('development-help')} channel is a good place to ask for help if you get stuck

  Happy hacking 🤓
  `)
}

// Creates the environment based on the user's choices
export const createEnvironment = async (choices) => {
  config.dest = join(process.cwd(), choices.name)
  // Store directories for re-use
  config.source = {
    templateData: join(newDesignDir, `templates/from-${choices.template}.mjs`),
    templates: join(newDesignDir, `templates/shared`),
    shared: join(newDesignDir, `shared`),
  }

  // Create target directory
  await mkdir(config.dest, { recursive: true })

  // get the template files in a dictionary
  const templates = {}
  const templateFiles = await rdir(config.source.templates)
  templateFiles.forEach((file) => {
    const relativeName = relative(config.source.templates, file).replace(/(\.mjs)*\.mustache/, '')
    templates[relativeName] = file
  })

  config.relativeFiles = {
    templates,
    shared: (await rdir(config.source.shared)).map((file) => relative(config.source.shared, file)),
  }

  config.templateData = await import(config.source.templateData)
  // does this base have parts with a lot of attending config?
  config.complexParts = typeof config.templateData.parts[0] === 'object'

  // Output a linebreak
  console.log()

  // Copy/Template files
  try {
    await oraPromise(copyAll(config, choices), {
      text:
        chalk.white.bold('🟨⬜⬜⬜  Copying template files') +
        chalk.white.dim('   |  Just a moment'),
      successText: chalk.white.bold('🟩⬜⬜⬜  Copied template files'),
      failText: chalk.white.bold(
        '🟥⬜⬜⬜  Failed to copy template files  |  Development environment will not function'
      ),
    })
  } catch (err) {
    console.log(err)
  }

  // Install dependencies
  try {
    await oraPromise(installDependencies(config, choices), {
      text:
        chalk.white.bold('🟩🟨⬜⬜  Installing dependencies') +
        chalk.white.dim('  |  Please wait, this will take a while'),
      successText: chalk.white.bold('🟩🟩⬜⬜  Installed dependencies'),
      failText: chalk.white.bold(
        '🟩🟥⬜⬜  Failed to install dependencies  |  Development environment will not function'
      ),
    })
  } catch (err) {
    /* no feedback here */
  }

  // Fetch web components
  try {
    await oraPromise(downloadLabFiles(config), {
      text:
        chalk.white.bold('🟩🟩🟨⬜  Downloading web components') +
        chalk.white.dim('  |  Almost there'),
      successText: chalk.white.bold('🟩🟩🟩⬜  Downloaded web components'),
      failText: chalk.white.bold(
        '🟩🟩🟥⬜  Failed to download web components  |  Development environment will not function'
      ),
    })
  } catch (err) {
    /* no feedback here */
  }

  // Initialize git repository
  try {
    await oraPromise(initGitRepo(config, choices), {
      text:
        chalk.white.bold('🟩🟩🟩⬜  Initializing git repository') +
        chalk.white.dim('  |  You have git, right?'),
      successText: chalk.white.bold('🟩🟩🟩🟩  Initialized git repository'),
      failText:
        chalk.white.bold('🟩🟩🟩🟥  Failed to initialize git repository') +
        chalk.white.dim('  |  This does not stop you from developing your design'),
    })
  } catch (err) {
    console.log(err)
  }

  // All done. Show tips
  showTips(config, choices)
}
