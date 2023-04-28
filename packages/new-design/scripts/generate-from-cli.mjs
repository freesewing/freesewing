import { createEnvironment } from '../lib/utils.mjs'

const choices = {
  template: process.env.TEMPLATE,
  name: process.env.NAME,
  manager: 'yarn',
  overwrite: true,
  includeTests: true,
}

createEnvironment(choices)
