---
title: Models
---

## Create model

```
POST /models
{
  'name': 'The model name',
  'breasts': false,
  'units': 'imperial'
}
```  
On success:
```
200
{
  'model': {   
    'breasts': false,
    'units': 'imperial',
    'handle': 'dnkve',
    'user': 'ohium',
    'name': The model name',
    'createdAt': '2019-08-12T12:06:41.086Z',
    'updatedAt': '2019-08-12T12:06:41.086Z',
    'pictureUris': {
      'l': 'https://static.she.freesewing.org/users/o/ohium/models/dnkve/dnkve.svg',
      'm': 'https://static.she.freesewing.org/users/o/ohium/models/dnkve/dnkve.svg',
      's': 'https://static.she.freesewing.org/users/o/ohium/models/dnkve/dnkve.svg',
      'xs': 'https://static.she.freesewing.org/users/o/ohium/models/dnkve/dnkve.svg'
    }
  }
}
```
On failure:
```
400
```

Creates a model and returns its data.

## Read model
```
GET /models/:handle
```
On success: The model data
On failure:
```
400
```

Loads a model's data

## Update model

```
PUT /models/:handle
{
  'measurements': {
    'ankleCircumference': 234
  }
}
```

Updates the model and returns the (updated) model data.

## Remove model

```
DELETE /models/:handle
```
On success:
```
200
```
On failure:
```
400
```

Removes the model

