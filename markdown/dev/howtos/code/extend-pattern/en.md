---
title: Create a new design based on an existing design
---

<Note>

##### See this example in our source code

- [packages/aaron/config/index.js](https://github.com/freesewing/freesewing/blob/72f34101792bda4d8e553c3479daa63cb461f3c5/packages/aaron/config/index.js#L34)
- [packages/aaron/src/index.js](https://github.com/freesewing/freesewing/blob/72f34101792bda4d8e553c3479daa63cb461f3c5/packages/aaron/src/index.js#L2)
- [packages/carlita/src/index.js](https://github.com/freesewing/freesewing/blob/8474477911daed3c383700ab29c9565883f16d66/packages/carlita/src/index.js#L25)

</Note>

## Setup

To be able to extend existing patterns, you will have to access them on your local machine. There are two ways to do this:

- add needed dependencies when using `npx @freesewing/new-design`
- create your new pattern in a clone of the [freesewing monorepo](https://github.com/freesewing/freesewing)

### When using `npx @freesewing/new-design`

If you want to use one of our blocks, you can simply pick that option when you run `npx @freesewing/new-design`.
Doing so will set everything up for you, so you won't have to worry about a thing.

If you want to extend an existing design, you'll have to do some work yourself.

#### Start from scratch

First step is to spin up the development environment. Pick *from scratch* when prompted:

```bash
npx @freesewing/new-design
```

### Install dependencies

Let's assume you want to extend **Simon**. You will first need to install it as a dependency.
We also need to install **Brian** since Simon is based on Brian:

```bash
npm install --save @freesewing/simon @freesewing/brian
```

This will install both Simon and Brian as a dependency, which you can then access in your pattern.

<Tip>
If the design you extend relies on a design you did not install, error messages will tell you what you are missing
</Tip>

### Import your dependencies

<Fixme>Complete this documentation</Fixme>

### Using the freesewing monorepo

You can use the power of robots to install the needed dependencies if you work in a clone of the [freesewing monorepo](https://github.com/freesewing/freesewing).

- First, clone the monorepo (or your fork of it) to your local machine.
- If you haven't already, now is also a good time to create a feature branch so that you don't work directly in the `develop`-branch of the git-repository: `git checkout -b mycoolnewpattern` (adjust name accordingly).
- Go to the root and run `yarn kickstart`. This will take a while, so grab a coffee and come back later.
- Once that is done, edit the file `config/descriptions.yaml` to include the name and description of your new pattern (take care to start the description with `A FreeSewing pattern`).
- Create a folder for your new pattern in `packages`.
- Run `yarn reconfigure`. This will read the changes in `config/descriptions.yaml` and create the needed files in your new folder.
- You can now start the actual pattern design work (i.e. editing and adding `src` and `config` files for your pattern.
- For dependencies, configure them in `config/dependencies.yaml`.
- Run `yarn reconfigure` again, and the magic will make sure that your `package.json` is updated accordingly.
- You can set yourself as an author in `config/exceptions.yaml`, and - you guessed it - run `yarn reconfigure` again.
- To spin up the development environment, you also need to run `npm install` (or `yarn install`) in the `example`-folder of any pattern you want to work on. (This is because the neccessary `node_modules`-folder is excluded from the git-repository.)

Now you can work on extending existing patterns into something new and exciting. And the best part about using this method is that making a pull request will be much easier once you're done developing your new pattern.

## Examples

The example below is from Aaron, which is based on Brian.

Brian has a part called `base` that is hidden by default.
We will use this part as a dependency, and also hide it.

This is what it looks like in the Aaron config file:

```js
  dependencies: {
    front: 'base',
    back: 'front'
  },
  inject: {
    front: 'base',
    back: 'front'
  },
  hide: ['base'],
```

And here is the code:

```js
import freesewing from '@freesewing/core'
import Brian from '@freesewing/brian'
import plugins from '@freesewing/plugin-bundle'
import config from '../config'
// Parts
import draftBack from './back'
import draftFront from './front'

// Create design
const Pattern = new freesewing.Design(config, plugins)

// Attach draft methods to prototype
Pattern.prototype.draftBase = function(part) {
  // Getting the base part from Brian
  return new Brian(this.settings).draftBase(part)
}
Pattern.prototype.draftFront = part => draftFront(part)
Pattern.prototype.draftBack = part => draftBack(part)

export default Pattern
```

If you have a lot of parts to inherit, you can create a loop like in this
example from Carlita:

```js
// Attach draft methods from Carlton to prototype
for (let m of [
  'draftBack',
  'draftTail',
  'draftTopSleeve',
  'draftUnderSleeve',
  'draftBelt',
  'draftCollarStand',
  'draftCollar',
  'draftCuffFacing',
  'draftPocket',
  'draftPocketFlap',
  'draftPocketLining',
  'draftChestPocketWelt',
  'draftChestPocketBag',
  'draftInnerPocketWelt',
  'draftInnerPocketBag',
  'draftInnerPocketTab'
]) {
  Pattern.prototype[m] = function(part) {
    return new Carlton(this.settings)[m](part)
  }
}
```
