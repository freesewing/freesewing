---
title: Log in
---

## Log in
```
POST /login
{
  'username': 'user-csfwg',
  'password': `test`
}
```
On success: The account data
On failure:
```
400
```
 - Returns the same as the create account endpoint
 - Both username or email address can be uses as `username`

## Reset password
```
POST /reset/password
{
  'username': 'test@freesewing.org'
}
```
On success:
```
200
```
On failure:
```
400
```

 - Will send an email to the user with a link for a passwordless login. 

## Passwordless login
```
POST /confirm/login
{
  'id': '5d5132041ad3f369443f1d7b'
}
```
On success: The account data
On failure:
```
400
```
 - Returns the same as the create account endpoint
 - ID is the one sent out in the confirmation email

This will log the user in.

