---
title: Using a different Node version
order: 40
---

Now that you've got Node setup, we can start setting up the FreeSewing
development environment.

But before doing so, let's look at how `nvm` can help you juggle different
Node versions.

### nvm ls

To see the different Node versions on your system, run this command:

```bash
nvm ls
```

It will show you a list of local node versions.
Either the version number, or an *alias* that points to a specific version.
You should see the `lts/*` alias in the list which is what we've just installed.

### nvm ls-remote

To see all Node versions that are available, not just those you have locally,
run this command:

```bash
nvm ls-remote
```

Nvm will now spit out a long list of Node versions that you can install.

### nvm install

For any of these versions, either local or remote, you can install them
by making a note of the version or alias and running this command:

```bash
nvm install <version-or-alias>
```

### nvm use

With multiple Node versions installed, `nvm` allows you to switch between different
versions. Just tell it which version you want to use:

```bash
nvm use v10.22.1
```

If you picked a version that is not installed, `nvm` will simply tell you
and even suggest the command you should type to install it. Handy!
