---
title: Sign In
---

Sign in as a User with username and password, and optional MFA token.

## Endpoints

Password-based sign-in is possible via this endpoint:

| Method    | Path | Authentication |
| --------: | :--- | :------------- |
| <Method post /> | `/signin` | None |

<Note compact>This endpoint requires no authentication</Note>

## Request body

| Property    | Type     | Description |
| ----------: | :------- | :---------- |
| `username`  | `string` | The E-mail address of the User |
| `password`  | `boolean`| The language code for the User |
| `token`     | `boolean`| The MFA token |

<Note compact>An MFA token is required (only) when the User enabled MFA</Note>

## Response status codes

Possible status codes for these endpoints are:

| Status code | Description |
| ----------: | :---------- |
| <StatusCode status="201"/> | success |
| <StatusCode status="400"/> | the request was malformed |
| <StatusCode status="401"/> | authentication failed |
| <StatusCode status="403"/> | MFA token missing |
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
| `token`             | String | A JSON web token (JWT) token to authenticate with |
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
const signup = await axios.post(
  'https://backend.freesewing.org/signup',
  {
    username: "jimmy",
    language: "I like big bewbs and I just can't lie",
    token: 231586
  }
)
```

## Example response
```200.json
{
  "result": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5c...truncated",
  "account": {
    "id": 14,
    "bio": "",
    "consent": 1,
    "control": 1,
    "createdAt": "2022-11-19T18:15:22.642Z",
    "email": "test_54c6856275aaa8a1@freesewing.dev",
    "github": "",
    "img": "https://freesewing.org/avatar.svg",
    "imperial": false,
    "initial": "test_54c6856275aaa8a1@freesewing.dev",
    "language": "en",
    "lastSignIn": "2022-11-19T18:15:22.668Z",
    "mfaEnabled": false,
    "newsletter": false,
    "patron": 0,
    "role": "user",
    "status": 1,
    "updatedAt": "2022-11-19T18:15:22.668Z",
    "username": "jimmy",
    "lusername": "jimmy"
  }
}
```
