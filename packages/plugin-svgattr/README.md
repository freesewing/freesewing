<p align="center">
  <a title="Go to freesewing.org" href="https://freesewing.org/"><img src="https://freesewing.org/img/logo/black.svg" align="center" width="150px" alt="Freesewing logo"/></a>
</p>
<h4 align="center"><em>&nbsp;<a title="Go to freesewing.org" href="https://freesewing.org/">freesewing</a></em>
<br><sup>a library for made-to-measure sewing patterns</sup>
</h4>
<p align="center">
  <a href="https://travis-ci.org/freesewing/plugin-svgattr"><img src="https://badgen.net/travis/freesewing/plugin-svgattr/master" alt="Travis build"></a>
  <a href="https://www.npmjs.com/package/@freesewing/plugin-svgattr"><img src="https://badgen.net/npm/v/@freesewing/plugin-svgattr" alt="Version"></a>
  <a href="https://www.npmjs.com/package/@freesewing/plugin-svgattr"><img src="https://badgen.net/npm/license/@freesewing/plugin-svgattr" alt="License"></a>
  <a href="https://codecov.io/gh/freesewing/plugin-svgattr"><img src="https://badgen.net/codecov/c/github/freesewing/plugin-svgattr/master" alt="Code coverage"></a>
  <a href="https://deepscan.io/dashboard#view=project&pid=3270&bid=27577"><img src="https://deepscan.io/api/projects/3270/branches/27577/badge/grade.svg" alt="DeepScan grade"></a>
  <a href="https://gitter.im/freesewing/freesewing"><img src="https://badgen.net/badge/chat/on%20Gitter/cyan" alt="Chat on Gitter"></a>
  <a href="https://freesewing.org/patrons/join"><img src="https://badgen.net/badge/become/a%20Patron/FF5B77" alt="Become a Patron"></a>
</p>

# plugin-svgattr

A freesewing plugin to add attributes to the SVG tag of a rendered pattern.  
Typically used to add CSS classes or an ID to the SVG to allow styling.
 
## Links

 - 📕  Documentation: [developer.freesewing.org/plugins/#svgattr](https://developer.freesewing.org/plugins/#svgattr)
 - 📂  Source code: [gitub.com/freesewing/plugin-svgattr](https:/github.co/freesewing/plugin-svgattr)
 - 📦  NPM Package: [@freesewing/plugin-svgattr](https://www.npmjs.com/package/@freesewing/plugin-svgattr)
 - 💻 Website: [freesewing.org](https://freesewing.org)
 - 💬 Chat: [Gitter](https://gitter.im/freesewing/freesewing)
 - 🐦 Twitter: [@freesewing_org](https://twitter.com/freesewing_org)
 - 📷 Instagram: [@freesewing_org](https://instagram.com/freesewing_org)
     
## Install

```sh
npm install @freesewing/plugin-svgattr
```

## Usage

```js
import brian from '@freesewing/brian'
import svgattr from '@freesewing/plugin-svgattr'

let pattern = new brian
  .with(svgattr, {id: "someid", class: "class1 another-class"});
```

More details are are available at 
[developer.freesewing.org/plugins](https://developer.freesewing.org/plugins/)
