import path from 'path'
import chalk from 'chalk'
import { banner } from './banner.mjs'
import {
  checkNodeVersion,
  getChoices,
  createEnvironment,
} from './utils.mjs'


export const cli = async () => {

  // Make it pretty
  console.log(banner+"\n")

  // Make sure we have a valid NodeJS version
  checkNodeVersion()

  // Get user input
  const choices = await getChoices()

  // Create environment from template
  const result = createEnvironment(choices)
}

/*


  const dest = await createLibrary(params)

  console.log(`
🎉 ${strings[params.language]['cfp.patternCreated']} ${chalk.bold(dest)}

${strings[params.language]['cfp.runTheseCommands']}:

  👉  ${chalk.cyan(`cd ${path.join(params.shortName, 'example')} && ${params.manager} start`)}

${strings[params.language]['cfp.startWebpack']}

${strings[params.language]['cfp.devDocsAvailableAt']}
  ${chalk.bold('https://freesewing.dev/')}

${strings[params.language]['cfp.talkToUs']}
  ${chalk.bold('https://discord.freesewing.org/')}

`
  )

  return dest
}


*/
