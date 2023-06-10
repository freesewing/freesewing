## FreeSewing backend

This is a work in process to port the v2 backend to a new v3 backend.

It will be based on Express using Prisma with a SQLite database.
Watch this space.

## Permission levels

There are two different models to authenticate, as user, or with an API key.

The API keys have more granularity, their permission levels are:

 - `0`: No permissions. Can only login but not do anything (used for testing)
 - `1`: Read access to own measurements sets/patterns data
 - `2`: Read access to all account data
 - `3`: Write access to own measurements sets/pattern data
 - `4`: Write access to all own account data (this is the `user` role)
 - `5`: Read access to measurements sets/pattern data of all users (this is the `bughunter` role)
 - `6`: Read access to all account data of all users
 - `7`: Read access to all account data of all users + Write access for specific support functions (this is the `support` role)
 - `8`: Write access to all account data of all users (this is the `admin` role)

User roles map to these permission levels as such:

- `user`: 4 (this is everybody)
- `bughunter`: 5 (a small group of people, less than 10)
- `support`: 7 (a small number of trusted collaborators, less than 5)
- `admin`: 8 (joost)

When using an API key above level 4, you need the following roles:

- 5: Requires bughunter, support, or admin
- 6,7,: Requires support or admin
- 8: Requires admin
