---
title: Account
---

From an end-user's point of view, their account holds all of their data. From
an API point of view, these endpoints deal with data in the User table.

As the endpoints typically use `/account` we tend to use _account_ more often
than _user_.

## Endpoints

<ReadMore />

## Notes

### The `consent` field is about data protection

The `consent` field holds a number indicating to which level the user has
agreed to the processing of their data:

- `0` : No consent given (yet)
- `1` : Consent given for processing profile data
- `2` : Consent given for processing profile & people data
- `3` : Consent given for processing profile & people data, and for publishing
  anonymized measurements as open data

Providing a consent value (that is higher than `0`) is a requirement for
confirming a User account.  In other words, without sufficient consent, you
can't sign up.

### The `control` field is about keeping it simple

The `control` field holds a number indicating to which level the user wants to
be in control of the FreeSewing platform.  It was added as a way to allow for
progressive disclosure of (more) advanced features and settings on the
FreeSewing website.

Possible values are:

- `1` : Hide all but the most crucial features. Make it as simple as possible.
- `2` : Hide the majority of features. Make it simple, but not too much.
- `3` : Reveal the majority of features, but not all. Balance simplicity with
  power.
- `4` : Reveal everything, but keep handrails and safety checks. Only intervene
  when I'm about to do something dangerous.
- `5` : Reveal everything, remove the handrails and safety checks. Get out of
  my way, I know what I'm doing.

### The `ihash` and `ehash` fields are for search

Because we encrypt a lot of data at rest, it can be difficult for support or
administrators to find users when they don't know or remember their username
because we cannot search on their E-mail address since that data is encrypted.

That is why we store a hash of the (lowercased) email address. This way, we can
hash the email provided to us, and search the hash instead.

The `ehash` and `ihash` fields hold the hash for the `email` and `initial`
fields.

### The `imperial` property is a Boolean

If the `imperial` property is `false`, the user wants metric units.

If the `imperial` property is `true`, the user wants imperial units.

### The `initial` field guards against account takeover

The `initial` field will be set to the E-mail address the account was
registered with.  It can never be changed.

This ensures that when there's an account takeover dispute, we can always know
what E-mail address was used to create the account, even if the E-mail address
associated with the account was changed.

### The `lusername` field should be unique

For the backend users `Joost` and `joost` are -- strictly speaking -- two
different users.  This tends to lead to confusion and possible impersonation.
So we enforce uniqueness on the `lusername` field which holds a lowercased
version of the `username` field..

In other words, lowercased username must be unique.

### The `status` field holds the account status

Possible values are:

- `0` : The account is not active (yet)
- `1` : The account is active
- `-1` : The account was disabled by the user
- `-2` : The account was administratively disabled

