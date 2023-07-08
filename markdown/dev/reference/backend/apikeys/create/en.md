---
title: Create an API key
---

Creates a new API key. An API key can be used to authenticate against the
backend API.

## Access control

- [Permission level](/reference/backend/api/rbac) `4` or higher is required to create an API key

## Endpoints

Creating a new API key is possible via these endpoints:

| Method    | Path | Authentication |
| --------: | :--- | :------------- |
| <Method post /> | `/apikeys/jwt` | [JSON Web Token](/reference/backend/api/authentication#jwt-authentication) |
| <Method post /> | `/apikeys/key` | [API Key & Secret](/reference/backend/api/authentication#key-authentication) |

## Request body

| Property    | Type     | Description |
| ----------: | :------- | :---------- |
| `name`      | `string` | A name for the API key |
| `level`     | `number` | A privilege level from 0 to 8. |
| `expiresIn` | `number` | The number of seconds until the API key expires |

## Response status codes

Possible status codes for these endpoints are:

| Status code | Description |
| ----------: | :---------- |
| <StatusCode status="201"/> | success |
| <StatusCode status="400"/> | the request was malformed |
| <StatusCode status="401"/> | the request lacks authentication |
| <StatusCode status="403"/> | authentication failed |
| <StatusCode status="500"/> | server error |

<Note>
If the status code is not <StatusCode status="201" /> the `error` property
in the response body should indicate the nature of the problem.
</Note>

## Response body

<Warning>
##### Make sure to save the secret
The response body is the only time the API key's secret will be revealed.
</Warning>

| Value               | Type     | Description |
| ------------------- | -------- | ----------- |
| `result`            | `string` | Either `success` or `error` |
| `error`             | `string` | Will give info on the nature of the error. Only set if an error occurred. |
| `apikey.key`        | `string` | The API key |
| `apikey.secret`     | `string` | The API secret |
| `apikey.level`      | `number` | The privilege level of the API key |
| `apikey.expiresAt`  | `string` | A string representation of the moment the API key expires |
| `apikey.name`       | `string` | The name of the API key |
| `apikey.userId`     | `number` | The ID of the user who created the API key |



## Example request

```js
const apiKey = axios.post(
  'https://backend.freesewing.org/apikeys/jwt',
  {
    name: 'My first API key',
    level: 2, // Read only
    expiresIn: 3600, // One hour
  },
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
)
```

## Example response
```201.json
{
  "result": "success",
  "apikey": {
    "key": "7ea12968-7758-40b6-8c73-75cc99be762b",
    "secret": "503d7adbdb3ec18ab27adfcd895d8b47a8d6bc8307d548500fbf9c05a5a8820e",
    "level": 3,
    "expiresAt": "2022-11-06T15:57:30.190Z",
    "name": "My first API key",
    "userId": 61
  }
}
```
