import path from 'path'
import fs from 'fs'
import chalk from 'chalk'
import { banner } from '../../../scripts/banner.mjs'
import dotenv from 'dotenv'
dotenv.config()

//const DBURL = process.env.BACKEND_DB_URL || 'file://./db.sqlite'
const newDb = () => {
  // Say hi
  console.log(banner + '\n')
  const db = process.env.BACKEND_DB_URL ? process.env.BACKEND_DB_URL.slice(6) : './db.sqlite'
  const schema = path.resolve('./prisma/schema.sqlite')
  try {
    if (fs.existsSync(db)) {
      console.log(`  ⛔  Database detected - Not proceeding`)
      console.log(`  If you want to create a new database, remove this file: ${chalk.cyan(db)}`)
    } else {
      console.log(`  🚨 Going to create a database at ${chalk.cyan(db)}`)
      fs.copyFile(schema, db, (err) => {
        if (err) console.log(`  ⚠️  ${chalk.red(err)}: Unable to create database file`, err)
        else {
          console.log(`  ${chalk.green('Database created')}`)
        }
      })
    }
  } catch (err) {
    console.log(`  ERROR: Unable to detect database file at ${db}`, err)
  }
}

newDb()
