import rdir from 'recursive-readdir'
import path from 'path'

const ignore = [
  'package.json',
  'node_modules',
  '.eslint',
  '.gitignore',
  '.md',
  'lab/components/header.js',
  'lab/components/help-us.js',
  'lab/components/search.js',
  'lab/components/footer.js',
  'shared/config/measurements.js',
]

const getFiles = async (dir) => {
  const all = await rdir(path.resolve(dir))
  return all
    .filter((file) => {
      for (const skip of ignore) {
        if (file.includes(skip)) return false
      }
      return true
    })
    .map((file) => file.split('/sites/').pop())
}

const doIt = async () => {
  let files = []
  const shared = await getFiles('../../sites/shared')
  const lab = await getFiles('../../sites/lab/components')
  console.log(JSON.stringify([...shared, ...lab], null, 2))
}

doIt()
