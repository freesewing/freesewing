import { prebuildOrg } from './org.mjs'
import path from 'path'
import fse from 'fs-extra'

const copyFromOrg = [
  'account',
  'confirm',
  'designs',
  'new',
  'patterns',
  'sets',
  'signin',
  'signup',
  'welcome',
]

const copyOrgFiles = () => {
  for (const folder of copyFromOrg) {
    fse.copySync(
      path.resolve('..', 'org', 'pages', folder),
      path.resolve('..', 'lab', 'pages', folder),
      { overwrite: true }
    )
  }
}

export const prebuildLab = async () => {
  await prebuildOrg('lab')
  copyOrgFiles()
}
