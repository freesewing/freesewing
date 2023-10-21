import path from 'path'
import fse from 'fs-extra'
import { collection } from '../../lab/hooks/use-design.mjs'
import { generateNewPatternPages } from './org.mjs'

const copyFromOrg = [
  ['account'],
  ['designs'],
  ['new', 'index.mjs'],
  ['patterns'],
  ['sets'],
  ['signin'],
  ['signup'],
]

const copyOrgFiles = () => {
  for (const folder of copyFromOrg) {
    fse.copySync(
      path.resolve('..', 'org', 'pages', ...folder),
      path.resolve('..', 'lab', 'pages', ...folder),
      { overwrite: true }
    )
  }
}

export const prebuildLab = async () => {
  copyOrgFiles()
  await generateNewPatternPages(collection, 'lab')
}
