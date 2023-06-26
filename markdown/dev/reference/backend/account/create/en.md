---
title: Create an account
---

Creates a new User account. The User account will remain inactive
until [it is confirmed](/reference/backend/api/account/confirm).

## Endpoints

Creating a new User account is possible via this endpoint:

| Method    | Path | Authentication |
| --------: | :--- | :------------- |
| <Method post /> | `/signup` | None |

<Note compact>This endpoint requires no authentication</Note>

## Request body

| Property    | Type     | Description |
| ----------: | :------- | :---------- |
| `email`     | `string` | The E-mail address of the User |
| `language`  | `boolean`| The language code for the User |

## Response status codes

Possible status codes for these endpoints are:

| Status code | Description |
| ----------: | :---------- |
| <StatusCode status="201"/> | success |
| <StatusCode status="400"/> | the request was malformed |
| <StatusCode status="500"/> | server error |

<Note>
If the status code is not <StatusCode status="201" /> the `error` property
in the response body should indicate the nature of the problem.
</Note>

## Response body

| Value               | Type     | Description |
| ------------------- | -------- | ----------- |
| `result`            | String | Either `success` or `error` |
| `error`             | String | Will give info on the nature of the error. Only set if an error occurred. |
| `email`             | String | The E-mail address where the confirmation email was sent to |

## Example request

```js
const signup = await axios.post(
  'https://backend.freesewing.org/signup',
  {
    email: "joost@joost.at",
    language: "en"
  }
)
```

## Example response
```201.json
{
  "result": "success",
  "email": "joost@joost.at"
}
```
