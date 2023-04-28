import rdir from 'recursive-readdir'
import { join, basename } from 'path'

// Files to not download
const avoid = {
  files: [
    'README.md',
    'package.json',
    'CHANGELOG.md',
    'version-pickers.js',
    'pattern-picker.js',
    'header.js',
  ],
  dirs: ['node_modules', 'layouts', 'e2e'],
}

// Method to check what files to keep
const keep = (file) => {
  if (avoid.files.indexOf(basename(file)) !== -1) return false
  for (const dir of avoid.dirs) {
    if (file.indexOf(dir) !== -1) return false
  }

  return true
}

const getFiles = async (site) => {
  const all = await rdir(join('..', '..', 'sites', site))

  return all.filter((file) => keep(file)).map((file) => file.slice(12))
}

getFiles('shared').then((shared) => {
  getFiles(join('lab', 'components')).then((lab) => {
    console.log(JSON.stringify([...shared, ...lab], null, 2))
  })
})
