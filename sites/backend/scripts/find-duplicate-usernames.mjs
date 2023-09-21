import path from 'path'
import fs from 'fs'
import chalk from 'chalk'

/*
 * Note: This is not intended to work for you
 *
 * This script imports a raw database dump of the current (v2)
 * FreeSewing backend and checks for duplicate usernames now that
 * we treat them as case-insensitive.
 *
 * This is not the kind of thing you should try to run yourself
 * because for one thing you do not have a raw database dump
 */

// Dumped data folder
const dir = '/home/joost/'
let i = 0

// Load filtered data for migration
const file = 'freesewing-filtered.json'
const data = JSON.parse(fs.readFileSync(path.resolve(dir, file), { encoding: 'utf-8' }))
console.log()
console.log('Checking:')
console.log('  🧑 ', Object.keys(data.users).length, 'users')
console.log()
data.lusernames = {}
await checkUsers(data.users)
console.log()

async function checkUsers(users) {
  let i = 0
  for (const user of Object.values(users)) {
    i++
    await checkUser(user)
  }
}

async function checkUser(user) {
  const lusername = user.username.toLowerCase()
  if (typeof data.lusernames[lusername] === 'undefined') {
    data.lusernames[lusername] = user
  } else {
    i++
    const first = data.lusernames[lusername]
    console.log(chalk.yellow(`${i}: ${lusername}`))
    console.log(`  - First by: ${chalk.green(first.handle)} / ${chalk.green(first.email)}`)
    console.log(`  - Later by: ${chalk.cyan(user.handle)} / ${chalk.cyan(user.email)}`)
  }
}
