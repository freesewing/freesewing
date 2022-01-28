![FreeSewing: A JavaScript library for made-to-measure sewing patterns](https://en.freesewing.org/banner.jpg)

# FreeSewing / backend

This is the backend for [FreeSewing.org](https://freesewing.org/), our maker site.

Our backend is a REST API built with [Express](https://expressjs.com/), 
using [MongoDB](https://www.mongodb.com/) as our database.

This API is required if you want to use your own instance 
of [freesewing.org](https://github.com/freesewing/backend), 
in which case you have two ways to do so:

## Run with docker

### Using docker-compose

You can use [docker-compose](https://docs.docker.com/compose/) to spin up both the backend
API and a mongo instance. Clone this repository, create a `.env` file (See [Configuration](#configuration)), and then run:

```
docker-compose up
```

Your backend will now be available at http://localhost:3000

### Using our docker image and your own database

If you just want the backend and provide your own mongo instance, 
you can run [our docker image](https://hub.docker.com/r/freesewing/backend) directly
from the internet:

```
docker run --env-file .env --name fs_backend -d -p 3000:3000 freesewing/backend
```

Your backend will now be available at http://localhost:3000
  
## Run from source

To run the backend from source, you'll need to clone this repository 
and intall dependencies. 

```
git clone git@github.com:freesewing/backend
cd backend
npm install
npm install --global backpack-core
```

> Note that we're installing [backpack-core](https://www.npmjs.com/package/backpack-core) globally for ease-of-use

While developing, you can run:

```
npm run develop
```

And backpack will compile the backend, and spin it up.
It will also watch for changes and re-compile every time. Handy!

If you want to run this in production, you should build the code:

```
npm run build
```

Then use something like [PM2](http://pm2.keymetrics.io/) to run it and keep it running.

## Configuration

This backend can be configured with environment variables. They are detailed below.

> **Note:**
>
> If you're using docker (or docker-compose) you can use an environment file (See [example.env](example.env)).
>
> If you're running from source, you need to set these manually, or via a script.


| Variable    | Example | Description |
|---------------|-------------|-----------------|
| `FS_BACKEND` | `http://localhost:3000` | URL on which the backend is hosted |
| `FS_SITE` | `http://localhost:8000` | URL on which the frontend is hosted |
| `FS_MONGO_URI` | `mongodb://mongo/freesewing` | URL for the Mongo database |
| `FS_ENC_KEY` | `someLongAndComplexString` | Secret used for encryption of data at rest |
| `FS_JWT_ISSUER` | `freesewing.org` | The JSON Web Token issuer |
| `FS_SMTP_HOST` | `smtp.google.com` | SMTP relay through which to send outgoing emails |
| `FS_SMTP_USER` | `your.username@gmail.com` | SMTP relay username|
| `FS_SMTP_PASS` | `yourPasswordHere` | SMTP relay password|
| `FS_GITHUB_CLIENT_ID` | `clientIdForOathViaGithub` | Github client ID for signup/login via GitHub |
| `FS_GITHUB_CLIENT_SECRET` | `clientSecretForOathViaGithub` | Github client ID for signup/login via GitHub |
| `FS_GOOGLE_CLIENT_ID` | `clientIdForOathViaGoogle` | Google client ID for signup/login via Google |
| `FS_GOOGLE_CLIENT_SECRET` | `clientSecretForOathViaGoogle` | Google client ID for signup/login via Google |


## Links


 - 💻 Maker site: [freesewing.org](https://freesewing.org)
 - 👩‍💻 Developer site: [freesewing.dev](https://freesewing.dev)
 - 💬 Chat/Support: [Gitter](https://gitter.im/freesewing/freesewing)
 - 🐦 Twitter: [@freesewing_org](https://twitter.com/freesewing_org)
 - 📷 Instagram: [@freesewing_org](https://instagram.com/freesewing_org)

## License

Copyright (c) 2019 Joost De Cock - Available under the MIT license.

See the LICENSE file for more details.
