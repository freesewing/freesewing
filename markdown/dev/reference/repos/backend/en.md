---
title: backend
---

import RepoPage from "../../../../../src/components/repo-page";

<Note>

See also: [The backend API reference](/reference/backend)

</Note>

<RepoPage repo="backend" />

Our backend is a REST API built with [Express](https://expressjs.com/),
using [MongoDB](https://www.mongodb.com/) as our database.

This backend handles the storage and retrieval of user data. Including:

 - User profiles
 - Models
 - Recipes

This backend does not include any code related to our patterns. 
It is only required if you want to use your own instance
of [freesewing.org](https://github.com/freesewing/backend).

## Getting started

To start this backend, you'll need:

 - A MongoDB database
 - Configure environment variables (see [configuration](#configuration) below)

There's a few different ways you can get started:

### Using our docker image and your own database

If you just want the backend and provide your own mongo instance,
you can run [our docker image](https://hub.docker.com/r/freesewing/backend) directly
from the internet:

```
docker run --env-file .env --name fs_backend -d -p 3000:3000 freesewing/backend
```

Your backend will now be available at http://localhost:3000

### Using docker-compose

You can use [docker-compose](https://docs.docker.com/compose/) to spin up both the backend
API and a MongoDB instance. Clone the repository, and run `docker-compose up`:

```
git clone git@github.com:freesewing/backend.git
cd backend
docker-compose up
```

Your backend will now be available at http://localhost:3000

### Run from source

To run the backend from source, you'll need to clone this repository
and intall dependencies.

```
git clone git@github.com:freesewing/backend
cd backend
npm install
npm install --global backpack-core
```

<Note>

We are installing [backpack-core](https://www.npmjs.com/package/backpack-core) globally for ease-of-use

</Note>

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

This backend can be configured with environment variables. 
We provide an `example.env` file that you can edit and rename to `.env`. 
This way they will be picked up automatically.

The available variables are listed below, as we as in our [example.env](https://github.com/freesewing/backend/blob/develop/example.env) file.


| Variable                  | Description                                      |
| ------------------------- | ------------------------------------------------ |
| `FS_BACKEND`              | URL on which the backend is hosted               |
| `FS_STATIC`               | URL on which the static content is hosted        |
| `FS_STORAGE`              | Location on disk where to store files            |
| `FS_MONGO_URI`            | URL for the Mongo database                       |
| `FS_ENC_KEY`              | Secret used for encryption of data at rest       |
| `FS_SMTP_HOST`            | SMTP server through which to send outgoing emails |
| `FS_SMTP_PORT`            | Port to use to connect to the SMTP server        |
| `FS_SMTP_USER`            | SMTP relay username                              |
| `FS_SMTP_PASS`            | SMTP relay password                              |
| `FS_GITHUB_CLIENT_ID`     | Github client ID for Oauth signup/login via GitHub     |
| `FS_GITHUB_CLIENT_SECRET` | Github client ID for Oauth signup/login via GitHub     |
| `FS_GOOGLE_CLIENT_ID`     | Google client ID for Oauth signup/login via Google     |
| `FS_GOOGLE_CLIENT_SECRET` | Google client ID for Oauth signup/login via Google     |

## Authentication

This API uses [JWT](https://jwt.io/) for authentication. Authenticated calls to this API should include a `Authorization` header as such:

```
Authorization: Bearer <token>
```

The `token` is returned from the `/login`, `/oauth/login`, and `/confirm/login` endpoints.

## CLI

Our backend encrypts data at rest using the [mongoose-encryption](https://www.npmjs.com/package/mongoose-encryption) plugin.
That's a good thing, but can complicate life a bit when you'd like to go and in make some changes to the data without going
through the application code.
If you use some sort of administration tools for MongoDB and write data to the DB, that data won't be encrypted.
And thus reading that data back will fail (since we expect encrypted data).

Because of this, this backend comes with a couple of command-line tools to do basic database tasks:

| Command | Description |
|---------|-------------|
|`npm run clear:users`| Remove all users |
|`npm run clear:models`| Remove all models |
|`npm run clear:recipes`| Remove all recipes |
|`npm run clear:confirmations`| Remove all confirmations |
|`npm run clear:all`| Empty the entire database |
|`npm run clear:reboot`| Empty database, then load sample data |

> **Tip**: You can use `npm run cli` to see the available options

## Tests

There's two ways to run tests:

 - `npm run test` will run tests that don't depend on emails
 
![npm run test](https://github.com/freesewing/backend/blob/develop/test.svg)
 
 - `npm run testall` will runn all tests, including the ones that depend on email

![npm run testall](https://github.com/freesewing/backend/blob/develop/testall.svg)

To run the email tests, spin up a mailhog container with Docker:

```
sudo docker run -p 8025:8025 -p 1025:1025 mailhog/mailhog
```

Then, configure your backend as such:

`FS_SMTP_HOST` : `localhost` (this makes sure emails go to mailhog)
`FS_SMTP_PORT` : `1025` (the mailhog port)

This allows complete end-to-end testing of signup flow and other things the depend on email sent to the user.


## Links

- 💻 Maker site: [freesewing.org](https://freesewing.org)
- 👩‍💻 Developer site: [freesewing.dev](https://freesewing.dev)
- 💬 Chat/Support: [discord.freesewing.org](https://discord.freesewing.org)
- 🐦 Twitter: [@freesewing_org](https://twitter.com/freesewing_org)
- 📷 Instagram: [@freesewing_org](https://instagram.com/freesewing_org)

## License

Copyright (c) 2019 Joost De Cock - Available under the MIT license.

See the LICENSE file for more details.
