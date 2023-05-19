import { PrismaClient } from '@prisma/client'
import { encryption } from '../src/utils/crypto.mjs'
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

/*
 * Note: This will import the FreeSewing (v2) sizing table into the
 * FreeSewing curator account.
 *
 * Unless you are a very involved contributor, there is probably
 * no reason for you to run this script.
 */

// Holds the sets to create
const sets = []

// Helper method to create the set data (does nothing for now)
const createSetData = (data) => ({
  ...data,
  measies: JSON.stringify(data.measies),
  tagsEn: JSON.stringify(data.tagsEn),
  tagsDe: JSON.stringify(data.tagsDe),
  tagsEs: JSON.stringify(data.tagsEs),
  tagsNl: JSON.stringify(data.tagsNl),
  tagsFr: JSON.stringify(data.tagsFr),
})

// CIS Female Adult
sets.push(
  ...Object.keys(cisFemaleAdult).map((size) =>
    createSetData({
      nameEn: `Cis-Female Adult - Size ${size} (EU)`,
      nameDe: `Cis-Weiblich Erwachsener - Größe ${size} (EU)`,
      nameEs: `Cis-Mujer Adulta - Talla ${size} (UE)`,
      nameFr: `Cis-Femme Adulte - Taille ${size} (UE)`,
      nameNl: `Cis-Dame Volwassene - Maat ${size} (EU)`,
      tagsEn: ['cis-female', 'adults', 'eu'],
      tagsDe: ['cis-weiblich', 'erwachsene', 'eu'],
      tagsEs: ['cis-mujer', 'adulta', 'ue'],
      tagsFr: ['cis-femme', 'adulte', 'ue'],
      tagsNl: ['cis-dame', 'volwassenen', 'eu'],
      measies: cisFemaleAdult[size],
    })
  )
)

// CIS Male Adult
sets.push(
  ...Object.keys(cisMaleAdult).map((size) =>
    createSetData({
      nameEn: `Cis-Male Adult - Size ${size} (EU)`,
      nameDe: `Cis-Männlich Erwachsener - Größe ${size} (EU)`,
      nameEs: `Cis-Hombre Adulto - Talla ${size} (UE)`,
      nameFr: `Cis-Homme Adulte - Taille ${size} (UE)`,
      nameNl: `Cis-Heer Volwassene - Maat ${size} (EU)`,
      tagsEn: ['cis-male', 'adults', 'eu'],
      tagsDe: ['cis-männlich', 'erwachsene', 'eu'],
      tagsEs: ['cis-hombre', 'adulto', 'ue'],
      tagsFr: ['cis-homme', 'adulte', 'ue'],
      tagsNl: ['cis-heer', 'volwassenen', 'eu'],
      measies: cisMaleAdult[size],
    })
  )
)

// CIS Female Doll
sets.push(
  ...Object.keys(cisFemaleDoll).map((size) =>
    createSetData({
      nameEn: `Cis-Female Doll - ${size}%`,
      nameDe: `Cis-Weiblich Puppe - ${size}%`,
      nameEs: `Cis-Mujer Muñeca - ${size}%`,
      nameFr: `Cis-Femme Poupée - ${size}%`,
      nameNl: `Cis-Dame Pop - ${size}%`,
      tagsEn: ['cis-female', 'dolls'],
      tagsDe: ['cis-weiblich', 'puppen'],
      tagsEs: ['cis-mujer', 'muñecas'],
      tagsFr: ['cis-femme', 'poupées'],
      tagsNl: ['cis-dame', 'poppen'],
      measies: cisFemaleDoll[size],
    })
  )
)

// CIS Male Doll
sets.push(
  ...Object.keys(cisMaleDoll).map((size) =>
    createSetData({
      nameEn: `Cis-Male Doll - ${size}%`,
      nameDe: `Cis-Männlich Puppe - ${size}%`,
      nameEs: `Cis-Hombre Muñeca - ${size}%`,
      nameFr: `Cis-Homme Poupée - ${size}%`,
      nameNl: `Cis-Heer Pop - ${size}%`,
      tagsEn: ['cis-male', 'dolls'],
      tagsDe: ['cis-männlich', 'puppen'],
      tagsEs: ['cis-hombre', 'muñecas'],
      tagsFr: ['cis-homme', 'poupées'],
      tagsNl: ['cis-heer', 'poppen'],
      measies: cisMaleDoll[size],
    })
  )
)

// CIS Female Giant
sets.push(
  ...Object.keys(cisFemaleGiant).map((size) =>
    createSetData({
      nameEn: `Cis-Female Giant - ${size}%`,
      nameDe: `Cis-Weiblich Riesin - ${size}%`,
      nameEs: `Cis-Mujer Gigante - ${size}%`,
      nameFr: `Cis-Femme Géante - ${size}%`,
      nameNl: `Cis-Dame Reuzin - ${size}%`,
      tagsEn: ['cis-female', 'giants'],
      tagsDe: ['cis-weiblich', 'riesen'],
      tagsEs: ['cis-mujer', 'gigantes'],
      tagsFr: ['cis-femme', 'géants'],
      tagsNl: ['cis-dame', 'reuzen'],
      measies: cisFemaleGiant[size],
    })
  )
)

// CIS Male Giant
sets.push(
  ...Object.keys(cisFemaleGiant).map((size) =>
    createSetData({
      nameEn: `Cis-Male Giant - ${size}%`,
      nameDe: `Cis-Männlich Riese - ${size}%`,
      nameEs: `Cis-Hombre Gigante - ${size}%`,
      nameFr: `Cis-Homme Géant - ${size}%`,
      nameNl: `Cis-Heer Reus - ${size}%`,
      tagsEn: ['cis-male', 'giants'],
      tagsDe: ['cis-männlich', 'riesen'],
      tagsEs: ['cis-hombre', 'gigantes'],
      tagsFr: ['cis-homme', 'géants'],
      tagsNl: ['cis-heer', 'reuzen'],
      measies: cisMaleGiant[size],
    })
  )
)

importSets(sets)

async function createSet(data) {
  try {
    await prisma.curatedSet.create({ data })
  } catch (err) {
    console.log(err)
  }
}

async function importSets(sets) {
  for (const set of sets) {
    console.log(`Importing ${set.nameEn}`)
    await createSet(set)
  }
}
