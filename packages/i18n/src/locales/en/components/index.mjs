import { readdir, readFile } from 'fs/promises'
import yaml from 'js-yaml'
import path from 'path'

const loadYamlFiles = async (folder) => {
  const strings = {}
  const promises = []
  const files = (await readdir(folder))
    .filter(file => file.slice(-5) === '.yaml')
  for (const file of files) promises.push(
    readFile(path.resolve(folder, file), { encoding: 'utf-8'})
    .then(content => strings[file.slice(0, -5)] = yaml.load(content))
  )

  await Promise.all(promises)

  return strings
}

const strings = await loadYamlFiles('.')

export default strings
