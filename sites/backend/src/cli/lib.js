import chalk from 'chalk'
import { User, Person, Pattern, Confirmation, Newsletter } from '../models'
import { ehash } from '../utils'
import data from './data'

export const showHelp = () => {
  console.log()
  console.log(chalk.yellow('Use one of the following:'))
  console.log()
  console.log('  ', chalk.bold.blue('npm run clear:users'), '👉 Truncate the users collection')
  console.log('  ', chalk.bold.blue('npm run clear:people'), '👉 Truncate the people collection')
  console.log('  ', chalk.bold.blue('npm run clear:patterns'), '👉 Truncate the patterns collection')
  console.log(
    '  ',
    chalk.bold.blue('npm run clear:confirmations'),
    '👉 Truncate the confirmations collection'
  )
  console.log('  ', chalk.bold.blue('npm run clear:all'), '👉 Empty the entire database')
  console.log(
    '  ',
    chalk.bold.blue('npm run clear:reboot'),
    '👉 Empty database, then load sample data'
  )
  console.log()
  process.exit()
}

export const clearUsers = async () => {
  await User.deleteMany().then(result => {
   if (result.ok) console.log('🔥 Users deleted')
   else console.log('🚨 Could not remove users', result)
  })
}
export const clearPeople = async () => {
  await Person.deleteMany().then(result => {
   if (result.ok) console.log('🔥 People removed')
   else console.log('🚨 Could not remove people', result)
  })
}
export const clearPatterns = async () => {
  await Pattern.deleteMany().then(result => {
   if (result.ok) console.log('🔥 Patterns deleted')
   else console.log('🚨 Could not remove patterns', result)
  })
}
export const clearConfirmations = async () => {
  await Confirmation.deleteMany().then(result => {
   if (result.ok) console.log('🔥 Confirmations deleted')
   else console.log('🚨 Could not remove confirmations', result)
  })
}
export const clearNewsletterSubscribers = async () => {
  await Newsletter.deleteMany().then(result => {
   if (result.ok) console.log('🔥 Newsletter subscriptions deleted')
   else console.log('🚨 Could not remove newsletter subscriptions', result)
  })
}

export const loadSampleData = async () => {
  let promises = []
  for (let sample of data.users) {
    let user = new User({
      ...sample,
      initial: sample.email,
      ehash: ehash(sample.email),
      picture: sample.handle + '.svg',
      time: {
        created: new Date()
      }
    })
    user.createAvatar()
    promises.push(user.save())
  }
  for (let sample of data.people) {
    let person = new Person(sample)
    person.createAvatar()
    promises.push(person.save())
  }
  for (let sample of data.patterns) {
    promises.push(new Pattern(sample).save())
  }

  return Promise.all(promises)
}

export const runTasks = options => {
  let promises = []
  if (options.clearAll || options.reboot || options.clearUsers) promises.push(clearUsers())
  if (options.clearAll || options.reboot || options.clearPeople) promises.push(clearPeople())
  if (options.clearAll || options.reboot || options.clearPatterns) promises.push(clearPatterns())
  if (options.clearAll || options.reboot || options.clearConfirmations)
    promises.push(clearConfirmations())
  if (options.clearAll || options.reboot || options.clearNewsletterSubscriptions)
    promises.push(clearNewsletterSubscribers())

  return Promise.all(promises)
}
