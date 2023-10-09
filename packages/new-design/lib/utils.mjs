import { config } from './config.mjs'
import { mkdir, writeFile, copyFile, open, opendir } from 'node:fs/promises'
import { join, dirname } from 'path'
import mustache from 'mustache'
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

const nl = '\n'
const tab = '  '
const nlt = nl + tab

// Checks for node 18 or higher
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

// Gets user input to figure out what to do
export const getChoices = async () => {
  let finalName = false // we're going to use this to track whether we stay in the naming loop
  let overwrite = true // should we overwrite existing files?
  let name // name will go here
  let sideStep // allows to do something custom
  const cwd = process.cwd()

  // while we're not finalized on a name
  while (finalName === false) {
    // request a name
    name = (
      await prompts({
        type: 'text',
        name: 'name',
        message: 'Give a folder name in which we can setup the development environment? 🏷️ ',
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
      message: 'It looks like that folder already exists. What should we do?',
      choices: [
        { title: 'Go back', value: 'rename', description: 'Choose a different folder name' },
        {
          title: 'Overwrite',
          value: 'overwrite',
          description: 'Overwrite the contents in the existing folder',
        },
        {
          title: 'Re-initialize',
          value: 'reinit',
          description:
            'Re-install depenencies, and update the development environment in this folder',
        },
        {
          title: 'Re-download',
          value: 'redownload',
          description: 'Update the development environment in this folder',
        },
      ],
    })
    sideStep = nextStep

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

  return { name, manager, overwrite, sideStep }
}

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

// Helper method to run [yarn|npm] install
const installDependencies = async (config, choices) =>
  await execa(`${choices.manager} install`, {
    cwd: config.dest,
    shell: true,
  })

// Helper method to download web environment
const downloadFiles = async (config) => {
  const promises = []
  for (const dir in config.fetch) {
    promises.push(
      ...config.fetch[dir].map(async (file) => {
        const to =
          typeof file === 'string'
            ? join(config.dest, file.slice(0, 4) === 'sde/' ? file.slice(4) : file)
            : join(config.dest, file.to)
        await ensureDir(to)
        const url = `${config.fileUri}/${config.repo}/${config.branch}/${dir}/${
          typeof file === 'string' ? file : file.from
        }`
        try {
          const res = await axios.get(url)
          await writeFile(
            to,
            typeof res.data === 'object' ? JSON.stringify(res.data, null, 2) : res.data
          )
        } catch (err) {
          if (err.response?.status === 404) console.log(`404: ${url}`)
          else console.log(err)
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
    `git init -b main && git add . && git commit -m ":tada: Initialized FreeSewing stand-alone development environment"`,
    {
      cwd: config.dest,
      shell: true,
    }
  )
}

// Tips
const showTips = (config, choices) =>
  console.log(`
  All done 🤓 Your FreeSewing development environment was initialized in: ${chalk.green.bold(
    config.dest
  )}

  The templates for various designs are in the ${chalk.yellow.bold('design')} folder.
  The other files and folders are the development environment. You can safely ignore those.

  To start your development environment, follow these three steps:

    1) Start by entering the directory: ${chalk.blue.bold('cd ' + config.dest)}
    2) Then run this command: ${chalk.blue.bold(
      choices.manager === 'yarn' ? 'yarn dev' : 'npm run dev'
    )}
    3) Now open your browser and navigate to ${chalk.green('http://localhost:8000/')}

  Thanks for giving FreeSewing a shot. I hope you'll 💜 it.

  Have fun 🤓

  joost
`)

// Creates the environment based on the user's choices
export const createEnvironment = async (choices) => {
  config.dest = join(process.cwd(), choices.name)
  // Store directories for re-use
  config.source = {
    templateData: join(newDesignDir, `templates/from-${choices.template}.mjs`),
    templates: join(newDesignDir, `templates/shared`),
    shared: join(newDesignDir, `shared`),
  }

  // Output a linebreak
  console.log()

  // Download files from GitHub
  try {
    const count = [...config.fetch.config, ...config.fetch.sites].length
    await oraPromise(downloadFiles(config), {
      text:
        chalk.white.bold(`🟧⬜⬜  Downloading ${count} (small) files from GitHub`) +
        chalk.white.dim('  |  Give it a moment'),
      successText: chalk.white.bold(`🟩⬜⬜  Downloaded ${count}/${count} files from GitHub`),
      failText: chalk.white.bold(
        '🟥⬜⬜  Failed to download components from GitHub  |  The development environment will not function'
      ),
    })
  } catch (err) {
    console.log(err)
    /* no feedback here */
  }

  if (!choices.sideStep) {
    // Create target directory
    await mkdir(config.dest, { recursive: true })

    // Install dependencies
    try {
      await oraPromise(installDependencies(config, choices), {
        text:
          chalk.white.bold('🟩🟧⬜  Installing dependencies') +
          chalk.white.dim('  |  Please wait, this will take a while'),
        successText: chalk.white.bold('🟩🟩⬜  Installed dependencies'),
        failText: chalk.white.bold(
          '🟩🟥⬜  Failed to install dependencies  |  The development environment will not function'
        ),
      })
    } catch (err) {
      /* no feedback here */
    }
  }

  if (!choices.sideStep) {
    // Initialize git repository
    try {
      await oraPromise(initGitRepo(config, choices), {
        text:
          chalk.white.bold('🟩🟩🟧  Initializing git repository') +
          chalk.white.dim('  |  You have git, right?'),
        successText: chalk.white.bold('🟩🟩🟩  Initialized git repository'),
        failText:
          chalk.white.bold('🟩🟩🟥  Failed to initialize git repository') +
          chalk.white.dim('  |  This does not stop the development environment from functioning'),
      })
    } catch (err) {
      console.log(err)
    }
  }

  // All done. Show tips
  showTips(config, choices)
}
