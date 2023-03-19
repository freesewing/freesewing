---
title: Database schema
---

The database schema for the backend is available in the [prisma.schema][prisma]
file in our monorepo. For your convenience, we're replicated the info below.

<Note>
In the tables below, the following symbols are used:

- 🔑 : Field holds the primary key
- 🗝️ : Field holds a foreign key
- ❄️  : Field must be unique
- ⚡ : Field is indexed
- 🔐 : Field is encrypted
- 🧂 : Field is salted & hashed

</Note>

## Table Apikey

|    | Field       | Type     | Default |
| -: | :---------- | :------- | :------ |
|    | `createdAt` | DateTime | `now()` |
|    | `expiresAt` | DateTime | |
| 🔑 | `id`        | String (UUID) | `uuid()` |
|    | `level`     | Int      | `0` |
|    | `name`      | String   | |
| 🧂 | `secret`    | String(ified JSON)   | |
| 🗝️ | `userId`    | Int | |

```json
{
  "createdAt": 1668448465659,
  "expiresAt": 1668448525632,
  "id": "5122738c-2e44-4165-a9db-2f0b6ba4fbaf",
  "level": 4,
  "name": "Test API key",
  "secret": "{\"type\":\"v3\",\"hash\":\"a88747549512991836332813ccc82abba652bf5835dfa0a5a8177e2ddacf1f2d0f6340a6c36c0e816cf7a9976847bb14010c658703d4fa1bc4a0f3bdf3f187c2\",\"salt\":\"9eba4d132010a534a54d76fa9a6083eb\"}",
  "userId": 10
}
```

## Table Confirmation

|    | Field       | Type     | Default |
| -: | :---------- | :------- | :------ |
|    | `createdAt` | DateTime | `now()` |
| 🔐 | `data` | String(ified JSON) | |
| 🔑 | `id`        | String (UUID) | `uuid()` |
|    | `type`      | String | |
| 🗝️ | `userId`    | Int | |

```json
{
  "createdAt": 1668447926731,
  "data": "{\"iv\":\"01a57e75817327cc99b08c5fabdf4c89\",\"ct\":\"03b89a100a67dd85898a313fd832c720700f4b3a800aa715a6bbbe66a4f2ab01f02215e995b0983b609ef8606912546fb27b63ea5436c5bbacd73cb9363024e8339d5f25899c3a7172b66991aed3e9a6c8dda850bea0d40c84f630f0f9f76b80052810639ee6f62a97ac9e45cab3c05abd768ff6ca22b8b4255993dc76023c948f80ee208e6455c28097402f63fe26afeab8d082e12bef760320ce3a5d2ea123\"}",
  "id": "2319e09e-ffe0-4781-9add-46d73a57bb34",
  "type": "signup",
  "userId": 9
}
```

## Table Subscriber

|    | Field       | Type     | Default |
| -: | :---------- | :------- | :------ |
|    | `createdAt` | DateTime | `now()` |
| 🔐 | `data`      | String(ified JSON) | |
| ❄️  | `ehash`     | String | |
| 🔐 | `email`     | String(ified JSON) | |
| 🔑 | `id`        | String (UUID) | `uuid()` |
|    | `updatedAt` | DateTime | |

<Fixme>Include example</Fixme>

## Table User

|    | Field       | Type     | Default |
| -: | :---------- | :------- | :------ |
| 🔐 | `bio`       | String(ified JSON) | |
|    | `consent`   | Int | |
|    | `control`   | Int | |
|    | `createdAt` | DateTime | `now()` |
| ❄️  | `ehash`     | String | |
| 🔐 | `email`     | String(ified JSON) | |
| 🔐 | `github`    | String(ified JSON) | |
| 🔑 | `id`        | Int | |
| ⚡ | `ihash`     | String | |
| 🔐 | `img`       | String(ified JSON) | |
|    | `imperial`  | Boolean | `false` |
| 🔐 | `initial`   | String(ified JSON) | |
|    | `language`  | String | `en` |
|    | `lastSignIn`| DateTime | |
| ❄️  | `lusername` | String | |
|    | `newsletter`| Boolean | `false` |
| 🧂 | `password`  | String(ified JSON) | |
|    | `patron`    | Int | `0` |
|    | `role`      | String | `user` |
|    | `status`    | Int | `0` |
|    | `updatedAt` | DateTime | |
|    | `username`  | String | |

```json
{
  "bio": "{\"iv\":\"92bc05493831ccd92c522a7c1395058d\",\"ct\":\"5a520bf84a1e194c87e294f1e28c6100\"}",
  "consent": 1,
  "control": 1,
  "createdAt": 1668447881259,
  "ehash": "57c20ec1135355d378145a994bc26ce1f1720e382474116cafbd5f4c3fb676c3",
  "email": "{\"iv\":\"b48d8e4769e359cec69f53629c5ad4ce\",\"ct\":\"57211cdeb0c1d5641aae953b10058e8ad94604df8183a3f5c99517620858674696e1e988ccf8e527f132095c2f303a12\"}",
  "github": "{\"iv\":\"42ab19245da9a4d35d5b5ea66c5897a9\",\"ct\":\"7b3b39bf1811e46e887d81222e99251d\"}",
  "id": 7,
  "ihash": "57c20ec1135355d378145a994bc26ce1f1720e382474116cafbd5f4c3fb676c3",
  "img": "{\"iv\":\"2757b3674a4adb71a535d5d37e923469\",\"ct\":\"e80750ff6bfa7f8c1694558a73673c8714948d67425c5cf01848be8decd612ef8d3129b34c4140f665a5ad7919f32616\"}",
  "imperial": 0,
  "initial": "{\"iv\":\"b48d8e4769e359cec69f53629c5ad4ce\",\"ct\":\"57211cdeb0c1d5641aae953b10058e8ad94604df8183a3f5c99517620858674696e1e988ccf8e527f132095c2f303a12\"}",
  "language": "en",
  "lastSignIn": 1668447881273,
  "lusername": "user-7",
  "newsletter": 0,
  "password": "{\"type\":\"v3\",\"hash\":\"bc5b64b1932a5d4a053777011a61a244e07edfe78eaa52beb56d08bf0ec3f8d8946e8749c872db5a03d5720e53b8da1d6df3ee12d96443d107c01dd2392e2848\",\"salt\":\"648d1218a93ded40ad42cc5bed603bcf\"}",
  "patron": 0,
  "role": "user",
  "status": 1,
  "updatedAt": 1668447881274,
  "username": "user-7"
}
```

## Table Pattern

|    | Field       | Type     | Default |
| -: | :---------- | :------- | :------ |
| 🔑 | `id`        | Int | |
|    | `createdAt` | DateTime | `now()` |
| 🔐 | `data`     | String(ified JSON) | |
|    | `design`      | String | |
| 🔐 | `img`     | String(ified JSON) | |
| 🔐 | `name`     | String(ified JSON) | |
| 🔐 | `notes`     | String(ified JSON) | |
| 🗝️ | `personId`    | Int | |
|    | `public` | Boolean | `false` |
| 🔐 | `settings`     | String(ified JSON) | |
| 🗝️ | `userId`    | Int | |
|    | `updatedAt` | DateTime | |

<Fixme>Include example</Fixme>

## Table Person

|    | Field       | Type     | Default |
| -: | :---------- | :------- | :------ |
| 🔑 | `id`        | Int | |
|    | `createdAt` | DateTime | `now()` |
| 🔐 | `img`     | String(ified JSON) | |
|    | `imperial` | Boolean | `false` |
| 🔐 | `measies`     | String(ified JSON) | |
| 🔐 | `name`     | String(ified JSON) | |
| 🔐 | `notes`     | String(ified JSON) | |
| 🗝️ | `userId`    | Int | |
|    | `public` | Boolean | `false` |
|    | `updatedAt` | DateTime | |

<Fixme>Include example</Fixme>

[prisma]: https://github.com/freesewing/freesewing/blob/develop/sites/backend/prisma/schema.prisma
