---
title: Update account
---

Updates an existing User account.

## Access control

- [Permission level](/reference/backend/api/rbac) `4` or higher is required to update your own User account
- [Permission level](/reference/backend/api/rbac) `8` is required to update **another user's** account

## Endpoints

Updating an existing User account is possible via these endpoints:

| Method    | Path | Authentication |
| --------: | :--- | :------------- |
| <Method put /> | `/account/jwt` | [JSON Web Token](/reference/backend/api/authentication#jwt-authentication) |
| <Method put /> | `/account/key` | [API Key & Secret](/reference/backend/api/authentication#key-authentication) |

## Request body

| Property    | Type     | Description |
| ----------: | :------- | :---------- |
| `bio`       | `string` | The User's bio |
| `consent`   | `string` | A number that indicates [the consent given by the user](/reference/backend/api/account#the-consent-field-is-about-data-protection) |
| `control`   | `string` | A number that indicates [the level of control the user prefers](/reference/backend/api/account#the-control-field-is-about-keeping-it-simple) |
| `github`    | `string` | The User's username on GitHub |
| `imperial`  | `boolean`| Whether or not the User prefers imperial units |
| `newsletter`| `boolean`| Whether this Person prefers imperial measurements (`true`) or not (`false`) |
| `img`       | `string` | An image [data-uri][duri] to store with this Person |
| `password`  | `string` | The (new) password for the User |
| `username`  | `string` | The (new) username for the User |

## Response status codes

Possible status codes for these endpoints are:

| Status code | Description |
| ----------: | :---------- |
| <StatusCode status="200"/> | success |
| <StatusCode status="400"/> | the request was malformed |
| <StatusCode status="401"/> | the request lacks authentication |
| <StatusCode status="403"/> | authentication failed |
| <StatusCode status="500"/> | server error |

<Note>
If the status code is not <StatusCode status="200" /> the `error` property
in the response body should indicate the nature of the problem.
</Note>

## Response body

| Value               | Type     | Description |
| ------------------- | -------- | ----------- |
| `result`            | String | Either `success` or `error` |
| `error`             | String | Will give info on the nature of the error. Only set if an error occurred. |
| `account.id`        | Number | The ID of the User |
| `account.bio`       | String | The bio of the User |
| `account.consent`   | Number | The consent given by the User |
| `account.control`   | Number | The control desired by the User |
| `account.createdAt` | String | Date string indicating the moment the User was created |
| `account.email`     | String | The E-mail address currently tied to the User |
| `account.github`    | String | The GitHub username of the User |
| `account.img`       | String | The URL to the image stored with this User |
| `account.imperial`  | Boolean| Whether or not the User prefers imperial units |
| `account.initial`   | String | The E-mail address that the User was created with |
| `account.language`  | String | The language preferred by the user |
| `account.lastSignIn`| String | Date string indicating them moment the User last signed in |
| `account.mfaEnabled`| Boolean| Whether or not the User has MFA enabled |
| `account.newsletter`| Boolean| Whether or not the User is subscribed to the FreeSewing newsletter |
| `account.patron`    | Number | The level of patronage the user provides to FreeSewing |
| `account.role`      | String | The role of the User |
| `account.status`    | Number | The status of the user |
| `account.updatedAt` | String | Date string indicating the last time the User was updated |
| `account.username`  | String | The username of the User |
| `account.lusername` | String | A lowercased version of the username of the User |

## Example request

```js
const udpate = await axios.put(
  'https://backend.freesewing.org/account/jwt',
  {
    bio: "I like imperial now",
    imperial: true,
    username: "ImperialLover"
  },
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
)
```

## Example response
```200.json
{
  "result": "success",
  "account": {
    "id": 14,
    "bio": "I like imperial now",
    "consent": 1,
    "control": 1,
    "createdAt": "2022-11-19T18:15:22.642Z",
    "email": "test_54c6856275aaa8a1@freesewing.dev",
    "github": "",
    "img": "https://freesewing.org/avatar.svg",
    "imperial": true,
    "initial": "test_54c6856275aaa8a1@freesewing.dev",
    "language": "en",
    "lastSignIn": "2022-11-19T18:15:22.668Z",
    "mfaEnabled": false,
    "newsletter": false,
    "patron": 0,
    "role": "user",
    "status": 1,
    "updatedAt": "2022-11-19T18:15:22.668Z",
    "username": "ImperialLover",
    "lusername": "imperiallover"
  }
}
```

[duri]: https://en.wikipedia.org/wiki/Data_URI_scheme
