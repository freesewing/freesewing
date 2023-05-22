---
title: Installing nvm
order: 15
---

FreeSewing is built with [Node.js](https://nodejs.org/), a JavaScript runtime.

You'll need to install Node.js on your system, and to do so, we'll
use [`nvm`](https://github.com/nvm-sh/nvm), short for _Node Version Manager_.

Using `nvm` has a number of benefits in comparison with installing Node.js from
the Node.js website, or from a package that came with macOS.

- You can easily switch between different Node.js versions
- Everything gets installed in your home folder, avoiding permission problems

To setup `nvm`, [follow the install instructions in the nvm
README](https://github.com/nvm-sh/nvm#installing-and-updating).

After the installation, try running the following command:

```bash
nvm
```

If all goes well, it should show you the `nvm` help.

<Tip>

If you get `nvm: command not found` or something similar, close the current terminal
window, and open a new one. Now `nvm` should be found.

</Tip>
