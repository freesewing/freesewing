/*
import path from 'path'
import fs from 'fs'
import { PrismaClient } from '@prisma/client'
import { hash, encryption } from '../src/utils/crypto.mjs'
import { clean } from '../src/utils/index.mjs'
import { verifyConfig } from '../src/config.mjs'

const prisma = new PrismaClient()
const config = verifyConfig()
const { encrypt, decrypt } = encryption(config.encryption.key)

//
// Note: This is not intended to work for you
//
// This script imports a raw database dump of the current (v2)
// FreeSewing backend and writes it to sqlite.
//
// This is not the kind of thing you should try to run yourself
// because for one thing you do not have a raw database dump
///

// Dumped data folder
const dir = '/home/joost/'

// Load filtered data for migration
const file = 'freesewing-filtered.json'
const data = JSON.parse(fs.readFileSync(path.resolve(dir, file), { encoding: 'utf-8' }))
console.log()
console.log('Migrating:')
console.log('  🧑 ', Object.keys(data.users).length, 'users')
console.log('  🕺 ', Object.keys(data.people).length, 'people')
console.log('  👕 ', Object.keys(data.patterns).length, 'patterns')
console.log('  📰 ', data.subscribers.length, 'subscribers')
console.log()
data.userhandles = {}
await migrateUsers(data.users)
console.log()
data.peoplehandles = {}
await migratePeople(data.people)
console.log()
await migratePatterns(data.patterns)
console.log()
await migrateSubscribers(data.subscribers)
console.log()

function progress(text) {
  process.stdout.clearLine()
  process.stdout.cursorTo(0)
  process.stdout.write(text)
}

async function migrateSubscribers(subscribers) {
  const total = subscribers.length
  let i = 0
  for (const sub of subscribers) {
    i++
    progress(`  📰  subscriber ${i}/${total}`)
    await createSubscriber(sub)
  }
}

async function createSubscriber(sub) {
  const record = await prisma.subscriber.create({
    data: {
      createdAt: sub.createdAt,
      data: JSON.stringify({}),
      ehash: hash(clean(sub.email)),
      email: encrypt(clean(sub.email)),
    },
  })
}

async function migratePatterns(patterns) {
  const total = Object.keys(patterns).length
  let i = 0
  for (const pattern of Object.values(patterns)) {
    i++
    progress(`  👕  pattern ${i}/${total}`)
    await createPattern(pattern)
  }
}

async function createPattern(pattern) {
  const record = await prisma.pattern.create({
    data: {
      createdAt: pattern.createdAt,
      data: JSON.stringify(pattern.data),
      personId: data.peoplehandles[pattern.person],
      userId: data.userhandles[pattern.user],
    },
  })
}

async function migratePeople(people) {
  const total = Object.keys(people).length
  let i = 0
  for (const person of Object.values(people)) {
    i++
    progress(`  🕺 person ${i}/${total}`)
    await createPerson(person)
  }
}

async function createPerson(person) {
  const record = await prisma.person.create({
    data: {
      createdAt: person.createdAt,
      data: JSON.stringify(person.data),
      userId: data.userhandles[person.user],
      measies: JSON.stringify(person.measurements),
    },
  })
  data.peoplehandles[person.handle] = record.id
}

async function migrateUsers(users) {
  const total = Object.keys(users).length
  let i = 0
  for (const user of Object.values(users)) {
    i++
    progress(`  🧑 user ${i}/${total}`)
    await createUser(user)
  }
}

async function createUser(user) {
  const ehash = hash(clean(user.email))
  let record
  const _data = {
    consent: user.consent,
    createdAt: user.createdAt,
    data: JSON.stringify(user.data),
    ehash,
    email: encrypt(clean(user.email)),
    ihash: ehash,
    initial: encrypt(clean(user.email)),
    newsletter: user.newsletter,
    password: JSON.stringify({
      type: 'v2',
      data: user.password,
    }),
    patron: user.patron,
    role: user.role,
    status: user.status,
    username: user.username,
    lusername: user.username.toLowerCase(),
    lastLogin: new Date(user.lastLogin),
  }
  try {
    record = await prisma.user.create({ data: _data })
  } catch (err) {
    _data.username += ' 2'
    _data.lusername += ' 2'
    try {
      record = await prisma.user.create({ data: _data })
    } catch (err) {
      console.log(err)
      process.exit()
    }
  }
  data.userhandles[user.handle] = record.id
}

/
// Only migrate user data if the user was active in the last 12 months
// Unless they are patrons. Keep patrons regardless coz patrons rock.
//
function filterData(data) {
  let i = 0
  const filtered = {
    users: {},
    people: {},
    patterns: {},
    subscribers: [],
  }
  for (const user of data.users) {
    const migrated = migrateUser(user)
    if (migrated) {
      i++
      filtered.users[migrated.handle] = migrated
    }
  }
  const users = Object.keys(filtered.users)
  for (const person of data.people) {
    if (users.includes(person.user)) filtered.people[person.handle] = migratePerson(person)
  }
  for (const pattern of data.patterns) {
    if (users.includes(pattern.user)) filtered.patterns[pattern.handle] = migratePattern(pattern)
  }
  for (const sub of data.subscribers) {
    filtered.subscribers.push(migrateSubscriber(sub))
  }

  return filtered
}

//
// Migrates role field
//
function getRole(entry) {
  if (entry.handle === 'joost') return 'admin'
  if (entry.patron > 0) return 'patron'
  return 'user'
}

//
// Migrates consent field
//
function getConsent(entry) {
  let consent = 0
  if (entry.consent.profile) consent++
  if (entry.consent.model) consent++
  if (entry.consent.openData) consent++
  return consent
}

//
// Migrates person entry
//
function migratePerson(entry) {
  return {
    user: entry.user,
    units: entry.units,
    name: entry.name,
    handle: entry.handle,
    img: entry.img,
    data: { notes: entry.notes, units: entry.units },
    measurements: entry.measurements,
    createdAt: entry.created,
    updatedAt: entry.updatedAt,
  }
}

//
// Migrates pattern entry
//
function migratePattern(entry) {
  return {
    handle: entry.handle,
    user: entry.user,
    name: entry.name,
    createdAt: entry.createdAt,
    updatedAt: entry.updatedAt,
    person: entry.person,
    data: { ...entry.data, notes: entry.notes },
  }
}

//
// Migrates subscriber entry
//
function migrateSubscriber(entry) {
  return {
    createdAt: entry.created,
    email: entry.email,
  }
}

*/
