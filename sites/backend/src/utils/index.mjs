import { createHash } from 'node:crypto'
import dotenv from 'dotenv'
dotenv.config()

// Cleans an email for hashing
export const clean = (string) => string.toLowerCase().trim()

// Hashes a (cleaned) string
export const hash = (string) => createHash('sha256').update(clean(string)).digest('hex')

