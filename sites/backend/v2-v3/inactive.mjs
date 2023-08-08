import users from './v2-users.json' assert { type: 'json' }

const lastLoginInDays = (user) => {
  if (!user.time?.login) return 1000
  const now = new Date()
  const then = new Date(user.time.login)

  return Math.floor((now - then) / (1000 * 60 * 60 * 24))
}

const usersToNotImport = () =>
  users.filter((user) => user.status !== 'active' || lastLoginInDays(user) >= 370)
// Commented about linter
//const usersToImport = () =>
//  users.filter((user) => user.status === 'active' && lastLoginInDays(user) < 370)

console.log(
  JSON.stringify(
    usersToNotImport().map((user) => user.email),
    null,
    2
  )
)
