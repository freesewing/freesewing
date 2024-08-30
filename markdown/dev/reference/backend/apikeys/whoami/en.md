---
title: Read the current API key
---

Reads the current API key used to authenticate the request.
For obvious reasons, this endpoint is only available with API key authentication.
There is no equivalent endpoint for JWT authentication.

## Access control

- [Permission level](/reference/backend/rbac) `0` or higher is required to read the current API key

## Endpoints

| Method    | Path | Authentication |
| --------: | :--- | :------------- |
| <Method get /> | `/whoami/key` | [API Key & Secret](/reference/backend/authentication#key-authentication) |

## Response status codes

Possible status codes for these endpoints are:

| Status code | Description |
| ----------: | :---------- |
| <StatusCode status="200"/> | success |
| <StatusCode status="404"/> | API key not found |

## Response body

| Value               | Type     | Description |
| ------------------- | -------- | ----------- |
| `result`            | `string` | `success` on success, and `error` on error |
| `error`             | `string` | Will give info on the nature of the error. Only set if an error occurred. |
| `apikey.key`        | `string` | The API key |
| `apikey.level`      | `number` | The privilege level of the API key |
| `apikey.createdAt`  | `string` | A string representation of the moment the API key was created |
| `apikey.expiresAt`  | `string` | A string representation of the moment the API key expires |
| `apikey.name`       | `string` | The name of the API key |
| `apikey.userId`     | `number` | The ID of the user who created the API key |

## Example request

```js
const keyInfo = await axios.get(
  'https://backend.freesewing.org/whoami/key',
  {
    auth: {
      username: apikey.key,
      password: apikey.secret,
    }
  }
)
```

## Example response
```200.json
{
  "result": "success",
  "apikey": {
    "key": "7ea12968-7758-40b6-8c73-75cc99be762b",
    "level": 3,
    "createdAt": "2022-11-06T15:57:30.190Z",
    "expiresAt": "2022-11-06T15:57:30.190Z",
    "name": "My first API key",
    "userId": 61
  }
}
