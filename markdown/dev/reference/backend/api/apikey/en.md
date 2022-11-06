---
title: API Keys
---

Documentation for the REST API endpoints to create, read, or remove API keys.

<Tip>
The FreeSewing backend REST API supports authentication both with JSON Web
Tokens (JWT) as with API keys (KEY).  This describes the endpoints that deal
with creating, reading, and removing API keys. For authentication details,
refer to [the section on authenticating to the
API](/reference/backend/api#authentication).
</Tip>





## Create a new API key

Create a new API key. The API key will belong to the user who is authenticated
when making the call. Supported for both JWT and KEY authentication.

### Endpoints

| Method | Path | Description |
| ------ | ---- | ----------- |
| `POST` | `/apikey/jwt` | Create a new API key. Endpoint for JWT authentication |
| `POST` | `/apikey/key` | Create a new API key. Endpoint for API key authentication |

### Parameters
<Tabs tabs="Request, Response">
<Tab>
| Variable | Type     | Description |
| -------- | -------- | ----------- |
| `name`   | `string` | Create a new API key. Endpoint for JWT authentication |
| `level`  | `number` | A privilege level from 0 to 8. |
| `expiresIn`  | `number` | The number of seconds until this key expires. |
</Tab>
<Tab>
Returns status code `200` on success, `400` on if the request is malformed, and
`500` on server error.

| Value               | Type     | Description |
| ------------------- | -------- | ----------- |
| `result`            | `string` | `success` on success, and `error` on error |
| `apikey.key`        | `string` | The API key |
| `apikey.secret`     | `string` | The API secret |
| `apikey.level`      | `number` | The privilege level of the API key |
| `apikey.expiresAt`  | `string` | A string representation of the moment the API key expires |
| `apikey.name`       | `string` | The name of the API key |
| `apikey.userId`     | `number` | The ID of the user who created the API key |

</Tab>
</Tabs>
### Example
<Tabs tabs="Request, Response">
<Tab>
```js
const token = axios.post(
  'https://backend.freesewing.org/apikey/jwt',
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
</Tab>
<Tab>

```json
{
  result: 'success',
  apikey: {
    key: '7ea12968-7758-40b6-8c73-75cc99be762b',
    secret: '503d7adbdb3ec18ab27adfcd895d8b47a8d6bc8307d548500fbf9c05a5a8820e',
    level: 3,
    expiresAt: '2022-11-06T15:57:30.190Z',
    name: 'My first API key',
    userId: 61
  }
}
```
</Tab>
</Tabs>

## Notes

The following is good to keep in mind when working with API keys:

### This is not the authentication documentation

The FreeSewing backend REST API supports authentication both with JSON Web
Tokens (JWT) as with API keys (KEY).  

This describes the endpoints that deal with creating, reading, and removing API
keys. For authentication details, refer to [the section on authenticating to
the API](/reference/backend/api#authentication).

### API keys are immutable

Once created, API keys cannot be updated. 
You should remove them and re-create a new one if you want to make change.

### API keys have an expiry

API keys have an expiry date. The maximum validity for an API key is 1 year.

### API keys have a permission level

API keys have a permission level. You can never create an API key with a higher
permission level than your own permission level.

### Circumstances that will trigger your API keys to be revoked

As a precaution, all your API keys will be revoked when:

- Your role is downgraded to a role with fewer privileges
- Your account is (b)locked
- You revoke your consent for FreeSewing to process your data

<Note>
This is not an exhaustive list. For example, if we find your use of our API to
be excessive, we might also revoke your API keys to shield us from the
financial impact of your use of our API.
</Note>


