export default {
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
    key: process.env.MONGO_ENC_KEY,
  },
  jwt: {
    secretOrKey: process.env.MONGO_ENC_KEY,
    issuer: process.env.JWT_ISSUER,
    audience: process.env.JWT_ISSUER,
    expiresIn: "36 days",

  },
  languages: ["en", "de", "es", "fr", "nl"],
  smtp: {
    host: process.env.SMTP_HOST,
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,

  },
  oauth: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      tokenUri: "https://github.com/login/oauth/access_token",
      dataUri: "https://api.github.com/user"
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      tokenUri: "https://oauth2.googleapis.com/token",
      dataUri: "https://people.googleapis.com/v1/people/me?personFields=emailAddresses,names,photos"
    }
  }
}
