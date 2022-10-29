import config from '../vahi.config.mjs'
import sqlite3 from 'sqlite3'
import path from 'path'
import { generatePassword } from '../api/utils.mjs'
import { vascii } from '../api/utils.mjs'
import kleur from 'kleur'

const reset = () => {
  // Connect to database
  const db = new sqlite3.Database(path.resolve(config.db.path))
  console.log(`
  ${kleur.green(vascii)}
  🔓  Resetting root admin password...
  `)
  // Check if database exists
  let exists = false
  db.exec('SELECT * FROM Admin;', err => {
    if (err) console.log(`
  VaHI: WARNING - Database does not exist. 
  You can create it by running: npm run initdb 
  ( or: yarn initdb )
      `)
    else {
      // Update admin user
      const [pwd, hash, salt] = generatePassword()
      db.exec(`UPDATE Admin SET password = "${hash}:${salt}" WHERE email = "${config.root.email}";`, err => {
        if (err) console.log(`WARNING: Failed to update root admin user password. The error was:`, err)
        else console.log(`
  You can now login with the root admin account:

    username: ${kleur.yellow(config.root.email)}
    password: ${kleur.yellow(pwd)}

  Please write this password down. 
  You can restore it by running ${kleur.cyan('npm run resetrootpassword')}
        `)
      })
    }
  })
}

reset()

