---
title: Read a Pattern
---

Reads an existing Pattern.

## Access control

The [Permission level](/reference/backend/api/rbac) required to read a
Pattern depends on:

- Whether the Pattern is  `public`
- Who created the Pattern

The details are outlined in the table below:

|                  | Public Patterns | Non-Public Patterns |
| ---------------: | :-------------: | :-----------------: |
| **Your own**     | `0` or higher   | `1` or higher       |
| **Other user's** | `0` or higher   | `5` or higher       |

## Endpoints

Reading a Pattern is possible via these endpoints:

| Method    | Path | Authentication |
| --------: | :--- | :------------- |
| <Method get /> | `/patterns/:id/jwt` | [JSON Web Token](/reference/backend/api/authentication#jwt-authentication) |
| <Method get /> | `/patterns/:id/key` | [API Key & Secret](/reference/backend/api/authentication#key-authentication) |

## Request URL

The URL should contain the ID of the Pattern you wish to read.
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
| `result`            | String | Either `success` or `error` |
| `error`             | String | Will give info on the nature of the error. Only set if an error occurred. |
| `pattern.id`        | Number | The ID of the Pattern |
| `pattern.createdAt` | String | Date string indicating the moment the pattern was created |
| `pattern.data`      | Object | Any additional data that was stored with Pattern data |
| `pattern.design`    | String | The name of the design of which this Pattern is an instance |
| `pattern.img`       | String | The URL to the image stored with this Pattern |
| `pattern.name`      | String | The name of the Pattern |
| `pattern.notes`     | String | The notes stored with the Pattern |
| `pattern.personId`  | Number | The ID of the Person for whom the Pattern was created |
| `pattern.public`    | Boolean| Indicates whether the Pattern is publicly accessible or not |
| `pattern.settings`  | Object | The settings used to (re-)create the Pattern |
| `pattern.userId`    | Number | The ID of the user who created the Pattern |
| `pattern.updatedAt` | String | Date string indicating the last time the pattern was updated |

## Example request

```js
const pattern = await axios.get(
  'https://backend.freesewing.org/patterns/10/jwt',
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
  "pattern": {
    "id": 10,
    "createdAt": "2022-11-19T16:29:33.346Z",
    "data": {
      "some": "value"
    },
    "design": "aaron",
    "img": "https://cdn.sanity.io/images/hl5bw8cj/production/a1565c8c6c70cfe7ea0fdf5c65501cd885adbe78-200x187.png",
    "name": "Just a test",
    "notes": "These are my notes",
    "personId": 17,
    "public": true,
    "settings": {
      "sa": 5
    },
    "userId": 10,
    "updatedAt": "2022-11-19T16:29:35.023Z"
  }
}
```
