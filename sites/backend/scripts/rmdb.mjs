import fs from 'fs'
import prompts from 'prompts'
import chalk from 'chalk'
import { banner } from '../../../scripts/banner.mjs'
import dotenv from 'dotenv'
dotenv.config()

const rmdb = async () => {
  // Say hi
  console.log(banner + '\n')

  console.log(`
  🚨 This will ${chalk.yellow('remove your database')}
  ⚠️  There is ${chalk.bold('no way back')} from this - proceed with caution
  `)

  const answer = await prompts([
    {
      type: 'confirm',
      name: 'confirms',
      message: 'Are you sure you want to completely remove your FreeSewing database?',
      initial: false,
    },
  ])

  if (answer.confirms) {
    console.log()
    // Nuke it from orbit
    const db = process.env.BACKEND_DB_URL.slice(6)
    fs.access(db, fs.constants.W_OK, (err) => {
      if (err) console.log(`  ⛔  Cannot remove ${chalk.green(db)}  🤔`)
      else {
        fs.unlinkSync(db)
        console.log(`  🔥 Removed ${chalk.red(db)} 😬`)
      }
      console.log()
    })
  } else {
    console.log()
    console.log(chalk.green('  😅 Not removing database - Phew'))
    console.log()
  }
}

rmdb()
