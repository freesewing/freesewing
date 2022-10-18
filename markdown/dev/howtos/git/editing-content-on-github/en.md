---
title: Editing freesewing content on GitHub
---

## Introduction

This 'How to' is designed to help get you started editing content using the
[GitHub website](https://github.com/freesewing).

GitHub stores a lot of Freesewing content, it allows anyone to suggest
edits, and helps the contributors to review and implement approved changes.

If you are new to GitHub, you will need to [create an
account](https://github.com/signup?user_email=\&source=form-home-signup)
(they are free).

<Note>
It is also possible to make changes using the GitHub desktop
application and/or your computer's command line; these advanced topics are
beyond the scope of this 'How to'.
</Note>

All pattern instructions and web pages (including this 'How to') are written in
_Markdown_. Please see our [Markdown
guide](https://freesewing.dev/guides/markdown) for more information on this.

For security, most contributors don't have permission to change the code.
Instead we must follow three steps to make edits:

1. [_Fork_ (create a copy of) the repository](#fork-the-repository).  This will
   be your own copy and you can make all the changes you want.
2. [Make the edits](#make-the-edits).
3. [Save your edits and submit a _pull
   request_](#save-your-edits-and-submit-a-pull-request) to let the admins know
   about your changes. This says _"hey, I made some changes. I think you might
   like them and consider them for inclusion into your (original) repository."_

The GitHub documentation provides a more [detailed
explanation](https://docs.github.com/en/get-started/quickstart/fork-a-repo),
but this guide should be enough to help you get started.

## Fork the repository

- On GitHub.com, navigate to the freesewing
  [repository](https://github.com/freesewing/freesewing)
- In the top-right corner of the page, click **Fork**
![Fork button](fork_button.png)
- Click the **Create fork** button.
![Create fork button](fork-create-button.png)

## Make the edits

- Navigate to the folder containing the file that you want to edit.

To help you understand how the repository is organised, here is the path to the
Simone instructions:
`freesewing/markdown/org/docs/patterns/simone/instructions`  This folder
contains several files, one for each language.
![Path to Simone instructions](simone-instructions-path.png)

- Select on the file you want to update. 

<Warning>
  
Please only edit the English language files (called `en.md`), 
our translation software will handle the other languages. 
Read more about translations in our [translation guide](/guides/translation).
  
</Warning>
- Click on the **Edit** button.
![edit button image](edit-button.png)

<Note> 
Clicking **Preview** will show what your changes will look like.  

![Edit and preview buttons](edit-preview-buttons.png)  
</Note>

## Save your edits and submit a pull request

When you are happy with your edits:

- Scroll to the bottom of the page and enter a brief description of your edits.
  This will help us know what has changed.
- Click the **Commit changes** button. This is similar to saving a snapshot of
  your edits. 
  ![Commit changes](commit-changes.png)

Now you will create a _pull request_ to let the admins know your edits are
ready for review:

- Navigate to the repository where you created your fork.
- Above the list of files, click the **Pull request** button. 
![Pull request button](pull-request-button.png)

Congratulations - you have just submitted your first edits to the site
maintainers!

You can keep track of the progress of your changes in GitHub or in the
[github-updates
channel](https://discord.com/channels/698854858052075530/836689608820916234) on
our Discord server.
![github updates channel image](discord-github-updates.png)
