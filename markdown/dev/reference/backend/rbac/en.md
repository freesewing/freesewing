---
title: Access control
---

The backend API implements role-based access control (RBAC). Each
user has a role and that role determines what they can and cannot do.

## Roles vs levels

In practice, the different user roles map to a permission level between
`0` and `9`.
The available roles and their privilege levels are:

- **user**: `4`
- **tester**: `4`
- **curator**: `5`
- **bughunter**: `6`
- **support**: `8`
- **admin**: `9`

We offer more fine-grained control over the permission level when
authenticating with API keys.  When you create an API key, you can choose any
permissioning level that is equal or lower than your own role's permission level.

This allows you to -- for example -- generate an API key that only have read
access to your data.

## Permission levels

The table below lists the privilege of all levels as well as their
corresponding <small><small><b>`role`</b></small></small>

| Level  | Abilities | <small><small>`user` `tester`</small></small> | <small><small>`curator`</small></small> | <small><small>`bughunter`</small></small> | <small><small>`support`</small></small> | <small><small>`admin`</small></small> |
| --: | -- | :--: | :--: | :--: | :--: | :--: |
| `0`    | authenticate                                     | ✅ | ✅ | ✅ | ✅ | ✅ |
| `1`    | **read** people and patterns                     | ✅ | ✅ | ✅ | ✅ | ✅ |
| `2`    | **read all** account data                        | ✅ | ✅ | ✅ | ✅ | ✅ |
| `3`    | **write** people or patterns                     | ✅ | ✅ | ✅ | ✅ | ✅ |
| `4`    | **write all** account data                       | ✅ | ✅ | ✅ | ✅ | ✅ |
| `5`    | **read** people or patterns of **other users**   | ❌ | ✅ | ✅ | ✅ | ✅ |
| `6`    | **read all** account data of **other users**     | ❌ | ❌ | ✅ | ✅ | ✅ |
| `7`    | (same permissions as Level 6)                    | ❌ | ❌ | ❌ | ✅ | ✅ |
| `8`    | **write** account data of **other users** through **specific support methods** | ❌ | ❌ | ❌ | ✅ | ✅ |
| `9`    | impersonate other users, **full write access**   | ❌ | ❌ | ❌ | ❌ | ✅ |
