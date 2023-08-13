import users from '../dump/v2-users.json' assert { type: 'json' }

const usersToNotImport = () => users.filter((user) => user.status !== 'active')
// Commented out for linter
//const usersToImport = () =>
//  users.filter((user) => user.status === 'active')

console.log(
  JSON.stringify(
    usersToNotImport().map((user) => user.email),
    null,
    2
  )
)
