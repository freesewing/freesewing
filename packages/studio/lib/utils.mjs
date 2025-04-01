import { config } from './config.mjs'
import { mkdir, copyFile, opendir } from 'node:fs/promises'
import { lstatSync } from 'node:fs'
import { join, resolve, dirname } from 'path'
import ora from 'ora'
import chalk from 'chalk'
import prompts from 'prompts'
import { execa } from 'execa'
import { fileURLToPath } from 'url'
import { glob } from 'glob'

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

// Checks for node 20 or higher
export const checkNodeVersion = () => {
  const node_version = process.version.slice(1).split('.')[0]
  if (parseInt(node_version) < config.node) {
    console.log(
      chalk.yellow(nlt + `⚠️  FreeSewing requires Node v${config.node} or newer`) +
        nl +
        nlt +
        'We highly recommend using NVM to manage your Node versions:' +
        nlt +
        chalk.blue('https://github.com/nvm-sh/nvm') +
        nl +
        nlt +
        'When in doubt, pick an active LTS version, like lts/iron (node 20):' +
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
        initial: 'freesewing',
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

  return { name, overwrite }
}

// Helper method to run [yarn|npm] install
const installDependencies = async (config, choices) =>
  await execa(`npm install`, {
    cwd: config.dest,
    shell: true,
  })

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
    2) Then run this command: ${chalk.blue.bold('npm run start')}
    3) Now open your browser and navigate to ${chalk.green('http://localhost:3000/')}

  Thanks for giving FreeSewing a shot. I hope you'll 💜 it.

  Have fun 🤓

  joost
`)

// Creates the environment based on the user's choices
export const createEnvironment = async (choices) => {
  console.log()
  config.dest = join(process.cwd(), choices.name)

  // Step 1: Copy template files
  const spinner1 = ora(
    chalk.white.bold(' 🟧⬜⬜  Setting up development environment') +
      chalk.white.dim('  |  This should not take long')
  ).start()
  try {
    // Create target directory unless we're overwriting
    if (choices.overwrite) await mkdir(config.dest, { recursive: true })
    // Now copy files
    await copyTemplateFiles(config)
    spinner1.succeed(chalk.white.bold(' 🟩⬜⬜  Development environment created'))
  } catch (err) {
    console.log({ err })
    spinner1.fail(
      ' 🟥⬜⬜   Failed to setup the environment  |  The development environment will not function'
    )
  }

  // Step 2: Install dependencies
  const spinner2 = ora(
    chalk.white.bold(' 🟩🟧⬜  Installing dependencies') +
      chalk.white.dim('  |  Please wait, this will take a while')
  ).start()
  try {
    await installDependencies(config, choices)
    spinner2.succeed(chalk.white.bold(' 🟩🟩⬜  Installed dependencies'))
  } catch (err) {
    console.log({ err })
    spinner2.fail(
      ' 🟩🟥⬜  Failed to install dependencies  |  The development environment will not function'
    )
  }

  // Step 3: Initialize git repository
  if (!choices.sideStep) {
    const spinner3 = ora(
      chalk.white.bold(' 🟩🟩🟧  Initializing git repository') +
        chalk.white.dim('  |  You have git, right?')
    ).start()
    try {
      await initGitRepo(config.dest)
      spinner3.succeed(chalk.white.bold(' 🟩🟩🟩  Initialized git repository'))
    } catch (err) {
      spinner3.fail(
        chalk.white.bold(' 🟩🟩🟥  Failed to initialize git repository') +
          chalk.white.dim('  |  This does not stop the development environment from functioning')
      )
      console.log({ err })
    }
  }

  // All done. Show tips
  showTips(config, choices)
}

/**
 * Copies the template files from the NPM package contents to the target folder
 *
 * @param {object} config - The configuration
 */
async function copyTemplateFiles(config) {
  const dir = join(newDesignDir, `template`)
  const dirs = {}
  // Need to explicitly add hidden folders
  const toCopy = [
    ...(await globDir(join(newDesignDir, `template`))),
    ...(await globDir(join(newDesignDir, `template`, `designs`, `.base`))),
    ...(await globDir(join(newDesignDir, `template`, `designs`, `.bella`))),
    ...(await globDir(join(newDesignDir, `template`, `designs`, `.bent`))),
    ...(await globDir(join(newDesignDir, `template`, `designs`, `.breanna`))),
    ...(await globDir(join(newDesignDir, `template`, `designs`, `.brian`))),
    ...(await globDir(join(newDesignDir, `template`, `designs`, `.titan`))),
  ].sort()
  for (const file of toCopy) {
    const target = resolve(config.dest, file.slice(dir.length + 1))
    if (isDir(file)) await mkdir(target, { recursive: true })
    else {
      await mkdir(dirname(target), { recursive: true })
      await copyFile(file, target) // Copy file
    }
  }
}

/**
 * Reads a folder from disk with an optional glob pattern
 *
 * @param {string} (relative) path to the file to read
 * @param {funtion} onError - a method to call on error
 *
 * @return {string} File contents, or false in case of trouble
 */
async function globDir(
  folderPath, // The (relative) path to the folder
  pattern = '**/*' // Glob pattern to match
) {
  let list = []
  try {
    list = await glob(resolve(folderPath) + '/' + pattern)
  } catch (err) {
    if (err) console.log(err)
    return false
  }

  return list
}

/**
 * Helper method to determine wheter a file is a folder
 */
function isDir(path) {
  return lstatSync(path) ? lstatSync(path).isDirectory() : false
}

/**
 * Helper method to initialize a git repository
 *
 * @param {string} target - The target folder to use
 */
function initGitRepo(target) {
  return execa(
    `git init -b main && git add . && git commit -m ":tada: Initialized FreeSewing development environment"`,
    { cwd: target, shell: true }
  )
}
