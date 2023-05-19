---
title: Authentication
---

The FreeSewing backend API requires authentication for all but a handful of
endpoints.

The API supports two different types of authentication:

| Type | Name | Description |
| ---- | ---- | ----------- |
| [JSON Web Tokens](#jwt-authentication) | `jwt` | This is typically used to authenticate humans in a browser session. |
| [API Keys](#key-authentication) | `key` | This is typically used to interact with the API in an automated way. Like in a script, a CI/CD context, a serverless runner, and so on. |

While the API supports both, they are not supported on the same endpoint.
Instead, add the authentication type you want to use as the final part of
endpoint:

- `/some/endpoint/jwt` : Authenticate with a JSON Web Token
- `/some/endpoint/key` : Authenticate with an API key and secret

## `jwt` authentication

The use of JSON Web Tokens ([jwt](https://jwt.io)) is typically used in a
browser context where we want to establish a *session*.

To get a token, you must first authenticate at the [`/signin`](/reference/backend/api/user/signin) endpoint.
You will receive a JSON Web Token (jwt) as part of the response.

In subsequent API calls, you must then include this token in the
`Authorization` header prefixed by `Bearer `. Like his:

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

## `key` authentication

The combination of API key & secret serves as a username & password for [HTTP
basic authentication](https://en.wikipedia.org/wiki/Basic_access_authentication).

<Note>
In basic authentication, the password is sent
unencrypted. To guard against this, this API should only be served over a
connection that is encrypted with TLS. (a URL starting with `https://`).
</Note>

Sending a username and password with a request like this is supported
pretty much everywhere. In addition, there is no need to establish a session
first, so this make the entire transaction stateless.

Below is an example using curl:

```sh
curl -u api-key-here:api-secret-here \
  https://backend.freesewing.org/account/key
```
