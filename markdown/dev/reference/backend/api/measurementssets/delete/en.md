---
title: Delete a Measurements Set
---

Deletes an existing measurements set.

## Access control

- [Permission level](/reference/backend/api/rbac) `3` or higher is required to delete a measurements set
- [Permission level](/reference/backend/api/rbac) `8` is required to delete **another user's** measurements set

## Endpoints

Deleting a measurements set is possible via these endpoints:

| Method    | Path | Authentication |
| --------: | :--- | :------------- |
| <Method delete /> | `/people/:id/jwt` | [JSON Web Token](/reference/backend/api/authentication#jwt-authentication) |
| <Method delete /> | `/people/:id/key` | [API Key & Secret](/reference/backend/api/authentication#key-authentication) |

## Request URL

The URL should contain the ID of the measurements set you wish to remove.
It replaces the `:id` placeholder in the [endpoints listed above](#endpoints).

## Response status codes

Possible status codes for these endpoints are:

| Status code | Description |
| ----------: | :---------- |
| <StatusCode status="204"/> | success |
| <StatusCode status="400"/> | the request was malformed |
| <StatusCode status="401"/> | the request lacks authentication |
| <StatusCode status="403"/> | authentication failed |
| <StatusCode status="500"/> | server error |

## Example request

```js
await axios.delete(
  'https://backend.freesewing.org/people/27/jwt',
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
)
```

## Example response

```204.json
```
<Note>
These endpoints return status code <StatusCode status="204"/> (no content) on
success, with no response body.
</Note>
