import chalk from 'chalk'
import readline from 'node:readline'
import process from 'node:process'
import fs from 'node:fs'
import path from 'node:path'
import lernaConfig from '../lerna.json' with { type: 'json' }

console.log(`
${chalk.white('The current version is:')} ${chalk.yellow.bold(lernaConfig.version)}
`)

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

rl.question(`Enter a new version number: `, async (version) => {
  console.log(`Setting version to ${chalk.green.bold(version)}`)
  let file
  try {
    const result = await fs.promises.writeFile(
      path.resolve('lerna.json'),
      JSON.stringify({ ...lernaConfig, version }, null, 2)
    )
  } catch (err) {
    console.log(`Failed to write version to lerna.json file`, err)
  }
  rl.close()
})
