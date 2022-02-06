// Load environment variables
import dotenv from 'dotenv'
dotenv.config()

// Construct config object
const config = {
  api: process.env.FS_BACKEND,
  website: {
    domain: 'freesewing.org',
    scheme: 'https',
  },
  static: process.env.FS_STATIC,
  storage: process.env.FS_STORAGE,
  avatar: {
    sizes: {
      l: 1000,
      m: 500,
      s: 250,
      xs: 100,
    },
  },
  db: {
    uri: process.env.FS_MONGO_URI || 'mongodb://localhost/freesewing',
  },
  hashing: {
    saltRounds: 10,
  },
  encryption: {
    key: process.env.FS_ENC_KEY || '', // Prevent mongoose plugin from throwing an error
  },
  jwt: {
    secretOrKey: process.env.FS_ENC_KEY,
    issuer: process.env.FS_JWT_ISSUER,
    audience: process.env.FS_JWT_ISSUER,
    expiresIn: '36 days',
  },
  languages: ['en', 'de', 'es', 'fr', 'nl'],
  smtp: {
    host: process.env.FS_SMTP_HOST,
    user: process.env.FS_SMTP_USER,
    pass: process.env.FS_SMTP_PASS,
  },
  oauth: {
    github: {
      clientId: process.env.FS_GITHUB_CLIENT_ID,
      clientSecret: process.env.FS_GITHUB_CLIENT_SECRET,
      tokenUri: 'https://github.com/login/oauth/access_token',
      dataUri: 'https://api.github.com/user',
      emailUri: 'https://api.github.com/user/emails',
    },
    google: {
      clientId: process.env.FS_GOOGLE_CLIENT_ID,
      clientSecret: process.env.FS_GOOGLE_CLIENT_SECRET,
      tokenUri: 'https://oauth2.googleapis.com/token',
      dataUri:
        'https://people.googleapis.com/v1/people/me?personFields=emailAddresses,names,photos',
    },
  },
  github: {
    token: process.env.FS_GITHUB_TOKEN,
    api: 'https://api.github.com',
    bot: {
      user: 'freesewing-robot',
      name: 'Freesewing bot',
      email: 'bot@freesewing.org',
    },
    notify: {
      specific: {
        albert: ['woutervdub'],
        bee: ['bobgeorgethe3rd'],
        benjamin: ['woutervdub'],
        cornelius: ['woutervdub'],
        diana: ['alfalyr'],
        holmes: ['alfalyr'],
        hortensia: ['woutervdub'],
        lunetius: ['starfetch'],
        penelope: ['woutervdub'],
        tiberius: ['starfetch'],
        sandy: ['alfalyr'],
        ursula: ['nataliasayang'],
        yuri: ['biou', 'hellgy'],
        walburga: ['starfetch'],
        waralee: ['woutervdub'],
      },
      dflt: ['joostdecock'],
    },
  },
  strapi: {
    protocol: process.env.FS_STRAPI_PROTOCOL,
    host: process.env.FS_STRAPI_HOST,
    port: process.env.FS_STRAPI_PORT,
    username: process.env.FS_STRAPI_USERNAME,
    password: process.env.FS_STRAPI_PASSWORD,
    tmp: process.env.FS_STRAPI_TMP,
  },
  og: {
    template: ['..', '..', 'artwork', 'og', 'template.svg'],
    chars: {
      title_1: 18,
      title_2: 19,
      title_3: 20,
      intro: 34,
      sub: 42,
    },
  },
}

export default config
