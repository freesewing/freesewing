import '../env'
import mongoose from 'mongoose'
import config from '../config/index'
import chalk from 'chalk'
import verifyConfig from '../config/verify'
import optionDefinitions from './options'
import commandLineArgs from 'command-line-args'
import { showHelp, loadSampleData, runTasks } from './lib'

const options = commandLineArgs(optionDefinitions)
if (options.help) {
  showHelp()
  process.exit()
}

// Verify configuration
verifyConfig(config, chalk)

// Connecting to the database
mongoose.Promise = global.Promise
mongoose
  .connect(config.db.uri, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log(chalk.green('Successfully connected to the database'))
    console.log()
    runTasks(options).then(() => {
      if (options.reboot) {
        loadSampleData().then(() => {
          console.log('⚡ Data loaded')
          process.exit()
        })
      } else {
        console.log()
        process.exit()
      }
    })
  })
  .catch(err => {
    console.log(chalk.red('Could not connect to the database. Exiting now...'), err)
    process.exit()
  })
