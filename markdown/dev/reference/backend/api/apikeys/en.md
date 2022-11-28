---
title: API Keys
---

API keys are a way to authenticate to the API with basic authentication.
They are intended to be used when interacting with the API in an automated
way such as from a script or a CI/CD pipeline.

They are an alternative to JSON Web Tokens (JWT) which is typically used
to authenticate users in a browser session.

The FreeSewing backend REST API supports authentication both with JSON Web
Tokens (JWT) as with API keys (KEY).  This describes the endpoints that deal
with creating, reading, and removing API keys. For authentication details,
refer to [the section on
authenticating](/reference/backend/api#authentication).

## Endpoints

<ReadMore />

## Notes

The following is good to keep in mind when working with API keys:

### API keys are immutable

Once created, API keys cannot be updated. 
You should remove them and re-create a new one if you want to make a change.

### API keys have an expiry

API keys have an expiry date. The maximum validity for an API key is 1 year.

### API keys have a permission level

API keys have a permission level. You can never create an API key with a higher
permission level than your own permission level.

### Circumstances that will trigger your API keys to be revoked

As a precaution, all your API keys will be revoked when:

- Your role is downgraded to a role with fewer privileges
- Your account is (b)locked
- You revoke your consent for FreeSewing to process your data

<Note>
This is not an exhaustive list. For example, if we find your use of our API to
be excessive, we might also revoke your API keys to shield us from the
financial impact of your use of our API.
</Note>

