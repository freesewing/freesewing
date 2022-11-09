---
title: FreeSewing backend
---

The FreeSewing backend handles all user data. Prior to version 3 of FreeSewing,
the backend was only used internally as the data store for our frontend, the
FreeSewing.org website.

In version 3, we have rewritten the backend with the explicit goal to offer it
as a service to users and developers. This allows integration with other tools
such as hosted instances of our lab, CLI tools, serverless runners, CI/CD
environments and so on.

In other words, we no longer merely provide our own frontend, you can now also 
use our backend as a service to build your own projects.

## Changes for developers

We've made a number of changes to make it easier for external developers and
contributors to work with our backend.

### Authentication with JWT and API keys

Before version 3, the backend only supported authentication via JSON Web
Tokens.  That's fine for a browser session, but not very handy if you want to
talk to the API directly.

Since version 3, we support authentication with API keys.  Furthermore, we
allow any FreeSewing user to generate their own API keys. 

In other words, if you want to connect to our backend API, you don't need to
ask us. You can generate your own API key and start right away.

### Sqlite instead of MongoDB

Our backend used to use MongoDB for storage.  Since version 3, we've moved to
Sqlite which is a file-based database making local development a breeze since
you don't need to run a local database server.

### Sanity instead of local storage

We now use Sanity and the Sanity API to stored images for users (avatars for
user accounts and people).  Furthermore, we also generate PDFs in the browser
now so we also don't need storage for that.

As a result, our backend does not need any storage, only access to the Sqlite
file.  This also makes it easier to work with the backend as a developer.

## Use, don't abuse

Our backend API runs in a cloud environment and while we do not charge for
access to the API, we do need to pay the bills of said cloud provider.

As such, please be mindful of the amount of requests you generate. And if you
have big plans, please reach out to us to discuss them first.

We will monitor the use of our backend API and we may at any moment decide to
revoke API keys if we feel the use is beyond what we can or want to support.
