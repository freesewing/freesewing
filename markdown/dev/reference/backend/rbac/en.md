---
title: Access control
---

The backend API implements role-based access control (RBAC). Each
user has a role and that role determines what they can and cannot do.

## Roles vs levels

In practice, the different user roles map to a permission level between
`0` and `8`.
The available roles and their privilege levels are:

- **user**: `4`
- **bughunter**: `5`
- **support**: `6`
- **admin**: `8`

We offer more fine-grained control over the permission level when
authenticating with API keys.  When you create an API key, you can choose any
permissioning level that is equal or lower than your own role's permission level.

This allows you to -- for example -- generate an API key that only have read
access to your data.

## Permission levels

The table below lists the privilege of all levels as well as their
corresponding <small><small><b>`role`</b></small></small>

| Level  | Abilities | <small><small>`user`</small></small> | <small><small>`bughunter`</small></small> | <small><small>`support`</small></small> | <small><small>`admin`</small></small> |
| --: | -- | :--: | :--: | :--: | :--: |
| `0`    | authenticate                                     | ✅ | ✅ | ✅ | ✅ |
| `1`    | **read** measurements sets and patterns                     | ✅ | ✅ | ✅ | ✅ |
| `2`    | **read all** account data                        | ✅ | ✅ | ✅ | ✅ |
| `3`    | **write** measurements sets or patterns                     | ✅ | ✅ | ✅ | ✅ |
| `4`    | **write all** account data                       | ✅ | ✅ | ✅ | ✅ |
| `5`    | **read** measurements sets or patterns of **other users**   | ❌ | ✅ | ✅ | ✅ | 
| `6`    | **read all** account data of **other users**     | ❌ | ❌ | ✅ | ✅ | 
| `7`    | **write** account data of **other users** through **specific support methods** | ❌ | ❌ | ✅ | ✅ | 
| `8`    | impersonate other users, **full write access**   | ❌ | ❌ | ❌ | ✅ |

