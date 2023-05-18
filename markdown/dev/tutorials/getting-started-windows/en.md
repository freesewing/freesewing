---
title: Getting started on Windows
order: 30
---

<Warning>
Official support for FreeSewing is provided for Linux, Mac, and BSD-based operating systems.
This _Getting started on Windows_ tutorial was written by FreeSewing community members and should be considered unofficial.
However, if you encounter issues with this tutorial or require assistance with other Microsoft Windows issues, please feel free to [ask for help](/howtos/help) and our community members will be happy to assist you!
</Warning>

You will first need to set up your development system either using Windows Subsystem for Linux or directly in Windows. Then, you can setup and start the FreeSewing development environment.

## Setting up a development environment using Windows Subsystem for Linux (WSL) and Visual Studio Code (VSCode)

If you already have a working WSL environment and VSCode Remote configured you
can follow the [getting started on Linux
guide](/tutorials/getting-started-linux) or skip ahead to [Setting up the
FreeSewing development environment
(WSL)](#setting-up-the-freesewing-development-environment-wsl). If not, the
following process is very similar but has some differences to avoid quirks
specific to this environment.

Windows Subsystem for Linux allows you to run a Linux distribution as a
development environment, with enough functionality to develop a FreeSewing
pattern. While this approach offers some advantages this is not strictly
necessary to develop patterns on Windows. If you would prefer a simpler setup
process refer to [Setting up a development environment in
Windows](#setting-up-a-development-environment-in-windows).

Installing and using an IDE is optional, you can skip that step or use a
different editor if you'd like. This guide suggests VSCode as it is freely
available on multiple platforms and provides enough functionality to build the
FreeSewing project.

### Install WSL

<Warning> This guide uses WSL version 2, which requires installing the Hyper-V
virtualisation system. If you have another virtualisation system installed (such
as VirtualBox or VMWare) you may run into conflicts which require either
updating that system to a version which can use the HyperV backend or porting
your existing machines to use HyperV.  </Warning>

Follow the [Windows Subsystem for Linux Installation Guide for Windows
10](https://docs.microsoft.com/en-gb/windows/wsl/install-win10) (requires a
recent version of Windows 10).

#### Install NVM

Open a new WSL terminal from the shortcuts created or by searching for "WSL
Terminal" in the start menu.  [Install NVM by following the NVM setup
guide](https://github.com/nvm-sh/nvm#install--update-script).  Once installed
you will need to activate NVM by either following the instructions printed to
the screen or opening a new terminal.

#### Install Node.js (and optionally Yarn)

Now that you have NVM installed, you can install Node.js. The latest version can be
installed using `nvm install default`. You can also install a specific version
using `nvm install v16.17.0`. For the purposes of debugging it can be useful to
have the same version of Node.js installed as the main project uses, which you can
then activate using `nvm use <version>`. You can determine what version the
FreeSewing project uses by checking
[freesewing/freesewing/.node-version](https://github.com/freesewing/freesewing/blob/develop/.node-version).

<Warning> At the time this guide was written the latest version of Node.js/npm has
a bug in the dependency resolution process which causes the freesewing project
to fail to build. Use the latest LTS version (currently 16.17.0) or the specific
version used by the main project to avoid this issue.  </Warning>

Node.js comes with the Node Package Manager (npm) by default which can be used to
set up the project. The default package manager uses a fairly simplistic approach
to dependency resolution which can make builds take a long time. Yarn is an
alternative package manager which makes builds faster, especially for monolithic
projects like FreeSewing. If you'd like to install yarn run `npm install yarn
--global` (optional, but recommended).

#### Install and configure Git (recommended)

The create-freesewing-pattern script will attempt to create a git repository as
part of the setup. It's not strictly required to have git installed in the WSL
environment but you will get errors during the project setup process if it isn't
installed or configured correctly. As such it's recommended to have git
installed on the WSL environment even if you're going to be using a GUI client
from the windows side.

```bash
sudo apt install git
git config --global user.email "<the email address you use for your git account>"
git config --global user.name "<your display name for your git account>"
```

### Install VSCode (optional)

[Download and install VSCode](https://code.visualstudio.com/).

<Note>

FreeSewing uses .editorconfig files to enforce a consistent style for the
project. VSCode relies on extensions to provide this functionality and due to a
design shortcoming it does not respect certain editorconfig options which will
break certain files in the freesewing project ([see vscode/65663 for
details](https://github.com/microsoft/vscode/issues/65663)). If you use this
editor please ensure that your settings.json file is configured to not trim
trailing whitespace from Markdown files. The following snippet can be added to
your settings.json file to add an exemption for this file type:

```json
  "[markdown]": { "files.trimTrailingWhitespace": false },
```

</Note>

#### Install VSCode Remote

In order to be able to use VSCode's IDE features (such as the built in terminal)
and also make use of the Node.js installation we set up in the previous steps you
will need to install VSCode Remote so that VSCode can make use of the Linux
environment. [Follow the getting started guide for VSCode
Remote](https://code.visualstudio.com/docs/remote/wsl) (If you've been following
this guide you have already done steps 1 and 2, you will only need to install
the [remote development
extension](https://aka.ms/vscode-remote/download/extension))


## Setting up a development environment in Windows.

### Install NVM

While Node.js can be installed directly on Windows, we strongly recommend using a
version manager such as [Node Version Manager for
Windows](https://github.com/coreybutler/nvm-windows/releases/latest). That link
will take you to the latest release which provides an installer you can download
and run. Once nvm-windows is installed you will be able to continue with the
rest of this process.

### Install Node.js (and optionally Yarn)

Open a Powershell terminal or command prompt. Run `nvm ls available` to show
versions that can be installed. Choose the appropriate version (you should use
the same version as the freesewing project or latest LTS version) then run `nvm
install 16.17.0` and `nvm use 16.17.0` (where `16.17.0` is the full version
string of the version you wish to use) to activate the newly installed version.
You will receive a prompt for elevated permissions and will need to accept it in
order to activate the new version of Node.js.

<Warning>
At the time this guide was written the latest version of Node.js/npm has
a bug in the dependency resolution process which causes the freesewing project
to fail to build. Use the latest LTS version (currently 16.17.0) or the specific
version used by the main project to avoid this issue.
</Warning>

Node.js comes with the Node Package Manager (npm) by default which can be used to
set up the project. The default package manager uses a fairly simplistic approach
to dependency resolution which can make builds take a long time. Yarn is an
alternative package manager which makes builds faster, especially for monolithic
projects like FreeSewing. If you'd like to install yarn run (`npm install yarn
-g`) (optional).

## Setting up the FreeSewing development environment

In VSCode or in a terminal, navigate to the folder you wish to contain your new patterns (e.g. `D:\Documents\my-freesewing-patterns`). Inside this directory run `npx @freesewing/new-design`.

After you've answered [some questions](#questions), it will take a while to set everything up.
When it's done, you will have a new folder with the development environment inside.

<Tip compact>The folder will have the name you chose above.</Tip>

<Note>
### Questions

#### What template to use

Use `From scratch` unless you want to start from our of our blocks:

- Use `Extend Brian` to start from [Brian](https://freesewing.org/designs/brian)
- Use `Extend Bent` to start from [Bent](https://freesewing.org/designs/bent)
- Use `Extend Bella` to start from [Bella](https://freesewing.org/designs/bella)
- Use `Extend Breanna` to start from [Breanna](https://freesewing.org/designs/breanna)
- Use `Extend Titan` to start from [Titan](https://freesewing.org/designs/titan)

#### What name to use

This will become the name of your design. Stick to \[a-z] here to avoid problems.

If you're not certain what to pick, just mash some keys, it doesn't matter.

#### What package manager to use

You may wish to choose `yarn` since that is the package manager
that we use when doing work in the monorepo,
and many of our tutorials are written to use `yarn`.
However, it doesn't really matter.
You can choose either `yarn` or `npm` as you wish.

</Note>

## Start the development environment

You will have a new folder that has the name you picked for your design.
If you chose `test`, you will have a folder named `test`.
If you chose `banana`, you'll have a folder named `banana`.
(Within this new folder, the `design` subfolder holds your design's configuration file and source code.
You can ignore all other subfolders and files; they are part of the development environment.)

To start the development environment, navigate to the folder that was created
and run `yarn dev` (or `npm run dev` if you're using npm as a package manager).

Then open your browser and go to http://localhost:8000

<Tip>
The development environment will watch for any changes you make to
the pattern's source code or configuration.
When you do, it will update automatically in your browser.
</Tip>

<Note>

##### Yay, you're done!

All you have to do now is design your pattern.
Thankfully, we have a tutorial for that too:

- [Pattern design tutorial](/tutorials/pattern-design/): A step-by-step guide to designing your first pattern

</Note>
