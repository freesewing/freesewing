---
title: Sign up
---

## Request account
```
POST /signup
{
  email: 'test@freesewing.org',
  password: 'test',
  language: 'en'
}
```
On success:
```
200 
```
On error:
```
400 
```

 - This is the first half in the user sign up flow.
 - `language` should be one of the [configured language codes](https://github.com/freesewing/backend/blob/develop/src/config/index.js#L32)
 - This will create (but not activate) a user account
 - This will send out an email to the user to confirm their email address

## Create account
```
POST /account
{
  id: '5d5132041ad3f369443f1d7b'
  consent: {
    profile: true,
    model: true,
    openData: true
  }
}
```
On success: The account data:
```
200
{ 
  'account': { 
    'settings': { 
      'language': 'en', 
      'units': 'metric' 
    },
    'consent': { 
      'profile': true,
      'model': true,
      'openData': true,
    },
    'time': { 
      'login': '2019-08-12T09:41:15.823Z' 
    },
    'role': 'user',
    'patron': 0,
    'bio': '',
    'picture': 'csfwg.svg',
    'status': 'active',
    'handle': 'csfwg',
    'username': 'user-csfwg',
    'email': 'test@freesewing.org',
    'pictureUris': { 
      'l': 'https://static.freesewing.org/users/c/csfwg/csfwg.svg',
      'm': 'https://static.freesewing.org/users/c/csfwg/csfwg.svg',
      's': 'https://static.freesewing.org/users/c/csfwg/csfwg.svg',
      'xs': 'https://static.freesewing.org/users/c/csfwg/csfwg.svg' 
    } 
  },
  'models': {},
  'recipes': {},
  'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDUxMzQzYjFhZDNmMzY5NDQzZjFkOTYiLCJoYW5kbGUiOiJjc2Z3ZyIsImF1ZCI6ImZyZWVzZXdpbmcub3JnIiwiaXNzIjoiZnJlZXNld2luZy5vcmciLCJpYXQiOjE1NjU2MDI4NzV9.-u4qgiH5sEcwhSBvQ9AOxjqsJO3-Phm9t7VbPaPS7vs' 
}
```
On failure:
```
400 
```

This is the second half of the sign up flow. The email sent to the user in the first half of the sign up flow contains a link to the (frontend) confirmation page. This will get the confirmation ID from the URL and `POST` it to the backend, along with the user's choices regarding consent  for processing their personal data.

The `consent` object has the following properties:
  - `bool profile` : Consent for the processing of profile data
  - `bool model` : Consent for the processing of model data
  - `bool openData` : Whether or not the user allows publishing of measurements as open data

For more details on user consent, please consult [FreeSewing's privacy notice](https://en.freesewing.org/docs/about/privacy).

<Note>

Our frontend won't allow users to proceed without profile consent as
storing your data requires that consent. The backend enforces this too

</Note>

