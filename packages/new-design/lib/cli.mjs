import { checkNodeVersion, getChoices, createEnvironment } from './utils.mjs'
import chalk from 'chalk'

const color = (hex, txt) => chalk.hex(hex).bold(txt)
const red = (txt) => color('#EF4444', txt)
const orange = (txt) => color('#F97316', txt)
const yellow = (txt) => color('#FACC15', txt)
const green = (txt) => color('#84CC16', txt)
const blue = (txt) => color('#3B82F61', txt)
const violet = (txt) => color('#8B5CF6', txt)
const tblue = (txt) => color('#77cbf9', txt)
const tpink = (txt) => color('#ecadb9', txt)
const white = (txt) => color('#ffffff', txt)
const text = (txt) => chalk.hex('#cccccc').dim(txt)

const nl = '\n'

const banner =
  nl +
  red('   ___           ') +
  yellow(' ___') +
  blue('             _') +
  nl +
  red('  | __| _') +
  orange(' ___ ___') +
  yellow('/ __|') +
  green(' _____ _') +
  blue('_ _(_)') +
  violet('_ _  __ _') +
  nl +
  red(`  | _| '_/`) +
  orange(' -_) -_)') +
  yellow('__ \\') +
  green('/ -_) V ') +
  blue(' V / |') +
  violet(` ' \\/ _\` |`) +
  nl +
  red(`  |_||_|`) +
  orange(` \\___\\___`) +
  yellow(`|___/`) +
  green(`\\___|\\_/`) +
  blue(`\\_/|_|`) +
  violet(`_||_\\__, |`) +
  nl +
  text(`  `) +
  tblue('≡≡≡≡≡≡≡') +
  tpink('≡≡≡≡≡≡≡') +
  white('≡≡≡≡≡≡≡≡≡≡') +
  tpink('≡≡≡≡≡≡≡') +
  tblue('≡≡≡≡≡≡≡') +
  violet(`|___/`) +
  nl +
  white('  Come') +
  text(' for the ') +
  white('sewing patterns') +
  nl +
  white('  Stay') +
  text(' for the ') +
  red('c') +
  orange('o') +
  yellow('m') +
  green('m') +
  blue('u') +
  violet('n') +
  white('i') +
  tpink('t') +
  tblue('y')

export const cli = async () => {
  // Make it pretty
  console.log(banner + '\n')

  // Make sure we have a valid NodeJS version
  checkNodeVersion()

  // Get user input
  const choices = await getChoices()

  // Create environment
  createEnvironment(choices)
}
