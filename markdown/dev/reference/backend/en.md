---
title: Backend API
for: developers
about: Documentation for our backend REST API
---

<Fixme>This documentation is outdated</Fixme>

<Note>

See also: [The backend documentation](/reference/repos/backend/)

</Note>

## API Cheat sheet
With authentication:

|🔐| Method | Endpoint | Description |
|--- |--------|----------|-------------|
|🔐|`POST`|`/models`| [Creates model](/reference/backend/models/#create-model) |
|🔐|`GET`|`/models/:handle`| [Read model](/reference/backend/models/#read-model) |
|🔐|`PUT`|`/models/:handle`| [Update model](/reference/backend/models/#update-model) |
|🔐|`DELETE`|`/models/:handle`| [Remove model](/reference/backend/models/#remove-model) |
|🔐|`POST`|`/recipes`| [Create recipe](/reference/backend/recipes/#create-recipe) |
|🔐|`GET`|`/recipes/:handle`| [Read recipe](/reference/backend/recipes/#read-recipe) |
|🔐|`PUT`|`/recipes/:handle`| [Updates recipe](/reference/backend/recipes/#update-recipe) |
|🔐|`DELETE`|`/recipes/:handle`| [Remove recipe](/reference/backend/recipes/#remove-recipe) |
|🔐|`GET`|`/account`| [Load account](/reference/backend/account/#load-account) |
|🔐|`PUT`|`/account`| [Update account](/reference/backend/account/#update-account) |
|🔐|`DELETE`|`/account`| [Remove account](/reference/backend/account/#remove-account) |
|🔐|`POST`|`/account/change/email`| [Confirm email change](/reference/backend/account/#confirm-email-change) |
|🔐|`GET`|`/account/export`| [Export account](/reference/backend/account/#export-account) |
|🔐|`GET`|`/account/restrict`| [Restric account](/reference/backend/account/#restrict-account) |
|🔐|`GET`|`/users/:username`| [Read user profile](/reference/backend/users/#read-user-profile)
|🔐|`POST`|`/available/username`| [Is username available](/reference/backend/users/#is-username-available) |

Without authentication:

|🔓| Method | Endpoint | Description |
|--- |--------|----------|-------------|
|🔓|`POST`|`/signup`| [Request account](/reference/backend/signup/#request-account) |
|🔓|`POST`|`/account`| [Create account](/reference/backend/signup/#create-account) |
|🔓|`POST`|`/login`| [Log in](/reference/backend/login/#log-in) |
|🔓|`POST`|`/reset/password`| [Recover password](/reference/backend/login/#recover-password) |
|🔓|`POST`|`/confirm/login`| [Passwordless login](/reference/backend/login/#passwordless-login) |
|🔓|`POST`|`/oauth/init`| [Oauth initialisation](/reference/backend/oauth/#oauth-initialisation) |
|🔓|`GET`|`/oauth/callback/from/:provider`| [Oauth callback](/reference/backend/oauth/#oauth-callback) |
|🔓|`POST`|`/oauth/login`| [Oauth login](/reference/backend/oauth/#oauth-login) |
|🔓|`GET`|`/patrons`| [Patron list](/reference/backend/users/#patron-list) |


<ReadMore root='reference/backend' box />
