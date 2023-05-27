---
title: Create a Measurements Set
---

Creates a new measurements set.

## Access control

- [Permission level](/reference/backend/api/rbac) `3` or higher is required to create a measurements set

## Endpoints

Creating a new measurements set is possible via these endpoints:

| Method    | Path | Authentication |
| --------: | :--- | :------------- |
| <Method post /> | `/sets/jwt` | [JSON Web Token](/reference/backend/api/authentication#jwt-authentication) |
| <Method post /> | `/sets/key` | [API Key & Secret](/reference/backend/api/authentication#key-authentication) |

## Request body

| Property    | Type     | Description |
| ----------: | :------- | :---------- |
| `img`       | `string` | An image [data-uri][duri] to store with this measurements set |
| `imperial`  | `boolean`| Whether this measurements set uses imperial measurements (`true`) or not (`false`) |
| `name`      | `string` | A name for the measurements set |
| `notes`     | `string` | User notes for the measurements set |
| `measies`   | `object` | The measurements for this measurements set |
| `public`    | `string` | The name of the design this Pattern is an instance of |

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
const person = await axios.post(
  'https://backend.freesewing.org/sets/jwt',
  {
    name: "Someone",
    notes: "These are some notes",
    measies: {
      "chest": 930,
      "neck": 360
    },
    public: true,
    imperial: false,
    img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEU...truncated"
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
  "set": {
    "id": 27,
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

[duri]: https://en.wikipedia.org/wiki/Data_URI_scheme
