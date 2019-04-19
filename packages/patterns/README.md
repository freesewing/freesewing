> **Note**: This is part of version 2 of FreeSewing.  
> It is a work in progress, and not ready for prime-time yet
> 
> For all questions, please come say hello in [our chatroom on Gitter](https://gitter.im/).

<p align="center"><a title="Go to freesewing.org" href="https://freesewing.org/"><img src="https://freesewing.org/img/logo/black.svg" align="center" width="150px" alt="Freesewing logo"/></a></p>
<p>FreeSewing is a free and open source library for made-to-measure sewing patterns</p>
<p align='center'><a
  href="https://www.npmjs.com/package/@freesewing/patterns"
  title="@freesewing/patterns on NPM"
  ><img src="https://badgen.net/npm/v/@freesewing/patterns"
  alt="@freesewing/patterns on NPM"/>
  </a><a
  href="https://opensource.org/licenses/MIT"
  title="License: MIT"
  ><img src="https://badgen.net/badge/License/MIT/blue"
  alt="License: MIT"/>
  </a></p><p align='center'><a
  href="https://gitter.im/freesewing/freesewing"
  title="Chat with us on Gitter"
  ><img src="https://badgen.net/badge//Chat/CA0547?icon=gitter"
  alt="Chat with us on Gitter"/>
  </a><a
  href="https://twitter.com/freesewing_org"
  title="Follow @freesewing_org on Twitter"
  ><img src="https://badgen.net/badge//@freesewing_org/1DA1F2?icon=twitter"
  alt="Follow @freesewing_org on Twitter"/>
  </a><a
  href="https://github.com/freesewing"
  title="FreeSewing on GitHub"
  ><img src="https://badgen.net/badge//freesewing/269F42?icon=github"
  alt="FreeSewing on GitHub"/>
  </a><a
  href="https://freesewing.org/patrons/join"
  title="Become a FreeSewing Patron"
  ><img src="https://badgen.net/badge/Become%20a/Patron/purple"
  alt="Become a FreeSewing Patron"/>
  </a></p>

# @freesewing/patterns

An umbrella package for all FreeSewing patterns


## Included patterns

### Blocks

Blocks or slopers are basic patterns shapes that you can extend into fully detailed patterns.

 - [brian](https://github.com/freesewing/brian) : A basic body block for menswear, and the basis for many of our menswear patterns. 
 - [bent](https://github.com/freesewing/bent) : A version of [brian](https://github.com/freesewing/brian) with a two-part sleeve, and the and the basis of our menswear coat and jacket patterns. 

### Menswear

 - [aaron](https://github.com/freesewing/aaron) : A tank top or A-shirt
 - [bruce](https://github.com/freesewing/bruce) : Boxer briefs
 - [carlton](https://github.com/freesewing/carlton) : A long coat, perfect for Sherlock Holmes cosplay
 - [huey](https://github.com/freesewing/huey) : A zip-up hoodie
 - [hugo](https://github.com/freesewing/hugo) : A hooded sweatshirt with raglan sleeves
 - [jaeger](https://github.com/freesewing/jaeger) : A sportscoat
 - [simon](https://github.com/freesewing/simon) : A versatile button-down shirt
 - [sven](https://github.com/freesewing/sven) : A straightforward sweater
 - [wahid](https://github.com/freesewing/wahid) : A classic waistcoat
 

### Womenswear

 - [cathrin](https://github.com/freesewing/cathrin) : An underbust corset or waist trainer
 - [tamiko](https://github.com/freesewing/tamiko) : A zero-waste top

### Accessories
 
 - [trayvon](https://github.com/freesewing/trayvon) : A (neck) tie

> #### Note: menswear/womenswear has nothing to do with gender
>
> Freesewing is gender-neutral. When we use the terms **menswear** or **womenswear**
> we are not talking about clothes for men or women. It is merely a category of clothing
> much like **accessories** or **shoes** are categories.
>
> The category gives you an idea what to expect, and is there to help you find things.
> It is not a limitation, or even a suggestion, of what you can or should wear or make.
>
> Wear whatever you want, and be proud of the things you make.

## Usage

This exposes 3 named exports:

 - `patterns` : An object holding pattern constructors
 - `patternList` : An array of pattern names
 - `patternInfo` : Extra pattern information that is typically used for frontend integration (tags, difficulty level, that sort of thing).



## About FreeSewing 🤔

Where the world of makers and developers collide, that's where you'll find FreeSewing.

Our [core library](https://freesewing.dev/en/freesewing) is a *batteries-included* toolbox
for parametric design of sewing patterns. It's a modular system (check our list
of [plugins](https://freesewing.dev/en/plugins) and getting started is as simple as:

```bash
npm init freesewing-pattern
```

The [getting started] section on [freesewing.dev](https://freesewing.dev/) is a good
entrypoint to our documentation, but you'll find a lot more there, including
our [API documentation](https://freesewing.dev/en/freesewing/api),
as well as [examples](https://freesewing.dev/en/freesewing/examples),
and [best practices](https://freesewing.dev/en/do).

If you're a maker, checkout [freesewing.org](https://freesewing/) where you can generate
our sewing patterns adapted to your measurements.

## Support FreeSewing: Become a patron 🥰

FreeSewing is an open source project run by a community, 
and financially supported by our patrons.

If you feel what we do is worthwhile, you too 
should [become a patron](https://freesewing.org/patrons/join).

## Links 👩‍💻

 - 💻 Makers website: [freesewing.org](https://freesewing.org)
 - 💻 Developers website: [freesewing.dev](https://freesewing.org)
 - 💬 Chat: [gitter.im/freesewing](https://gitter.im/freesewing/freesewing)
 - 🐦 Twitter: [@freesewing_org](https://twitter.com/freesewing_org)
 - 📷 Instagram: [@freesewing_org](https://instagram.com/freesewing_org)

## License: MIT 🤓

© [Joost De Cock](https://github.com/joostdecock).  
See [the license file](https://github.com/freesewing/freesewing/blob/develop/LICENSE) for details.

## Where to get help 🤯

Our [chatroom on Gitter](https://gitter.im) is the best place to ask questions,
share your feedback, or just hang out.

If you want to report a problem, please [create an issue](https://github.com/freesewing/freesewing/issues/new).
