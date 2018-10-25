export default {
  db: {
    uri: process.env.FS_MONGO_URI || 'mongodb://localhost/freesewing',
  },
  encryption: {
    key: process.env.MONGO_ENC_KEY,
  },
  jwt: {
    secretOrKey: process.env.MONGO_ENC_KEY,
    issuer: process.env.JWT_ISSUER,
    audience: process.env.JWT_SITE,
    expiresIn: "36 days",

  },
  languages: ["en", "de", "es", "fr", "nl"],
}
