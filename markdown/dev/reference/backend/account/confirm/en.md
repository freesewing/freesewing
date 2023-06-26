---
title: Confirm an account
---

Confirms a newly created User account.
If confirmation is successful this will also result in a (passwordless) sign-in.

## Endpoints

Confirming a new User account is possible via this endpoint:

| Method    | Path | Authentication |
| --------: | :--- | :------------- |
| <Method post /> | `/confirm/signup/:id` | None |

<Note compact>This endpoint requires no authentication</Note>

## Request URL

The URL should contain the confirmation ID that was E-mailed to the E-mail
address used for the signup. It replaces the `:id` placeholder in the
[endpoint listed above](#endpoints).

## Request body

| Property    | Type     | Description |
| ----------: | :------- | :---------- |
| `consent`   | Number   | An integer representing the consent given by the user to process their data |

## Response status codes

Possible status codes for these endpoints are:

| Status code | Description |
| ----------: | :---------- |
| <StatusCode status="200"/> | success |
| <StatusCode status="400"/> | the request was malformed |
| <StatusCode status="404"/> | the confirmation was not found |
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
const confirm = await axios.post(
  'https://backend.freesewing.org/confirm/signup/3985f312-e407-458a-a78c-4596c361d284',
  { consent: 2 },
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
    "username": "user-14",
    "lusername": "user-14"
  }
}
```

[duri]: https://en.wikipedia.org/wiki/Data_URI_scheme
