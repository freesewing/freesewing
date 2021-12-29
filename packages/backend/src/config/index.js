// Load environment variables
import dotenv from 'dotenv'
dotenv.config()

// Construct config object
const config = {
  api: process.env.FS_BACKEND,
  website: process.env.FS_SITE,
  static: process.env.FS_STATIC,
  storage: process.env.FS_STORAGE,
  avatar: {
    sizes: {
      l: 1000,
      m: 500,
      s: 250,
      xs: 100
    }
  },
  db: {
    uri: process.env.FS_MONGO_URI || 'mongodb://localhost/freesewing',
  },
  hashing: {
    saltRounds: 10
  },
  encryption: {
    key: process.env.FS_ENC_KEY || '', // Prevent mongoose plugin from throwing an error
  },
  jwt: {
    secretOrKey: process.env.FS_ENC_KEY,
    issuer: process.env.FS_JWT_ISSUER,
    audience: process.env.FS_JWT_ISSUER,
    expiresIn: "36 days",

  },
  languages: ["en", "de", "es", "fr", "nl"],
  smtp: {
    host: process.env.FS_SMTP_HOST,
    user: process.env.FS_SMTP_USER,
    pass: process.env.FS_SMTP_PASS,

  },
  oauth: {
    github: {
      clientId: process.env.FS_GITHUB_CLIENT_ID,
      clientSecret: process.env.FS_GITHUB_CLIENT_SECRET,
      tokenUri: "https://github.com/login/oauth/access_token",
      dataUri: "https://api.github.com/user"
    },
    google: {
      clientId: process.env.FS_GOOGLE_CLIENT_ID,
      clientSecret: process.env.FS_GOOGLE_CLIENT_SECRET,
      tokenUri: "https://oauth2.googleapis.com/token",
      dataUri: "https://people.googleapis.com/v1/people/me?personFields=emailAddresses,names,photos"
    }
  }
}

export default config
