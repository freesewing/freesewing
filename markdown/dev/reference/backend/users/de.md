---
title: Users
---

## Read user profile
```
GET /users/:username
```
On success:
```
200
{ 
  'settings': { 
    'language': 'en', 
    'units': 'metric' 
  },
  'patron': 0,
  'bio': '',
  'handle': 'rracx',
  'username': 'admin',
  'createdAt': '2019-08-12T07:40:32.435Z',
  'updatedAt': '2019-08-12T09:23:48.930Z',
  'pictureUris': { 
    'l': 'https://static.she.freesewing.org/users/r/rracx/rracx.svg',
    'm': 'https://static.she.freesewing.org/users/r/rracx/rracx.svg',
    's': 'https://static.she.freesewing.org/users/r/rracx/rracx.svg',
    'xs': 'https://static.she.freesewing.org/users/r/rracx/rracx.svg' 
  } 
}
```

Load the profile data of a user. It expects one parameter in the URL of the `GET` request:

| Variable   | Description                                           |
| ---------- | ----------------------------------------------------- |
| `username` | The username of the user to load the profile data for |

## Is username availbable

```
POST /available/username
{
  username: 'username to check'
}
```
Username available:
```
200
```
Username not available:
```
400
```

## Patron list

```
GET /patrons
```
On success:
```
200
{
  '2': [
  ], 
  '4': [], 
  '8': [
    {
      'handle': 'joost',
      'username': 'joost',
      'bio':"If something doesn't work around here, that's probably my fault",
      'social': {
        'twitter': 'j__st',
        'instagram': 'joostdecock',
        'github': 'joostdecock'
      },
      'pictureUris': {
        'l': 'https://static.freesewing.org/users/j/joost/joost.jpg',
        'm': 'https://static.freesewing.org/users/j/joost/m-joost.jpg',
        's': 'https://static.freesewing.org/users/j/joost/s-joost.jpg',
        'xs': 'https://static.freesewing.org/users/j/joost/xs-joost.jpg'
      }
    }
  ] 
}
```

- Retrieves the list of [FreeSewing patrons](https://freesewing.org/patrons).
- Returns an array per tier

