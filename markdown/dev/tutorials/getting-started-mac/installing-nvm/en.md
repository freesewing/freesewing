---
title: Installing nvm
order: 20
---

FreeSewing is built with [Node.js](https://nodejs.org/), a JavaScript runtime.

You'll need to install Node JS on your system, and to do so, we'll
use [nvm](https://github.com/nvm-sh/nvm), short for *Node version manager*.

Using nvm has a number of benefits in comparison with installing Node from
the node.js website, or from a package provided by Homebrew or your OS distribution:

-   You can easily switch between different Node versions
-   Everything gets installed in your home folder, avoiding permission problems

The latest instructions for setting up nvm can be found [here](https://github.com/nvm-sh/nvm#installing-and-updating). If you want to just skip to the commands that most likely work, keep reading.

To setup nvm, run the following command in a terminal window:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

If you don't have `curl` on your system, here's an alternative approach using `wget`:

```bash
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

After the script is completed, try running the following command:

```bash
nvm
```

If all goes well, it should show you the nvm help.

<Tip>

If you get `nvm: command not found` or something similar, close the Terminal
application, and open a new one. Now `nvm` should be found.

</Tip>
