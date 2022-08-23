const path = require('path')
const fse = require('fs-extra')
const aaron = require('@freesewing/aaron').config
const albert = require('@freesewing/albert').config
const bee = require('@freesewing/bee').config
const bella = require('@freesewing/bella').config
const benjamin = require('@freesewing/benjamin').config
const bent = require('@freesewing/bent').config
const bob = require('@freesewing/bob').config
const brian = require('@freesewing/brian').config
const breanna = require('@freesewing/breanna').config
const diana = require('@freesewing/diana').config
const bruce = require('@freesewing/bruce').config
const carlita = require('@freesewing/carlita').config
const carlton = require('@freesewing/carlton').config
const cathrin = require('@freesewing/cathrin').config
const charlie = require('@freesewing/charlie').config
const cornelius = require('@freesewing/cornelius').config
const florent = require('@freesewing/florent').config
const florence = require('@freesewing/florence').config
const hi = require('@freesewing/hi').config
const holmes = require('@freesewing/holmes').config
const hortensia = require('@freesewing/hortensia').config
const huey = require('@freesewing/huey').config
const hugo = require('@freesewing/hugo').config
const jaeger = require('@freesewing/jaeger').config
const lucy = require('@freesewing/lucy').config
const lunetius = require('@freesewing/lunetius').config
const noble = require('@freesewing/noble').config
const octoplushy = require('@freesewing/octoplushy').config
const paco = require('@freesewing/paco').config
const penelope = require('@freesewing/penelope').config
const sandy = require('@freesewing/sandy').config
const shin = require('@freesewing/shin').config
const simon = require('@freesewing/simon').config
const simone = require('@freesewing/simone').config
const sven = require('@freesewing/sven').config
const tamiko = require('@freesewing/tamiko').config
const teagan = require('@freesewing/teagan').config
const theo = require('@freesewing/theo').config
const tiberius = require('@freesewing/tiberius').config
const titan = require('@freesewing/titan').config
const trayvon = require('@freesewing/trayvon').config
const unice = require('@freesewing/unice').config
const ursula = require('@freesewing/ursula').config
const wahid = require('@freesewing/wahid').config
const walburga = require('@freesewing/walburga').config
const waralee = require('@freesewing/waralee').config
const yuri = require('@freesewing/yuri').config

const patterns = {
  aaron,
  albert,
  bee,
  bella,
  benjamin,
  bent,
  bob,
  brian,
  breanna,
  diana,
  bruce,
  carlita,
  carlton,
  cathrin,
  charlie,
  cornelius,
  florent,
  florence,
  hi,
  holmes,
  hortensia,
  huey,
  hugo,
  jaeger,
  lucy,
  lunetius,
  noble,
  octoplushy,
  paco,
  penelope,
  sandy,
  shin,
  simon,
  simone,
  sven,
  tamiko,
  teagan,
  theo,
  tiberius,
  titan,
  trayvon,
  unice,
  ursula,
  wahid,
  walburga,
  waralee,
  yuri,
}
const patternOptions = (config) => {
  let all = []
  let groups = config.optionGroups
  for (let group of Object.keys(groups)) {
    for (let option of groups[group]) {
      if (typeof option === 'string') all.push(option)
      else {
        for (let subgroup of Object.keys(option)) {
          for (let suboption of option[subgroup]) all.push(suboption)
        }
      }
    }
  }

  return all
}

const patternParts = (config) => {
  let parts = {}
  if (config.parts) {
    for (let p of config.parts) parts[p] = p
  }
  if (config.dependencies) {
    for (let p of Object.keys(config.dependencies)) {
      parts[p] = p
      if (typeof config.dependencies[p] === 'string') {
        parts[config.dependencies[p]] = config.dependencies[p]
      } else {
        for (let d of config.dependencies[p]) parts[d] = d
      }
    }
  }
  if (config.inject) {
    for (let p of Object.keys(config.inject)) {
      parts[p] = p
      parts[config.inject[p]] = config.inject[p]
    }
  }
  if (config.hide) {
    for (let p of config.hide) delete parts[p]
  }

  return Object.keys(parts)
}

const options = {}
const optionGroups = {}
const parts = {}
const measurements = {}
const optionalMeasurements = {}
const versions = {}
const info = {}
for (let pattern of Object.keys(patterns)) {
  if (typeof patterns[pattern] === 'undefined') console.log({pattern})
  options[pattern] = patternOptions(patterns[pattern])
  optionGroups[pattern] = patterns[pattern].optionGroups
  parts[pattern] = patternParts(patterns[pattern])
  measurements[pattern] = patterns[pattern].measurements
  optionalMeasurements[pattern] = patterns[pattern].optionalMeasurements || []
  versions[pattern] = patterns[pattern].version
  info[pattern] = {
    design: patterns[pattern].design,
    code: patterns[pattern].code,
    department: patterns[pattern].department,
    type: patterns[pattern].type,
    difficulty: patterns[pattern].difficulty,
    tags: patterns[pattern].tags,
    deprecated: patterns[pattern].deprecated || false,
  }
}

fse.mkdirSync(path.join('.', 'src', 'prebuild'), { recursive: true })
fse.writeFileSync(
  path.join('.', 'src', 'prebuild', 'options.js'),
  'module.exports = ' + JSON.stringify(options) + '\n'
)
fse.writeFileSync(
  path.join('.', 'src', 'prebuild', 'option-groups.js'),
  'module.exports = ' + JSON.stringify(optionGroups) + '\n'
)
fse.writeFileSync(
  path.join('.', 'src', 'prebuild', 'parts.js'),
  'module.exports = ' + JSON.stringify(parts) + '\n'
)
fse.writeFileSync(
  path.join('.', 'src', 'prebuild', 'measurements.js'),
  'module.exports = ' + JSON.stringify(measurements) + '\n'
)
fse.writeFileSync(
  path.join('.', 'src', 'prebuild', 'optional-measurements.js'),
  'module.exports = ' + JSON.stringify(optionalMeasurements) + '\n'
)
fse.writeFileSync(
  path.join('.', 'src', 'prebuild', 'versions.js'),
  'module.exports = ' + JSON.stringify(versions) + '\n'
)
fse.writeFileSync(
  path.join('.', 'src', 'prebuild', 'info.js'),
  'module.exports = ' + JSON.stringify(info) + '\n'
)
