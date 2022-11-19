---
title: REST API
---

This is the reference documentation for the FreeSewing backend REST API.

<Fixme>
This documentation is under construction as we are re-working this API for v3.
</Fixme>

## Purpose of this API

This API is how one can interact with the FreeSewing backend data.
That means the data for our users, including all people they have added to
their profile, as well as all of the patterns they have saved to our profile.

This API also manages subscriptions to our newsletter, and a number of other
automation tasks such as creating issues on Github.

## Authentication

Apart from a handlful of API endpoints that are accessible without
authentication (typically the ones dealing with the signup flow or password
recovery), this API requires authentication.

Two different types of authentication are supports:

- **JSON Web Tokens** (jwt): This is typically used to authenticate humans in a
  browser session.
- **API Keys** (key): This is typically used to interact with the API in an
  automated way. Like in a script, a CI/CD context, a serverless runner, and so
  on.

For each endpoint, the API has a variant depending on what authentication you 
want to use:

- `/some/route/jwt` : Authenticate with JWT
- `/some/route/key` : Authenticate with an API key and secret

### JWT authentication

The use of JSON Web Tokens ([jwt](https://jwt.io)) is typically used in a
browser context where we want to establish a *session*.

To get a token, you must first authenticate at the `/login` endpoint with
username and password.  You will receive a JSON Web Token (jwt) as part of the
response.

In subsequent API calls, you must then include this token in the
`Authorization` header prefixed by `Bearer`. Like his:

```js
const account = await axios.get(
  `https://backend.freesewing.org/account/jwt`,
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
)
```

### API key authentication

The combination of API key & secret serves as a username & password for [HTTP
basic authentication](https://en.wikipedia.org/wiki/Basic_access_authentication).

<Note>
In basic authentication, the password is sent
unencrypted. To guard against this, this API should only be served over a 
connectin encrypted with TLS. (a url starting with `https://`).
</Note>

Sending a username and password with a request like this is supported
pretty much everywhere. In addition, there is no need to establish a session
first, so this make the entire transation stateless.

Below is an example using curl:

```sh
curl -u api-key-here:api-secret-here \ 
  https://backend.freesewing.org/account/key
```

## Privilege levels for user roles and API keys

The privilege level is an intiger from `0` to `8`. The higher the number, the higher the priviledge.

User accounts have a `role` that determines their privilege level.
The available roles (with their privilege levels) are:

- **user**: `4`
- **bughunter**: `5`
- **support**: `6`
- **admin**: `8`

These roles are used when using JWT authentication, as that's typically used by humans.
When using API keys, the privilege level can be set on the API key itself in a more granular way.

The table below lists the priviledge of all levels as well as their corresponding <small><small><b>`role`</b></small></small>:

| Level  | Abilities | <small><small>`user`</small></small> | <small><small>`bughunter`</small></small> | <small><small>`support`</small></small> | <small><small>`admin`</small></small> |
| --: | -- | :--: | :--: | :--: | :--: |
| `0`    | authenticate                                          | ✅ | ✅ | ✅ | ✅ |
| `1`    | **read** measurements and patterns                    | ✅ | ✅ | ✅ | ✅ |
| `2`    | **read all** account data                             | ✅ | ✅ | ✅ | ✅ |
| `3`    | **write** measurements or patterns                    | ✅ | ✅ | ✅ | ✅ |
| `4`    | **write all** account data                            | ✅ | ✅ | ✅ | ✅ |
| `5`    | **read** measurements or patterns of **other users**  | ❌ | ✅ | ✅ | ✅ | 
| `6`    | **read all** account data of **other users**          | ❌ | ❌ | ✅ | ✅ | 
| `7`    | **write** account data of **other users** through **specific support methods** | ❌ | ❌ | ✅ | ✅ | 
| `8`    | impersonate other users, **full write access**        | ❌ | ❌ | ❌ | ✅ |

## API Routes

<ReadMore />
