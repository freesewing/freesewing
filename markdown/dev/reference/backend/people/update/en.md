---
title: Update a Person
---

Updates an existing Person.

## Access control

- [Permission level](/reference/backend/api/rbac) `3` or higher is required to update a Person
- [Permission level](/reference/backend/api/rbac) `8` is required to update **another user's** Person

## Endpoints

Updating an existing Person is possible via these endpoints:

| Method    | Path | Authentication |
| --------: | :--- | :------------- |
| <Method put /> | `/people/:id/jwt` | [JSON Web Token](/reference/backend/api/authentication#jwt-authentication) |
| <Method put /> | `/people/:id/key` | [API Key & Secret](/reference/backend/api/authentication#key-authentication) |

## Request URL

The URL should contain the ID of the Person you wish to remove.
It replaces the `:id` placeholder in the [endpoints listed above](#endpoints).

## Request body

| Property    | Type     | Description |
| ----------: | :------- | :---------- |
| `img`       | `string` | An image [data-uri][duri] to store with this Person |
| `imperial`  | `boolean`| Whether this Person prefers imperial measurements (`true`) or not (`false`) |
| `name`      | `string` | A name for the Person |
| `notes`     | `string` | User notes for the person |
| `measies`   | `object` | The measurements for this person |
| `public`    | `string` | The name of the design this Pattern is an instance of |

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
| `person.id`         | Number | The ID of the Person |
| `person.createdAt`  | String | Date string indicating the moment the Person was created |
| `person.img`        | String | The URL to the image stored with this Person |
| `person.name`       | String | The name of the Person |
| `person.notes`      | String | The notes stored with the Person |
| `person.userId`     | Number | The ID of the user who created the Person |
| `person.measies`    | Object | The measurements of the Person |
| `person.public`     | Boolean| Indicates whether the Person is publicly accessible or not |
| `person.updatedAt`  | String | Date string indicating the last time the Person was updated |

## Example request

```js
const udpate = await axios.put(
  'https://backend.freesewing.org/people/27/jwt',
  {
    notes: "Turns out some people like imperial",
    imperial: true,
  },
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
  "person": {
    "id": 27,
    "createdAt": "2022-11-19T17:36:41.342Z",
    "img": "https://cdn.sanity.io/images/hl5bw8cj/production/a1565c8c6c70cfe7ea0fdf5c65501cd885adbe78-200x187.png",
    "imperial": true,
    "name": "Someone",
    "notes": "Turns out some people like imperial",
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
