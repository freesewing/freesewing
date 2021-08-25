---
title: Recipes
---

## Create Recipe

```
POST /recipes
{
  'name': 'The recipe name',
  'notes': 'Some notes',
  'recipe': {
    'settings': {
      'sa': 10,
      'complete': true,
      'paperless': false,
      'units': 'metric',
      'measurements': {
        'bicepsCircumference': 335,
        'centerBackNeckToWaist': 520,
        'chestCircumference': 1080,
        '"naturalWaistToHip': 145,
        'neckCircumference': 420,
        'shoulderSlope': 55,
        'shoulderToShoulder': 465,
        'hipsCircumference': 990
      }
    },
    'pattern': 'aaron',
    'model': 'dvqye'
  }
}
```
On success:
```
200
{
  'handle': 'abxda'
}
```
On failure:
```
400
```

Creates a recipe and returns its data.

## Read recipe
```
GET /recipes/:handle
```
On success: The recipe data On failure:
```
400
```

Loads a recipe's data

## Update recipe

```
PUT /recipes/:handle
{
  'notes': "5 stars, would make again"
}
```

Updates the recipe and returns the (updated) recipe data.

## Remove recipe

```
DELETE /recipes/:handle
```
On success:
```
200
```
On failure:
```
400
```

Removes the recipe
