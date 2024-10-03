---
title: List API keys
---

Lists existing API keys.

## Access control

- [Permission level](/reference/backend/rbac) `0` or higher is required to list API keys

## Endpoints

Listing API keys is possible via these endpoints:

| Method    | Path | Authentication |
| --------: | :--- | :------------- |
| <Method get /> | `/apikeys/jwt` | [JSON Web Token](/reference/backend/authentication#jwt-authentication) |
| <Method get /> | `/apikeys/key` | [API Key & Secret](/reference/backend/authentication#key-authentication) |

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
| `apikeys`           | `Array`` | Array of API key strings |

## Example request

```js
const keyInfo = await axios.get(
  'https://backend.freesewing.org/apikeys/jwt',
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
  "apikeys": {
    [
      "7ea12968-7758-40b6-8c73-75cc99be762b",
      "7ea12968-7758-40b6-8c73-39bc3b6707a9",
      "7ea12968-7758-40b6-8c73-97bb9901010d",
    ],
  }
}
```
