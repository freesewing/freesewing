![FreeSewing](https://static.freesewing.org/banner.png)
<p align='center'><a
  href="https://www.npmjs.com/package/@freesewing/plugin-export-dxf"
  title="@freesewing/plugin-export-dxf on NPM"
  ><img src="https://img.shields.io/npm/v/@freesewing/plugin-export-dxf.svg"
  alt="@freesewing/plugin-export-dxf on NPM"/>
  </a><a
  href="https://opensource.org/licenses/MIT"
  title="License: MIT"
  ><img src="https://img.shields.io/npm/l/@freesewing/plugin-export-dxf.svg?label=License"
  alt="License: MIT"/>
  </a><a
  href="https://deepscan.io/dashboard#view=project&tid=2114&pid=2993&bid=23256"
  title="Code quality on DeepScan"
  ><img src="https://deepscan.io/api/teams/2114/projects/2993/branches/23256/badge/grade.svg"
  alt="Code quality on DeepScan"/>
  </a><a
  href="https://github.com/freesewing/freesewing/issues?q=is%3Aissue+is%3Aopen+label%3Apkg%3Aplugin-export-dxf"
  title="Open issues tagged pkg:plugin-export-dxf"
  ><img src="https://img.shields.io/github/issues/freesewing/freesewing/pkg:plugin-export-dxf.svg?label=Issues"
  alt="Open issues tagged pkg:plugin-export-dxf"/>
  </a><a
  href="https://todo.freesewing.org/"
  title="Project board"
  ><img src="https://img.shields.io/badge/%F3%A0%80%A0-Project%20board-9775fa.svg?logo=github&logoColor=white&logoWidth=15"
  alt="Project board"/>
  </a></p><p align='center'><a
  href="https://twitter.com/freesewing_org"
  title="Follow @freesewing_org on Twitter"
  ><img src="https://img.shields.io/badge/%F3%A0%80%A0-Follow%20us-blue.svg?logo=twitter&logoColor=white&logoWidth=15"
  alt="Follow @freesewing_org on Twitter"/>
  </a><a
  href="https://chat.freesewing.org"
  title="Chat with us on Discord"
  ><img src="https://img.shields.io/discord/698854858052075530?label=Chat%20on%20Discord"
  alt="Chat with us on Discord"/>
  </a><a
  href="https://freesewing.org/patrons/join"
  title="Become a FreeSewing Patron"
  ><img src="https://img.shields.io/badge/%F3%A0%80%A0-Support%20us-blueviolet.svg?logo=cash-app&logoColor=white&logoWidth=15"
  alt="Become a FreeSewing Patron"/>
  </a><a
  href="https://instagram.com/freesewing_org"
  title="Follow @freesewing_org on Twitter"
  ><img src="https://img.shields.io/badge/%F3%A0%80%A0-Follow%20us-E4405F.svg?logo=instagram&logoColor=white&logoWidth=15"
  alt="Follow @freesewing_org on Twitter"/>
  </a></p>

# @freesewing/plugin-export-dxf

A FreeSewing plugin to export your pattern as DXF-ASTM

## About

This plugin adds the ability to export patterns to DXF-ASTM.

DXF (Drawing interchange format) is a file format developed by Autodesk
(of AutoCAD® fame).  
The DXF-ASTM variety is a subset of the format, specifically targetted
at the garment industry.

ASTM is the _American Society for Testing and Materials_ — a standards body —
that published the format.
DXF-ASTM is the successor of DXF-AAMA which was developed by the _American
Apparel Manufacturers Association_ which reveals the origins of the file format.

## Usage

Instantiate your pattern, and use the plugin.
It will add the `exportDxf()` method to the pattern object.
This method will return the DXF-ASTM output.

```js
import models from '@freesewing/models'
import Aaron from '@freesewing/aaron'
import exportDxfPlugin from '@freesewing/plugin-export-dxf'

const settings = {
  // Make sure to set complete to false
  complete: false,
  measurements: models.withoutBreasts.size42
}

let dxf = new Aaron(settings).use(exportDxfPlugin).draft().exportDxf()
```

## Configuration

This plugin takes a configuration object as a second parameter to the
`pattern.use()` method.

### Precision

The precision property determines the length of the line segments used
to approximate curves. The generated DXF-ASTM output will only contain
straight lines, so curves will be approximated wiht lines segments.

The `precision` sets the length of those segments in mm.
In the example below, the `precision` is set to `25` resulting in
the use of line segments 25mm (1 inch) to approximate the curve.

```js
let config = {
  precision: 25
}

let dxf = new Aaron(settings).use(exportDxfPlugin, config)
```

The default `precision` is `1`, giving you 1mm long line segments
to approximate curves.

## Reasons to use this plugin

This plugin can export your pattern to DXF-ASTM so you can import it to
your 3D software of choice.

## Reasons to not use this plugin

### Because DXF is inferior to SVG in every way

DXF (and DXF-AAMA and DXF-ASTM with it) are rooted in the world of industrial
manufacturing. And it shows.

Nowadays, it's easy to think of the DXF file format as a bit of an embarassment.  
But it is deliberatly kept dumb so that old industrial CNC milling machines,
plotters, laster cutters and whatnot, can handle the format.

### Because this plugin does not implement all of DXF

This plugin does the minimum to allow export of FreeSewing patterns into
3D garment tools. It expexts the input pattern to only include the outlines.

That means, no seam allowance, or titles, no notches, and so on.


## What am I looking at? 🤔

This repository is our *monorepo* 
holding [all our NPM packages](https://freesewing.dev/reference/packages/).  

This folder holds: @freesewing/plugin-export-dxf

## About FreeSewing 💀

Where the world of makers and developers collide, that's where you'll find FreeSewing.

If you're a maker, checkout [freesewing.org](https://freesewing.org/) where you can generate
our sewing patterns adapted to your measurements.

If you're a developer, our documentation is on [freesewing.dev](https://freesewing.dev/).
Our [core library](https://freesewing.dev/reference/api/) is a *batteries-included* toolbox
for parametric design of sewing patterns. But we also provide a range 
of [plugins](https://freesewing.dev/reference/plugins/) that further extend the 
functionality of the platform.

If you have NodeJS installed, you can try it right now by running:

```bash
npx create-freesewing-pattern
```

Or, consult our getting started guides 
for [Linux](https://freesewing.dev/tutorials/getting-started-linux/),
[MacOS](https://freesewing.dev/tutorials/getting-started-mac/), 
or [Windows](https://freesewing.dev/tutorials/getting-started-windows/).

We also have a [pattern design tutorial](https://freesewing.dev/tutorials/pattern-design/) that
walks you through your first parametric design, 
and [a friendly community](https://freesewing.org/community/where/) with 
people who can help you when you get stuck.

## Support FreeSewing: Become a patron 🥰

FreeSewing is an open source project run by a community, 
and financially supported by our patrons.

If you feel what we do is worthwhile, and you can spend a few coind without
hardship, then you should [join us and become a patron](https://freesewing.org/community/join).

## Links 👩‍💻

 - 💻 Makers website: [freesewing.org](https://freesewing.org)
 - 💻 Developers website: [freesewing.dev](https://freesewing.dev)
 - 💬 Chat: On Discord via [chat.freesewing.org](https://chat.freesewing.org/)
 - ✅ Todo list/Kanban board: On Github via [todo.freesewing.org](https://todo.freesewing.org/)
 - 🐦 Twitter: [@freesewing_org](https://twitter.com/freesewing_org)
 - 📷 Instagram: [@freesewing_org](https://instagram.com/freesewing_org)

## License: MIT 🤓

© [Joost De Cock](https://github.com/joostdecock).  
See [the license file](https://github.com/freesewing/freesewing/blob/develop/LICENSE) for details.

## Where to get help 🤯

Our [chatrooms on Discord](https://chat.freesewing.org/) are the best place to ask questions,
share your feedback, or just hang out.

If you want to report a problem, please [create an issue](https://github.com/freesewing/freesewing/issues/new).
