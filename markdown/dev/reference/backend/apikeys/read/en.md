---
title: Read an API key
---

Reads an existing API key. Note that the API secret can only be retrieved at
the moment the API key is created.

## Access control

- [Permission level](/reference/backend/api/rbac) `4` or higher is required to read an API key

## Endpoints

Reading an API key is possible via these endpoints:

| Method    | Path | Authentication |
| --------: | :--- | :------------- |
| <Method get /> | `/apikeys/:id/jwt` | [JSON Web Token](/reference/backend/api/authentication#jwt-authentication) |
| <Method get /> | `/apikeys/:id/key` | [API Key & Secret](/reference/backend/api/authentication#key-authentication) |

## Request URL

The URL should contain the ID of the API key you wish to remove.
It replaces the `:id` placeholder in the [endpoints listed above](#endpoints).

## Response status codes

Possible status codes for these endpoints are:

| Status code | Description |
| ----------: | :---------- |
| <StatusCode status="200"/> | success |
| <StatusCode status="400"/> | the request was malformed |
| <StatusCode status="401"/> | the request lacks authentication |
| <StatusCode status="403"/> | authentication failed |
| <StatusCode status="404"/> | API key not found |
| <StatusCode status="500"/> | server error |

<Note>
If the status code is not <StatusCode status="200" /> the `error` property
in the response body should indicate the nature of the problem.
</Note>

## Response body

| Value               | Type     | Description |
| ------------------- | -------- | ----------- |
| `result`            | `string` | `success` on success, and `error` on error |
| `error`             | `string` | Will give info on the nature of the error. Only set if an error occurred. |
| `apikey.key`        | `string` | The API key |
| `apikey.level`      | `number` | The privilege level of the API key |
| `apikey.expiresAt`  | `string` | A string representation of the moment the API key expires |
| `apikey.name`       | `string` | The name of the API key |
| `apikey.userId`     | `number` | The ID of the user who created the API key |

## Example request

```js
const keyInfo = await axios.get(
  'https://backend.freesewing.org/apikeys/7ea12968-7758-40b6-8c73-75cc99be762b/jwt',
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
  "apikey": {
    "key": "7ea12968-7758-40b6-8c73-75cc99be762b",
    "level": 3,
    "expiresAt": "2022-11-06T15:57:30.190Z",
    "name": "My first API key",
    "userId": 61
  }
}
```
