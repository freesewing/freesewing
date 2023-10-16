---
title: Backend REST API
---

This is the reference documentation for the FreeSewing backend REST API.

<Fixme compact>
This documentation is under construction as we are re-working this API for v3.
</Fixme>

## REST API docs

<ReadMore />

<Tip>

##### Also available as OpenAPI specification

The backend hosts its own auto-generated (Swagger) documentation based
on the OpenAPI specification (v3): [backend3.freesewing.org/docs/
](https://backend3.freesewing.org/docs/)

</Tip>

## About the FreeSewing backend

The FreeSewing backend handles all user data. Prior to version 3 of FreeSewing,
the backend was only used internally as the data store for our frontend, the
FreeSewing.org website.

In version 3, we have rewritten the backend with the explicit goal to offer it
as a service to users and developers. This allows integration with other tools
such as hosted instances of our lab, CLI tools, serverless runners, CI/CD
environments and so on.

In other words, we no longer merely provide our own frontend, you can now also 
use our backend as a service to build your own projects.

<Warning>

##### Use, don't abuse

Our backend API runs in a cloud environment and while we do not charge for
access to the API, we do need to pay the bills of said cloud provider.

As such, please be mindful of the amount of requests you generate. And if you
have big plans, please reach out to us to discuss them first.

We will monitor the use of our backend API and we may at any moment decide to
revoke API keys if we feel the use is beyond what we can or want to support.

</Warning>

## Database schema

The database schema for the backend is available in the [prisma.schema][prisma]
file in our monorepo.

## Under the hood

The FreeSewing backend is written in [NodeJS](https://nodejs.org/en/) on top of
[Express](https://expressjs.com/). It uses [Prisma](https://www.prisma.io/) to
interface with a [SQLite database](https://www.sqlite.org/) database,
[Sanity](https://www.sanity.io/) to store images, [AWS SES](
https://aws.amazon.com/ses/) to send out emails, and
[pino](https://github.com/pinojs/pino) for logging.

