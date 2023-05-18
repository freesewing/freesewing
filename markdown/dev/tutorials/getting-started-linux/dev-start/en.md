---
title: Start the development environment
order: 50
---

FreeSewing provides a development environment to help you design and develop patterns.

There are two ways to run this development environment:

- [**Monorepo development**](#monorepo-development): Use this if you intend to contribute your work to FreeSewing
- [**Stand-alone development**](#stand-alone-development): Use this if you want to do your own thing, and not contribute to FreeSewing

## Monorepo development

Run `yarn lab` to start the development environment:

```bash
yarn lab
```

Then point your browser to http://localhost:8000

<Tip>
### Adding a new design
This is all you need to work on existing designs. If you'd like to add a new design, run:

```bash
yarn new design
```

Just make sure to re-start the lab afterwards with `yarn lab`
</Tip>

## Stand-alone development

You will have a new folder that has the name you picked for your design.
If you chose `test`, you will have a folder named `test`.
If you chose `banana`, you'll have a folder named `banana`.
(Within this new folder, the `design` subfolder holds your design's configuration file and source code.
You can ignore all other subfolders and files; they are part of the development environment.)

To start the development environment, enter the folder that was created
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
