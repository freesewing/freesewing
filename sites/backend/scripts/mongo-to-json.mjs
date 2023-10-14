/*
import path from 'path'
import fs from 'fs'
import { PrismaClient } from '@prisma/client'
import { hash, encryption } from '../src/utils/crypto.mjs'
import { clean } from '../src/utils/index.mjs'
import { verifyConfig } from '../src/config.mjs'

const config = verifyConfig()

//
// Note: This is not intended to work for you
//
// This script imports a raw database dump of the current (v2)
// FreeSewing backend and writes it to JSON.
//
// This is not the kind of thing you should try to run yourself
// because for one thing you do not have a raw database dump
//

// Dumped data folder
const dir = '/home/joost/'

let data
// Dump filtered data from raw data
const file = 'freesewing-dump.json'
data = filterData(JSON.parse(fs.readFileSync(path.resolve(dir, file), { encoding: 'utf-8' })))
console.log(JSON.stringify(data, null, 2))

//
// Only migrate user data if the user was active in the last 12 months
// Unless they are patrons. Keep patrons regardless coz patrons rock.
//
function filterData(data) {
  let i = 0
  const filtered = {
    totals: {
      users: Object.keys(data.users).length,
      people: Object.keys(data.people).length,
      patterns: Object.keys(data.patterns).length,
      subscribers: Object.keys(data.subscribers).length,
    },
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
// Migrates user entry
//
function migrateUser(entry) {
  const now = Date.now()
  const lastLogin = new Date(entry.time?.login || 0)
  const daysSince = Math.floor((now - lastLogin) / (1000 * 3600 * 24))
  // FreeSewing's privacy policy says we'll keep your data 12 months
  // so if last login is longer than that, we won't migrate the account
  if (daysSince > 366) return false

  return {
    data: {
      settings: entry.settings,
      social: entry.social,
      bio: entry.bio,
      img: entry.img,
    },
    consent: getConsent(entry),
    patron: entry.patron,
    status: 1,
    handle: entry.handle,
    username: entry.username,
    role: getRole(entry),
    ehash: entry.ehash,
    password: entry.password,
    createdAt: entry.createdAt,
    email: entry.email,
    initial: entry.initial,
    newsletter: entry.newsletter,
    img: entry.img,
    lastLogin,
  }
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
