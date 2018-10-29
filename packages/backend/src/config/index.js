export default {
  website: process.env.FS_SITE,
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

  }
}
