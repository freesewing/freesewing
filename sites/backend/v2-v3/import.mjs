import dotenv from 'dotenv'
//import subscribers from './v2-newsletters.json' assert { type: 'json' }
import users from '../dump/v2-users.json' assert { type: 'json' }
import people from '../dump/v2-people.json' assert { type: 'json' }
import patterns from '../dump/v2-patterns.json' assert { type: 'json' }
dotenv.config()

const batchSize = 100

/*
 * Only this token allows exporting data
 */
const import_token = process.env.IMPORT_TOKEN

/*
 * Where to connect to?
 */
const BACKEND = 'http://localhost:3000'

const splitArray = (split, batchSize) =>
  split.reduce((result, item, index) => {
    const batchIndex = Math.floor(index / batchSize)
    if (!result[batchIndex]) result[batchIndex] = []
    result[batchIndex].push(item)

    return result
  }, [])

/*
 * Commented out because linter
const importSubscribers = async () => {
  console.log('Importing subscribers')
  const count = subscribers.length
  let total = 0
  const batches = splitArray(subscribers, batchSize)
  for (const batch of batches) {
    const result = await fetch(`${BACKEND}/import/subscribers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        import_token: import_token,
        list: batch,
      }),
    })
    const data = await result.json()
    total += data.imported
    console.log(`${total}/${count}`)
  }
}
*/
const lastLoginInDays = (user) => {
  const now = new Date()
  const then = new Date(user.time.login)

  return Math.floor((now - then) / (1000 * 60 * 60 * 24))
}

const usersToImport = () =>
  users.filter((user) => user.status === 'active' && lastLoginInDays(user) < 370)
// Commented out for linter
// const usersToNotImport = () =>
//   users.filter((user) => user.status !== 'active' && lastLoginInDays(user) >= 370)

const importUsers = async () => {
  console.log('Processing users')
  const todo = usersToImport()
  // Put users in an object with their handle as key
  const allUsers = {}
  for (const user of todo) allUsers[user.handle] = user
  // Find all people belonging to this user
  for (const person of people) {
    if (typeof allUsers[person.user] !== 'undefined') {
      if (typeof allUsers[person.user].people === 'undefined') allUsers[person.user].people = {}
      allUsers[person.user].people[person.handle] = person
    }
  }
  // Find all patterns belonging to this user
  for (const pattern of patterns) {
    if (typeof allUsers[pattern.user] !== 'undefined') {
      if (typeof allUsers[pattern.user].patterns === 'undefined')
        allUsers[pattern.user].patterns = {}
      allUsers[pattern.user].patterns[pattern.handle] = pattern
    }
  }
  console.log('Importing users')
  const count = todo.length
  let total = 0
  const batches = splitArray(todo, batchSize)
  for (const batch of batches) {
    await fetch(`${BACKEND}/import/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        import_token: import_token,
        list: batch,
      }),
    })
    total += batchSize
    console.log(`${total}/${count}`)
  }
}

const importAll = async () => {
  //await importSubscribers()
  await importUsers()
}

importAll()
