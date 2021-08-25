---
title: Account
---

## Load account
```
GET /account
```
On success: The account data On failure:
```
400
```

## Update account
```
PUT /account
{
  'bio': 'The new bio',
  'avatar': 'data:image/png;base64,iVBORw0KGg...'
  'password': 'new password',
  'username': 'new username',
  'email': 'new.email@domain.com',
  'social': {
    'github': 'githubUsername',
    'twitter': 'twitterUsername',
    'isntagram': 'instagramUsername'
  },
  'settings': {
    'language': 'fr',
    'units': 'imperial',
  },
  'consent': {
    'profile': true,
    'model': false,
    'openData': false
  },
```
On success: The (updated) account data On failure:
```
400
```
 - This will only update what you pass it
 - This will only handle one top-level attribute per call
 - A change of email won't take effect immediately but instead trigger an email for confirmation. The email will be sent to the new email address, with the current email address in CC.

## Remove account
```
DELETE /account
```
On success:
```
204
```
On failure:
```
400
```

Removes the account and all user's data. Will also trigger a goodbye email.

## Confirm email change
```
POST /account/change/email
{
  'id': '98e132041ad3f369443f1d3d'
}
```
On success: The account data On failure:
```
400
```

Changing your email address requires confirmation, and this endpoint is for that.

## Export account
```
GET /account/export
```
On success:
```
200
{ 
  'export': 'https://static.freesewing.org/tmp/msypflkyyw/export.zip' 
}
```
On failure:
```
400
```

Will export the user data and publish it for download.

## Restrict account
```
GET /account/restrict
```
On success:
```
200
```
On failure:
```
400
```

Will lock the user account, thereby restricting processing of their data.

