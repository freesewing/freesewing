import { name, version, description, author, license } from '../package.json'

const header = `999
${name.slice(1)} | v${version}
999
${description}
999
(c) ${new Date().getFullYear()} ${author}
999
License: ${license}
999`

export default header
