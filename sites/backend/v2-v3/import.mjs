import subscribers from './v2-newsletters.json' assert { type: 'json' }
import users from './v2-users.json' assert { type: 'json' }
import people from './v2-people.json' assert { type: 'json' }

/*
 * Only this token allows exporting data
 */
const import_token = 'TOKEN_HERE'

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
  const batches = splitArray(subscribers, 50)
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
  // Find all people belonging to these users
  for (const person of people) {
    if (typeof allUsers[person.user] !== 'undefined') {
      if (typeof allUsers[person.user].people === 'undefined') allUsers[person.user].people = []
      allUsers[person.user].people.push(person)
    }
  }
  console.log('Importing users')
  console.log(JSON.stringify(allUsers.joost, null, 2))
  process.exit()
  const count = todo.length
  let total = 0
  const batches = splitArray(todo, 50)
  for (const batch of batches) {
    const result = await fetch(`${BACKEND}/import/users`, {
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
    console.log(`${total}/${count} (${data.skipped} skipped)`)
    console.log(data)
  }
}

const importAll = async () => {
  //await importSubscribers()
  await importUsers()
}

importAll()
