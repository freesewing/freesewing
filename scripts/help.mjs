import chalk from 'chalk'
import { banner } from './banner.mjs'

console.clear()
console.log(banner)
console.log(`

  ${chalk.bold.yellow('🤨 Help with our monorepo')}
  ${chalk.gray('≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡')}

  Welcome to our git repository 😀
  These are the most relevant folders:

    👕  ${chalk.green('designs/')} holds code for our designs
    🔌  ${chalk.green('plugins/')} holds code for our plugins
    📦  ${chalk.green('packages/')} holds code for other NPM packages
    🔗  ${chalk.green('sites/')} holds code for our various websites and APIs

  You can show this help at any moment by running: ${chalk.blue('yarn tips')}


  ${chalk.bold.yellow('🚀 Getting started')}
  ${chalk.gray('≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡')}

  This repository relies on ${chalk.green('yarn')} workspaces.
  To install yarn, run this command:

  ${chalk.blue('npm install --global yarn')}

  Then, run this command in the monorepo root:

  ${chalk.blue('yarn kickstart')}

  It will install and link all dependencies.


  If something goes wrong in the configuration, you can run

  ${chalk.blue('yarn reconfigure')}

  It will (re)configure all packages and dependencies.


  ${chalk.bold.yellow('🛠️  Starting the development environment')}
  ${chalk.gray('≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡')}

  Our development environment for ${chalk.bold('designs')} and ${chalk.bold(
  'plugins'
)} lives in ${chalk.green('sites/lab')}
  We refer to it as ${chalk.bold('the FreeSewing lab')}.
  It can display any design in this repository and will hot-reload any changes you make to a design.

  To start the lab, run this command:

  ${chalk.blue('yarn lab')}

  Now open your browser and navigate to ${chalk.green('http://localhost:8000/')}


  ${chalk.bold.yellow('👕 Adding a new design')}
  ${chalk.gray('≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡')}

  To add a new design to this repository, run this command:

  ${chalk.blue('yarn new design')}

  It will ask you some questions, and set everything up for you, and add your design to the lab.


  If you later need to add more dependencies to your design, add them in ${chalk.green(
    'config/dependencies.yaml'
  )}, then run

  ${chalk.blue('yarn reconfigure')}

  They will be added to your design's ${chalk.green('package.json')}


  ${chalk.bold.yellow('🤔 More info & help')}
  ${chalk.gray('≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡')}

  FreeSewing's documentation for developers and contributors is available at:

  ${chalk.green('https://freesewing.dev/')}

  Our community is on Discord. The ${chalk.bold(
    'development-help'
  )} channel is a good place to start:

  ${chalk.green('https://discord.freesewing.dev/')}


  Happy hacking 🤓

`)
