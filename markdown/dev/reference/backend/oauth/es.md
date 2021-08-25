---
title: Oauth
---

## Oauth initialisation
```
POST /oauth/init
{
  'provider': 'github',
  'language': 'fr'
}
```
On success:
```
200
{
  'state': '5d5132041ad3f369443f1d7b'
}
```
On failure:
```
400
```
 - This triggers an Oauth flow
 - `provider` should be one of `google` or `github`
 - `language` should be one of the [configured language codes](https://github.com/freesewing/backend/blob/develop/src/config/index.js#L32)
 - The frontend will use the state value to initialize an Oauth session. We'll check the state value when we receive the Oauth callback at the backend

## Oauth callback
```
GET /oauth/callback/from/:provider
```
On success: Redirects to the frontend

This is part of the Oauth flow. It fetches the user info from the Oauth provider. If it can't match it with a user, it will create a user account. In other words, this will handle both log in and sign up.

The frontend redirect will contain a confirmation ID in the URL that we'll `POST` back in the next Oauth flow step.

## Oauth login
```
POST /oauth/login
{
  'confirmation': '98e132041ad3f369443f1d3d'
}
```
On success: The account data On failure:
```
400
```

This is the last step of the Oauth process. It logs a user in.

