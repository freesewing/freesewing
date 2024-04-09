---
author: 1
caption: "Picture by Snapwire - Via pexels.com"
date: "2022-01-01"
intro: "I'm not going to do a whole blog post about 2021 stuff because I feel like most of us just sorta want to move on and forget about it, but if you were looking for a longer read, then here's the table of content of our latest newsletter edition that also went out today:"
title: "2021 wrap-up: A new FreeSewing.dev and announcing our bug bounty program"
---



I'm not going to do a whole blog post about 2021 stuff because I feel like most of us just sorta want to move on and forget about it, but if you were looking for a longer read, then here's the table of content of [our latest newsletter edition](/newsletter/2022q1/) that also went out today:

- 🎉 2021 is salted and burned
- 🧐 What our contributors have been up to in 2021
- 🎖️ FreeSewing is now an 'all contributors' project
- 🚧 Why version 3 has been put on hold
- 🤓 What I've been up to in 2021
- 🐛 FreeSewing's bug bounty program
- ⛑️ Yearly revenue and where it went (spoiler: same as always)
- 🤞 What I hope will happen this year

Here, I'd like to cherry-pick just those things that I think are exciting right now.

## freesewing.dev has been rebuilt

[The effort I started in the summer](https://freesewing.dev/blog/project-2022) came to fruition on the last day of the year as I deployed the new [freesewing.dev](https://freesewing.dev/blog/project-2022) site in production.

It's a complete redesign, and the code is now [hosted in our monorepo](https://github.com/freesewing/freesewing), which means that [our dedicated repository for freesewing.dev](https://github.com/freesewing/freesewing.dev) has now been archived.

This effort implemented a bunch of items from [our v3 roadmap](https://github.com/freesewing/freesewing/discussions/1278) which has sort of grown into this long list of ideas/plans. From the top of my head:

- Migrate to NextJS
- Better open graph support
- Migrate style to TailwindCSS
- Migrate blog posts and showcase posts to Strapi
- Migrate newsletter to Strapi
- Move markdown content into monorepo & merge Crowdin translation projects
- Add endpoint to backend for auto-generated open graph images

Have all been implemented as a direct result or side effect of this effort. 

This site will also become the blueprint for an overhaul of freesewing.org, something that's on the planning for this year.

## FreeSewing's bug bounty program

Once again, [read our newsletter](/newsletter/2022q1/) for the entire backstory, but here's the gist of it: We are now launching the FreeSewing bug bounty program:

> If you find a bug in one of our patterns, or in our core library, we will (with your permission) add you to our list of contributors, and send you a little something to say thanks.

So keep your eyes peeled, and if something seems off, [let us know about it](https://discord.freesewing.org/) and we'll send you some goodies
