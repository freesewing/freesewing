# Contributing to FreeSewing

First off, 
thank you for being part of the freesewing community,
and for taking the time to contribute! ❤️  

The following is a set of guidelines for contributing to FreeSewing.
These are mostly guidelines, not rules. 
Use your best judgment, and feel free to propose changes to this document in a pull request.

## Code of Conduct

When you engage with us, or when you engage with others, 
please remember [the FreeSewing community standards](https://freesewing.org/docs/about/community-standards/).

As a contributor, you are also expected to uphold [the FreeSewing Code of Conduct](https://freesewing.dev/contributors/code-of-conduct/). 

<Tip>

##### See something, say something

Please report unacceptable behavior to [us@freesewing.org](mailto:us@freesewing.org).

</Tip>

## I don't want to read this whole thing I just have a question!

Please don't file an issue to ask a question. 
You'll get faster results by contacting us on Discord.
You can get to our Discord server via https://discord.freesewing.org/. 

Please keep in mind that our community members live all over the world. 
So what's daytime for you might be the middle of the night for others.
Please be patient. Sooner or later, somebody will answer.

## What should I know before I get started?

FreeSewing is not a small open source project -- with a dozen repositories and more than 60 packages.

When you initially consider contributing to FreeSewing, you might be unsure about which of the repositories implements the functionality you want to change or report a bug for. 
This section should help you with that.

### FreeSewing repositories

The most important repositories are these:

 - [`freesewing`](https://github.com/freesewing/freesewing): Our monorepo holding all our NPM packages. This is also where we triage all issues
 - [`freesewing.org`](https://github.com/freesewing/freesewing.org): The respository holding the source code for freesewing.org, our website for makers
 - [`freesewing.dev`](https://github.com/freesewing/freesewing.dev): The respository holding the source code for freesewing.dev, our website for developers
 - [`markdown`](https://github.com/freesewing/markdown): The repository holding our markdown (and MDX) content for both our websites
 - [`backend`](https://github.com/freesewing/backend): The repository holding the source code for our backend
 - [`svgtopdf`](https://github.com/freesewing/svgtopdf): The repository holding the source code for our on-demand tiler backend
 - [`tile`](https://github.com/freesewing/tile): The repository holding the source code for our command-line tiler

<Note>

We are gradually placing more and more content into our monorepo to minimize overheads.

This is also why we prefer that you [create all issues in our monorepo](https://github.com/freesewing/freesewing/issues/new/choose).

</Note>

### FreeSewing packages

We publish a lot of JavaScript packages on NPM. You can find the full list [in the `packages` folder of our monorepo](https://github.com/freesewing/freesewing/tree/develop/packages).

## How Can I Contribute?

### Showcase our patterns

Anytime somebody has made one of our patterns, we like to showcase it on [freesewing.org](https://freesewing.org/showcase/).

Unpublished showcases are tracked as [GitHub issues](https://guides.github.com/features/issues/). 
Create an issue [in our monorepo](https://github.com/freesewing/freesewing/issues/new?assignees=&labels=%F0%9F%91%8D+good+first+issue%2C+%F0%9F%93%B8+showcase%2C+%F0%9F%A4%97+community&template=showcase-template.md&title=Create+showcase+from+this+content) when you've made one of our patterns, or have came across pictures from another maker who did.

To make sure we can add the showcase, provide the following information:

* **A link to the content** like an Instragram post, or blog post, or anything. You can also attach pictures to the issue itself.
* **Permission to repost**. If you're the original author, please mention that we can repost the images. If you are not the original author, either mention who is (good) or have them leave a comment giving permission to repost the images (best).
* **Include the author's FreeSewing username**. We need this to link the showcase to the author so they will show up on the author's profile page.

### Triage issues

Triaging issues is a great way to get involved FreeSewing. You can do tasks such as:

 - Making sure issues are properly labeled
 - Ensuring they have a good title that explains the issue in brief
 - Assigning issues to people to make sure they are tended to
 - Keeping an eye on stale issues, and either updating or closing them
 - Assigning issues to milestones so we can plan our releases

All FreeSewing contributors have triage permissions that allows them to do this.
If you don't have the rights, or bump into any issues, [reach out to us via chat](https://discord.freesewing.org).

### Reporting Bugs

Bugs are tracked as [GitHub issues](https://guides.github.com/features/issues/). 
Create an issue [in our monorepo](https://github.com/freesewing/freesewing/issues/new?assignees=&labels=%F0%9F%90%9B+bug&template=bug-report.md&title=Bug+report) if you've found one.

Explain the problem and include additional details to help maintainers reproduce the problem:

* **Use a clear and descriptive title** for the issue to identify the problem.
* **Describe the exact steps which reproduce the problem** in as many details as possible. 
* **Include relevant information** such as your username on the site, or the person you draften a pattern for.

Provide more context by answering these questions:

* **Did the problem start happening recently** (e.g. it worked fine before but since the latest update it doesn't)
* **Can you reliably reproduce the issue?** If not, provide details about how often the problem happens and under which conditions it normally happens.

### Suggesting Enhancements

This section guides you through submitting an enhancement or feature request for FreeSewing, including completely new features and minor improvements to existing functionality. 
Following these guidelines helps maintainers and the community understand your suggestion :pencil: and find related suggestions :mag_right:.

Enhancement suggestions are tracked as [GitHub issues](https://guides.github.com/features/issues/). 
Create an issue [in our monorepo](https://github.com/freesewing/freesewing/issues/new?assignees=&labels=%F0%9F%92%8E+enhancement&template=feature-request.md&title=Feature+request) if you want to submit one.

* **Use a clear and descriptive title** for the issue to identify the suggestion.
* **Explain why this enhancement would be useful** to other FreeSewing users.

### Your first contribution

Unsure where to begin contributing to FreeSewing? 
You can start by looking through the issues labeled [good first issue](https://github.com/freesewing/freesewing/issues?q=is%3Aissue+is%3Aopen+label%3A%22%F0%9F%91%8D+good+first+issue%22).

Don't be afraid to take on an issue. If you get stuck, [we'll help you out](https://discord.freesewing.org/).


<ReadMore />
