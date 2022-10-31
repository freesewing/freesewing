import { createHash } from 'node:crypto'
import dotenv from 'dotenv'
dotenv.config()

/*
 * Cleans a string (typically email) for hashing
 */
export const clean = (string) => {
  if (typeof string !== 'string') throw 'clean() only takes a string as input'

  return string.toLowerCase().trim()
}

/*
 * I find JSON.stringify to long to type, and prone to errors
 * So I make an alias here: asJson
 */
export const asJson = JSON.stringify
