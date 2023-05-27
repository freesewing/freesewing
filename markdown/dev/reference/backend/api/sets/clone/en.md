---
title: Clone a Measurements Set
---

Create a new measurements set by cloning an existing one.

## Access control

The [Permission level](/reference/backend/api/rbac) required to clone a
measurements set depends on:

- Whether the measurements set is `public`
- Who created the Pattern

The details are outlined in the table below:

|                  | Public Patterns | Non-Public Patterns |
| ---------------: | :-------------: | :-----------------: |
| **Your own**     | `0` or higher   | `3` or higher       |
| **Other user's** | `0` or higher   | `5` or higher       |

## Endpoints

Creating a new measurements set is possible via these endpoints:

| Method    | Path | Authentication |
| --------: | :--- | :------------- |
| <Method post /> | `/sets/:id/clone/jwt` | [JSON Web Token](/reference/backend/api/authentication#jwt-authentication) |
| <Method post /> | `/sets/:id/clone/key` | [API Key & Secret](/reference/backend/api/authentication#key-authentication) |

## Request URL

The URL should contain the ID of the measurements set you wish to remove.
It replaces the `:id` placeholder in the [endpoints listed above](#endpoints).

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
| `set.id`         | Number | The ID of the measurements set |
| `set.createdAt`  | String | Date string indicating the moment the measurements set was created |
| `set.img`        | String | The URL to the image stored with this measurements set |
| `set.name`       | String | The name of the measurements set |
| `set.notes`      | String | The notes stored with the measurements set |
| `set.userId`     | Number | The ID of the user who created the measurements set |
| `set.measies`    | Object | The measurements of the measurements set |
| `set.public`     | Boolean| Indicates whether the measurements set is publicly accessible or not |
| `set.updatedAt`  | String | Date string indicating the last time the measurements set was updated |

## Example request

```js
const clone = axios.post(
  'https://backend.freesewing.org/sets/27/clone/jwt',
  null,
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
  "set": {
    "id": 32,
    "createdAt": "2022-11-19T17:36:41.342Z",
    "img": "https://cdn.sanity.io/images/hl5bw8cj/production/a1565c8c6c70cfe7ea0fdf5c65501cd885adbe78-200x187.png",
    "imperial": false,
    "name": "Someone",
    "notes": "These are some notes",
    "userId": 12,
    "measies": {
      "chest": 930,
      "neck": 360
    },
    "public": true,
    "updatedAt": "2022-11-19T17:36:41.342Z"
  }
}
```
