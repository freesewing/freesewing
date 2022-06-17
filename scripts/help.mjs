import chalk from 'chalk'
console.clear()
console.log(chalk.magenta.bold(`
   ___            ___             _
  | __| _ ___ ___/ __| _____ __ _(_)_ _  __ _
  | _| '_/ -_) -_)__ \\/ -_) V  V / | ' \\/ _\` |
  |_||_| \\___\\___|___/\\___|\\_/\\_/|_|_||_\\__, |
    Come for the sewing patterns        |___/
      Stay for the community`))
console.log(`

  ${chalk.bold.yellow('🤨 Help with our monorepo')}
  ${chalk.gray('≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡')}

  Welcome to our git repository 😀
  These are the most relevant folders:

    👕  ${chalk.blue('designs/')} holds code for our designs
    🔌  ${chalk.blue('plugins/')} holds code for our plugins
    📦  ${chalk.blue('packages/')} holds code for other NPM packages
    🔗  ${chalk.blue('sites/')} holds code for our various websites and APIs


  ${chalk.bold.yellow('🚀 Getting started')}
  ${chalk.gray('≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡')}

  This repository relies on ${chalk.green('yarn')} workspaces.
  To install yarn, run this command:

  ${chalk.blue('npm install --global yarn')}

  Then, run this command in the monorepo root:

  ${chalk.blue('yarn kickstart')}

  It will install and link all dependencies, and link them together.
  It will also run ${chalk.blue('yarn reconfigure')} which you can run yourself at any time to (re)configure all packages and dependencies.


  ${chalk.bold.yellow('🛠️  Starting the development environment')}
  ${chalk.gray('≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡')}

  Our development environment for ${chalk.bold('designs')} and ${chalk.bold('plugins')} lives in ${chalk.green('sites/lab')}
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


  ${chalk.bold.yellow('🤔 More info & help')}
  ${chalk.gray('≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡')}

  FreeSewing's documentation for developers and contributors is available at:

  ${chalk.green('https://freesewing.dev/')}

  Our community is on Discord. The ${chalk.bold('development-help')} channel is a good place to start:

  ${chalk.green('https://discord.freesewing.dev/')}


  Happy hacking 🤓

`)
