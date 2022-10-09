---
title: Files and folder structure
order: 110
---

Inside out `tutorial` folder, the `design/src` folder holds the source code for
the new pattern we will create.

You can safely ignore all other files and folders, as they are part of the
FreeSewing development environment.
So feel free to skip ahead to [Your first part](/tutorials/pattern-design/your-first-part).

## Notes

If you'd like to learn about those other files and folders, here's what they do:

### folders

- `design`: Holds the source code for your design
- `lab`: Holds [React][react] hooks and components specific to the development environment
- `node_modules`: Holds installed dependencies
- `pages`: Holds [NextJS][next] client-side routes, aka pages
- `public`: Holds pregenerated translation files
- `shared`: Holds files from FreeSewing's shared codebase for frontend development

### files

- `next.config.mjs`: The [NextJS][next] configuration file
- `next-i18next.config.js`: The configuration file for [next-i18next][i81n] which handles translation within NextJS
- `package.json`: Every NodeJS project has a [package.json][pkg] file which holds important metadata and lists dependencies
- `package-lock.json`: This *lockfile* will only exist if you use the npm package manager
- `postcss.config.js`: Configuration file for [PostCSS][postcss], a tool to transform CSS with Javascript
- `tailwind.config.js`: Configuration file for the [TailwindCSS][tailwind] framework
- `yarn.lock`: This *lockfile* will only exist if you use [the yarn package manager][yarn]

[next]: https://nextjs.org/
[tailwind]: https://tailwindcss.com/
[postcss]: https://postcss.org/
[yarn]: https://yarnpkg.com/
[pkg]: https://docs.npmjs.com/cli/v8/configuring-npm/package-json
[react]: https://reactjs.org/

