---
title: Getting started with Codespaces
order: 13
---

<Note>
This documentation assumes that you have a GitHub account with
a repository forked from `freesewing/freesewing`.
</Note>

## What is Codespaces?

[GitHub Codespaces][ghcs] (Codespaces) is an online service from
[GitHub][gh] that allows you to edit files and run computer programs
via a web browser.
The files and computer programs are hosted on and run from a remote
server run by GitHub.

[gh]: https://github.com
[ghcs]: https://github.com/features/codespaces

For FreeSewing, you can use Codespaces to edit our repository files to
modify existing designs, add new files to create new designs, and run
the FreeSewing lab website so you can test designs.
You can also edit, add, and test documentation files in Codespaces.
Because all of this is is done online via a web browser, you do not need
to have or use your own computer to perform this development work.

## Accessing Codespaces

Access Codespaces from the GitHub website while logged in:
- The "Your Codespaces" page is accessed via the "Codespaces" link at the top
of any GitHub page.
- A shortcut URL is: https://github.com/codespaces

## Creating a codespace

To create a new codespace:
- Select the "New codespace" button at the top of the Your Codespaces page.
- A shortcut URL is: https://github.com/codespaces/new

This will open a "Create a New Codespace" page.

On the Create a New Codespace page, select the options for your codespace:
- Repository -> ("`username/freesewing`" assuming that is the name of your GitHub repository)
- Branch -> (select the branch you want to use)
- Region -> (select the region most appropriate for you)
- Machine type -> (choose "2-core")
- Press the "Create codespace" button.

The Codespaces app will open in the browser window.
The Codespaces app is basically the [Visual Studio Code][vs] app with
Codespaces and GitHub integration built in.

[vs]: https://code.visualstudio.com

(Wait 45 seconds or so for the Codespace app to clone the repository from
GitHub to the codespace repository and start.)

## Editing files

You can browse and edit files in your codespace repository from within the app:
- On the Activity Bar on the far left side of the page, select the
  Explorer icon.
  (The icon looks like two pages of paper.)
- Use the Explorer sidebar to browse your repository and select a file to edit.
- Edit the file in the main window of the app.

## Saving, committing, and pushing changes

Auto-save is enabled by default, so any changes you make are
automatically saved in your codespace repository.

To commit changes to your codespace repository:
- In the Activity Bar on the far left side of the page,
  select the Source Control icon.
- In the Source Control sidebar you can see a list of changed files.
- Press the "+" plus icon next to a file to stage it in preparation to
  commit.
- Type a commit message in the text box and press the "Commit" button.
  This commits the staged files to your codespace repository.

To push committed changes from your codespace repository back to your
GitHub repository:
- After committing changes to your codespace repository, press the
  "Sync Changes" button to push the committed changes to your GitHub
  repository.
- There is also an "..." ellipses menu at the top of the Source Control
  sidebar that you can use.
  Select the "Push" menu item.

## Running the lab, dev, and org websites

In the "Terminal" panel at the bottom of the page, you can run commands.

To start the lab website (to view and test new designs and design changes):
- In the Terminal panel, run `yarn kickstart` and then `yarn lab`.

To start the dev or org websites (to view and test documentation changes):
- dev: In the Terminal panel, run `cd sites/dev` and `yarn start`.
- org: In the Terminal panel, run `cd sites/org` and `yarn start`.

After the lab, dev, or org website starts:
- The usual `localhost:8000` port will automatically be forwarded to a custom
  URL.
- A pop-up will appear saying that the port has been forwarded. The "Open in
  browser" button on the pop-up will open a new browser tab/window with the
  custom URL.
- You can also access the custom URL via the "Ports" panel.

<Tip>

An example of a custom URL: `https://username-ominous-space-waffle-rwpgzw5q15vqc52q9-8000.preview.app.github.dev/`
</Tip>

## To make a website publicly available

Forwarded ports are private by default.
The custom URL page is accessible only to you, the GitHub user
who owns the codespace, while you are logged into your GitHub account.
However, you can make the port public so others can access it
(or so you can access it on a different browser while not logged into GitHub).

To make the port public:
- In the Ports panel, right-click on the port and select
  Port Visibility -> Public.
- The custom URL will be now be a publicly-accessible forwarded port.
  You can copy and share the custom URL.

## Starting and stopping a codespace

You can start and stop your codespace via the Your Codespaces page.
- To start: Click on the codespace name to browse to the Codespaces
  app URL for that codespace.
  (You can also right-click to copy the URL and open it in a
  different browser window.)
- To stop: Open the "..." ellipses menu next to the codespace
  and select "Stop codespace".

<Warning>
Codespaces continue to run unless explicitly stopped or the idle timeout is
reached.
(Closing the Codespaces app window does not stop the codespace.)
</Warning>

## Renaming a codespace

Each new codespace is generated with a random name.
You can rename a codespace to make it easier to identify.
(This will help if you have more than one codespace.)

To rename a codespace:
- Go to the Your Codespaces page. 
- Open the "..." ellipses menu next to the codespace
  and select "Rename".

## Codespaces settings

You can access GitHub Settings via the user icon menu in the upper right
corner of any GitHub page (but not on the Codespaces app page).
- Selecting the "Settings" menu item will open the GitHub Settings page.
- The Codespaces settings are under "Codespaces" in the left sidebar
on the Settings page.
- A shortcut URL is: https://github.com/settings/codespaces


Among the Codespaces settings available are:
- "Default idle timeout" (how long codespaces continue to run when idle,
     before being stopped)
- "Default retention period" (how long codespace repositories are kept
     when unused, before being deleted)

<Note>
Do not be confused by the other Settings icon/menu at the bottom left of the
Codespaces app page.
That is where settings for the Codespaces app and Visual Studio Code editor
are located.
</Note>

## Usage and Quotas

To check usage:
- Usage information is under "Billing and plans" in the left sidebar on
  the Settings page.
- A shortcut URL is: https://github.com/settings/billing

About quotas:
- As a free account user, you have a quota of 120 core-hours of usage
  and 15 GB of storage per billing month.
  That is the total for all your codespaces combined.
- However, because your codespace uses a 2-core machine, you effectively
  have only 60 hours of usage per month.
- (You can also select a 4-core machine for your codespace, but that
  would reduce the effective usage quota to only 30 hours per month.)
- You will receive email notifications and and _toast_ messages in the
  Codespaces app when you have used 75%, 90%, and 100% of your quotas.
- Quotas reset each month at the start of your account's billing cycle.
  (Billing cycle start/end dates are different for each user.)

<Warning>
Storage used by a codespace is counted against the quota regardless of
whether the codespace is running or stopped. If you are no longer
actively using a codespace, you may want to delete it so its storage
no longer continues to count towards your quota.
</Warning>

<Tip>
Don't worry -- you won't get a bill if you exceed your quota!
Instead, you will just be unable to start any of your codespaces
until the start of the next billing month.
And, if you have any work-in-progress changes that you need access to
before then, you can export those changes to a new GitHub branch. 
</Tip>

## Deleting a codespace

To delete a codespace:
- Go to the Your Codespaces page.
- Open the "..." ellipses menu next to the codespace
  and select "Delete".

<Related>
For more information, please see:
- [GitHub Codebases documentation](https://docs.github.com/en/codespaces).
- [About billing for GitHub Codespaces](https://docs.github.com/en/billing/managing-billing-for-github-codespaces/about-billing-for-github-codespaces)
</Related>
