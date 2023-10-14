---
title: Create a Pattern
---

Creates a new Pattern. This is typically used when users choose to save a pattern.

## Access control

- [Permission level](/reference/backend/api/rbac) `3` or higher is required to create a Pattern

## Endpoints

Creating a new Pattern is possible via these endpoints:

| Method    | Path | Authentication |
| --------: | :--- | :------------- |
| <Method post /> | `/patterns/jwt` | [JSON Web Token](/reference/backend/api/authentication#jwt-authentication) |
| <Method post /> | `/patterns/key` | [API Key & Secret](/reference/backend/api/authentication#key-authentication) |

## Request body
The request body is a JSON object with the following properties:

| Property    | Type     | Description |
| ----------: | :------- | :---------- |
| `data`      | `object` | Any additional data to store with the pattern |
| `design`    | `string` | The name of the design this Pattern is an instance of |
| `img`       | `object` | An image [data-uri][duri] to store with this Pattern |
| `name`      | `string` | A name for the Pattern |
| `notes`     | `string` | User notes for the pattern |
| `person`    | `object` | The ID of the person to associate with this pattern |
| `settings`  | `object` | The settings object to (re-)create the Pattern |

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
const pattern = await axios.post(
  'https://backend.freesewing.org/patterns/jwt',
  {
    data: {
      some: 'value',
    }
    design: "aaron",
    img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEU...truncated",
    name: "Just a test",
    notes: "These are my notes",
    person: 17,
    public: true,
    settings: {
      sa: 5,
    },
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

[duri]: https://en.wikipedia.org/wiki/Data_URI_scheme
