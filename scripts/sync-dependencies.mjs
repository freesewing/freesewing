// when dependabot updates a dependency in a package.json,
// we want to update it in our dependencies.yaml so the update doesn't get clobbered
// This script is run by the github action in dependabot-sync.yml
import process from 'node:process'
import { readFileSync, writeFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// when dependabot updates a dependency in a package.json, we want to update it in our dependencies.yaml
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const depsFile = path.join(__dirname, '..', 'config/dependencies.yaml')
const oldDepsRaw = readFileSync(depsFile, { encoding: 'utf8' })

// we get the branch name handed to us by the github action,
// and it has all the info we need about the dependency being updated
const branchName = process.argv[2]
console.log('processing updates from ', branchName)
const versionRgx = /\d+\.\d+\.\d+$/
const dependencyVersion = branchName.match(versionRgx)[0]
const dependency = branchName
  .replace(`-${dependencyVersion}`, '')
  .replace('dependabot/npm_and_yarn/', '')

// because this is from dependabot,
// and because we want all our versions synced
// we simply find and replace the version wherever it is specified
const rgx = new RegExp(`(?<='@?${dependency}':\\W{0,2}\\w*\\W?')\\d+\\.\\d+\\.\\d+(?=')`, 'g')
const newDepsRaw = oldDepsRaw.replace(rgx, dependencyVersion)
console.log(`Updating ${dependency} version to ${dependencyVersion} in config/dependencies.yaml`)

// write the file
writeFileSync(depsFile, newDepsRaw)
console.log('Successfully updated config/dependencies.yaml')
