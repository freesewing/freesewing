---
title: Getting started with Vercel
order: 14
---

## What is Vercel?

Vercel is an online service that builds and deploys web apps and
websites.
It allows you to preview designs you are working on and changes
you are making to the FreeSewing app and websites.
By sharing links to your builds/deployments, other people can also
preview your work.

Vercel offers a free "Hobby" account for personal, non-commercial use,
so everyone is able to use it.

<Note compact>
This tutorial assumes that you already have a GitHub account
containing a fork of the FreeSewing repository.
</Note>

## Why you might want to use Vercel

There are reasons why you might want your own Vercel account:
- You can preview your changes:
  - if you develop on a mobile device or if you do not have access to a
    computer.
  - without having to set up and maintain development environments on your
    own computer.
  - without having to manually rebuild your development environments each
    time there is a code change.
- You can more easily share your work with others.

However, it is not necessary to have your own Vercel account.
Because we use Vercel to preview pull requests, if you always submit your
work to the main repository then you will be able to share your work without
needing to use Vercel yourself.

## About repositories, projects, and deployments

Vercel works through _repositories_, _projects_, and _deployments_.

_Repositories_ are simply Git repositories, for example your personal
fork of the FreeSewing repository.
You will select the repositories you wish to import into Vercel.

Within each repository there can be multiple projects.

_Projects_ are specific build types for the repository.
For example, one project in your FreeSewing repository could
be the one that builds the lab.freesewing.dev website.
You would use this project to test new designs or changes
to existing designs.
Another project could be the one that builds the freesewing.org
website, used to test changes to that website.

<Tip compact>
Free Hobby accounts are limited to 3 Projects per Git repository.
</Tip>

Under each project there will be many, many deployments.

_Deployments are simply builds, an instance of a website/app
built from a specific commit version of a specific branch of the repository.
These deployments can be accessed using a web browser to preview
the web app or website.

Vercel automatically builds a deployment for every push or update
you make to every branch in your repository.
The reason why Vercel builds these deployments automatically is so you
will always have the latest version available to test without
having to think about it or do any additional work.
The reason why Vercel builds a deployment for every push and update
is so you have the ability to easily test different versions, past
and current.
This ability can help you identify what code change might have introduced
an issue or change in behavior.

<Tip>

Don't worry about all of these deployments, many or most of which
you might never actually use.
Deployments are free, even the unused ones.
As Vercel itself says if you request to delete a deployment:
_Deployments that are not actively receiving any traffic do not
generate any costs nor count towards any limits._

It is Vercel's intention that there should be no need to delete
deployments.
Instead, they intend that almost all deployments will simply be left
to exist, even the unused ones.
(Because of this there are no retention periods or simple ways to
delete multiple deployments all at once.)

</Tip>

## Creating an account

You will need to sign up for a Vercel account.
Luckily, you can simply sign up using your GitHub
account/credentials without having to create a separate username
or password.

1. On the [Vercel website][v] select the "Sign Up" button.
(A shortcut URL is: [https://vercel.com/signup][vsu].)
2. Select the "Continue with GitHub" button.
3. A pop-up window will appear asking you for permission to access
your GitHub information.
Press the green "Authorize Vercel" button to continue.

[v]: https://vercel.com
[vsu]: https://vercel.com/signup

## Importing a repository

After you create your account you will then see an "Import Git Repository"
screen.
The default listed is likely to be the actual `freesewing/freesewing`
repository owned by FreeSewing.
However, you should instead import your own personal fork of the
FreeSewing repository.

1. In the dropdown menu, select "Add a GitHub Account".
2. Select your personal GitHub acccount from the list.
3. Select the "Only select repositories" radio button.
4. In "Select repositories" drop-down menu, select your `freesewing`
repository.
5. Click the green "Install" button.
6. Confirm that you are giving permission to access the repository
by entering your GitHub password.
7. Finally, back at the Import Git Repository screen complete the
import by selecting the white "Import" button.

## Creating a project

You will next be taken to the Configure Project page where you can
create a project.

By default, the default Root Directory will be `sites/dev`.
The Root Directory setting will determine the build type for the project.
- `sites/dev` will build a freesewing.dev website
- `sites/org` will build a freesewing.org website
- `sites/lab` will build a lab.freesewing.dev website/app

1. Change the name of the project, if you wish.
Names can consist of alphanumeric lowercase and hyphen characters.
2. Change the Root Directory to the desired setting, as described above.
3. In the Build & Development Settings,
add `yarn build` as the Build Command override.
(All the other settings will work fine with the default values.)
4. Press the white "Deploy" button.

Vercel will then create the project and start building the project's first
deployment based on the current `develop` branch.
Once the build completes (in about 3-4 minutes or so)
you will see a Congratulations page, with a preview image of the
website home page.

## About deployments

As mentioned previously, Vercel will eventually create and build many
deployments for your project.
One is known as the _production deployment_, based on the configured Production Branch of the repository (by default the branch named `main`).
All other deployments are referred to as _preview deployments_, including
ones based on the `develop` branch
(unless you change the Production Branch in the Project Settings to
`develop` instead of `main).

Created deployments include:
1. The initial production deployment. (Because you don't have a branch named
`main` in your repository, Vercel will instead create the initial
production deployment from the default `develop` branch.)
2. A new preview deployment every time you update your `develop` branch in GitHub
(for example, whenever you sync it with the latest `freesewing/freesewing`
updates)
3. A new preview deployment for every new branch you push to GitHub
4. A new preview deployment for every update you make to these new branches
when you push to GitHub
5. A new preview deployment for every update you make to your existing branches
when you push to GitHub

If you have multiple projects for the same repository
(for example, if you have both `sites/lab` and `sites/dev` projects),i
then multiple deployments will be created everytime you push to GitHub.

Deployments are automatically created by Vercel.
However, because free Hobby accounts are limited to 1 concurrent
build, new deployments might be queued before they start building.
Once they start, deployments take 3-4 minutes or so to build.

## The Vercel Dashboard

You will manage your account and projects from the Vercel Dashboard
page, [https://vercel.com/dashboard][vd].

The default __Overview__ tab at the top of the Dashboard page will show your repositories
and projects.
Click on a project name to go to its project page.

[vd]: https://vercel.com/dashboard

## Project pages

The default __Project__ tab at the top of the project page will show the
the production deployment and some of the most recent preview
deployments for that project.

Click on the __Deployments__ tab to see all of the project's deployments.
Click on a deployment name to go to its deployment page.

## Deployment pages

On the default __Deployment__ tab at the top of the deployment page
you will see information about the deployment.

Under __Domains__ you will see one or more URLs that can be used to
access the deployment.
These are also the URLs that you can share with others so they
can view your deployments.
- URLs containing hash characters link to the deployment for a single
commit.
- URLs without a hash point to the deployment for the latest version
of that branch.

If you ever want to delete a deployment you can do so on its
deployment page, under the __...__ three dots menu.

## Usage and Billing

Verce's free Hobby accounts come with
100 GB of bandwidth and 100 hours of build time each month.
This should be at least 10-15x the amount you will actually use in
a month, so do not worry about this.

If you want to check your usage, please seee the __Usage__ tab at the
top of the Dashboard page.
- A shortcut URL is [https://vercel.com/dashboard/usage][vu]
- Or, [https://vercel.com/account/billing][vb] will show a summary
of your usage.

[vu]: https://vercel.com/dashboard/usage
[vb]: https://vercel.com/account/billing
