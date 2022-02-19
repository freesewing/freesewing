---
title: Getting started on Windows
order: 30
for: developers
icons: 
  - start
  - windows
about: |
  You'll learn how to setup Node JS on a Windows system, 
  as well as initialize the FreeSewing development environment.
goals:
  - Install Node JS using nvm
  - Chosing a Node version to use
  - Initializing the FreeSewing development environment
  - Starting the FreeSewing development environment
---

## Setting up a development environment using Windows Subsystem for Linux (WSL) and Visual Studio Code (VSCode)

If you already have a working WSL environment and VSCode Remote configured you can follow the [getting started on Linux guide](/tutorials/getting-started-linux) or skip ahead to [Setting up the FreeSewing development environment (WSL)](#setting-up-the-freesewing-development-environment-wsl). If not, the following process is very similar but has some differences to avoid quirks specific to this environment.

Windows Subsystem for Linux allows you to run a Linux distribution as a development environment, with enough functionality to develop a FreeSewing pattern. While this approach offers some advantages this is not strictly necessary to develop patterns on Windows. If you would prefer a simpler setup process refer to [Setting up a development environment in Windows](#setting-up-a-development-environment-in-windows).

Installing and using an IDE is optional, you can skip that step or use a different editor if you'd like. This guide suggests VSCode as it is freely available on multiple platforms and provides enough functionality to build the FreeSewing project.

### Install WSL

<Warning>
This guide uses WSL version 2, which requires installing the Hyper-V virtualisation system. If you have another virtualisation system installed (such as VirtualBox or VMWare) you may run into conflicts which require either updating that system to a version which can use the HyperV backend or porting your existing machines to use HyperV.
</Warning>

Follow the [Windows Subsystem for Linux Installation Guide for Windows 10](https://docs.microsoft.com/en-gb/windows/wsl/install-win10) (requires a recent version of Windows 10).

#### Install NVM

Open a new WSL terminal from the shortcuts created or by searching for "WSL Terminal" in the start menu.
[Install NVM by following the NVM setup guide](https://github.com/nvm-sh/nvm#install--update-script).
Once installed you will need to activate NVM by either following the instructions printed to the screen or opening a new terminal.

#### Install Node (and optionally Yarn)

Now that you have NVM installed, you can install node. The latest version can be installed using `nvm install default`. You can also install a specific version using `nvm install v12.16.1`. For the purposes of debugging it can be useful to have the same version of node installed as the main project uses, which you can then activate using `nvm use <version>`. You can determine what version the FreeSewing project uses by checking [freesewing/freesewing/.node-version](https://github.com/freesewing/freesewing/blob/develop/.node-version).

<Warning>
At the time this guide was written the latest version of node/npm has a bug in the dependency resolution process which causes the freesewing project to fail to build. Use the latest LTS version (currently 14.15.4) or the specific version used by the main project to avoid this issue.
</Warning>

Node comes with the Node Package Manager (npm) by default which can be used to set up the project. The default package manager uses a fairly simplistic aproach to dependency resolution which can make builds take a long time. Yarn is an alternative package manager which makes builds faster, especially for monolithic projects like FreeSewing. If you'd like to install yarn run `npm install yarn -g` (optional).

#### Install and configure Git (recommended)

The create-freesewing-pattern script will attempt to create a git repository as part of the setup. It's not strictly required to have git installed in the WSL environment but you will get errors during the project setup process if it isn't installed or configured correctly. As such it's recommended to have git installed on the WSL environment even if you're going to be using a GUI client from the windows side.

```bash
sudo apt install git
git config --global user.email "<the email address you use for your git account>"
git config --global user.name "<your display name for your git account>"
```

### Install VSCode (optional)

[Download and install VSCode](https://code.visualstudio.com/).

<Note>

FreeSewing uses .editorconfig files to enforce a consistent style for the project. VSCode relies on extensions to provide this functionality and due to a design shortcoming it does not respect certain editorconfig options which will break certain files in the freesewing project ([see vscode/65663 for details](https://github.com/microsoft/vscode/issues/65663)). If you use this editor please ensure that your settings.json file is configured to not trim trailing whitespace from markdown files. The following snippet can be added to your settings.json file to add an exemption for this file type:

        "[markdown]": {
            "files.trimTrailingWhitespace": false
        },

</Note>

#### Install VSCode Remote

In order to be able to use VSCode's IDE features (such as the built in terminal) and also make use of the node installation we set up in the previous steps you will need to install VSCode Remote so that VSCode can make use of the linux environment. [Follow the getting started guide for VSCode Remote](https://code.visualstudio.com/docs/remote/wsl) (If you've been following this guide you have already done steps 1 and 2, you will only need to install the [remote development extension](https://aka.ms/vscode-remote/download/extension))

### Setting up the FreeSewing development environment (WSL)

If you've chosen to use VSCode as your IDE open VSCode, and inside VSCode open the folder you wish to contain the pattern (e.g. `documents/my-freesewing-patterns`). Ensure VSCode Remote is active then open a terminal (this will automatically set your working directory to the folder open in VSCode) and run `npx create-freesewing-pattern`. If you are using a different IDE or just wish to use a bare terminal then you will need to navigate to the folder and run the same command.

This script will prompt you for certain options. Only "Pattern name" is mandatory, the other prompts are optional and/or suggest sensible defaults. You can change all of these later. It's just to get you started. If you're not sure what to fill in you can stick with the defaults or leave them blank.

-   **Language**: Use the arrow keys to chose the language of your choice
-   **Pattern name**: This will be the name of your pattern, but also the name of the folder we'll setup for you. If you're just kicking the tires, something like `test` will do you fine.
-   **description**: A description of your pattern. It's not mandatory.
-   **Pattern type**: Use the arrow keys to chose either `block` or `pattern`. Choose `pattern` if you're not sure what to pick.
-   **department**: Use the arrow keys to pick a department like `menswear`, `womenswear` or `accessories`. This is is only relevant if you decide to publish your pattern later. But by that time you will have learned how to change this.
-   **Author**: You can enter your name, or leave this blank for now.
-   **GitHub repository**: You can leave this blank for now.
-   **Package manager**: Choose either `npm` or `yarn` as your package manager. If you're not sure, pick `npm`.

### Start the development environment (WSL)

After this process completes you will be ready to run the development environment.

Navigate to the `example` folder and run `npm start`/`yarn start` to launch the development environment.

<Note>
Your browser will not automatically open if you are running the freesewing example application inside the WSL environment. You will need to navigate to the URL shown in your browser manually (your terminal may let you click on the link to open it).
</Note>

## Setting up a development environment in Windows.

### Install NVM

While node can be installed directly on Windows, we strongly recommend using a version manager such as [Node Version Manager for Windows](https://github.com/coreybutler/nvm-windows/releases/latest). That link will take you to the latest release which provides an installer you can download and run. Once nvm-windows is installed you will be able to continue with the rest of this process.

### Install node

Open a Powershell terminal or command prompt. Run `nvm ls available` to show versions that can be installed. Choose the appropriate version (you should use the same version as the freesewing project or latest LTS version) then run `nvm install 14.15.4` and `nvm use 14.15.4` (where `14.15.4` is the full version string of the version you wish to use) to activate the newly installed version. You will receive a prompt for elevated permissions and will need to accept it in order to activate the new version of node.

<Warning>
At the time this guide was written the latest version of node/npm has a bug in the dependency resolution process which causes the freesewing project to fail to build. Use the latest LTS version (currently 14.15.4) or the specific version used by the main project to avoid this issue.
</Warning>

Node comes with the Node Package Manager (npm) by default which can be used to set up the project. The default package manager uses a fairly simplistic aproach to dependency resolution which can make builds take a long time. Yarn is an alternative package manager which makes builds faster, especially for monolithic projects like FreeSewing. If you'd like to install yarn run (`npm install yarn -g`) (optional).

### Setting up the FreeSewing development environment

Open a terminal, then navigate to the folder you wish to contain the pattern (e.g. `D:\Documents\my-freesewing-patterns`). Inside this directory run `npx create-freesewing-pattern`.

This script will prompt you for certain options. Only "Pattern name" is mandatory, the other prompts are optional and/or suggest sensible defaults. You can change all of these later. It's just to get you started. If you're not sure what to fill in you can stick with the defaults or leave them blank.

-   **Language**: Use the arrow keys to chose the language of your choice
-   **Pattern name**: This will be the name of your pattern, but also the name of the folder we'll setup for you. If you're just kicking the tires, something like `test` will do you fine.
-   **description**: A description of your pattern. It's not mandatory.
-   **Pattern type**: Use the arrow keys to chose either `block` or `pattern`. Choose `pattern` if you're not sure what to pick.
-   **department**: Use the arrow keys to pick a department like `tops`, `bottoms` or `accessories`. This is is only relevant if you decide to publish your pattern later. But by that time you will have learned how to change this.
-   **Author**: You can enter your name, or leave this blank for now.
-   **GitHub repository**: You can leave this blank for now.
-   **Package manager**: Choose either `npm` or `yarn` as your package manager. If you're not sure, pick `npm`.

### Start the development environment

After this process completes you will be ready to run the development environment. In the current terminal (or a new window if you prefer) you will need to build the package. Navigate to the folder you created during the previous step (whatever you provided for the "Pattern name" option) and then to the `example` folder inside this folder, then run `npm start` or `yarn start` depending on the build system you chose. This will build the pattern package which is used by the development instance, build the example application, and start a local web server instance so you can test your changes.
