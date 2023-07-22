import { banner } from '../../../scripts/banner.mjs'
import { checkNodeVersion, getChoices, createEnvironment } from './utils.mjs'

export const cli = async () => {
  // Make it pretty
  console.log(banner + '\n')

  // Make sure we have a valid NodeJS version
  checkNodeVersion()

  // Get user input
  const choices = await getChoices()

  // Create environment from template
  createEnvironment(choices)
}
