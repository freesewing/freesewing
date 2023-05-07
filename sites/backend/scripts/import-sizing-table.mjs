import path from 'path'
import fs from 'fs'
import { PrismaClient } from '@prisma/client'
import { hash, encryption } from '../src/utils/crypto.mjs'
import { clean } from '../src/utils/index.mjs'
import { verifyConfig } from '../src/config.mjs'
import {
  cisFemaleAdult,
  cisMaleAdult,
  cisFemaleDoll,
  cisMaleDoll,
  cisFemaleGiant,
  cisMaleGiant,
} from '../../../packages/models/src/index.mjs'
const prisma = new PrismaClient()
const config = verifyConfig()
const { encrypt, decrypt } = encryption(config.encryption.key)

/*
 * Note: This will import the FreeSewing (v2) sizing table into the
 * FreeSewing curator account.
 *
 * The curator account is just a regular user account, but one that
 * we use to store the 'official' measurement sets.
 *
 * Unless you are a very involved contributor, there is probably
 * no reason for you to run this script.
 */

// Holds the sets to create
const sets = []

// Helper method to create the set data
const createSetData = ({ name, measies, imperial }) => ({
  imperial,
  name,
  measies,
  userId: config.curator.id,
  public: true,
})

// CIS Female Adult
sets.push(
  ...Object.keys(cisFemaleAdult).map((size) =>
    createSetData({
      name: `Metric Cis Female Adult - Size ${size} (EU)`,
      measies: cisFemaleAdult[size],
      imperial: false,
    })
  )
)
sets.push(
  ...Object.keys(cisFemaleAdult).map((size) =>
    createSetData({
      name: `Imperial Cis Female Adult - Size ${size} (EU)`,
      measies: cisFemaleAdult[size],
      imperial: true,
    })
  )
)

// CIS Male Adult
sets.push(
  ...Object.keys(cisMaleAdult).map((size) =>
    createSetData({
      name: `Metric Cis Male Adult - Size ${size} (EU)`,
      measies: cisMaleAdult[size],
      imperial: false,
    })
  )
)
sets.push(
  ...Object.keys(cisMaleAdult).map((size) =>
    createSetData({
      name: `Imperial Cis Male Adult - Size ${size} (EU)`,
      measies: cisMaleAdult[size],
      imperial: true,
    })
  )
)

// CIS Female Doll
sets.push(
  ...Object.keys(cisFemaleDoll).map((size) =>
    createSetData({
      name: `Metric Cis Female Doll - ${size}%`,
      measies: cisFemaleDoll[size],
      imperial: false,
    })
  )
)
sets.push(
  ...Object.keys(cisFemaleDoll).map((size) =>
    createSetData({
      name: `Imperial Cis Female Doll - ${size}%`,
      measies: cisFemaleDoll[size],
      imperial: true,
    })
  )
)

// CIS Male Doll
sets.push(
  ...Object.keys(cisMaleDoll).map((size) =>
    createSetData({
      name: `Metric Cis Male Doll - ${size}%`,
      measies: cisMaleDoll[size],
      imperial: false,
    })
  )
)
sets.push(
  ...Object.keys(cisMaleDoll).map((size) =>
    createSetData({
      name: `Imperial Cis Male Doll - ${size}%`,
      measies: cisMaleDoll[size],
      imperial: true,
    })
  )
)

// CIS Female Giant
sets.push(
  ...Object.keys(cisFemaleGiant).map((size) =>
    createSetData({
      name: `Metric Cis Female Giant - Size ${size}%`,
      measies: cisFemaleGiant[size],
      imperial: false,
    })
  )
)
sets.push(
  ...Object.keys(cisFemaleGiant).map((size) =>
    createSetData({
      name: `Imperial Cis Female Giant - Size ${size}%`,
      measies: cisFemaleGiant[size],
      imperial: true,
    })
  )
)

// CIS Male Giant
sets.push(
  ...Object.keys(cisMaleGiant).map((size) =>
    createSetData({
      name: `Metric Cis Male Giant - Size ${size}%`,
      measies: cisMaleGiant[size],
      imperial: false,
    })
  )
)
sets.push(
  ...Object.keys(cisMaleGiant).map((size) =>
    createSetData({
      name: `Imperial Cis Male Giant - Size ${size}%`,
      measies: cisMaleGiant[size],
      imperial: true,
    })
  )
)

importSets(sets)

async function createSet(set) {
  try {
    record = await prisma.user.create({ data: set })
  } catch (err) {
    console.log(err)
  }
}

async function importSets(sets) {
  for (const set of sets) {
    console.log(`Importing ${set.name}`)
    await createSet(set)
  }
}
