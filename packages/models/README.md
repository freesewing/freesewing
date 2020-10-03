![FreeSewing](https://freesewing.org/banner.jpg)
<p align='center'><a
  href="https://www.npmjs.com/package/@freesewing/models"
  title="@freesewing/models on NPM"
  ><img src="https://img.shields.io/npm/v/@freesewing/models.svg"
  alt="@freesewing/models on NPM"/>
  </a><a
  href="https://opensource.org/licenses/MIT"
  title="License: MIT"
  ><img src="https://img.shields.io/npm/l/@freesewing/models.svg?label=License"
  alt="License: MIT"/>
  </a><a
  href="https://deepscan.io/dashboard#view=project&tid=2114&pid=2993&bid=23256"
  title="Code quality on DeepScan"
  ><img src="https://deepscan.io/api/teams/2114/projects/2993/branches/23256/badge/grade.svg"
  alt="Code quality on DeepScan"/>
  </a><a
  href="https://github.com/freesewing/freesewing/issues?q=is%3Aissue+is%3Aopen+label%3Apkg%3Amodels"
  title="Open issues tagged pkg:models"
  ><img src="https://img.shields.io/github/issues/freesewing/freesewing/pkg:models.svg?label=Issues"
  alt="Open issues tagged pkg:models"/>
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

## What am I looking at? 🤔

This repository is our *monorepo* holding [all our NPM packages](https://www.npmjs.com/search?q=keywords:freesewing).  
This folder holds **@freesewing/models**

Body measurements data for a range of default sizes


## Usage

In node.js:

```js
import { manSize38 } from @freesewing/models
```

which will give you an object with `measurement: value` pairs. 
The example above gives you:

```js
{
  bicepsCircumference: 305,
  centerBackNeckToWaist: 495,
  chestCircumference: 965,
  headCircumference: 580,
  hipsCircumference: 838,
  hipsToUpperLeg: 202,
  naturalWaistToHip: 110,
  neckCircumference: 391,
  shoulderSlope: 49,
  shoulderToShoulder: 444,
  shoulderToWrist: 680,
  upperLegCircumference: 598,
  wristCircumference: 185
}
```

## Units

All measurements are in mm.

## Available models

 - manSize34
 - manSize36
 - manSize38
 - manSize40
 - manSize42
 - manSize44



## About FreeSewing 💀

Where the world of makers and developers collide, that's where you'll find FreeSewing.

Our [core library](https://freesewing.dev/reference/api/) is a *batteries-included* toolbox
for parametric design of sewing patterns. It's a modular system (check our list
of [plugins](https://freesewing.dev/reference/plugins/) and getting started is as simple as:

```bash
npm init freesewing-pattern
```

The [getting started](https://freesewing.dev/guides/getting-started/) section on [freesewing.dev](https://freesewing.dev/) is a good
entrypoint to our documentation, but you'll find a lot more there, including
our [API reference](https://freesewing.dev/reference/api/),
as well as [our turorial](https://freesewing.dev/tutorials/pattern-design/),
and [howtos](https://freesewing.dev/howtos/).

If you're a maker, checkout [freesewing.org](https://freesewing/) where you can generate
our sewing patterns adapted to your measurements.

## Support FreeSewing: Become a patron 🥰

FreeSewing is an open source project run by a community, 
and financially supported by our patrons.

If you feel what we do is worthwhile, you too 
should [become a patron](https://freesewing.org/patrons/join).

## Links 👩‍💻

 - 💻 Makers website: [freesewing.org](https://freesewing.org)
 - 💻 Developers website: [freesewing.dev](https://freesewing.dev)
 - 💬 Chat: On Discord via [chat.freesewing.org](https://chat.freesewing.org/)
 - 🐦 Twitter: [@freesewing_org](https://twitter.com/freesewing_org)
 - 📷 Instagram: [@freesewing_org](https://instagram.com/freesewing_org)

## License: MIT 🤓

© [Joost De Cock](https://github.com/joostdecock).  
See [the license file](https://github.com/freesewing/freesewing/blob/develop/LICENSE) for details.

## Where to get help 🤯

Our [chatrooms on Discord](https://chat.freesewing.org/) are the best place to ask questions,
share your feedback, or just hang out.

If you want to report a problem, please [create an issue](https://github.com/freesewing/freesewing/issues/new).
