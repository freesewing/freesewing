---
title: Installing Node
order: 20
---

Now we will use nvm to install Node JS. Run the following command:

```bash
nvm install lts/fermium
```

This will install the so-called LTS version of Node 14 on your system.

LTS versions -- short for Long Term Support -- are good node versions
to use because they are stable and supported for a long time.

<Note compact>
Node 14 is required to use our monorepo [until we upgrade Strapi](https://github.com/freesewing/freesewing/issues/2351).
</Note>
