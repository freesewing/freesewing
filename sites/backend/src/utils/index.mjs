import { createHash } from 'node:crypto'
import dotenv from 'dotenv'
dotenv.config()

// Cleans an email for hashing
export const clean = (email) => email.toLowerCase().trim()

// Hashes an email address
export const ehash = (email) => createHash('sha256').update(clean(email)).digest('hex')

// Get key from environment
const secret = createHash('sha256').update(process.env.API_ENC_KEY).digest()
