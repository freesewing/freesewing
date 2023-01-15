---
title: How to edit website files
order: 500
---

If you are making a quick and simple edit in a single file, you can
simply follow the [Quick edits](#Quick-edits) instructions below.

Additional information is provided for those making more substantial
edits and changes.

## Quick edits

1. Find and edit the file for the web page in the
[GitHub repository][gh].
   - Navigate to the `en.md` file in GitHub.
   - Press the "pencil" icon to switch to the file edit screen.
   - Make your changes.
2. Use the the "Propose changes" section to document and save the changes.
   - Write a short title for the changes you made,
     example: "Corrected typo.".
   - (Optionally, provide an extended description if you feel additional
     explanation would be helpful.)
   - Press the green "Propose changes" button to save.
     (This will create a new branch in your personal GitHub repository
     to hold the changed file.)
3. Create a Pull Request (PR) to request that we merge your branch into
   the main repository.
   - Press the green "Create pull request" button to switch to the
     submission screen.
   - Add a title for your PR.
     (You can simply use the same title you used in your commit.)
   - (Optionally, add a comment if you feel additional explanation would
     be helpful.)
   - Press the green "Create pull request" button to submit the PR.

That's it!

You can continue checking your GitHub notification page
for updates on your PR.

[gh]: https://github.com/freesewing/freesewing/tree/develop/markdown

## For more substantial changes

For more substantial changes or changes to multiple files, you might
find it easier to download a copy of our repository onto your personal
computer and make the changes there, using the text editor of your choice.

This is similar to how code developers make and submit changes to code
files.
Please see the Code Developers Guide for detailed information about
how to do this.

Additional information for web page writers/editors is below.

## Create or Edit the `en.md` files

You can use any text editor to create and edit web page files.

Our web page files are initially written in the English language, so
create or edit the `en.md` file.

Files for other languages may already exist, for example `fr.md` and `es.md`.
However, you do not need to worry about creating or editing these
other language files.
Instead, they will be created/edited by others during a separate
translation process.
If you would like more information about this process, please see the
Translation Guide.

For the most part, web page files are simple text files with some
formatting done using Markdown.
(The `.md` suffix at the end of the `en.md` filename indicates that the
file contains Markdown.)
Please see the Markdown Guide for more information.

## Edit changelog (optional)

Most website and web page changes will be minor and will not need to
be documented.
However, if you made major additions or deletions, consider
updating the `/config/changelog.yaml` file.
This lets others know about major changes and when they were made.

The `changelog.yaml` file is a text file formatted in YAML.
Please see the YAML Guide.

You can add your changes under the _Unreleased:_ section at the
beginning of the file.

<Tip>
Once a new version of FreeSewing is published,
the `changelog.yaml` file will automatically be used to generate the
`CHANGELOG.md` file.
That is the actual changelog file that people see.
</Tip>

## Test your changes

It is a good idea to test your changes to make sure they appear correct
before committing the changes and submitting a PR.
You will be doing this by publishing a local, temporary website that
contains the changes you made.
This website will be on a local, temporary web server that runs on your
personal computer.

Please see How to Test Changes in the Code Developers Guide for detailed information about how to run the temporary web server. A brief summary is below.

1. Go into either the `/sites/org` or `/sites/dev` directory in your
   repository.
2. Use the `yarn start` command to start the local web server.
3. In your browser, load the
   [`http://localhost:8000`](http://localhost:8000)
   web page to access the local website with your changes.
4. Check the pages you edited to verify that the changes are correct.

When you are done, you can press "Control-C" to stop the local,
temporary web server.

## Commit and submit a PR

Please see How to Commit in the Code Developers Guide.

## What to expect afterward

<Tip>
When a PR is accepted and merged into the repository, the changes do
not automatically and immediately appear on the website!
</Tip>

Website changes occur only after the merged repository changes are
published to the website.
This could happen only every few months or so.
If you have questions about what changes have and have not yet been
published to our websites
or when the next publish is expected to happen, please
[ask on our Discord][discord].

[discord]: https://discord.freesewing.org/
