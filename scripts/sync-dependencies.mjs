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
const semVerRgx = `\\d+\\.\\d+\\.\\d+` // regex pattern to find semver
const dependencyRgx = `'@?${dependency}':` //regex pattern to find a dependency based on the branch name
let newDepsRaw = false

// replace direct matches
const directRgx = new RegExp(`(?<=${dependencyRgx}\\s(&.+\\s)?')${semVerRgx}(?=')`, 'g') // a regex to find the dependency if it has its own version
if (oldDepsRaw.match(directRgx)) {
  newDepsRaw = oldDepsRaw.replace(directRgx, dependencyVersion)

  console.log(
    `Updating ${dependency} version to ${dependencyVersion} in config/dependencies.yaml. This may impact linked dependencies`
  )
} else {
  // otherwise find the name of its linked version
  const linkedRgx = new RegExp(`(?<=${dependencyRgx}\\s\\*)\\w+`) // a regex to find the name of the linked version of this dependency
  const linkedMatch = oldDepsRaw.match(linkedRgx)
  // if there's a match
  if (linkedMatch) {
    // find and replace the version where it is declared
    const declarationRgx = new RegExp(`(?<=&${linkedMatch[0]}\\s?')${semVerRgx}(?=')`)

    newDepsRaw = oldDepsRaw.replace(declarationRgx, dependencyVersion)
    console.log(`Updating linked version for ${linkedMatch[0]} in config/dependencies.yaml`)
  }
}

// write the file
if (newDepsRaw) {
  writeFileSync(depsFile, newDepsRaw)
  console.log('Successfully updated config/dependencies.yaml')
} else {
  console.log('Could not find dependency to sync')
}
