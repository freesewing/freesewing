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

<Note compact>
The response to this API call is the only time the secret will be
revealed.
</Note>

### Endpoints

| Method | Path | Description | Auth |
| ------ | ---- | ----------- | ---- |
| <Method post /> | `/apikey/jwt` | Create a new API key | _jwt_ |
| <Method post /> | `/apikey/key` | Create a new API key | _key_ |

### Parameters
<Tabs tabs="Request, Response">
<Tab>
| Where | Variable      | Type     | Description |
| ----- | ------------- | -------- | ----------- |
| _body_  | `name`      | `string` | Create a new API key. Endpoint for JWT authentication |
| _body_  | `level`     | `number` | A privilege level from 0 to 8. |
| _body_  | `expiresIn` | `number` | body | The number of seconds until this key expires. |
</Tab>
<Tab>
Returns HTTP status code <StatusCode status="201"/> on success, <StatusCode status="400"/> if 
the request is malformed, and <StatusCode status="500"/> on server error.

| Value               | Type     | Description |
| ------------------- | -------- | ----------- |
| `result`            | `string` | `created` on success, and `error` on error |
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
const apiKey = axios.post(
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

## Read an API key

Reads an existing API key. Note that the API secret can only be retrieved at
the moment the API key is created.

<Note compact>
You need the `admin` role to read API keys of other users
</Note>
### Endpoints

| Method | Path | Description | Auth | 
| ------ | ---- | ----------- | ---- |
| <Method get /> | `/apikey/:id/jwt` | Reads an API key | _jwt_ |
| <Method get /> | `/apikey/:id/key` | Reads an API key | _key_ |

### Parameters
<Tabs tabs="Request, Response">
<Tab>
| Where | Variable    | Type     | Description |
| ----- | ----------- | -------- | ----------- |
| _url_ | `:id`       | `string` | The `key` field of the API key |
</Tab>
<Tab>
Returns HTTP status code <StatusCode status="200"/> on success, <StatusCode status="400"/> if 
the request is malformed, <StatusCode status="404"/> if the key is not found,
and <StatusCode status="500"/> on server error.

| Value               | Type     | Description |
| ------------------- | -------- | ----------- |
| `result`            | `string` | `success` on success, and `error` on error |
| `apikey.key`        | `string` | The API key |
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
const keyInfo = axios.get(
  'https://backend.freesewing.org/apikey/7ea12968-7758-40b6-8c73-75cc99be762b/jwt',
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
    level: 3,
    expiresAt: '2022-11-06T15:57:30.190Z',
    name: 'My first API key',
    userId: 61
  }
}
```
</Tab>
</Tabs>

## Read the current API key

Reads the API key with which the current request was authenticated.

### Endpoints

| Method | Path | Description | Auth | 
| ------ | ---- | ----------- | ---- |
| <Method get /> | `/whoami/key` | Reads the current API key | _key_ |

### Parameters
<Tabs tabs="Request, Response">
<Tab>
<Note compact>This endpoint takes no parameters</Note>
</Tab>
<Tab>
Returns status code `200` on success, `400` on if the request is malformed, 
`404` if the key is not found, and `500` on server error.

| Value               | Type     | Description |
| ------------------- | -------- | ----------- |
| `result`            | `string` | `success` on success, and `error` on error |
| `apikey.key`        | `string` | The API key |
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
const keyInfo = axios.get(
  'https://backend.freesewing.org/whoami/key',
  {
    auth: {
      username: apikey.key,
      password: apikey.secret,
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
    level: 3,
    expiresAt: '2022-11-06T15:57:30.190Z',
    name: 'My first API key',
    userId: 61
  }
}
```
</Tab>
</Tabs>


## Remove an API key

Removes an existing API key. 

<Note compact>
You need the `admin` role to remove API keys of other users
</Note>

### Endpoints

| Method | Path | Description | Auth | 
| ------ | ---- | ----------- | ---- |
| <Method delete /> | `/apikey/:id/jwt` | Removes an API key | _jwt_ |
| <Method delete /> | `/apikey/:id/key` | Removes an API key | _key_ |

### Parameters
<Tabs tabs="Request, Response">
<Tab>
| Where | Variable    | Type     | Description |
| ----- | ----------- | -------- | ----------- |
| _url_ | `:id`       | `string` | The `key` field of the API key |
</Tab>
<Tab>
Returns HTTP status code <StatusCode status="204"/> on success, <StatusCode status="400"/> if 
the request is malformed, <StatusCode status="404"/> if the key is not found,
and <StatusCode status="500"/> on server error.
</Tab>
</Tabs>
### Example
<Tabs tabs="Request, Response">
<Tab>
```js
const keyInfo = axios.get(
  'https://backend.freesewing.org/apikey/7ea12968-7758-40b6-8c73-75cc99be762b/jwt',
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
)
```
</Tab>
<Tab>
<Note compact>Status code <StatusCode status="204"/> (no content) does not come with a body</Note>
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


