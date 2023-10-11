import path from 'path'
import fse from 'fs-extra'
import { collection } from '../../org/hooks/use-design.mjs'

const copyFromOrg = [
  ['account'],
  ['designs'],
  ['new', 'index.mjs'],
  ...collection.map((design) => ['new', `${design}.mjs`]),
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
}
